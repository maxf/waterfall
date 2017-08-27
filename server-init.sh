#!/bin/bash

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install apache2 libapache2-mod-php nodejs nodejs-legacy npm git

cd /var/www/html
sudo git clone https://github.com/maxf/waterfall.git
sudo cd waterfall
sudo git checkout server
sudo npm install
sudo mkdir uploads
sudo chown -R a+rwx .
