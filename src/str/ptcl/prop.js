/**
 * Created by lucky on 11.12.15.
 */
import sid from '../id';

export default {
  // Store objects. Used foer creating stores and matching protocol->profile
  user: {
    [sid.uid]: sid.uid,
    [sid.role]: 'role',
    [sid.nick]: 'nick',
    [sid.pphone]: 'pphone',
    [sid.wphone]: 'wphone',
    [sid.display]: 'display',
    [sid.status]: 'status',
    [sid.email]: 'email',
    [sid.lang]: 'lang',
    [sid.tz]: 'tz',
    [sid.sign]: 'sign',
    [sid.isPhoto]: 'is_picture',
    [sid.abbr]: 'abbr',
    [sid.photo]: 'photo',
  },
  org: {
    [sid.admin]: 'admin',
    [sid.email]: 'email',
    [sid.name]: 'name',
    [sid.syn]: 'syn',
    [sid.style]: 'style',
    [sid.owner]: 'owner',
    [sid.description]: 'description',
    [sid.website]: 'website',
    [sid.phone]: 'phone',
    [sid.address]: 'address',
    [sid.country]: 'country',
    [sid.employees]: 'employees',
    [sid.domain]: 'domain',
    [sid.oid]: sid.oid,
    [sid.isPhoto]: 'is_picture',
    [sid.photo]: 'photo',
  },
  action: {
    [sid.type]: 'type',
    [sid.oid]: sid.oid,
    [sid.code]: 'code',
    [sid.uid]: sid.uid,
    [sid.mid]: sid.mid,
    [sid.cid]: sid.cid,
  },
  basic: {
    [sid.locale]: 'locale',
    [sid.auth]: 'auth',
    [sid.svc]: 'svc',
    [sid.access]: 'access',
    [sid.page]: 'page',
    [sid.checking]: 'checking',
  },
  cmnt: {
    [sid.comment]: sid.comment,
    // [sid.cid]: sid.cid,
  },
  tickets: {
    [sid.filter]: 'filter',
    [sid.fresh]: 'new',
    [sid.active]: 'process',
    [sid.draft]: 'draft',
    [sid.solved]: 'closed',
    [sid.all]: 'all',
    [sid.count]: 'count',
  },
  comments: {
    [sid.date]: 'date',
    [sid.uid]: sid.uid,
    [sid.customer]: 'customer',
    [sid.mid]: sid.mid,
    [sid.num]: sid.num,
    [sid.cid]: sid.cid,
    [sid.subj]: sid.caption,
    [sid.comment]: sid.comment,
  },
  draft: {
    [sid.mid]: sid.mid,
    [sid.cid]: sid.cid,
    [sid.subj]: sid.caption,
    [sid.comment]: sid.comment,
  },
  notice: {
  },
  button: {
    [sid.createSt]: 'createSt',
  },

  // Objects for comparing and matching info client->server
  status: {
    org: {
      [sid.free]: 'free',
      [sid.new]: 'new',
      [sid.disabled]: 'disabled',
      [sid.reserved]: 'reserved',
      [sid.enabled]: 'enabled',
    },
    comment: {
      [sid.caption]: 'status_comment_change_caption',
      [sid.note]: 'status_comment_note',
      [sid.assigned]: 'status_comment_assign_message',
      [sid.close]: 'status_comment_close_message',
      [sid.priority]: 'status_comment_change_priority',
    },
    user: {
      [sid.fresh]: 'new',
      [sid.active]: 'active',
      [sid.disabled]: 'disabled',
      [sid.unknown]: 'unknown',
    },
  },
  prior: {
    [sid.low]: 'low',
    [sid.normal]: 'normal',
    [sid.high]: 'high',
  },
  role: {
    [sid.owner]: 'owner',
    [sid.admin]: 'admin',
    [sid.agent]: 'agent',
    [sid.user]: 'customer',
  },
  type: {
    [sid.draft]: 'draft',
    [sid.text]: 'text',
    [sid.note]: 'note',
  },
  // status: ['notdef', 'draft', 'new', 'active', 'closed'],
};
