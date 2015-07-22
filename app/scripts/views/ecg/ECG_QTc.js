var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var ECG_QTc = (function (_super) {
        __extends(ECG_QTc, _super);
        function ECG_QTc() {
            _super.apply(this, arguments);
            this.id = 'ECG_QTc';
            this.name = 'Διορθωμένο QT';
            this.category = 'ecg';
            this.template = 'calculator.basic';
            this.defaultValues = {
                HeartRate: 70,
                ECG_QT: 400
            };
            this.fields = [
                {
                    id: 'ECG_QT',
                    name: 'Διάστημα QT(msec)',
                    calculator: 'ECG_QT',
                    input: {
                        type: 'number',
                        step: 10,
                        min: 200,
                        max: 1000
                    }
                }, {
                    id: 'HeartRate',
                    name: 'Σφύξεις',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 20,
                        max: 280
                    }
                },
                CalculatorViews.resultField
            ];
        }
        ECG_QTc.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = 'ECG_QT / sqrt(60 / HeartRate)';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            if (ret.result >= 480) {
                ret.explanation = 'Έντονα παρατεταμένο QT';
                ret.resultlevel = 3;
            }
            else if (ret.result >= 460) {
                ret.explanation = 'Παρατεταμένο QT';
                ret.resultlevel = 2;
            }
            else if (ret.result >= 440) {
                ret.explanation = 'Μικρή παράταση QT';
                ret.resultlevel = 1;
            }
            else if (ret.result <= 330) {
                ret.explanation = 'Έντονη βράχυνση QT';
                ret.resultlevel = 3;
            }
            else if (ret.result <= 350) {
                ret.explanation = 'Βραχύ QT';
                ret.resultlevel = 2;
            }
            else if (ret.result <= 370) {
                ret.explanation = 'Μικρή βράχυνση QT';
                ret.resultlevel = 1;
            }
            else {
                ret.explanation = 'Φυσιολογικό QT';
                ret.resultlevel = 0;
            }
            return ret;
        };
        ;
        ECG_QTc.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('ECG_QTc', 'Διορθωμένο QT', 'ecg', ECG_QTc)); })();
        return ECG_QTc;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=ECG_QTc.js.map