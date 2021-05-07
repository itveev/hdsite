/**
 * Created by lucky on 01.12.17.
 */

import str from '@/str/store';
import logger from '@/log/client';
import Base from '../class/base';
import factory from '../prop/factory';
import util from './util';
// user={
//  uid:'iser id',
//  fnm:'first name',
//  lnm:'last name'
//  ...look at user profile protocol
// }
class Users extends Base {
  [str.method.setUser](user) {
    if (user && user.uid) {
      this[str.method.setProp](user.uid, JSON.stringify(user));
    }
  }

  [str.method.getUser](uid) {
    const res = this[str.method.getProp](uid);
    if (res) {
      try {
        return JSON.parse(res);
      } catch (e) {
        logger.error(e);
      }
    }
    return res;
  }

  [str.method.appendUser](user) {
    if (user && user.uid) {
      let oldUser = this[str.method.getUser](user.uid);
      if (!oldUser) {
        oldUser = {};
      }
      Object.keys(user).forEach((prop) => {
        oldUser[prop] = user[prop];
      });
      this[str.method.setUser](oldUser);
    }
  }

  [str.method.setUsers](userArr) {
    if (userArr instanceof Array) {
      userArr.forEach((item) => {
        this[str.method.setUser](item);
      });
    }
  }

  [str.method.appendUsers](userArr) {
    if (userArr instanceof Array) {
      userArr.forEach((item) => {
        this[str.method.appendUser](item);
      });
    }
  }

  [str.method.getUsers](uidArr) {
    const users = new Map();
    if (uidArr instanceof Array) {
      uidArr.forEach((uid) => {
        const user = this[str.method.getUser](uid);
        if (user) {
          users.set(uid, user);
        }
      });
    }
    return users;
  }
}
export default {
  namespaced: true,
  state: factory({
    store: new Users(str.id.users, {}),
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
};
