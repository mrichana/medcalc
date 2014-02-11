(function() {
	'use strict';

	/* Controllers */

	angular.module('medicalCalculator.controllers', ['medicalCalculator.panelgroups']).
	controller('calculatorCtrl', function($scope, $location, $anchorScroll, basicCalculators) {
		$scope.panels = angular.copy(basicCalculators);
	}).
	controller('algorithmCtrl', function($scope, $location, $anchorScroll, algorithms) {
		$scope.panels = [];
		angular.forEach(algorithms, function(value, key) {
			value.then(function(data) {
				$scope.panels.push(angular.copy(data.data));
			});
		});
	}).
	controller('tripplexCtrl', function($scope, $location, $anchorScroll, tripplex) {
		$scope.panels = angular.copy(tripplex);
	});
})();