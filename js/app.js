(function () {
  'use strict';

  // Declare app level module which depends on filters, and services
  angular.module('medicalCalculator', [
      'medical.filters',
      'medical.services',
      'medical.directives',
      'medicalCalculator.controllers',
      'medicalCalculator.filters',
      'medicalCalculator.services',
      'medicalCalculator.directives',
      'ngTouch',
      'ngAnimate',
      'ngSanitize',
      'ui.bootstrap'
    ],
    function ($locationProvider) {
      $locationProvider.html5Mode(false);
    });

  angular.module('medicalFile', [
      'medical.filters',
      'medical.services',
      'medical.directives',
      'medicalFile.controllers',
      'medicalFile.filters',
      'medicalFile.services',
      'medicalFile.directives',
      'ngTouch',
      'ngAnimate',
      'ngSanitize',
      'ngStorage',
      'ui.bootstrap'
    ],
    function ($locationProvider) {
      $locationProvider.html5Mode(false);
    });
})();
