var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var GenevaScore = (function (_super) {
        __extends(GenevaScore, _super);
        function GenevaScore() {
            _super.apply(this, arguments);
            this.id = 'GenevaScore';
            this.name = 'Score της Γενέβης';
            this.category = 'pulmonology';
            this.template = 'calculator.basic';
            this.defaultValues = {
                'HistoryOf_DVT': false,
                'HeartRate': 70,
                'HistoryOf_Immobilization': false,
                'Haemoptysis': false,
                'Cancer': false,
                'UnilateralLLimbPain': false,
                'UnilateralLLimbOedema': false,
                'Age': 65
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
                    name: 'Πρόσφατο χειρουργείο ή κάταγμα',
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
                    id: 'UnilateralLLimbPain',
                    name: 'Μονόπλευρο άλγος κάτω άκρου',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'UnilateralLLimbOedema',
                    name: 'Άλγος στη ψηλάφηση και οίδημα κάτω άκρου ',
                    input: {
                        type: 'check'
                    }
                },
                CalculatorViews.ageField,
                CalculatorViews.resultField
            ];
        }
        GenevaScore.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = 0;
            ret.result += values.HistoryOf_DVT * 3;
            ret.result += (values.HeartRate >= 75) ? 3 : 0;
            ret.result += (values.HeartRate >= 95) ? 2 : 0;
            ret.result += values.HistoryOf_Immobilization * 2;
            ret.result += values.Haemoptysis * 2;
            ret.result += values.Cancer * 2;
            ret.result += values.UnilateralLLimbPain * 3;
            ret.result += values.UnilateralLLimbOedema * 4;
            ret.result += (values.Age > 65) ? 1 : 0;
            if (ret.result >= 11) {
                ret.explanation = "Υψηλή κλινική πιθανότητα";
                ret.resultlevel = 3;
            }
            else if (ret.result >= 4) {
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
        GenevaScore.Ctor = (function () { return CalculatorViews.viewsCollection.add([new GenevaScore()]); })();
        return GenevaScore;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=GenevaScore.js.map