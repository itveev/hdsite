<template lang="pug">
list-vue(v-if="gts[str.basicIsTicket]" v-bind:args="listArgs")
</template>

<script>

import storeId from '@/str/store';
import listVue from './list';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      listArgs: {
        title: 'departments',
        items: [{
          path: '#',
          text: 'Technical',
        }, {
          path: '#',
          text: 'Financial',
        }, {
          path: '#',
          text: 'Marketing',
        }, {
          path: '#',
          text: 'Design',
        }],
      },
    };
  },
  components: {
    listVue,
  },
};
</script>
