import { external } from '@/str/url';
import basicStore from '@/client/store/vuex/basic';

export default {
  orgPhoto(oid) {
    const time = new Date().getTime();
    return `${external.orgLogo}${oid}&time=${time}`;
  },

  // TODO: FIX! Not working
  userPhoto(uid, oid) {
    const encAuth = encodeURIComponent(basicStore.state.auth);
    // const { oid } = orgStore.state;
    const defUid = uid;
    return `${external.userAva}${encAuth}&id=${oid}:${defUid}&time=${
      new Date().getTime()}`;
  },
};
