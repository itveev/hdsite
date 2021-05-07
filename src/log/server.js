/**
 * Created by lucky on 28.04.16.
 */
import serverAdapter from './adapter/server';
import Logger from './logger';

const serverLog = new Logger(serverAdapter);
export default serverLog;
