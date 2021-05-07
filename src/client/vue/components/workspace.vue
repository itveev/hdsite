<template lang="pug">
.workspace(v-bind:class="{'workspace-centered':!gts[str.basicIsInternal]}")
  router-view(name="navbarVue")
  router-view(name="sidebarVue")
  router-view
</template>

<script lang="babel" type="text/babel">

import storeId from '@/str/store';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
    };
  },
  components: { },
  computed: { },
};
</script>
