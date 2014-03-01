(function() {
	'use strict';

	/* Controllers */

	angular.module('medicalCalculator.controllers', ['medicalCalculator.panelgroups']).
	controller('calculatorCtrl', function($scope, $location, $anchorScroll, 
										  basicCalculators, 
										  triplexCalculators) {
		$scope.filters = {
			basic: basicCalculators,
			triplex: triplexCalculators
		};

		$scope.setFilter = function(filter) {
			$scope.panels = angular.copy($scope.filters[filter]);
			$scope.activeFilter = filter;
		};
		$scope.setFilter('basic');

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