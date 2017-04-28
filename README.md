# waterfall
A simple photo gallery


## Building

```
$ npm install
$ elm-package install -y
$ elm-make --output elm.js Main.elm
```

## Running

```
$ ./node_modules/.bin/electron .
```

## Todo

- display message while photos are loading
- dialog to select photo directory
- save Model in Electron app storage
- optional UI change : big calendar
- pop up 'back to top' button on scroll down
- Make next/prev day buttons link to next/prev day that has photos
- Package Electron app for download
- view 360 pictures
- photos in subdirectories


### Maybe

- infinite scroll for calendar
- make it work online (not just as an app)
- Single URL for each photo

### Done

- Wrong order of photos for a specific day
- clicking on a date should scroll photos back up but not calendar
- delineate months
- delete photos
- Electron
- Use seconds for createDate key
- Read Exif data directly from photos
