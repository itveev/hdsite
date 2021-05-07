<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-4
      form.form
        ul.controls-list
          li
            label(for="email") Email address
              span.text-danger  *
            input#email(
              v-focus="true"
              v-validate.immediate="validate.email"
              v-model="email"
              v-bind:class="$_vldtCmn_classObj('email')"
              name="email"
              type="text"
              v-on:focus="$_vldtCmn_focused('email')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('subject')"
            )
            p.input-error(v-show="$_vldtCmn_show('email')"
              v-text="veeErrors.first('email')")
          li
            label(for="subject") Subject
            input#subject(
              v-model="subject"
              name="subject"
              type="text"
              v-on:keyup.enter="$_vldtCmn_fieldEnter('message')"
            )
          li
            label(for="message") Message
              span.text-danger  *
            textarea.no-resize#message(
              rows="7"
              v-validate.immediate="validate.message"
              v-model="message"
              v-bind:class="$_vldtCmn_classObj('message')"
              name="message"
              type="text"
              v-on:focus="$_vldtCmn_focused('message')"
              v-on:blur="$_vldtCmn_blured"
              v-on:keyup.enter.ctrl="sendMsg"
            )
            p.input-error(v-show="$_vldtCmn_show('message')"
              v-text="veeErrors.first('message')")
          li.controls-left
            input#create_user(type="checkbox" v-model="checked")
            label(for="create_user") Create an account for me
          li.controls-centered
            a.btn(v-on:click.prevent="sendMsg") Submit
      p.text-small
        span.text-danger *
        |  &ndash; Required fields
</template>

<script>
import apiId from '@/str/api';
// import { external } from '@/str/url';
import logger from '@/log/client';
import titleVue from './title';
import validatorCmn from '../../mixin/validator/cmn';

export default {
  mixins: [validatorCmn],
  data() {
    return {
      args: {
        title: 'Submit a ticket',
      },
      // btnId: 'send_btn',
      validate: {
        email: {
          rules: {
            required: true,
            email: true,
          },
        },
        message: {
          rules: {
            required: true,
          },
        },
      },
      email: '',
      message: '',
      subject: '',
      checked: true,
    };
  },
  methods: {
    sendMsg() {
      this.sendValidMsg().catch(err => logger.error(err));
    },
    async sendValidMsg() {
      if (await this.$_vldtCmn_validateAll()) {
        const params = {
          req: {
            m: apiId.msg.addNewTextMessage,
            oid: this.$store.state.org.oid,
            email: this.email,
            text: this.message,
            caption: this.subject || 'Untitled',
          },
          // url: external.usrSvc,
        };
        const res = await this.$_hd.ctrl.request.getDataVR(params);
        if (!res.ok) {
          return;
        }
        this.subject = '';
        this.message = '';
        this.email = '';
        this.$_vldtCmn_setPristine(this.validate);
        // TODO: Waiting for server flag(create account). After
        // res need to be processed
      } else {
        // validation failed
        this.$_vldtCmn_setDirty(this.validate);
      }
    },
  },
  components: {
    titleVue,
  },
};
</script>
