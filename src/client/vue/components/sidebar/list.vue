<template lang="pug">
div
  h5(v-text="$t('list.'+ args.title)")
  ul(v-bind:class="args.ulClass")
    li(v-for="item in args.items"
      v-bind:class="{active : active(item)}" v-on:click.prevent="pick(item)")
      router-link(v-bind:to="item.path" )
        slot(name="item" v-bind:item="item")
          |{{item.text}}
</template>

<script>

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        ulClass: {},
        items: [],
        active: () => {},
        callback: () => {},
      }),
    },
  },
  data() {
    return {
    };
  },
  methods: {
    active(item) {
      return item.active ? item.active() : this.args.active && this.args.active(item);
      //        item.path==state.page
    },
    pick(item) {
      return item.callback ? item.callback() : this.args.callback && this.args.callback(item);
    },
  },
};
</script>
