(function() {
	'use strict';

	/* Controllers */

	angular.module('medicalCalculator.controllers', ['medicalCalculator.panelgroups']).
	controller('calculatorCtrl', function($scope, $location, $anchorScroll, 
										  basicCalculators, 
										  triplexCalculators) {
		$scope.filters = [
            {name: 'Βασικά', content: basicCalculators},
            {name: 'Triplex', content: triplexCalculators}
        ];

        ($scope.setFilter = function(filter) {
			$scope.panels = angular.copy($scope.filters[filter].content);
            $scope.slideAnimationInvert=($scope.filters.active < filter);
            $scope.filters.active = filter;
		})(0);
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