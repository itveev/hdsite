/**
 * Created by fox on 27.02.17.
 */

import storeId from '@/str/store';
import sid from '@/str/id';
import apiId from '@/str/api';
import ppid from '@/str/ptcl/prop';
import { internal as urlId } from '@/str/url';

// params={
//  type,
//  oid,
//  uid,
//  mid,
//  cid,
//  vo
// }

export default {
  type: 'msg',
  async execute(options) {
    const strStore = storeId;
    options.vo.$store.commit({
      type: strStore.mutation.actionChange,
      method: strStore.method.clearSetDirty,
      state: options,
    });
    let res = await this.getStatus(options);
    if (res.status === ppid.status.user.fresh) {
      options.vo.$router.push(urlId.setPass);
      return;
    }
    res = await options.vo.$_hd.ctrl.request.checkToken(options);
    if (!res) {
      options.vo.$router.push(urlId.signin);
      return;
    }
    await this.goAhead(options);
  },

  async goAhead(options) {
    const res = await this.loadMsg(options);
    this.$store.commit({
      type: storeId.mutation.commentsChange,
      method: storeId.method.clearSetDirty,
      state: res.data,
    });
    this.$store.commit({
      type: storeId.mutation.actionChange,
      prop: sid.type,
      val: null,
    });
    options.vo.$router.push(urlId.ticket);
  },

  async loadMsg(options) {
    const params = {
      req: {
        m: apiId.msg.getMessage,
        mid: options.vo.$store.state.action.mid,
      },
    };
    const res = await options.vo.$_hd.ctrl.request.getDataVR(params);
    return res;
  },

  // async checkToken(options) {
  //   if (!options.vo.$store.state.basic.auth) {
  //     return {
  //       data: {
  //         resCode: errId.err.invalidData,
  //       },
  //     };
  //   }
  //   const params = {
  //     req: {
  //       m: apiId.usr.checkAuthToken,
  //       oid: options.oid,
  //       uid: options.uid,
  //     },
  //   };
  //   const res = await options.vo.$_hd.ctrl.request.getDataVR(params);
  //   return res;
  // },

  async getStatus(options) {
    if (!options.code) {
      const e = new Error('No auth code');
      e.controlled = true;
      throw e;
    }
    const params = {
      req: {
        m: apiId.usr.getAccountStatus,
        oid: options.oid,
        // uid: options.uid,
        code: options.code,
      },
    };
    const res = await options.vo.$_hd.ctrl.request.getDataVR(params);
    return res;
  },
};
