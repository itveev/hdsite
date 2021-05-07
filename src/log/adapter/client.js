/**
 * Created by lucky on 31.03.16.
 */
// import mountId from '../../str/mount';
import { extra as urlId } from '@/str/url';

export default {
  isDev() {
    const env = process && process.env && process.env.NODE_ENV;
    return env === 'development';
  },
  log(msg) {
    if (this.isDev()) {
      // eslint-disable-next-line no-console
      console.log(msg.obj);
      // const str = `${msg.lvl} report: ${msg.message} ${
      //   msg.info} ${msg.str} ${msg.stack}`;
      // document.getElementById(mountId.errId).textContent = str;
    } else if (msg.lvl !== 'info') {
      const req = msg;
      delete req.obj;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', urlId.siteSvcReport);
      xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.timeout = 5000;
      xhr.send(JSON.stringify(req));
    }
  },
};
