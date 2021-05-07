/**
 * Created by fox on 10.09.18.
 */
import sid from '@/str/id';
import hdId from '@/str/hd';
import str from '@/str/store';

class Notification {
  constructor() {
    this.shown = [];
    this.hidden = [];
    this.count = 0;
    this.filter = new Map();
  }
}

export default {
  namespaced: true,
  state: new Notification(),
  mutations: {
    [str.mutation.change](state, payload) {
      if (!(payload instanceof Object)) {
        throw new Error('Init args err');
      }
      if (payload.func) {
        if ((payload.func === sid.add) && !state.filter.get(payload.msg.code)) {
          state.count += 1;
          payload.msg.id = state.count;
          state.filter.set(payload.msg.code, payload.msg);
          if (state.shown.length < hdId.notificationCount) {
            state.shown.push(payload.msg);
          } else {
            state.hidden.push(payload.msg);
          }
        } else if (payload.func === sid.rm) {
          const msg = state.hidden.shift();
          state.filter.delete(state.shown[payload.index].code);
          if (msg) {
            state.shown.splice(payload.index, 1, msg);
          } else {
            state.shown.splice(payload.index, 1);
          }
        }
      }
    },
  },
  actions: {
  },
};
