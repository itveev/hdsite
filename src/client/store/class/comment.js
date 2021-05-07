/**
 * Created by fox on 22.01.18.
 */
/**
 * Created by lucky on 16.12.15.
 */

import ppid from '@/str/ptcl/prop';
import Base from './base';
import str from '@/str/store';

const { method } = str;
class Comment extends Base {
  constructor(id, prot) {
    super(id, prot);
    this.attachments = [];
  }

  get [ppid.cmnt.comment]() {
    const mid = this[method.getProp](ppid.comments.mid);
    return this[method.getProp](`${mid}_comment`) || '';
  }

  set [ppid.cmnt.comment](val) {
    const mid = this[method.getProp](ppid.comments.mid);
    if (mid) {
      this[method.setProp](`${mid}_comment`, val);
    }
  }

  // get [ppid.cmnt.cid]() {
  //   const mid = this[method.getProp](ppid.comments.mid);
  //   return parseInt(this[method.getProp](`${mid}_cid`), 10);
  // }

  // set [ppid.cmnt.cid](val) {
  //   const mid = this[method.getProp](ppid.comments.mid);
  //   if (mid) {
  //     this[method.setProp](`${mid}_cid`, val);
  //   }
  // }
}

export default Comment;
