/*global angular: true */
/*global _: true */
/*global sprintf: true */

(function() {
  'use strict';

  /* Services */

  /**
   * medical.calculators Module
   *
   * Description
   */
  angular.module('medical.calculators').
    factory('patientCalculators', function(patientStorage) {
      return {
        searchPatient: function(values) {
          var ret = {amka: values.amka, firstname: values.firstname, lastname: values.lastname};
          return ret;
        }
      };
    });
})();
