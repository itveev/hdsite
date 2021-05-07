<template lang="pug">
list-vue(v-bind:args="listArgs")
</template>

<script>
// import urlId from '@/str/url';
import listVue from './list';

export default {
  data() {
    return {
      listArgs: {
        title: 'Account',
        items: [{
          path: '#',
          text: 'Plans',
        }],
      },
    };
  },
  components: {
    listVue,
  },
};
</script>
