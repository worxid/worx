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

mkdir -p .docker/db
docker-compose -f docker-compose.yml pull
docker-compose -f docker-compose.yml up -d
echo -e "${GREEN}\xE2\x9C\x94${NC} Application"

echo "Stopping object storage ..."
docker-compose -f minio.yml down -v

echo "Stopping application ..."
docker-compose -f docker-compose.yml down -v

echo "Installation process is complete."
echo "To start the services, run \"docker-start-worx.sh\""
echo "Before starting the application, please fill the remaining environment variables via .env or the application will failed to run."
