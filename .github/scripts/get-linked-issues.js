/**
 * get-linked-issues.js
 * Retrieves the node IDs of issues linked to a PR
 * from the "Development" section (closingIssuesReferences in GraphQL).
 *
 * This covers the case where there is no "closes #42" text in the PR,
 * but the issue was manually linked from the GitHub UI.
 *
 * Returns: string[] — array of issue node IDs (can be empty)
 */
module.exports = async function getLinkedIssues(github, context, prNumber) {
    const { repository } = await github.graphql(`
    query($owner: String!, $repo: String!, $prNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
          closingIssuesReferences(first: 10) {
            nodes {
              id
              number
            }
          }
        }
      }
    }
  `, {
        owner: context.repo.owner,
        repo:  context.repo.repo,
        prNumber,
    });

    const issues = repository?.pullRequest?.closingIssuesReferences?.nodes ?? [];

    if (issues.length === 0) {
        console.log('No closing issue references found via GraphQL.');
    } else {
        console.log(`Issues linked via Development: ${issues.map(i => `#${i.number}`).join(', ')}`);
    }

    return issues.map(i => i.id);
};