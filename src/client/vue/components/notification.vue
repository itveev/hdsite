<template lang="pug">
  .notification(v-bind:class="{ appeared: shown }")
    .notification-icon(v-bind:class="{ 'icon-error': args.type === sid.err }")
    .notification-body
      p(v-text="args.title")
      p(v-text="args.text")
    a.notification-dismiss(v-on:click.prevent="dismiss()")
</template>

<script>
import sid from '@/str/id';
import storeId from '@/str/store';
// To add new notification:
//   this.$store.commit({
//     type: storeId.mutation.notificationChange,
//     func: sid.add,
//     msg: {
//       type: sid.err,
//       title: 'Test JS add',
//       text: 'Hello! This is a JS notification. It may contain multiple lines (5 max.).',
//     },
//   });
export default {
  mounted() {
    setTimeout(() => {
      this.shown = true;
    }, 50);
  },
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        type: sid.warn,
        title: 'Warning',
        text: 'Notification',
      }),
    },
    index: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  data() {
    return {
      sid,
      shown: false,
    };
  },
  computed: {},
  methods: {
    dismiss() {
      this.shown = false;
      setTimeout(() => {
        this.$store.commit({
          type: storeId.mutation.notificationChange,
          func: sid.rm,
          index: this.index,
        });
      }, 400);
    },
  },
};
</script>
