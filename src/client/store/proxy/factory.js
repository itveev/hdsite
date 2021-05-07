/**
 * Created by lucky on 09.10.17.
 */

import str from '@/str/store';
import ValCtrl from '../../vue/controller/validator';

const { method } = str;

export default (obj) => {
  if (!obj || !(obj.store instanceof Object)) {
    throw new Error('Init args err');
  }
  return new Proxy(obj.store, {
    get(target, prop) {
      let res = null;
      if (ValCtrl.isNumStr(prop)) {
        if (target[prop] instanceof Function) {
          res = (...args) => target[prop](...args);
        } else if (obj.parse && obj.parse[prop]) {
          res = JSON.parse(target[method.getProp](prop));
        } else {
          res = target[method.getProp](prop);
        }
      }
      return res || (obj.defs && obj.defs[prop]);
    },
    set(target, prop, val) {
      if (ValCtrl.isNumStr(prop)) {
        if (obj.valid && obj.valid[prop]) {
          if (obj.valid[prop](val)) {
            target[method.setProp](prop, val);
          }
        } else {
          target[method.setProp](prop, val);
        }
      }
      return true;
    },
  });
};
