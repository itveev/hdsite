/**
 * Created by lucky on 15.02.18.
 */

import ppid from '@/str/ptcl/prop';
import str from '@/str/store';
import Base from '../class/base';
import factory from '../prop/factory';
import util from './util';

export default {
  namespaced: true,
  state: factory({
    store: new Base(str.id.button, ppid.button),
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
};
