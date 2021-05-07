/**
 * Created by lucky on 24.11.15.
 */
// Object interface for browser available storage
// Now using directly local storage and sessionStorage
// If it necessary in future need to add support through UserDataStorage
// for IE < 5, or through cookie.

export default {
  local: window.localStorage,
  session: window.sessionStorage,
};
