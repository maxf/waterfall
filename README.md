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

- use system directory for metadata json file (not /tmp)
- move top-left buttons in a popup menu (or system menu?)
- pop up 'back to top' button on scroll down
- Make next/prev day buttons link to next/prev day that has photos
- view 360 pictures


### Maybe

- optional UI change : big calendar
- infinite scroll for calendar
- make it work online (not just as an app)
- Single URL for each photo

### Done

- display message while photos are loading
- photos in subdirectories
- Package Electron app for download
- save Metadata in file
- dialog to select photo directory
- Wrong order of photos for a specific day
- clicking on a date should scroll photos back up but not calendar
- delineate months
- delete photos
- Electron
- Use seconds for createDate key
- Read Exif data directly from photos
