/**
 * Created by fox on 15.06.17.
 */
import storeId from '@/str/store';
import logger from '@/log/client';
import protocolId from '@/str/protocol';
import cmn from './cmn';

// const msgBig = 'File size cannot be greater than';
// const msgExist='Organization is already exists.';
// const msgBusy = 'Server is busy. Try again later.';
const resObj = {
  valid: false,
  data: {
    msg: '',
  },
};

export default {
  mixins: [cmn],
  methods: {
    validatorCreateExist() {
      this.$validator.extend('exist', {
        getMessage: (field, params, data) => {
          return this.validatorGetMsg(field, params, data);
        },
        validate: async (value) => {
          if (!value) {
            return true;
          }
          const res = await this.validatorValidate((value, res) => {
            if (res.data.status === protocolId.status.free) {
              resObj.valid = false;
              resObj.data.msg = msgFree;
            } else {
              resObj.valid = true;
            }
            return resObj;
          });
          return res;
        }
      });
    },
    validatorCreateNotExist() {
      this.$validator.extend('not_exist',{
        getMessage: (field, params, data) => {
          return this.validatorGetMsg(field,params,data);
        },
        validate : async (value) => {
          if (!value) {
            return true;
          }
          return await this.validatorValidate((value, res) => {
            if (res.data.status != protocolId.status.free) {
              resObj.valid = false;
              resObj.data.msg = msgExist;
            } else {
              resObj.valid = true;
            }
            return resObj;
          });
        }
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
        prop: 'checking',
        val: true,
      });
      const res = await this.$_hd.ctrl.vldt.domainExist(value);
      this.$store.commit({
        type: storeId.mutation.basicChange,
        prop: 'checking',
        val: false,
      });
      if (res.err) {
        resObj.data.msg = msgBusy;
        resObj.data.err = res;
        return resObj;
      } else {
        return resolve(res);
      }
    }
  }
}
