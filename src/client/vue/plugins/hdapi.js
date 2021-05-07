/* eslint-disable no-param-reassign */
/**
 * Created by lucky on 10.02.16.
 */
import { external as urlId } from '@/str/url';
import SvcMsg from '@/hdapi/svc/msg';
import SvcOrg from '@/hdapi/svc/org';
import HdXhr from '@/hdapi/http/xhr';
import Request from '../controller/request';
import Ticket from '../controller/ticket';
import Validator from '../controller/validator';
import User from '../controller/user';
import Error from '../controller/error';

const xhrMsg = new HdXhr(urlId.msgSvc);
const xhrOrg = new HdXhr(urlId.orgSvc);
const svcMsg = new SvcMsg(xhrMsg);
const svcOrg = new SvcOrg(xhrOrg);

export default {
  install(Vue, options) {
    const request = new Request(Vue.prototype, { ...options, Vue });
    const error = new Error(Vue.prototype, options);
    const vldt = new Validator(Vue.prototype);
    const user = new User(Vue.prototype, options);
    const ticket = new Ticket(Vue.prototype, options);
    Vue.prototype.$_hd = {
      ctrl: {
        request,
        vldt,
        user,
        ticket,
        error,
      },
      svc: {
        msg: svcMsg,
        org: svcOrg,
      },
    };
  },
};
