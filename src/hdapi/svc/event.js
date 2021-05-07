/**
 * Created by fox on 06.06.16.
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

import base from './base';

export default class extends base {
  createEvent(params) {
    this.sendReq('CreateEvent', params);
  }

  createQueue(params) {
    this.sendReq('CreateQueue', params);
  }

  getEvent(params) {
    this.sendReq('GetEvent', params);
  }

  removeEvent(params) {
    this.sendReq('RemoveEvent', params);
  }

  getEventCount(params) {
    this.sendReq('GetEventCount', params);
  }
}
