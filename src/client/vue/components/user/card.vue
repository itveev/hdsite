<template lang="pug">
.col-2.col-skip-1
  .panel.margin-top.user-card
    avatar-vue(v-bind:args="avaArgs" v-on:click.native="attach")
      .change-photo(v-if="args.isOwn") Change photo
    input#input-photo-user(v-show="false"
      type="file"
      name="photo"
      v-validate.immediate="validate.photo"
      v-on:change="change"
      accept="image/jpeg,image/png")
    p.input-error(
      v-show="$_vldtCmn_show('photo')"
      v-text="veeErrors.first('photo')")
    h5(v-text="profile.display")
    span.text-disabled(v-text="nick")
</template>

<script lang="babel" type="text/babel">
import sid from '@/str/id';
import apiId from '@/str/api';
import storeId from '@/str/store';
import logger from '@/log/client';
import { external } from '@/str/url';
import avatarVue from '../common/avatar';
import validatorCmn from '../../mixin/validator/cmn';

export default {
  mixins: [validatorCmn],
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        isOwn: false,
        profile: {},
      }),
    },
  },
  mounted() {
    this.inputPhoto = document.getElementById('input-photo-user');
  },
  data() {
    return {
      validate: {
        photo: {
          // 6 mb
          size: 6000,
          mimes: ['image/jpeg', 'image/png'],
        },
      },
      avaArgs: {
        link: '',
        classObj: {
          'user-icon': true,
        },
        profile: this.args.profile,
      },
      profile: this.args.profile,
      percent: 0,
      inputPhoto: '',
    };
  },
  methods: {
    attach() {
      if (this.args.isOwn) {
        this.inputPhoto.click();
      }
    },
    change() {
      this.uploadPhoto().catch(err => logger.error(err));
    },
    async uploadPhoto() {
      const { state } = this.$store;
      if (await this.$_vldtCmn_validateAll()) {
        if (this.inputPhoto.files[0]) {
          const formData = new FormData();
          formData.append('file', this.inputPhoto.files[0]);
          // formData.append('file',this.inputPhoto.files[1]);
          const params = this.$_hd.ctrl.request.getParams({
            isFormData: true,
            req: {
              m: apiId.data.setData,
              formData,
              src: sid.usr,
              id: `${state.org.oid}:${this.profile.uid}`,
            },
            url: external.dataSvc,
            progress: this.progress,
          });
          const res = await this.$_hd.ctrl.request.getDataVR(params);
          if (res.ok) {
            this.$store.commit({
              type: storeId.mutation.profileChange,
              prop: sid.photo,
              val: this.$_hd.ctrl.request.constructor.userPhoto(state.profile.uid, state.org.oid),
            });
          }
        }
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
    progress(e) {
      if (e.lengthComputable) {
        this.percent = Math.round((e.loaded * 100) / e.total);
      } else {
        logger.info('Unable to compute');
        this.percent = -1;
      }
    },
  },
  computed: {
    nick() {
      return this.profile.nick ? `@${this.profile.nick}` : '';
    },
  },
  components: {
    avatarVue,
  },
};
</script>
