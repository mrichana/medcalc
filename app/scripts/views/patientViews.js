/*global angular: true */
/*global _: true */
/*global moment:true */

(function () {
    'use strict';
    /**
     * calculators Module
     *
     * Available calculators
     */
    angular.module('medical.views').
    factory('patientViews', ['views', 'update', 'init', 'reset',
        function (views, update, init, reset) {
            return views.add([{
                id: 'newPatient',
                name: 'Αναζήτηση/Νέος Ασθενής',
                category: 'patient',
                type: 'basic',
                template: 'patient.search',
                defaultValues: {
                    lastname: '',
                    firstname: '',
                    amka: '',
                    age: null,
                    birthday: null
                },
                fields: {
                    amka: {
                        id: 'amka',
                        name: 'Α.Μ.Κ.Α.',
                        input: {
                            type: 'amka',
                        }
                    },
                    birthday: {
                        id: 'birthday',
                        name: 'Γενέθλια',
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
                            min: 1,
                            max: 114
                        }
                    },
                    lastname: {
                        id: 'lastname',
                        name: 'Επώνυμο',
                        input: {
                            type: 'text'
                        }
                    },
                    firstname: {
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
                validate: function (newValue, oldValue, scope, field) {
                    var fieldsId = _.indexBy(scope.view.fields, 'id');
                    var regEx = /^([0-3][0-9])([01][0-9])([0-9][0-9])([0-9#][0-9#][0-9#][0-9#][0-9#])?$/g;
                    var regExAmka = regEx.exec(scope.view.values.amka);
                    var date;

                    if (newValue !== oldValue) {
                        if (field.id === 'amka' && regExAmka) {
                            date = moment(regExAmka[1] + regExAmka[2] + '19' + regExAmka[3], 'DDMMYYYY'); //1900 dates.
                            var date21century = moment(regExAmka[1] + regExAmka[2] + '20' + regExAmka[3], 'DDMMYYYY'); //2000 dates
                            if (date.isValid()) {
                                if (!(date.isSame(scope.view.values.birthday, 'day')) && !(date21century.isSame(scope.view.values.birthday, 'day'))) {
                                    scope.view.values.birthday = date.toDate();
                                }
                            }
                        }
                        if (field.id === 'birthday') {
                            if (scope.view.values.birthday) {
                                date = moment(scope.view.values.birthday);
                                if (date.isValid()) {
                                    if (date.format('DDMMYY') !== scope.view.values.amka.substring(0, 6)) {
                                        scope.view.values.amka = date.format('DDMMYY') + '#####';
                                    }
                                    scope.view.values.age = moment().diff(date, 'years');
                                } else {
                                    scope.view.values.amka = '';
                                }
                            }
                        }
                        if (field.id === 'age') {
                            var age = scope.view.values.age;
                            if (age !== moment().diff(scope.view.values.birthday, 'years')) {
                                if (angular.isNumber(age)) {
                                    scope.view.values.birthday = moment().subtract(age, 'years').toDate();
                                } else {
                                    scope.view.values.birthday = null;
                                    scope.view.values.amka = '';
                                }
                            }
                        }
                    }

                    fieldsId.amka.warning = !regEx.test(scope.view.values.amka);
                    fieldsId.birthday.warning = !scope.view.values.birthday || !(moment(scope.view.values.birthday).isValid());
                    fieldsId.age.warning = !scope.view.values.age;
                    fieldsId.lastname.warning = !scope.view.values.lastname;
                    fieldsId.firstname.warning = !scope.view.values.firstname;

                    scope.addPatientReady = !(fieldsId.birthday.warning ||
                        //    fieldsId.amka.warning ||
                        fieldsId.lastname.warning ||
                        fieldsId.firstname.warning ||
                        scope.view.values.patients.length);
                }
            }, {
                id: 'patientEdit',
                name: 'Επεξεργασία Ασθενή',
                category: 'patient',
                type: 'basic',
                template: 'patient.search',
                order: -1,
                defaultValues: {
                    amka: '',
                    lastname: '',
                    firstname: '',
                    age: null,
                    birthday: null
                },
                fields: {
                    amka: {
                        id: 'amka',
                        name: 'Α.Μ.Κ.Α.',
                        input: {
                            type: 'amka',
                        }
                    },
                    birthday: {
                        id: 'birthday',
                        name: 'Γενέθλια',
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
                            min: 1,
                            max: 114
                        }
                    },
                    lastname: {
                        id: 'lastname',
                        name: 'Επώνυμο',
                        input: {
                            type: 'text'
                        }
                    },
                    firstname: {
                        id: 'firstname',
                        name: 'Όνομα',
                        input: {
                            type: 'text'
                        }
                    }
                },
                dontRemove: true,
                init: init,
                update: update,
                validate: function (newValue, oldValue, scope, field) {
                    var fieldsId = _.indexBy(scope.view.fields, 'id');
                    var regEx = /^([0-3][0-9])([01][0-9])([0-9][0-9])([0-9#][0-9#][0-9#][0-9#][0-9#])?$/g;
                    var regExAmka = regEx.exec(scope.view.values.amka);
                    var date;

                    if (newValue !== oldValue) {
                        if (field.id === 'amka' && regExAmka) {
                            date = moment(regExAmka[1] + regExAmka[2] + '19' + regExAmka[3], 'DDMMYYYY'); //1900 dates.
                            var date21century = moment(regExAmka[1] + regExAmka[2] + '20' + regExAmka[3], 'DDMMYYYY'); //2000 dates
                            if (date.isValid()) {
                                if (!(date.isSame(scope.view.values.birthday, 'day')) && !(date21century.isSame(scope.view.values.birthday, 'day'))) {
                                    scope.view.values.birthday = date.toDate();
                                }
                            }
                        }
                        if (field.id === 'birthday') {
                            if (scope.view.values.birthday) {
                                date = moment(scope.view.values.birthday);
                                if (date.isValid()) {
                                    if (date.format('DDMMYY') !== scope.view.values.amka.substring(0, 6)) {
                                        scope.view.values.amka = date.format('DDMMYY') + '#####';
                                    }
                                    scope.view.values.age = moment().diff(date, 'years');
                                } else {
                                    scope.view.values.amka = '';
                                }
                            }
                        }
                        if (field.id === 'age') {
                            var age = scope.view.values.age;
                            if (age !== moment().diff(scope.view.values.birthday, 'years')) {
                                if (angular.isNumber(age)) {
                                    scope.view.values.birthday = moment().subtract(age, 'years').toDate();
                                } else {
                                    scope.view.values.birthday = null;
                                    scope.view.values.amka = '';
                                }
                            }
                        }
                    }

                    fieldsId.amka.warning = !regEx.test(scope.view.values.amka);
                    fieldsId.birthday.warning = !scope.view.values.birthday || !(moment(scope.view.values.birthday).isValid());
                    fieldsId.age.warning = !scope.view.values.age;
                    fieldsId.lastname.warning = !scope.view.values.lastname;
                    fieldsId.firstname.warning = !scope.view.values.firstname;
                }
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
                        type: 'telephone'
                    }
                }, {
                    id: 'mobileNo',
                    name: 'Κινητό',
                    input: {
                        type: 'telephone'
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
