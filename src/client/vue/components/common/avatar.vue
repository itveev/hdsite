<template lang="pug">
router-link(v-bind:to="args.link"
  v-bind:class="args.classObj"
  v-bind:style="avaStyle")
  span(v-if="args.profile.uid && !args.profile.isPhoto" v-text="args.profile.abbr")
  slot
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
        link: '#',
        classObj: {},
        avaStyle: {},
        profile: {
          isPhoto: false,
          abbr: '',
          uid: '',
          oid: '',
        },
      }),
    },
  },
  data() {
    return { };
  },
  computed: {
    avaStyle() {
      const id = this.args.profile.uid || this.args.profile.oid;
      return this.args.profile.isPhoto ? {
        'background-image': `url(${this.args.profile.photo})`,
      } : {
        'background-color': this.colorStyle(id),
      };
    },
  },
  methods: {
    // test
  },
};
</script>
