/*global angular: true */
/*global _: true */

(function() {
  'use strict';

  angular.module('medical.views', ['medical.calculators']).
    factory('views', function() {
      var _allList = [];
      var _categories = {};
      var _all = {};

      return {
        add: function(panelList) {
          _allList = _.union(_allList, panelList);
          _all = _.indexBy(_allList, 'id');
          _categories = _.groupBy(_allList, function(panel) {
            return panel.category || 'general';
          });
          return panelList;
        },
        all: function() {return _all;},
        allList: function() {return _allList;},
        categories: function() {return _categories;}
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
