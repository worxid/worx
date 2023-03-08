#!/bin/bash

if [ -x "$(command -v docker)" ]; then
    echo "Docker \xE2\x9C\x94"
else
    echo "docker: command not found"
    echo "Please make sure docker is installed in your machine"
    exit 1
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo "Docker Compose \xE2\x9C\x94"
else
    echo "docker-compose: command not found"
    echo "Please make sure docker-compose is installed in your machine"
    exit 1
fi

# start minio

echo "Installing object storage..."
docker-compose -f minio.yml pull
docker-compose -f minio.yml up -d

