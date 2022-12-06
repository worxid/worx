#!/bin/bash

cd application

mvnw clean install
# mvnw clean install -DskipTests

docker build -t shygnome3/worx:latest -f ../docker/core/Dockerfile .
docker image push shygnome3/worx:latest
