/**
 * move-project-card.js
 * Moves an issue to the specified status within a GitHub Project V2.
 * If the issue is not yet in the project, it is automatically added.
 *
 * Usage from github-script:
 *   const move = require('./.github/scripts/move-project-card.js');
 *   await move(github, issueNodeId, 'In progress');
 */

const PROJECT_NUMBER = 8;           // ← github.com/users/sebas679og/projects/7
const OWNER         = 'sebas679og'; // ← your username

module.exports = async function moveIssueToColumn(github, issueNodeId, targetColumnName) {

    // ── 1. Get project and fields ──────────────────────────────────────────
    const { user } = await github.graphql(`
    query($owner: String!, $number: Int!) {
      user(login: $owner) {
        projectV2(number: $number) {
          id
          fields(first: 20) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id
                name
                options { id name }
              }
            }
          }
        }
      }
    }
  `, { owner: OWNER, number: PROJECT_NUMBER });

    const project = user?.projectV2;
    if (!project) {
        throw new Error(`Project #${PROJECT_NUMBER} not found for user "${OWNER}"`);
    }

    // ── 2. Locate the Status field and the destination option ─────────────────────
    const statusField = project.fields.nodes.find(
        f => f.name?.toLowerCase() === 'status'
    );
    if (!statusField) {
        throw new Error('Field "Status" not found in the project.');
    }

    const targetOption = statusField.options.find(
        o => o.name.toLowerCase() === targetColumnName.toLowerCase()
    );
    if (!targetOption) {
        const available = statusField.options.map(o => o.name).join(', ');
        throw new Error(
            `Column "${targetColumnName}" not found. Available: ${available}`
        );
    }

    // ── 3. Get the item from the issue in the project (or add it) ────────────
    const itemQuery = await github.graphql(`
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          items(first: 100) {
            nodes {
              id
              content {
                ... on Issue { id }
              }
            }
          }
        }
      }
    }
  `, { projectId: project.id });

    let itemId = itemQuery.node?.items?.nodes?.find(
        item => item.content?.id === issueNodeId
    )?.id;

    if (!itemId) {
        console.log('The issue was not in the project, adding it...');
        const addResult = await github.graphql(`
      mutation($projectId: ID!, $contentId: ID!) {
        addProjectV2ItemById(input: {
          projectId:  $projectId
          contentId:  $contentId
        }) {
          item { id }
        }
      }
    `, { projectId: project.id, contentId: issueNodeId });

        itemId = addResult.addProjectV2ItemById.item.id;
    }

    // ── 4. Update the Status field ─────────────────────────────────────────
    await github.graphql(`
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId:    $itemId
        fieldId:   $fieldId
        value:     { singleSelectOptionId: $optionId }
      }) {
        projectV2Item { id }
      }
    }
  `, {
        projectId: project.id,
        itemId,
        fieldId:  statusField.id,
        optionId: targetOption.id,
    });

    console.log(`✅ Issue moved to "${targetColumnName}" in project #${PROJECT_NUMBER}`);
};