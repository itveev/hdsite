<template lang="pug">
.main
  h4 Profile
  .row
    .col-4
      h5.caption Info
      form.form
        ul.controls-list
          li
            label(for="display") Full name
            input.input-small#display(disabled="true"
              type="text"
              v-model="cardArgs.profile.display" )
          li
            label(for="status") Status
            input.input-small#status(disabled="true" type="text" v-model="cardArgs.profile.status" )
          li
            label(for="role") Role
            input.input-small#role(disabled="true" type="text" v-model="cardArgs.profile.role" )
          li
            label(for="sign") Signature
            textarea.input-small.no-resize#sign(disabled="true" v-model="cardArgs.profile.sign" )
          li
            label(for="email") Email address
            input.input-small#email(disabled="true" type="text" v-model="cardArgs.profile.email" )
          li
            label(for="lang") Language
            input.input-small#email(disabled="true" type="text" v-model="cardArgs.profile.lang" )
          li
            label(for="tz") Time zone
            input.input-small#tz(disabled="true" type="text" v-model="cardArgs.profile.tz" )
    card-vue(v-bind:args="cardArgs")
</template>

<script lang="babel" type="text/babel">
import logger from '@/log/client';
import cardVue from './card';
// import testVue from './test.vue';

export default {
  created() {
    this.loadUser().catch(err => logger.error(err));
  },
  data() {
    const profile = this.$store.state.profile
      .getCopy(this.$route.params.id);
    return {
      cardArgs: {
        profile,
        isOwn: false,
      },
    };
  },
  methods: {
    async loadUser() {
      //        console.log(this.cardArgs);
      this.cardArgs.profile.clearState();
      const user = await this.$_hd.ctrl.user
        .loadUser(this.$route.params.id);
      this.cardArgs.profile.setCleanState(user);
    },
  },
  components: {
    cardVue,
  },
};
</script>
