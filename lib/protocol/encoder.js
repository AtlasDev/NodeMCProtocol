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
        return varint.encode(int, new Buffer(varint.encodingLength(int)));
    },
    string: function (string) {
        var stringBuffer = new Buffer(string.trim());
        var length = varint.encode(Buffer.byteLength(stringBuffer), new Buffer(varint.encodingLength(Buffer.byteLength(stringBuffer))));
        return Buffer.concat([length, stringBuffer]);
    },
    unsignedShort: function (int) {

    },
    packet: function (compressed, packID, data) {
        if(compressed){
            //TODO
        } else {
            packID = varint.encode(packID, new Buffer(1));
            var length = varint.encode(Buffer.byteLength(data) + varint.encode.bytes, new Buffer(varint.encodingLength(Buffer.byteLength(data) + varint.encode.bytes)));
            return Buffer.concat([length, packID, data]);
        }
    }
}

module.exports = encoder;
