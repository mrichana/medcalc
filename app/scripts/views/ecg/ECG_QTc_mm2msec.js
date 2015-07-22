var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var ECG_QT = (function (_super) {
        __extends(ECG_QT, _super);
        function ECG_QT() {
            _super.apply(this, arguments);
            this.id = 'ECG_QT';
            this.name = 'mm σε msec';
            this.category = 'hidden';
            this.template = 'calculator.basic';
            this.defaultValues = {
                ECG_QTmm: 10,
                ECG_PaperSpeed: 25
            };
            this.fields = [
                {
                    id: 'ECG_QTmm',
                    name: 'Διάστημα (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 1000
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
        ECG_QT.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = 'ECG_QTmm * (1/ECG_PaperSpeed) * 1000';
            ret.result = CalculatorViews.View.evaluator(values, ret.formula);
            ret.suffix = 'msec';
            return ret;
        };
        ;
        ECG_QT.Ctor = (function () { return CalculatorViews.viewsCollection.add([new ECG_QT()]); })();
        return ECG_QT;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=ECG_QTc_mm2msec.js.map