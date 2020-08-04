import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import User from './user.service';
servicesModule.service('User', User);

import JWT from './jwt.service'
servicesModule.service('JWT', JWT);

import Profile from './profile.service';
servicesModule.service('Profile', Profile);

import Car from './car.service';
servicesModule.service('Car', Car);


export default servicesModule;
