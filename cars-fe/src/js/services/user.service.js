export default class User {
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;

    this.current = this._JWT.getUser() === undefined ? null : JSON.parse(this._JWT.getUser());

  }


  attemptAuth(type, credentials) {
    let ext = type === 'login' ? '/auth' : '/users'

    let data = {};

    if (type === 'register') {
      data.email = credentials.email;
      data.password = credentials.password;
      data.first_name = credentials.first_name;
      data.last_name = credentials.last_name;
      data.username = credentials.username;
    } else {
      data.username = credentials.username;
      data.password = credentials.password;
    }

    return this._$http({
      url: this._AppConstants.api + ext,
      method: 'POST',
      data: data
    }).then(
      (res) => {
        if ('message' in res.data) {
          return res;
        }
        this._JWT.save(res.data.access_token);
        this._JWT.saveUser(JSON.stringify(res.data.user));    
        this.current = res.data.user;
        return res;
      }
    );
  }

  getUserInfo(username) {
    let current = this.current;
    this._$http({
      url:  this._AppConstants.api + '/user/' + username,
      method: 'GET',
    }).then((res) => {
      current = res.data;
      this._JWT.saveUser(JSON.stringify(res.data));
    })

    return current;
  }

  update(fields) {
    return this._$http({
      url:  this._AppConstants.api + '/user/' + this.current.username,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this._JWT.get()
      },
      data: fields
    }).then((res) => {
        this.current = res.data;
        this._JWT.saveUser(JSON.stringify(res.data));
        return res.data;
      }
    )
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._JWT.destroyUser();
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    // check for JWT token
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.current) {
      deferred.resolve(true);
    } else {
      this._$http({
        url: this._AppConstants.api + '/user/' + this.current.username,
        method: 'GET',
      }).then(
        (res) => {
          this.current = res.data;
          this._JWT.saveUser(JSON.stringify(this.current));
          deferred.resolve(true);
        },

        (err) => {
          this._JWT.destroy();
          this._JWT.destroyUser();
          deferred.resolve(false);
        }
      )
    }

    return deferred.promise;
  }


  ensureAuthIs(bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      if (authValid !== bool) {
        deferred.resolve(false);
        this._$state.go('app.home', null, {reload: true});
      } else {
        deferred.resolve(true);
      }

    });

    return deferred.promise;
  }

}
