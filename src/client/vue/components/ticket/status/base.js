/**
 * Created by fox on 18.09.17.
 */

import usersStore from '../../../../store/vuex/users';
import Ctrl from '../../../controller/user';
import str from '@/str/store';

const store = usersStore.state;
const { method } = str;

export default class {
  static make() {
    return {};
  }

  static getName(uid) {
    return Ctrl.getName(store[method.getUser](uid));
  }
}
