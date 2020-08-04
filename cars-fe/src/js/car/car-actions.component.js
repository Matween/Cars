class CarActionsController {
  constructor(Car, User, $state) {
    'ngInject';

    this._car = Car;
    this._$state = $state;
    this.currentUser = User.current;

  }

  deleteCar() {
    this.isDeleting = true;
    this._car.destroy(this._$state.params.slug).then(
      (success) => this._$state.go('app.home'),
      (err) => this._$state.go('app.home')
    )
  }
}

let CarActions = {
  bindings: {
    car: '='
  },
  controller: CarActionsController,
  templateUrl: 'car/car-actions.html'
};

export default CarActions;
