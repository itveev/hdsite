/**
 * Created by lucky on 09.10.17.
 */
/* eslint prefer-destructuring: off */
// const payload = {
//  prop : p,
//  func : p.func
//  val : value,
//
//  method : mt,
//  state : state,
// };
import sid from '@/str/id';

export default {
  change(state, payload) {
    if (!(payload instanceof Object)) {
      throw new Error('Init args err');
    }
    if (payload.prop) {
      if (payload.func) {
        if (payload.func === sid.take) {
          ((state[payload.prop])[payload.args[0]])[payload.args[1]] = payload.args[2];
        } else {
          payload.args
            ? (state[payload.prop])[payload.func](...payload.args)
            : (state[payload.prop])[payload.func]();
        }
      } else if ((payload.index !== undefined) && payload.attr) {
        ((state[payload.prop])[payload.index])[payload.attr] = payload.val;
      } else {
        state[payload.prop] = payload.val;
      }
    }
    if (payload.method) {
      state[payload.method](payload.state);
    }
    // is payload.func
    // func(state)
  },
  // function attachment
};
