<template lang="pug">
button-vue(v-bind:args="btnArgs")
</template>
<script lang="babel" type="text/babel">

import buttonVue from '../button';

export default {
  data() {
    return {
      btnArgs: {
        btnName: 'button.trash.btnName',
        classObj: {
          'btn-small': true,
        },
      },
    };
  },
  components: {
    buttonVue,
  },
};
</script>
