# waterfall
A simple photo gallery


## Building

```
$ npm install
$ elm-package install -y
$ elm-make --output elm.js Main.elm
$ browserify -o out.js main.js
```


## Todo

- Delete any thumbnails when deleting a picture
- Delete RAW files too
- Put thumbnail in another top-level directory

- view 360 pictures
- improve design: CSS, messages, etc.
- annotations
- view videos
- confirmation for delete (or undo)
- Delete directory when removing last file in it

- show photos for all months
