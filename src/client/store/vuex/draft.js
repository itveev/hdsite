/**
 * Created by fox on 22.01.18.
 */
/**
 * Created by lucky on 29.12.17.
 */
import sid from '@/str/id';
import ppid from '@/str/ptcl/prop';
import str from '@/str/store';
import Comment from '../class/comment';
import factory from '../prop/factory';
import util from './util';

class Draft extends Comment {
  constructor(id, prot) {
    super(id, prot);
    this.changeStore = str.mutation.draftChange;
  }
}

export default {
  namespaced: true,
  state: factory({
    store: new Draft(str.id.draft, ppid.draft),
    parse: {
      [sid.mid]: sid.mid,
      [sid.cid]: sid.cid,
    },
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
};
