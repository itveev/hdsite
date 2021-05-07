/**
 * Created by fox on 08.06.16.
 */

export default class {
  constructor(caller) {
    this.caller = caller;
  }

  static makeFormDataReqObj(params) {
    const { formData, ...req } = params.req;
    formData.append('request', JSON.stringify(req));
    return { ...params, req: formData };
  }

  sendReq(name, params) {
    if (!this.caller) {
      throw new Error('Please initialize the caller');
    }
    if (params && params.req) {
      params.req.m = name;
      if (params.isFormData) {
        return this.caller.sendReq(this.constructor.makeFormDataReqObj(params));
      }
      return this.caller.sendReq(params);
    }
    throw new Error('Please initialize the params');
  }
}
