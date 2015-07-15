var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var WellsScore = (function (_super) {
        __extends(WellsScore, _super);
        function WellsScore() {
            _super.apply(this, arguments);
            this.id = 'WellsScore';
            this.name = 'Κριτήρια του Wells';
            this.category = 'pulmonology';
            this.template = 'calculator.basic';
            this.defaultValues = {
                'HistoryOf_DVT': false,
                'HeartRate': 70,
                'HistoryOf_Immobilization': false,
                'Haemoptysis': false,
                'Cancer': false,
                'DVT': false,
                'PEMostLikely': false
            };
            this.fields = [
                {
                    id: 'HistoryOf_DVT',
                    name: 'Ιστορικό PE ή DVT',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HeartRate',
                    name: 'Σφύξεις κατά την εισαγωγή',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 20,
                        max: 280
                    }
                }, {
                    id: 'HistoryOf_Immobilization',
                    name: 'Ακινητοποίηση ή πρόσφατο χειρουργείο',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'Haemoptysis',
                    name: 'Αιμόπτυση',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'Cancer',
                    name: 'Ενεργός καρκίνος',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'DVT',
                    name: 'Κλινικά σημεία DVT',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'PEMostLikely',
                    name: 'Διάγνωση PE πιο πιθανή από εναλλακτικές',
                    input: {
                        type: 'check'
                    }
                },
                CalculatorViews.resultField
            ];
        }
        WellsScore.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = 0;
            ret.result += values.HistoryOf_DVT * 1.5;
            ret.result += (values.HeartRate > 100) ? 1.5 : 0;
            ret.result += values.HistoryOf_Immobilization * 1.5;
            ret.result += values.Haemoptysis * 1;
            ret.result += values.Cancer * 1;
            ret.result += values.DVT * 3;
            ret.result += values.PEMostLikely * 3;
            if (ret.result >= 7) {
                ret.explanation = "Υψηλή κλινική πιθανότητα";
                ret.resultlevel = 3;
            }
            else if (ret.result >= 2) {
                ret.explanation = "Ενδιάμεση κλινική πιθανότητα";
                ret.resultlevel = 2;
            }
            else {
                ret.explanation = "Χαμηλή κλινική πιθανότητα";
                ret.resultlevel = 0;
            }
            ;
            return ret;
        };
        ;
        WellsScore.Ctor = (function () { return CalculatorViews.viewsCollection.add([new WellsScore()]); })();
        return WellsScore;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=WellsScore.js.map