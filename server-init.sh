#!/bin/bash

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install apache2 libapache2-mod-php nodejs npm git

cd /var/www/html
sudo git clone https://github.com/maxf/waterfall.git
git checkout server
sudo npm install
