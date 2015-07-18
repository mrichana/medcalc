var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Triplex_AorticValve_Area_Vmax = (function (_super) {
        __extends(Triplex_AorticValve_Area_Vmax, _super);
        function Triplex_AorticValve_Area_Vmax() {
            _super.apply(this, arguments);
            this.id = 'Triplex_AorticValve_Area_Vmax';
            this.name = 'Aortic Valve Area (Vmax)';
            this.category = 'triplex';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_LVOT_Diameter: 20,
                Triplex_LVOT_Vmax: 1,
                Triplex_AorticValve_Vmax: 1
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
                    id: 'Triplex_LVOT_Vmax',
                    name: 'LVOT Vmax<sub>1</sub> (m/s)',
                    description: 'Υποβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'Triplex_AorticValve_Vmax',
                    name: 'AV Vmax<sub>2</sub> (m/s)',
                    description: 'Διαβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, CalculatorViews.resultField, {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: 'images/AVVR.png'
                }
            ];
        }
        Triplex_AorticValve_Area_Vmax.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = '(pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_Vmax / Triplex_AorticValve_Vmax';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula), 2);
            if (ret.result < 1.0) {
                ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
                ret.resultlevel = 3;
            }
            else if (ret.result <= 1.50) {
                ret.explanation = 'Μέτρια στένωση αορτικής βαλβίδας';
                ret.resultlevel = 2;
            }
            else {
                ret.explanation = 'Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας';
                ret.resultlevel = 0;
            }
            return ret;
        };
        ;
        Triplex_AorticValve_Area_Vmax.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Triplex_AorticValve_Area_Vmax()]); })();
        return Triplex_AorticValve_Area_Vmax;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Triplex_AorticValve_Area_Vmax.js.map