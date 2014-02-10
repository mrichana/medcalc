(function() {
	'use strict';

	// Docs styles
	//
	$(function() {

		var $window = $(window);

		$(document).ready(function($) {
			// Sidebar
			var $sidenav = $('.bs-docs-sidenav'),
				offset = $sidenav.offset();
			$sidenav.affix({
				offset: {
					top: offset.top - ($window.width() <= 979 ? 20 : 70),
					bottom: 0
				}
			}).addClass('animated');
		});

	});

	// Declare app level module which depends on filters, and services
	angular.module('medicalCalculator', [
		'medicalCalculator.controllers',
		'medicalCalculator.filters',
		'medicalCalculator.services',
		'medicalCalculator.directives',
		//'medicalCalculator.panels',
		//'medicalCalculator.panelgroups',
		'ui.bootstrap',
		//'hmTouchevents',
		'storage'],
	//'calculators'],

	function($locationProvider) {
		//$locationProvider.html5Mode(true);
	});
})();