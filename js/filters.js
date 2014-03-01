(function() {
	'use strict';

	/* Filters */

	angular.module('medicalCalculator.filters', []).
	filter('to_trusted', ['$sce', function($sce){
		return function(text) {
			return $sce.trustAsHtml(text?""+text:"");
		};
	}]).
	filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);
})();