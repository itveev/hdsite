<template lang="pug">
.col-2.brand(
  v-bind:class="{'brand-own':isOwn}")
  a(v-if="isOwn"
    v-bind:href="urls.defaultUrl"
    v-text="brandName")
  template(v-else)
    img.icon(v-if="org.isPhoto" v-bind:src="org.photo")
    |{{org.name}}
</template>

<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import hdId from '@/str/hd';
import { internal } from '@/str/url';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      org: this.$store.state.org,
      brandName: hdId.projectName,
      urls: internal,
    };
  },
  components: {
  },
  computed: {
    isOwn() {
      return !(this.gts[this.str.basicIsInternal]
        || this.gts[this.str.basicIsCurPage](this.urls.submit));
    },
  },
};
</script>
