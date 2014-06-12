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
            add: function(viewList) {
                _allList = _.union(_allList, viewList);
                _all = _.indexBy(_allList, 'id');
                _categories = _.reduce(_allList, function(memo, view) {
                    var categories = view.category ? view.category.split(/\W+/g) : ['generic'];
                    _.each(categories, function(category) {
                        memo[category] = memo[category] || {};
                        memo[category][view.id] = view;
                    });
                    return memo;
                }, {});

                return viewList;
            },
            all: function() {
                return _all;
            },
            allList: function() {
                return _allList;
            },
            categories: function() {
                return _categories;
            }
        };
    }).factory('update', ['calculators',
        function(calculators) {
            return function(newValue, oldValue, scope, field) {
                var result = {};
                if (!this.calculator) {
                    this.calculator = calculators[this.id];
                }
                if (this.calculator) {
                    result = this.calculator(this.values);
                    this.values[this.id] = result.result;
                }
                if (scope.view && scope.view.validate) {
                    scope.view.validate(newValue, scope, field);
                }

                return result;
            };
        }
    ]).factory('init', function() {
        return function() {
            this.values = this.values || {};
            _.defaults(this.values, this.defaultValues);
        };
    }).factory('reset', function() {
        return function() {
            _.extend(this.values, this.defaultValues);
        };
    });
})();
