<template lang="pug">
list-vue(v-if="gts[str.basicIsTicket]" v-bind:args="listArgs")
  template(slot="item" slot-scope="props")
    tag-vue(v-bind:args="props.item.args")
</template>

<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import listVue from './list';
import tagVue from '../common/tag';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      listArgs: {
        title: 'tags',
        ulClass: {
          'no-highlight': true,
        },
        items: [{
          path: '#',
          args: {
            text: 'stackoverflow',
          },
        }, {
          path: '#',
          args: {
            text: 'activationfailed',
          },
        }, {
          path: '#',
          args: {
            text: 'lostlicense',
          },
        }],
      },
    };
  },
  components: {
    listVue,
    tagVue,
  },
};
</script>
