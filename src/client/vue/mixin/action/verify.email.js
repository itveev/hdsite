/**
 * Created by fox on 27.02.17.
 */
import storeId from '@/str/store';
import apiId from '@/str/api';
import sid from '@/str/id';
import { internal as urlId, external } from '@/str/url';
// params={
//  type,
//  oid,
//  uid,
//  mid,
//  cid,
//  vo
// }

export default {
  type: 've',
  async execute(options) {
    const { vo } = options;
    const params = {
      req: {
        m: apiId.usr.confirmUserAction,
        code: options.code,
        oid: vo.$store.state.org.oid,
      },
      url: external.usrSvc,
    };
    const res = await vo.$_hd.ctrl.request.getDataVR(params);
    vo.$store.commit({
      type: storeId.mutation.basicChange,
      prop: sid.auth,
      state: res.data.auth,
    });
    vo.$store.commit({
      type: storeId.mutation.profileChange,
      method: storeId.method.clearSetDirty,
      state: res.data,
    });
    await this.goAhead(options);
  },
  async goAhead(options) {
    options.vo.$router.push(urlId.tickets);
  },
};
