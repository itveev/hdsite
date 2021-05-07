/**
 * Created by root on 06.10.15.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import veeCfg from './validate';
import routes from './routes';
import appVue from './app';
import langs from './localization/langs';
import storeId from '@/str/store';
import hdId from '@/str/hd';
import sid from '@/str/id';
import hdapiPlugin from './plugins/hdapi';
import { internal as urlId } from '@/str/url';
import logger from '../../log/client';
import wndOnErrorReg from '../../log/wnd.on.error';
import vuexStore from '../store/store';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(VeeValidate, veeCfg);

const store = new Vuex.Store({
  ...vuexStore,
  strict: process.env.NODE_ENV !== 'production',
});
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: langs.messages,
});
Vue.config.convertAllProperties = true;
// Vue.config.silent=true;
// Vue.config.silent=false;
Vue.directive('focus', { inserted: el => el.focus() });
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
  // My closed issue on github
  // Now vue have 'appear' transition control
  // transitionOnLoad:true
});
appVue.router = router;
appVue.store = store;
// appVue.i18n = i18n;

Vue.use(hdapiPlugin, { router, store });
Vue.config.errorHandler = (err, vm, info) => {
  logger.error({ err, vm, info });
};
Vue.config.warnHandler = (msg, vm, trace) => {
  logger.warn({ message: msg, vm, stack: trace });
};

const App = Vue.extend(appVue);
// const reqCntr = Vue.prototype.$_hd.ctrl.request;
const vp = Vue.prototype;
let firstAppLoadRoute = false;

router.beforeEach((to, from, next) => {
  const fwd = function commitPathAndForward(obj) {
    const { path, page } = obj;
    store.commit({
      type: storeId.mutation.basicChange,
      prop: sid.page,
      val: page || path,
    });
    path === to.path ? next() : next({ path });
  };
  const fwdObj = {};
  fwdObj.path = to.path;
  let requiredOrg = false;
  // If there exist 'page' field than it means that path not defined
  // and 'page' field should be commited to vuex state.
  to.matched.some((record) => {
    fwdObj.page = record.meta.page;
    return fwdObj.page;
  });
  if (!store.state.basic.auth
    && to.matched.some(record => record.meta.required && record.meta.required.auth)) {
    // Required auth token
    fwdObj.path = urlId.signin;
    fwd(fwdObj);
  } else if (to.matched.some((record) => {
    // fwdObj.page = record.meta.page;
    requiredOrg = record.meta.required && record.meta.required.org;
    return requiredOrg || (record.meta.required && record.meta.required.cmn);
  })) {
    // Required org info
    if (!firstAppLoadRoute) {
      // TODO: add one-app-load org info. Change endpoint and get logic from routing,
      // routing.loadDomainOrgInfo({ vue: vp, store }).then((res) => {
      vp.$_hd.ctrl.request.loadDomainOrgInfo(requiredOrg).then((res) => {
        if (res.url) {
          window.location.assign(res.url);
          // TODO: Change throw error to message to user, if it possible(in url params ?)
          const e = new Error('Org is free');
          e.controlled = true;
          throw e;
        }
        if (res.route) {
          fwdObj.path = res.route;
        }
        if (res.loaded === true) {
          firstAppLoadRoute = true;
        }
        fwd(fwdObj);
      }).catch(err => logger.error(err));
    } else {
      fwd(fwdObj);
    }
  } else if (to.matched.some(record => record.meta.required && record.meta.required.identify)) {
    // Required identify, check auth
    vp.$_hd.ctrl.request.checkToken({
      oid: store.state.org.oid,
      uid: store.state.profile.uid,
    }).then((res) => {
      if (!res) {
        fwdObj.path = urlId.signin;
      }
      fwd(fwdObj);
    }).catch(err => logger.error(err));
  } else {
    // Other cases
    fwd(fwdObj);
  }
});
new App({ i18n }).$mount(hdId.appId);

wndOnErrorReg(logger);
