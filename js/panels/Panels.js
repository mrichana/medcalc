/*global angular: true */
/*global _: true */

(function() {
  'use strict';

  angular.module('medical.panels', ['medical.calculators']).
    factory('panels', function() {
      var allList = [];
      var categories = {};
      var all = {};

      return {
        add: function(panelList) {
          allList = _.union(allList, panelList);
          all = _.indexBy(allList, 'id');
          categories = _.groupBy(allList, function(panel) {
            return panel.category || 'general';
          });
          return panelList;
        },
        all: function() { return allList; },
        categories: function() {return categories;}
      };
    }).
    factory('update', function(calculators) {
      return function(newValue, oldValue, scope, field) {
        if (!this.calculator) {
          this.calculator = calculators[this.id];
        }
        var result = this.calculator(this.values);
        this.values[this.id] = result;
        if (scope.panel && scope.panel.validate) {scope.panel.validate(newValue, scope, field);}
        return result;
      };
    }).
    factory('init', function() {
      return function() {
        this.values = this.values || {};
        _.defaults(this.values, this.defaultValues);
      };
    }).
    factory('reset', function() {
      return function() {
        _.extend(this.values, this.defaultValues);
      };
    });
})();
