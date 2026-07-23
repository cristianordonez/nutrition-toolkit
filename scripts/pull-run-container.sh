#!/usr/bin/env bash

set -euo pipefail

echo "=============================="
echo "Deploy script started"
echo "=============================="

echo "DOCKER_IMAGE: ${DOCKER_IMAGE}"
echo "PORT: ${PORT}"
echo "CONTAINER_NAME: ${CONTAINER_NAME}"

docker pull "${DOCKER_IMAGE}"
docker stop "${CONTAINER_NAME}" || true
docker rm "${CONTAINER_NAME}" || true
docker run -d --env DATABASE_HOST=host.docker.internal --env-file ~/.env -p ${PORT}:8080 --name "${CONTAINER_NAME}" 
