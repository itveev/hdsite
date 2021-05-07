<template lang="pug">
.main
  .row
    .col-16.text-center
      h1.text-disabled Oops...
      p.font-f
        | We haven't found this page. It doesn't exist or you don't have
        | permissions to view it.
      ul.inline
        template(v-if="!gts[str.basicIsInternal]")
          li
            a(v-bind:href="urlId.defaultUrl" v-text='mainText')
          li
            router-link(v-bind:to="urlId.signin") Sign In
        //
          li(v-else-if="!gts[str.basicIsInternal]")
            a(v-bind:href="urlId.defaultUrl") Return to signin
        //
          li
            router-link(v-bind:to="") Return to dashboard
        template(v-else)
          li
            router-link(v-bind:to="urlId.defaultUrl" v-text='mainText')
          li
            router-link(v-bind:to="urlId.signin") Switch account
</template>

<script>
import storeId from '@/str/store';
import { internal as urlId } from '@/str/url';

export default {
  data() {
    return {
      mainText: 'Return to main page',
      gts: this.$store.getters,
      str: storeId.getters,
      urlId,
    };
  },
  components: {},
  methods: {},
  computed: {},
};
</script>
