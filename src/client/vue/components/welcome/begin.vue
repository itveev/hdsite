<template lang="pug">
.main
  h2.text-center.text-disabled.margin-btm-lg Welcome to your helpdesk
  h4 Here's what you can start with:
  .row.margin-top
    .col-8
      offer-vue(v-bind:args="projPanel.offer")
        button-vue(v-bind:args="projPanel.btn")
      offer-vue(v-bind:args="teamPanel.offer")
        button-vue(v-bind:args="teamPanel.btn")
    .col-8
      offer-vue(v-bind:args="settingsPanel.offer")
        button-vue(v-bind:args="settingsPanel.btn")
      offer-vue(v-bind:args="yourPanel.offer")
        button-vue(v-bind:args="yourPanel.btn")
</template>

<script lang="babel" type="text/babel">
import { internal } from '@/str/url';
import offerVue from './offer';
import buttonVue from '../common/button/button';
// import actionsVue from './common/actions';
// import logger from '../../../log/client';
// import { internal as urlId } from '@/str/url';

export default {
  data() {
    return {
      projPanel: {
        offer: {
          panelClass: {},
          title: '1. Create your first project',
          text: `In contemporary business and science a project 
            is a collaborative enterprise, involving research or design, 
            that is carefully planned to achieve a particular aim.`,
        },
        btn: {
          btnName: 'Create project',
          classObj: {
            'margin-top': true,
          },
          styleObj: {},
          btnClick: () => {},
        },
      },
      teamPanel: {
        offer: {
          panelClass: {
            'margin-top': true,
          },
          title: '2. Build a team',
          text: `A team is a group of people or other animals 
            linked in a common purpose. Human teams are especially 
            appropriate for conducting tasks that are high in complexity 
            and have many interdependent subtasks.`,
        },
        btn: {
          btnName: 'Create group',
          classObj: {
            'margin-top': true,
          },
          styleObj: {},
          btnClick: () => {},
        },
      },
      settingsPanel: {
        offer: {
          panelClass: {},
          title: '3. Configure helpdesk',
          text: `In contemporary business and science a project 
            is a collaborative enterprise, involving research or design, 
            that is carefully planned to achieve a particular aim.`,
        },
        btn: {
          btnName: 'Go to settings',
          classObj: {
            'margin-top': true,
          },
          styleObj: {},
          btnClick: () => {
            this.$router.push(internal.settings);
          },
        },
      },
      yourPanel: {
        offer: {
          panelClass: {
            'margin-top': true,
          },
          title: '4. Any idea, Leonid?',
          text: 'I`m a bird Motherfucker',
        },
        btn: {
          btnName: 'THIS IS BUTTON!',
          classObj: {
            'margin-top': true,
          },
          styleObj: {},
          btnClick: () => {
            // alert('surprise mthfckr');
          },
        },
      },
      // kbOffer: {
      //   panelClass: {
      //     'margin-top': true,
      //   },
      //   title: '1. Create your first project',
      //   text: `In contemporary business and science a project
      //     is a collaborative enterprise, involving research or design,
      //     that is carefully planned to achieve a particular aim.`,
      // },
    };
  },
  components: {
    offerVue,
    buttonVue,
  },
  computed: {
  },
  methods: {
  },
};
</script>
