/**
 * Created by lucky on 13.11.15.
 */
// ////////////////////////////////////////////////
// params = {
//  req:{object}
//  cont:{
//    //any context data
//  },
//  callback: function(){}
// }
// ////////////////////////////////////////////////

import logger from '@/log/client';
import base from './base';

export default class extends base {
  sendReq(params) {
    if (!(params && params.req)) {
      logger.error('Invalid XHR args');
      return params;
    }
    // logger.info('req');
    // logger.info(params);
    let xhr = null;
    const xhp = new Promise((resolve, reject) => {
      if (!this.url) {
        const err = new Error('Please provide the url');
        err.params = params;
        reject(err);
      } else {
        xhr = new XMLHttpRequest();
        if (!params.isFormData) {
          xhr.timeout = params.timeout || this.timeout;
        }
        xhr.onreadystatechange = (e) => {
          if (xhr.readyState === 4) {
            let errMsg = '';
            if (xhr.status === 200) {
              if (xhr.responseText) {
                resolve({
                  data: JSON.parse(xhr.responseText),
                  params,
                });
                return;
              }
              errMsg = 'Server respond without body';
            } else {
              errMsg = `Server respond with status ${xhr.status} ${xhr.responseText}`;
            }
            const err = new Error(errMsg);
            resolve({
              err,
              params,
              info: { ...xhr, err: e },
            });
          }
        };
        // xhr.onerror = (e)=> {
        // xhr.ontimeout = (e)=> {
        // xhr.onabort = (e)=> {
        if (params.progress) {
          xhr.upload.onprogress = params.progress;
        }
        xhr.open('POST', this.url);
        if (!params.isFormData) {
          xhr.setRequestHeader('Content-Type', 'text/plain');
        }
        xhr.setRequestHeader('Accept', 'application/json');
        if (params.isFormData) {
          xhr.send(params.req);
        } else {
          xhr.send(JSON.stringify(params.req));
        }
      }
    });
    params.xhr = xhr;
    params.xhp = xhp;
    return params;
  }
}
