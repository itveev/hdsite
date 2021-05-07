<template lang="pug">
form.form(v-on:mouseleave="cancel")
  ul.controls-list
    template(v-for="item in args.items")
      li
        label(
          v-bind:for="item.id"
          v-text="$t(item.text)")
        input.input-small(
          v-bind:id="item.id"
          type="text"
          v-model="item.model")
    li
      a.plain(
        v-text="$t(cancelText)"
        v-on:click="cancel")
      a.btn.btn-small(
        v-text="$t(args.submitText)"
        v-on:click="create")
</template>

<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import sid from '@/str/id';

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        submitText: '',
        submit: () => {},
        items: [],
      }),
    },
  },
  data() {
    return {
      cancelText: 'button.cancel',
    };
  },
  components: {
  },
  methods: {
    cancel() {
      this.$store.commit({
        type: storeId.mutation.buttonChange,
        prop: sid.createSt,
        val: null,
      });
    },
    create() {
      this.args.submit();
    },
  },
};
</script>
