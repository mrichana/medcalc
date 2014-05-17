/*global angular: true */
/*global mathjs: true */
/*global _: true */

(function() {
  'use strict';


  angular.module('medical.calculators', []).
    factory('evaluator', function(mathParser) {
      var evals = {};
      return function(scope, formula) {
        evals[formula] = evals[formula] || mathParser.compile(formula).eval;
        return evals[formula](scope);
      };
    }).
    value('mathParser', mathjs()).
    value('roundNum', function(thisNum, dec) {
    dec = dec || 0;
    thisNum = thisNum * Math.pow(10, dec);
    thisNum = Math.round(thisNum);
    thisNum = thisNum / Math.pow(10, dec);
    return thisNum;
}).
    factory('calculators', function(patientCalculators, basicCalculators, triplexCalculators) {    
        return _.extend({}, patientCalculators, basicCalculators, triplexCalculators);
    });
})();
