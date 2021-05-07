/**
 * Created by lucky on 09.10.17.
 */

import ppid from '@/str/ptcl/prop';
import sid from '@/str/id';
import str from '@/str/store';
import Base from '../class/base';
import factory from '../prop/factory';
import util from './util';

export default {
  namespaced: true,
  state: factory({
    store: new Base(str.id.action, ppid.action),
    parse: {
      [sid.uid]: sid.uid,
      [sid.oid]: sid.oid,
      [sid.cid]: sid.cid,
      [sid.mid]: sid.mid,
    },
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
};
