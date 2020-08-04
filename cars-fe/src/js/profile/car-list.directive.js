function CarListDirective($parse) {
    'ngInject';

    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attrs) {
            $parse(attrs.ngModel).assign(scope, JSON.parse(localStorage.getItem('user')).user_id);
        }
    };
}

export default CarListDirective;