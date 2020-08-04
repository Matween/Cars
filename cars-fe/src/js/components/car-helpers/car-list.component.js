class CarListController {
  constructor(Car, $scope, $location) {
    'ngInject';

    this._Car = Car;
    this.setListTo(this.listConfig);

    $scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList);
    });

  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    this.runQuery();
  }



 runQuery() {
    // Show the loading indicator
    this.loading = true;
    
    // Run the query
    this._Car
      .query()
      .then(
        (res) => {
          this.loading = false;

          // Update list
          this.list = res.cars;

        }
      );
  }

}

let CarList = {
  bindings: {
    property: "<",
    reverse: "<",
    user_id: "<"
  },
  controller: CarListController,
  templateUrl: 'components/car-helpers/car-list.html'
};

export default CarList;