/*global angular: true */

(function () {
  'use strict';

  angular.module('medical.panels', ['medical.calculators']);

  angular.module('medical.panelgroups', ['medical.panels']).
    factory('patientsFile', function (patientPanels) {
      return patientPanels;
    }).
    factory('basicCalculatorPanels', function (calculatorPanels) {
      return calculatorPanels;
    }
  ).
    factory('triplexCalculatorPanels', function (triplexPanels) {
      return triplexPanels;
    }
  );
})();