function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    url: '/:@username',
    controller: 'ProfileController',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {
        return Profile.get(JSON.parse(localStorage.getItem('user')).username).then(
          (profile) => profile,
          (err) => {
            console.log(err);
            $state.go('app.home')
          }
        )
      },
      list: function(Car) {
        return Car.query();
      }
    }

  });

};

export default ProfileConfig;
