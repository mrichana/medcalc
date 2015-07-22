var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var PESI = (function (_super) {
        __extends(PESI, _super);
        function PESI() {
            _super.apply(this, arguments);
            this.id = 'PESI';
            this.name = 'Δείκτης σοβαρότητας Πνευμονικής Εμβολής (PESI)';
            this.category = 'pulmonology pe';
            this.template = 'calculator.basic';
            this.defaultValues = {
                'Age': 65,
                'Sex': 0,
                'Cancer': false,
                'HistoryOf_CHF': false,
                'HistoryOf_PulmonaryDisease': false,
                'HeartRate': 70,
                'BloodPressure_Systolic': 120,
                'BreathRate': 16,
                'BodyTemperature': 36.6,
                'AltMentalStatus': false,
                'ArterialBlood_pO2': 100
            };
            this.fields = [
                CalculatorViews.ageField, CalculatorViews.sexField,
                {
                    id: 'Cancer',
                    name: 'Ενεργός καρκίνος',
                    input: {
                        type: 'check'
                    }
                },
                {
                    id: 'HistoryOf_CHF',
                    name: 'Συμφορητική Καρδιακή Ανεπάρκεια',
                    input: {
                        type: 'check'
                    }
                },
                {
                    id: 'HistoryOf_PulmonaryDisease',
                    name: 'Χ.Α.Π.',
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
                }, CalculatorViews.bloodPressure_SystolicField,
                {
                    id: 'BreathRate',
                    name: 'Ρυθμός αναπνοής (bpm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 60
                    }
                }, {
                    id: 'BodyTemperature',
                    name: 'Θερμοκρασία σώματος',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 35,
                        max: 43
                    }
                }, {
                    id: 'AltMentalStatus',
                    name: 'Επηρεασμένη πνευματική κατάσταση',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'ArterialBlood_pO2',
                    name: 'pO<sub>2</sub>(mmHg)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 200
                    }
                },
                CalculatorViews.resultField
            ];
        }
        PESI.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = 0;
            ret.result += values.Age;
            ret.result += (values.Sex) ? 0 : 10;
            ret.result += values.Cancer * 30;
            ret.result += values.HistoryOf_CHF * 10;
            ret.result += values.HistoryOf_PulmonaryDisease * 10;
            ret.result += (values.HeartRate >= 110) ? 20 : 0;
            ret.result += (values.BloodPressure_Systolic < 100) ? 30 : 0;
            ret.result += (values.BreathRate > 30) ? 20 : 0;
            ret.result += (values.BodyTemperature < 36) ? 20 : 0;
            ret.result += values.AltMentalStatus * 60;
            ret.result += (values.ArterialBlood_pO2 < 90) ? 20 : 0;
            if (ret.result > 125) {
                ret.explanation = "Class V Πολύ υψηλή θνησιμότητα (10-24.5%)";
                ret.resultlevel = 3;
            }
            else if (ret.result > 105) {
                ret.explanation = "Class IV Υψηλή θνησιμότητα (4-11.4%)";
                ret.resultlevel = 3;
            }
            else if (ret.result > 85) {
                ret.explanation = "Class III Μέτρια θνησιμότητα (3.2-7.1%)";
                ret.resultlevel = 2;
            }
            else if (ret.result > 65) {
                ret.explanation = "Class II Χαμηλή θνησιμότητα (1.7-3.5%)";
                ret.resultlevel = 1;
            }
            else {
                ret.explanation = "Class I Πολύ χαμηλή κλινική θνησιμότητα (0-1.6%)";
                ret.resultlevel = 0;
            }
            ;
            return ret;
        };
        ;
        PESI.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('PESI', 'Δείκτης σοβαρότητας Πνευμονικής Εμβολής (PESI)', 'pulmonology pe', PESI)); })();
        return PESI;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=PESI.js.map