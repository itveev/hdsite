/**
 * Created by lucky on 8.05.19.
 */

import eid from '@/str/ptcl/error';
import { internal } from '@/str/url';
import storeId from '@/str/store';
import sid from '@/str/id';
import Base from './base';
import logger from '@/log/client';

export default class extends Base {
  constructor(vueEL, options) {
    super(vueEL);
    this.router = options.router;
    this.store = options.store;
  }

  notify(err) {
    this.store.commit({
      type: storeId.mutation.notificationChange,
      func: sid.add,
      msg: err,
    });
    return false;
  }

  auth() {
    // TODO: Need right notification
    this.notify(eid.spec.eAuthExp);
    this.router.push(internal.signin);
  }

  eptcl(res) {
    this.notify(eid.spec.ePtcl);
    logger.error(res);
  }

  // Need to add res.ok and set true or false
  process(res) {
    if (res.params.skip && res.params.skip.some(item => item === res.data.resCode)) {
      res.ok = true;
    } else if (this[res.data.resCode]) {
      res.ok = this[res.data.resCode](res);
    } else if (res.data.res === eid.err.type) {
      // Unknown error
      res.ok = false;
      logger.error(res);
      this.eUnknown();
    } else if (res.data.res === eid.warn.type) {
      // Unknown warn
      res.ok = true;
      logger.warn(res);
    } else {
      res.ok = true;
      logger.info(res.data);
    }
  }

  // Errors
  [eid.err.authExpired] = this.auth;

  [eid.err.authFailed] = this.auth;

  [eid.err.invalidFormat] = this.eptcl;

  [eid.err.invalidData] = this.eptcl;

  [eid.err.invalidSetAttr] = this.eptcl;

  [eid.err.invalidFunc] = this.eptcl;

  [eid.err.accessDenied] = () => this.notify(eid.spec.eNoAccess);

  [eid.err.emailAuthFailed] = () => this.notify(eid.spec.eAuthFailed);

  [eid.err.accountDisabled] = () => this.notify(eid.spec.eAccDisabled);

  [eid.err.accountDeleted] = () => this.notify(eid.spec.eAccDel);

  [eid.err.notVerified] = () => this.notify(eid.spec.eNotVerified);

  [eid.err.emailRequired] = () => this.notify(eid.spec.eOauthEmail); // TODO: log?

  [eid.err.accountNotFound] = () => this.notify(eid.spec.eNoAcc);

  [eid.err.dataNotFound] = () => this.notify(eid.spec.eNoData);

  // Warnings
  [eid.warn.updToken](res) {
    this.store.commit({
      type: storeId.mutation.basicChange,
      prop: sid.auth,
      val: res.data.refresh_token,
    });
    return true;
  }

  // Internal
  eSrvUnvl = () => { this.notify(eid.spec.eSrvUnvl); };

  eUnknown = () => { this.notify(eid.spec.eUnknown); };
}
