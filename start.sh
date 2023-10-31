#!/usr/bin/env bash

yarnpkg run build

docker-compose build

docker-compose down
docker-compose up -d