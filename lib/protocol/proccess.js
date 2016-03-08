'use strict';

/*
 Filename: /protocol/proccess.js
 Created by: AtlasDev
 Updated: 8-3-2016
 Description: Process decoded messages futher, send it out to the rest of the server.
 */

/*
 Proccess incomming messages to the rest of the server.
 */
var procc = function (mc, client, packID, message) {
    switch (client.state) {
        case 'handshaking':
            switch (packID) {
                case 0:
                    client.joinedHost = message[1];
                    client.joinedPort = message[2];
                    if(message[3] === 1) {
                        //Server list ping
                        client.state = 'status';
                    } else if(message[3] === 2) {
                        //Joing player
                        client.state = 'login';
                    } else {
                        delete mc._clients[client.uuid];
                        client.destroy();
                    }
                    break;
                default:
                    delete mc._clients[client.uuid];
                    client.destroy();
            }
            break;
        case 'status':
            switch (packID) {
                case 0:
                    
                    break;
                default:
                    delete mc._clients[client.uuid];
                    client.destroy();
            }
            break;
        case 'login':
            break;
        case 'play':
            break;
        default:
            throw new Error('Invalid client state.');
    }
};

module.exports = procc;
