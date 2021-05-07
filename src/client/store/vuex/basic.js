/**
 * Created by lucky on 09.10.17.
 */

import ppid from '@/str/ptcl/prop';
import sid from '@/str/id';
import str from '@/str/store';
import { internal as urlId } from '@/str/url';
import { getAuthArr, getCmnArr } from '@/client/vue/routes';
import Base from '../class/base';
import ValCtrl from '../../vue/controller/validator';
// import Vue from 'vue';
import factory from '../prop/factory';
import util from './util';
import Page from '../../vue/display/page';
// let reqCtrl = new ReqCtrl(Vue.prototype);

const authPages = new Page(getAuthArr());
const cmnPages = new Page(getCmnArr());

// TODO: This array should be construct from route.js object, to prevent copy paste
// and code duplicate
const ticketPage = new Page([
  urlId.tickets,
  urlId.ticket,
  urlId.draft,
]);

const profilePage = new Page([urlId.profile]);

export default {
  namespaced: true,
  state: factory({
    store: new Base(str.id.basic, ppid.basic),
    defs: {
      [sid.locale]: sid.en,
      [sid.checking]: false,
    },
    parse: {
      [sid.checking]: sid.checking,
    },
    valid: {
      [sid.locale]: val => ValCtrl.isStr(val) && (val.length === 2),
    },
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
  getters: {
    [str.getters.isCurPage]: state => page => state.page === page,
    [str.getters.isAuth](state/* , getters, rootState */) {
      return authPages.display(state);
    },
    [str.getters.isCmn](state/* , getters, rootState */) {
      return cmnPages.display(state);
    },
    [str.getters.isInternal]: (state, getters) => {
      const domain = ValCtrl.getSubDomain();
      return getters[str.getters.isAuth] || (domain
        && getters[str.getters.isCmn]);
    },
    [str.getters.isTicket](state/* , getters, rootState */) {
      return ticketPage.display(state);
    },
    [str.getters.isProfile](state/* , getters, rootState */) {
      return profilePage.display(state);
    },
  },
};
