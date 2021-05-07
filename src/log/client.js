/**
 * Created by lucky on 28.04.16.
 */

import clientAdapter from './adapter/client';
import Logger from './logger';

const clientLog = new Logger(clientAdapter);
export default clientLog;
