'use strict';

/*
 Filename: /protocol/decoder.js
 Created by: AtlasDev
 Updated: 8-3-2016
 Description: Decode specific package datatypes.
 */

const varint = require('varint');

/*
Decode datatypes.

Returns object containing:
   decoded: decoded data, various data types.
   leng: length used in bytes, if able to gain from context.
   rest: resting buffer, after splising the buffer.
Returns false if invalid
*/
var decoder = {
    varint: function (buff) {
        var decoded = varint.decode(buff);
        if(typeof decoded == 'undefined') {
            return false;
        }
        return {
            decoded: decoded,
            leng: varint.decode.bytes,
            rest: buff.slice(varint.decode.bytes)
        };
    },
    string: function (buff) {
        var length = varint.decode(buff);
        if(typeof length == 'undefined') {
            return false;
        }
        var decodeLength = varint.decode.bytes;
        var totalLength = length + decodeLength;
        if(Buffer.byteLength(buff) < totalLength) {
            return false;
        }
        return {
            decoded: buff.slice(varint.decode.bytes, totalLength).toString('utf8'),
            leng: totalLength,
            rest: buff.slice(totalLength)
        }
    },
    unsignedShort: function (buff) {
        if(Buffer.byteLength(buff) < 2) {
            return false;
        }
        return {
            decoded: buff.readUIntBE(0, 2),
            leng: 2,
            rest: buff.slice(2)
        }
    }
}

module.exports = decoder;
