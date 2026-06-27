FROM node:24-alpine AS builder

ARG UID=1010
ARG GID=1010

RUN addgroup -g "${GID}" jac \
    && adduser -D -u "${UID}" -G jac jac

RUN npm install -g pnpm --quiet

WORKDIR /opt/app

COPY --chown=jac:jac package.json pnpm-lock.yaml ./
RUN pnpm fetch --frozen-lockfile

COPY --chown=jac:jac . .

RUN pnpm install --offline --frozen-lockfile \
    && pnpm build


FROM node:24-alpine AS runtime

ARG BUILD_DATE=unknown
ARG BUILD_VERSION=unknown
ARG IMAGE_DESCRIPTION=unknown
ARG IMAGE_NAME="JAC-Manager-Frontend"
ARG UID=1010
ARG GID=1010

LABEL jac-manager.frontend.build-date=$BUILD_DATE \
      jac-manager.frontend.name=$IMAGE_NAME \
      jac-manager.frontend.description=$IMAGE_DESCRIPTION \
      jac-manager.frontend.base.image="node:24-alpine" \
      jac-manager.frontend.version=$BUILD_VERSION \
      maintainer="Jac Manager Group"

RUN addgroup -g "${GID}" jac \
    && adduser -D -u "${UID}" -G jac jac

RUN npm install -g serve --quiet

WORKDIR /opt/app

COPY --from=builder --chown=jac:jac /opt/app/dist ./dist

EXPOSE 3000

USER jac

ENTRYPOINT ["serve", "-s", "dist", "-l", "3000"]