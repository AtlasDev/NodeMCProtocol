'use strict';

/*
 Filename: /protocol/message.js
 Created by: AtlasDev
 Updated: 6-3-2016
 Description: Creates messages for sending.
*/

const varint = require('varint');

var message = function (packID, data) {
    var packet = packID+data;
    packet = addLength(packet);
    return packet;
};

var addLength = function (packet) {
    return varint.encode(packet.length)+packet;
}

module.exports = message;
