var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Triplex_Stroke_Volume = (function (_super) {
        __extends(Triplex_Stroke_Volume, _super);
        function Triplex_Stroke_Volume() {
            _super.apply(this, arguments);
            this.id = 'Triplex_Stroke_Volume';
            this.name = 'Stroke Volume (SV)';
            this.category = 'triplex';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_LVOT_Diameter: 20,
                Triplex_LVOT_VTI: 20,
            };
            this.fields = [
                {
                    id: 'Triplex_LVOT_Diameter',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'Triplex_LVOT_VTI',
                    name: 'LVOT VTI<sub>1</sub> (cm)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
                    }
                }, CalculatorViews.resultField
            ];
        }
        Triplex_Stroke_Volume.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = '( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            if (ret.result < 60) {
                ret.resultlevel = 3;
            }
            else {
                ret.resultlevel = 1;
            }
            return ret;
        };
        ;
        Triplex_Stroke_Volume.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Triplex_Stroke_Volume()]); })();
        return Triplex_Stroke_Volume;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Triplex_Stroke_Volume.js.map