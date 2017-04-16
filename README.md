# waterfall
A simple photo gallery


## Building

```
$ elm-package install -y
$ elm-make --output elm.js Main.elm
```

## Running

1. Generate picture index:

```
$ ./extract-dates.sh /folder/where/pictures/are/ > metadata.csv
```

2. Open the `index.html` file in a browser


## Todo

- optional UI change : big calendar
- delete photos
- pop up 'back to top' button on scroll down
- Single URL for each photo
- Make next/prev day buttons link to next/prev day that has photos
- Electron
- script with progress bar
- allow user to delete pictures
- view 360 pictures
- Use milliseconds for ExifDate instead of Strings
  (until DateTime becomes comparable)

### Maybe

- don't use a script, read photo metadata from browser
- infinite scroll for calendar
- make it work online (not just locally)

### Done

- Wrong order of photos for a specific day
- clicking on a date should scroll photos back up but not calendar
- delineate months
