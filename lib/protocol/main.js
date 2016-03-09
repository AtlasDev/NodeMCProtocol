'use strict';

/*
 Filename: /protocol/main.js
 Created by: AtlasDev
 Updated: 8-3-2016
 Description: Manages the TCP server / Parses basic packages.
 */

const tcp = require("net");
const uuid = require('uuid');

const message = require('./message.js');
const decoder = require('./decoder.js');
const parser = require('./parser.js');
const procc = require('./procc.js');

/*
 Server object, responsable from the raw TCP connections.
 */
var Net = function (mc, cb) {
    mc._clients = [];
    this.server = tcp.createServer(function (client) {
        /* Avalable states:
            handshaking
            status
            login
            play
        */
        client.state = 'handshaking';
        client.uuid = uuid.v4();
        client.buff = new Buffer(0);
        client.compressed = false;
        client.encrypted = false;
        mc._clients[client.uuid] = client;
        if(mc.config.debug == true) {
            console.log('Client connected with ID '+client.uuid);
        }
        client.on('error', function (err) {
            if(err.code != 'ECONNRESET') {
                throw err;
            } else {
                delete mc._clients[client.uuid];
            }
        });
        client.on('close', function () {
            delete mc._clients[client.uuid];
            console.log('Client disconnected with ID '+client.uuid);
        });
        client.on('data', function (data) {
            client.buff = Buffer.concat([client.buff, data]);
            parsePackage(mc, client);
        });
    });

    this.server.listen(mc.config.port, mc.config.host, cb);
};

/*
 Parse an incomming package. does nothing when package not complete.
 */
var parsePackage = function (mc, client) {
    var lengthVarint = decoder.varint(client.buff);
    var buffLength = Buffer.byteLength(client.buff);
    //Hackish way to kick out legacy clients (some better way?)
    if(client.buff[1] !== 0 && client.state == 'handshaking') {
        delete mc._clients[client.uuid];
        client.destroy();
    }
    if(lengthVarint.decoded+lengthVarint.leng <= buffLength && buffLength !== 0) {
        var pack = client.buff.slice(lengthVarint.leng, lengthVarint.leng+lengthVarint.decoded);
        var packID = pack[0];
        var data = pack.slice(1);
        //Remove parsed data from buffer
        client.buff = client.buff.slice(lengthVarint.decoded+lengthVarint.leng);
        var parsed = parser(client.state, packID, data);
        if(parsed === false) {
            delete mc._clients[client.uuid];
            client.destroy();
        }
        procc(mc, client, packID, parsed);
        //Rerun till the buffer has no complete packages.
        if(Buffer.byteLength(client.buff) !== 0) {
            parsePackage(mc, client);
        }
    }
}

module.exports = Net;
