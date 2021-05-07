<template lang="pug">
list-vue(v-bind:args="listArgs"  )
</template>

<script>
// import urlId from '@/str/url';
import listVue from './list';

export default {
  data() {
    return {
      listArgs: {
        title: 'Manage',
        items: [{
          path: '#',
          text: 'Projects',
        }, {
          path: '#',
          text: 'Roles',
        }, {
          path: '#',
          text: 'Permissions',
        }, {
          path: '#',
          text: 'Teams',
        }, {
          path: '#',
          text: 'Users',
        }],
      },

    };
  },
  components: {
    listVue,
  },
};
</script>
