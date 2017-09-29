#!/bin/sh

set -e # Abort script at first error
# set -u # Disallow unset variables

docker --version

IMAGE_VERSION=${TRAVIS_BUILD_NUMBER:-dev}

IMAGE_NAME="signavio-mix-me:$IMAGE_VERSION"

docker build . -t $IMAGE_NAME

docker login -u="_" -p="$HEROKU_API_KEY" registry.heroku.com

docker tag $IMAGE_NAME registry.heroku.com/signavio-mix-me/web
docker push registry.heroku.com/signavio-mix-me/web

echo "All finished"