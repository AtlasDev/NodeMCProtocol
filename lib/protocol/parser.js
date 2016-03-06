'use strict';

/*
 Filename: /protocol/parser.js
 Created by: AtlasDev
 Updated: 6-3-2016
 Description: Parse incomming TCP messages
*/

var parser = function (message) {
    return new Promise(function(resolve, reject) {
        console.log(message.toString());
        resolve();
    });
};

module.exports = parser;
