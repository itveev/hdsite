import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import appVue from '@/client/vue/app';
import vuexStore from '@/client/store/store';
import routes from '@/client/vue/routes';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const store = new Vuex.Store(vuexStore);
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
appVue.store = store;
appVue.router = router;

describe('appVue', () => {
  test('является экземпляром Vue', () => {
    // if we testing route we should use mount instead of shallowMount
    const wrapper = shallowMount(appVue, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
    // console.log(router);
  });
});
