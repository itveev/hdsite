/**
 * Created by lucky on 21.04.16.
 */
// For print result:
// node bunyan ../../../tmp/logs/info.log
// -c 'this.reporter == 'server''
// -l error

import bunyan from 'bunyan';
import path from 'path';

const fileInfo = '../../tmp/logs/info.log';
const fileWarn = '../../tmp/logs/warn.log';
const fileError = '../../tmp/logs/error.log';
const nameApp = 'hdsite';

const base = bunyan.createLogger({
  name: nameApp,
  src: true,
  streams: [
    {
      level: 'info',
      path: path.join(__dirname, fileInfo),
    },
    {
      level: 'error',
      path: path.join(__dirname, fileError),
    },
    {
      level: 'warn',
      path: path.join(__dirname, fileWarn),
    },
  ],
});
export default base;
