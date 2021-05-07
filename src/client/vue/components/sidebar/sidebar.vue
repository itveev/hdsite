<template lang="pug">
.sidebar
  tickets-vue
  profile-vue
  //
    departments-vue
    agents-vue
    tags-vue
</template>

<script lang="babel" type="text/babel">
// import listVue from './list.vue';
import storeId from '@/str/store';
import profileVue from './profile';
import ticketsVue from './tickets';
import tagsVue from './tags';
import departmentsVue from './departments';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
    };
  },
  methods: { },
  computed: { },
  components: {
    // listVue,
    profileVue,
    ticketsVue,
    departmentsVue,
    tagsVue,
    // agentsVue
  },
};
</script>
