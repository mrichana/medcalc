var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var CRUSADEScore = (function (_super) {
        __extends(CRUSADEScore, _super);
        function CRUSADEScore() {
            _super.apply(this, arguments);
            this.id = 'CRUSADEScore';
            this.name = 'CRUSADE Score';
            this.category = 'cardiology stemi nstemi';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Hematocrit: 40,
                GFR: 73,
                HeartRate: 70,
                BloodPressure_Systolic: 120,
                HistoryOf_VascularDisease: false,
                HistoryOf_Diabetes: false,
                CRUSADEScore_CHFAtPresentation: false,
                Sex: 0
            };
            this.fields = [
                {
                    id: 'Hematocrit',
                    name: 'Αιματοκρίτης κατά την εισαγωγή',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 10,
                        max: 70
                    }
                }, {
                    id: 'GFR',
                    name: 'GFR',
                    calculator: 'GFR',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0,
                        max: 250
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
                },
                CalculatorViews.bloodPressure_SystolicField, {
                    id: 'HistoryOf_VascularDisease',
                    name: 'Ιστορικό αγγειακής νόσου',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'HistoryOf_Diabetes',
                    name: 'Σακχαρώδης Διαβήτης',
                    input: {
                        type: 'check'
                    }
                }, {
                    id: 'CRUSADEScore_CHFAtPresentation',
                    name: 'Καρδιακή ανεπάρκεια κατά την εισαγωγή',
                    input: {
                        type: 'check'
                    }
                },
                CalculatorViews.sexField,
                CalculatorViews.resultField
            ];
        }
        CRUSADEScore.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = 0;
            if (values.Hematocrit >= 40) {
                ret.result += 0;
            }
            else if (values.Hematocrit >= 37) {
                ret.result = 2;
            }
            else if (values.Hematocrit >= 34) {
                ret.result = 3;
            }
            else if (values.Hematocrit >= 31) {
                ret.result = 7;
            }
            else {
                ret.result = 9;
            }
            if (values.GFR > 120) {
                ret.result += 0;
            }
            else if (values.GFR > 90) {
                ret.result += 7;
            }
            else if (values.GFR > 60) {
                ret.result += 17;
            }
            else if (values.GFR > 30) {
                ret.result += 28;
            }
            else {
                ret.result += 35;
            }
            if (values.HeartRate > 120) {
                ret.result += 11;
            }
            else if (values.HeartRate > 110) {
                ret.result += 10;
            }
            else if (values.HeartRate > 100) {
                ret.result += 8;
            }
            else if (values.HeartRate > 90) {
                ret.result += 6;
            }
            else if (values.HeartRate > 80) {
                ret.result += 3;
            }
            else if (values.HeartRate > 70) {
                ret.result += 1;
            }
            else {
                ret.result += 0;
            }
            if (values.BloodPressure_Systolic > 200) {
                ret.result += 5;
            }
            else if (values.BloodPressure_Systolic > 180) {
                ret.result += 3;
            }
            else if (values.BloodPressure_Systolic > 120) {
                ret.result += 1;
            }
            else if (values.BloodPressure_Systolic > 100) {
                ret.result += 5;
            }
            else if (values.BloodPressure_Systolic > 90) {
                ret.result += 8;
            }
            else {
                ret.result += 10;
            }
            var probability = [2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4, 4.1, 4.3, 4.4, 4.6, 4.7, 4.9, 5, 5.2, 5.4, 5.6, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9, 7.2, 7.4, 7.6, 7.9, 8.1, 8.4, 8.6, 8.9, 9.2, 9.5, 9.8, 10.1, 10.4, 10.7, 11.1, 11.4, 11.7, 12.1, 12.5, 12.8, 13.2, 13.6, 14, 14.4, 14.9, 15.3, 15.7, 16.2, 16.7, 17.1, 17.6, 18.1, 18.6, 19.2, 19.7, 20.2, 20.8, 21.4, 21.9, 22.5, 23.1, 23.7, 24.4, 25, 25.6, 26.3, 27, 27.6, 28.3, 29, 29.7, 30.4, 31.2, 31.9, 32.6, 33.4, 34.2, 34.9, 35.7, 36.5, 37.3, 38.1, 38.9, 39.7, 40.5, 41.3, 42.2, 43, 43.8];
            ret.result += values.HistoryOf_VascularDisease ? 6 : 0;
            ret.result += values.HistoryOf_Diabetes ? 6 : 0;
            ret.result += values.CRUSADEScore_CHFAtPresentation ? 7 : 0;
            ret.result += values.Sex ? 8 : 0;
            ret.explanation = 'Πιθανότητα σοβαρής αιμορραγίας κατά την νοσηλεία: ' + probability[ret.result] + '%';
            if (ret.result >= 40) {
                ret.resultlevel = 3;
            }
            else if (ret.result >= 30) {
                ret.resultlevel = 2;
            }
            else {
                ret.resultlevel = 1;
            }
            return ret;
        };
        ;
        CRUSADEScore.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('CRUSADEScore', 'CRUSADE Score', 'cardiology stemi nstemi', CRUSADEScore)); })();
        return CRUSADEScore;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=CRUSADEScore.js.map