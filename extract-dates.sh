#!/bin/bash
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for file in $@; do
    create_date=`exiftool -T -createdate "$file"`
    echo \"$file\", \"$create_date\"
done
IFS=$SAVEIFS
