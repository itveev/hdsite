<template lang='pug'>
.comment
  .comment-user
    avatar-vue(v-bind:args="args.avaArgs")
  .comment-text
    h5
      span(v-text="args.name")
      //- Below in a span goes comment datetime
      span.text-disabled replied {{args.date}}
    p(v-html="args.comment")
    p.user-signature(v-html="args.sign")
    //- Listing attachments
    a.comment-attachment Test
    template(v-for="file in args.attachments")
      a.comment-attachment(target="_blank"
        v-bind:href="attachmentUrl(file.id)"
        rel="nofollow noopener"
        v-text="file.name" download)
          //- Here goes the attachment name
  .comment-actions
    //
      actions-vue

//
  div
    router-link.user-link(v-bind:to="urlId.profile" v-text="name")
    div(v-html="msg")
    a.attachment
      span.icon.clip-icon
      | "invoice.pdf"
</template>

<script lang="babel" type="text/babel">
import actionsVue from '../common/button/actions/popup';
import avatarVue from '../common/avatar';

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        avaArgs: {}, // TODO: test default value
        name: '',
        comment: '',
        date: '',
        sign: '',
        attachments: [],
        cid: '',
        photo: '',
      }),
    },
  },
  data() {
    // const { profile } = this.$store.state;
    return {
      name: 'Georgiy Belov',
      msg: this.args.comment.replace(/\n/g, '</br>'),
    };
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
  computed: {
    iconStyle() {
      return { 'background-image': `url(${this.args.photo})` };
    },
  },
  components: {
    actionsVue,
    avatarVue,
  },
};
</script>
