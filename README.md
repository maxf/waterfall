# waterfall
A simple photo gallery


## Running

Install node and npm.

```
$ git clone https://github.com/maxf/waterfall.git
$ cd waterfall
$ npm install --production
$ export PHOTOS_DIR=<the full directory containing your pictures>
$ export THUMBS_DIR=<the full directory where the thumbnails will be stored>
$ ./node_modules/.bin/nodemon app.js
```

And point your browser at http://localhost:3000

### On a remote server

On a remote server we recommend you use nginx as a reverse proxy, with the
following in the server section of your configuration file:

```
location / {
    proxy_pass    http://127.0.0.1:3000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

[pm2](http://pm2.keymetrics.io/) is also recommended as a better alternative to
nodemon for production sites.

## Developing

Install the development tools:

```
$ npm install
```

To compile the Elm code to JavaScript

```
$ elm-package install -y
$ ./node_modules/.bin/elm-make *.elm --debug --yes --warn --output=public/elm.js
$ ./node_modules/.bin/browserify -o out.js main.js
```

To run the ser

That's about it.
