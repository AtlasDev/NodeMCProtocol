'use strict';

/*
 Filename: /server.js
 Created by: AtlasDev
 Updated: 8-3-2016
 Description: Main server file
 */

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require("fs"));

const Protocol = require(__dirname+'/protocol/main.js');

/*
 Main object, saves everything.
 */
var mc = {};

/*
 Recommented mc version, used to report recommented version.
 The arrays contain:
  - 0: protocol version
  - 1: name of the version
 */
mc.version = [107, '1.9'];

/*
 Supported mc versions, used to filter out unsupported clients.
 An array of arrays. the arrays contain:
  - 0: protocol version
  - 1: name of the version
 */
mc.versions = [
    [107, '1.9']
];

/*
 Init function

 @param {Object} config
    Config to use for the server.

 @return {Promise}
    Promise for server start.
        Resolve:
         {Object} mc Object to mod the server (see docs).
        Reject:
         {Error} err Error object.
 */
var server = function (config) {
    return new Promise(function (resolve, reject) {
        fs.readFileAsync(__dirname+'/config.default.json', 'utf8')
        .then(JSON.parse)
        .then(function(defaults) {
            mc.config = defaults;
            for (var prop in config) {
                mc.config[prop] = config[prop];
            }
            mc._net = new Protocol(mc, function () {
                resolve(mc);
            });
        })
        .catch(function(err) {
            reject(err);
        });
    });
}

module.exports = server;
