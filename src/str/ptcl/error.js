/**
 * Created by fox on 18.09.17.
 */
import sid from '../id';

const err = {
  type: 'error',
  // Token expired
  authExpired: 'err_AuthExpired',
  // Token not valid
  authFailed: 'err_AuthFailed',
  // If there is no method in request or json not parsed
  invalidFormat: 'err_InvalidFormat',
  // Request params is out of range, or protocol
  invalidData: 'err_InvalidData',
  // missing required attribute
  invalidSetAttr: 'err_InvalidSetAttributes',
  // missing required function
  invalidFunc: 'err_InvalidFunction',
  // If access not granted
  accessDenied: 'err_AccessDenied',
  // When server can't find any data
  dataNotFound: 'err_DataNotFound',

  // Login method
  // Email or pass incorrect
  emailAuthFailed: 'err_AccountEmailAuthFailed',
  // User account blocked
  accountDisabled: 'err_AccountDisabled',
  // User account deleted
  accountDeleted: 'err_AccountDeleted',
  // Email not confirmed
  notVerified: 'err_AccountNotVerified',
  // Missing oauth EMAIL
  emailRequired: 'err_AccountEmailRequired',

  // RestorePassword
  // User account not found
  accountNotFound: 'err_AccountNotFound',
};

const warn = {
  type: 'warning',
  updToken: 'warn_RefreshToken',
};

// Internal use
const spec = {
  eAuthExp: {
    code: 'eAuthExp',
    type: sid.err,
    title: 'Session expired.',
    text: 'Please login again.',
  },
  ePtcl: {
    code: 'ePtcl',
    type: sid.err,
    title: 'Incorrect request format.',
    text: 'Please try to update the page.',
  },
  eNoAccess: {
    code: 'eNoAccess',
    type: sid.err,
    title: 'Access Denied.',
    text: 'No permission to complete.',
  },
  eAuthFailed: {
    code: 'eAuthFailed',
    type: sid.err,
    title: 'No access.',
    text: 'Email or pass incorrect.',
  },
  eAccDisabled: {
    code: 'eAccDisabled',
    type: sid.err,
    title: 'Account blocked.',
    text: 'Please contact your administrator.',
  },
  eAccDel: {
    code: 'eAccDel',
    type: sid.err,
    title: 'Account deleted.',
    text: 'You can create a new.',
  },
  eNotVerified: {
    code: 'eNotVerified',
    type: sid.err,
    title: 'Email not confirmed.',
    text: 'Please check your email to verify your account.',
  },
  eOauthEmail: {
    code: 'eOauthEmail',
    type: sid.err,
    title: 'No email.',
    text: 'Please try other login method.',
  },
  eNoAcc: {
    code: 'eNoAcc',
    type: sid.err,
    title: 'Account not found.',
    text: 'Please check the entered information.',
  },
  eSrvUnvl: {
    code: 'eSrvUnvl',
    type: sid.err,
    title: 'Server is temporarily unavailable.',
    text: 'Please try again later.',
  },
  eUnknown: {
    code: 'eUnknown',
    type: sid.err,
    title: 'Unknown error.',
    text: 'Please try again later or contact us.',
  },
  eNoData: {
    code: 'eNoData',
    type: sid.err,
    title: 'Data not found.',
    text: 'Please try again later or contact us.',
  },
  wChangePass: {
    code: 'wChangePass',
    type: sid.warn,
    title: 'Password changed.',
    text: '',
  },
};
export default {
  err,
  warn,
  spec,
};
