/**
 * Created by lucky on 31.03.16.
 */
// For print result:
// node bunyan ../../../tmp/logs/info.log
// -c 'this.reporter == 'server''
// -l error
import base from '../base';

export default {
  isDev() {
    const env = process && process.env && process.env.NODE_ENV;
    return env === 'development';
  },
  log(msg) {
    if (this.isDev()) {
      console.log(msg.obj);
    } else if (msg.lvl !== 'info') {
      const {
        lvl, info, message, reporter, str, stack, obj,
      } = msg;
      base[lvl]({
        reporter, info, str, stack, obj,
      }, message);
    }
  },
};
