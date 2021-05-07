<template lang="pug" type="pug">
.row.margin.margin-top-lg
  .col-16.text-center
    h3(v-text="args.title")
    slot(name="icon")
</template>

<script lang="babel" type="text/babel">

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
      }),
    },
  },
  data() {
    return {};
  },
};
</script>
