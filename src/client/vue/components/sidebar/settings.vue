<template lang="pug">
list-vue(v-bind:args="listArgs" )
</template>

<script lang="babel" type="text/babel">
// import urlId from '@/str/url';
import listVue from './list';

export default {
  data() {
    return {
      listArgs: {
        title: 'Settings',
        items: [{
          path: '#',
          text: 'Security',
        }, {
          path: '#',
          text: 'Backup',
        }],
      },
    };
  },
  components: {
    listVue,
  },
};
</script>
