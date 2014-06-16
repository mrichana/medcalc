/*global angular: true */

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
    filter('roman', [
        function(input) {
            var definition = [
                [1000, "M"],
                [900, "CM"],
                [500, "D"],
                [400, "CD"],
                [100, "C"],
                [90, "XC"],
                [50, "L"],
                [40, "XL"],
                [10, "X"],
                [9, "IX"],
                [5, "V"],
                [4, "IV"],
                [1, "I"]
            ];

            var _result = "";
            if (input === 0) {
                _result = "nulla"
            } else {
                for (var i = 0; i < definition.length; i++) {
                    while (input >= definition[i][0]) {
                        _result += definition[i][1];
                        input -= definition[i][0];
                    }
                }
            }
            return _result;
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
