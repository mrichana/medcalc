var app;
(function (app) {
    'use strict';
    angular.module('medical.services', ['ngStorage', 'firebase']).
        factory('uuid', function () {
        return {
            generate: function () {
                var d = new Date().getTime();
                return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
                }));
            }
        };
    }).
        factory('patientTemplateTest', function () {
        return function (patient, template) {
            var regex = /^([0-9]+)#*/g;
            var amka = template && template.amka &&
                template.amka.search(regex) === 0 ? template.amka.split(regex)[1] : template.amka;
            return patient &&
                patient.firstname && patient.firstname.toLowerCase().lastIndexOf(template.firstname.toLowerCase(), 0) === 0 &&
                patient.lastname && patient.lastname.toLowerCase().lastIndexOf(template.lastname.toLowerCase(), 0) === 0 &&
                patient.amka && patient.amka.lastIndexOf(amka, 0) === 0;
        };
    }).
        factory('patientLocalStorage', ['$q', '$localStorage', 'uuid', function ($q, $localStorage, uuid) {
            $localStorage.patients = $localStorage.patients || {};
            var patientsArray = $localStorage.patients;
            return {
                patients: function () {
                    var deferredList = $q.defer();
                    deferredList.resolve({
                        list: patientsArray,
                        add: function (patient) {
                            patient.id = patient.id || uuid.generate();
                            patientsArray[patient.id] = patient;
                        },
                        remove: function (patient) {
                            delete patientsArray[patient.id];
                        }
                    });
                    return deferredList.promise;
                },
                patient: function (id) {
                    var deferredObject = $q.defer();
                    deferredObject.resolve({
                        value: angular.copy(patientsArray[id]),
                        save: function () {
                            patientsArray[id] = this.value;
                        },
                        delete: function () {
                            delete patientsArray[id];
                        }
                    });
                    return deferredObject.promise;
                }
            };
        }]);
})(app || (app = {}));
//# sourceMappingURL=services.js.map