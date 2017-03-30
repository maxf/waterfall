#!/bin/bash

function make_line {
    echo \"`basename "$0"`\",\"`exiftool -T -createdate "$0"`\"
}
export -f make_line

echo "name, create_date"
find $@ -type f -a \( \
-name \*.png -o \
-name \*.PNG -o \
-name \*.jpg -o \
-name \*.JPG -o \
-name \*.jpeg -o \
-name \*.JPEG \
\) -exec bash -c make_line {} \;
