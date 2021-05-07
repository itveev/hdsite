<template lang="pug">
.main
  .row.margin-btm
    .col-8
      slot(name="subject")
    slot(name="actions")
  .ticket
    slot(name="reply")
    slot(name="comments")
</template>

<script lang="babel" type="text/babel">

export default {
  mounted() { },
  data() {
    return { };
  },
  methods: { },
  components: { },
};
</script>
