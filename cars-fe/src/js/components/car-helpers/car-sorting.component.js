class CarSortingController {
    constructor($scope) {
        'ngInject';

        let self = this;
        $scope.property = {prop: 'price', clicked: 0};
        $scope.reverse = true;
        $scope.sortBy = function (property) {
            if ($scope.property.prop === property) {
                $scope.property.clicked += 1;
            } else {
                $scope.property.clicked = 0;
            }
            if ($scope.property.clicked > 1) {
                $scope.property.clicked = 0;
            }
            $scope.reverse = $scope.property.clicked ? false : true;
            $scope.property.prop = property;
            self.property = $scope.property;
            self.reverse = $scope.reverse;
            console.log($scope.property);
        }
        
        
    }


};

let CarSorting = {
    controller: CarSortingController,
    templateUrl: 'components/car-helpers/car-sorting.html'
}

export default CarSorting;