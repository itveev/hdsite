<template lang="pug">
button-vue(v-bind:args="btnArgs")
//
  template(slot="list")
    list-vue(v-bind:args="listArgs")
</template>
<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import apiId from '@/str/api';
import { internal as urlId } from '@/str/url';
import logger from '@/log/client';
import buttonVue from '../button';
// import listVue from '../list';

export default {
  data() {
    return {
      tickets: this.$store.state.tickets,
      comments: this.$store.state.comments,
      btnArgs: {
        //          btnName: 'button.status.btnName',
        btnName: 'Close',
        btnClick: () => {
          const { page } = this.$store.state.basic;
          const params = {
            req: {
              m: apiId.msg.closeMessage,
            },
          };
          if (page === urlId.tickets) {
            params.req.mids = this.tickets.msgs
              .filter(item => item.checked)
              .map(item => item.mid);
            if (params.req.mids.length === 0) {
              return;
            }
          } else if (page === urlId.ticket) {
            params.req.mids = [this.comments.mid];
          }
          this.$_hd.ctrl.request.getDataVR(params)
            .then(async () => {
              await Promise.all([
                this.$store.dispatch({
                  type: storeId.actions.ticketsUpdMsgs,
                  vueObj: this,
                }),
                this.$store.dispatch({
                  type: storeId.actions.ticketsUpdCount,
                  vueObj: this,
                }),
              ]);
            }).catch(err => logger.error(err));
        },
        classObj: {
          'btn-small': true,
          //            'btn-select': true,
          //            'btn-menu': true,
        },
      },
    };
  },
  components: {
    buttonVue,
    //      listVue,
  },
};
</script>
