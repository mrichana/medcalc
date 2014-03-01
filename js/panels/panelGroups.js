(function(){
	'use strict';
	
	angular.module('medicalCalculator.panels', []);

	angular.module('medicalCalculator.panelgroups', ['medicalCalculator.panels']).
	factory('basicCalculators', function (calculators) {
		return calculators;
	}).
	factory('triplexCalculators', function (triplex) {
		return triplex;
	});
})();