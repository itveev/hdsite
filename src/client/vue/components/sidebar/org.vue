<template lang="pug">
list-vue(v-bind:args="listArgs" )
</template>

<script lang="babel" type="text/babel">
import { internal as urlId } from '@/str/url';
import listVue from './list';

export default {
  data() {
    return {
      listArgs: {
        title: 'Organization',
        items: [{
          path: urlId.appearance,
          text: 'Appearance',
        }],
      },

    };
  },
  components: {
    listVue,
  },
};
</script>
