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
        console.log(message[0], ' test');
        console.log(message.length);
        console.log(message.slice(2));
        console.log(Buffer.byteLength(message.slice(2), 'utf8'));
        console.log(varint.decode([0x76]));
        resolve();
    });
};

module.exports = parser;
