#!/usr/bin/env bash

set -euo pipefail

echo "=============================="
echo "Deploy script started"
echo "=============================="

echo "DOCKER_IMAGE: ${DOCKER_IMAGE}"
echo "PORT: ${PORT}"
echo "IMAGE_NAME: ${IMAGE_NAME}"

echo
echo "Arguments passed to script:"
echo "Arg 1: ${1:-<not provided>}"
echo "Arg 2: ${2:-<not provided>}"
echo "Arg 3: ${3:-<not provided>}"
