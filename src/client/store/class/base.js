/**
 * Created by lucky on 16.12.15.
 */

import memory from './memory';
import str from '@/str/store';
import ValCtrl from '../../vue/controller/validator';

const { method } = str;
class Base {
  constructor(id, prot) {
    if (!ValCtrl.isStr(id) || !(prot instanceof Object)) {
      throw new Error('Init args err');
    }
    this.objId = id;
    this.objProt = prot;
    // for(let p in prot){
    //  this[p] = null;
    // }
  }

  [method.takeProp](p) {
    this[`_${p}`] = memory.local.getItem(`${this.objId}_${p}`);
  }

  [method.takeProps]() {
    Object.keys(this.objProt).forEach((p) => {
      this[method.takeProp](p);
    });
  }

  [method.getProp](p) {
    return this[`_${p}`] || memory.local.getItem(`${this.objId}_${p}`);
  }

  [method.setProp](p, val) {
    if (!p) {
      return;
    }
    this[`_${p}`] = val;
    if (val === null || val === undefined) {
      memory.local.removeItem(`${this.objId}_${p}`);
    } else {
      memory.local.setItem(`${this.objId}_${p}`, val);
    }
  }

  [method.setDirtyState](newst) {
    if (!newst) {
      return;
    }
    Object.keys(this.objProt).forEach((p) => {
      // console.log(newst['abbr']);
      if (newst[this.objProt[p]] !== undefined) {
        // this.setProp(p,newst[this.objProt[p]]);
        this[p] = newst[this.objProt[p]];
      }
    });
    this[method.setComputedState]();
  }

  [method.setCleanState](newst) {
    if (!newst) {
      return;
    }
    Object.keys(newst).forEach((p) => {
      // this.setProp(p,newst[p]);
      this[p] = newst[p];
    });
    this[method.setComputedState]();
  }

  [method.clearState]() {
    Object.keys(this.objProt).forEach((p) => {
      // this[method.setProp](p,null);
      this[p] = null;
    });
  }

  [method.clearSetDirty](newst) {
    this[method.clearState]();
    this[method.setDirtyState](newst);
  }

  [method.clearSetClean](newst) {
    this[method.clearState]();
    this[method.setCleanState](newst);
  }

  [method.getCopy](id) {
    const copy = new this.constructor(`${this.objId}_${id}`, this.objProt);
    copy[method.setCleanState](this);
    return copy;
  }

  [method.setComputedState]() {
    this.tmpPropBase = 'test';
  }
}

export default Base;
