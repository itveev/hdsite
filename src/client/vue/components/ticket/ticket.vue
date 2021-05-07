<template lang="pug">
base-vue
  template(slot="subject")
    subject-vue(v-bind:args="subjArgs")
      span.text-disabled(v-text="`#${comments.num}`")
      template(v-for="tag in tags")
      //-  https://ru.vuejs.org/v2/guide/list.html#key
      //-  component lists rendered with v-for should have explicit keys
        tag-vue(v-bind:args="tag.args")
    ul.inline.text-disabled
      li(v-text="comments.date")
      li(v-text="comments.customer")
        //- This should be hidden for customers. For others we also need to specify user email here
  template(slot="actions")
    //- This col should be hidden for customers
    actions-vue
  template(slot="reply")
    reply-vue(v-bind:args="replyArgs" v-on:refresh="refreshComment")
  template(slot="comments" v-for="item in comments.cmts")
    comment-vue(v-if="item.type===type.text" v-bind:args="item")
    //- Notes are not visible for customers
    note-vue(v-else v-bind:args="item")
//
  div
    .row.margin-btm
      .col-8
        .ticket-subject
          a.font-h4(href="#" v-text="subject")
          span.text-disabled(v-text="number")
          template(v-for="tag in tags")
            //- https://ru.vuejs.org/v2/guide/list.html#key
            //- component lists rendered with v-for should have explicit keys
            tag-vue(v-bind:args="tag.args")
        ul.inline.text-disabled
          li(v-text="date")
          li(v-text="comments.customer")
            //- This should be hidden for customers.
              For others we also need to specify user email here
      .col-8.text-right
        //- This col should be hidden for customers
        actions-vue
    .ticket
      reply-vue(v-on:refresh="refreshComment")
      template(v-for="item in items")
        comment-vue(v-if="item.type===1" v-bind:comment="item")
        //- Notes are not visible for customers
        note-vue(v-else v-bind:note="item" )
</template>

<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import logger from '@/log/client';
import ppid from '@/str/ptcl/prop';
import baseVue from './base';
import actionsVue from '../common/actions';
import replyVue from './reply';
import commentVue from './comment';
import noteVue from './note';
import tagVue from '../common/tag';
import subjectVue from './subject';

export default {
  created() {
    this.refreshComment();
  },
  data() {
    return {
      type: ppid.type,
      comments: this.$store.state.comments,
      replyArgs: {
        state: this.$store.state.comments,
        placeHolder: 'Enter your reply here',
        btnText: 'Post as reply',
        isCreate: false,
      },
      subjArgs: {
        reserveText: 'No subject',
        state: this.$store.state.comments,
        classObj: {
          'new-subject': false,
        },
      },
      tags: [{
        args: {
          text: 'lostlicense',
        },
      }, {
        args: {
          text: 'invoice',
        },
      }],
      items: [],
    };
  },
  methods: {
    refreshComment() {
      this.$store.dispatch({
        type: storeId.actions.commentsUpdCmts,
        vueObj: this,
      }).catch(err => logger.error(err));
    },
  },
  components: {
    actionsVue,
    replyVue,
    commentVue,
    noteVue,
    tagVue,
    baseVue,
    subjectVue,
  },
};
</script>
