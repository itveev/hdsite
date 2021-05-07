<template lang="pug">
.panel(v-bind:class="args.classObj")
  h5(v-text="args.title")
  p(v-text="args.text")
  slot
</template>

<script lang="babel" type="text/babel">
// import actionsVue from './common/actions';
// import logger from '../../../log/client';
// import { internal as urlId } from '@/str/url';

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        panelClass: {},
        title: '',
        text: '',
      }),
    },
  },
  data() {
    return {
    };
  },
  components: {
    // actionsVue,
  },
  computed: {
  },
  methods: {
  },
};
</script>
