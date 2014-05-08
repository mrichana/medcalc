/*global angular: true */

(function () {
  'use strict';

  angular.module('medical.panels', []);

  angular.module('medicalCalculator.panelgroups', ['medical.panels']).
    factory('patientsFile', function (patientpanels) {
      return patientpanels;
    }).
    factory('basicCalculators', function (calculatorpanels) {
      return calculatorpanels;
    }
  ).
    factory('triplexCalculators', function (triplexpanels) {
      return triplexpanels;
    }
  ).
    factory('algorithmCalculators', function (algorithmpanels) {
      return algorithmpanels;
    }
  );
})();