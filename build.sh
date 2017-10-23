#!/bin/bash

if [ -z $WATERFALL_INSTALL_DIR ]; then
    echo "You must set WATERFALL_INSTALL_DIR"
    exit -1
fi


elm-make *.elm $WATERFALL_ELM_DEBUG --yes --warn --output=elm.js
browserify -o out.js main.js
rsync -avzr --exclude node_modules --exclude .git --exclude elm-stuff ../waterfall $WATERFALL_INSTALL_DIR
