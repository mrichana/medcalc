var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Calc = (function (_super) {
        __extends(Calc, _super);
        function Calc() {
            _super.apply(this, arguments);
            this.id = 'Calc';
            this.name = 'Υπολογιστής';
            this.category = 'generic';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Calculation: ''
            };
            this.fields = [
                {
                    id: 'Calculation',
                    name: 'Υπολογισμός',
                    value: '',
                    input: {
                        type: 'text'
                    }
                },
                CalculatorViews.resultField
            ];
        }
        Calc.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            try {
                ret.formula = values.Calculation;
                ret.result = math.eval(ret.formula);
                ret.resultlevel = 0;
                if (!angular.isNumber(ret.result)) {
                    throw 'nan';
                }
                if (!isFinite(ret.result)) {
                    ret.result = 'Άπειρο';
                    ret.resultlevel = 2;
                }
            }
            catch (err) {
                ret.result = 'Λάθος Υπολογισμός';
                ret.resultlevel = 3;
            }
            return ret;
        };
        ;
        Calc.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Calc()]); })();
        return Calc;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Calc.js.map