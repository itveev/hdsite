<template lang="pug">
button-vue(v-bind:args="btnArgs")
  template(slot="list")
    list-vue(v-bind:args="listArgs")
</template>

<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import buttonVue from '../button';
import listVue from '../list';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      btnArgs: {
        btnName: 'button.projects.btnName',
        classObj: {
          'btn-link': true,
          'btn-select': true,
          'btn-menu': true,
        },
      },
      listArgs: {
        callback(/* state */) {},
        items: [{
          text: 'Nuggets',
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
