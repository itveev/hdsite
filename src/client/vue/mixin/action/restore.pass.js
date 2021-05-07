/**
 * Created by fox on 27.02.17.
 */
import storeId from '@/str/store';
import sid from '@/str/id';
import { internal as urlId } from '@/str/url';

// params={
//  type,
//  oid,
//  uid,
//  mid,
//  cid,
//  vo
// }

export default {
  type: 'rp',
  async execute(options) {
    options.vo.$store.commit({
      type: storeId.mutation.actionChange,
      prop: sid.code,
      val: options.code,
    });
    options.vo.$router.push(urlId.updPass);
  },
  async goAhead(options) {
    options.vo.$router.push(urlId.tickets);
  },
};
