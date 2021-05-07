/* eslint func-names: "off" */
/**
 * Created by lucky on 22.02.16.
 */
// ///////////////////////////////////////
// params = {
//  req:{
//
//  },
//  cont:{
//    //any context data
//  },
//  callback: function(){}
// }
// ////////////////////////////////////////////

import apiId from '@/str/api';
import Base from './base';

class Org extends Base {}

Object.keys(apiId.org).forEach((method) => {
  Org.prototype[method] = function (params) {
    return this.sendReq(apiId.org[method], params);
  };
});

export default Org;
