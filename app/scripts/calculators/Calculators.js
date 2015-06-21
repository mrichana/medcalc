/*global angular: true */
/*global mathjs: true */
/*global _: true */

(function() {
    'use strict';


    angular.module('medical.calculators', []).
    factory('evaluator',
        function() {
            var evals = {};
            return function(scope, formula) {
                evals[formula] = evals[formula] || math.compile(formula).eval;
                return evals[formula](scope);
            };
        }
    ).
    value('roundNum', function(thisNum, dec) {
        dec = dec || 0;
        thisNum = thisNum * Math.pow(10, dec);
        thisNum = Math.round(thisNum);
        thisNum = thisNum / Math.pow(10, dec);
        return thisNum;
    }).
    factory('calculators', ['patientCalculators', 'internalMedicineCalculators', 'pulmonologyCalculators', 'cardiologyCalculators', 'triplexCalculators',
        function(patientCalculators, internalMedicineCalculators, pulmonologyCalculators, cardiologyCalculators, triplexCalculators) {
            return _.extend({}, patientCalculators, internalMedicineCalculators, pulmonologyCalculators, cardiologyCalculators, triplexCalculators);
        }
    ]);
})();
