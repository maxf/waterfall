#!/bin/bash

PATH=./node_modules/.bin:$PATH

./src/browser/organise/build.sh
./src/browser/socialise/build.sh

if [ -z "$1" ]; then
    echo Not copying
else
    rsync -avzr --exclude node_modules --exclude .\* --exclude elm-stuff ../waterfall $1
fi
