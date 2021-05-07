<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-3
      form.form(v-on:submit.prevent="create")
        ul.controls-list
          li
            label(for="email") Email address
            input#email(v-focus="true"
              v-validate.immediate='validate.email'
              v-bind:class="$_vldtCmn_classObj('email')"
              name="email"
              type="text"
              v-model="email"
              v-on:focus="$_vldtCmn_focused('email')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('password')")
            p.input-error(v-show="$_vldtCmn_show('email')"
              v-text="veeErrors.first('email')")
          li
            label(for="password") Password
            input#password(v-validate.immediate='validate.password'
              v-bind:class="$_vldtCmn_classObj('password')"
              name="password"
              type="password"
              v-model="pwd"
              v-on:focus="$_vldtCmn_focused('password')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="create")
            p.input-error(v-show="$_vldtCmn_show('password')"
              v-text="veeErrors.first('password')")
          li
            p.text-center.text-disabled
              |I agree with the&nbsp
              router-link(v-bind:to="urlId.terms") Terms
              |&nbspof service.
            a.btn.btn-wide(v-on:click.prevent="create") SignUp
</template>

<script lang="babel" type="text/babel">
import logger from '@/log/client';
import apiId from '@/str/api';
import { landing as urlId } from '@/str/url';
import titleVue from './title';
import validatorOrg from '../../mixin/validator/org';

export default {
  mixins: [validatorOrg],
  created() {
    //      this.$_vldtOrg_createNotExist(); // email?
  },
  data() {
    return {
      urlId,
      org: this.$store.state.org,
      pwd: '',
      email: '',
      args: {
        title: 'Get started with Leeft',
      },
      validate: {
        email: {
          rules: {
            email: true,
            required: true,
          },
        },
        password: {
          rules: {
            required: true,
          },
        },
      },
    };
  },
  methods: {
    create() {
      this.createValid().catch(err => logger.error(err));
    },
    async createValid() {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.usr.createAccount,
            aid: 'email',
            oid: this.org.oid,
            param1: this.email,
            param2: this.pwd,
          },
        };
        await this.$_hd.ctrl.request.getDataVR(params);
        this.pwd = '';
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
