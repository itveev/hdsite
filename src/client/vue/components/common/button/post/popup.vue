<template lang="pug">
button-vue(v-bind:args="btnArgs")
  template(slot="list")
    list-vue(v-bind:args="listArgs")
</template>
<script lang="babel" type="text/babel">
import sid from '@/str/id';
import buttonVue from '../button';
import listVue from '../list';

export default {
  props: {
    args: {
      type: Object,
      required: true,
      default: () => ({
        btnClick: () => {},
        listClick: () => {},
        btnText: '',
      }),
    },
  },
  data() {
    // let btnText = this.args.btnName;
    return {
      btnArgs: {
        btnName: this.args.btnText || 'button.post.customerPost',
        btnClick: this.args.btnClick,
        classObj: {
          'btn-small': true,
          'btn-select': true,
          'btn-menu': true,
          'pull-right': true,
        },
      },
      listArgs: {
        callback: this.args.listClick,
        items: [{
          text: 'Post as note',
          state: sid.note,
        }, {
          text: 'Post as reply',
          state: sid.reply,
          //          },{
          //            text:'Save as macro',
          //            state:'macro'
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
