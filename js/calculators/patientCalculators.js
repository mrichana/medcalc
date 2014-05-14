/*global angular: true */
/*global _: true */
/*global sprintf: true */

(function () {
  'use strict';

  /* Services */

  /**
   * medical.calculators Module
   *
   * Description
   */
  angular.module('medical.calculators').
    factory('patientCalculators', function () {
      var patientStorage = angular.injector(['medical.services', 'ngStorage', 'ng']).get('patientStorage');
      var values = {};
      return {
        newPatient: function (values) {
          var ret = {id: values.id, firstname: values.firstname, lastname: values.lastname};
          return ret;
        },
        listPatients: function (values) {
          var ret = patientStorage.filterPatients(values);
          return ret;
        }
      };
    });
})();
