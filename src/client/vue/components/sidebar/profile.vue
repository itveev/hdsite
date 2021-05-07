<i18n>
  {
    "en": {
      "list" :{ "profile": "Gooose" }
    },
    "ru": {
      "list" :{ "profile": "Гусь!"}
    }
  }
</i18n>

<template lang="pug">
list-vue(v-if="gts[str.basicIsCurPage](urls.profile)" v-bind:args="listArgs" )
</template>

<script>

import storeId from '@/str/store';
import { internal as urlId } from '@/str/url';
import listVue from './list';

export default {
  //    i18n:{
  //      messages:{
  //        "en": {
  //          "list" :{ "profile": "Gooose" }
  //        },
  //        "ru": {
  //          "list" :{ "profile": "Гусь!"}
  //        }
  //      },
  //    },
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      urls: urlId,
      listArgs: {
        title: 'profile',
        //          title:this.$t('list.profile'),
        active: item => item.path === this.$store.state.basic.page,
        items: [{
          path: urlId.profile,
          text: 'Profile',
        }, {
          path: urlId.activity,
          text: 'Activity',
        }],
      },
    };
  },
  components: {
    listVue,
  },
};
</script>
