<template lang="pug">
.col-1
  button-vue(v-bind:args="btnArgs" v-bind:style="btnStyle")
    template(slot="title")
      span(v-if="!profile.isPhoto" v-text="profile.abbr")
    template(slot="list")
      list-vue(v-bind:args="listArgs")
</template>
<script lang="babel" type="text/babel"l>

import storeId from '@/str/store';
import buttonVue from '../button';
import listVue from '../list';

export default {
  // extends:buttonVue,
  // mixins:[buttonVue],
  mounted() {
    this.btnArgs.styleObj = this.profile.isPhoto ? {
      'background-image': `url(${this.profile.photo})`,
    } : {
      'background-color': 'rgb(85, 178, 17)',
    };
  },
  data() {
    return {
      // btnStore:crtBtnStore,
      gts: this.$store.getters,
      str: storeId.getters,
      profile: this.$store.state.profile,
      //        isPhoto:profileStore.isPhoto,
      //        photo: profileStore.photo,
      btnArgs: {
        // btnName:'button.create.btnName',
        classObj: {
          'btn-icon': true,
          'btn-menu': true,
          'pull-right': true,
        },
        styleObj: {},
      },
      listArgs: {
        right: true,
        callback(/* state */) {
          // crtBtnStore.state = state;
        },
        items: [{
          text: 'header.user.viewProfile',
        }, {
          isDelimiter: true,
        }, {
          text: 'header.user.logOut',
        }],
      },
    };
  },
  components: {
    buttonVue,
    listVue,
  },
};
</script>
