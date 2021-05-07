/* eslint class-methods-use-this: 'off' */
/**
 * Created by lucky on 09.10.17.
 */

import sid from '@/str/id';
import str from '@/str/store';
import orgStore from './org';
import Base from '../class/base';
import ppid from '../../../str/ptcl/prop';
import utils from '../../vue/controller/utils';
import UsrCtrl from '../../vue/controller/user';
// import Vue from 'vue';
import factory from '../prop/factory';
import util from './util';
import Role from '../../vue/display/role';
// let reqCtrl = new ReqCtrl(Vue.prototype);

class Profile extends Base {
  [str.method.setComputedState]() {
    if (this.uid) {
      this.photo = utils.userPhoto(this.uid, orgStore.state.oid);
    }
    this.abbr = UsrCtrl.getAbbr(this);
  }

  // get [sid.abbr]() {
  //   return UsrCtrl.getAbbr(this);
  // }

  // set [sid.abbr](val) {
  //   // do nothing
  // }
}

const agentRole = new Role([
  ppid.role.agent,
  ppid.role.owner,
  ppid.role.admin,
]);

export default {
  namespaced: true,
  state: factory({
    store: new Profile(str.id.profile, ppid.user),
    parse: {
      [sid.uid]: sid.uid,
      [sid.isPhoto]: sid.isPhoto,
    },
    defs: {
      [sid.sign]: '',
    },
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
  getters: {
    [str.getters.isAgent](state /* , getters, rootState */) {
      return agentRole.display(state);
    },
    [str.getters.isChangeSubj](state, getters) {
      // Should be like 'user is (not customer) or ticket owner'
      // todo: add additional check 'user is ticket owner'
      return getters[str.getters.isAgent];
    },
  },
};
