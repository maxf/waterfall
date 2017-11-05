#!/bin/bash

elm-make *.elm $WATERFALL_ELM_DEBUG --yes --warn --output=public/elm.js
browserify -o public/out.js main.js

if [ -z $WATERFALL_INSTALL_DIR ]; then
    sync -avzr --exclude node_modules --exclude .\* --exclude elm-stuff ../waterfall $WATERFALL_INSTALL_DIR
else
    echo "WATERFALL_INSTALL_DIR not set."
fi
