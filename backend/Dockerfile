FROM maven:3.9.14-eclipse-temurin-25 AS builder

ARG UID=1010
ARG GID=1010

RUN groupadd -g "${GID}" jac \
    && useradd --create-home --no-log-init -u "${UID}" -g jac jac

WORKDIR /opt/app

COPY --chown=jac:jac pom.xml .
RUN mvn dependency:go-offline -q

COPY --chown=jac:jac src ./src

RUN mvn clean package -DskipTests -q


FROM eclipse-temurin:25-jre AS runtime

ARG BUILD_DATE=unknown
ARG BUILD_VERSION=unknown
ARG IMAGE_DESCRIPTION=unknown
ARG IMAGE_NAME="JAC-Manager-API"
ARG UID=1010
ARG GID=1010

LABEL jac-manager.api.build-date=$BUILD_DATE \
      jac-manager.api.name=$IMAGE_NAME \
      jac-manager.api.description=$IMAGE_DESCRIPTION \
      jac-manager.api.base.image="eclipse-temurin:25-jre" \
      jac-manager.api.version=$BUILD_VERSION \
      maintainer="Jac Manager Group"

RUN groupadd -g "${GID}" jac \
    && useradd --create-home --no-log-init -u "${UID}" -g jac jac

WORKDIR /opt/app

COPY --from=builder --chown=jac:jac /opt/app/target/jac-manager-api.jar app.jar

EXPOSE 8080

USER jac

ENTRYPOINT ["java","-jar","app.jar"]