/**
 * Created by fox on 18.09.17.
 */

import ppid from '@/str/ptcl/prop';
import User from './user';
import Assigned from './assigned';

const status = ppid.status.comment;
const makerObj = {
  [status.caption]: User,
  [status.note]: User,
  [status.close]: User,
  [status.assigned]: Assigned,
  [status.priority]: User,
};

export default {
  methods: {
    statusMake(obj) {
      return makerObj[obj.comment.lid].make(obj);
    },
  },
};
