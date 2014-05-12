/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  angular.module('medical.panels', ['medical.calculators']).
    factory('update', function (calculators) {
      return function (fields, oldValues) {
        if (!this.calculator) {
          this.calculator = calculators[this.id];
        }
        return this.calculator(this.values);
      };
    }).
    factory('init', function () {
      return function () {
        this.values = this.values || {};
        _.defaults(this.values, this.defaultValues);
      };
    }).
    factory('reset', function () {
      return function () {
        _.extend(this.values, this.defaultValues);
      };
    });

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