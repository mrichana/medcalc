var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Triplex_AorticValve_VelocityRatio_VTI = (function (_super) {
        __extends(Triplex_AorticValve_VelocityRatio_VTI, _super);
        function Triplex_AorticValve_VelocityRatio_VTI() {
            _super.apply(this, arguments);
            this.id = 'Triplex_AorticValve_VelocityRatio_VTI';
            this.name = 'Aortic Valve VTI Ratio';
            this.category = 'triplex';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_LVOT_VTI: 25,
                Triplex_AorticValve_VTI: 25
            };
            this.fields = [
                {
                    id: 'Triplex_LVOT_VTI',
                    name: 'LVOT VTI<sub>1</sub> (m)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 10,
                        max: 100
                    }
                }, {
                    id: 'Triplex_AorticValve_VTI',
                    name: 'AV VΤΙ<sub>2</sub> (m)',
                    description: 'Διαβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 10,
                        max: 400
                    }
                },
                CalculatorViews.resultField,
                {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: 'images/AVVR.png'
                }
            ];
        }
        Triplex_AorticValve_VelocityRatio_VTI.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = 'Triplex_LVOT_VTI / Triplex_AorticValve_VTI';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula), 2);
            if (ret.result < 0.25) {
                ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
                ret.resultlevel = 3;
            }
            else if (ret.result <= 0.50) {
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
        Triplex_AorticValve_VelocityRatio_VTI.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Triplex_AorticValve_VelocityRatio_VTI()]); })();
        return Triplex_AorticValve_VelocityRatio_VTI;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Triplex_AorticValve_VelocityRatio_VTI.js.map