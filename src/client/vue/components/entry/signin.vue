<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
    template(slot="icon")
      .font-h4
        img.icon(v-if="org.isPhoto" v-bind:src="org.photo")
        |&nbsp{{org.name}}
      .font-h5(v-text="org.description")
  .row
    .col-3
      form.form(v-on:submit.prevent="")
        ul.controls-list
          li
            label(for="email") Email address
            input#email(
              v-focus="true"
              v-validate.immediate="validate.email"
              v-model="email"
              v-bind:class="$_vldtCmn_classObj('email')"
              name="email"
              type="text"
              v-on:focus="$_vldtCmn_focused('email')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('password')")
            p.input-error(v-show="$_vldtCmn_show('email')"
              v-text="veeErrors.first('email')")
          li
            label(for="password") Password
            input#password(
              v-validate.immediate="validate.password"
              v-model="pass"
              type="password"
              v-bind:class="$_vldtCmn_classObj('password')"
              name="password"
              v-on:focus="$_vldtCmn_focused('password')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="passwOauth")
            p.input-error(v-show="$_vldtCmn_show('password')"
              v-text="veeErrors.first('password')")
          li
            a.btn(v-on:click.prevent="passwOauth") Sign in
            router-link.plain(v-bind:to="urlId.resetPass") Forgot password
      //-
        p.text-center.text-disabled
          |Don't have an account yet?&nbsp
          router-link(v-bind:to="urlId.signup") Sign up
    .col-1.delimiter-col
      div
    oauth-vue(v-on:allowed='socialOauth')
</template>

<script>
import storeId from '@/str/store';
import sid from '@/str/id';
import errId from '@/str/ptcl/error';
import logger from '@/log/client';
import { internal as urlId, external } from '@/str/url';
import apiId from '@/str/api';
import titleVue from './title';
import oauthVue from './oauth';
import validatorCmn from '../../mixin/validator/cmn';

export default {
  mixins: [validatorCmn],
  created() {
  },
  data() {
    return {
      basic: this.$store.state.basic,
      validate: {
        email: {
          rules: {
            required: true,
            email: true,
          },
        },
        password: {
          rules: {
            required: true,
          },
        },
      },
      args: {
        title: 'Sign in to',
      },
      urlId,
      email: '',
      pass: '',
      repMsg: '',
      sw: false,
      imgSrc: '',
      name: '',
      im: false,
      org: this.$store.state.org,
      // infoMsg: 'Info message',
      classObj: {
        alert: true,
        'alert-info': true,
        reply: true,
        'alert-danger': false,
      },
    };
  },
  methods: {
    socialOauth() {
      this.socialSignin().catch(err => logger.error(err));
    },
    async socialSignin() {
      this.checkRes(await this.authUser());
    },
    passwOauth() {
      this.validPasAuth().catch(err => logger.error(err));
    },
    async validPasAuth() {
      if (await this.$_vldtCmn_validateAll()) {
        this.checkRes(await this.loginUser());
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
    checkRes(res) {
      if (res.data.res === errId.err.type
          && res.data.resCode === errId.err.authFailed) {
        // login or pass incorrect
        logger.info('login or pass incorrect');
      } else {
        this.successLogin(res);
      }
    },
    successLogin(res) {
      this.$store.commit({
        type: storeId.mutation.basicChange,
        prop: sid.auth,
        val: res.data.auth,
      });
      this.$store.commit({
        type: storeId.mutation.profileChange,
        method: storeId.method.clearSetDirty,
        state: res.data,
      });
      if (this.$store.state.action.type) {
        this.$router.push(urlId.action);
      } else {
        this.$router.push(urlId.tickets);
      }
      this.email = '';
      this.pass = '';
      this.$validator.reset();
    },
    // TODO: Delete or modify before release!
    // Function not used!
    errLogin(err) {
      logger.info(err);
      this.sw = true;
      this.classObj['alert-info'] = false;
      this.classObj['alert-danger'] = true;
      this.repMsg = err.message;
      setTimeout(() => {
        this.classObj['alert-info'] = true;
        this.classObj['alert-danger'] = false;
        this.sw = false;
      }, 3000);
    },
    async loginUser() {
      const params = {
        req: {
          m: apiId.usr.login,
          aid: 'email',
          oid: this.org.oid,
          param1: this.email,
          param2: this.pass,
        },
        url: external.usrSvc,
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      return res;
    },
    async authUser() {
      const params = {
        req: {
          m: apiId.usr.login,
          aid: `${this.basic.svc}_OAuth2`,
          oid: this.org.oid,
          param1: this.basic.access,
          param2: '',
        },
        url: external.usrSvc,
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      return res;
    },
  },
  components: {
    titleVue,
    oauthVue,
  },
};
</script>
