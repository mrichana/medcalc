var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var ECG_Heart_Rate = (function (_super) {
        __extends(ECG_Heart_Rate, _super);
        function ECG_Heart_Rate() {
            _super.apply(this, arguments);
            this.id = 'ECG_Heart_Rate';
            this.name = 'Καρδιακή Συχνότητα';
            this.category = 'ecg';
            this.template = 'calculator.basic';
            this.defaultValues = {
                ECG_HRQRS2QRSmm: 21,
                ECG_Cycles: 1,
                ECG_PaperSpeed: 25
            };
            this.fields = [
                {
                    id: 'ECG_HRQRS2QRSmm',
                    name: 'Απόσταση από QRS σε QRS(mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 100
                    }
                }, {
                    id: 'ECG_Cycles',
                    name: 'Αριθμός κύκλων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 10
                    }
                }, {
                    id: 'ECG_PaperSpeed',
                    name: 'Ταχύτητα χαρτιού (mm/sec)',
                    input: {
                        type: 'select',
                        options: [
                            { name: '25', value: 25 },
                            { name: '50', value: 50 }
                        ]
                    }
                },
                CalculatorViews.resultField
            ];
        }
        ECG_Heart_Rate.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = '60*ECG_PaperSpeed/ECG_HRQRS2QRSmm/ECG_Cycles';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            ret.suffix = ' BPM';
            ret.resultlevel = 0;
            return ret;
        };
        ;
        ECG_Heart_Rate.Ctor = (function () { return CalculatorViews.viewsCollection.add([new ECG_Heart_Rate()]); })();
        return ECG_Heart_Rate;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=ECG_Heart_Rate.js.map