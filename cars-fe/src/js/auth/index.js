import angular from 'angular';

let authModule = angular.module('app.auth', []);

// Include router
import AuthConfig from './auth.config';
authModule.config(AuthConfig);


// Include controllers
import AuthController from './auth.controller';
authModule.controller('AuthController', AuthController);


export default authModule;
