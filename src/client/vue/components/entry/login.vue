<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-16.text-center
      h4 Specify your company domain
  .row
    .col-3
      form.form(v-on:submit.prevent="enterOrg")
        ul.controls-list
          li
            input#domain(v-focus="true"
              v-validate.immediate="validate.domain"
              v-bind:class="$_vldtCmn_classObj('domain')"
              type="text"
              maxlength="30"
              name="domain"
              v-on:focus="$_vldtCmn_focused('domain')"
              v-on:blur="$_vldtCmn_blured"
              v-bind:value="org.domain"
              v-on:input="commit('domain',$event)"
              v-on:change="sync('domain')"
              v-on:keyup.enter="enterOrg" )
            span(v-text="spanText")
            p.input-error(v-show="$_vldtCmn_show('domain')"
              v-html="veeErrors.first('domain')")
          li.controls-centered
            a.btn(v-on:click.prevent="enterOrg" ) Continue
      p.text-center.text-disabled
        |Want to create a helpdesk?&nbsp
        router-link(v-bind:to="urls.signup") Sign up
</template>

<script lang="babel" type="text/babel">
// import sid from '@/str/id';
import storeId from '@/str/store';
import ppid from '@/str/ptcl/prop';
import logger from '@/log/client';
import { internal as urlId } from '@/str/url';
import titleVue from './title';
import vldtOrg from '../../mixin/validator/org';
import hdId from '@/str/hd';
// import apiId from '@/str/api';

export default {
  mixins: [vldtOrg],
  created() {
    this.checkDomain().catch(err => logger.error(err));
    this.$_vldtOrg_createExist();
  },
  data() {
    return {
      // stateStore,
      spanText: `.${hdId.domainName}`,
      isChecking: false,
      org: this.$store.state.org,
      args: {
        title: 'Sign in',
      },
      urls: urlId,
      validate: {
        domain: {
          rules: {
            required: true,
            alpha_dash: true,
            exist: true,
          },
        },
      },
    };
  },
  methods: {
    async checkDomain() {
      const domain = this.$_hd.ctrl.vldt.constructor.getSubDomain();
      if (!domain) {
        return;
      }
      const curHost = window.location.host.replace(`${domain}.`, '');
      if (this.$_hd.ctrl.vldt.domainValid(domain)) {
        const res = await this.$_hd.ctrl.vldt.domainExist(domain);
        if (res.data.status === ppid.status.org.free) {
          window.location.assign(`${window.location.protocol}//${
            curHost}${urlId.login}`);
        } else {
          this.$router.push(urlId.signin);
        }
      } else {
        window.location.assign(`${window.location.protocol}//${
          curHost}${urlId.login}`);
      }
    },
    commit(key, evt) {
      this.$store.commit({
        type: storeId.mutation.orgChange,
        prop: key,
        val: evt.target.value,
      });
    },
    sync(key) {
      this.$store.commit({
        type: storeId.mutation.orgChange,
        prop: key,
        val: this.org[key].trim(),
      });
    },
    enterOrg() {
      this.checkOrg().catch(err => logger.error(err));
    },
    async checkOrg() {
      if (await this.$_vldtCmn_validateAll()) {
        window.location.assign(`${window.location.protocol}//${
          this.org.domain}.${window.location.host}${urlId.signin}`);
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
