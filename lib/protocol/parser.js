'use strict';

/*
 Filename: /protocol/parser.js
 Created by: AtlasDev
 Updated: 8-3-2016
 Description: Parses
*/

const decoder = require('./decoder.js');

/*
 Parses a message into a usable format.
 Returns a array with the parsed data (in order), false if unknown package ID or unexpected data.
 */
var parser = function (state, packID, buff) {
    switch (state) {
        case 'handshaking':
            switch (packID) {
                case 0:
                    /*
                        VarInt: Protocol version
                        String: Server address
                        Unsigned Short: Server port
                        Varint Enum: Next state
                    */
                    var version = decoder.varint(buff);
                    if(version === false) {
                        return false;
                    }
                    var address = decoder.string(version.rest);
                    if(address === false) {
                        return false;
                    }
                    var port = decoder.unsignedShort(address.rest);
                    if(port === false) {
                        return false;
                    }
                    var state = decoder.varint(port.rest);
                    if(state === false) {
                        return false;
                    }
                    return [version.decoded, address.decoded, port.decoded, state.decoded];
                    break;
                default:
                    return false;
            }
            break;
        case 'status':
            switch (packID) {
                case 0:
                    //Just return true, content is empty by protocol.
                    return [true];
                    break;
                case 1:
                    //Just return original buffer, no need to decode content.
                    return [buff];
                    break;
                default:
                    return false;
            }
            break;
        case 'login':
            switch (packID) {
                case 0:
                    break;
                default:
                    return false;
            }
            break;
        case 'play':
            switch (packID) {
                case 0:
                    break;
                default:
                    return false;
            }
            break;
        default:
            throw new Error('Invalid client state.');
    }
};

module.exports = parser;
