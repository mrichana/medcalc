var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var CHADScore = (function (_super) {
        __extends(CHADScore, _super);
        function CHADScore() {
            _super.apply(this, arguments);
            this.id = 'CHADScore';
            this.name = 'CHA2DS2-VASc Score';
            this.category = 'cardiology af';
            this.template = 'calculator.basic';
            this.defaultValues = {
                'HistoryOf_CHF': false,
                'HistoryOf_Hypertension': false,
                'Age': 65,
                'HistoryOf_Diabetes': false,
                'HistoryOf_Stroke': false,
                'HistoryOf_VascularDisease': false,
                'Sex': 0
            };
            this.fields = [
                {
                    id: 'HistoryOf_CHF',
                    name: 'Συμφορητική Καρδιακή Ανεπάρκεια',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_Hypertension',
                    name: 'Αρτηριακή Υπέρταση',
                    input: {
                        type: 'check'
                    }
                },
                {
                    id: 'HistoryOf_Diabetes',
                    name: 'Σακχαρώδης Διαβήτης',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_Stroke',
                    name: 'Ιστορικό TIA ή εγκεφαλικού',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_VascularDisease',
                    name: 'Περιφερική Αγγειοπάθεια',
                    value: false,
                    input: {
                        type: 'check'
                    }
                },
                CalculatorViews.ageField,
                CalculatorViews.sexField,
                CalculatorViews.resultField
            ];
        }
        CHADScore.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = 0;
            ret.result += values.HistoryOf_CHF ? 1 : 0;
            ret.result += values.HistoryOf_Hypertension ? 1 : 0;
            ret.result += values.Age > 65 ? 1 : 0;
            ret.result += values.Age > 75 ? 1 : 0;
            ret.result += values.HistoryOf_Diabetes ? 1 : 0;
            ret.result += values.HistoryOf_Stroke ? 2 : 0;
            ret.result += values.HistoryOf_VascularDisease ? 1 : 0;
            ret.result += values.Sex ? 1 : 0;
            var explanations = [0, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 6.7, 15.2];
            ret.explanation = 'Πιθανότητα ισχαιμικού ΑΕΕ: ' + explanations[ret.result] + '% ανά έτος';
            switch (ret.result) {
                case 0:
                    ret.resultlevel = 0;
                    break;
                case 1:
                case 2:
                    ret.resultlevel = 1;
                    break;
                default:
                    ret.resultlevel = 2;
            }
            return ret;
        };
        ;
        CHADScore.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('CHADScore', 'CHA2DS2-VASc Score', 'cardiology af', CHADScore)); })();
        return CHADScore;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=CHADScore.js.map