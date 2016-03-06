'use strict';

/*
 Filename: /protocol/main.js
 Created by: AtlasDev
 Updated: 6-3-2016
 Description: Manages the TCP server
 */

const tcp = require("net");
const uuid = require('uuid');
const varint = require('varint');

const parser = require('./parser.js');
const message = require('./message.js');

var clients = {};

/*
 Server object, responsable from the raw TCP connections.
 */
var Net = function (mc, cb) {
    this.server = tcp.createServer(function (client) {
        client.state = 'Handshake';
        client.uuid = uuid.v4();
        clients[client.uuid] = client;



        client.write(message(0x00,
            varint.encode(107)+varint.encode(Buffer.byteLength("localhost", 'utf8'))+"localhost"+new Buffer(4).writeUInt16BE(0x63DD, 0)+varint.encode(2)
        ));



        if(mc.config.debug == true) {
            console.log('Client connected with ID '+client.uuid);
        }
        client.on('error', function (err) {
            if(err.code != 'ECONNRESET') {
                throw err;
            } else {
                clients[client.uuid] = undefined;
            }
        });
        client.on('close', function () {
            clients[client.uuid] = undefined;
        });
        client.on('data', function (data) {
            parser(data).then(function () {
                console.log('data');
            }).catch(function () {
                client.destroy();
            })
        });
    });

    this.server.listen(mc.config.port, mc.config.host, cb);
};

module.exports = Net;
