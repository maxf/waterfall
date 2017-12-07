#!/bin/bash

PATH=./node_modules/.bin:$PATH

elm-make *.elm $WATERFALL_ELM_DEBUG --yes --warn --output=public/elm.js
browserify -o public/out.js main.js

if [ -z "$1" ]; then
    echo Not copying
else
    rsync -avzr --exclude node_modules --exclude .\* --exclude elm-stuff ../waterfall $1
fi
