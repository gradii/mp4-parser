export class _Errors extends Error {
  url;

  constructor(type, vid, errd = {}, url = '') {
    super(`type: ${type}, vid: ${vid}, errd: ${errd}`);
    this.url = url;
  }
}

