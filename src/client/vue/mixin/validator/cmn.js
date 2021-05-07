/**
 * Created by fox on 16.06.17.
 */

export default {
  data() {
    return {
      $_vldtCmn_focusField: '',
    };
  },
  methods: {
    $_vldtCmn_classObj(field) {
      const isErr = this.$validator.flags[field] && this.$validator.flags[field].invalid;
      // this.$validator.errors.has(field);
      const dirty = this.$validator.flags[field] && this.$validator.flags[field].dirty;
      const focused = this.$_vldtCmn_focusField === field;
      return {
        'input-valid': !isErr && dirty && !focused,
        'input-invalid': isErr && dirty && !focused,
      };
    },
    $_vldtCmn_setDirty(obj) {
      this.$validator.errors.update();
      Object.keys(obj).forEach((key) => {
        this.$validator.flag(key, {
          dirty: true,
        });
      });
      if (document.activeElement.id) {
        document.getElementById(document.activeElement.id).blur();
      }
    },
    $_vldtCmn_setPristine(obj) {
      // this.$validator.errors.update();
      Object.keys(obj).forEach((key) => {
        this.$validator.flag(key, {
          pristine: true,
        });
      });
      if (document.activeElement.id) {
        document.getElementById(document.activeElement.id).blur();
      }
    },
    $_vldtCmn_show(field) {
      return (this.$_vldtCmn_classObj(field))['input-invalid'];
    },
    $_vldtCmn_focused(field) {
      this.$_vldtCmn_focusField = field;
    },
    $_vldtCmn_blured() {
      this.$_vldtCmn_focusField = '';
    },
    $_vldtCmn_fieldEnter(newField) {
      // this.$validator.validateAll(document.activeElement.name).then();
      this.$_vldtCmn_setDirty({ [document.activeElement.name]: '' });
      document.getElementById(newField).focus();
    },
    $_vldtCmn_validBtn(scope) {
      return !this.$store.state.basic.checking
        && !this.veeErrors.any(scope);
    },
    $_vldtCmn_reset() {
      this.$validato.reset();
    },
    async $_vldtCmn_validateAll(/* obj */) {
      let res = await this.$validator.validateAll();
      res = this.$_vldtCmn_validBtn() && res;
      return res;
    },
  },
  computed: {},
};
