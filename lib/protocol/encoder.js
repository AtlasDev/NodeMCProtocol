'use strict';

/*
 Filename: /protocol/encoder.js
 Created by: AtlasDev
 Updated: 9-3-2016
 Description: Encode specific package datatypes.
 */

const varint = require('varint');

/*
 Encode datatypes.
 Returns encoded data as buffer, false if invalid.
 */
var encoder = {
    varint: function (int) {
        return varint.encode(int);
    },
    string: function (string) {
        var length = varint.encode(Buffer.byteLength(string, 'utf8'), new Buffer(varint.encodingLength(Buffer.byteLength(string, 'utf8'))));
        return length + string.toString("utf8");
    },
    unsignedShort: function (int) {

    },
    packet: function (compressed, packID, data) {
        if(compressed){
            //TODO
        } else {
            packID = varint.encode(packID, new Buffer(1));
            var length = varint.encode(Buffer.byteLength(data) + varint.encode.bytes, new Buffer(varint.encodingLength(Buffer.byteLength(data) + varint.encode.bytes)));
            //return Buffer.concatlength+packID+new Buffer(data);
            return Buffer.concat([length, packID, new Buffer(data)]);
        }
    }
}

module.exports = encoder;
