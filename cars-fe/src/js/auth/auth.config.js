function AuthConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.login', {
    url: '/login',
    controller: 'AuthController as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })
  .state('app.register', {
    url: '/register',
    controller: 'AuthController as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  });

};

export default AuthConfig;
