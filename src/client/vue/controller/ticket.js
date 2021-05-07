/**
 * Created by fox on 25.01.18.
 */
import moment from 'moment';
import storeId from '@/str/store';
import sid from '@/str/id';
import ppid from '@/str/ptcl/prop';
import cssId from '@/str/css';
import apiId from '@/str/api';
import Base from './base';

export default class extends Base {
  constructor(vueEL, options) {
    super(vueEL);
    this.router = options.router;
    this.store = options.store;
  }

  async loadCount() {
    const params = {
      req: {
        m: apiId.msg.countFilterMessages,
      },
    };
    const res = await this.vo.$_hd.ctrl.request.getDataVR(params);
    this.store.commit({
      type: storeId.mutation.ticketsChange,
      method: storeId.method.setDirtyState,
      state: res.data,
    });
    return res;
  }

  async loadTickets() {
    const ids = new Set();
    const { tickets } = this.store.state;
    const params = {
      req: {
        m: apiId.msg.selectMessages,
        fstatus: ppid.tickets[tickets.filter],
        sort: tickets.sort,
        way: tickets.way,
        pos: tickets.pos,
        count: tickets.count,
      },
    };
    const res = await this.vo.$_hd.ctrl.request.getDataVR(params);
    if (res.ok) {
      this.store.commit({
        type: storeId.mutation.ticketsChange,
        prop: sid.msgs,
        func: sid.splice,
        args: [0, this.store.state.tickets.msgs.length],
      });
      res.data.msgs.forEach((item) => {
        ids.add(item.uid);
        if (item.aid) {
          ids.add(item.aid);
        }
        this.store.commit({
          type: storeId.mutation.ticketsChange,
          prop: sid.msgs,
          func: sid.push,
          args: [this.createTicket(item)],
        });
      });
    }
    return ids;
  }

  createTicket(item) {
    const { users } = this.store.state;
    const { method } = storeId;
    const customer = users[method.getUser](item.uid);
    const agent = users[method.getUser](item.aid);
    const newTicket = {
      icon: 'source-email',
      checked: false,
      caption: item.caption,
      count: 3,
      uid: item.uid,
      customer: customer ? this.vo.$_hd.ctrl.user.constructor.getName(customer) : item.uid,
      mid: item.mid,
      num: item.num,
      lastUpd: '18:25',
      date: this.dateFormat(item.date),
      aid: item.aid,
      agent: agent ? this.vo.$_hd.ctrl.user.constructor.getName(agent) : item.aid,
      priority: cssId.prior[item.priority],
      pname: item.priority,
      status: item.status,
    };
    return newTicket;
  }

  updateNamesTickets(names) {
    this.store.commit({
      type: storeId.mutation.ticketsChange,
      prop: sid.msgs,
      func: sid.forEach,
      args: [(item) => {
        item.customer = names[item.uid] || '';
        item.agent = names[item.aid] || '';
      }],
    });
  }

  updateCommentsNamesSigns({ names, signs }) {
    this.store.commit({
      type: storeId.mutation.commentsChange,
      prop: sid.cmts,
      func: sid.forEach,
      args: [(item) => {
        item.name = names[item.uid] || '';
        item.sign = signs[item.uid] && signs[item.uid].replace
          && (signs[item.uid].replace(/\n/g, '</br>') || '');
      }],
    });
    this.store.commit({
      type: storeId.mutation.commentsChange,
      prop: sid.customer,
      val: names[this.store.state.comments.uid],
    });
  }

  async loadComments() {
    const ids = new Set();
    const params = {
      req: {
        m: apiId.msg.selectComments,
        mid: this.store.state.comments.mid,
        way: sid.desc,
      },
    };
    const res = await this.vo.$_hd.ctrl.request.getDataVR(params);
    this.store.commit({
      type: storeId.mutation.commentsChange,
      prop: sid.cmts,
      func: sid.splice,
      args: [0, this.store.state.comments.cmts.length],
    });
    const draftState = {
      cid: null,
      comment: '',
    };
    if (res.data.draft) {
      draftState.cid = res.data.draft.cid;
      draftState.comment = res.data.draft.comment;
      if (res.data.draft.attachments) {
        this.store.commit({
          type: storeId.mutation.commentsChange,
          prop: sid.attachments,
          func: sid.splice,
          args: [0, this.store.state.comments.attachments.length],
        });
        res.data.draft.attachments.forEach((cur) => {
          this.store.commit({
            type: storeId.mutation.commentsChange,
            prop: sid.attachments,
            func: sid.push,
            args: [this.constructor.createLoadedAttachment(cur)],
          });
        });
      }
    }
    this.store.commit({
      type: storeId.mutation.commentsChange,
      method: storeId.method.setDirtyState,
      state: draftState,
    });
    res.data.cmts.forEach((item) => {
      ids.add(item.uid);
      this.store.commit({
        type: storeId.mutation.commentsChange,
        prop: sid.cmts,
        func: sid.push,
        args: [this.createComment(item)],
      });
      // this.items.push(this.createComment(item));
    });
    ids.add(this.store.state.comments.uid);
    return ids;
  }

  createAvaArgs(uid) {
    const { oid } = this.store.state.org;
    const user = this.store.state.users.getUser(uid) || {};
    user.photo = this.vo.$_hd.ctrl.request.constructor.userPhoto(uid, oid);
    user.abbr = this.vo.$_hd.ctrl.user.constructor.getAbbr(user);
    return {
      link: this.vo.$_hd.ctrl.user.constructor.getProfUrl(uid),
      classObj: {
        'user-icon': true,
      },
      profile: user,
    };
  }

  createComment(item) {
    const avaArgs = this.createAvaArgs(item.uid);
    const user = avaArgs.profile;
    const newComment = {
      avaArgs,
      attachments: item.attachments || [],
      cid: item.cid,
      pcid: item.pcid,
      uid: item.uid,
      name: user ? this.vo.$_hd.ctrl.user.constructor.getName(user) : item.uid,
      type: item.type,
      photo: user.photo,
      date: this.dateFormat(item.date),
      comment: item.comment,
      sign: '',
    };
    return newComment;
  }

  dateFormat(str) {
    // console.log(this.store.state.basic.locale);
    moment.locale(this.store.state.basic.locale);
    // moment.locale('ru');
    // return moment(str).calendar(null, {
    //   sameDay: 'LT',
    //   lastDay: '[Yesterday]',
    //   lastWeek: 'MMMM DD',
    //   lastMonth: 'MMMM DD',
    //   lastYear: 'll',
    // });
    const init = moment(str);
    const cur = moment();
    if (cur.year() >= init.year() + 1) {
      return init.format('ll');
    }
    if (cur.dayOfYear() >= init.dayOfYear() + 2) {
      // return init.format('ll'); // todo: day + month without year
      return init.format('MMMM D');
    }
    if (cur.dayOfYear() >= init.dayOfYear() + 1) {
      return init.calendar();
    }
    return init.format('LT');
  }

  static createNewAttachment(item) {
    return {
      complete: false,
      canceled: false,
      tryUpload: false,
      size: item.size,
      percent: 0,
      // id:item.id,
      name: item.name,
      //              size:cmn.formatSize(cur.size),
      file: item,
      uploadReq: null,
      style: 'width: 0%;',
    };
  }

  static createLoadedAttachment(item) {
    return {
      complete: true,
      canceled: false,
      tryUpload: true,
      percent: 100,
      aid: item.id,
      name: item.name,
      //  size:cmn.formatSize(cur.size),
      file: item,
      uploadReq: null,
      style: 'width: 100%;',
    };
  }

  static formatSize(size, fixed = 2) {
    const sizeKb = (size / 1024).toFixed(fixed);
    const sizeMb = (sizeKb / 1024).toFixed(fixed);
    const sizeGb = (sizeMb / 1024).toFixed(fixed);
    let text = '';
    if (sizeKb <= 1024) {
      text = `${sizeKb} Kb`;
    } else if (sizeKb > 1024 && sizeMb <= 1024) {
      text = `${sizeKb} Mb`;
    } else if (sizeMb > 1024 && sizeGb <= 1024) {
      text = `${sizeKb} Gb`;
    }
    return text;
  }
}
