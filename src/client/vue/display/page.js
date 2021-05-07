/**
 * Created by fox on 27.02.17.
 */

export default class {
  constructor(pages) {
    this.pages = pages;
  }

  display(state) {
    return this.pages.some(item => item === state.page);
  }
}
