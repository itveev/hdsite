<template lang="pug">
.col-8.text-right(v-show="isVisible")
  assign-vue(v-if="gts[str.profileIsAgent]")
  status-vue
  priority-vue(v-if="gts[str.profileIsAgent]")
  //
    tag-vue
    macro-vue
    merge-vue
    trash-vue
</template>

<script lang="babel" type="text/babel">
import storeId from '@/str/store';
import { internal as urlId } from '@/str/url';
import assignVue from './button/assign/popup';
import statusVue from './button/status/popup';
import priorityVue from './button/priority/popup';
import tagVue from './button/tag/popup';
import macroVue from './button/macro/popup';
import mergeVue from './button/merge/popup';
import trashVue from './button/trash/popup';

export default {
  data() {
    return {
      tickets: this.$store.state.tickets,
      gts: this.$store.getters,
      str: storeId.getters,
    };
  },
  components: {
    // popupVue
    assignVue,
    statusVue,
    priorityVue,
    tagVue,
    macroVue,
    mergeVue,
    trashVue,
  },
  computed: {
    isVisible() {
      return this.gts[this.str.basicIsCurPage](urlId.ticket)
        || this.tickets.msgs.some(item => item.checked);
    },
  },
};
</script>
