<template lang="pug">
.main
  .row.margin-btm
    .col-8
      h4
        | {{$t('titles.'+tickets.filter)}}&nbsp
        //- The number of tickets should be specified in braces below
        span.text-disabled ({{tickets[tickets.filter]}})
    actions-vue
  .table(v-show="tickets.msgs.length!==0")
    .t-row.t-head
      .t-col
        input(type='checkbox' v-on:change="selectAll")
      .t-col(v-if="isDraft")
      .t-col(v-else v-on:click.prevent="sort({id:sid.fnum, way:sid.desc})")
        | {{$t('tickets.num')}}
        a.icon.icon-glyph(v-show="colSortShow(sid.fnum)"
          v-bind:class="colSortClass()") S
      .t-col
      .t-col(v-on:click.prevent="sort({id:sid.fcaption, way:sid.asc})")
        | {{$t('tickets.subject')}}
        a.icon.icon-glyph(v-show="colSortShow(sid.fcaption)"
          v-bind:class="colSortClass()") S
      .t-col
        //-TODO: Number of comments, nedd to add and sort
      .t-col(v-text="$t('tickets.owner')")
      .t-col(v-on:click.prevent="sort({id:sid.ftime, way:sid.desc})")
        | {{$t('tickets.date')}}
        a.icon.icon-glyph(v-show="colSortShow(sid.ftime)"
          v-bind:class="colSortClass()") S
      .t-col(v-if="isDraft")
      .t-col(v-else v-text="$t('tickets.agent')")
      .t-col(v-if="isDraft")
      .t-col(v-else v-text="$t('tickets.priority')")
        //-TODO: Need to add priority sort
      //-
        template(v-for="item in tickets.msgs" v-bind:key="item.mid")
    .t-row(v-for="(item,index) in tickets.msgs" v-bind:key="item.mid")
      .t-col
        input(
          type='checkbox'
          v-on:change="commit(index,$event)"
          v-bind:checked="item.checked")
      .t-col(v-if="isDraft")
      .t-col(v-else) {{`#${item.num}`}}
      .t-col
        span.icon.icon-glyph.icon-clip
      .t-col(v-on:click="setMid(item)"
        v-text="item.caption||'No subject'")
      .t-col(v-if="isDraft")
      .t-col(v-else)
        span.label.label-inverted(v-text="item.count")
      .t-col(v-text="item.customer")
      .t-col(v-text="item.date")
      .t-col(v-if="isDraft")
      .t-col(v-else v-text="item.agent")
      .t-col(v-if="isDraft")
      .t-col(v-else)
        span.label.priority(v-bind:class="item.priority" v-text="item.pname")
  h5(v-show="tickets[tickets.filter]==='0'" v-text="'There are no matching tickets.'")
</template>

<script lang="babel" type="text/babel">
import sid from '@/str/id';
import storeId from '@/str/store';
import ppid from '@/str/ptcl/prop';
import actionsVue from './common/actions';
import logger from '../../../log/client';
import { internal as urlId } from '@/str/url';

export default {
  created() {
    this.refresh();
  },
  data() {
    return {
      sid,
      tickets: this.$store.state.tickets,
      // headCols: [{
      //   sort: {
      //     id: sid.fmid,
      //     way: sid.desc,
      //   },
      // }],
    };
  },
  components: {
    actionsVue,
  },
  computed: {
    isDraft() {
      return this.tickets.filter === ppid.tickets.draft;
    },
  },
  methods: {
    colSortClass() {
      const desc = sid.desc === this.tickets.way;
      return {
        'icon-sort-desc': desc,
        'icon-sort-asc': !desc,
      };
    },
    colSortShow(sortId) {
      return sortId === this.tickets.sort;
    },
    sort(sort) {
      // commit
      let { way } = sort;
      if (sort.id === this.tickets.sort) {
        way = sid.desc === this.tickets.way ? sid.asc : sid.desc;
      }
      this.$store.dispatch({
        type: storeId.actions.ticketsUpdMsgs,
        vueObj: this,
        sort: sort.id,
        way,
      }).catch(err => logger.error(err));
    },
    selectAll(evt) {
      this.$store.commit({
        type: storeId.mutation.ticketsChange,
        prop: sid.msgs,
        func: sid.forEach,
        args: [(item) => {
          item.checked = evt.target.checked;
        }],
      });
    },
    refresh() {
      this.$store.dispatch({
        type: storeId.actions.ticketsUpdMsgs,
        vueObj: this,
      }).catch(err => logger.error(err));
    },
    setMid(item) {
      if (item.status === ppid.tickets.draft) {
        this.$store.commit({
          type: storeId.mutation.draftChange,
          method: storeId.method.clearSetDirty,
          state: item,
        });
        this.$router.push(urlId.draft);
      } else {
        this.$store.commit({
          type: storeId.mutation.commentsChange,
          method: storeId.method.clearSetDirty,
          state: item,
        });
        this.$router.push(urlId.ticket);
      }
    },
    commit(index, evt) {
      this.$store.commit({
        type: storeId.mutation.ticketsChange,
        prop: sid.msgs,
        index,
        attr: sid.checked,
        val: evt.target.checked,
      });
    },
  },
};
</script>
