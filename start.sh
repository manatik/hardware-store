#!/bin/bash

cd frontend
yarn install && yarn build
RESULT=$?
if [ ! $RESULT -eq 0 ]; then
  echo failed build frontend
  exit 1
fi

cd ..
rm -rf deploy/nginx/build
cp -r frontend/build deploy/nginx/
docker-compose up --build --force-recreate

