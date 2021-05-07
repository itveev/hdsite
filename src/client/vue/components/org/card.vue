<template lang="pug">
.col-2.col-skip-1
  .panel.margin-top.user-card
    avatar-vue(v-bind:args="avaArgs" v-on:click.native="attach")
      .change-photo Change picture
    input#input-photo-org(v-show="false"
      type="file"
      name="file"
      v-on:change="change"
      accept="image/:,image+/jpeg")
    h5(v-text="org.name")
</template>

<script>
import sid from '@/str/id';
import storeId from '@/str/store';
import logger from '@/log/client';
import avatarVue from '../common/avatar';

export default {
  mounted() {
    this.inputPhoto = document.getElementById('input-photo-org');
  },
  data() {
    return {
      avaArgs: {
        link: '',
        classObj: {
          'user-icon': true,
          'org-icon': true,
        },
        profile: this.$store.state.org,
      },
      org: this.$store.state.org,
      percent: 0,
      inputPhoto: '',
    };
  },
  methods: {
    attach() {
      this.inputPhoto.click();
    },
    change() {
      if (this.inputPhoto.files[0]) {
        this.changePic().catch(err => logger.error(err));
      }
    },
    async changePic() {
      const formData = new FormData();
      formData.append('file', this.inputPhoto.files[0]);
      const params = this.$_hd.ctrl.request.getParams({
        isFormData: true,
        req: {
          formData,
        },
        progress: this.progress,
      });
      await this.$_hd.ctrl.request
        .getData(this.$_hd.svc.org.setPicture(params));
      this.$store.commit({
        type: storeId.mutation.orgChange,
        prop: sid.photo,
        val: this.$_hd.ctrl.request.constructor
          .orgPhoto(this.$store.state.org.oid),
      });
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
  components: {
    avatarVue,
  },
};
</script>
