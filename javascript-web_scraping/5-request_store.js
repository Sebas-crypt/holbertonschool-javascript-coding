#!/usr/bin/node
/* eslint-disable */

const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const fileName = process.argv[3];

const fileStream = fs.createWriteStream(fileName);
request(url).pipe(fileStream);
