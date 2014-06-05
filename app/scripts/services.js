/*global angular: true */
/*global _: true */

(function() {
    'use strict';

    /* Services */

    /**
     * medical.services Module
     *
     * Description
     */
    angular.module('medical.services', ['ngStorage']).
    factory('appVersion', function() {}).
    factory('patientStorage', ['$localStorage', function($localStorage) {
        $localStorage.patients = $localStorage.patients || {};
        return {
            patients: $localStorage.patients,
            patient: function(amka) {
                return this.patients[amka];
            },
            addPatient: function(patient) {
                this.patients[patient.amka] = patient;
            },
            removePatient: function(patient) {
                delete this.patients[patient.amka || patient];
            },
            filterPatients: function(patienttempl) {
                return _.sortBy(_.filter(this.patients, function(patient) {
                    return _.all(patienttempl, function(value, key) {
                        return patient[key].toLowerCase().lastIndexOf(value.toLowerCase(), 0) === 0;
                    });
                }), function(item) {
                    return item.lastname + ' ' + item.firstname;
                });
            }
        };
    }]);
})();