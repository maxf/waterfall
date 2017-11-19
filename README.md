# waterfall
A simple photo gallery


## Building

```
$ npm install
$ elm-package install -y
$ elm-make --output elm.js Main.elm
$ browserify -o out.js main.js
```

## Running the server

On the server, run `server-init.sh`. To make sure the server restarts on reboot, use `sudo pm2 startup`
