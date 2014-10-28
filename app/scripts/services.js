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
    factory('uuid', function() {
        return {
            generate: function() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
                });
                return uuid;
            }
        };
    }).
    factory('appVersion', function() {}).
    factory('patientStorage', ['$localStorage', 'uuid', function($localStorage, uuid) {
        $localStorage.patients = $localStorage.patients || {};
        return {
            patients: $localStorage.patients,
            patient: function(id) {
                return this.patients[id];
            },
            addPatient: function(patient) {
                patient.id = patient.id || uuid.generate();
                this.patients[patient.id] = patient;
            },
            removePatient: function(patient) {
                delete this.patients[patient.id];
            },
            filterPatients: function(patienttempl) {
                var filterfunc = function(patient, template) {
                    var regex = /^([0-9]+)#*/g;
                    var amka = template.amka.search(regex) === 0 ? template.amka.split(regex)[1] : template.amka;
                    return patient.firstname.toLowerCase().lastIndexOf(template.firstname.toLowerCase(), 0) === 0 &&
                        patient.lastname.toLowerCase().lastIndexOf(template.lastname.toLowerCase(), 0) === 0 &&
                        patient.amka.lastIndexOf(amka, 0) === 0;
                };
                return _.sortBy(_.filter(this.patients, function(patient) {
                    return filterfunc(patient, patienttempl);
                }), function(item) {
                    return item.lastname + ' ' + item.firstname;
                });
            }
        };
    }]);
})();
