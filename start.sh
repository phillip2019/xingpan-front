#!/usr/bin/env bash
git pull
yarnpkg run build

docker-compose build

docker-compose down
docker-compose up -d
