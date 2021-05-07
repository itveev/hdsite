/**
 * Created by lucky on 20.04.16.
 */

import { pretty } from 'js-object-pretty-print';

export default class {
  constructor(logger) {
    this.logger = logger;
  }

  static isClient() {
    const side = process && process.env && process.env.SIDE;
    return side === 'client';
  }

  static getReport(orig) {
    let obj = orig;
    if (!obj) {
      obj = {};
    }
    const report = {
      message: (obj && obj.message) || (obj.err && obj.err.message) || 'No msg',
      info: (obj && obj.info) || 'No info',
      stack: (obj && obj.stack) || (obj.err && obj.err.stack) || 'No stack',
    };
    if (obj.str) {
      report.str = obj.str;
    } else {
      let str = '';
      try {
        str += pretty(obj);
      } catch (e) {
        str += `can't print object, ${e.message}, ${e.stack}`;
      }
      report.str = str;
    }
    return report;
  }

  log(lvl, obj) {
    if (obj.logged) {
      return;
    }
    if (obj.controlled) {
      if (this.logger.isDev()) {
        // eslint-disable-next-line no-console
        console.log(obj);
        obj.logged = true;
      }
      return;
    }
    const report = this.constructor.getReport(obj);
    const msg = {
      lvl,
      reporter: obj.reporter || this.constructor.isClient() ? 'client' : 'server',
      info: report.info,
      message: report.message,
      str: report.str,
      stack: report.stack,
      obj,
    };
    this.logger.log(msg);
    if (obj instanceof Object) {
      obj.logged = true;
    }
  }

  info(obj) {
    this.log('info', obj);
  }

  warn(obj) {
    this.log('warn', obj);
  }

  error(obj) {
    this.log('error', obj);
  }
}
