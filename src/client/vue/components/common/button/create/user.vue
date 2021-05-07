<template lang="pug">
.popup
  form-vue(v-bind:args="formArgs" )
</template>

<script lang="babel" type="text/babel">

import formVue from '../form';

export default {
  data() {
    return {
      formArgs: {
        items: [{
          id: 'fullname',
          text: 'button.create.fullName',
          model: '',
        }, {
          id: 'emailBtn',
          text: 'button.create.email',
          model: '',
        }],
        submitText: 'button.create.createUser',
        submit(/* items */) {
        },
      },
    };
  },
  components: {
    formVue,
  },
};

</script>
