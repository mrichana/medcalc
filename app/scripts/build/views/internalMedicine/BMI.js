var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var BMI = (function (_super) {
        __extends(BMI, _super);
        function BMI() {
            _super.apply(this, arguments);
            this.id = 'BMI';
            this.name = 'Δείκτης Μάζας Σώματος';
            this.category = 'generic';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Height: 170,
                Weight: 70
            };
            this.fields = [
                CalculatorViews.heightField,
                CalculatorViews.weightField,
                CalculatorViews.resultField
            ];
        }
        BMI.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = 'Weight / (Height/100) ^ 2';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            if (ret.result > 40) {
                ret.explanation = 'Νοσογόνος Παχυσαρκία';
                ret.resultlevel = 3;
            }
            else if (ret.result > 35) {
                ret.explanation = 'Παχύσαρκος';
                ret.resultlevel = 3;
            }
            else if (ret.result > 30) {
                ret.explanation = 'Ήπια Παχύσαρκος';
                ret.resultlevel = 2;
            }
            else if (ret.result > 25) {
                ret.explanation = 'Υπέρβαρος';
                ret.resultlevel = 1;
            }
            else if (ret.result > 18.5) {
                ret.explanation = 'Υγειές Βάρος';
                ret.resultlevel = 0;
            }
            else if (ret.result > 16) {
                ret.explanation = 'Ελιποβαρής';
                ret.resultlevel = 1;
            }
            else if (ret.result > 15) {
                ret.explanation = 'Έντονα Ελιποβαρής';
                ret.resultlevel = 3;
            }
            else {
                ret.explanation = 'Καχεκτικός';
                ret.resultlevel = 3;
            }
            return ret;
        };
        ;
        BMI.Ctor = (function () { return CalculatorViews.viewsCollection.add([new BMI()]); })();
        return BMI;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=BMI.js.map