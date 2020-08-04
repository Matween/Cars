import angular from 'angular';

// Create the module
let carModule = angular.module('app.car', []);

// Include router
import CarConfig from './car.config';
carModule.config(CarConfig);

import CarFormConfig from './car-form.config';
carModule.config(CarFormConfig);


// Controllers
import CarController from './car.controller';
carModule.controller('CarController', CarController);

import CarFormController from './car-form.controller';
carModule.controller('CarFormController', CarFormController)

import CarActions from './car-actions.component';
carModule.component('carActions', CarActions);


export default carModule;
