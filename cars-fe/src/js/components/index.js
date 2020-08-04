import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import CarSorting from './car-helpers/car-sorting.component';
componentsModule.component('carSorting', CarSorting);

import CarPreview from './car-helpers/car-preview.component';
componentsModule.component('carPreview', CarPreview);

import CarList from './car-helpers/car-list.component';
componentsModule.component('carList', CarList);

export default componentsModule;
