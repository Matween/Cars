export default class JWT {
  constructor(AppConstants, $window) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$window = $window;
  }

  save(token) {
    this._$window.localStorage['jwt'] = token;
  }

  get() {
    return this._$window.localStorage['jwt'];
  }

  destroy() {
    this._$window.localStorage.removeItem('jwt');
  }

  saveUser(user) {
    this._$window.localStorage['user'] = user;
  }

  getUser() {
    return this._$window.localStorage['user'];
  }

  destroyUser() {
    this._$window.localStorage.removeItem('user');
  }

}
