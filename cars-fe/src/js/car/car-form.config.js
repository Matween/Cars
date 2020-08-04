function CarFormConfig($stateProvider, $httpProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.CarForm', {
      url: '/add/car',
      controller: 'CarFormController',
      controllerAs: '$ctrl',
      templateUrl: 'car/car-form.html',
      title: 'Add a Car',
    });
  
  };
  
  export default CarFormConfig;
  