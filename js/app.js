/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  // Declare app level module which depends on filters, and services
  angular.module('medicalCalculator', [
      'medical.controllers',
      'medical.filters',
      'medical.services',
      'medical.directives',
      'ngRoute',
      'ngTouch',
      'ngAnimate',
      'ngSanitize',
      'ui.bootstrap'
    ],
    function ($locationProvider) {
      $locationProvider.html5Mode(false);
    });
})();
