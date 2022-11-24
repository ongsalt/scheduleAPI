import { BaseAuthStore } from 'pocketbase';

class NextAuthStore extends BaseAuthStore {
  constructor(req, res) {
    super();

    this.req = req;
    this.res = res;

    this.loadFromCookie(this.req?.headers?.cookie);
  }

  save(token, model) {
    super.save(token, model);

    this.res?.setHeader('set-cookie', this.exportToCookie());
  }

  clear() {
    super.clear();

    this.res?.setHeader('set-cookie', this.exportToCookie());
  }
}

export { NextAuthStore }