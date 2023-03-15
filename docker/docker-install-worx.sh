#!/bin/bash

NC='\033[0m'
GREEN='\033[0;32m'

if [ -x "$(command -v docker)" ]; then
    echo -e "${GREEN}\xE2\x9C\x94${NC} Docker"
else
    echo "docker: command not found"
    echo "Please make sure docker is installed in your machine"
    exit 1
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo -e "${GREEN}\xE2\x9C\x94${NC} Docker Compose"
else
    echo "docker-compose: command not found"
    echo "Please make sure docker-compose is installed in your machine"
    exit 1
fi

echo "Installing object storage ..."
mkdir -p .docker/data1-1
mkdir -p .docker/data1-2
mkdir -p .docker/data2-1
mkdir -p .docker/data2-2
mkdir -p .docker/data3-1
mkdir -p .docker/data3-2
mkdir -p .docker/data4-1
mkdir -p .docker/data4-2
docker-compose -f minio.yml pull
docker-compose -f minio.yml up -d

export WORX_STORAGE_BUCKET_NAME="worx"

docker run --rm -e WORX_STORAGE_BUCKET_NAME=worx --network docker_default --entrypoint sh minio/mc:RELEASE.2023-02-28T00-12-59Z -c "\
    microdnf install nc; while ! nc -z minio1 9000; do echo 'Wait minio to startup...' && sleep 0.1; done; \
    sleep 5 && \
    mc config host add myminio http://minio1:9000 minioadmin minioadmin && \
    mc rm -r --force myminio/$WORX_STORAGE_BUCKET_NAME || true && \
    mc mb myminio/$WORX_STORAGE_BUCKET_NAME && \
    mc policy download myminio/$WORX_STORAGE_BUCKET_NAME
"

echo -e "${GREEN}\xE2\x9C\x94${NC} Object storage"

echo "Installing application ..."

if [[ -z "${WORX_NODE_DOCKER_NAME}" ]]; then
    echo "Using default image for worx-core"
    WORX_NODE_DOCKER_NAME="shygnome3/worx:latest"
else
    WORX_NODE_DOCKER_NAME="${WORX_NODE_DOCKER_NAME}"
fi

if [[ -z "${WEB_UI_DOCKER_NAME}" ]]; then
    echo "Using default image for worx-ui"
    WEB_UI_DOCKER_NAME="shygnome3/worx-web-ui:latest"
else
    WEB_UI_DOCKER_NAME="${WEB_UI_DOCKER_NAME}"
fi

export WORX_NODE_DOCKER_NAME
export WEB_UI_DOCKER_NAME
export SPRING_JPA_HIBERNATE_DDL_AUTO=update
export SPRING_PROFILE=dev,swagger

cp -rf worx-web-ui.env ../ui/.env
cp -rf worx-core.env ../application/.env

mkdir -p .docker/db
docker-compose -f docker-compose.build.yml pull
docker-compose -f docker-compose.build.yml up -d
echo -e "${GREEN}\xE2\x9C\x94${NC} Application"

echo "Stopping object storage ..."
docker-compose -f minio.yml down -v --remove-orphans

echo "Stopping application ..."
docker-compose -f docker-compose.yml down -v --remove-orphans

echo "Installation process is complete."
echo "To start the services, run \"docker-start-worx.sh\""
echo "Before starting the application, please fill the remaining environment variables via .env or the application will failed to run."
