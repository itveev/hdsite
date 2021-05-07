import Debug from 'debug';
import checkVer from '../../build/check.versions';
import config from '../../config';
import app from './app';
import logger from '../log/server';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
  process.env.SIDE = 'server';
}

const debug = Debug('site:server');

checkVer();

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// const uri = 'http://localhost:' + port;
const server = app.listen(port);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

logger.info('Started successfully');
