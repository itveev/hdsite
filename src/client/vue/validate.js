/**
 * Created by root on 06.06.17.
 */

// const dict = {
//  en: {
//    messages: {
//      alpha: field => `${field}.alpha`,
//      required: field => `${field}.required`,
//      alpha_dash: field => `${field}.alpha_dash`,
//    },
//  },
// };

export default {
  errorBagName: 'veeErrors', // change if property conflicts.
  fieldsBagName: 'veeFields',
  delay: 0,
  locale: 'en',
  // dictionary: dict,
  dictionary: null,
  fastExit: true,
  i18n: null,
  i18nRootKey: 'validations',
  enableAutoClasses: false,
  classes: false, // turn off automatic classes below
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty', // control has been interacted with
  },
  events: 'blur',
  inject: true,
};
