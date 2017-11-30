#!/bin/bash

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install git
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm update -g npm

git clone https://github.com/maxf/waterfall.git
cd waterfall
npm install
