<template lang="pug">
.main
  .row
    .col-8
      h4 Users
    .col-2
      .btn.btn-small.pull-right + Create user
  .row
    .col-10
      //
        template()
          h5.caption()
          .table.users-table()
            .t-row()
      h5.caption Administrators
      .table.users-table
        .t-row
          .t-col
            .user-icon(style="background-color: rgb(234, 53, 39);")
              span VD
          .t-col Vladimir Dyrdin
          .t-col Owner
          .t-col vova@youdesk.io
          .t-col
        .t-row
          .t-col
            .user-icon(style="background-color: rgb(234, 53, 39);")
              span VD
          .t-col Vladimir Dyrdin
          .t-col Administrator
          .t-col vova@youdesk.io
          .t-col
            .btn.btn-actions.btn-menu
              // The .popup-last class is just a fix. Delete it when replaced by JS
              .popup.popup-last
                ul.popup-menu
                  li
                    a.plain(href="#") Edit profile
                  li.delimiter
                  li
                    a.plain(href="#") Disable user
                  li
                    a.plain(href="#") Delete user
        .t-row(v-for="usr in admins")
          .t-col
            avatar-vue(v-bind:args="usr.avaArgs")
          .t-col(v-text="usr.display")
          .t-col(v-text="usr.role")
          .t-col
            |{{usr.email}}
            template(v-if="usr.status==ppid.status.user.fresh")
              span.user-unverified(title="Unverified user")
              a.resend-email(href="#" title="Resend verification email")
      h5.caption Agents
      .table.users-table
        .t-row
          .t-col
            .user-icon(style="background-color: rgb(234, 53, 39);")
              span VD
          .t-col Vladimir Dyrdin
          .t-col Owner
          .t-col vova@youdesk.io
            span.user-unverified(title="Unverified user")
            a.resend-email(href="#" title="Resend verification email")
          .t-col
            .btn.btn-actions.btn-menu
              .popup.popup-last
                ul.popup-menu
                  li
                    a.plain(href="#") Edit profile
                  li.delimiter
                    a.plain(href="#") Resend verification email
                  li.delimiter
                  li
                    a.plain(href="#") Disable user
                  li
                    a.plain(href="#") Delete user
        .t-row(v-for="usr in agents")
          .t-col
            avatar-vue(v-bind:args="usr.avaArgs")
          .t-col(v-text="usr.display")
          .t-col(v-text="usr.role")
          .t-col
            |{{usr.email}}
            template(v-if="usr.status==ppid.status.user.fresh")
              span.user-unverified(title="Unverified user")
              a.resend-email(href="#" title="Resend verification email")
      h5.caption Customers
      .table.users-table
        .t-row
          .t-col
            .user-icon(style="background-color: rgb(234, 53, 39);")
              span VD
          .t-col Vladimir Dyrdin
          .t-col Owner
          .t-col vova@youdesk.io
            span.user-unverified(title="Unverified user")
            a.resend-email(href="#" title="Resend verification email")
          .t-col
            .btn.btn-actions.btn-menu
              .popup.popup-last
                ul.popup-menu
                  li
                    a.plain(href="#") Edit profile
                  li.delimiter
                    a.plain(href="#") Merge into another customer
                  li.delimiter
                  li
                    a.plain(href="#") Disable user
                  li
                    a.plain(href="#") Delete user
      h5.caption Disabled
      .table.users-table
        .t-row.row-disabled
          .t-col
            .user-icon(style="background-color: rgb(234, 53, 39);")
              span VD
          .t-col Vladimir Dyrdin
          .t-col Owner
          .t-col vova@youdesk.io
            span.user-unverified(title="Unverified user")
            a.resend-email(href="#" title="Resend verification email")
          .t-col
            .btn.btn-actions.btn-menu
              .popup.popup-last
                ul.popup-menu
                  li
                    a.plain(href="#") Edit profile
                  li.delimiter
                  li
                    a.plain(href="#") Enable user
                  li
                    a.plain(href="#") Delete user
</template>

<script lang="babel" type="text/babel">

import ppid from '@/str/ptcl/prop';
import sid from '@/str/id';
import logger from '@/log/client';
import avatarVue from '../common/avatar';

export default {
  created() {
    this.loadAgents().catch(err => logger.error(err));
    this.loadAdmins().catch(err => logger.error(err));
  },
  data() {
    return {
      admins: [],
      agents: [],
      ppid,
    };
  },
  methods: {
    async loadAgents() {
      const ags = await this.$_hd.ctrl.user.loadUsers({
        role: ppid.role.agent,
      });
      ags.forEach((usr) => {
        const newUser = usr;
        newUser.avaArgs = this.$_hd.ctrl.ticket.createAvaArgs(usr.uid);
        this.agents.push(newUser);
      });
    },
    async loadAdmins() {
      const ads = await this.$_hd.ctrl.user.loadUsers({
        role: ppid.role.admin,
        mode: sid.inherit,
      });
      ads.forEach((usr) => {
        const newUser = usr;
        newUser.avaArgs = this.$_hd.ctrl.ticket.createAvaArgs(usr.uid);
        this.admins.push(newUser);
      });
    },
  },
  components: {
    avatarVue,
  },
};
</script>
