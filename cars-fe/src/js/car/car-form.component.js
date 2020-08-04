import CarFormController from "./car-form.controller";

let CarForm = {
    bindings: {
      car: '='
    },
    controller: CarFormController,
    templateUrl: 'car/car-form.html'
  };
  
  export default CarForm;