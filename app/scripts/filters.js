/*global angular: true */
/*global _: true */

(function() {
    'use strict';

    /* Filters */

    angular.module('medical.filters', []).
    filter('to_trusted', ['$sce',
        function($sce) {
            return function(text) {
                return $sce.trustAsHtml(angular.isDefined(text) ? '' + text : '');
            };
        }
    ]).
    filter('filterPatients', ['patientTemplateTest',
        function(patientTemplateTest) {
            return function(array, patientTemplate) {
                var filterfunc = patientTemplateTest;
                var ret = _.sortBy(_.filter(array, function(patient) {
                    return filterfunc(patient, patientTemplate);
                }), function(item) {
                    return item.lastname + ' ' + item.firstname;
                });
                return ret;
            };
        }
    ]).
    filter('interpolate', ['version',
        function(version) {
            return function(text) {
                return String(text).replace(/\%VERSION\%/mg, version);
            };
        }
    ]);
})();
