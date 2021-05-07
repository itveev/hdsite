<template lang="pug">
.col-3
  button-vue(v-bind:args="btnArgs")
    template(slot="list")
      list-vue(v-show="isList" v-bind:args="listArgs")
    template(slot="forms")
      user-vue(v-show="isUser")
      project-vue(v-show="isProject")
</template>
<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import logger from '@/log/client';
import { internal as urlId } from '@/str/url';
import apiId from '@/str/api';
import sid from '@/str/id';
import buttonVue from '../button';
import listVue from '../list';
import userVue from './user';
import projectVue from './project';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      btnStore: this.$store.state.button,
      btnArgs: {
        btnName: 'button.create.btnName',
        classObj: {
          'btn-inverted': true,
          'btn-menu': true,
        },
      },
      listArgs: {
        callback: (item) => {
          this.$store.commit({
            type: storeId.mutation.buttonChange,
            prop: sid.createSt,
            val: item.state,
          });
        },
        items: [{
          text: 'button.create.project',
          state: 'project',
        }, {
          text: 'button.create.user',
          state: 'user',
          id: 'createUserBtn',
        }, {
          text: 'button.create.ticket',
          callback: () => {
            // if (!this.gts[this.str.basicIsCurPage](urlId.draft)) {
            const params = {
              req: {
                m: apiId.msg.addNewDraftMessage,
                caption: '',
              },
            };
            this.$_hd.ctrl.request.getDataVR(params)
              .then((res) => {
                this.$store.commit({
                  type: storeId.mutation.draftChange,
                  method: storeId.method.clearSetDirty,
                  state: res.data,
                });
                this.$store.dispatch({
                  type: storeId.actions.ticketsUpdCount,
                  vueObj: this,
                });
                this.$router.push(urlId.draft);
              }).catch(err => logger.error(err));
            // }
          },
        }],
      },
    };
  },
  computed: {
    isList() {
      return !this.btnStore.createSt;
    },
    isUser() {
      return this.btnStore.createSt === 'user';
    },
    isProject() {
      return this.btnStore.createSt === 'project';
    },
  },
  components: {
    buttonVue,
    listVue,
    userVue,
    projectVue,
  },
};
</script>
