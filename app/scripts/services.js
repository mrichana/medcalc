/*global angular: true */
/*global _: true */
/*global Firebase: true */
/*global moment: true */

(function() {
    'use strict';

    /* Services */

    /**
     * medical.services Module
     *
     * Description
     */
    angular.module('medical.services', ['ngStorage', 'firebase']).
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
    factory('patientTemplateTest', function() {
        return function(patient, template) {
            var regex = /^([0-9]+)#*/g;
            var amka = template && template.amka &&
                template.amka.search(regex) === 0 ? template.amka.split(regex)[1] : template.amka;
            return patient &&
                patient.firstname && patient.firstname.toLowerCase().lastIndexOf(template.firstname.toLowerCase(), 0) === 0 &&
                patient.lastname && patient.lastname.toLowerCase().lastIndexOf(template.lastname.toLowerCase(), 0) === 0 &&
                patient.amka && patient.amka.lastIndexOf(amka, 0) === 0;
        };
    }).
    factory('patientLocalStorage', ['$q', '$localStorage', 'uuid', function($q, $localStorage, uuid) {
            $localStorage.patients = $localStorage.patients || {};
            var patientsArray = $localStorage.patients;
            return {
                patients: function() {
                    var deferredList = $q.defer();
                    deferredList.resolve({
                        list: patientsArray,
                        add: function(patient) {
                            patient.id = patient.id || uuid.generate();
                            patientsArray[patient.id] = patient;
                        },
                        remove: function(patient) {
                            delete patientsArray[patient.id];
                        }
                    });
                    return deferredList.promise;
                },
                patient: function(id) {
                    var deferredObject = $q.defer();
                    deferredObject.resolve({
                        value: angular.copy(patientsArray[id]),
                        save: function() {
                            patientsArray[id] = this.value;
                        },
                        delete: function() {
                            delete patientsArray[id];
                        }
                    });
                    return deferredObject.promise;
                }
            }
        }]).
    factory('trasverse', [function() {
        var recurse = function(tree, functionToCall) {
            _.each(tree, function(value, key, object) {
                if (key[0] != '$' && key[0] != '_') {
                    if (!angular.isFunction(value)) {
                        functionToCall(value, key, object);
                        if (angular.isObject(value)) {
                            recurse(value, functionToCall);
                        }
                    }
                }
            });
            return recurse;
        }
        return recurse;
    }]).
    factory('patientWebStorage', ['$q', '$firebase', '$FirebaseObject', 'uuid', 'trasverse', function($q, $firebase, $FirebaseObject, uuid, trasverse) {
        return {
            patients: function() {
                var patientsArray = $firebase(new Firebase('https://medrichana.firebaseio.com/backend')).$asArray();
                var deferredList = $q.defer();
                patientsArray.$loaded(
                    function(data) {
                        deferredList.resolve({
                            list: data,
                            add: function(patient) {
                                patient.id = patient.id || uuid.generate();
                                patientsArray.$inst().$set(patient.id, patient);
                            },
                            remove: function(patient) {
                                patientsArray.$remove(patient);
                            }
                        });
                    }
                );
                return deferredList.promise;
            },
            patient: function(id) {
                var PatientFactory = $FirebaseObject.$extendFactory({
                    // $$updated: function(snap) {
                    //     var changed = $FirebaseObject.prototype.$$updated.apply(this, arguments);
                    //     trasverse(this, function(value, key, object) {
                    //         if (angular.isString(value)) {
                    //             var date = moment(value, moment.ISO_8601, true);
                    //             if (date.isValid()) {
                    //                 object[key] = date.toDate();
                    //                 changed = true;
                    //             }
                    //         }
                    //     });
                    //     return changed;
                    // },
                    toJSON: function() {
                        var result = angular.fromJson(
                            angular.toJson(
                                _.omit(angular.extend({}, this),
                                    function(value, key) {
                                        return key[0] === '$';
                                    })
                            )
                        );
                        return result;
                    }
                });

                var patientObject = $firebase(new Firebase('https://medrichana.firebaseio.com/backend/' + id), {
                    objectFactory: PatientFactory
                }).$asObject();
                var deferredObject = $q.defer();
                patientObject.$loaded(
                    function(data) {
                        deferredObject.resolve({
                            value: data,
                            save: function() {
                                patientObject.$save();
                            },
                            delete: function() {
                                patientObject.$remove();
                            }
                        });
                    }
                );
                return deferredObject.promise;
            }
        }
    }]).
    factory('patientHybridStorage', ['patientLocalStorage', 'patientWebStorage', function(patientLocalStorage, patientWebStorage) {
        var online = false;
        var ret = online ? patientWebStorage:patientLocalStorage;
        return ret;
    }]);
})();
