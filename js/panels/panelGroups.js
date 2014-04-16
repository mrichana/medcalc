(function () {
  'use strict';

  angular.module('medicalCalculator.panels', []);

  angular.module('medicalCalculator.panelgroups', ['medicalCalculator.panels']).
    factory('patientFile', function (patients) {
      return patients;
    }
  ).
    factory('basicCalculators', function (calculators) {
      return calculators;
    }
  ).
    factory('triplexCalculators', function (triplex) {
      return triplex;
    }
  ).
    factory('algorithmCalculators', function (algorithms) {
      return algorithms;
    }
  );
})();