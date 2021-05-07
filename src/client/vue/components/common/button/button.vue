<template lang="pug">
a.btn(v-bind:class="args.classObj"
  v-bind:style="args.styleObj"
  v-on:click.prevent="btnClick")
  slot(name="title")
    |{{$t(args.btnName)}}
  slot(name="list")
  slot(name="forms")
</template>

<script lang="babel" type="text/babel">

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        btnName: 'Default name',
        classObj: {},
        styleObj: {},
        btnClick: () => {},
      }),
    },
  },
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    btnClick() {
      return this.args.btnClick && this.args.btnClick();
    },
  },
};
</script>
