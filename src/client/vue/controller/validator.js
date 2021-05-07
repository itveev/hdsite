/* eslint comma-dangle: ["error", "only-multiline"] */
/**
 * Created by lucky on 13.10.16.
 */

import { external as urlId } from '@/str/url';
import subdomain from '@/util/subdomain';
import apiId from '@/str/api';
import Base from './base';

export default class extends Base {
  constructor(vueEL) {
    super(vueEL);
    this.domainRegExp = new RegExp('^[\\w-]+$', 'i');
  }

  async domainExist(domain) {
    const params = {
      req: {
        m: apiId.org.getStatus,
        domain,
      },
      url: urlId.orgSvc,
    };
    const res = await this.vo.$_hd.ctrl.request.getDataVR(params);
    return res;
  }

  domainValid(domain) {
    return this.domainRegExp.exec(domain);
  }

  landUrl() {
    const domain = this.constructor.getSubDomain();
    const curHost = window.location.host.replace(`${domain}.`, '');
    return `${window.location.protocol}//${curHost}`;
  }

  static getSubDomain() {
    return subdomain({
      str: window.location.hostname,
      arr: [urlId.hostName, urlId.localHostName, urlId.prodHostName],
    });
  }

  static isStr(str) {
    return (typeof str === 'string')
      || (str instanceof String);
  }

  static isNum(num) {
    return (typeof num === 'number')
      || (num instanceof Number);
  }

  static isNumStr(param) {
    return this.isStr(param) || this.isNum(param);
  }
  // getSearchParams(){
  //  let str = window.location.search;
  //  let objUrl={};
  //
  //  str.replace(new RegExp('([^?=&]+)(=([^&]*))?','g'),
  //    (subStr,p1,p2,p3)=>{
  //      objUrl[p1]=p3;
  //    });
  //  return objUrl;
  // }
}
