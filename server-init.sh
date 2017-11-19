#!/bin/bash

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install nginx git
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm update -g npm pm2

git clone https://github.com/maxf/waterfall.git
cd waterfall
npm install
pm2 start process.yml
