#!/bin/bash

# Update & install dependencies for Chromium
apt-get update
apt-get install -y wget ca-certificates fonts-liberation libappindicator3-1 libasound2 \
libatk-bridge2.0-0 libnspr4 libnss3 libxss1 xdg-utils

# Start Node app
node index.js
