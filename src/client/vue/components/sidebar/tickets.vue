<template lang="pug">
list-vue(
  v-if="gts[str.basicIsTicket]"
  v-bind:args="listArgs")
  template(slot="item" slot-scope="props")
    |{{$t('titles.'+props.item.state)}}
    span.label.label-loading(v-show="isLoading(props.item)")
      span.dots
    span.label(v-show="!isLoading(props.item)"
      v-text="tickets[props.item.state]")
</template>

<script>
import storeId from '@/str/store';
import { internal as urlId } from '@/str/url';
import sid from '@/str/id';
import logger from '@/log/client';
import listVue from './list';

export default {
  created() {
    this.load().catch(err => logger.error(err));
  },
  data() {
    return {
      sid,
      gts: this.$store.getters,
      str: storeId.getters,
      tickets: this.$store.state.tickets,
      listArgs: {
        title: 'tickets',
        callback: (item) => {
          this.load().catch(err => logger.error(err));
          if (urlId.tickets === this.$store.state.basic.page) {
            // TODO: For correct switching loading gif need item state store
            // item.loading = true;
            this.$store.dispatch({
              type: storeId.actions.ticketsUpdMsgs,
              vueObj: this,
              filter: item.state,
            }).catch(err => logger.error(err)).then(() => {
              // item.loading = false;
            });
          } else {
            this.$store.commit({
              type: storeId.mutation.ticketsChange,
              prop: sid.filter,
              val: item.state,
            });
            this.$router.push(urlId.tickets);
          }
        },
        active: item => (item.state === this.tickets.filter)
            && (urlId.tickets === this.$store.state.basic.page),
        items: [{
          path: '',
          spanText: '',
          state: sid.fresh,
        }, {
          path: '',
          spanText: '',
          state: sid.active,
        }, {
          path: '',
          spanText: '',
          state: sid.all,
          // loading: false,
        }, {
          path: '',
          spanText: '',
          state: sid.draft,
        }, {
          path: '',
          spanText: '',
          state: sid.solved,
          //          },{
          //            path:'',
          //            text:'Trash',
          //            spanText:'',
          //          },{
          //            path:'',
          //            text:'Spam',
          //            spanText:'',
        }],
      },
    };
  },
  components: {
    listVue,
  },
  methods: {
    async load() {
      await this.$store.dispatch({
        type: storeId.actions.ticketsUpdCount,
        vueObj: this,
      });
    },
    isLoading(item) {
      return (item.state === this.tickets.filter) && this.tickets.loading;
    },
  },
};
</script>
