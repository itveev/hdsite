<template lang="pug" type="pug">
.col-3.center-col
  ul.controls-list
    li
      a.btn.btn-wide.btn-fb(v-on:click.prevent="socialOauth('facebook')")
        span.icon.icon-glyph.icon-fb
        |Sign in with Facebook
    //
      li
        a.btn.btn-wide.btn-gp(v-on:click.prevent="socialOauth('google')")
          span.icon.icon-glyph.icon-gp
          |Sign in with Google
    li
      a.btn.btn-wide.btn-in(v-on:click.prevent="socialOauth('linkedin')")
        span.icon.icon-glyph.icon-in
        |Sign in with LinkedIn
    li
      a.btn.btn-wide.btn-wl(v-on:click.prevent="socialOauth('windows')")
        span.icon.icon-glyph.icon-wl
        |Sign in with Windows Live
</template>

<script>
import storeId from '@/str/store';
import sid from '@/str/id';
import { external as urlId } from '@/str/url';
import logger from '@/log/client';
import titleVue from './title';
// let domainRegExp = new RegExp('^[\\w-]+$','i');

export default {
  data() {
    return {
      // state:stateStore,
      title: 'Sign in to',
      email: '',
      pass: '',
      repMsg: '',
      sw: false,
      imgSrc: '',
      name: '',
      im: false,
      infoMsg: 'Info message',
      classObj: {
        alert: true,
        'alert-info': true,
        reply: true,
        'alert-danger': false,
      },
    };
  },
  methods: {
    socialOauth(svc) {
      if (!svc) {
        return false;
      }
      this.$store.commit({
        type: storeId.mutation.basicChange,
        prop: sid.svc,
        val: svc,
      });
      this.makeOauthWnd().catch(err => logger.error(err));
      return true;
    },
    async makeOauthWnd() {
      const { svc } = this.$store.state.basic;
      const wndPromise = new Promise((resolve, reject) => {
        const wnd = window.open(urlId.socialWnd, 'social', 'height=500,width=500');
        window.onmessage = (evt) => {
          if (evt.data) {
            if (evt.data === 'loaded') {
              wnd.postMessage(svc, '*');
            } else {
              wnd.close();
              resolve(evt.data);
            }
          } else {
            wnd.close();
            const e = new Error('No data from login window');
            e.info = evt;
            reject(e);
          }
        };
      });
      const res = await wndPromise;
      this.$store.commit({
        type: storeId.mutation.basicChange,
        prop: sid.access,
        val: res,
      });
      this.$emit('allowed');
    },
  },
  components: {
    titleVue,
  },
};
</script>
