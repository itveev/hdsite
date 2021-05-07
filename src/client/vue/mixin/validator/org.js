/**
 * Created by fox on 15.06.17.
 */

// import logger from '@/log/client';
import sid from '@/str/id';
import storeId from '@/str/store';
import ppid from '@/str/ptcl/prop';
import { internal as urlId } from '@/str/url';
import cmn from './cmn';

const msgFree = `We haven’t found this company. <a href="${urlId.signup}">Create it</a> for free.`;
const msgExist = 'Organization is already exists.';
const msgBusy = 'Server is busy. Try again later.';
const resObj = {
  valid: false,
  data: {
    msg: '',
  },
};

export default {
  mixins: [cmn],
  methods: {
    $_vldtOrg_createExist() {
      this.$validator.extend('exist', {
        getMessage: (field, params, data) => this.validatorGetMsg(field, params, data),
        validate: async (value) => {
          if (!value) {
            return true;
          }
          const result = await this.validatorValidate(value, (res) => {
            if (res.data.status === ppid.status.org.free) {
              resObj.valid = false;
              resObj.data.msg = msgFree;
            } else {
              resObj.valid = true;
            }
            return resObj;
          });
          return result;
        },
      });
    },
    $_vldtOrg_createNotExist() {
      this.$validator.extend('not_exist', {
        getMessage: (field, params, data) => this.validatorGetMsg(field, params, data),
        validate: async (value) => {
          if (!value) {
            return true;
          }
          const result = await this.validatorValidate(value, (res) => {
            if (res.data.status !== ppid.status.org.free) {
              resObj.valid = false;
              resObj.data.msg = msgExist;
            } else {
              resObj.valid = true;
            }
            return resObj;
          });
          return result;
        },
      });
    },
    validatorGetMsg(field, params, data) {
      if (data && data.err) {
        // logger.error(data.err);
      }
      return (data && data.msg) || 'Something went wrong';
    },
    async validatorValidate(value, resolve) {
      this.$store.commit({
        type: storeId.mutation.basicChange,
        prop: sid.checking,
        val: true,
      });
      const res = await this.$_hd.ctrl.vldt.domainExist(value);
      this.$store.commit({
        type: storeId.mutation.basicChange,
        prop: sid.checking,
        val: false,
      });
      if (res.err) {
        resObj.data.msg = msgBusy;
        resObj.data.err = res;
        return resObj;
      }
      return resolve(res);
    },
  },
};
