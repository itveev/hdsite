<template lang='pug'>
.comment
  .comment-user
    avatar-vue(v-bind:args="avaArgs" )
  .comment-text.comment-reply
    form.form(v-on:submit.prevent=""
      v-on:keyup.enter.ctrl="postReply" )
      .reply-formatting
      textarea#reply(
        v-bind:placeholder="args.placeHolder"
        v-bind:value="state.comment"
        v-on:input="commit($event)"
        v-on:change="updateComment"
        name="comment"
        v-on:focus="$_vldtCmn_focused('comment')"
        v-on:blur="$_vldtCmn_blured"
        v-bind:class="$_vldtCmn_classObj('comment')"
        v-validate.immediate="validate.comment")
      p.input-error(
        v-show="$_vldtCmn_show('comment')"
        v-text="veeErrors.first('comment')")
      a.plain(href="" v-on:click.prevent="attach")
        | + Attach files
      p(v-show="isBig" v-text="bigText")
      post-vue(v-bind:args="btnArgs")
      .comment-attachment.attachment-upload
        .upload-progress.up-87
          a.upload-cancel(href="#")
        .upload-item Test
          .upload-description Uploading... 87%
      .comment-attachment.attachment-upload
        .upload-progress.up-100
          a.upload-cancel(href="#")
        .upload-item Test 2
          .upload-description Uploaded
      .comment-attachment.attachment-upload(
        v-for="(file,index) in state.attachments")
        .upload-progress(v-bind:class="[`up-${file.percent}`]")
          a.upload-cancel(href="" v-on:click.prevent="remove(index)")
        .upload-item {{file.name}}
          span.upload-description(v-text="descrText(file)")
      //
        template(v-for="(file,index) in state.attachments")
          a.comment-attachment(target="_blank"
            rel="nofollow noopener" v-text="file.name" v-on:click.prevent="remove(index)" )
          label(v-show="!file.complete" v-text="formatSize(file.size)")
          label(v-text="file.percent")
      input#reply-attachment(v-show="false"
        name="files"
        v-validate.immediate="validate.files"
        type="file"
        multiple v-on:change="changeAttachment")
      //- The popup should have these settings: button name,
        additional classes, additional popup classes, contents

      //
        The above popup button should have "Post as reply",
        "Post as note" and "Save as macro" options
        and only "Post reply" option for customers
</template>

<script lang="babel" type="text/babel">
import sid from '@/str/id';
import storeId from '@/str/store';
import apiId from '@/str/api';
import logger from '@/log/client';
// import { internal } from '@/str/url';
import postVue from '../common/button/post/popup';
import avatarVue from '../common/avatar';
import validatorCmn from '../../mixin/validator/cmn';

const leaveConfirm = (e) => {
  const msg = 'Upload is not complete. Do you want to leave?';
  e.returnValue = msg;
  return msg;
};

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        placeHolder: '',
        btnText: '',
        state: {},
      }),
    },
  },
  mixins: [validatorCmn],
  mounted() {
    this.attachment = document.getElementById('reply-attachment');
  },
  data() {
    const { state } = this.$store;
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      msgBig: 'File size cannot be greater than',
      //        msgTooMuch:'You can not attach more than',
      maxSize: 10 * 1024 * 1024, // 10mb
      avaArgs: {
        link: '#',
        classObj: {
          'user-icon': true,
        },
        profile: state.profile,
      },
      btnArgs: {
        btnText: this.args.btnText,
        btnClick: this.postReply,
        listClick: this.post,
      },
      attachment: null,
      url: this.$_hd.ctrl.request.constructor.userPhoto(state.profile.uid, state.org.oid),
      state: this.args.state,
      validate: {
        comment: {
          max: 10000,
        },
        files: {
          size: 5000,
        },
      },
      selected: [],
    };
  },
  computed: {
    valMsg() {
      //        msgBig:'File size cannot be greater than',
      //        msgTooMuch:'You can not attach more than',
      return '';
    },
    isBig() {
      return this.state.attachments.some(cur => cur.size && cur.size > this.maxSize);
    },
    bigText() {
      return `${this.msgBig} ${this.formatSize(this.maxSize, 0)}`;
    },
    isCommentExist() {
      return (this.state.comment
          && (this.state.comment.search(/\S/) !== -1))
          || this.state.attachments.length > 0;
    },
  },
  methods: {
    descrText(file) {
      return file.complete ? 'Uploaded' : `Uploading... ${file.percent}%`;
    },
    validFile(file) {
      return !file.tryUpload && file.size < this.maxSize;
    },
    formatSize(size, fixed = 2) {
      return this.$_hd.ctrl.ticket.constructor.formatSize(size, fixed);
    },
    changeAttachment() {
      if (this.attachment.files[0]) {
        this.uploadFiles().catch(err => logger.error(err));
      }
    },
    async uploadFiles() {
      window.addEventListener('beforeunload', leaveConfirm);
      const files = Array.from(this.attachment.files);
      files.forEach((cur) => {
        this.$store.commit({
          type: this.state.changeStore,
          prop: sid.attachments,
          func: sid.push,
          args: [this.$_hd.ctrl.ticket.constructor.createNewAttachment(cur)],
        });
      });
      const promisses = [];
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.attachments,
        func: sid.every,
        args: [(item, index) => {
          if (this.validFile(item)) {
            promisses.push(this.uploadFile(item, index));
            item.tryUpload = true;
          }
          return true;
        }],
      });
      await Promise.all(promisses);
      window.removeEventListener('beforeunload', leaveConfirm);
      this.attachment.value = '';
    },
    remove(index) {
      const arr = this.state.attachments;
      if (arr[index].complete) {
        this.removeReq(arr[index].aid).catch(err => logger.error(err));
      } else if (arr[index].tryUpload) {
        arr[index].uploadReq.abort();
      }
      // arr[index].canceled = true;
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.attachments,
        func: sid.take,
        args: [index, sid.canceled, true],
      });
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.attachments,
        func: sid.splice,
        args: [index, 1],
      });
    },
    async removeReq(aid) {
      const params = {
        req: {
          m: apiId.msg.removeAttachmentFromComment,
          mid: this.state.mid,
          cid: this.state.cid,
          aid,
        },
      };
      const res = await this.$_hd.ctrl.request.getDataVR(params);
      return res;
    },
    async uploadFile(item, index) {
      const formData = new FormData();
      formData.append('file', item.file);
      const params = this.$_hd.ctrl.request.getParams({
        isFormData: true,
        progress: (e) => {
          if (e.lengthComputable) {
            this.$store.commit({
              type: this.state.changeStore,
              prop: sid.attachments,
              func: sid.take,
              args: [index, sid.percent, Math.round((e.loaded * 100) / e.total)],
            });
            //              item.percent = Math.round(e.loaded*100/e.total);
          } else {
            logger.info('Unable to compute');
            this.$store.commit({
              type: this.state.changeStore,
              prop: sid.attachments,
              func: sid.take,
              args: [index, sid.percent, -1],
            });
          }
        },
        req: {
          formData,
          mid: this.state.mid,
          cid: this.state.cid,
        },
      });
      const dataObj = this.$_hd.svc.msg.addAttachmentToDraftComment(params);
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.attachments,
        func: sid.take,
        args: [index, sid.uploadReq, dataObj.xhr],
      });
      //        item.uploadReq = dataObj.xhr;
      const res = await this.$_hd.ctrl.request.getData(dataObj);
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.cid,
        val: res.data.cid,
      });
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.attachments,
        func: sid.take,
        args: [index, sid.aid, res.data.attachments[0].id],
      });
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.attachments,
        func: sid.take,
        args: [index, sid.complete, true],
      });
      //        item.aid=res.data.attachments[0].id;
      //        item.complete = true;
    },
    attach() {
      document.getElementById('reply-attachment').click();
    },
    commit(evt) {
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.comment,
        val: evt.target.value,
      });
    },
    updateComment() {
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.comment,
        val: this.state.comment.trim(),
      });
      this.updateValidComment().catch(err => logger.error(err));
    },
    async updateValidComment() {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.msg.addTextToDraftComment,
            mid: this.state.mid,
            cid: this.state.cid,
            comment: this.state.comment,
          },
        };
        const res = await this.$_hd.ctrl.request.getDataVR(params);
        this.$store.commit({
          type: this.state.changeStore,
          prop: sid.cid,
          val: res.data.cid,
        });
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
    getCmnParams(m) {
      return {
        req: {
          m,
          mid: this.state.mid,
          cid: this.state.cid,
          comment: this.state.comment,
          caption: this.state.subj,
        },
      };
    },
    updateState() {
      this.$store.commit({
        type: this.state.changeStore,
        method: storeId.method.setDirtyState,
        state: {
          comment: '',
          cid: '',
        },
      });
      this.$store.commit({
        type: this.state.changeStore,
        prop: sid.attachments,
        func: sid.splice,
        args: [0, this.state.attachments.length],
      });
      this.$emit(sid.refresh);
    },
    post(item) {
      if (item.state === sid.reply) {
        this.postReply();
      } else {
        this.postNote();
      }
    },
    postReply() {
      if (this.isCommentExist) {
        const params = this.getCmnParams(apiId.msg.submitDraftComment);
        this.$_hd.ctrl.request.getDataVR(params)
          .then(() => this.updateState())
          .catch(err => logger.error(err));
      }
    },
    postNote() {
      if (this.isCommentExist) {
        const params = this.getCmnParams(apiId.msg.submitDraftNote);
        this.$_hd.ctrl.request.getDataVR(params)
          .then(() => this.updateState())
          .catch(err => logger.error(err));
      }
    },
  },
  components: {
    postVue,
    avatarVue,
  },
};
</script>
