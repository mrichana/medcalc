var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var ECG_Duke_Treadmill_Score = (function (_super) {
        __extends(ECG_Duke_Treadmill_Score, _super);
        function ECG_Duke_Treadmill_Score() {
            _super.apply(this, arguments);
            this.id = 'ECG_Duke_Treadmill_Score';
            this.name = 'Duke Treadmill Score (DTS)';
            this.category = 'ecg';
            this.template = 'calculator.basic';
            this.defaultValues = {
                ECG_Bruce_ExerciseTime: 21,
                ECG_Bruce_STDeviation: 0,
                ECG_Bruce_AnginaIndex: 0
            };
            this.fields = [
                {
                    id: 'ECG_Bruce_ExerciseTime',
                    name: 'Διάρκεια κόπωσης κατά Bruce (min)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 21
                    }
                }, {
                    id: 'ECG_Bruce_STDeviation',
                    name: 'Μεταβολή ST (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 10
                    }
                }, {
                    id: 'ECG_Bruce_AnginaIndex',
                    name: 'Τύπος προκάρδιου άλγους',
                    input: {
                        type: 'select',
                        options: [{
                                value: 0,
                                name: 'Απών'
                            }, {
                                value: 1,
                                name: 'Χωρίς περιορισμό στην κόπωση'
                            }, {
                                value: 2,
                                name: 'Με περιορισμό στην κόπωση'
                            }]
                    }
                },
                CalculatorViews.resultField
            ];
        }
        ECG_Duke_Treadmill_Score.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = 'ECG_Bruce_ExerciseTime - 5*ECG_Bruce_STDeviation - 4*ECG_Bruce_AnginaIndex';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            if (ret.result >= 5) {
                ret.explanation = 'Χαμηλός κίνδυνος (Θνησιμότητα στο έτος: 0.25%)';
                ret.resultlevel = 0;
            }
            else if (ret.result >= -11) {
                ret.explanation = 'Ενδιάμεσος κίνδυνος (Θνησιμότητα στο έτος: 1.25%)';
                ret.resultlevel = 2;
            }
            else {
                ret.explanation = 'Υψηλός κίνδυνος (Θνησιμότητα στο έτος: 5.25%)';
                ret.resultlevel = 3;
            }
            return ret;
        };
        ;
        ECG_Duke_Treadmill_Score.Ctor = (function () { return CalculatorViews.viewsCollection.add([new ECG_Duke_Treadmill_Score()]); })();
        return ECG_Duke_Treadmill_Score;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=ECG_Duke_Treadmill_Score.js.map