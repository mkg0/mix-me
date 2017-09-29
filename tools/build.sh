#!/bin/sh

cwd=`pwd`
function build() {
  cd $cwd/$1 && yarn --mutex file:/tmp/.yarn-mutex && yarn build
}

build client &
build server &
wait

rm -rf ./build && mkdir ./build

cp -r ./client/build ./build/public
cp -r ./server/build/server.js ./build/server.js

echo 'All done'
