/**
 * Created by fox on 22.01.18.
 */
/**
 * Created by lucky on 29.12.17.
 */
import sid from '@/str/id';
import ppid from '@/str/ptcl/prop';
import hdId from '@/str/hd';
import str from '@/str/store';
import Base from '../class/base';
import factory from '../prop/factory';
import util from './util';

class Tickets extends Base {
  constructor(id, prot) {
    super(id, prot);
    this.msgs = [];

    // For sidebar
    this.loading = false;

    // For table sort
    this.sort = sid.ftime;
    this.way = sid.desc;
    this.pos = 0;

    // this.changeStore = str.mutation.ticketChange;
  }
}

export default {
  namespaced: true,
  state: factory({
    store: new Tickets(str.id.tickets, ppid.tickets),
    defs: {
      [sid.filter]: sid.fresh,
      [sid.count]: hdId.ticketsCount,
    },
    parse: {
      [sid.count]: sid.count,
    },
  }),
  mutations: {
    [str.mutation.change]: util.change,
  },
  getters: {
    // [str.getters.all](state, getters, rootState) {
    //  return state.active + state.new + state.solved;
    // },
  },
  actions: {
    // async [str.actions.loadMsgs](/* context, */ payload) {
    //   const res = await payload.vueObj.$_hd.ctrl.ticket.loadTickets();
    //   return res;
    // },
    async [str.actions.updMsgs](context, payload) {
      if (payload.filter) {
        context.commit({
          type: str.mutation.change,
          prop: sid.filter,
          val: payload.filter,
        });
      }
      if (payload.sort) {
        context.commit({
          type: str.mutation.change,
          prop: sid.sort,
          val: payload.sort,
        });
      }
      if (payload.way) {
        context.commit({
          type: str.mutation.change,
          prop: sid.way,
          val: payload.way,
        });
      }
      context.commit({
        type: str.mutation.change,
        prop: sid.loading,
        val: true,
      });
      context.commit({
        type: str.mutation.change,
        prop: sid.msgs,
        func: sid.splice,
        args: [0, context.state.msgs.length],
      });
      const ids = await payload.vueObj.$_hd.ctrl.ticket.loadTickets();
      const users = await payload.vueObj.$_hd.ctrl.user.loadUsers({ ids });
      context.commit({
        type: str.mutation.change,
        prop: sid.loading,
        val: false,
      });
      context.commit({
        type: str.mutation.usersChange,
        method: str.method.appendUsers,
        state: users,
      }, { root: true });
      const names = payload.vueObj.$_hd.ctrl.user.constructor.getNames(users);
      payload.vueObj.$_hd.ctrl.ticket.updateNamesTickets(names);
    },
    async [str.actions.updCount](context, payload) {
      const res = await payload.vueObj.$_hd.ctrl.ticket.loadCount();
      return res;
    },
  },
};
