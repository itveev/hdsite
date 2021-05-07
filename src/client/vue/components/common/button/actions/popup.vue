<template lang="pug">
button-vue(v-bind:args="btnArgs")
  template(slot="list")
    list-vue(v-bind:args="listArgs")
</template>

<script lang="babel" type="text/babel">
import buttonVue from '../button';
import listVue from '../list';

export default {
  data() {
    return {
      btnArgs: {
        btnName: 'button.actions.btnName',
        classObj: {
          'btn-small': true,
          'btn-select': true,
          'btn-menu': true,
        },
      },
      listArgs: {
        callback(/* state */) {},
        items: [{
          text: 'Edit',
        }, {
          text: 'Delete',
        }, {
          text: 'Save as macro',
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
