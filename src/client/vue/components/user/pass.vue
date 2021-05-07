<template lang="pug">
form.form(v-on:submit.prevent="changePass")
  ul.controls-list
    li
      label(for="old-pass" v-text="'Old password'")
      input.input-small#old-pass(
        v-validate.immediate="validate.oldPass"
        type="password"
        v-bind:class="$_vldtCmn_classObj('oldPass')"
        name="oldPass"
        v-model="oldPass"
        v-on:focus="$_vldtCmn_focused('oldPass')"
        v-on:blur="$_vldtCmn_blured"
        v-on:keyup.enter="$_vldtCmn_fieldEnter('fresh-pass')")
      p.input-error(v-show="$_vldtCmn_show('oldPass')"
        v-text="veeErrors.first('oldPass')")
    li
      label(for="fresh-pass" v-text="'New password'")
      input.input-small#fresh-pass(
        v-validate.immediate="validate.freshPass"
        type="password"
        v-on:focus="$_vldtCmn_focused('freshPass')"
        v-on:blur="$_vldtCmn_blured"
        v-bind:class="$_vldtCmn_classObj('freshPass')"
        name="freshPass"
        v-model="freshPass"
        v-on:keyup.enter="changePass")
      p.input-error(v-show="$_vldtCmn_show('freshPass')"
        v-text="veeErrors.first('freshPass')")
    li
      a.btn.btn-wide(v-on:click.prevent="changePass") Change password
</template>

<script lang="babel" type="text/babel">
import { external } from '@/str/url';
import eid from '@/str/ptcl/error';
import apiId from '@/str/api';
import logger from '@/log/client';
import validatorCmn from '../../mixin/validator/cmn';

export default {
  mixins: [validatorCmn],
  data() {
    return {
      oldPass: '',
      freshPass: '',
      validate: {
        oldPass: {
          rules: {
            required: true,
          },
        },
        freshPass: {
          rules: {
            required: true,
          },
        },
      },
    };
  },
  methods: {
    changePass() {
      this.changeValidPas().catch(err => logger.error(err));
    },
    async changeValidPas() {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          url: external.usrSvc,
          req: {
            m: apiId.usr.changePassword,
            old_passwd: this.oldPass,
            new_passwd: this.freshPass,
          },
        };
        const res = await this.$_hd.ctrl.request.getDataVR(params);
        this.oldPass = '';
        this.freshPass = '';
        if (res.ok) {
          this.$_hd.ctrl.error.notify(eid.spec.wChangePass);
        }
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
  },
};
</script>
