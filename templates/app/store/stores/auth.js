import { observable, computed, action } from 'mobx';
import { app, service } from '~/temp/shared/app';
import _ from 'lodash';

export default class AuthStore {
  jwt = undefined;

   @observable user = {};

  init() {
    // get token from localStorage
      console.log(window.localStorage)
    // auto-login with jwt
	console.log(window.localStorage);
		let managecrossstorage;
		// auto-login with jwt
    if (!process.env.__DEV__) {
      window._q && window._q.whenDone(() => {
        //check in crossbrowser
        const that = this;
        const $ = jQuery;
        managecrossstorage = ()=> {
          window.hubstorage = new CrossStorageClient('http://localhost:3001/dist/hub.html');

          window.hubstorage.onConnect().then(function () {
            return window.hubstorage.get('feathers-jwt');
          }).then(function (res) {
            if (res) {
              window.localStorage.setItem('feathers-jwt', res);
              that.jwtAuth();
            } else {
              window.localStorage.clear();
              that.jwtAuth();
            }
          });
        }
        $(document).ready(managecrossstorage);
      });
    } else {

      this.jwtAuth();
    }
  }

  @action
  updateUser(data = {}) {
    if (!process.env.__DEV__) {
      if (!data.token) {
        window.hubstorage.onConnect().then(function () {
          return window.hubstorage.del('feathers-jwt');
        });
      }
      if (data && data.token) {
        window.localStorage.setItem('feathers-jwt', data.token);

        window.hubstorage.onConnect().then(function () {
          return window.hubstorage.set('feathers-jwt', data.token);
        });
      }
    }

    if (!data.user) {
      const user = app().get('user');
      console.info('user', user);
    } else {
			this.user = data.facebook ||data.user||data || {};
    }

  }

 jwtAuth() {
    return app()
      .authenticate({})
      .then((result) => this.updateUser(result))
      .catch((err) => {
      console.error('errorauth')
      console.error(err)}
      ); // eslint-disable-line no-console
  }

  @computed
  get check() {
    return !_.isEmpty(this.user);
  }

  @action
  loginfb() {
    return app()
      .authenticate()
      .then((result) => this.updateUser(result.user));
  }

  @action
  login({ email, password }) {
return app()
      .authenticate({ type: 'local', email, password})
      .then((result) => this.updateUser(result.user));
  }

  @action
  register({ email, password, username }) {
    return service('user')
      .create({ email, password, username });
  }

  @action
  logout() {
    app()
      .logout()
      .then(() => this.updateUser({}));
  }
}
