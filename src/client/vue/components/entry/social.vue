<template lang="pug" type="pug">
.main
  .row
    .col-3
    //
    form.form
      ul.controls-list
        li
          label
        li.controls-centered
          a.btn(v-on:click.prevent="action" ) Perform
</template>

<script lang="babel" type="text/babel">
import sid from '@/str/id';
import storeId from '@/str/store';
import logger from '@/log/client';
import hdId from '@/str/hd';
import { external as urlId } from '@/str/url';
import hello from '../../../../../node_modules/hellojs/dist/hello.all.min';

hello.init(hdId.oauth, {
  oauth_proxy: 'https://auth-server.herokuapp.com/',
});

export default {
  data() {
    return {};
  },
  mounted() {
    this.tryOauth().catch(err => logger.error(err));
  },
  methods: {
    action() {
      this.tryOauth().catch(err => logger.error(err));
    },
    tryOauth() {
      const session = hello(this.$store.state.basic.svc).getAuthResponse();
      if (!session) { // userStore.cred.svc) {
        // let msgPromise = new Promise((resolve, reject)=> {
        window.onmessage = (evt) => {
          if (evt.origin === urlId.origin) {
            return;
          }
          if (evt.data && ((typeof evt.data) === 'string')) {
            this.$store.commit({
              type: storeId.mutation.basicChange,
              prop: sid.svc,
              val: evt.data,
            });
            // userStore.cred.org = evt.data.org;
            // resolve(evt.data);
          } else {
            const err = new Error('No data from main window');
            err.info = evt;
            return;
            // reject(err);
          }
          const oauth = hello(evt.data);
          oauth.login({
            scope: 'basic, email',
            display: 'page',
          });
          //              .then(() => {
          //                oauth.api('me').then((r) => {
          //                  logger.info(r);
          //                  let session = oauth.getAuthResponse();
          //                  window.opener.postMessage(session.access_token, '*');
          //                });
          //              });
        };
        window.opener.postMessage('loaded', '*');
      } else {
        this.$store.commit({
          type: storeId.mutation.basicChange,
          prop: sid.svc,
          val: null,
        });
        window.opener.postMessage(session.access_token, '*');
      }
    },
  },

  //    mounted(){
  //
  //      let oauth = hello(stateStore.svc);
  //      let session = oauth.getAuthResponse();
  //      if(!session){//userStore.cred.svc) {
  //        //let msgPromise = new Promise((resolve, reject)=> {
  //        window.onmessage = (evt)=> {
  //          if(evt.origin==urlId.origin){
  //            return;
  //          }
  //          if (evt.data&&(typeof(evt.data)=='string')) {
  //            stateStore.svc = evt.data;
  //            //userStore.cred.org = evt.data.org;
  //            //resolve(evt.data);
  //          }
  //          else {
  //            let err = new Error('No data from login window');
  //            err.info = evt;
  //            return;
  //            //reject(err);
  //          }
  //          Promise.resolve(evt.data).then(service=> {
  //            let oauth = hello(service);
  //            oauth.login({
  //              scope: 'basic, email',
  //              display: 'page'
  //            })
  // //              .then(() => {
  // //                oauth.api('me').then((r) => {
  // //                  logger.info(r);
  // //                  let session = oauth.getAuthResponse();
  // //                  window.opener.postMessage(session.access_token, '*');
  // //                });
  // //              });
  //          }, err=> {
  //            logger.error(err);
  //
  //          });
  //        }
  //        window.opener.postMessage('loaded', '*');
  //
  //      }
  //      else{
  //        stateStore.svc=null;
  //        window.opener.postMessage(session.access_token,'*');
  //      }
  //    }
};
</script>
