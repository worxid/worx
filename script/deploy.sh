#!/bin/bash

export project_dir=/opt/worx/deployments/worx-dev

echo "Change directory to deployments"
cd $project_dir

echo "Up docker compose"
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml pull
docker-compose -f docker-compose.yml up -d
