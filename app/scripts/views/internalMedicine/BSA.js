var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var BSA = (function (_super) {
        __extends(BSA, _super);
        function BSA() {
            _super.apply(this, arguments);
            this.id = 'BSA';
            this.name = 'Επιφάνεια Σώματος (BSA)';
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
        BSA.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = 'sqrt (( Height * Weight ) / 3600)';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula), 2);
            ret.resultlevel = 0;
            return ret;
        };
        ;
        BSA.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('BSA', 'Επιφάνεια Σώματος (BSA)', 'generic', BSA)); })();
        return BSA;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=BSA.js.map