<i18n>
  en:
    header: "Edit profile"
  ru:
    header: "Редактирование профиля"
</i18n>

<template lang="pug">
.main
  h4(v-text="$t('header')")
  .row
    form-vue
    card-vue(v-bind:args="cardArgs")
</template>

<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import logger from '@/log/client';
import apiId from '@/str/api';
import cardVue from './card';
import formVue from './form';
import { external } from '@/str/url';

export default {
  created() {
    this.loadProf().catch(err => logger.error(err));
  },
  data() {
    return {
      cardArgs: {
        profile: this.$store.state.profile,
        isOwn: true,
      },
    };
  },
  methods: {
    async loadProf() {
      const params = {
        req: {
          m: apiId.usr.getProfile,
        },
        url: external.usrSvc,
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      this.$store.commit({
        type: storeId.mutation.profileChange,
        method: storeId.method.setDirtyState,
        state: res.data,
      });
    },
  },
  components: {
    cardVue,
    formVue,
  },
};
</script>
