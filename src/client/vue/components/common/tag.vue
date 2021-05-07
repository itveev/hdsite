<template lang="pug">
span.label(v-bind:style="tagStyle" v-text="args.text")
</template>

<script lang="babel" type="text/babel">
import colorMix from './color';

export default {
  mixins: [colorMix],
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        text: '',
      }),
    },
  },
  data() {
    return { };
  },
  computed: {
    tagStyle() {
      return {
        'background-color': this.colorStyle(this.args.text),
      };
    },
  },
  methods: { },
};
</script>
