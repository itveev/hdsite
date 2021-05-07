<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-3
      form.form(v-on:submit.prevent="updPwd")
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
              v-on:keyup.enter="updPwd")
            p.input-error(v-show="$_vldtCmn_show('password')"
              v-text="veeErrors.first('password')")
          li
            a.btn.btn-wide(v-on:click.prevent="updPwd") Update password
</template>

<script lang="babel" type="text/babel">
import sid from '@/str/id';
import storeId from '@/str/store';
import apiId from '@/str/api';
import { internal as urlId } from '@/str/url';
import logger from '@/log/client';
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
        password: {
          rules: {
            required: true,
          },
        },
      },
    };
  },
  methods: {
    updPwd() {
      this.updValidPwd().catch(err => logger.error(err));
    },
    async updValidPwd() {
      if (await this.$_vldtCmn_validateAll()) {
        const res = await this.confirmPwd();
        this.pwd = '';
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
        this.$router.push(urlId.tickets);
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
    async confirmPwd() {
      const params = {
        req: {
          m: apiId.usr.confirmUserAction,
          code: this.$store.state.action.code,
          oid: this.org.oid,
          param1: this.pwd,
        },
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      return res;
    },
  },
  components: {
    titleVue,
  },
};
</script>
