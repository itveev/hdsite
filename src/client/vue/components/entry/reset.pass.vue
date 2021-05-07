<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-3
      form.form(v-on:submit.prevent="resetPwd")
        ul.controls-list
          li
            label(for="email") Email
            input#email(v-focus="true"
              v-validate.immediate="validate.email"
              v-bind:class="$_vldtCmn_classObj('email')"
              name="email"
              type="text"
              v-model="email"
              v-on:focus="$_vldtCmn_focused('email')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="resetPwd")
            p.input-error(v-show="$_vldtCmn_show('email')"
              v-text="veeErrors.first('email')")
          li
            a.btn.btn-wide(v-on:click.prevent="resetPwd") Reset password
</template>

<script lang="babel" type="text/babel">
import logger from '@/log/client';
import apiId from '@/str/api';
import titleVue from './title';
import validatorCmn from '../../mixin/validator/cmn';

export default {
  mixins: [validatorCmn],
  created() {
  },
  data() {
    return {
      org: this.$store.state.org,
      pwd: '',
      email: '',
      args: {
        title: 'Get started with Leeft',
      },
      validate: {
        email: {
          rules: {
            required: true,
            email: true,
          },
        },
      },
    };
  },
  methods: {
    resetPwd() {
      this.restorePass().catch(err => logger.error(err));
    },
    async restorePass() {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.usr.restorePassword,
            oid: this.org.oid,
            email: this.email,
          },
        };
        await this.$_hd.ctrl.request.getDataVR(params);
        this.email = '';
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
  },
  components: {
    titleVue,
  },
};
</script>
