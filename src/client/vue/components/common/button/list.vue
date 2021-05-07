<template lang="pug">
//- There may be an additional class popup-right (for right-sided buttons)
.popup(v-bind:class="{'popup-right':args.right}")
  ul.popup-menu
    template(v-for="item in args.items")
      li.delimiter(v-if="item.isDelimiter")
      li(v-else)
        a.plain(
          v-bind:id="item.id"
          v-text="$t(item.text)"
          v-on:click.prevent.stop="pick(item)")
</template>

<script lang="babel" type="text/babel">

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        callback: () => {},
        items: [],
      }),
    },
  },
  data() {
    return {};
  },
  components: {
  },
  methods: {
    pick(item) {
      item.callback ? item.callback() : this.args.callback(item);
    },
  },
};
</script>
