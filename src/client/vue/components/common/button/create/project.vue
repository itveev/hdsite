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
          id: 'project-name',
          text: 'button.create.projectName',
          model: '',
        }],
        submitText: 'button.create.createProject',
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
