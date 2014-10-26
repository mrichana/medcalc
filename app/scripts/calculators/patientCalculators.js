/*global angular: true */

(function () {
    'use strict';

    /* Services */

    /**
     * medical.calculators Module
     *
     * Description
     */
    angular.module('medical.calculators').
    factory('patientCalculators', [
        function () {
            return {
                newPatient: function (values) {

                    var ret = {
                        amka: values.amka,
                        birthday: values.birthday,
                        age: values.age,
                        firstname: values.firstname,
                        lastname: values.lastname
                    };
                    return ret;
                }
            };
        }
    ]);
})();
