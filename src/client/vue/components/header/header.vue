<template lang="pug">
.header(v-bind:class="{'header-transparent': !gts[str.basicIsInternal] }")
  .row
    brand-vue
    //
      projects-vue(v-if="!gts[str.basicIsInternal]")
    //
    create-vue(v-if="gts[str.basicIsInternal]")
    search-vue(v-if="gts[str.basicIsInternal]")
    //
      user-button-vue
    //
    user-vue(v-if="gts[str.basicIsInternal]")
</template>

<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import brandVue from './brand';
import userVue from './user';
import searchVue from './search';
import createVue from '../common/button/create/popup';
import projectsVue from '../common/button/projects/popup';
import userButtonVue from '../common/button/user/popup';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
    };
  },
  components: {
    brandVue,
    userVue,
    searchVue,
    createVue,
    projectsVue,
    userButtonVue,
  },
  computed: {
  },
};
</script>
