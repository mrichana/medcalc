/*global angular: true */

(function () {
  'use strict';

  angular.module('medical.panels', []);

  angular.module('medicalCalculator.panelgroups', ['medical.panels']).
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