'use strict';

/*
 Filename: /demo/app.js
 Created by: AtlasDev
 Updated: 6-3-2016
 Description: Server demo
*/

const Protocol = require('../');
var server = new Protocol({port: 25565, debug: true});

server.then(function (mc) {
    console.log('The server has been started at port 25565!');
}, function (error) {
    console.error('Could not start the server!');
    console.log(error);
    process.exit(1);
});
