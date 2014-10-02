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
                    firstname: '',
                    age: null,
                    birthday: ''
                },
                fields: {
                    amka: {
                        id: 'amka',
                        name: 'Α.Μ.Κ.Α.',
                        input: {
                            type: 'text',
                            length: '11'
                        }
                    }, 
                    birthday: {
                        id: 'birthday',
                        name: 'Γεννέθλια',
                        input: {
                            type: 'date'
                        }
                    },
                    age: {
                        id: 'age',
                        name: 'Ηλικία',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 15,
                            max: 130
                        }
                    },
                    lastname:{
                        id: 'lastname',
                        name: 'Επώνυμο',
                        input: {
                            type: 'text'
                        }
                    },
                    firstname:{
                        id: 'firstname',
                        name: 'Όνομα',
                        input: {
                            type: 'text'
                        }
                    }
                },
                init: init,
                reset: reset,
                update: update,
                validate: function(newValue, scope, field) {
                    var isValidDate = function(date) {return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime());};
                    var fieldsId = _.indexBy(scope.view.fields, 'id');
                    var regEx = /^([0-3][0-9])([01][0-9])([0-9][0-9])[0-9][0-9][0-9][0-9][0-9]$/g;

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
                    if (field.id === 'birthday') {
                        var date = scope.view.values.birthday;
                        if (isValidDate(date)) {
                            var today = new Date();
                            var age = Math.round((today - date) / 1000 / 60 / 60 / 24 / 365.25);
                            var year = date.getFullYear().toString().substring(2);
                            var month = (date.getMonth()+1);
                            month = month < 10 ? "0"+month : ""+month;
                            var day = date.getDate();
                            day = day<10 ? "0"+day : ""+day;
                            date = ''+day+month+year;
                            if (date != scope.view.values.amka.substring(0, 6)) {
                                scope.view.values.amka = date;
                            }
                            if (age != scope.view.values.age) {
                                scope.view.values.age = age;
                            }
                        }
                    }
                    if (field.id === 'age') {
                        var age = scope.view.values.age;
                        if (age > 0) {
                            var today = new Date();
                            var birthday = new Date( today - (age * 365.25 * 24 * 60 * 60 * 1000) );
                            if (!scope.view.values.birthday || birthday.getFullYear() != scope.view.values.birthday.getFullYear()) {
                                scope.view.values.birthday = birthday;
                            }
                        }
                    }

                    fieldsId.amka.warning = !regEx.test(scope.view.values.amka);
                    fieldsId.birthday.warning = !(isValidDate(scope.view.values.birthday));
                    fieldsId.age.warnign = (scope.view.values.birthday < 15 && scope.view.values.birthday > 105);
                    fieldsId.lastname.warning = !scope.view.values.lastname;
                    fieldsId.firstname.warning = !scope.view.values.firstname;

                    scope.addPatientReady = !(fieldsId.birthday.warning
                                           || fieldsId.lastname.warning 
                                           || fieldsId.firstname.warning 
                                           || scope.view.values.patients.length);
                }
            }, {
                id: 'patientEdit',
                name: 'Επεξεργασία Ασθενή',
                category: 'patient',
                type: 'basic',
                template: 'patient.basic',
                order: -1,
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
                template: 'patient.view',
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
                order: 0,
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
                order: -1,
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
