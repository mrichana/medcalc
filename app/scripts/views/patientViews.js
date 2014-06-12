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
    factory('patientViews', ['views', 'update', 'init', 'reset',
        function(views, update, init, reset) {
            return views.add([{
                id: 'newPatient',
                name: 'Αναζήτηση/Νέος Ασθενής',
                category: 'patient',
                type: 'basic',
                template: 'patient.search',
                defaultValues: {
                    amka: '',
                    lastname: '',
                    firstname: ''
                },
                fields: [{
                    id: 'amka',
                    name: 'Α.Μ.Κ.Α.',
                    input: {
                        type: 'text',
                        length: '11'
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
                    var fieldsId = _.indexBy(scope.view.fields, 'id');
                    var regEx = /^([0-3][0-9])([01][0-9])([0-9][0-9])[0-9][0-9][0-9][0-9][0-9]$/g;
                    fieldsId.amka.warning = !regEx.test(scope.view.values.amka);
                    if (field.id === 'amka' && scope.view.values.amka.match(/^([0-3][0-9])([01][0-9])([0-9][0-9])/g)) {
                        var date = scope.view.values.amka;
                        var year = parseInt(date.substring(4, 6), 10);
                        var month = parseInt(date.substring(2, 4) - 1, 10);
                        var day = parseInt(date.substring(0, 2), 10);
                        date = new Date(year, month, day);
                        if (+date !== +scope.view.values.birthday) {
                            scope.view.values.birthday = date;
                        }
                    }
                    fieldsId.lastname.warning = !scope.view.values.lastname;
                    fieldsId.firstname.warning = !scope.view.values.firstname;
                    scope.addPatientReady = !(fieldsId.amka.warning || fieldsId.lastname.warning || fieldsId.firstname.warning || scope.view.values.patients.length);
                }
            }, {
                id: 'patientEdit',
                name: 'Επεξεργασία Ασθενή',
                category: 'patient',
                type: 'basic',
                template: 'patient.basic',
                defaultValues: {
                    amka: '',
                    lastname: '',
                    firstname: ''
                },
                fields: [{
                    id: 'amka',
                    name: 'Α.Μ.Κ.Α.',
                    input: {
                        type: 'text',
                        length: '11'
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
                dontRemove: true,
                init: init,
                update: update
            }, {
                id: 'patientView',
                name: 'Προβολή',
                category: 'patient',
                type: 'basic',
                template: 'patient.basic',
                defaultValues: {
                    notes: ''
                },
                fields: [{
                    id: 'notes',
                    name: 'Σημειώσεις',
                    input: {
                        type: 'static'
                    }
                }],
                init: init,
                update: update
            }, {
                id: 'patientNotes',
                name: 'Σημειώσεις',
                category: 'patient',
                type: 'basic',
                template: 'patient.basic',
                defaultValues: {
                    notes: ''
                },
                fields: [{
                    id: 'notes',
                    name: 'Σημειώσεις',
                    input: {
                        type: 'richtext'
                    }
                }],
                init: init,
                update: update
            }, {
                id: 'patientContactDetails',
                name: 'Στοιχεία Επικοινωνίας',
                category: 'patient',
                type: 'basic',
                template: 'patient.basic',
                defaultValues: {
                    telNo: '',
                    mobileNo: '',
                    address: ''
                },
                fields: [{
                    id: 'telNo',
                    name: 'Τηλέφωνο',
                    input: {
                        type: 'text',
                        length: '10'
                    }
                }, {
                    id: 'mobileNo',
                    name: 'Κινητό',
                    input: {
                        type: 'text',
                        length: '10'
                    }
                }, {
                    id: 'address',
                    name: 'Διεύθυνση',
                    input: {
                        type: 'multiline'
                    }
                }],
                init: init,
                update: update,
            }]);
        }
    ]);
})();
