<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-3
      form.form(v-on:submit.prevent="create")
        ul.controls-list
          li
            label(for="fullname") Full name
            input#fullname(v-focus="true"
              v-validate.immediate='validate.owner'
              v-bind:class="$_vldtCmn_classObj('owner')"
              name="owner"
              type="text"
              v-on:focus="$_vldtCmn_focused('owner')"
              v-on:blur="$_vldtCmn_blured"
              v-bind:value="org.admin"
              v-on:input="commit('admin',$event)"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('email')")
            p.input-error(v-show="$_vldtCmn_show('owner')"
              v-text="veeErrors.first('owner')")
          li
            label(for="email") Email address
            input#email(type="text"
              v-validate.immediate='validate.email'
              v-bind:class="$_vldtCmn_classObj('email')"
              name="email"
              v-on:focus="$_vldtCmn_focused('email')"
              v-on:blur="$_vldtCmn_blured"
              v-bind:value="org.email"
              v-on:input="commit('email',$event)"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('password')")
            p.input-error(v-show="$_vldtCmn_show('email')"
              v-text="veeErrors.first('email')")
          li
            label(for="password") Password
            input#password(v-validate.immediate="validate.password"
              v-bind:class="$_vldtCmn_classObj('password')"
              name="password"
              type="password"
              v-model="pwd"
              v-on:focus="$_vldtCmn_focused('password')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('company')")
            p.input-error(v-show="$_vldtCmn_show('password')"
              v-text="veeErrors.first('password')")
          li
            label(for="company") Company name
            input#company(v-validate.immediate="validate.name"
              v-bind:class="$_vldtCmn_classObj('name')"
              name="name"
              type="text"
              v-on:focus="$_vldtCmn_focused('name')"
              v-on:blur="$_vldtCmn_blured"
              v-bind:value="org.name"
              v-on:input="commit('name',$event)"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('domain')")
            p.input-error(v-show="$_vldtCmn_show('name')"
              v-text="veeErrors.first('name')")
          li
            label(for="domain") Company domain
            input#domain(v-validate.immediate="validate.domain"
              v-bind:class="$_vldtCmn_classObj('domain')"
              name="domain"
              type="text"
              maxlength="30"
              v-on:focus="$_vldtCmn_focused('domain')"
              v-on:blur="$_vldtCmn_blured"
              v-bind:value="org.domain"
              v-on:input="commit('domain',$event)"
              v-on:keyup.enter="create")
            span(v-text="spanText")
            p.input-error(v-show="$_vldtCmn_show('domain')"
              v-text="veeErrors.first('domain')")
          li
            p.text-center.text-disabled
              |I agree with the&nbsp
              router-link(v-bind:to="urls.terms") Terms
              |&nbspof service.
            a.btn.btn-wide(v-on:click.prevent="create" v-text="btnText")
  </template>

<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import logger from '@/log/client';
import { internal as urlId, landing, external } from '@/str/url';
import ppid from '@/str/ptcl/prop';
import titleVue from './title';
import hdId from '@/str/hd';
import apiId from '@/str/api';
import validatorOrg from '../../mixin/validator/org';

export default {
  mixins: [validatorOrg],
  created() {
    this.checkDomain();
    this.$_vldtOrg_createNotExist();
  },
  data() {
    return {
      spanText: `.${hdId.domainName}`,
      btnText: `Start using ${hdId.projectName}`,
      urls: landing,
      isChecking: false,
      org: this.$store.state.org.newOrg,
      pwd: '',
      args: {
        title: `Get started with ${hdId.projectName}`,
      },
      validate: {
        owner: {
          rules: {
            required: true,
          },
        },
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
        name: {
          rules: {
            required: true,
          },
        },
        domain: {
          rules: {
            required: true,
            alpha_dash: true,
            not_exist: true,
          },
        },
      },
    };
  },
  methods: {
    checkDomain() {
      const domain = this.$_hd.ctrl.vldt.constructor.getSubDomain();
      if (domain) {
        const curHost = window.location.host.replace(`${domain}.`, '');
        window.location.assign(`${
          window.location.protocol}//${
          curHost}${urlId.signup}`);
      }
    },
    commit(key, evt) {
      this.$store.commit({
        type: storeId.mutation.newOrgChange,
        prop: key,
        val: evt.target.value,
      });
    },
    create() {
      this.createOrg().catch(err => logger.error(err));
    },
    async createOrg() {
      const vueObj = this;
      Object.keys(ppid.org).forEach((p) => {
        if (vueObj.org[p]) {
          vueObj.$store.commit({
            type: storeId.mutation.newOrgChange,
            prop: p,
            val: vueObj.org[p].trim(),
          });
        }
      });
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.org.create,
            admin_name: this.org.admin,
            email: this.org.email,
            passwd: this.pwd,
            domain: this.org.domain,
            org_name: this.org.name,
          },
          url: external.orgSvc,
        };
        const res = await this.$_hd.ctrl.request.getDataVR(params);
        // TODO: Error processing
        if (!res.data) {
          // not created
        }
        this.$store.commit({
          type: storeId.mutation.orgChange,
          method: storeId.method.clearState,
        });
        this.pwd = '';
        window.location.assign(`${
          window.location.protocol}//${this.org.domain}.${
          window.location.host}${urlId.signin}`);
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
