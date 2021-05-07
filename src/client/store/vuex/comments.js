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

class Comments extends Comment {
  constructor(id, prot) {
    super(id, prot);
    this.cmts = [];
    this.changeStore = str.mutation.commentsChange;
  }
}

export default {
  namespaced: true,
  state: factory({
    store: new Comments(str.id.comments, ppid.comments),
    parse: {
      [sid.mid]: sid.mid,
      [sid.num]: sid.num,
      [sid.uid]: sid.uid,
      [sid.cid]: sid.cid,
    },
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
  actions: {
    async [str.actions.updCmts](context, payload) {
      context.commit({
        type: str.mutation.change,
        prop: sid.cmts,
        func: sid.splice,
        args: [0, context.state.cmts.length],
      });
      const ids = await payload.vueObj.$_hd.ctrl.ticket.loadComments();
      const users = await payload.vueObj.$_hd.ctrl.user.loadUsers({ ids });
      context.commit({
        type: str.mutation.usersChange,
        method: str.method.appendUsers,
        state: users,
      }, { root: true });
      const names = payload.vueObj.$_hd.ctrl.user.constructor.getNames(users);
      const signs = payload.vueObj.$_hd.ctrl.user.constructor.getSigns(users);
      payload.vueObj.$_hd.ctrl.ticket.updateCommentsNamesSigns({ names, signs });
    },
  },
};
