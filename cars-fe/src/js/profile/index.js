import angular from 'angular';

let profileModule = angular.module('app.profile', []);

// Include router
import ProfileConfig from './profile.config';
profileModule.config(ProfileConfig);

// Directive
import CarListDirective from '../profile/car-list.directive';
profileModule.directive('carListDirective', CarListDirective);

// Controllers
import ProfileController from './profile.controller';
profileModule.controller('ProfileController', ProfileController);

import CarPreview from '../components/car-helpers/car-preview.component';
profileModule.component('carPreviewProfile', CarPreview);

export default profileModule;
