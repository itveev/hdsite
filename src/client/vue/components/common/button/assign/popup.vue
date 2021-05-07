<template lang="pug">
button-vue(v-bind:args="btnArgs")
  template(slot="list")
    list-vue(v-bind:args="listArgs")
</template>
<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import { internal as urlId } from '@/str/url';
import logger from '@/log/client';
import apiId from '@/str/api';
import sid from '@/str/id';
import ppid from '@/str/ptcl/prop';
import buttonVue from '../button';
import listVue from '../list';

export default {
  created() {
    this.load().catch(err => logger.error(err));
  },
  data() {
    return {
      tickets: this.$store.state.tickets,
      comments: this.$store.state.comments,
      btnArgs: {
        btnName: 'button.assign.btnName',
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
              m: apiId.msg.changeMessageAgent,
              uid: item.uid,
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
            params.req.mid = this.comments.mid;
          }
          this.$_hd.ctrl.request.getDataVR(params)
            .then(async (res) => {
              if (page === urlId.tickets) {
                const checked = {};
                this.$store.commit({
                  type: storeId.mutation.ticketsChange,
                  prop: sid.msgs,
                  func: sid.forEach,
                  args: [(itm, index) => {
                    if (itm.checked) {
                      checked[itm.mid] = index;
                    }
                  }],
                });
                if (res.data.mids.length !== checked.length) {
                  // error, operation not fully performed
                }
              } else {
                //
              }
              // ???
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
        items: [],
      },
    };
  },
  methods: {
    async load() {
      // const ids = await this.getIds();
      const users = await this.$_hd.ctrl.user.loadUsers({
        role: ppid.role.agent,
        mode: sid.inherit,
      });
      // GetProfilesByRole
      this.updateUsers(users);
    },
    updateUsers(users) {
      users.forEach((item) => {
        this.listArgs.items.push(this.createUser(item));
      });
    },
    createUser(user) {
      return {
        text: this.$_hd.ctrl.user.constructor.getName(user),
        uid: user.uid,
      };
    },
  },
  components: {
    buttonVue,
    listVue,
  },
};
</script>
