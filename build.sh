#!/bin/bash

elm-make *.elm --debug --yes --warn --output=elm.js
browserify -o out.js main.js
rsync -avzr --exclude node_modules --exclude .git --exclude elm-stuff ../waterfall waterfall:/var/www/html
