import angular from 'angular';

let settingsModule = angular.module('app.settings', []);

// Config
import SettingsConfig from './settings.config'
settingsModule.config(SettingsConfig);


// Controllers
import SettingsController from './settings.controller';
settingsModule.controller('SettingsController', SettingsController);


export default settingsModule;
