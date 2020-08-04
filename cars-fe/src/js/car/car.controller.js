import marked from 'marked';

class CarController {
  constructor(car, User, $sce, $rootScope) {
    'ngInject';

    this.car = car;
    this.carInfo = car.car
    this.owner =car.owner;

    this.currentUser = User.current;

    $rootScope.setPageTitle(`${this.car.car.brand} ${this.car.car.model} | ${this.car.owner.username}`);

    this.carInfo.description = $sce.trustAsHtml(marked(this.carInfo.description, { sanitize: true }));

  }

  

}


export default CarController;
