#!/bin/bash

cwd=`pwd`
function build() {
  cd $cwd/$1 && yarn && yarn build
}

build client &
build server &

wait

mkdir build

cp -r ./client/build ./build/public
cp -r ./server/build/server.js ./build/server.js

echo 'All done'
