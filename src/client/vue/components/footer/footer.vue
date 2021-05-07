<template lang="pug">
.footer(v-if="!gts[str.basicIsInternal]")
  .row
    .col-2.col-skip-7.center-col
      p.text-center.text-disabled
        template(v-if="gts[str.basicIsCurPage](urls.signup)")
          |{{incText}}
        template(v-else)
          |{{mainText}}
          a(v-bind:href="urls.defaultUrl" v-text="name")
</template>

<script>

import moment from 'moment';
import storeId from '@/str/store';
import hdId from '@/str/hd';
import { internal } from '@/str/url';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      mainText: 'Powered by ',
      incText: `© ${moment().year()} ${hdId.projectName}, Inc.`,
      name: hdId.projectName,
      urls: internal,
      // url: this.$_hd.ctrl.vldt.landUrl(),
    };
  },
  components: {
  },
};
</script>
