/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  /* Services */

  /**
   * medicalCalculator.services Module
   *
   * Description
   */
  angular.module('medical.services', []).
    factory('appVersion', function () {
    });
  angular.module('medicalCalculator.services', ['ngStorage']).
    factory('patientStorage', function ($localStorage) {
      $localStorage.patients = $localStorage.patients || {};
      return {
        patients:         $localStorage.patients,
        patient:          function(id) {return this.patients[id];},
        addPatient:       function(patient) {this.patients[patient.id] = patient;},
        removePatient:    function(patient) {delete this.patients[patient.id && patient];},
        filterPatients:   function(patienttempl) {
          return _.filter(this.patients, function (patient) {
            return _.all(patienttempl, function (value, key) { return (!value) || patient[key].toUpperCase().lastIndexOf(value.toUpperCase(), 0) === 0;} );
          });
        }
    };
    });
})();
