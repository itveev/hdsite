/**
 * Created by lucky on 09.10.17.
 */
import sid from '@/str/id';
import ppid from '@/str/ptcl/prop';
import str from '@/str/store';
import Base from '../class/base';
import utils from '../../vue/controller/utils';
// import Vue from 'vue';
import factory from '../prop/factory';
import util from './util';
// let reqCtrl = new ReqCtrl(Vue.prototype);

class Org extends Base {
  [str.method.setComputedState]() {
    if (this.oid) {
      this.photo = utils.orgPhoto(this.oid);
    }
  }
}

export default {
  namespaced: true,
  state: factory({
    store: new Org(str.id.org, ppid.org),
    parse: {
      [sid.oid]: sid.oid,
      [sid.isPhoto]: sid.isPhoto,
    },
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
  modules: {
    newOrg: {
      namespaced: true,
      state: factory({
        store: new Org(str.id.newOrg, ppid.org),
        parse: {
          [sid.oid]: sid.oid,
        },
      }),
      mutations: {
        [str.mutation.change]: util.change,
      },
    },
  },
};
