<template lang="pug">
.ticket-subject.form(v-bind:class="args.classObj")
  a.font-h4(v-show="!subjClicked"
    href="#"
    v-on:click.prevent="onSubjClick"
    v-text="args.state.subj || args.reserveText")
  slot
  form.form(v-on:submit.prevent="")
    ul.controls-list
      li
        input#subj(v-show="subjClicked"
          v-validate.immediate="validate.subj"
          v-bind:class="$_vldtCmn_classObj('subj')"
          name="subj"
          type="text"
          v-on:focus="$_vldtCmn_focused('subj')"
          v-on:blur="$_vldtCmn_blured"
          v-bind:value="state.subj"
          v-on:input="commit($event)"
          v-on:keyup.enter="$_vldtCmn_fieldEnter('reply')"
          v-on:change="syncSubj")
        p.input-error(
          v-show="$_vldtCmn_show('subj')"
          v-text="veeErrors.first('subj')")
</template>

<script>
import sid from '@/str/id';
import apiId from '@/str/api';
import logger from '@/log/client';
import storeId from '@/str/store';
import validatorCmn from '../../mixin/validator/cmn';

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        reserveText: '',
        classObj: {},
        state: {},
      }),
    },
  },
  mixins: [validatorCmn],
  mounted() {
  },
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      subjClicked: false,
      state: this.args.state,
      validate: {
        subj: {
          max: 50,
        },
      },
    };
  },
  methods: {
    onSubjClick() {
      if (this.gts[this.str.profileIsAgent]) {
        this.subjClicked = true;
        this.$nextTick().then(() => this.$_vldtCmn_fieldEnter(sid.subj));
      }
    },
    commit(evt) {
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.subj,
        val: evt.target.value,
      });
    },
    syncSubj() {
      if (this.state.subj) {
        this.$store.commit({
          type: this.state.changeStore,
          prop: sid.subj,
          val: this.state.subj.trim(),
        });
      }
      this.syncValidSubj().catch(err => logger.error(err));
    },
    async syncValidSubj() {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.msg.changeMessageCaption,
            mid: this.state.mid,
            caption: this.state.subj,
          },
        };
        await this.$_hd.ctrl.request.getDataVR(params);
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
  },
  components: {
  },
};
</script>
