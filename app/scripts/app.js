/*global angular: true */

(function() {
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
        'mobile-angular-ui',
        'mgcrea.ngStrap',
        'ui.tinymce',
        'firebase'
    ]);
})();
