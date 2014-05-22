/*global angular: true */
/*global _: true */

(function() {
    'use strict';
    /**
     * calculators Module
     *
     * Available calculators
     */
    angular.module('medical.views').
    factory('patientViews', function(views, update, init, reset) {
        return views.add([{
            id: 'newPatient',
            name: 'Αναζήτηση/Νέος Ασθενής',
            category: 'patient',
            type: 'basic',
            template: 'patient.search',
            defaultValues: {
                amka: '',
                lastname: '',
                firstname: '',
             },
            fields: [{
                id: 'amka',
                name: 'Α.Μ.Κ.Α.',
                input: {
                    type: 'text',
                    length: '13'
                }
            }, {
                id: 'lastname',
                name: 'Επώνυμο',
                input: {
                    type: 'text'
                }
            }, {
                id: 'firstname',
                name: 'Όνομα',
                input: {
                    type: 'text'
                }
            }],
            init: init,
            reset: reset,
            update: update,
            validate: function(newValue, scope, field) {
                var fieldsId = _.indexBy(scope.panel.fields, 'id');
                var regEx = /^([0-3][0-9])([01][0-9])([0-9][0-9])[0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/g;
                fieldsId.amka.warning = !regEx.test(scope.panel.values.amka);
                if (field.id === 'amka' && scope.panel.values.amka.match(/^([0-3][0-9])([01][0-9])([0-9][0-9])/g)) {
                    var date = scope.panel.values.amka;
                    var year = parseInt(date.substring(4, 6), 10);
                    var month = parseInt(date.substring(2, 4) - 1, 10);
                    var day = parseInt(date.substring(0, 2), 10);
                    date = new Date(year, month, day);
                    if (+date !== +scope.panel.values.birthday) {
                        scope.panel.values.birthday = date;
                    }
                }
                fieldsId.lastname.warning = !scope.panel.values.lastname;
                fieldsId.firstname.warning = !scope.panel.values.firstname;
                scope.addPatientReady = !(fieldsId.amka.warning || fieldsId.lastname.warning || fieldsId.firstname.warning || scope.panel.values.listPatients.length);
            }
        },
        {
            id: 'patient',
            name: '',
            category: 'patient',
            type: 'basic',
            template: 'patient.basic',
            defaultValues: {
            },
            fields: [
            ],
            init: init,
            reset: reset,
            update: update,
            validate: function(newValue, scope, field) {
            }
        }
        ]);
    });
})();