(function() {
	'use strict';

	/* Filters */

	angular.module('medicalCalculator.filters', []).
	filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);
})();