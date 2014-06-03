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
        newPatient: function(values) {
          var ret = {amka: values.amka, firstname: values.firstname, lastname: values.lastname};
          return ret;
        }
            // ,
            // patientView: function(values) {
            //   return {notes: values.notes};
            // }
      };
    });
})();