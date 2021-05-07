/**
 * Created by lucky on 11.01.18.
 */

import str from '@/str/store';
import logger from '@/log/client';

const { method } = str;

export default (obj) => {
  if (!obj || !(obj.store instanceof Object)) {
    throw new Error('Init args err');
  }
  const { store } = obj;
  Object.keys(store.objProt).forEach((p) => {
    if (store[p]) {
      return;
    }
    // Object.defineProperty(store,`_${p}`,{
    //  writable : true,
    //  configurable : true,
    // });
    Object.defineProperty(store, p, {
      enumerable: true,
      configurable: true,
      get: () => {
        let res = null;
        if (obj.parse && obj.parse[p]) {
          try {
            res = JSON.parse(store[method.getProp](p));
          } catch (e) {
            logger.error(e);
            res = store[method.getProp](p);
          }
        } else {
          res = store[method.getProp](p);
        }
        return res || (obj.defs && obj.defs[p]);
      },
      set: (val) => {
        if (obj.valid && obj.valid[p]) {
          if (obj.valid[p](val)) {
            store[method.setProp](p, val);
          }
        } else {
          store[method.setProp](p, val);
        }
        return true;
      },
    });
  });
  return store;
};
