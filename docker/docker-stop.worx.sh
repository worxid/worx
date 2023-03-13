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

echo "Stopping object storage ..."
docker-compose -f minio.yml down -v

echo "Stopping application ..."

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

docker-compose -f docker-compose.yml down -v