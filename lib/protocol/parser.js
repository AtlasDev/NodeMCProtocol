'use strict';

/*
 Filename: /protocol/parser.js
 Created by: AtlasDev
 Updated: 6-3-2016
 Description: Parse incomming TCP messages
*/

var varint = require('varint');

var parser = function (message) {
    return new Promise(function(resolve, reject) {
        console.log(message);
        console.log(varint.decode(message));
        console.log(varint.decode.bytes);
        console.log(message.toString('utf8'));
        resolve();
    });
};

module.exports = parser;
