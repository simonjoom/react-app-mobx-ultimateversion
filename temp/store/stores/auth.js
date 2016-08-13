import { observable, computed, action } from 'mobx';
import { app, service } from '~/temp/shared/app';
import _ from 'lodash';

export default class AuthStore {

  jwt = null;

   @observable user = {};

  init() {
    // get token from localStorage
  const token = (process.env.BROWSER)
      ? window.localStorage.getItem('feathers-jwt')
      : null;
      console.log(window.localStorage)
    // auto-login with jwt
   // if (token)
    this.jwtAuth();
  }

  @action
  updateUser(data = {}) {
console.log(data)
  if(data.token)
  window.localStorage.setItem('feathers-jwt',data.token);
let av={email:data.email,username:data.username}
  this.user = av || {};
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
