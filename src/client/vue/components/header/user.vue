<i18n>
  {
    "en": {
      "settings": "Settings",
      "profile":"View profile",
      "logOut":"Log out"
    },
    "ru": {
      "settings": "Настройки",
      "profile":"Профиль",
      "logOut":"Выход"
    }
  }
</i18n>

<template lang="pug">
.col-1
  avatar-vue(v-bind:args="avaArgs")
    .popup.popup-right
      ul.popup-menu
        template(v-for="item in items")
          li(v-if="item.isVisible" v-on:click.prevent="item.callback")
            a.plain
              strong(v-if="basic.page==item.path" v-text="$t(item.text)")
              template(v-else)
                |{{$t(item.text)}}
          li.delimiter(v-if="item.isDelimiter")
</template>

<script>
import sid from '@/str/id';
import storeId from '@/str/store';
import { internal, extra } from '@/str/url'; // landing
import colorMix from '../common/color';
import avatarVue from '../common/avatar';

export default {
  mixins: [colorMix],
  data() {
    return {
      gts: this.$store.getters,
      str: storeId.getters,
      avaArgs: {
        link: '#',
        classObj: {
          btn: true,
          'btn-icon': true,
          'btn-menu': true,
          'pull-right': true,
        },
        profile: this.$store.state.profile,
      },
      basic: this.$store.state.basic, // stateStore,
      profile: this.$store.state.profile,
      items: [{
        path: internal.profile,
        text: 'profile',
        isVisible: true,
        isDelimiter: false,
        callback: () => {
          this.$router.push(internal.profile);
        },
      }, {
        path: internal.settings,
        text: 'settings',
        isVisible: true,
        isDelimiter: true,
        callback: () => {
          this.$router.push(internal.settings);
        },
        //        }, {
        //          path:landing.help,
        //          text:'Get help',
        //          isVisible:true,
        //          isDelimiter:true
        //        }, {
        //          path:landing.changePlan,
        //          text:'Change plan',
        //          isVisible:!cmn.isRoleUser(profile),
        //          isDelimiter:!cmn.isRoleUser(profile)
      }, {
        path: extra.logOut,
        text: 'logOut',
        isVisible: true,
        isDelimiter: false,
        callback: () => {
          // stateStore.auth = null;
          this.$store.commit({
            type: storeId.mutation.basicChange,
            prop: sid.auth,
            val: null,
          });
          this.$router.push(internal.signin);
        },
      }],
    };
  },
  components: {
    avatarVue,
  },
};
</script>
