<template lang="pug">
list-vue(v-bind:args="listArgs" )
</template>

<script>
// import urlId from '@/str/url';
import listVue from './list';

export default {
  data() {
    return {
      // locale,
      listArgs: {
        title: 'Automation',
        items: [{
          path: '#',
          text: 'Tasks',
        }],
      },
    };
  },
  components: {
    listVue,
  },
};
</script>
