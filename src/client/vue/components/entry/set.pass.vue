<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-3
      validation(name="form" )
        form.form(v-on:submit.prevent="setPwd")
          ul.controls-list
            li
              label(for="password") Password
              input#password(v-focus="true"
                v-validate.immediate="validate.password"
                v-bind:class="$_vldtCmn_classObj('password')"
                name="password"
                type="password"
                v-model="pwd"
                v-on:focus="$_vldtCmn_focused('password')"
                v-on:blur="$_vldtCmn_blured"
                v-on:keyup.enter="setPwd")
              p.input-error(v-show="$_vldtCmn_show('password')"
                v-text="veeErrors.first('password')")
            li
              a.btn.btn-wide(v-on:click.prevent="setPwd") Set password
    oauth-vue(v-on:allowed='social')
</template>

<script>
import storeId from '@/str/store';
import logger from '@/log/client';
import apiId from '@/str/api';
import sid from '@/str/id';
import { internal as urlId } from '@/str/url';
import titleVue from './title';
import oauthVue from './oauth';
import validatorCmn from '../../mixin/validator/cmn';

export default {
  mixins: [validatorCmn],
  created() {
    this.$_domain_loadOrg().catch(err => logger.error(err));
  },
  data() {
    return {
      basic: this.$store.state.basic,
      org: this.$store.state.org,
      action: this.$store.state.action,
      pwd: '',
      email: '',
      args: {
        title: 'Get started with Leeft',
      },
      validate: {
        password: {
          rules: {
            required: true,
          },
        },
      },
    };
  },
  methods: {
    social() {
      this.socialReg().catch(err => logger.error(err));
    },
    setPwd() {
      this.setValidPwd().catch(err => logger.error(err));
    },
    async socialReg() {
      this.successActivate(await this.authActivate());
    },
    async setValidPwd() {
      if (await this.$_vldtCmn_validateAll()) {
        this.successActivate(await this.emailActivate());
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
    async authActivate() {
      const params = {
        req: {
          m: apiId.usr.login,
          aid: `${this.basic.svc}_OAuth2`,
          oid: this.org.oid,
          uid: this.action.uid,
          param1: this.basic.access,
          param2: '',
          code: this.action.code,
        },
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      return res;
    },
    async emailActivate() {
      const params = {
        req: {
          m: apiId.usr.activateAccount,
          // aid: 'email',
          oid: this.org.oid,
          // uid: this.action.uid,
          code: this.action.code,
          passwd: this.pwd,
        },
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      return res;
    },
    successActivate(res) {
      this.pwd = '';
      // logger.info(res);
      // this.basic.auth=res.data.auth;
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
      if (this.action.type) {
        this.$router.push(urlId.action);
      } else {
        this.$router.push(urlId.tickets);
      }
    },
  },
  components: {
    titleVue,
    oauthVue,
  },
};
</script>
