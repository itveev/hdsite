/**
 * Created by lucky on 17.10.16.
 */

import apiId from '@/str/api';
import storeId from '@/str/store';
import { extra as urlId, external } from '@/str/url';
import Base from './base';
import ppid from '@/str/ptcl/prop';
import sid from '@/str/id';


export default class extends Base {
  constructor(vueEL, options) {
    super(vueEL);
    this.router = options.router;
    this.store = options.store;
  }

  async loadUser(uid) {
    const params = {
      req: {
        m: apiId.usr.getProfile,
        uid,
      },
      url: external.usrSvc,
    };
    const res = await this.vo.$_hd.ctrl.request.getDataVR(params);
    const usr = {
      uid,
    };
    const prot = ppid.user;
    Object.keys(prot).forEach((p) => {
      if (res.data[prot[p]]) {
        usr[p] = res.data[prot[p]];
      }
    });
    return usr;
  }

  async loadUsers(prm) {
    const users = [];
    const params = {
      req: {},
      url: external.usrSvc,
    };
    if (prm.ids) {
      const arrIds = Array.from(prm.ids);
      if (arrIds.length === 0) {
        return users;
      }
      params.req.m = apiId.usr.getProfiles;
      params.req.uids = arrIds;
    } else {
      params.req.m = apiId.usr.getProfilesByRole;
      params.req.role = prm.role;
      params.req.mode = prm.mode || sid.explicit;
    }
    const res = await this.vo.$_hd.ctrl.request.getDataVR(params);
    const prot = ppid.user;
    if (res.ok) {
      res.data.forEach((cur) => {
        const usr = {};
        Object.keys(prot).forEach((p) => {
          if (cur[prot[p]]) {
            usr[p] = cur[prot[p]];
          }
        });
        users.push(usr);
      });
      this.store.commit({
        type: storeId.mutation.usersChange,
        method: storeId.method.appendUsers,
        state: users,
      });
    }
    return users;
  }

  static getNames(users) {
    const namesObj = {};
    users.forEach((item) => {
      namesObj[item.uid] = this.getName(item);
    });
    return namesObj;
  }

  static getSigns(users) {
    const signsObj = {};
    users.forEach((item) => {
      signsObj[item.uid] = this.getSign(item);
    });
    return signsObj;
  }

  static getProfUrl(uid) {
    return `${urlId.usrCmn}/${uid}`;
  }

  static isRoleUser(user) {
    return ppid.role.user === user.role;
  }

  static getAbbr(user) {
    const str = user && user.display;
    if (!str) {
      return '';
    }
    const arr = str.split(' ');
    return arr[0].charAt(0) + ((arr.length > 1) ? arr[arr.length - 1].charAt(0) : '');
  }

  static getName(user) {
    return user ? user.display || user.nick || `${user.role} ${user.uid}` : '';
  }

  static getSign(user) {
    return user ? user.sign : '';
  }
}
