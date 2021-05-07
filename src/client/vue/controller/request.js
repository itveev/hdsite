/**
 * Created by fox on 13.10.16.
 */
/* eslint no-await-in-loop: off */
import sid from '@/str/id';
import storeId from '@/str/store';
import logger from '@/log/client';
import { internal as urlId, external } from '@/str/url';
import hdId from '@/str/hd';
import apiId from '@/str/api';
import ppid from '@/str/ptcl/prop';
import errId from '@/str/ptcl/error';
import basicStore from '@/client/store/vuex/basic';
import utils from './utils';
import Base from './base';

export default class extends Base {
  constructor(vueEL, options) {
    super(vueEL);
    // Global Vue for http
    this.vue = options.Vue;
    this.router = options.router;
    this.store = options.store;
  }

  // TODO: Deprecated, delete after full update to getDataVR
  auth() {
    this.router.push(urlId.signin);
  }

  async loadDomainOrgInfo(required) {
    // const { vue, store } = obj;
    const domain = this.vo.$_hd.ctrl.vldt.constructor.getSubDomain();
    // const syn = window.location.hostname;
    const params = {
      req: {
        m: apiId.org.getInfo,
      },
      url: external.orgSvc,
      // Ignore errors for error controller
      skip: [errId.err.dataNotFound],
    };
    const curHost = window.location.host.replace(`${domain}.`, '');
    const redirUrl = `${window.location.protocol}//${curHost}${urlId.login}`;
    const resObj = {
      // route: null,
      // url: null,
      // loaded: null,
    };
    if (domain && this.vo.$_hd.ctrl.vldt.domainValid(domain)) {
      params.req.domain = domain;
      const res = await this.getDataVR(params);
      if (res.err || !res.data) {
        // TODO: error ?!
      } else if (res.data.resCode === errId.err.dataNotFound
        || (res.data.status === ppid.status.org.free)) {
        resObj.url = redirUrl;
      } else if (res.data.status) {
        this.store.commit({
          type: storeId.mutation.orgChange,
          method: storeId.method.clearSetDirty,
          state: res.data,
        });
        resObj.loaded = true;
      } else {
        // TODO: error ?!
      }
    } else if (required) {
      resObj.route = urlId.login;
    }
    return resObj;
  }

  async checkToken(options) {
    if (!this.store.state.basic.auth) {
      return false;
    }
    const params = {
      req: {
        m: apiId.usr.checkAuthToken,
        oid: options.oid,
        uid: options.uid,
      },
      url: external.usrSvc,
    };
    const res = await this.getDataVR(params);
    return res.data.state;
  }

  // ////////////////////////////

  async send(params) {
    if (params && params.req && params.url) {
      // logger.info('req');
      logger.info(params);
      const config = {
        headers: {
          Accept: 'application/json',
        },
      };
      if (params.progress) {
        config.uploadProgress = params.progress;
      }
      if (!params.isFormData) {
        config.timeout = params.timeout;
        config.headers['Content-Type'] = 'text/plain';
      }
      const res = await this.vue.http.post(params.url, params.req, config);
      if (res.ok) {
        return {
          data: res.body,
          params,
        };
      }
      return {
        err: `Response status ${res.status} ${res.statusText}`,
        params,
        info: res,
      };
    }
    throw new Error('Invalid request params');
  }

  async timeoutReqVR(timeout, params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.send(params).catch(err => ({
          err: `Response status ${err.status} ${err.statusText}`,
          params,
          info: err,
        })));
      }, timeout);
    });
  }

  abort() {
    // vo
    this.vue.previousRequest.abort();
  }

  // Prepare params for send
  getUsrPrm(params) {
    let formed = params;
    if (!(params instanceof Object)) {
      formed = {};
    }
    formed.url = formed.url || external.msgSvc;
    formed.isFormData = formed.isFormData || false;
    formed.req = formed.req || {};
    formed.req.auth = this.store.state.basic.auth;
    if (formed.isFormData) {
      const { formData, ...req } = formed.req;
      formData.append('request', JSON.stringify(req));
      formed.req = formData;
    } else {
      formed.req = JSON.stringify(formed.req);
    }
    formed.timeout = formed.timeout || hdId.req.timeout;
    formed.repeatCount = formed.repeatCount || hdId.req.repeatCount;
    formed.repeatDelay = formed.repeatDelay || hdId.req.repeatDelay;
    return formed;
  }

  // get data vue resource
  async getDataVR(params) {
    const prm = this.getUsrPrm(params);
    let timeout = 0;
    const count = prm.repeatCount || 1;
    let res = null;
    for (let i = 0; i < count; i += 1) {
      // 0 or single delay
      timeout = (!!i) * prm.repeatDelay;
      prm.timeout += timeout;
      res = await this.timeoutReqVR(timeout, prm);
      if (res.err || !res.data) {
        logger.error(res);
      } else {
        this.vo.$_hd.ctrl.error.process(res);
        break;
      }
    }
    if (res.err || !res.data) {
      this.vo.$_hd.ctrl.error.eSrvUnvl();
    }
    return res;
  }

  // ////////////////////////////

  // TODO: Deprecated, delete after full update to getDataVR
  getParams(params) {
    let formed = params;
    if (!(params instanceof Object)) {
      formed = {};
    }
    formed.req = (params && params.req) || {};
    formed.req.auth = this.store.state.basic.auth;
    formed.timeout = (params && params.timeout) || hdId.req.timeout;
    formed.repeatCount = (params && params.repeatCount) || hdId.req.repeatCount;
    formed.repeatDelay = (params && params.repeatDelay) || hdId.req.repeatDelay;
    formed.xhr = null;
    formed.xhp = null;
    formed.isFormData = (params && params.isFormData) || false;
    return formed;
  }

  // TODO: Deprecated, delete after full update to getDataVR
  async getData(params) {
    let timeout = 0;
    const count = params.repeatCount || 1;
    let res = null;
    for (let i = 0; i < count; i += 1) {
      // 0 or single delay
      timeout = (!!i) * params.repeatDelay;
      params.timeout += timeout;
      res = await this.constructor.timeoutReq(timeout, params);
      if (res.err) {
        logger.error(res);
      } else if (!res.data) {
        logger.error(res);
      } else if (res.data.res === errId.err.type) {
        if (res.data.resCode === errId.err.authExpired
          || res.data.resCode === errId.err.authFailed) {
          this.auth();
        } else {
          logger.error(res);
        }
        break;
      } else if (res.data.res === errId.warn.type) {
        if (res.data.resCode === errId.warn.updToken) {
          this.store.commit({
            type: storeId.mutation.basicChange,
            prop: sid.auth,
            val: res.data.refresh_token,
          });
        } else {
          logger.warn(res.data);
        }
        break;
      } else {
        logger.info(res.data);
        break;
      }
    }
    return res;
  }

  // TODO: Deprecated, delete after full update to getDataVR
  static async timeoutReq(timeout, params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(params.xhp.then());
      }, timeout);
    });
  }

  // TODO: FIX! Not working
  static userPhoto(uid, oid) {
    return utils.userPhoto(uid, oid);
  }

  static orgPhoto(oid) {
    return utils.orgPhoto(oid);
  }

  static attachment(file) {
    if (!file) {
      return null;
    }
    const encAuth = encodeURIComponent(basicStore.state.auth);
    return `${external.attachment}${encAuth}&mid=${file.mid}
      &cid=${file.cid}&aid=${file.aid}`;
  }
}
