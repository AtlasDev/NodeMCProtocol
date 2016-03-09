# NodeMCProtocol
Minecraft server protocol written in Node.JS. I'm working on it to learn stuff, and it is NOT likely to every be a full blown server (maybe a basic server).

 > **Watch out!** This project is very mutch in process and very mutch unstable, not recommented to use in any way at this point. Shoot me a message if you want to help at the project.

## Features:
 - 

## How to use:
first you need to include the protocol into your project:

`npm install nodemcprotocol --save`

Now it is time to create a server, you can make some changes to the config if you want. The default config is found [here](github.com/AtlasDev/NodeMCProtocol/blob/master/lib/config.default.json).

The object creation returns a promis, like a lot of things in NodeMCProtocol.
```JavaScript
const Protocol = require('nodemcprotocol');

const options = {
    port: 25566
}

var server = new Protocol(options);

server.then(function () {
    console.log('The server has been started at port 25566!');
}, function (error) {
    console.error('Could not start the server!');
    console.error(err);
    process.exit(1);
});
```

#### What now?
NodeMCProtocol is completely modable. Take a look at the [wiki](https://github.com/AtlasDev/NodeMCProtocol/wiki) for the documentation!
