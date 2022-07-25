#!/bin/bash

cd client
yarn install && yarn build
RESULT=$?
if [ ! $RESULT -eq 0 ]; then
  echo failed build client
  exit 1
fi

cd ..
rm -rf gateway/build
cp -r client/build gateway/
docker-compose up --build --force-recreate

