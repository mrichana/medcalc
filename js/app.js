(function() {
	'use strict';

	// Declare app level module which depends on filters, and services
	angular.module('medicalCalculator', [
		'medicalCalculator.controllers',
		'medicalCalculator.filters',
		'medicalCalculator.services',
		'medicalCalculator.directives',
		'ngSanitize',
		'ui.bootstrap'
		],
	function($locationProvider) {
		$locationProvider.html5Mode(true);
	});
})();