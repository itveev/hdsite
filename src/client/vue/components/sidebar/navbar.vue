<template lang="pug">
.sidebar.sidebar-narrow(v-if="gts[str.basicIsInternal]")
  ul
    li(v-for="item in items")
      router-link.icon.icon-glyph(v-bind:to="item.link" v-bind:class="item.classObj")
      //
        span.nav-item-text(v-text="item.name")
</template>

<script>

import storeId from '@/str/store';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      items: [{
        link: '/#',
        name: 'Dashboard',
        classObj: {
          'icon-dashboard': true,
        },
      }, {
        link: '/#',
        name: 'Tickets',
        classObj: {
          'icon-tickets': true,
        },
      }, {
        link: '/#',
        name: 'Knowlege base',
        classObj: {
          'icon-kb': true,
        },
      }, {
        link: '/#',
        name: 'Settings',
        classObj: {
          'icon-settings': true,
        },
      }],
    };
  },
};
</script>
