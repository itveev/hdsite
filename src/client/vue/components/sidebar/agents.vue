<template lang="pug">
list-vue(v-bind:args="listArgs")
</template>

<script>
// import urlId from '@/str/url';
import storeId from '@/str/store';
import apiId from '@/str/api';
import logger from '@/log/client';
import listVue from './list';


// for future online agents
//  {
//    text:'Anton',
//      spanText:'',
//    classObj:{
//    'user-offline':true,
//      'user-online':false,
//      'user-status':true
//  }
//  }

export default {
  mounted() {
    this.loadAgents().catch(err => logger.error(err));
  },
  data() {
    return {
      listArgs: {
        title: 'agents',
        items: [],
      },
    };
  },
  components: {
    listVue,
  },
  methods: {
    async loadAgents() {
      const ids = await this.loadIds();
      const users = await this.$_hd.ctrl.user.loadUsers({ ids });
      this.updateUsers(users);
    },
    async loadIds() {
      const ids = new Set();
      const params = {
        req: {
          m: apiId.msg.getMembershipInDepartment,
          gid: 1,
        },
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      res.data.usrs.forEach((item) => {
        ids.add(item);
        this.listArgs.items.unshift(this.createAgent(item));
      });
      return ids;
    },
    updateUsers(users) {
      this.$store.commit({
        type: storeId.mutation.usersChange,
        method: storeId.method.appendUsers,
        state: users,
      });
      const namesObj = this.$_hd.ctrl.user.constructor.getNames(users);
      this.listArgs.items.forEach((item) => {
        item.text = namesObj[item.uid];
      });
    },
    createAgent(item) {
      const { users } = this.$store.state;
      const { method } = storeId;
      const user = users[method.getUser](item.uid);
      const newAgent = {
        uid: item,
        path: '#',
        text: user ? this.$_hd.ctrl.user.constructor.getName(user) : item,
      };
      return newAgent;
    },
  },
};
</script>
