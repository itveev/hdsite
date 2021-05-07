<docs>
  ## Это пример дока.
</docs>

<template lang="pug" type="pug">
.main
  title-vue(v-bind:args="args")
  .row
    .col-3
    //
      form.form
        ul.controls-list
          li
            label(v-text="textParams")
          li.controls-centered
            a.btn(v-on:click.prevent="action" v-on:keyup.enter="action") Perform

</template>

<script lang="babel" type="text/babel">
import executorMix from '@/client/vue/mixin/action/executor';
import logger from '@/log/client';
import titleVue from './title';

export default {
  mixins: [executorMix],
  created() {
    this.options = this.$route.query;
    this.$_executor_perform(this.options).catch(err => logger.error(err));
  },
  mounted() { },
  data() {
    return {
      options: null,
      args: {
        title: 'Action',
      },
      textParams: '',
      objParams: '',
    };
  },
  methods: {
    action() {
      this.$_executor_perform(this.options)
        .catch(err => logger.error(err));
    },
  },
  computed: {},
  components: {
    titleVue,
  },
};
</script>
