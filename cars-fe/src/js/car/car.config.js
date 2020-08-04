function CarConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.Car', {
    url: '/car/:slug',
    controller: 'CarController',
    controllerAs: '$ctrl',
    templateUrl: 'car/car.html',
    title: 'Car',
    resolve: {
      car: function(Car, $state, $stateParams) {
        return Car.get($stateParams.slug).then(
          (car) => car,
          (err) => $state.go('app.home')
        )
      }
    }
  });

};

export default CarConfig;
