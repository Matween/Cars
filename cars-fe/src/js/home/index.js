import angular from 'angular';

// Create the module
let homeModule = angular.module('app.home', []);

// Include our UI-Router config settings
import HomeConfig from './home.config';
homeModule.config(HomeConfig);


// Controllers
import HomeController from './home.controller';
homeModule.controller('HomeController', HomeController);


export default homeModule;
