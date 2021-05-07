<template lang="pug">
base-vue
  template(slot="subject")
    subject-vue(
      v-bind:key="draft.mid"
      v-bind:args="subjArgs")
  template(slot="reply")
    reply-vue(
      v-bind:key="draft.mid"
      v-bind:args="replyArgs"
      v-on:refresh="redirectTicket")
</template>

<script>
import sid from '@/str/id';
import storeId from '@/str/store';
import apiId from '@/str/api';
import { internal as urlId } from '@/str/url';
import logger from '@/log/client';
import replyVue from './reply';
import baseVue from './base';
import validatorCmn from '../../mixin/validator/cmn';
import subjectVue from './subject';

export default {
  mixins: [validatorCmn],
  mounted() {
    this.load().catch(err => logger.error(err));
  },
  data() {
    return {
      subjClicked: false,
      draft: this.$store.state.draft,
      replyArgs: {
        state: this.$store.state.draft,
        placeHolder: 'Describe your problem here',
        btnText: 'Create ticket',
        isCreate: true,
      },
      subjArgs: {
        reserveText: 'Enter a subject here',
        state: this.$store.state.draft,
        classObj: {
          'new-subject': !this.$store.state.draft.subj,
        },
      },
      validate: {
        subj: {
          max: 50,
        },
      },
    };
  },
  methods: {
    async load() {
      const params = {
        req: {
          m: apiId.msg.selectComments,
          mid: this.draft.mid,
        },
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      this.$store.commit({
        type: storeId.mutation.draftChange,
        method: storeId.method.setDirtyState,
        state: res.data.draft,
      });
      if (res.data.draft.attachments) {
        this.$store.commit({
          type: storeId.mutation.draftChange,
          prop: sid.attachments,
          func: sid.splice,
          args: [0, this.draft.attachments.length],
        });
        res.data.draft.attachments.forEach((cur) => {
          this.$store.commit({
            type: storeId.mutation.draftChange,
            prop: sid.attachments,
            func: sid.push,
            args: [this.$_hd.ctrl.ticket.constructor.createLoadedAttachment(cur)],
          });
        });
      }
    },
    redirectTicket() {
      this.$store.commit({
        type: storeId.mutation.commentsChange,
        method: storeId.method.setCleanState,
        state: this.draft,
      });
      this.$store.dispatch({
        type: storeId.actions.ticketsUpdCount,
        vueObj: this,
      }).catch(err => logger.error(err));
      this.$router.push(urlId.ticket);
    },
  },
  components: {
    replyVue,
    baseVue,
    subjectVue,
  },
};
</script>
