/* eslint func-names: "off" */
/**
 * Created by lucky on 22.10.15.
 */
// ///////////////////////////////////////
// params = {
//  req:{
//    m:'',
//    code:'',
//    aid:'',
//    param1:'',
//    param2:'',
//    uid:'',
//    sid:'',
//    type:'',
//    email:'',
//    passwd:'',
//    ruid:'',
//    rgid:'',
//    gid:'',
//    owner:'',
//    group:'',
//    other:'',
//    mid:'',
//    display:'',
//    fnm:'',
//    lnm:'',
//    mnm:'',
//    title:'',
//    caption:'',
//    message:'',
//    owner_uid:'',
//    agent_uid:'',
//    cid:''
//  },
//  cont:{
//    //any context data
//  },
//  callback: function(){}
// }
// ////////////////////////////////////////////

import Base from './base';
import apiId from '../../str/api';

class Msg extends Base {}

Object.keys(apiId.msg).forEach((method) => {
  Msg.prototype[method] = function (params) {
    return this.sendReq(apiId.msg[method], params);
  };
});

export default Msg;
