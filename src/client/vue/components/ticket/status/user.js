/**
 * Created by fox on 18.09.17.
 */

import Base from './base';

export default class extends Base {
  static make(statusObj) {
    const { comment, ...status } = statusObj;
    return {
      ...comment,
      user: this.getName(status.uid),
    };
  }
}
