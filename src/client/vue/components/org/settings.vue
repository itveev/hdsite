<template lang="pug">
.main
  h4 Appearance
  .row
    .col-4
      h5.caption(v-text="'General'")
      form.form
        ul.controls-list
          li
            label(
              for="name"
              v-text="'Organization name'")
            input.input-small#name(
              v-focus="true"
              type="text"
              v-validate.immediate="validate.name"
              v-bind:class="$_vldtCmn_classObj('name')"
              name="name"
              v-on:focus="$_vldtCmn_focused('name')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('tz')"
              v-bind:value="org.name"
              v-on:input="commit('name',$event)"
              v-on:change="sync('name')")
            p.input-error(v-show="$_vldtCmn_show('name')"
              v-text="veeErrors.first('name')")
          li
            label(
              for="tz"
              v-text="'Time zone'")
            select.input-small#tz(
              v-on:keyup.enter="$_vldtCmn_fieldEnter('syn')"
              v-model.lazy="zones[8].locale")
              option(v-for="option in zones"
                v-bind:value="option.locale"
                v-text="option.value")
          li
            label(
              for="syn"
              v-text="'Custom helpdesk URL'")
            input.input-small#syn(
              type="text"
              v-validate.immediate="validate.syn"
              v-bind:class="$_vldtCmn_classObj('syn')"
              name="syn"
              v-on:focus="$_vldtCmn_focused('syn')"
              v-on:blur="$_vldtCmn_blured"
              v-bind:value="org.syn"
              v-on:input="commit('syn',$event)"
              v-on:change="sync('syn')")
            p.input-error(v-show="$_vldtCmn_show('syn')"
              v-text="veeErrors.first('syn')")
          li
            label(
              for="domain"
              v-text="'Domain'")
            input.input-small#domain(
              disabled="true"
              type="text"
              v-model="org.domain")
    card-vue
</template>

<script>

import storeId from '@/str/store';
import logger from '@/log/client';
import apiId from '@/str/api';
import ppid from '@/str/ptcl/prop';
import { external } from '@/str/url';
import cardVue from './card';
import validatorCmn from '../../mixin/validator/cmn';
// import testVue from './test.vue';

const zones = [];
for (let i = 0; i < 12; i += 1) {
  zones[i] = { value: `GMT${i - 12}`, locale: i };
}
for (let i = 13; i < 25; i += 1) {
  zones[i] = { value: `GMT+${i - 12}`, locale: i };
}
zones[12] = { value: 'GMT', locale: 12 };

export default {
  mixins: [validatorCmn],
  mounted() {
    this.loadOrg().catch(err => logger.error(err));
  },
  data() {
    return {
      org: this.$store.state.org,
      forms: [{
        header: 'General',
        controls: [{
          input: true,
          key: 'name',
          label: 'Organization name',
          disabled: false,
        }, {
          select: true,
          key: 'tz',
          label: 'Time zone',
          model: zones[8].locale,
          options: zones,
        }, {
          input: true,
          key: 'syn',
          label: 'Custom helpdesk URL',
          disabled: false,
        }, {
          input: true,
          key: 'domain',
          label: 'Domain',
          disabled: true,
        }],
      }],
      zones,
      validate: {
        name: {
          alpha_dash: true,
          max: 50,
        },
        syn: {
          url: true,
          require_protocol: false,
        },
      },
    };
  },
  methods: {
    async loadOrg() {
      const params = {
        req: {
          m: apiId.org.getInfo,
          domain: this.org.domain,
        },
        url: external.orgSvc,
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      this.$store.commit({
        type: storeId.mutation.orgChange,
        method: storeId.method.setDirtyState,
        state: res.data,
      });
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
      this.syncValid(key).catch(err => logger.error(err));
    },
    async syncValid(key) {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.org.setInfo,
          },
          url: external.orgSvc,
        };
        params.req[ppid.org[key]] = this.org[key];
        await this.$_hd.ctrl.request.getDataVR(params);
      } else {
        // validation failed
        // this.$_vldtCmn_setDirty(this.validate);
      }
    },
  },
  components: {
    cardVue,
    // testVue
  },
};
</script>
