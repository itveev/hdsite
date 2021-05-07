<template lang="pug">
.app
  .notifications
    notificationVue(v-for="(item,index) in ntfn.shown"
      v-bind:args="item"
      v-bind:index="index"
      v-bind:key="item.id")
  router-view(name="headerVue")
  router-view
  router-view(name="footerVue")
</template>

<script>
import sid from '@/str/id';
import notificationVue from './components/notification';

export default {
  name: 'app',
  data() {
    return {
      sid,
      ntfn: this.$store.state.notification,
    };
  },
  computed: {},
  methods: {
  },
  components: {
    notificationVue,
  },
};
</script>

<style lang='stylus'>
// importing app.styl
@import '../assets/css/app'
// @import '../assets/css/app.css'
</style>
