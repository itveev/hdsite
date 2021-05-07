/**
 * Created by fox on 23.02.17.
 */
import logger from '@/log/client';
import msg from './msg';
import ve from './verify.email';
import rp from './restore.pass';

const actions = {};
actions[msg.type] = msg;
actions[ve.type] = ve;
actions[rp.type] = rp;

export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    async $_executor_perform(options) {
      const newOptions = { ...options, vo: this };
      const actionStore = this.$store.state.action;
      if (options && options.type && actions[options.type]) {
        await actions[options.type].execute(newOptions);
      } else if (actionStore.type) {
        await actions[actionStore.type].goAhead(newOptions);
      } else {
        logger.error(options);
      }
    },
  },
};
