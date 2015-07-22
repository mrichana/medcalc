var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Triplex_AorticValve_Impedance = (function (_super) {
        __extends(Triplex_AorticValve_Impedance, _super);
        function Triplex_AorticValve_Impedance() {
            _super.apply(this, arguments);
            this.id = 'Triplex_AorticValve_Impedance';
            this.name = 'Aorto-Valvular Impedance (Zva)';
            this.category = 'triplex AoV Stenosis';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_LVOT_Diameter: 20,
                Triplex_LVOT_VTI: 20,
                BSA: 1.82,
                BloodPressure_Systolic: 120,
                Triplex_AorticValve_Vmean: 1
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
                    id: 'BSA',
                    name: 'BSA (m<sup>2</sup>)',
                    calculator: 'BSA',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 3
                    }
                }, {
                    id: 'BloodPressure_Systolic',
                    name: 'Συστολική Πίεση',
                    input: {
                        type: 'number',
                        step: 5,
                        min: 60,
                        max: 280
                    }
                }, {
                    id: 'Triplex_AorticValve_Vmean',
                    name: 'AV Vmean(m/s)',
                    description: 'Διαβαλβιδική Μέση Ταχύτητα',
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
        Triplex_AorticValve_Impedance.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = '( BloodPressure_Systolic + 4 * Triplex_AorticValve_Vmean ^ 2 ) / ( ( ( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI ) / BSA )';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            if (ret.result >= 5.5) {
                ret.explanation = 'Πολύ Υψηλή Αορτοβαλβιδική Αντίσταση';
                ret.resultlevel = 3;
            }
            else if (ret.result >= 4.5) {
                ret.explanation = 'Υψηλή Αορτοβαλβιδική Αντίσταση';
                ret.resultlevel = 2;
            }
            else if (ret.result > 3.50) {
                ret.explanation = 'Μέτρια Αορτοβαλβιδική Αντίσταση';
                ret.resultlevel = 1;
            }
            else {
                ret.explanation = 'Μικρή Αορτοβαλβιδική Αντίσταση';
                ret.resultlevel = 0;
            }
            return ret;
        };
        ;
        Triplex_AorticValve_Impedance.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('Triplex_AorticValve_Impedance', 'Aorto-Valvular Impedance (Zva)', 'triplex AoV Stenosis', Triplex_AorticValve_Impedance)); })();
        return Triplex_AorticValve_Impedance;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Triplex_AorticValve_Impedance.js.map