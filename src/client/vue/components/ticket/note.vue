<!--<i18n src="babel-loader!./status/locale.js"></i18n>-->
<template lang="pug">
.comment.note(v-if="gts[str.profileIsAgent]")
  .comment-text
    p(v-html="$t(args.comment.lid,statusMake(args))")
    template(v-for="file in args.attachments")
      a.comment-attachment(target="_blank"
        v-bind:href="attachmentUrl(file.id)"
        rel="nofollow noopener"
        v-text="file.name" download)
  div(v-text="args.date")
</template>

<script lang="babel" type="text/babel">

import storeId from '@/str/store';
import statusMaker from './status/maker';
import statusLocale from './status/locale';

export default {
  mixins: [statusMaker],
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        comment: '',
        date: '',
        attachments: [],
        cid: '',
      }),
    },
  },
  i18n: {
    messages: statusLocale,
  },
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
    };
  },
  computed: {
  },
  methods: {
    attachmentUrl(id) {
      return this.$_hd.ctrl.request.constructor.attachment({
        aid: id,
        mid: this.$store.state.comments.mid,
        cid: this.args.cid,
      });
    },
  },
};
</script>
