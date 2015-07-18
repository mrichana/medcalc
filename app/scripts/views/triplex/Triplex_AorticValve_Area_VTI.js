var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Triplex_AorticValve_Area_VTI = (function (_super) {
        __extends(Triplex_AorticValve_Area_VTI, _super);
        function Triplex_AorticValve_Area_VTI() {
            _super.apply(this, arguments);
            this.id = 'Triplex_AorticValve_Area_VTI';
            this.name = 'Aortic Valve Area (VTI)';
            this.category = 'triplex';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_LVOT_Diameter: 20,
                Triplex_LVOT_VTI: 20,
                Triplex_AorticValve_VTI: 40
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
                }, {
                    id: 'Triplex_AorticValve_VTI',
                    name: 'AV VTI<sub>2</sub> (cm)',
                    description: 'Διαβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
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
        Triplex_AorticValve_Area_VTI.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = '(pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI / Triplex_AorticValve_VTI';
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
        Triplex_AorticValve_Area_VTI.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Triplex_AorticValve_Area_VTI()]); })();
        return Triplex_AorticValve_Area_VTI;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Triplex_AorticValve_Area_VTI.js.map