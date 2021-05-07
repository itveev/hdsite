<i18n>
  {
    "en": {
      "place": "Search helpdesk"
    },
    "ru": {
      "place": "Поиск по хелпдеску"
    }
  }
</i18n>

<template lang="pug">
.col-3.col-skip-7.text-right
  form.form.search()
    input.input-inverted(type="text" v-bind:placeholder="$t('place')")
</template>

<script>

import storeId from '@/str/store';

export default {
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
    };
  },
};
</script>
