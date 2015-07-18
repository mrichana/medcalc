var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var HASBLED = (function (_super) {
        __extends(HASBLED, _super);
        function HASBLED() {
            _super.apply(this, arguments);
            this.id = 'HASBLED';
            this.name = 'HAS-BLED Score';
            this.category = 'cardiology';
            this.template = 'calculator.basic';
            this.defaultValues = {
                BloodPressure_Systolic: 120,
                Plasma_Creatinine: 1,
                HistoryOf_HepaticFailure: false,
                HistoryOf_Stroke: false,
                HistoryOf_Bleeding: false,
                HistoryOf_UncontrolledINR: false,
                Age: 60,
                HASBLED_Drugs: false,
                HistoryOf_Alcohol: false
            };
            this.fields = [
                CalculatorViews.bloodPressure_SystolicField,
                {
                    id: 'Plasma_Creatinine',
                    name: 'Κρεατινίνη Πλάσματος',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'HistoryOf_HepaticFailure',
                    name: 'Ηπατική Νόσος',
                    description: 'Κίρρωση, Χολερυθρίνη>2xΦυσιολογικό, Τρανσαμινάσες>3xΦυσιολογικό',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_Stroke',
                    name: 'Ιστορικό ΑΕΕ',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_Bleeding',
                    name: 'Αιμορραγική διάθεση',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_UncontrolledINR',
                    name: 'Δύσκολα ρυθμιζόμενο INR',
                    input: {
                        type: 'check'
                    }
                },
                CalculatorViews.ageField,
                {
                    id: 'HASBLED_Drugs',
                    name: 'Φάρμακα',
                    description: 'Αντιαιμοπεταλιακά, ΜΣΑΦ',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_Alcohol',
                    name: 'Ιστορικό χρήσης Αλκοόλ',
                    input: {
                        type: 'check'
                    }
                },
                CalculatorViews.resultField
            ];
        }
        HASBLED.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = 0;
            ret.result += (values.BloodPressure_Systolic > 160) ? 1 : 0;
            ret.result += (values.Plasma_Creatinine > 2.6) ? 1 : 0;
            ret.result += (values.HistoryOf_HepaticFailure) ? 1 : 0;
            ret.result += (values.HistoryOf_Stroke) ? 1 : 0;
            ret.result += (values.HistoryOf_Bleeding) ? 1 : 0;
            ret.result += (values.HistoryOf_UncontrolledINR) ? 1 : 0;
            ret.result += (values.Age > 65) ? 1 : 0;
            ret.result += (values.HASBLED_Drugs) ? 1 : 0;
            ret.result += (values.HistoryOf_Alcohol) ? 1 : 0;
            switch (ret.result) {
                case 0:
                    ret.explanation = 'Ο κίνδυνος είναι 0.9%';
                    ret.resultlevel = 0;
                    break;
                case 1:
                    ret.explanation = 'Ο κίνδυνος είναι 3.4%';
                    ret.resultlevel = 0;
                    break;
                case 2:
                    ret.explanation = 'Ο κίνδυνος είναι 4.1%';
                    ret.resultlevel = 1;
                    break;
                case 3:
                    ret.explanation = 'Ο κίνδυνος είναι 5.8%';
                    ret.resultlevel = 1;
                    break;
                case 4:
                    ret.explanation = 'Ο κίνδυνος είναι 8.9%';
                    ret.resultlevel = 2;
                    break;
                case 5:
                    ret.explanation = 'Ο κίνδυνος είναι 9.1%';
                    ret.resultlevel = 2;
                    break;
                default:
                    ret.explanation = 'Δεν έχει υπολογισθεί ο κίνδυνος';
                    ret.resultlevel = 3;
                    break;
            }
            return ret;
        };
        ;
        HASBLED.Ctor = (function () { return CalculatorViews.viewsCollection.add([new HASBLED()]); })();
        return HASBLED;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=HASBLED.js.map