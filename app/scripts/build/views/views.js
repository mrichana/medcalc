var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var viewsCollection = (function () {
        function viewsCollection() {
        }
        viewsCollection.add = function (viewList) {
            viewsCollection._allList = _.union(viewsCollection._allList, viewList);
            viewsCollection._all = _.indexBy(viewsCollection._allList, 'id');
            _.each(viewsCollection._allList, function (view) {
                _.each(view.fields, function (field) {
                    if (field.calculator && viewsCollection._all[field.calculator]) {
                        field.calculatorView = angular.copy(viewsCollection._all[field.calculator]);
                        field.calculatorView.parent = view;
                    }
                });
            });
            viewsCollection._categories = _.reduce(viewsCollection._allList, function (memo, view) {
                var categories = view.category ? view.category.split(/\W+/g) : ['generic'];
                _.each(categories, function (category) {
                    memo[category] = memo[category] || {};
                    memo[category][view.id] = view;
                });
                return memo;
            }, {});
        };
        ;
        viewsCollection.all = function () {
            return viewsCollection._all;
        };
        ;
        viewsCollection.allList = function () {
            return viewsCollection._allList;
        };
        ;
        viewsCollection.categories = function () {
            return viewsCollection._categories;
        };
        viewsCollection._allList = [];
        viewsCollection._categories = {};
        viewsCollection._all = {};
        return viewsCollection;
    })();
    CalculatorViews.viewsCollection = viewsCollection;
    var Result = (function () {
        function Result() {
        }
        return Result;
    })();
    CalculatorViews.Result = Result;
    var View = (function () {
        function View() {
        }
        View.prototype.init = function () {
            _.defaults(this.values, this.defaultValues);
        };
        View.prototype.reset = function () {
            _.extend(this.values, this.defaultValues);
        };
        View.prototype.update = function (newValue, oldValue, scope, field) {
            this.validate(newValue, oldValue, scope, field);
            var result = this.calculator(this.values);
            this.values[this.id] = result.result;
            return result;
        };
        View.prototype.validate = function (newValue, oldValue, scope, field) {
        };
        View.roundNum = function (thisNum, dec) {
            dec = dec || 0;
            thisNum = thisNum * Math.pow(10, dec);
            thisNum = Math.round(thisNum);
            thisNum = thisNum / Math.pow(10, dec);
            return thisNum;
        };
        ;
        View.evaluator = function (scope, formula) {
            return math.compile(formula).eval(scope);
        };
        View.prototype.calculator = function (values) {
            return new Result();
        };
        return View;
    })();
    CalculatorViews.View = View;
    var GeneralField = (function () {
        function GeneralField(id, name, input) {
            this.id = id;
            this.name = name;
            this.input = input;
        }
        return GeneralField;
    })();
    CalculatorViews.GeneralField = GeneralField;
    CalculatorViews.ageField = new GeneralField('Age', 'Ηλικία', { type: 'number', step: 1, min: 1, max: 120 });
    CalculatorViews.sexField = new GeneralField('Sex', 'Φύλο', { type: 'select', options: [{ value: 0, name: '♂ Άρρεν' }, { value: 1, name: '♀ Θήλυ' }] });
    CalculatorViews.heightField = new GeneralField('Height', 'Ύψος (cm)', { type: 'number', step: 1, min: 0, max: 250 });
    CalculatorViews.weightField = new GeneralField('Weight', 'Βάρος (kgr)', { type: 'number', step: 1, min: 0, max: 250 });
    CalculatorViews.bloodPressure_SystolicField = new GeneralField('BloodPressure_Systolic', 'Συστολική Αρτηριακή Πίεση', { type: 'number', step: 5, min: 50, max: 280 });
    CalculatorViews.resultField = new GeneralField('result', '', { type: 'result' });
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=views.js.map