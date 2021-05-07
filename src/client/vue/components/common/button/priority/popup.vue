<template lang="pug">
button-vue(v-bind:args="btnArgs")
  template(slot="list")
    list-vue(v-bind:args="listArgs")
</template>
<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import logger from '@/log/client';
import { internal as urlId } from '@/str/url';
import apiId from '@/str/api';
import buttonVue from '../button';
import listVue from '../list';

export default {
  data() {
    return {
      tickets: this.$store.state.tickets,
      comments: this.$store.state.comments,
      btnArgs: {
        btnName: 'button.priority.btnName',
        classObj: {
          'btn-small': true,
          'btn-select': true,
          'btn-menu': true,
        },
      },
      listArgs: {
        callback: (item) => {
          const { page } = this.$store.state.basic;
          const params = {
            req: {
              m: apiId.msg.changeMessagePriority,
              priority: item.state,
            },
          };
          if (page === urlId.tickets) {
            params.req.mids = this.tickets.msgs
              .filter(itm => itm.checked)
              .map(itm => itm.mid);
            if (params.req.mids.length === 0) {
              return;
            }
          } else if (page === urlId.ticket) {
            params.req.mids = [this.comments.mid];
          }
          this.$_hd.ctrl.request.getDataVR(params)
            .then(async (/* res */) => {
              await this.$store.dispatch({
                type: storeId.actions.ticketsUpdMsgs,
                vueObj: this,
              });
            }).catch(err => logger.error(err));
        },
        items: [{
          text: 'High',
          state: 'high',
        }, {
          text: 'Normal',
          state: 'normal',
        }, {
          text: 'Low',
          state: 'low',
        }],
      },
    };
  },
  components: {
    buttonVue,
    listVue,
  },
};
</script>
