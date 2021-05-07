<template lang="pug">
button-vue(v-if="gts[str.basicIsCurPage](urls.ticket)" v-bind:args="btnArgs")
</template>
<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import { internal as urlId } from '@/str/url';
import buttonVue from '../button';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      urls: urlId,
      btnArgs: {
        btnName: 'button.macro.btnName',
        classObj: {
          'btn-small': true,
        },
      },
    };
  },
  components: {
    buttonVue,
  },
};
</script>
