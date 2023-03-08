#!/bin/bash

GREEN='\033[0;32m'

if [ -x "$(command -v docker)" ]; then
    echo -e "Docker ${GREEN}done"
else
    echo "docker: command not found"
    echo "Please make sure docker is installed in your machine"
    exit 1
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo "Docker Compose ${GREEN}done"
else
    echo "docker-compose: command not found"
    echo "Please make sure docker-compose is installed in your machine"
    exit 1
fi

# start minio

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

