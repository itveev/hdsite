/**
 * Created by fox on 27.02.17.
 */

export default class {
  constructor(roles) {
    this.roles = roles;
  }

  display(user) {
    return this.roles.some(item => item === user.role);
  }
}
