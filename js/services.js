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
  angular.module('medicalCalculator.services', []).
    factory('null', function () {
      return null;
    });
  angular.module('medicalFile.services', ['ngStorage']).
    factory('patientStorage', function ($localStorage) {
      $localStorage.patients = $localStorage.patients || {};
      return {
        patients:         $localStorage.patients,
        patientsNames:    function() {return _.map(this.patients, function(patient) {return {name: patient.name, id: patient.id};});},
        patient:          function(id) {return this.patients[id];},
        patientsFromName: function(name) {return _filter(this.patients, {name: name});},
        addPatient:       function(patient) {this.patients[patient.id] = patient;},
        removePatient:    function(patient) {delete this.patients[patient.id && patient];}
      };
    });
})();
