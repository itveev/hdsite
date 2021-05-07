<template lang="pug">
button-vue(v-bind:args="btnArgs")
  template(slot="forms")
    .popup
      form-vue(v-bind:args="formArgs")
</template>
<script lang="babel" type="text/babel">
import buttonVue from '../button';
import formVue from '../form';

export default {
  data() {
    return {
      btnArgs: {
        btnName: 'button.tag.btnName',
        classObj: {
          'btn-small': true,
          'btn-select': true,
          'btn-menu': true,
        },
      },
      formArgs: {
        items: [{
          id: 'tags',
          text: 'button.tag.tagsText',
          model: '',
        }],
        submitText: 'button.tag.submitTag',
        submit(/* items */) {
        },
      },
    };
  },
  components: {
    buttonVue,
    formVue,
  },
};
</script>
