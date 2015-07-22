var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var ECG_Sokolow = (function (_super) {
        __extends(ECG_Sokolow, _super);
        function ECG_Sokolow() {
            _super.apply(this, arguments);
            this.id = 'ECG_Sokolow';
            this.name = 'Δείκτης Sokolow-Lyon';
            this.category = 'ecg';
            this.template = 'calculator.basic';
            this.defaultValues = {
                ECG_V1S: 10,
                ECG_V5R: 10,
                ECG_V6R: 10,
                ECG_aVLR: 10
            };
            this.fields = [
                {
                    id: 'ECG_V1S',
                    name: 'Κύμα S στην V1 (mV)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'ECG_V5R',
                    name: 'Κύμα R στην V5 (mV)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'ECG_V6R',
                    name: 'Κύμα R στην V6 (mV)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'ECG_aVLR',
                    name: 'Κύμα R στην aVL (mV)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                },
                CalculatorViews.resultField
            ];
        }
        ECG_Sokolow.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            var hypertrophy = values.ECG_V1S + Math.max(values.ECG_V5R, values.ECG_V6R) >= 35 || values.ECG_aVLR >= 11;
            if (hypertrophy) {
                ret.result = 'Θετικός για υπερτροφία μυοκαρδίου';
                ret.explanation = 'Ειδικότητα 100%';
                ret.resultlevel = 3;
            }
            else {
                ret.result = 'Αρνητικός για υπερτροφία μυοκαρδίου';
                ret.explanation = 'Ευαισθησία 22%';
                ret.resultlevel = 0;
            }
            return ret;
        };
        ;
        ECG_Sokolow.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('ECG_Sokolow', 'Δείκτης Sokolow-Lyon', 'ecg', ECG_Sokolow)); })();
        return ECG_Sokolow;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=ECG_Sokolow.js.map