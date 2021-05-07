/**
 * Created by fox on 05.07.16.
 */

export default (logger) => {
  window.onerror = (msg, url, line, col, errObj) => {
    const info = `${msg} ${url} ${line} ${col}`;
    const err = errObj || new Error(info);
    err.info = info;
    logger.error(err);
    return false;
  };
};
