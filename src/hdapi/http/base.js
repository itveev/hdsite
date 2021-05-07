/**
 * Created by fox on 07.06.16.
 */

import hdStr from '@/str/hd';

export default class {
  constructor(url) {
    this.url = url;
    this.timeout = hdStr.req.timeout;
  }

  sendReq(/* params */) {
    return this.check({});
  }
  // check(params) {
  //  if (!(params instanceof Object)) {
  //    params = {};
  //  }
  //  let checked = params || {
  //      req: null,
  //      cont: null,
  //      callback: null
  //    };
  //  checked.req = checked.req || {};
  //  checked.callback = checked.callback || ((err, res)=> {
  //      if (err) {
  //        console.log('Error ' + err);
  //      }
  //      else {
  //        console.log('Success ' + res);
  //      }
  //    });
  //  return checked;
  // }
}
