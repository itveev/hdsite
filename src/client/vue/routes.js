/**
 * Created by root on 06.10.15.
 */
// To do : - see named views and use it instead of v-if e.g.
// in index-vue for header and footer
// - see redirect and use it for index - > sign in page
// - use metafields for auth, instead of in controller

import { internal as urlId, extra } from '@/str/url';
import sid from '@/str/id';

import workspaceVue from './components/workspace';
import notFoundVue from './components/entry/not.found';
import signinVue from './components/entry/signin';
import signupVue from './components/entry/signup';
import submitVue from './components/entry/submit';
import createUserVue from './components/entry/create.user';
import socialVue from './components/entry/social';
import loginVue from './components/entry/login';
import actionVue from './components/entry/action';
import setPassVue from './components/entry/set.pass';
import updPassVue from './components/entry/upd.pass';
import resetPassVue from './components/entry/reset.pass';
import settingsVue from './components/org/settings';
import welcomeVue from './components/welcome/begin';

import sidebarVue from './components/sidebar/sidebar';
import navbarVue from './components/sidebar/navbar';

import profileVue from './components/user/profile';
import userVue from './components/user/user';
import usersVue from './components/manage/users';

import ticketVue from './components/ticket/ticket';
import ticketsVue from './components/tickets';
import draftVue from './components/ticket/draft';

import footerVue from './components/footer/footer';

import headerVue from './components/header/header';

const appRoutes = [{
  path: urlId.blank,
  components: {
    headerVue,
    footerVue,
    default: workspaceVue,
  },
  children: [{
    path: urlId.signin,
    component: signinVue,
    meta: {
      required: {
        [sid.org]: true,
      },
    },
  }, {
    path: urlId.submit,
    component: submitVue,
    meta: {
      required: {
        [sid.org]: true,
      },
    },
  }, {
    path: urlId.social,
    component: socialVue,
  }, {
    path: urlId.createUser,
    component: createUserVue,
    meta: {
      required: {
        [sid.org]: true,
      },
    },
  }, {
    path: urlId.signup,
    component: signupVue,
  }, {
    path: urlId.login,
    component: loginVue,
  }, {
    path: urlId.action,
    component: actionVue,
    meta: {
      required: {
        [sid.org]: true,
      },
    },
  }, {
    path: urlId.setPass,
    component: setPassVue,
    meta: {
      required: {
        [sid.org]: true,
      },
    },
  }, {
    path: urlId.updPass,
    component: updPassVue,
    meta: {
      required: {
        [sid.org]: true,
      },
    },
  }, {
    path: urlId.resetPass,
    component: resetPassVue,
    meta: {
      required: {
        [sid.org]: true,
      },
    },
  }, {
    path: urlId.index,
    redirect: urlId.defaultUrl,
  }, {
    path: urlId.defaultUrl,
    components: {
      navbarVue,
      // sidebarVue,
      default: welcomeVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
        // If there is no initial request on the page to check token
        [sid.identify]: true,
      },
    },
  }, {
    path: urlId.tickets,
    components: {
      navbarVue,
      sidebarVue,
      default: ticketsVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
      },
    },
  }, {
    path: urlId.profile,
    components: {
      navbarVue,
      sidebarVue,
      default: profileVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
      },
    },
  }, {
    path: urlId.user,
    components: {
      navbarVue,
      sidebarVue,
      default: userVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
      },
      // If there exist 'page' field than it means that path not defined
      // and 'page' field should be commited to vuex state.
      page: extra.usrCmn,
    },
  }, {
    path: urlId.settings,
    components: {
      navbarVue,
      sidebarVue,
      default: settingsVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
      },
    },
  }, {
    path: urlId.ticket,
    components: {
      navbarVue,
      sidebarVue,
      default: ticketVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
      },
    },
  }, {
    path: urlId.draft,
    components: {
      navbarVue,
      sidebarVue,
      default: draftVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
      },
    },
  }, {
    path: urlId.users,
    component: usersVue,
    components: {
      navbarVue,
      sidebarVue,
      default: usersVue,
    },
    meta: {
      required: {
        [sid.auth]: true,
      },
    },
  }, {
    path: extra.asterisk,
    // alias: urlId.notFound,
    components: {
      navbarVue,
      default: notFoundVue,
    },
    meta: {
      required: {
        [sid.cmn]: true,
      },
      // If there exist 'page' field than it means that path not defined
      // and 'page' field should be commited to vuex state.
      page: extra.notFound,
    },
  // }, {
  //   // Duplicate the top route help route for define not found
  //   path: urlId.notFound,
  //   components: {
  //     navbarVue,
  //     default: notFoundVue,
  //   },
  //   meta: {
  //     required: {
  //       cmn: true,
  //     },
  //   },
  }],
}];

export { appRoutes as default };

const recPages = function recursiveGetRequiredPages(sourceArr, resArr, prop) {
  sourceArr.forEach((route) => {
    if (route.meta && route.meta.required && route.meta.required[prop]) {
      resArr.push(route.meta.page || route.path);
    }
    if (route.children) {
      recPages(route.children, resArr, prop);
    }
  });
};
export const getAuthArr = function getGetAuthPagesArray() {
  const authArr = [];
  recPages(appRoutes, authArr, sid.auth);
  return authArr;
};
export const getCmnArr = function getGetCmnPagesArray() {
  const cmnArr = [];
  recPages(appRoutes, cmnArr, sid.cmn);
  return cmnArr;
};
