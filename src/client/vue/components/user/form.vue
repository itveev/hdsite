<!--<i18n>-->
  <!--{-->
    <!--"en": {-->
      <!--"personal":{-->
        <!--"header": "Personal info",-->
        <!--"display":"Full name",-->
        <!--"nick":"User name",-->
        <!--"role":"Role",-->
        <!--"sign":"Signature"-->
      <!--},-->
      <!--"contact":{-->
        <!--"header":"Contact info",-->
        <!--"email":"Email address",-->
        <!--"wphone":"Work phone",-->
        <!--"pphone":"Personal phone"-->
      <!--},-->
      <!--"other":{-->
        <!--"header":"Other info",-->
        <!--"lang":"Language",-->
        <!--"tzone":"Time zone"-->
      <!--}-->
    <!--},-->
    <!--"ru": {-->
      <!--"personal":{-->
        <!--"header": "Личная информация",-->
        <!--"display":"Полное имя",-->
        <!--"nick":"Ник",-->
        <!--"role":"Роль",-->
        <!--"sign":"Подпись"-->
      <!--},-->
      <!--"contact":{-->
        <!--"header":"Контактная информация",-->
        <!--"email":"Электронный адрес",-->
        <!--"wphone":"Рабочий телефон",-->
        <!--"pphone":"Личный телефон"-->
      <!--},-->
      <!--"other":{-->
        <!--"header":"Другая информация",-->
        <!--"lang":"Язык",-->
        <!--"tzone":"Часовой пояс"-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</i18n>-->
<template lang="pug">
.col-4
  h5.caption(v-text="$t('personal.header')")
  form.form
    ul.controls-list
      li
        label(
          for="display"
          v-text="$t('personal.display')")
        input.input-small#display(
          v-focus="true"
          type="text"
          v-validate.immediate="validate.display"
          v-bind:value="profile.display"
          v-bind:class="$_vldtCmn_classObj('display')"
          name="display"
          v-on:focus="$_vldtCmn_focused('display')"
          v-on:blur="$_vldtCmn_blured"
          v-on:keyup.enter="$_vldtCmn_fieldEnter('nick')"
          v-on:change="sync('display')"
          v-on:input="commit('display',$event)")
        p.input-error(v-show="$_vldtCmn_show('display')"
          v-text="veeErrors.first('display')")
      li
        label(for="nick"
          v-text="$t('personal.nick')")
        input.input-small#nick(type="text"
          v-bind:value="profile.nick"
          v-validate.immediate="validate.nick"
          v-bind:class="$_vldtCmn_classObj('nick')"
          name="nick"
          v-on:focus="$_vldtCmn_focused('nick')"
          v-on:blur="$_vldtCmn_blured"
          v-on:keyup.enter="$_vldtCmn_fieldEnter('sign')"
          v-on:input="commit('nick',$event)"
          v-on:change="sync('nick')")
        p.input-error(v-show="$_vldtCmn_show('nick')"
          v-text="veeErrors.first('nick')")
      li
        label(for="role"
          v-text="$t('personal.role')")
        input.input-small#role(disabled="true"
          type="text"
          v-bind:value="profile.role")
      li
        label(for="sign"
          v-text="$t('personal.sign')")
        textarea.input-small.no-resize#sign(
          v-bind:value="profile.sign"
          v-validate.immediate="validate.sign"
          v-bind:class="$_vldtCmn_classObj('sign')"
          name="sign"
          v-on:focus="$_vldtCmn_focused('sign')"
          v-on:blur="$_vldtCmn_blured"
          v-on:keyup.enter.ctrl="$_vldtCmn_fieldEnter('wphone')"
          v-on:input="commit('sign',$event)"
          v-on:change="sync('sign')")
        p.input-error(v-show="$_vldtCmn_show('sign')"
          v-text="veeErrors.first('sign')")
  h5.caption(v-text="$t('contact.header')") Contact info
  form.form
    ul.controls-list
      li
        label(for="email"
          v-text="$t('contact.email')")
        input.input-small#email(disabled="true"
          type="text"
          v-bind:value="profile.email")
      li
        label(for="wphone"
          v-text="$t('contact.wphone')")
        input.input-small#wphone(type="text"
          v-validate.immediate="validate.phone"
          v-bind:class="$_vldtCmn_classObj('wphone')"
          name="wphone"
          v-on:focus="$_vldtCmn_focused('wphone')"
          v-on:blur="$_vldtCmn_blured"
          v-on:keyup.enter="$_vldtCmn_fieldEnter('pphone')"
          v-bind:value="profile.wphone"
          v-on:input="commit('wphone',$event)"
          v-on:change="sync('wphone')")
        p.input-error(v-show="$_vldtCmn_show('wphone')"
          v-text="veeErrors.first('wphone')")
      li
        label(for="pphone"
          v-text="$t('contact.pphone')")
        input.input-small#pphone(type="text"
          v-validate.immediate="validate.phone"
          v-bind:class="$_vldtCmn_classObj('pphone')"
          name="pphone"
          v-on:focus="$_vldtCmn_focused('pphone')"
          v-on:blur="$_vldtCmn_blured"
          v-bind:value="profile.pphone"
          v-on:input="commit('pphone',$event)"
          v-on:change="sync('pphone')")
        p.input-error(v-show="$_vldtCmn_show('pphone')"
          v-text="veeErrors.first('pphone')")
  h5.caption(v-text="$t('other.header')")
  form.form.margin-btm
    ul.controls-list
      li
        label(for="lang"
          v-text="$t('other.lang')")
        select.input-small#lang(v-model="basic.locale" )
          option(v-for="option in langs.codes"
            v-bind:value="option.locale"
            v-text="option.value")
      li
        label(for="tz"
          v-text="$t('other.tzone')")
        select.input-small#tz(v-model="zones[8].locale" )
          option(v-for="option in zones"
            v-bind:value="option.locale"
            v-text="option.value")
  a.plain.block(href="#"
    v-on:click.prevent="isChangePass = !isChangePass") Change password
  pass-vue(v-show="isChangePass")
  a.plain.block(href="#"
    v-if="gts[str.profileIsAgent]"
    v-on:click.prevent="") Reset password
  a.plain.block(href="#"
    v-if="gts[str.profileIsAgent]"
    v-on:click.prevent="") Disable user
  a.plain.block.text-danger(href="#"
    v-if="gts[str.profileIsAgent]"
    v-on:click.prevent="") Delete user
  //
    a.plain(href="#"
      v-on:click.prevent="changeLocale") Change locale
</template>

<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import ppid from '@/str/ptcl/prop';
import apiId from '@/str/api';
import logger from '@/log/client';
import { external } from '@/str/url';
// import cardVue from './card';
import passVue from './pass';
import langs from '../../localization/langs';
import validatorCmn from '../../mixin/validator/cmn';

const zones = [];
for (let i = 0; i < 12; i += 1) {
  zones[i] = { value: `GMT${(i - 12)}`, locale: i };
}
for (let i = 13; i < 25; i += 1) {
  zones[i] = { value: `GMT+${(i - 12)}`, locale: i };
}
zones[12] = { value: 'GMT', locale: 12 };

export default {
  mixins: [validatorCmn],
  created() {
  },
  data() {
    return {
      isChangePass: false,
      gts: this.$store.getters,
      str: storeId.getters,
      basic: this.$store.state.basic,
      profile: this.$store.state.profile,
      oldPass: '',
      freshPass: '',
      validate: {
        display: {
          alpha_spaces: true,
          max: 50,
        },
        nick: {
          alpha_dash: true,
          max: 30,
        },
        sign: {
          max: 100,
        },
        phone: {
          regex: /^\+?\d+[\s-\d]+\d+$/,
          max: 25,
        },
      },
      langs,
      zones,
    };
  },
  methods: {
    changeLocale() {
      //        console.log(this);
      //        console.log(this.$i18n);
      //        console.log(this.$t);
      //        console.log(this.$i18n.t);
      this.$i18n.locale = 'ru';
    },
    commit(key, evt) {
      this.$store.commit({
        type: storeId.mutation.profileChange,
        prop: key,
        val: evt.target.value,
      });
    },
    sync(key) {
      if (this.profile[key]) {
        this.$store.commit({
          type: storeId.mutation.profileChange,
          prop: key,
          val: this.profile[key].trim(),
        });
      }
      this.syncValid(key).catch(err => logger.error(err));
    },
    async syncValid(key) {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.usr.setProfile,
          },
          url: external.usrSvc,
        };
        params.req[ppid.user[key]] = this.profile[key];
        await this.$_hd.ctrl.request.getDataVR(params);
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
  },
  computed: {
  },
  components: {
    passVue,
  },
};
</script>
