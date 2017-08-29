'use strict';

const app = require('../src/app.js');
const debug =  require ('debug')('nodestr:server');
const http = require ('http');
const normalizePort = require('normalize-port');

const port = normalizePort(process.env.PORT || '3000');

const server = http.createServer(app).listen(port, () => {
  console.log(`listening on ${port}`)
});

server.on('error', onError);
server.on('listening', onListening);


function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }
    const bind = typeof port === 'string' ?
    'Pipe' + port : 'Port' + port;
    switch(error.code){
        case 'EACCES':
        console.error(bind+ "requer privilégios");
        process.exit(1);
        break;
    
        case 'EADDRINUSE':
        console.error(bind+ "em uso");
        process.exit(1);
        break;

        default:
        throw error;
    }

}

function onListening(){
    const addr = server.address();
    const bind = typeof addr ==='string' 
    ? 'pipe' + addr
    : 'port' + addr.port;

    debug('listening on ' + bind);

}