/**
 * Created by lucky on 09.10.17.
 */

import profile from './vuex/profile';
import org from './vuex/org';
import users from './vuex/users';
import action from './vuex/action';
import basic from './vuex/basic';
import draft from './vuex/draft';
import tickets from './vuex/tickets';
import comments from './vuex/comments';
import button from './vuex/button';
import notification from './vuex/notification';

export default {
  modules: {
    profile,
    org,
    users,
    action,
    basic,
    draft,
    tickets,
    comments,
    button,
    notification,
  },
};
