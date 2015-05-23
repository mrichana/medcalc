!function () {
    "use strict";
    angular.module("medical.calculators", []).factory("evaluator", ["mathParser", function (a) {
        var b = {};
        return function (c, d) {
            return b[d] = b[d] || a.compile(d).eval, b[d](c)
        }
    }]).value("mathParser", mathjs()).value("roundNum", function (a, b) {
        return b = b || 0, a *= Math.pow(10, b), a = Math.round(a), a /= Math.pow(10, b)
    }).factory("calculators", ["patientCalculators", "internalMedicineCalculators", "pulmonologyCalculators", "cardiologyCalculators", "triplexCalculators", function (a, b, c, d, e) {
        return _.extend({}, a, b, c, d, e)
    }])
}(), function () {
    "use strict";
    angular.module("medical.calculators").factory("internalMedicineCalculators", ["mathParser", "roundNum", "evaluator", function (a, b, c) {
        return {
            BMI: function (a) {
                var d = {}, e = _.extend({}, a);
                return d.formula = "Weight / (Height/100) ^ 2", d.result = b(c(e, d.formula)), d.result > 40 ? (d.explanation = "Νοσογόνος Παχυσαρκία", d.resultlevel = 3) : d.result > 35 ? (d.explanation = "Παχύσαρκος", d.resultlevel = 3) : d.result > 30 ? (d.explanation = "Ήπια Παχύσαρκος", d.resultlevel = 2) : d.result > 25 ? (d.explanation = "Υπέρβαρος", d.resultlevel = 1) : d.result > 18.5 ? (d.explanation = "Υγειές Βάρος", d.resultlevel = 0) : d.result > 16 ? (d.explanation = "Ελιποβαρής", d.resultlevel = 1) : d.result > 15 ? (d.explanation = "Έντονα Ελιποβαρής", d.resultlevel = 3) : (d.explanation = "Καχεκτικός", d.resultlevel = 3), d
            }, BSA: function (a) {
                var d = {}, e = _.extend({}, a);
                return d.formula = "sqrt (( Height * Weight ) / 3600)", d.result = b(c(e, d.formula), 2), d.resultlevel = 0, d
            }, Calculator: function (b) {
                var c = {};
                try {
                    if (c.formula = b.Calculation, c.result = a.eval(c.formula), c.resultlevel = 0, !angular.isNumber(c.result))throw"nan";
                    isFinite(c.result) || (c.result = "Άπειρο", c.resultlevel = 2)
                } catch (d) {
                    c.result = "Λάθος Υπολογισμός", c.resultlevel = 3
                }
                return c
            }, GFR: function (a) {
                var d = {};
                return a.GFR_Sex = 0 === a.Sex ? 1 : .85, d.formula = "((140 - Age) * Weight * GFR_Sex ) / ( 72 * Plasma_Creatinine )", d.result = b(c(a, d.formula)), d.result < 15 ? (d.explanation = "Νεφρική ανεπάρκεια", d.resultlevel = 3) : d.result < 30 ? (d.explanation = "Νεφρική βλάβη με σοβαρή μείωση του GFR", d.resultlevel = 3) : d.result < 60 ? (d.explanation = "Νεφρική βλάβη με μέτρια μείωση του GFR", d.resultlevel = 2) : d.result < 90 ? (d.explanation = "Νεφρική βλάβη με ήπια μείωση του GFR", d.resultlevel = 1) : (d.explanation = "Φυσιολογική νεφρική λειτουργία", d.resultlevel = 0), d
            }, GlasgowComaScale: function (a) {
                var b, c, d;
                return b = 1 * a.GlasgowComaScale_Eyes + 1 * a.GlasgowComaScale_Speech + 1 * a.GlasgowComaScale_Mobility, b > 13 ? (c = "Καμμία ή Μικρή Βαθμού Εγκεφαλική Βλαβη", d = 0) : b > 8 ? (c = "Μέτριου Βαθμού Εγκεφαλική Βλάβη", d = 2) : b > 0 ? (c = "Σοβαρού Βαθμού Εγκεφαλική Βλάβη (Διασωλήνωση)", d = 3) : c = "", {
                    result: b,
                    explanation: c,
                    resultlevel: d
                }
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("medical.calculators").factory("cardiologyCalculators", ["mathParser", "roundNum", "evaluator", function (a, b, c) {
        return {
            CHADScore: function (a) {
                var b = {}, d = _.extend({}, a);
                switch (d.ChadScore_AgeGroup = a.Age > 75 ? 2 : a.Age > 65 ? 1 : 0, b.formula = "HistoryOf_CHF + HistoryOf_Hypertension + ChadScore_AgeGroup + HistoryOf_Diabetes + (HistoryOf_Stroke * 2) + HistoryOf_VascularDisease + Sex", b.result = c(d, b.formula), b.result) {
                    case 0:
                        b.explanation = "Όχι αγωγή", b.resultlevel = 0;
                        break;
                    case 1:
                        b.explanation = "Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή NOAC ή Ασπιρίνη", b.resultlevel = 1;
                        break;
                    default:
                        b.explanation = "Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή NOAC", b.resultlevel = 2
                }
                return b
            }, CRUSADEScore: function (a) {
                var b, c, d, e = _.extend({}, a);
                e.ht = a.Hematocrit >= 40 ? 0 : a.Hematocrit >= 37 ? 2 : a.Hematocrit >= 34 ? 3 : a.Hematocrit >= 31 ? 7 : 9, e.gfr = a.GFR > 120 ? 0 : a.GFR > 90 ? 7 : a.GFR > 60 ? 17 : a.GFR > 30 ? 28 : 35, e.hr = a.HeartRate > 120 ? 11 : a.HeartRate > 110 ? 10 : a.HeartRate > 100 ? 8 : a.HeartRate > 90 ? 6 : a.HeartRate > 80 ? 3 : a.HeartRate > 70 ? 1 : 0, e.sbp = a.BloodPressure_Systolic > 200 ? 5 : a.BloodPressure_Systolic > 180 ? 3 : a.BloodPressure_Systolic > 120 ? 1 : a.BloodPressure_Systolic > 100 ? 5 : a.BloodPressure_Systolic > 90 ? 8 : 10;
                var f = [2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4, 4.1, 4.3, 4.4, 4.6, 4.7, 4.9, 5, 5.2, 5.4, 5.6, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9, 7.2, 7.4, 7.6, 7.9, 8.1, 8.4, 8.6, 8.9, 9.2, 9.5, 9.8, 10.1, 10.4, 10.7, 11.1, 11.4, 11.7, 12.1, 12.5, 12.8, 13.2, 13.6, 14, 14.4, 14.9, 15.3, 15.7, 16.2, 16.7, 17.1, 17.6, 18.1, 18.6, 19.2, 19.7, 20.2, 20.8, 21.4, 21.9, 22.5, 23.1, 23.7, 24.4, 25, 25.6, 26.3, 27, 27.6, 28.3, 29, 29.7, 30.4, 31.2, 31.9, 32.6, 33.4, 34.2, 34.9, 35.7, 36.5, 37.3, 38.1, 38.9, 39.7, 40.5, 41.3, 42.2, 43, 43.8];
                return b = 1 * e.ht + 1 * e.gfr + 1 * e.hr + 1 * e.sbp + 6 * e.HistoryOf_VascularDisease + 6 * e.HistoryOf_Diabetes + 7 * e.CRUSADEScore_CHFAtPresentation + 8 * e.Sex, c = "Πιθανότητα σοβαρής αιμορραγίας κατά την νοσηλεία: " + f[b] + "%", d = b >= 40 ? 3 : b >= 30 ? 2 : 1, {
                    result: b,
                    explanation: c,
                    resultlevel: d
                }
            }, ESCSCORE: function (a) {
                var b, c, d = {
                    female: {
                        nonsmoker: [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 1, 1], [1, 1, 1, 1, 1]], [[0, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 2, 2, 2]], [[1, 1, 1, 1, 1], [1, 1, 1, 2, 2], [2, 2, 2, 2, 3], [3, 3, 3, 4, 4]], [[1, 1, 2, 2, 2], [2, 2, 2, 3, 3], [3, 3, 4, 4, 5], [4, 5, 6, 6, 7]]],
                        smoker: [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[0, 0, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 2, 2, 2]], [[1, 1, 1, 1, 1], [1, 1, 1, 2, 2], [2, 2, 2, 3, 3], [3, 3, 3, 4, 4]], [[1, 2, 2, 2, 3], [2, 2, 3, 3, 4], [3, 4, 4, 5, 5], [5, 5, 6, 7, 8]], [[3, 3, 3, 4, 4], [4, 4, 5, 6, 7], [6, 6, 7, 8, 10], [9, 9, 11, 12, 14]]]
                    },
                    male: {
                        nonsmoker: [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 1, 1, 1, 1]], [[1, 1, 1, 1, 1], [1, 1, 1, 1, 2], [1, 1, 2, 2, 2], [2, 2, 3, 3, 4]], [[1, 1, 1, 2, 2], [1, 2, 2, 2, 3], [2, 2, 3, 3, 4], [3, 4, 4, 5, 6]], [[2, 2, 2, 3, 3], [2, 3, 3, 4, 4], [3, 4, 5, 5, 6], [5, 6, 7, 8, 9]], [[2, 3, 3, 4, 5], [4, 4, 5, 6, 7], [5, 6, 7, 8, 10], [8, 9, 10, 12, 14]]],
                        smoker: [[[0, 0, 0, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 2, 2]], [[1, 1, 2, 2, 2], [2, 2, 2, 3, 3], [2, 3, 3, 4, 5], [4, 4, 5, 6, 7]], [[2, 2, 3, 3, 4], [3, 3, 4, 5, 6], [4, 5, 6, 7, 8], [6, 7, 8, 10, 12]], [[3, 4, 4, 5, 6], [5, 5, 6, 7, 9], [7, 8, 9, 11, 13], [10, 11, 13, 15, 18]], [[5, 5, 6, 8, 9], [7, 8, 9, 11, 13], [10, 12, 14, 16, 19], [15, 17, 20, 23, 26]]]
                    }
                };
                return d = a.Sex ? d.female : d.male, d = a.Smoker ? d.smoker : d.nonsmoker, d = a.Age < 45 ? d[0] : a.Age < 53 ? d[1] : a.Age < 58 ? d[2] : a.Age < 62 ? d[3] : d[4], d = a.BloodPressure_Systolic < 130 ? d[0] : a.BloodPressure_Systolic < 150 ? d[1] : a.BloodPressure_Systolic < 170 ? d[2] : d[3], b = a.Cholesterol < 150 ? d[0] : a.Cholesterol < 200 ? d[1] : a.Cholesterol < 250 ? d[2] : a.Cholesterol < 300 ? d[3] : d[4], c = 2 > b ? 1 : 5 > b ? 2 : 3, {
                    result: b,
                    suffix: "%",
                    explanation: "Πιθανότητα θανατηφόρου καρδιαγγειακού συμβάματος στην δεκαετία",
                    resultlevel: c
                }
            }, EuroSCORE: function (a) {
                var b, c, d, e = [];
                e.push(.0666354 * (a.Age < 60 ? 1 : a.Age - 58)), e.push(.3304052 * a.Sex), e.push(.4931341 * a.HistoryOf_PulmonaryDisease), e.push(.6558917 * a.HistoryOf_VascularDisease), e.push(.841626 * a.HistoryOf_NeurologicalDisease), e.push(1.002625 * a.HistoryOf_CardiacSurgery), e.push(a.Plasma_Creatinine > 2.25 ? .6521653 : 0), e.push(1.101265 * a.EuroSCORE_ActiveEndocarditis), e.push(.9058132 * a.EuroSCORE_CriticalState), e.push(.5677075 * a.AnginaAtRest);
                var f;
                f = a.LVEF > 50 ? 0 : a.LVEF > 30 ? .4191643 : 1.094443, e.push(f), e.push(.5460218 * a.EuroSCORE_MIinTheLast90Days), e.push(a.PASP > 60 ? .7676924 : 0), e.push(.7127953 * a.EuroSCORE_Emergency), e.push(.5420364 * !a.EuroSCORE_SimpleCABG), e.push(1.159787 * a.EuroSCORE_ThoracicAorta), e.push(1.462009 * a.EuroSCORE_SeptalRupture);
                var g = _(e).reduce(function (a, b) {
                    return a += b
                }, -4.789594), h = Math.exp(g);
                return b = 100 * h / (1 + h), b = Math.round(100 * b) / 100, b > 8 ? (c = "Υψηλού Κινδύνου", d = 3) : b > 4 ? (c = "Μετρίου Κινδύνου", d = 2) : (c = "Μικρού Κινδύνου", d = 1), {
                    result: "Υπολογιζόμενη Θνητότητα Χειρουργείου " + b + "%",
                    explanation: c,
                    resultlevel: d
                }
            }, EuroSCOREII: function (a) {
                var b, c, d, e = [];
                e.push(.0285181 * (a.Age < 60 ? 1 : a.Age - 59)), e.push(.2196434 * a.Sex);
                var f = 0;
                a.GFR < 85 && (f = .303553), a.GFR < 50 && (f = .8592256), 0 == a.GFR && (f = .6421508), e.push(f), e.push(.5360268 * a.HistoryOf_VascularDisease), e.push(.2407181 * a.HistoryOf_PoorMobility), e.push(1.118599 * a.HistoryOf_CardiacSurgery), e.push(.1886564 * a.HistoryOf_PulmonaryDisease), e.push(.6194522 * a.EuroSCORE_ActiveEndocarditis), e.push(1.086517 * a.EuroSCORE_CriticalState), e.push(.3542749 * a.HistoryOf_Diabetes);
                var g = 0;
                "II" == a.NYHAClass && (g = .1070545), "III" == a.NYHAClass && (g = .2958358), "IV" == a.NYHAClass && (g = .5597929), e.push(g), e.push(.2226147 * a.AnginaAtRest);
                var h = 0;
                a.LVEF < 50 && (h = .3150652), a.LVEF < 30 && (h = .8084096), a.LVEF < 20 && (h = .9346919), e.push(h), e.push(.1528943 * a.EuroSCORE_MIinTheLast90Days);
                var i = 0;
                a.PASP > 30 && (i = .1788899), a.PASP > 55 && (i = .3491475), e.push(i);
                var j = 0;
                1 == a.EuroSCOREII_Emergency && (j = .3174673), 2 == a.EuroSCOREII_Emergency && (j = .7039121), 3 == a.EuroSCOREII_Emergency && (j = 1.362947), e.push(j);
                var k = 0;
                1 == a.EuroSCOREII_OperationWeight && (k = .0062118), 2 == a.EuroSCOREII_OperationWeight && (k = .5521478), 3 == a.EuroSCOREII_OperationWeight && (k = .9724533), e.push(k), e.push(.6527205 * a.EuroSCORE_ThoracicAorta);
                var l = _(e).reduce(function (a, b) {
                    return a += b
                }, -5.324537);
                return b = 100 * Math.exp(l) / (1 + Math.exp(l)), b = Math.round(100 * b) / 100, b > 8 ? (c = "Υψηλού Κινδύνου", d = 3) : b > 4 ? (c = "Μετρίου Κινδύνου", d = 2) : (c = "Μικρού Κινδύνου", d = 1), {
                    result: "Υπολογιζόμενη Θνητότητα Χειρουργείου " + b + "%",
                    explanation: c,
                    resultlevel: d
                }
            }, GRACEScore: function (a) {
                var c, d, e;
                0 <= a.Age && a.Age < 35 ? e = 0 : 35 <= a.Age && a.Age < 45 ? e = 0 + 1.8 * (a.Age - 35) : 45 <= a.Age && a.Age < 55 ? e = 18 + 1.8 * (a.Age - 45) : 55 <= a.Age && a.Age < 65 ? e = 36 + 1.8 * (a.Age - 55) : 65 <= a.Age && a.Age < 75 ? e = 54 + 1.9 * (a.Age - 65) : 75 <= a.Age && a.Age < 85 ? e = 73 + 1.8 * (a.Age - 75) : 85 <= a.Age && a.Age < 90 ? e = 91 + 1.8 * (a.Age - 85) : a.Age >= 90 && (e = 100);
                var f;
                0 <= a.HeartRate && a.HeartRate < 70 ? f = 0 : 70 <= a.HeartRate && a.HeartRate < 80 ? f = 0 + .3 * (a.HeartRate - 70) : 80 <= a.HeartRate && a.HeartRate < 90 ? f = 3 + .2 * (a.HeartRate - 80) : 90 <= a.HeartRate && a.HeartRate < 100 ? f = 5 + .3 * (a.HeartRate - 90) : 100 <= a.HeartRate && a.HeartRate < 110 ? f = 8 + .2 * (a.HeartRate - 100) : 110 <= a.HeartRate && a.HeartRate < 150 ? f = 10 + .3 * (a.HeartRate - 110) : 150 <= a.HeartRate && a.HeartRate < 200 ? f = 22 + .3 * (a.HeartRate - 150) : a.HeartRate >= 200 && (f = 34);
                var g;
                0 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 80 ? g = 40 : 80 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 100 ? g = 40 - .3 * (a.BloodPressure_Systolic - 80) : 100 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 110 ? g = 34 - .3 * (a.BloodPressure_Systolic - 100) : 110 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 120 ? g = 31 - .4 * (a.BloodPressure_Systolic - 110) : 120 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 130 ? g = 27 - .3 * (a.BloodPressure_Systolic - 120) : 130 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 140 ? g = 24 - .3 * (a.BloodPressure_Systolic - 130) : 140 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 150 ? g = 20 - .4 * (a.BloodPressure_Systolic - 140) : 150 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 160 ? g = 17 - .3 * (a.BloodPressure_Systolic - 150) : 160 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 180 ? g = 14 - .3 * (a.BloodPressure_Systolic - 160) : 180 <= a.BloodPressure_Systolic && a.BloodPressure_Systolic < 200 ? g = 8 - .4 * (a.BloodPressure_Systolic - 180) : a.BloodPressure_Systolic >= 200 && (g = 0);
                var h;
                0 <= a.Plasma_Creatinine && a.Plasma_Creatinine < .2 ? h = 0 + 5 * (a.Plasma_Creatinine - 0) : .2 <= a.Plasma_Creatinine && a.Plasma_Creatinine < .4 ? h = 1 + 10 * (a.Plasma_Creatinine - .2) : .4 <= a.Plasma_Creatinine && a.Plasma_Creatinine < .6 ? h = 3 + 5 * (a.Plasma_Creatinine - .4) : .6 <= a.Plasma_Creatinine && a.Plasma_Creatinine < .8 ? h = 4 + 10 * (a.Plasma_Creatinine - .6) : .8 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 1 ? h = 6 + 5 * (a.Plasma_Creatinine - .8) : 1 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 1.2 ? h = 7 + 5 * (a.Plasma_Creatinine - 1) : 1.2 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 1.4 ? h = 8 + 10 * (a.Plasma_Creatinine - 1.2) : 1.4 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 1.6 ? h = 10 + 5 * (a.Plasma_Creatinine - 1.4) : 1.6 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 1.8 ? h = 11 + 10 * (a.Plasma_Creatinine - 1.6) : 1.8 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 2 ? h = 13 + 5 * (a.Plasma_Creatinine - 1.8) : 2 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 3 ? h = 14 + 7 * (a.Plasma_Creatinine - 2) : 3 <= a.Plasma_Creatinine && a.Plasma_Creatinine < 4 ? h = 21 + 7 * (a.Plasma_Creatinine - 3) : a.Plasma_Creatinine >= 4 && (h = 28);
                var i;
                "I" === a.KillipClass ? i = 0 : "II" === a.KillipClass ? i = 15 : "III" === a.KillipClass ? i = 29 : "IV" === a.KillipClass && (i = 44), c = i + g + f + e + h + 17 * a.GRACEScore_stemi + 13 * a.GRACEScore_troponine + 30 * a.GRACEScore_arrest, c >= 6 && (d = .2), c >= 27 && (d = .4), c >= 39 && (d = .6), c >= 48 && (d = .8), c >= 55 && (d = 1), c >= 60 && (d = 1.2), c >= 65 && (d = 1.4), c >= 69 && (d = 1.6), c >= 73 && (d = 1.8), c >= 76 && (d = 2), c >= 88 && (d = 3), c >= 97 && (d = 4), c >= 104 && (d = 5), c >= 110 && (d = 6), c >= 115 && (d = 7), c >= 119 && (d = 8), c >= 123 && (d = 9), c >= 126 && (d = 10), c >= 129 && (d = 11), c >= 132 && (d = 12), c >= 134 && (d = 13), c >= 137 && (d = 14), c >= 139 && (d = 15), c >= 141 && (d = 16), c >= 143 && (d = 17), c >= 145 && (d = 18), c >= 147 && (d = 19), c >= 149 && (d = 20), c >= 150 && (d = 21), c >= 152 && (d = 22), c >= 153 && (d = 23), c >= 155 && (d = 24), c >= 156 && (d = 25), c >= 158 && (d = 26), c >= 159 && (d = 27), c >= 160 && (d = 28), c >= 162 && (d = 29), c >= 163 && (d = 30), c >= 174 && (d = 40), c >= 183 && (d = 50), c >= 191 && (d = 60), c >= 200 && (d = 70), c >= 208 && (d = 80), c >= 219 && (d = 90), c >= 285 && (d = 99);
                var j;
                return j = 2 >= d ? 0 : 10 >= d ? 1 : 20 >= d ? 2 : 3, {
                    result: b(c),
                    explanation: "Θνησιμότητα εντός εξαμήνου: " + d + "%",
                    resultlevel: j
                }
            }, HASBLED: function (a) {
                var b, c, d;
                switch (b = 0, b += a.BloodPressure_Systolic > 160 ? 1 : 0, b += a.Plasma_Creatinine > 2.6 ? 1 : 0, b += a.HistoryOf_HepaticFailure ? 1 : 0, b += a.HistoryOf_Stroke ? 1 : 0, b += a.HistoryOf_Bleeding ? 1 : 0, b += a.HistoryOf_UncontrolledINR ? 1 : 0, b += a.Age > 65 ? 1 : 0, b += a.HASBLED_Drugs ? 1 : 0, b += a.HistoryOf_Alcohol ? 1 : 0) {
                    case 0:
                        c = "Ο κίνδυνος είναι 0.9%", d = 0;
                        break;
                    case 1:
                        c = "Ο κίνδυνος είναι 3.4%", d = 0;
                        break;
                    case 2:
                        c = "Ο κίνδυνος είναι 4.1%", d = 1;
                        break;
                    case 3:
                        c = "Ο κίνδυνος είναι 5.8%", d = 1;
                        break;
                    case 4:
                        c = "Ο κίνδυνος είναι 8.9%", d = 2;
                        break;
                    case 5:
                        c = "Ο κίνδυνος είναι 9.1%", d = 2;
                        break;
                    default:
                        c = "Δεν έχει υπολογισθεί ο κίνδυνος", d = 3
                }
                return {result: b, explanation: c, resultlevel: d}
            }, KillipClassEval: function (a) {
                var b, c, d = a.KillipClass;
                switch (d) {
                    case"I":
                        b = "6%", c = 0;
                        break;
                    case"II":
                        b = "17%", c = 1;
                        break;
                    case"III":
                        b = "38%", c = 2;
                        break;
                    case"IV":
                        b = "67%", c = 3
                }
                return {result: d, explanation: "Ποσοστό Θνησιμότητας σε 30 Ημέρες: " + b, resultlevel: c}
            }, NYHAClassEval: function (a) {
                var b, c = a.NYHAClass, d = "";
                return "IV" === c && (d = "Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση", b = 3), "III" === c && (d = "Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση", b = 2), "II" === c && (d = "Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα", b = 1), "I" === c && (d = "Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα", b = 0), {
                    result: c,
                    explanation: d,
                    resultlevel: b
                }
            }, DTS: function (a) {
                var d = {};
                return d.formula = "Bruce_ExerciseTime - 5*Bruce_STDeviation - 4*Bruce_AnginaIndex", d.result = b(c(a, d.formula)), d.result >= 5 ? (d.explanation = "Χαμηλός κίνδυνος (Θνησιμότητα στο έτος: 0.25%)", d.resultlevel = 0) : d.result >= -11 ? (d.explanation = "Ενδιάμεσος κίνδυνος (Θνησιμότητα στο έτος: 1.25%)", d.resultlevel = 2) : (d.explanation = "Υψηλός κίνδυνος (Θνησιμότητα στο έτος: 5.25%)", d.resultlevel = 3), d
            }, QTc: function (a) {
                var d = {};
                return d.formula = "QT / sqrt(60 / HeartRate)", d.result = b(c(a, d.formula)), d.result >= 480 ? (d.explanation = "Έντονα παρατεταμένο QT", d.resultlevel = 3) : d.result >= 460 ? (d.explanation = "Παρατεταμένο QT", d.resultlevel = 2) : d.result >= 440 ? (d.explanation = "Μικρή παράταση QT", d.resultlevel = 1) : d.result <= 330 ? (d.explanation = "Έντονη βράχυνση QT", d.resultlevel = 3) : d.result <= 350 ? (d.explanation = "Βραχύ QT", d.resultlevel = 2) : d.result <= 370 ? (d.explanation = "Μικρή βράχυνση QT", d.resultlevel = 1) : (d.explanation = "Φυσιολογικό QT", d.resultlevel = 0), d
            }, QT: function (a) {
                var b = {};
                return b.formula = "QTmm * (1/paperSpeed) * 1000", b.result = c(a, b.formula), b.suffix = "msec", b
            }, Sokolow: function (a) {
                var b = {}, c = a.V1S + Math.max(a.V5R, a.V6R) >= 35 || a.aVLR >= 11;
                return c ? (b.result = "Θετικός για υπερτροφία μυοκαρδίου", b.explanation = "Ειδικότητα 100%", b.resultlevel = 3) : (b.result = "Αρνητικός για υπερτροφία μυοκαρδίου", b.explanation = "Ευαισθησία 22%", b.resultlevel = 0), b
            }, HeartRate: function (a) {
                var d = {};
                return d.formula = "60*paperSpeed/HRQRS2QRSmm/HRcycles", d.result = b(c(a, d.formula)), d
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("medical.calculators").factory("pulmonologyCalculators", ["mathParser", "roundNum", "evaluator", function (a, b) {
        return {
            ArterialBloodGasses: function (a) {
                var c, d, e, f, g, h, i = "", j = "";
                a.ArterialBlood_pH < 7.36 && a.ArterialBlood_pCO2 <= 40 && (i = "Πρωτοπαθής μεταβολική οξέωση", c = 1.5 * a.ArterialBlood_H2CO3 + 8), a.ArterialBlood_pH > 7.44 && a.ArterialBlood_pCO2 >= 40 && (i = "Πρωτοπαθής μεταβολική αλκάλωση", c = .7 * a.ArterialBlood_H2CO3 + 21), c = b(c, 0), a.ArterialBlood_pCO2 > c + 2 && (i += ",\nμε αναπνευστική οξέωση", h = 2), a.ArterialBlood_pCO2 < c - 2 && (i += ",\nμε αναπνευστική αλκάλωση", h = 2), a.ArterialBlood_pCO2 <= c + 2 && a.ArterialBlood_pCO2 >= c - 2 && (i += ",\nμε πλήρη αναπνευστική αντιρρόπηση", h = 1), a.ArterialBlood_pH < 7.4 && a.ArterialBlood_pCO2 > 44 && (i = "Πρωτοπαθής αναπνευστική οξέωση", d = 7.4 - .003 * (a.ArterialBlood_pCO2 - 40), e = 7.4 - .008 * (a.ArterialBlood_pCO2 - 40), f = 24 + .35 * (a.ArterialBlood_pCO2 - 40), g = 24 + .1 * (a.ArterialBlood_pCO2 - 40), e = b(e, 2), d = b(d, 2), g = b(g, 0), f = b(f, 0), a.ArterialBlood_pH <= e + .02 && (i = "Οξεία (μη αντιρροπούμενη) " + i, a.ArterialBlood_H2CO3 < g - 2 && (i += ",\nμε μεταβολική οξέωση", h = 3)), a.ArterialBlood_pH >= d - .02001 && (i = "Χρόνια (αντιρροπούμενη) " + i, a.ArterialBlood_H2CO3 > f + 2 && (i += ",\nμε μεταβολική αλκάλωση", h = 1)), a.ArterialBlood_pH > e + .02 && a.ArterialBlood_pH < d - .02001 && (i = "(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική οξέωση, ή\n(2) οξεία επί χρόνιας " + i + ", ή\n(3) μικτή οξεία αναπνευστική οξέωση με μικρή μεταβολική αλκάλωση", h = 2)), a.ArterialBlood_pH > 7.4 && a.ArterialBlood_pCO2 < 36 && (i = "Πρωτοπαθής αναπνευστική αλκάλωση", e = 7.4 + .0017 * (40 - a.ArterialBlood_pCO2), d = 7.4 + .008 * (40 - a.ArterialBlood_pCO2), g = 24 - .5 * (40 - a.ArterialBlood_pCO2), f = 24 - .25 * (40 - a.ArterialBlood_pCO2), e = b(e, 2), d = b(d, 2), g = b(g, 0), f = b(f, 0), a.ArterialBlood_pH <= e + .02 && (i = "Χρόνια (αντιρροπούμενη) " + i, a.ArterialBlood_H2CO3 < g - 2 && (i += ",\nμε μεταβολική οξέωση"), h = 1), a.ArterialBlood_pH >= d - .02 && (i = "Οξεία (μη αντιρροπούμενη) " + i, a.ArterialBlood_H2CO3 > f + 2 && (i += ",\nμε μεταβολική αλκάλωση"), h = 3), a.ArterialBlood_pH > e + .02 && a.ArterialBlood_pH < d - .02 && (i = "(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική αλκάλωση, ή\n(2) οξεία επί χρόνιας " + i + ", ή\n(3) μικτή οξεία αναπνευστική αλκάλωση με μικρή μεταβολική οξέωση", h = 2)), ("" === i || null === i) && a.ArterialBlood_pH >= 7.36 && a.ArterialBlood_pH <= 7.44 && (a.ArterialBlood_pCO2 > 40 && a.ArterialBlood_H2CO3 > 26 ? (i = "Μικτή αναπνευστική οξέωση - μεταβολική αλκάλωση", h = 3) : a.ArterialBlood_pCO2 < 40 && a.ArterialBlood_H2CO3 < 22 ? (i = "Μικτή αναπνευστική αλκάλωση - μεταβολική οξέωση", h = 3) : (i = "Φυσιολογικά αέρια αίματος", h = 0));
                var k = b(713 * a.FiO2 - a.pCO2 / .8 - a.pO2, 0);
                return k >= 10 ? j = "Αυξημένο shunt<br />Εκτεταμένες Διαταραχές του V/Q<br />Διαταραχή στην Ανταλλαγή των Αερίων" : k > 0 && (j = "Υποαερισμός (Κεντρικής Αιτιολογίας, Νευρομυικός κτλ.)<br />Χαμηλή Συγκέντρωση Οξυγόνου (Υψόμετρο κτλ.)"), {
                    result: i,
                    explanation: j,
                    resultlevel: h
                }
            }, WellsScore: function (a) {
                var b = {result: 0, explanation: "", resultlevel: 0};
                return b.result += 1.5 * a.HistoryOf_DVT, b.result += 1.5 * (a.HeartRate > 100), b.result += 1.5 * a.HistoryOf_Immobilization, b.result += 1 * a.Haemoptysis, b.result += 1 * a.Cancer, b.result += 3 * a.DVT, b.result += 3 * a.PEMostLikely, b.result >= 7 ? (b.explanation = "Υψηλή κλινική πιθανότητα", b.resultlevel = 3) : b.result >= 2 ? (b.explanation = "Ενδιάμεση κλινική πιθανότητα", b.resultlevel = 2) : (b.explanation = "Χαμηλή κλινική πιθανότητα", b.resultlevel = 0), b
            }, GenevaScore: function (a) {
                var b = {result: 0, explanation: "", resultlevel: 0};
                return b.result += 3 * a.HistoryOf_DVT, b.result += 3 * (a.HeartRate >= 75), b.result += 2 * (a.HeartRate >= 95), b.result += 2 * a.HistoryOf_Immobilization, b.result += 2 * a.Haemoptysis, b.result += 2 * a.Cancer, b.result += 3 * a.UnilateralLLimbPain, b.result += 4 * a.UnilateralLLimbOedema, b.result += 1 * (a.Age > 65), b.result >= 11 ? (b.explanation = "Υψηλή κλινική πιθανότητα", b.resultlevel = 3) : b.result >= 4 ? (b.explanation = "Ενδιάμεση κλινική πιθανότητα", b.resultlevel = 2) : (b.explanation = "Χαμηλή κλινική πιθανότητα", b.resultlevel = 0), b
            }, PESI: function (a) {
                var b = {result: 0, explanation: "", resultlevel: 0};
                return b.result += a.Age, b.result += 10 * !a.Sex, b.result += 30 * a.Cancer, b.result += 10 * a.HistoryOf_CHF, b.result += 10 * a.HistoryOf_PulmonaryDisease, b.result += 20 * (a.HeartRate >= 110), b.result += 30 * (a.BloodPressure_Systolic < 100), b.result += 20 * (a.BreathRate > 30), b.result += 20 * (a.BodyTemperature < 36), b.result += 60 * a.AltMentalStatus, b.result += 20 * (a.ArterialBlood_pO2 < 90), b.result > 125 ? (b.explanation = "Class V Πολύ υψηλή θνησιμότητα (10-24.5%)", b.resultlevel = 3) : b.result > 105 ? (b.explanation = "Class IV Υψηλή θνησιμότητα (4-11.4%)", b.resultlevel = 3) : b.result > 85 ? (b.explanation = "Class III Μέτρια θνησιμότητα (3.2-7.1%)", b.resultlevel = 2) : b.result > 65 ? (b.explanation = "Class II Χαμηλή θνησιμότητα (1.7-3.5%)", b.resultlevel = 1) : (b.explanation = "Class I Πολύ χαμηλή κλινική θνησιμότητα (0-1.6%)", b.resultlevel = 0), b
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("medical.calculators").factory("triplexCalculators", ["mathParser", "roundNum", "evaluator", function (a, b, c) {
        return {
            Triplex_LeftAtrium_Volume: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "8 * Triplex_LeftAtrium_Area4Ch * Triplex_LeftAtrium_Area2Ch / ( 3 * pi * ( Triplex_LeftAtrium_Length / 10 ))", d.result = b(this.evaluator(e, d.formula)), d.result >= 73 ? (d.explanation = "Μεγάλη διάταση αριστερού κόλπου", d.resultlevel = 3) : d.result >= 63 ? (d.explanation = "Μέτρια διάταση αριστερού κόλπου", d.resultlevel = 2) : d.result >= 53 ? (d.explanation = "Μικρή διάταση αριστερού κόλπου", d.resultlevel = 1) : d.result >= 22 ? (d.explanation = "Φυσιολογικές διάστασεις αριστερού κόλπου", d.resultlevel = 0) : (d.explanation = "Υπερβολικά χαμηλή τιμή - Πιθανό λάθος μετρήσεως", d.resultlevel = 3), d
            }, Triplex_LeftAtrium_Volume_Index: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "8 * Triplex_LeftAtrium_Area4Ch * Triplex_LeftAtrium_Area2Ch / ( 3 * pi * ( Triplex_LeftAtrium_Length / 10 )) / BSA", d.result = b(this.evaluator(e, d.formula)), d.result >= 40 ? (d.explanation = "Μεγάλη διάταση αριστερού κόλπου", d.resultlevel = 3) : d.result >= 34 ? (d.explanation = "Μέτρια διάταση αριστερού κόλπου", d.resultlevel = 2) : d.result >= 29 ? (d.explanation = "Μικρή διάταση αριστερού κόλπου", d.resultlevel = 1) : d.result >= 16 ? (d.explanation = "Φυσιολογικές διάστασεις αριστερού κόλπου", d.resultlevel = 0) : (d.explanation = "Υπερβολικά χαμηλή τιμή - Πιθανό λάθος μετρήσεως", d.resultlevel = 3), d
            }, Triplex_AorticValve_VelocityRatio_Vmax: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "Triplex_LVOT_Vmax / Triplex_AorticValve_Vmax", d.result = b(c(e, d.formula), 2), d.result < .25 ? (d.explanation = "Σοβαρή στένωση αορτικής βαλβίδας", d.resultlevel = 3) : d.result <= .5 ? (d.explanation = "Μέτρια στένωση αορτικής βαλβίδας", d.resultlevel = 2) : (d.explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας", d.resultlevel = 0), d
            }, Triplex_AorticValve_VelocityRatio_VTI: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "Triplex_LVOT_VTI / Triplex_AorticValve_VTI", d.result = b(c(e, d.formula), 2), d.result < .25 ? (d.explanation = "Σοβαρή στένωση αορτικής βαλβίδας", d.resultlevel = 3) : d.result <= .5 ? (d.explanation = "Μέτρια στένωση αορτικής βαλβίδας", d.resultlevel = 2) : (d.explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας", d.resultlevel = 0), d
            }, Triplex_AorticValve_Area_VTI: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "(pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI / Triplex_AorticValve_VTI", d.result = b(c(e, d.formula), 2), d.result < 1 ? (d.explanation = "Σοβαρή στένωση αορτικής βαλβίδας", d.resultlevel = 3) : d.result <= 1.5 ? (d.explanation = "Μέτρια στένωση αορτικής βαλβίδας", d.resultlevel = 2) : (d.explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας", d.resultlevel = 0), d
            }, Triplex_AorticValve_Area_Vmax: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "(pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_Vmax / Triplex_AorticValve_Vmax", d.result = b(c(e, d.formula), 2), d.result < 1 ? (d.explanation = "Σοβαρή στένωση αορτικής βαλβίδας", d.resultlevel = 3) : d.result <= 1.5 ? (d.explanation = "Μέτρια στένωση αορτικής βαλβίδας", d.resultlevel = 2) : (d.explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας", d.resultlevel = 0), d
            }, Triplex_AorticValve_Impedance: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "( BloodPressure_Systolic + 4 * Triplex_AorticValve_Vmean ^ 2 ) / ( ( ( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI ) / BSA )", d.result = b(c(e, d.formula)), d.result >= 5.5 ? (d.explanation = "Πολύ Υψηλή Αορτοβαλβιδική Αντίσταση", d.resultlevel = 3) : d.result >= 4.5 ? (d.explanation = "Υψηλή Αορτοβαλβιδική Αντίσταση", d.resultlevel = 2) : d.result > 3.5 ? (d.explanation = "Μέτρια Αορτοβαλβιδική Αντίσταση", d.resultlevel = 1) : (d.explanation = "Μικρή Αορτοβαλβιδική Αντίσταση", d.resultlevel = 0), d
            }, Triplex_Stroke_Volume: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI", d.result = b(c(e, d.formula)), d.resultlevel = 1, d
            }, Triplex_Stroke_Volume_Index: function (a) {
                this.evaluator = c;
                var d = {}, e = angular.copy(a);
                return d.formula = "( ( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI ) / BSA ", d.result = b(c(e, d.formula)), d.resultlevel = d.result < 35 ? 3 : 1, d
            }, Triplex_AorticValve_Regurgitation: function (a) {
                var b = [], c = {};
                c.name = "Vena Contracta", a.Triplex_AorticValve_Regurgitation_VenaContracta_Width > .6 ? (c.value = "Σοβαρή Ανεπάρκεια", c.resultlevel = 3) : a.Triplex_AorticValve_Regurgitation_VenaContracta_Width > .3 ? (c.value = "Μέτρια Ανεπάρκεια", c.resultlevel = 2) : (c.value = "Μικρή Ανεπάρκεια", c.resultlevel = 1), b.push(c);
                var d = {};
                return d.name = "Pressure Half Time", a.Triplex_AorticValve_Regurgitation_PHT < 200 ? (d.value = "Σοβαρή Ανεπάρκεια", d.resultlevel = 3) : a.Triplex_AorticValve_Regurgitation_PHT < 500 ? (d.value = "Μέτρια Ανεπάρκεια", d.resultlevel = 2) : (d.value = "Μικρή Ανεπάρκεια", d.resultlevel = 1), b.push(d), b
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("medical.calculators").factory("patientCalculators", [function () {
        return {
            newPatient: function (a) {
                var b = {amka: a.amka, birthday: a.birthday, age: a.age, firstname: a.firstname, lastname: a.lastname};
                return b
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("medical.views", ["medical.calculators"]).factory("views", function () {
        var a = [], b = {}, c = {};
        return {
            add: function (d) {
                return a = _.union(a, d), c = _.indexBy(a, "id"), _.each(a, function (a) {
                    _.each(a.fields, function (b) {
                        b.calculator && c[b.calculator] && (b.calculatorView = angular.copy(c[b.calculator]), b.calculatorView.parent = a)
                    })
                }), b = _.reduce(a, function (a, b) {
                    var c = b.category ? b.category.split(/\W+/g) : ["generic"];
                    return _.each(c, function (c) {
                        a[c] = a[c] || {}, a[c][b.id] = b
                    }), a
                }, {}), d
            }, all: function () {
                return c
            }, allList: function () {
                return a
            }, categories: function () {
                return b
            }
        }
    }).factory("update", ["calculators", function (a) {
        return function (b, c, d, e) {
            var f = {};
            return d.view && d.view.validate && d.view.validate(b, c, d, e), this.calculator || (this.calculator = a[this.id]), this.calculator && (f = this.calculator(this.values), this.values[this.id] = f.result), f
        }
    }]).factory("init", function () {
        return function () {
            this.values = this.parent ? this.parent.values : this.values || {}, _.defaults(this.values, this.defaultValues)
        }
    }).factory("reset", function () {
        return function () {
            _.extend(this.values, this.defaultValues)
        }
    })
}(), function () {
    "use strict";
    angular.module("medical.views").factory("internalMedicineViews", ["views", "update", "init", "reset", function (a, b, c, d) {
        var e = {
            Result: {id: "result", input: {type: "result"}},
            Age: {id: "Age", name: "Ηλικία", input: {type: "number", step: 1, min: 1, max: 120}},
            Sex: {
                id: "Sex",
                name: "Φύλο",
                input: {type: "select", options: [{value: 0, name: "♂ Άρρεν"}, {value: 1, name: "♀ Θήλυ"}]}
            },
            Height: {id: "Height", name: "Ύψος (cm)", input: {type: "number", step: 1, min: 0, max: 250}},
            Weight: {id: "Weight", name: "Βάρος (kgr)", input: {type: "number", step: 1, min: 0, max: 250}}
        };
        return a.add([{
            id: "BMI",
            name: "Δείκτης Μάζας Σώματος",
            category: "generic",
            template: "calculator.basic",
            defaultValues: {Height: 170, Weight: 70},
            fields: [e.Height, e.Weight, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "BSA",
            name: "Επιφάνεια Σώματος (BSA)",
            category: "generic",
            template: "calculator.basic",
            defaultValues: {Height: 170, Weight: 70},
            fields: [e.Height, e.Weight, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Calculator",
            name: "Υπολογιστής",
            category: "generic",
            template: "calculator.basic",
            defaultValues: {Calculation: ""},
            fields: [{id: "Calculation", name: "Υπολογισμός", value: "", input: {type: "text"}}, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "GFR",
            name: "GFR",
            category: "generic",
            template: "calculator.basic",
            defaultValues: {Plasma_Creatinine: 1, Age: 65, Weight: 70, Sex: 0},
            fields: [{
                id: "Plasma_Creatinine",
                name: "Κρεατινίνη Πλάσματος",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, e.Age, e.Weight, e.Sex, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "GlasgowComaScale",
            name: "Κλίμακα Γλασκόβης",
            category: "generic neurology trauma",
            template: "calculator.basic",
            defaultValues: {GlasgowComaScale_Eyes: 4, GlasgowComaScale_Speech: 5, GlasgowComaScale_Mobility: 6},
            fields: [{
                id: "GlasgowComaScale_Eyes",
                name: "Μάτια",
                input: {
                    type: "select",
                    options: [{value: 1, name: "Παραμένουν κλειστά"}, {value: 2, name: "Ανοίγουν στον πόνο"}, {
                        value: 3,
                        name: "Ανοίγουν στην εντολή"
                    }, {value: 4, name: "Ανοικτά"}]
                }
            }, {
                id: "GlasgowComaScale_Speech",
                name: "Ομιλία",
                input: {
                    type: "select",
                    options: [{value: 1, name: "Κανένας ήχος"}, {value: 2, name: "Άναρθρες κραυγές"}, {
                        value: 3,
                        name: "Ομιλία με ασάφεια"
                    }, {value: 4, name: "Αποπροσανατολισμένος"}, {value: 5, name: "Φυσιολογική Επικοινωνία"}]
                }
            }, {
                id: "GlasgowComaScale_Mobility",
                name: "Κινητικότητα",
                input: {
                    type: "select",
                    options: [{value: 1, name: "Καμία κινητικότητα"}, {
                        value: 2,
                        name: "Εκτείνει στον πόνο(απεγκεφαλισμός)"
                    }, {value: 3, name: "Κάμπτει στον πόνο (αποφλοίωση)"}, {
                        value: 4,
                        name: "Αποσύρει στα επώδυνα ερεθίσματα"
                    }, {value: 5, name: "Εντοπίζει τα επώδυνα ερεθίσματα"}, {value: 6, name: "Εκτελεί εντολές"}]
                }
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }])
    }])
}(), function () {
    "use strict";
    angular.module("medical.views").factory("pulmonologyViews", ["views", "update", "init", "reset", function (a, b, c, d) {
        var e = {
            Result: {id: "result", input: {type: "result"}},
            Age: {id: "Age", name: "Ηλικία", input: {type: "number", step: 1, min: 1, max: 120}},
            Sex: {
                id: "Sex",
                name: "Φύλο",
                input: {type: "select", options: [{value: 0, name: "♂ Άρρεν"}, {value: 1, name: "♀ Θήλυ"}]}
            },
            Height: {id: "Height", name: "Ύψος (cm)", input: {type: "number", step: 1, min: 0, max: 250}},
            Weight: {id: "Weight", name: "Βάρος (kgr)", input: {type: "number", step: 1, min: 0, max: 250}},
            BloodPressure_Systolic: {
                id: "BloodPressure_Systolic",
                name: "Συστολική Αρτηριακή Πίεση",
                input: {type: "number", step: 5, min: 60, max: 280}
            }
        };
        return a.add([{
            id: "ArterialBloodGasses",
            name: "Αέρια Αίματος",
            category: "pulmonology",
            template: "calculator.basic",
            defaultValues: {
                ArterialBlood_pH: 7.4,
                ArterialBlood_pO2: 100,
                ArterialBlood_pCO2: 40,
                ArterialBlood_H2CO3: 24,
                ArterialBlood_FiO2: .21
            },
            fields: [{
                id: "ArterialBlood_pH",
                name: "pH",
                input: {type: "number", step: .01, min: 6, max: 8}
            }, {
                id: "ArterialBlood_pO2",
                name: "pO<sub>2</sub>(mmHg)",
                input: {type: "number", step: 1, min: 1, max: 200}
            }, {
                id: "ArterialBlood_pCO2",
                name: "pCO<sub>2</sub>(mmHg)",
                input: {type: "number", step: 1, min: 1, max: 100}
            }, {
                id: "ArterialBlood_H2CO3",
                name: "H<sub>2</sub>CO<sub>3</sub>(mEq/L)",
                input: {type: "number", step: 1, min: 1, max: 100}
            }, {
                id: "ArterialBlood_FiO2",
                name: "FiO2(%)",
                input: {
                    type: "select",
                    options: [{value: .21, name: "21% (Ατμοσφαιρικός Αέρας)"}, {
                        value: .24,
                        name: "24% (Ρινικό 1lt ή Ventouri 24%)"
                    }, {value: .28, name: "28% (Ρινικό 2lt ή Ventouri 28%)"}, {
                        value: .31,
                        name: "31% (Ventouri 31%)"
                    }, {value: .35, name: "35% (Ventouri 35%)"}, {value: .4, name: "40% (Ventouri 40%)"}, {
                        value: .5,
                        name: "50% (Ventouri 50%)"
                    }, {value: .6, name: "60% (Ventouri 60%)"}]
                }
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "WellsScore",
            name: "Κριτήρια του Wells",
            category: "pulmonology pe pulmonary_embolism",
            template: "calculator.basic",
            defaultValues: {
                HistoryOf_DVT: !1,
                HeartRate: 70,
                HistoryOf_Immobilization: !1,
                Haemoptysis: !1,
                Cancer: !1,
                DVT: !1,
                PEMostLikely: !1
            },
            fields: [{id: "HistoryOf_DVT", name: "Ιστορικό PE ή DVT", input: {type: "check"}}, {
                id: "HeartRate",
                name: "Σφύξεις κατά την εισαγωγή",
                input: {type: "number", step: 1, min: 20, max: 280}
            }, {
                id: "HistoryOf_Immobilization",
                name: "Ακινητοποίηση ή πρόσφατο χειρουργείο",
                input: {type: "check"}
            }, {id: "Haemoptysis", name: "Αιμόπτυση", input: {type: "check"}}, {
                id: "Cancer",
                name: "Ενεργός καρκίνος",
                input: {type: "check"}
            }, {id: "DVT", name: "Κλινικά σημεία DVT", input: {type: "check"}}, {
                id: "PEMostLikely",
                name: "Διάγνωση PE πιο πιθανή από εναλλακτικές",
                input: {type: "check"}
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "GenevaScore",
            name: "Score της Γενέβης",
            category: "pulmonology pe pulmonary_embolism",
            template: "calculator.basic",
            defaultValues: {
                HistoryOf_DVT: !1,
                HeartRate: 70,
                HistoryOf_Immobilization: !1,
                Haemoptysis: !1,
                Cancer: !1,
                UnilateralLLimbPain: !1,
                UnilateralLLimbOedema: !1,
                Age: 65
            },
            fields: [{id: "HistoryOf_DVT", name: "Ιστορικό PE ή DVT", input: {type: "check"}}, {
                id: "HeartRate",
                name: "Σφύξεις κατά την εισαγωγή",
                input: {type: "number", step: 1, min: 20, max: 280}
            }, {
                id: "HistoryOf_Immobilization",
                name: "Πρόσφατο χειρουργείο ή κάταγμα",
                input: {type: "check"}
            }, {id: "Haemoptysis", name: "Αιμόπτυση", input: {type: "check"}}, {
                id: "Cancer",
                name: "Ενεργός καρκίνος",
                input: {type: "check"}
            }, {
                id: "UnilateralLLimbPain",
                name: "Μονόπλευρο άλγος κάτω άκρου",
                input: {type: "check"}
            }, {
                id: "UnilateralLLimbOedema",
                name: "Άλγος στη ψηλάφηση και οίδημα κάτω άκρου ",
                input: {type: "check"}
            }, e.Age, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "PESI",
            name: "Δείκτης σοβαρότητας Πνευμονικής Εμβολής (PESI)",
            category: "pulmonology pe pulmonary_embolism",
            template: "calculator.basic",
            defaultValues: {
                Age: 65,
                Sex: 0,
                Cancer: !1,
                HistoryOf_CHF: !1,
                HistoryOf_PulmonaryDisease: !1,
                HeartRate: 70,
                BloodPressure_Systolic: 120,
                BreathRate: 16,
                BodyTemperature: 36.6,
                AltMentalStatus: !1,
                ArterialBlood_pO2: 100
            },
            fields: [e.Age, e.Sex, {
                id: "Cancer",
                name: "Ενεργός καρκίνος",
                input: {type: "check"}
            }, {
                id: "HistoryOf_CHF",
                name: "Συμφορητική Καρδιακή Ανεπάρκεια",
                input: {type: "check"}
            }, {id: "HistoryOf_PulmonaryDisease", name: "Χ.Α.Π.", input: {type: "check"}}, {
                id: "HeartRate",
                name: "Σφύξεις κατά την εισαγωγή",
                input: {type: "number", step: 1, min: 20, max: 280}
            }, e.BloodPressure_Systolic, {
                id: "BreathRate",
                name: "Ρυθμός αναπνοής (bpm)",
                input: {type: "number", step: 1, min: 1, max: 60}
            }, {
                id: "BodyTemperature",
                name: "Θερμοκρασία σώματος",
                input: {type: "number", step: .1, min: 35, max: 43}
            }, {
                id: "AltMentalStatus",
                name: "Επηρεασμένη νοητική κατάσταση",
                input: {type: "check"}
            }, {
                id: "ArterialBlood_pO2",
                name: "pO<sub>2</sub>(mmHg)",
                input: {type: "number", step: 1, min: 1, max: 200}
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }])
    }])
}(), function () {
    "use strict";
    angular.module("medical.views").factory("cardiologyViews", ["views", "update", "init", "reset", function (a, b, c, d) {
        var e = {
            Result: {id: "result", input: {type: "result"}},
            Age: {id: "Age", name: "Ηλικία", input: {type: "number", step: 1, min: 1, max: 120}},
            Sex: {
                id: "Sex",
                name: "Φύλο",
                input: {type: "select", options: [{value: 0, name: "♂ Άρρεν"}, {value: 1, name: "♀ Θήλυ"}]}
            },
            Height: {id: "Height", name: "Ύψος (cm)", input: {type: "number", step: 1, min: 0, max: 250}},
            Weight: {id: "Weight", name: "Βάρος (kgr)", input: {type: "number", step: 1, min: 0, max: 250}},
            BloodPressure_Systolic: {
                id: "BloodPressure_Systolic",
                name: "Συστολική Αρτηριακή Πίεση",
                input: {type: "number", step: 5, min: 60, max: 280}
            }
        };
        return a.add([{
            id: "CHADScore",
            name: "CHAD Score",
            category: "cardiology",
            template: "calculator.basic",
            defaultValues: {
                HistoryOf_CHF: !1,
                HistoryOf_Hypertension: !1,
                Age: 65,
                HistoryOf_Diabetes: !1,
                HistoryOf_Stroke: !1,
                HistoryOf_VascularDisease: !1,
                Sex: 0
            },
            fields: [{
                id: "HistoryOf_CHF",
                name: "Συμφορητική Καρδιακή Ανεπάρκεια",
                input: {type: "check"}
            }, {
                id: "HistoryOf_Hypertension",
                name: "Αρτηριακή Υπέρταση",
                input: {type: "check"}
            }, {id: "HistoryOf_Diabetes", name: "Σακχαρώδης Διαβήτης", input: {type: "check"}}, {
                id: "HistoryOf_Stroke",
                name: "Ιστορικό TIA ή εγκεφαλικού",
                input: {type: "check"}
            }, {
                id: "HistoryOf_VascularDisease",
                name: "Περιφερική Αγγειοπάθεια",
                value: !1,
                input: {type: "check"}
            }, e.Age, e.Sex, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "CRUSADEScore",
            name: "CRUSADE Score",
            category: "cardiology",
            template: "calculator.basic",
            defaultValues: {
                Hematocrit: 40,
                GFR: 73,
                HeartRate: 70,
                BloodPressure_Systolic: 120,
                HistoryOf_VascularDisease: !1,
                HistoryOf_Diabetes: !1,
                CRUSADEScore_CHFAtPresentation: !1,
                Sex: 0
            },
            fields: [{
                id: "Hematocrit",
                name: "Αιματοκρίτης κατά την εισαγωγή",
                input: {type: "number", step: .1, min: 10, max: 70}
            }, {
                id: "GFR",
                name: "GFR",
                calculator: "GFR",
                input: {type: "number", step: .1, min: 0, max: 250}
            }, {
                id: "HeartRate",
                name: "Σφύξεις κατά την εισαγωγή",
                input: {type: "number", step: 1, min: 20, max: 280}
            }, e.BloodPressure_Systolic, {
                id: "HistoryOf_VascularDisease",
                name: "Ιστορικό αγγειακής νόσου",
                input: {type: "check"}
            }, {
                id: "HistoryOf_Diabetes",
                name: "Σακχαρώδης Διαβήτης",
                input: {type: "check"}
            }, {
                id: "CRUSADEScore_CHFAtPresentation",
                name: "Καρδιακή ανεπάρκεια κατά την εισαγωγή",
                input: {type: "check"}
            }, e.Sex, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "ESCSCORE",
            name: "ESC SCORE",
            category: "cardiology",
            template: "calculator.basic",
            defaultValues: {Age: 65, Sex: 0, BloodPressure_Systolic: 120, Smoker: !1, Cholesterol: 180},
            fields: [e.Age, e.Sex, e.BloodPressure_Systolic, {
                id: "Smoker",
                name: "Καπνιστής",
                input: {type: "check"}
            }, {
                id: "Cholesterol",
                name: "Ολική Χοληστερίνη Ορού",
                input: {type: "number", step: 5, min: 50, max: 400}
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "EuroSCORE",
            name: "EuroSCORE",
            category: "cardiology cardiosurgery",
            template: "calculator.basic",
            defaultValues: {
                Age: 65,
                Sex: 0,
                HistoryOf_PulmonaryDisease: !1,
                HistoryOf_VascularDisease: !1,
                HistoryOf_NeurologicalDisease: !1,
                HistoryOf_CardiacSurgery: !1,
                Plasma_Creatinine: 1,
                EuroSCORE_ActiveEndocarditis: !1,
                EuroSCORE_CriticalState: !1,
                AnginaAtRest: !1,
                LVEF: 60,
                EuroSCORE_MIinTheLast90Days: !1,
                PASP: 40,
                EuroSCORE_Emergency: !1,
                EuroSCORE_SimpleCABG: !1,
                EuroSCORE_ThoracicAorta: !1,
                EuroSCORE_SeptalRupture: !1
            },
            fields: [e.Age, e.Sex, {
                id: "HistoryOf_PulmonaryDisease",
                name: "Χ.Α.Π.",
                input: {type: "check"}
            }, {
                id: "HistoryOf_VascularDisease",
                name: "Εξωκαρδιακή Αρτηριοπάθεια",
                input: {type: "check"}
            }, {
                id: "HistoryOf_NeurologicalDisease",
                name: "Νευρολογική Δυσλειτουργία",
                input: {type: "check"}
            }, {
                id: "HistoryOf_CardiacSurgery",
                name: "Προηγηθήσα Καρδιοχειρουργική Επέμβαση",
                input: {type: "check"}
            }, {
                id: "Plasma_Creatinine",
                name: "Κρεατινίνη Πλάσματος",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {
                id: "EuroSCORE_ActiveEndocarditis",
                name: "Ενεργή Ενδοκαρδίτιδα",
                input: {type: "check"}
            }, {
                id: "EuroSCORE_CriticalState",
                name: "Κρίσιμη Προεγχειρητική Κατάσταση",
                input: {type: "check"}
            }, {id: "AnginaAtRest", name: "Στηθάγχη Ηρεμίας", input: {type: "check"}}, {
                id: "LVEF",
                name: "Λειτουργικότητα Αρ. Κοιλίας",
                input: {type: "number", step: 5, min: 10, max: 70}
            }, {
                id: "EuroSCORE_MIinTheLast90Days",
                name: "Πρόσφατο Έμφραγμα Μυοκαρδίου (90 ημερών)",
                input: {type: "check"}
            }, {
                id: "PASP",
                name: "Πίεση Πνευμονικής Αρτηρίας (mmHg)",
                input: {type: "number", step: 5, min: 10, max: 140}
            }, {
                id: "EuroSCORE_Emergency",
                name: "Επείγουσα Επέμβαση",
                input: {type: "check", multiplier: .7127953}
            }, {
                id: "EuroSCORE_SimpleCABG",
                name: "Απλή Αορτοστεφανιαία Παράκαμψη",
                input: {type: "check"}
            }, {
                id: "EuroSCORE_ThoracicAorta",
                name: "Επέμβαση Θωρακικής Αορτής",
                input: {type: "check"}
            }, {
                id: "EuroSCORE_SeptalRupture",
                name: "Μετεμφραγματική Ρήξη Μεσοκοιλιακού Διαφράγματος",
                input: {type: "check"}
            }, e.Result],
            init: c,
            reset: d,
            update: b,
            validate: function (a, b, c, d) {
                "aorta" === d.id && this.values.aorta === !0 && (this.values.cabg = !1), "septal" === d.id && this.values.septal === !0 && (this.values.cabg = !1), "cabg" === d.id && this.values.cabg === !0 && (this.values.aorta = this.values.septal = !1)
            }
        }, {
            id: "EuroSCOREII",
            name: "EuroSCORE II",
            category: "cardiology cardiosurgery",
            template: "calculator.basic",
            defaultValues: {
                Age: 65,
                Sex: 0,
                GFR: 73,
                HistoryOf_VascularDisease: !1,
                HistoryOf_PoorMobility: !1,
                HistoryOf_CardiacSurgery: !1,
                HistoryOf_PulmonaryDisease: !1,
                EuroSCORE_ActiveEndocarditis: !1,
                EuroSCORE_CriticalState: !1,
                HistoryOf_Diabetes: !1,
                NYHAClass: "I",
                AnginaAtRest: !1,
                LVEF: 60,
                EuroSCORE_MIinTheLast90Days: !1,
                PASP: 40,
                EuroSCOREII_Emergency: 0,
                EuroSCOREII_OperationWeight: 0,
                EuroSCORE_ThoracicAorta: !1
            },
            fields: [e.Age, e.Sex, {
                id: "GFR",
                name: "GFR",
                calculator: "GFR",
                input: {type: "number", step: .1, min: 0, max: 250}
            }, {
                id: "HistoryOf_VascularDisease",
                name: "Εξωκαρδιακή Αρτηριοπάθεια",
                input: {type: "check"}
            }, {
                id: "HistoryOf_PoorMobility",
                name: "Σοβαρά Μειωμένη Κινητικότητα",
                input: {type: "check"}
            }, {
                id: "HistoryOf_CardiacSurgery",
                name: "Προηγηθήσα Καρδιοχειρουργική Επέμβαση",
                input: {type: "check"}
            }, {
                id: "HistoryOf_PulmonaryDisease",
                name: "Χ.Α.Π.",
                input: {type: "check"}
            }, {
                id: "EuroSCORE_ActiveEndocarditis",
                name: "Ενεργή Ενδοκαρδίτιδα",
                input: {type: "check"}
            }, {
                id: "EuroSCORE_CriticalState",
                name: "Κρίσιμη Προεγχειρητική Κατάσταση",
                input: {type: "check"}
            }, {
                id: "HistoryOf_Diabetes",
                name: "Σακχαρώδης Διαβήτης ύπο ινσουλίνη",
                input: {type: "check"}
            }, {
                id: "NYHAClass",
                name: "NYHA Class",
                input: {
                    type: "select",
                    options: [{
                        value: "I",
                        name: "Class I",
                        description: "Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα"
                    }, {
                        value: "II",
                        name: "Class II",
                        description: "Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα"
                    }, {
                        value: "III",
                        name: "Class III",
                        description: "Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση"
                    }, {
                        value: "IV",
                        name: "Class IV",
                        description: "Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση"
                    }]
                }
            }, {id: "AnginaAtRest", name: "Στηθάγχη Ηρεμίας", input: {type: "check"}}, {
                id: "LVEF",
                name: "Λειτουργικότητα Αρ. Κοιλίας",
                input: {type: "number", step: 5, min: 10, max: 70}
            }, {
                id: "EuroSCORE_MIinTheLast90Days",
                name: "Πρόσφατο Έμφραγμα Μυοκαρδίου (90 ημερών)",
                input: {type: "check"}
            }, {
                id: "PASP",
                name: "Πίεση Πνευμονικής Αρτηρίας (mmHg)",
                input: {type: "number", step: 5, min: 10, max: 140}
            }, {
                id: "EuroSCOREII_Emergency",
                name: "Επείγουσα Επέμβαση",
                input: {
                    type: "select",
                    options: [{name: "Προγραμματισμένη", value: 0}, {
                        name: "Επείγουσα",
                        value: 1
                    }, {name: "Κατεπείγουσα", value: 2}, {name: "Διάσωσης", value: 3}]
                }
            }, {
                id: "EuroSCOREII_OperationWeight",
                name: "Βαρύτητα Επέμβασης",
                input: {
                    type: "select",
                    options: [{
                        name: "Απλή αορτοστεφανιαία παράκαμψη",
                        value: 0
                    }, {name: "Απλή μη αορτοστεφανιαία παράκαμψη", value: 1}, {
                        name: "Διπλή Επέμβαση",
                        value: 2
                    }, {name: "Τριπλή Επέμβαση", value: 3}]
                }
            }, {id: "EuroSCORE_ThoracicAorta", name: "Επέμβαση Θωρακικής Αορτής", input: {type: "check"}}, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "GRACEScore",
            name: "GRACE Score",
            category: "cardiology",
            template: "calculator.basic",
            defaultValues: {
                GRACEScore_arrest: !1,
                GRACEScore_stemi: !1,
                GRACEScore_troponine: !1,
                Age: 60,
                HeartRate: 70,
                BloodPressure_Systolic: 120,
                Plasma_Creatinine: 1,
                KillipClass: "I"
            },
            fields: [{
                id: "GRACEScore_arrest",
                name: "Καρδιακή Ανακοπή",
                input: {type: "check"}
            }, {
                id: "GRACEScore_stemi",
                name: "ST Ανάσπαση ή Κατάσπαση",
                input: {type: "check"}
            }, {
                id: "GRACEScore_troponine",
                name: "Παρουσία Καρδιοενζύμων",
                input: {type: "check"}
            }, e.Age, {
                id: "HeartRate",
                name: "Καρδιακή Συχνότητα",
                input: {type: "number", step: 1, min: 20, max: 280}
            }, e.BloodPressure_Systolic, {
                id: "Plasma_Creatinine",
                name: "Κρεατινίνη Πλάσματος",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {
                id: "KillipClass",
                name: "Killip Class",
                input: {
                    type: "select",
                    options: [{
                        value: "I",
                        name: "Class I",
                        description: "Απουσία κλινικών σημείων καρδιακής ανεπάρκειας"
                    }, {
                        value: "II",
                        name: "Class II",
                        description: "Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικής Φλέβας"
                    }, {value: "III", name: "Class III", description: "Οξύ Πνευμονικό Οίδημα"}, {
                        value: "IV",
                        name: "Class IV",
                        description: "Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)"
                    }]
                }
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "HASBLED",
            name: "HAS-BLED Score",
            category: "cardiology",
            template: "calculator.basic",
            defaultValues: {
                BloodPressure_Systolic: 120,
                Plasma_Creatinine: 1,
                HistoryOf_HepaticFailure: !1,
                HistoryOf_Stroke: !1,
                HistoryOf_Bleeding: !1,
                HistoryOf_UncontrolledINR: !1,
                Age: 60,
                HASBLED_Drugs: !1,
                HistoryOf_Alcohol: !1
            },
            fields: [e.BloodPressure_Systolic, {
                id: "Plasma_Creatinine",
                name: "Κρεατινίνη Πλάσματος",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {
                id: "HistoryOf_HepaticFailure",
                name: "Ηπατική Νόσος",
                description: "Κίρρωση, Χολερυθρίνη>2xΦυσιολογικό, Τρανσαμινάσες>3xΦυσιολογικό",
                input: {type: "check"}
            }, {id: "HistoryOf_Stroke", name: "Ιστορικό ΑΕΕ", input: {type: "check"}}, {
                id: "HistoryOf_Bleeding",
                name: "Αιμορραγική διάθεση",
                input: {type: "check"}
            }, {
                id: "HistoryOf_UncontrolledINR",
                name: "Δύσκολα ρυθμιζόμενο INR",
                input: {type: "check"}
            }, e.Age, {
                id: "HASBLED_Drugs",
                name: "Φάρμακα",
                description: "Αντιαιμοπεταλιακά, ΜΣΑΦ",
                input: {type: "check"}
            }, {id: "HistoryOf_Alcohol", name: "Ιστορικό χρήσης Αλκοόλ", input: {type: "check"}}, e.Result],
            init: c,
            reset: d,
            update: b,
            validate: function (a, b, c, d) {
                if ("HASBLED_RenalFailure" === d.id) {
                    var e = _.find(this.fields, function (a) {
                        return "Plasma_Creatinine" === a.id
                    });
                    e.input.disabled = a
                }
            }
        }, {
            id: "KillipClassEval",
            name: "Killip Class",
            category: "cardiology",
            template: "calculator.basic",
            defaultValues: {KillipClass: "I"},
            fields: [{
                id: "KillipClass",
                name: "Killip Class",
                input: {
                    type: "select",
                    options: [{
                        value: "I",
                        name: "Class I",
                        description: "Απουσία κλινικών σημείων καρδιακής ανεπάρκειας"
                    }, {
                        value: "II",
                        name: "Class II",
                        description: "Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικής Φλέβας"
                    }, {value: "III", name: "Class III", description: "Οξύ Πνευμονικό Οίδημα"}, {
                        value: "IV",
                        name: "Class IV",
                        description: "Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)"
                    }]
                }
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "NYHAClassEval",
            name: "NYHA Class",
            category: "cardiology",
            template: "calculator.basic",
            defaultValues: {NYHAClass: "I"},
            fields: [{
                id: "NYHAClass",
                name: "NYHA Class",
                value: "I",
                input: {
                    type: "select",
                    options: [{
                        value: "I",
                        name: "Class I",
                        description: "Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα"
                    }, {
                        value: "II",
                        name: "Class II",
                        description: "Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα"
                    }, {
                        value: "III",
                        name: "Class III",
                        description: "Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση"
                    }, {
                        value: "IV",
                        name: "Class IV",
                        description: "Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση"
                    }]
                }
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "QTc",
            name: "Διορθωμένο QT",
            category: "ecg",
            template: "calculator.basic",
            defaultValues: {HeartRate: 70, QT: 400},
            fields: [{
                id: "QT",
                name: "Διάστημα QT",
                calculator: "QT",
                input: {type: "number", step: 10, min: 200, max: 1e3}
            }, {id: "HeartRate", name: "Σφύξεις", input: {type: "number", step: 1, min: 20, max: 280}}, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "DTS",
            name: "Duke Treadmill Score (DTS)",
            category: "ecg",
            template: "calculator.basic",
            defaultValues: {Bruce_ExerciseTime: 21, Bruce_STDeviation: 0, Bruce_AnginaIndex: 0},
            fields: [{
                id: "Bruce_ExerciseTime",
                name: "Διάρκεια κόπωσης κατά Bruce (min)",
                input: {type: "number", step: 1, min: 1, max: 21}
            }, {
                id: "Bruce_STDeviation",
                name: "Μεταβολή ST (mm)",
                input: {type: "number", step: 1, min: 0, max: 10}
            }, {
                id: "Bruce_AnginaIndex",
                name: "Τύπος προκάρδιου άλγους",
                input: {
                    type: "select",
                    options: [{value: 0, name: "Απών"}, {value: 1, name: "Χωρίς περιορισμό στην κόπωση"}, {
                        value: 2,
                        name: "Με περιορισμό στην κόπωση"
                    }]
                }
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "QT",
            name: "mm σε msec",
            category: "hiddencalculator",
            template: "calculator.basic",
            defaultValues: {QTmm: 10, paperSpeed: 25},
            fields: [{
                id: "QTmm",
                name: "Διάστημα (mm)",
                input: {type: "number", step: 1, min: 1, max: 1e3}
            }, {
                id: "paperSpeed",
                name: "Ταχύτητα χαρτιού (mm/sec)",
                input: {type: "select", options: [{name: "25", value: 25}, {name: "50", value: 50}]}
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Sokolow",
            name: "Δείκτης Sokolow-Lyon",
            category: "ecg",
            template: "calculator.basic",
            defaultValues: {V1S: 10, V5R: 10, V6R: 10, aVLR: 10},
            fields: [{
                id: "V1S",
                name: "Κύμα S στην V1 (mV)",
                input: {type: "number", step: 1, min: 1, max: 50}
            }, {id: "V5R", name: "Κύμα R στην V5 (mV)", input: {type: "number", step: 1, min: 1, max: 50}}, {
                id: "V6R",
                name: "Κύμα R στην V6 (mV)",
                input: {type: "number", step: 1, min: 1, max: 50}
            }, {id: "aVLR", name: "Κύμα R στην aVL (mV)", input: {type: "number", step: 1, min: 1, max: 50}}, e.Result],
            init: c,
            reset: d,
            update: b
        }, {
            id: "HeartRate",
            name: "Καρδιακή Συχνότητα",
            category: "ecg",
            template: "calculator.basic",
            defaultValues: {HRQRS2QRSmm: 21, HRcycles: 1, paperSpeed: 25},
            fields: [{
                id: "HRQRS2QRSmm",
                name: "Απόσταση από QRS σε QRS(mm)",
                input: {type: "number", step: 1, min: 5, max: 100}
            }, {
                id: "HRcycles",
                name: "Αριθμός κύκλων",
                input: {type: "number", step: 1, min: 1, max: 10}
            }, {
                id: "paperSpeed",
                name: "Ταχύτητα χαρτιού (mm/sec)",
                input: {type: "select", options: [{name: "25", value: 25}, {name: "50", value: 50}]}
            }, e.Result],
            init: c,
            reset: d,
            update: b
        }])
    }])
}(), function () {
    "use strict";
    angular.module("medical.views").factory("triplexViews", ["views", "update", "init", "reset", function (a, b, c, d) {
        return a.add([{
            id: "Triplex_LeftAtrium_Volume",
            name: "Left Atrial Volume",
            category: "triplex atrium volume",
            template: "calculator.basic",
            defaultValues: {
                Triplex_LeftAtrium_Area4Ch: 15,
                Triplex_LeftAtrium_Area2Ch: 15,
                Triplex_LeftAtrium_Length: 40
            },
            fields: [{
                id: "Triplex_LeftAtrium_Area4Ch",
                name: "A1(cm<sup>2</sup>)",
                description: "Πλανιμέτρηση αριστερού κόλπου από εικόνα 4 κοιλοτήτων",
                input: {type: "number", step: 1, min: 5, max: 80}
            }, {
                id: "Triplex_LeftAtrium_Area2Ch",
                name: "A2(cm<sup>2</sup>)",
                description: "Πλανιμέτρηση αριστερού κόλπου από εικόνα 2 κοιλοτήτων",
                input: {type: "number", step: 1, min: 5, max: 80}
            }, {
                id: "Triplex_LeftAtrium_Length",
                name: "L(mm)",
                description: "Μήκος αριστερού κόλπου",
                input: {type: "number", step: 1, min: 5, max: 80}
            }, {id: "result", input: {type: "result"}}, {id: "image", input: {type: "image"}, url: "/images/lav.png"}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_LeftAtrium_Volume_Index",
            name: "Left Atrial Volume Index",
            category: "triplex atrium volume index",
            template: "calculator.basic",
            defaultValues: {
                Triplex_LeftAtrium_Area4Ch: 15,
                Triplex_LeftAtrium_Area2Ch: 15,
                Triplex_LeftAtrium_Length: 40,
                BSA: 1.82
            },
            fields: [{
                id: "Triplex_LeftAtrium_Area4Ch",
                name: "A1(cm<sup>2</sup>)",
                description: "Πλανιμέτρηση αριστερού κόλπου από εικόνα 4 κοιλοτήτων",
                input: {type: "number", step: 1, min: 5, max: 80}
            }, {
                id: "Triplex_LeftAtrium_Area2Ch",
                name: "A2(cm<sup>2</sup>)",
                description: "Πλανιμέτρηση αριστερού κόλπου από εικόνα 2 κοιλοτήτων",
                input: {type: "number", step: 1, min: 5, max: 80}
            }, {
                id: "Triplex_LeftAtrium_Length",
                name: "L(mm)",
                description: "Μήκος αριστερού κόλπου",
                input: {type: "number", step: 1, min: 5, max: 80}
            }, {
                id: "BSA",
                name: "BSA (m<sup>2</sup>)",
                calculator: "BSA",
                input: {type: "number", step: .1, min: .1, max: 3}
            }, {id: "result", input: {type: "result"}}, {id: "image", input: {type: "image"}, url: "/images/lav.png"}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_AorticValve_VelocityRatio_Vmax",
            name: "Aortic Valve Vmax Ratio",
            category: "triplex valvular aortic stenosis",
            template: "calculator.basic",
            defaultValues: {Triplex_LVOT_Vmax: 1, Triplex_AorticValve_Vmax: 1},
            fields: [{
                id: "Triplex_LVOT_Vmax",
                name: "LVOT Vmax<sub>1</sub> (m/s)",
                description: "Υποβαλβιδική Μέγιστη Ταχύτητα",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {
                id: "Triplex_AorticValve_Vmax",
                name: "AV Vmax<sub>2</sub> (m/s)",
                description: "Διαβαλβιδική Μέγιστη Ταχύτητα",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {id: "result", input: {type: "result"}}, {id: "image", input: {type: "image"}, url: "/images/AVVR.png"}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_AorticValve_VelocityRatio_VTI",
            name: "Aortic Valve VTI Ratio",
            category: "triplex valvular aortic stenosis",
            template: "calculator.basic",
            defaultValues: {Triplex_LVOT_VTI: 25, Triplex_AorticValve_VTI: 25},
            fields: [{
                id: "Triplex_LVOT_VTI",
                name: "LVOT VTI<sub>1</sub> (m)",
                description: "Υποβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου",
                input: {type: "number", step: 1, min: 10, max: 100}
            }, {
                id: "Triplex_AorticValve_VTI",
                name: "AV VΤΙ<sub>2</sub> (m)",
                description: "Διαβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου",
                input: {type: "number", step: 1, min: 10, max: 400}
            }, {id: "result", input: {type: "result"}}, {id: "image", input: {type: "image"}, url: "/images/AVVR.png"}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_AorticValve_Area_VTI",
            name: "Aortic Valve Area (VTI)",
            category: "triplex valvular aortic stenosis",
            template: "calculator.basic",
            defaultValues: {Triplex_LVOT_Diameter: 20, Triplex_LVOT_VTI: 20, Triplex_AorticValve_VTI: 40},
            fields: [{
                id: "Triplex_LVOT_Diameter",
                name: "Διάμετρος LVOT (mm)",
                input: {type: "number", step: 1, min: 1, max: 50}
            }, {
                id: "Triplex_LVOT_VTI",
                name: "LVOT VTI<sub>1</sub> (cm)",
                description: "Υποβαλβιδικό Ολοκλήρωμα",
                input: {type: "number", step: 1, min: 1, max: 100}
            }, {
                id: "Triplex_AorticValve_VTI",
                name: "AV VTI<sub>2</sub> (cm)",
                description: "Διαβαλβιδικό Ολοκλήρωμα",
                input: {type: "number", step: 1, min: 1, max: 100}
            }, {id: "result", input: {type: "result"}}, {id: "image", input: {type: "image"}, url: "/images/AVVR.png"}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_AorticValve_Area_Vmax",
            name: "Aortic Valve Area (Vmax)",
            category: "triplex valvular aortic stenosis",
            template: "calculator.basic",
            defaultValues: {Triplex_LVOT_Diameter: 20, Triplex_LVOT_Vmax: 1, Triplex_AorticValve_Vmax: 1},
            fields: [{
                id: "Triplex_LVOT_Diameter",
                name: "Διάμετρος LVOT (mm)",
                input: {type: "number", step: 1, min: 1, max: 50}
            }, {
                id: "Triplex_LVOT_Vmax",
                name: "LVOT Vmax<sub>1</sub> (m/s)",
                description: "Υποβαλβιδική Μέγιστη Ταχύτητα",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {
                id: "Triplex_AorticValve_Vmax",
                name: "AV Vmax<sub>2</sub> (m/s)",
                description: "Διαβαλβιδική Μέγιστη Ταχύτητα",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {id: "result", input: {type: "result"}}, {id: "image", input: {type: "image"}, url: "/images/AVVR.png"}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_AorticValve_Impedance",
            name: "Aorto-Valvular Impedance (Zva)",
            category: "triplex valvular aortic stenosis",
            template: "calculator.basic",
            defaultValues: {
                Triplex_LVOT_Diameter: 20,
                Triplex_LVOT_VTI: 20,
                BSA: 1.82,
                BloodPressure_Systolic: 120,
                Triplex_AorticValve_Vmean: 1
            },
            fields: [{
                id: "Triplex_LVOT_Diameter",
                name: "Διάμετρος LVOT (mm)",
                input: {type: "number", step: 1, min: 1, max: 50}
            }, {
                id: "Triplex_LVOT_VTI",
                name: "LVOT VTI<sub>1</sub> (cm)",
                description: "Υποβαλβιδικό Ολοκλήρωμα",
                input: {type: "number", step: 1, min: 1, max: 100}
            }, {
                id: "BSA",
                name: "BSA (m<sup>2</sup>)",
                calculator: "BSA",
                input: {type: "number", step: .1, min: .1, max: 3}
            }, {
                id: "BloodPressure_Systolic",
                name: "Συστολική Πίεση",
                input: {type: "number", step: 5, min: 60, max: 280}
            }, {
                id: "Triplex_AorticValve_Vmean",
                name: "AV Vmean(m/s)",
                description: "Διαβαλβιδική Μέση Ταχύτητα",
                input: {type: "number", step: .1, min: .1, max: 8}
            }, {id: "result", input: {type: "result"}}, {id: "image", input: {type: "image"}, url: "/images/AVVR.png"}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_Stroke_Volume",
            name: "Stroke Volume (SV)",
            category: "triplex valvular aortic stenosis stroke volume",
            template: "calculator.basic",
            defaultValues: {Triplex_LVOT_Diameter: 20, Triplex_LVOT_VTI: 20},
            fields: [{
                id: "Triplex_LVOT_Diameter",
                name: "Διάμετρος LVOT (mm)",
                input: {type: "number", step: 1, min: 1, max: 50}
            }, {
                id: "Triplex_LVOT_VTI",
                name: "LVOT VTI<sub>1</sub> (cm)",
                description: "Υποβαλβιδικό Ολοκλήρωμα",
                input: {type: "number", step: 1, min: 1, max: 100}
            }, {id: "result", input: {type: "result"}}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_Stroke_Volume_Index",
            name: "Stroke Volume Index (SVi)",
            category: "triplex valvular aortic stenosis stroke volume",
            template: "calculator.basic",
            defaultValues: {Triplex_LVOT_Diameter: 20, Triplex_LVOT_VTI: 20, BSA: 1.82},
            fields: [{
                id: "Triplex_LVOT_Diameter",
                name: "Διάμετρος LVOT (mm)",
                input: {type: "number", step: 1, min: 1, max: 50}
            }, {
                id: "Triplex_LVOT_VTI",
                name: "LVOT VTI<sub>1</sub> (cm)",
                description: "Υποβαλβιδικό Ολοκλήρωμα",
                input: {type: "number", step: 1, min: 1, max: 100}
            }, {
                id: "BSA",
                name: "BSA (m<sup>2</sup>)",
                calculator: "BSA",
                input: {type: "number", step: .1, min: .1, max: 3}
            }, {id: "result", input: {type: "result"}}],
            init: c,
            reset: d,
            update: b
        }, {
            id: "Triplex_AorticValve_Regurgitation",
            name: "Aortic Valve Regurgitation",
            category: "triplex valvular aortic regurgitation",
            template: "calculator.basic",
            defaultValues: {
                Triplex_AorticValve_Regurgitation_VenaContracta_Width: 0,
                Triplex_AorticValve_Regurgitation_PHT: 550
            },
            fields: [{
                id: "Triplex_AorticValve_Regurgitation_VenaContracta_Width",
                name: "Vena Contracta Width (cm)",
                input: {type: "number", step: .1, min: 0, max: 1.5}
            }, {
                id: "Triplex_AorticValve_Regurgitation_PHT",
                name: "Pressure Half Time (ms)",
                input: {type: "number", step: 10, min: 10, max: 1e3}
            }, {id: "result", input: {type: "multiresult"}}],
            init: c,
            reset: d,
            update: b
        }])
    }])
}(), function () {
    "use strict";
    angular.module("medical.views").factory("patientViews", ["views", "update", "init", "reset", "patientTemplateTest", function (a, b, c, d, e) {
        return a.add([{
            id: "newPatient",
            name: "Αναζήτηση/Νέος Ασθενής",
            category: "patient",
            type: "basic",
            template: "patient.search",
            defaultValues: {lastname: "", firstname: "", amka: "", age: null, birthday: null},
            fields: {
                amka: {id: "amka", name: "Α.Μ.Κ.Α.", input: {type: "amka"}},
                birthday: {id: "birthday", name: "Γενέθλια", input: {type: "date"}},
                age: {id: "age", name: "Ηλικία", input: {type: "number", step: 1, min: 1, max: 114}},
                lastname: {id: "lastname", name: "Επώνυμο", input: {type: "text"}},
                firstname: {id: "firstname", name: "Όνομα", input: {type: "text"}}
            },
            init: c,
            reset: d,
            update: b,
            validate: function (a, b, c, d) {
                var f, g = _.indexBy(c.view.fields, "id"), h = /^([0-3][0-9])([01][0-9])([0-9][0-9])([0-9#][0-9#][0-9#][0-9#][0-9#])?$/g, i = h.exec(c.view.values.amka);
                if (a !== b) {
                    if ("amka" === d.id && i) {
                        f = moment(i[1] + i[2] + "19" + i[3], "DDMMYYYY");
                        var j = moment(i[1] + i[2] + "20" + i[3], "DDMMYYYY");
                        f.isValid() && (f.isSame(c.view.values.birthday, "day") || j.isSame(c.view.values.birthday, "day") || (c.view.values.birthday = f.toDate()))
                    }
                    if ("birthday" === d.id && c.view.values.birthday && (f = moment(c.view.values.birthday), f.isValid() ? (f.format("DDMMYY") !== c.view.values.amka.substring(0, 6) && (c.view.values.amka = f.format("DDMMYY") + "#####"), c.view.values.age = moment().diff(f, "years")) : c.view.values.amka = ""), "age" === d.id) {
                        var k = c.view.values.age;
                        k !== moment().diff(c.view.values.birthday, "years") && (angular.isNumber(k) ? c.view.values.birthday = moment().subtract(k, "years").toDate() : (c.view.values.birthday = null, c.view.values.amka = ""))
                    }
                }
                g.amka.warning = !h.test(c.view.values.amka), g.birthday.warning = !c.view.values.birthday || !moment(c.view.values.birthday).isValid(), g.age.warning = !c.view.values.age, g.lastname.warning = !c.view.values.lastname, g.firstname.warning = !c.view.values.firstname, c.addPatientReady = !(g.birthday.warning || g.lastname.warning || g.firstname.warning || e(c.view.values.patients, c.view.result))
            }
        }, {
            id: "patientEdit",
            name: "Επεξεργασία Ασθενή",
            category: "patient",
            type: "basic",
            template: "patient.search",
            order: -1,
            defaultValues: {amka: "", lastname: "", firstname: "", age: null, birthday: null},
            fields: {
                amka: {id: "amka", name: "Α.Μ.Κ.Α.", input: {type: "amka"}},
                birthday: {id: "birthday", name: "Γενέθλια", input: {type: "date"}},
                age: {id: "age", name: "Ηλικία", input: {type: "number", step: 1, min: 1, max: 114}},
                lastname: {id: "lastname", name: "Επώνυμο", input: {type: "text"}},
                firstname: {id: "firstname", name: "Όνομα", input: {type: "text"}}
            },
            dontRemove: !0,
            init: c,
            update: b,
            validate: function (a, b, c, d) {
                var e, f = _.indexBy(c.view.fields, "id"), g = /^([0-3][0-9])([01][0-9])([0-9][0-9])([0-9#][0-9#][0-9#][0-9#][0-9#])?$/g, h = g.exec(c.view.values.amka);
                if (a !== b) {
                    if ("amka" === d.id && h) {
                        e = moment(h[1] + h[2] + "19" + h[3], "DDMMYYYY");
                        var i = moment(h[1] + h[2] + "20" + h[3], "DDMMYYYY");
                        e.isValid() && (e.isSame(c.view.values.birthday, "day") || i.isSame(c.view.values.birthday, "day") || (c.view.values.birthday = e.toDate()))
                    }
                    if ("birthday" === d.id && c.view.values.birthday && (e = moment(new Date(c.view.values.birthday)), e.isValid() ? (e.format("DDMMYY") !== c.view.values.amka.substring(0, 6) && (c.view.values.amka = e.format("DDMMYY") + "#####"), c.view.values.age = moment().diff(e, "years")) : c.view.values.amka = ""), "age" === d.id) {
                        var j = c.view.values.age;
                        j !== moment().diff(c.view.values.birthday, "years") && (angular.isNumber(j) ? c.view.values.birthday = moment().subtract(j, "years").toDate() : (c.view.values.birthday = null, c.view.values.amka = ""))
                    }
                }
                f.amka.warning = !g.test(c.view.values.amka), f.birthday.warning = !c.view.values.birthday || !moment(new Date(c.view.values.birthday)).isValid(), f.age.warning = !c.view.values.age, f.lastname.warning = !c.view.values.lastname, f.firstname.warning = !c.view.values.firstname
            }
        }, {
            id: "patientView",
            name: "Προβολή",
            category: "patient",
            type: "basic",
            template: "patient.view",
            defaultValues: {notes: ""},
            fields: [{id: "notes", name: "Σημειώσεις", input: {type: "static"}}],
            init: c,
            update: b
        }, {
            id: "patientNotes",
            name: "Σημειώσεις",
            category: "patient",
            type: "basic",
            template: "patient.basic",
            order: 0,
            defaultValues: {notes: ""},
            fields: [{id: "notes", name: "Σημειώσεις", input: {type: "richtext"}}],
            init: c,
            update: b
        }, {
            id: "patientContactDetails",
            name: "Στοιχεία Επικοινωνίας",
            category: "patient",
            type: "basic",
            template: "patient.basic",
            order: -1,
            defaultValues: {telNo: "", mobileNo: "", address: ""},
            fields: [{id: "telNo", name: "Τηλέφωνο", input: {type: "telephone"}}, {
                id: "mobileNo",
                name: "Κινητό",
                input: {type: "telephone"}
            }, {id: "address", name: "Διεύθυνση", input: {type: "multiline"}}],
            init: c,
            update: b
        }])
    }])
}(), function () {
    "use strict";
    angular.module("medical.services", ["ngStorage", "firebase"]).factory("uuid", function () {
        return {
            generate: function () {
                var a = (new Date).getTime(), b = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (b) {
                    var c = (a + 16 * Math.random()) % 16 | 0;
                    return a = Math.floor(a / 16), ("x" == b ? c : 7 & c | 8).toString(16)
                });
                return b
            }
        }
    }).factory("appVersion", function () {
    }).factory("patientTemplateTest", function () {
        return function (a, b) {
            var c = /^([0-9]+)#*/g, d = b && b.amka && 0 === b.amka.search(c) ? b.amka.split(c)[1] : b.amka;
            return a && a.firstname && 0 === a.firstname.toLowerCase().lastIndexOf(b.firstname.toLowerCase(), 0) && a.lastname && 0 === a.lastname.toLowerCase().lastIndexOf(b.lastname.toLowerCase(), 0) && a.amka && 0 === a.amka.lastIndexOf(d, 0)
        }
    }).factory("patientLocalStorage", ["$q", "$localStorage", "uuid", function (a, b, c) {
        b.patients = b.patients || {};
        var d = b.patients;
        return {
            patients: function () {
                var b = a.defer();
                return b.resolve({
                    list: d, add: function (a) {
                        a.id = a.id || c.generate(), d[a.id] = a
                    }, remove: function (a) {
                        delete d[a.id]
                    }
                }), b.promise
            }, patient: function (b) {
                var c = a.defer();
                return c.resolve({
                    value: angular.copy(d[b]), save: function () {
                        d[b] = this.value
                    }, "delete": function () {
                        delete d[b]
                    }
                }), c.promise
            }
        }
    }]).factory("trasverse", [function () {
        var a = function (b, c) {
            return _.each(b, function (b, d, e) {
                "$" != d[0] && "_" != d[0] && (angular.isFunction(b) || (c(b, d, e), angular.isObject(b) && a(b, c)))
            }), a
        };
        return a
    }]).factory("patientWebStorage", ["$q", "$firebase", "$FirebaseObject", "uuid", "trasverse", function (a, b, c, d) {
        return {
            patients: function () {
                var c = b(new Firebase("https://medrichana.firebaseio.com/backend")).$asArray(), e = a.defer();
                return c.$loaded(function (a) {
                    e.resolve({
                        list: a, add: function (a) {
                            a.id = a.id || d.generate(), c.$inst().$set(a.id, a)
                        }, remove: function (a) {
                            c.$remove(a)
                        }
                    })
                }), e.promise
            }, patient: function (d) {
                var e = c.$extendFactory({
                    toJSON: function () {
                        var a = angular.fromJson(angular.toJson(_.omit(angular.extend({}, this), function (a, b) {
                            return "$" === b[0]
                        })));
                        return a
                    }
                }), f = b(new Firebase("https://medrichana.firebaseio.com/backend/" + d), {objectFactory: e}).$asObject(), g = a.defer();
                return f.$loaded(function (a) {
                    g.resolve({
                        value: a, save: function () {
                            f.$save()
                        }, "delete": function () {
                            f.$remove()
                        }
                    })
                }), g.promise
            }
        }
    }]).factory("patientHybridStorage", ["$q", "patientLocalStorage", "patientWebStorage", function (a, b) {
        return {
            patients: function () {
                return b.patients()
            }, patient: function (a) {
                return b.patient(a)
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("medical.controllers", ["ngRoute", "medical.views"]).config(["$routeProvider", "$locationProvider", function (a, b) {
        a.when("/Calculators/:id", {
            templateUrl: "partials/calculators.html",
            controller: "calculatorCtrl"
        }).when("/Patient/:id", {
            templateUrl: "partials/patient.html",
            controller: "patientCtrl",
            resolve: {
                patient: ["$route", "patientHybridStorage", function (a, b) {
                    return b.patient(a.current.params.id)
                }]
            }
        }).when("/Patients", {
            templateUrl: "partials/patients.html",
            controller: "patientsCtrl",
            resolve: {
                patients: ["patientHybridStorage", function (a) {
                    return a.patients()
                }]
            }
        }).otherwise({redirectTo: "/Calculators/Generic"}), b.html5Mode(!1)
    }]).controller("generalCtrl", ["$rootScope", "$scope", "$route", "$location", "$modal", function (a, b, c, d, e) {
        b.online = !1, a.onlineUser = !1, b.filters = [{
            name: "Κλινική Ιατρική",
            content: "/Calculators/Generic",
            category: "Υπολογιστές"
        }, {name: "Πνευμονολογία", content: "/Calculators/Pulmonology", category: "Υπολογιστές"}, {
            name: "Καρδιολογία",
            content: "/Calculators/Cardiology",
            category: "Υπολογιστές"
        }, {name: "ΗΚΓ", content: "/Calculators/Ecg", category: "Υπολογιστές"}, {
            name: "Triplex",
            content: "/Calculators/Triplex",
            category: "Υπολογιστές"
        }], b.$on("$routeChangeSuccess", function () {
            b.location = d.path()
        });
        var f = e({
            scope: b,
            animation: "am-flip-x",
            placement: "center",
            container: "body",
            title: "OnLine",
            contentTemplate: "partials/modalOnlineId.html",
            show: !1
        });
        b.$watch("online", function () {
            b.online ? a.onlineUser || (b.online = !1, f.$promise.then(f.show)) : a.onlineUser = !1
        }), b.$watch("location", function () {
            d.path(b.location)
        })
    }]).controller("onlineCtrl", ["$rootScope", "$scope", "$modal", function (a, b) {
        b.setOnline = function () {
            b.$parent.$hide(), b.$parent.$parent.online = !0, a.onlineUser = b.onlineUser
        }
    }]).controller("calculatorCtrl", ["$scope", "$route", "$routeParams", "views", "internalMedicineViews", "pulmonologyViews", "cardiologyViews", "triplexViews", function (a, b, c, d) {
        a.filters = {
            Generic: {name: "Κλινική Ιατρική", content: d.categories().generic},
            Pulmonology: {name: "Πνευμονολογία", content: d.categories().pulmonology},
            Cardiology: {name: "Καρδιολογία", content: d.categories().cardiology},
            Ecg: {name: "Ηλεκτροκαρδιογράφημα", content: d.categories().ecg},
            Triplex: {name: "Triplex", content: d.categories().triplex}
        }, a.filters.setAbsolute = function (b) {
            a.views = a.filters[b].content, a.panelsList = a.views, a.filters.active = b, a.values = {}, _.each(a.panelsList, function (b) {
                b.values = a.values
            })
        }, a.$on("$routeChangeSuccess", function (b, c) {
            a.filters.setAbsolute(c.params.id)
        }), a.clearPanel = function (b) {
            var c = _.find(a.views, function (a) {
                return a.id === b
            });
            c.reset()
        }
    }]).controller("patientCtrl", ["$scope", "$location", "patient", "views", "patientViews", "internalMedicineViews", "pulmonologyViews", "cardiologyViews", "triplexViews", function (a, b, c, d) {
        var e = function () {
            a.panelsList = angular.copy(_.sortBy(_.filter(d.all(), function (b) {
                return _.contains(_.keys(a.patient.calculatorsActive), b.id)
            }), "order"))
        };
        a.patient = c.value, e(), _.each(a.panelsList, function (b) {
            b.values = a.patient
        }), a.fullName = function (a) {
            return a && a.lastname + ", " + a.firstname
        }, a.save = function () {
            c.save(), b.path("/Patients")
        }, a["delete"] = function () {
            c["delete"](), b.path("/Patients")
        }, a.dropdown = [{
            text: "Στοιχεία Επικοινωνίας...",
            disabled: "existPanel('patientContactDetails')",
            click: "addPanel('patientContactDetails')"
        }, {
            text: "Σημειώσεις...",
            disabled: "existPanel('patientNotes')",
            click: "addPanel('patientNotes')"
        }], a.existPanel = function (b) {
            return _.contains(_.keys(a.patient.calculatorsActive), b)
        }, a.addPanel = function (b) {
            a.patient.calculatorsActive = a.patient.calculatorsActive || {}, a.patient.calculatorsActive[b] = !0, e(), _.each(a.panelsList, function (b) {
                b.values = a.patient
            })
        }, a.removePanel = function (b) {
            _.each(d.all()[b].defaultValues, function (b, c) {
                a.patient[c] = b
            }), delete a.patient.calculatorsActive[b], a.panelsList = _.filter(d.all(), function (b) {
                return _.contains(_.keys(a.patient.calculatorsActive), b.id)
            }), _.each(a.panelsList, function (b) {
                b.values = a.patient
            })
        }
    }]).controller("patientsCtrl", ["$scope", "$location", "views", "patients", "patientViews", function (a, b, c, d) {
        var e = {};
        a.searchView = c.all().newPatient, a.patientView = c.all().patientView, a.searchView.values = a.values = e, a.values.patients = d.list, a.searchView.addPatient = function () {
            this.result.calculatorsActive = {patientEdit: !0}, d.add(this.result), a.go("/Patient/" + this.result.id)
        }, a.go = function (a) {
            b.path(a)
        }, a.$watch("values", function () {
            a.patientTemplate = {amka: e.amka, firstname: e.firstname, lastname: e.lastname}
        }, !0), a.clearPanel = function (a) {
            c.all()[a].reset()
        }, a.fullName = function (a) {
            return a && a.lastname + ", " + a.firstname
        }
    }])
}(), function () {
    "use strict";
    angular.module("medical.filters", []).filter("to_trusted", ["$sce", function (a) {
        return function (b) {
            return a.trustAsHtml(angular.isDefined(b) ? "" + b : "")
        }
    }]).filter("filterPatients", ["patientTemplateTest", function (a) {
        return function (b, c) {
            var d = a, e = _.sortBy(_.filter(b, function (a) {
                return d(a, c)
            }), function (a) {
                return a.lastname + " " + a.firstname
            });
            return e
        }
    }]).filter("interpolate", ["version", function (a) {
        return function (b) {
            return String(b).replace(/\%VERSION\%/gm, a)
        }
    }])
}(), function () {
    "use strict";
    var a = function (a) {
        a = $(a);
        var b = a.closest(".scrollable-content"), c = b.scrollTop() + a.offset().top - b.offset().top;
        b.animate({scrollTop: c}, 1800)
    };
    angular.module("medical.directives", []).directive("autosize", [function () {
        return {
            restrict: "A", link: function (a, b) {
                b.css("resize", "none");
                var c = function () {
                    b.height(0).height(b[0].scrollHeight)
                };
                b.on("change keyup keydown paste cut", function () {
                    c()
                }), setTimeout(c, 0)
            }
        }
    }]).directive("scrollto", [function () {
        return function (b, c, d) {
            c.bind("click", function (b) {
                b.preventDefault(), d.href && (d.scrollto = d.href);
                var c = $(d.scrollto);
                a(c)
            })
        }
    }]).directive("affix", ["$window", function (a) {
        return {
            restrict: "A", link: function (b, c, d) {
                $(a).scroll(function () {
                    var b, e, f, g = a.scrollY;
                    g > c.offset().top && (this.originalOffset = c.offset().top, b = $("body"), f = parseInt(b.css("padding-top"), 10), e = parseInt(d.affixOffset, 10), b.css("padding-top", f + e), c.addClass(d.affix || "affix")), g < this.originalOffset && (b = $("body"), e = parseInt(d.affixOffset, 10), f = parseInt(b.css("padding-top"), 10), b.css("padding-top", f - e), c.removeClass(d.affix || "affix"))
                })
            }
        }
    }]).directive("scrollSpy", [function () {
        return {
            restrict: "A", link: function (a, b, c) {
                var d = $(".scroll-spy-target"), e = function () {
                    var a = $(c.scrollSpy), d = $(".scroll-spy-target");
                    if (!a.length)return void d.off("scroll", e);
                    var f = d.height() / 2, g = a.offset().top - d.offset().top;
                    f > g && g + a.height() > f ? b.addClass("active") : b.removeClass("active")
                };
                d.on("scroll", e)
            }
        }
    }]).directive("selectOnFocus", function () {
        return {
            restrict: "A", link: function (a, b, c) {
                var d;
                b.on("click", function () {
                    if (d !== this) {
                        var a = this.value.search(c.selectOnFocus);
                        "number" !== c.type ? this.setSelectionRange(a, this.value.length) : this.select(), d = this
                    }
                }), b.on("blur", function () {
                    d = null
                })
            }
        }
    }).directive("visibleOnFocus", function () {
        return {
            restrict: "A", link: function (b, c) {
                var d;
                c.on("click", function () {
                    if (d !== this) {
                        d = this;
                        var b, c = $(this).parent().parent().prevUntil("label");
                        b = c.length ? $(c[c.length - 1]).prev("label") : $(this).parent().parent().prev("label").length ? $(this).parent().parent().prev("label") : this, a(b)
                    }
                }), c.on("blur", function () {
                    d = null
                })
            }
        }
    }).directive("navView", function () {
        return {
            restrict: "E",
            replace: !0,
            scope: {view: "="},
            template: '<a class="list-group-item" scrollto="#{{view.id}}" scroll-spy="#{{view.id}}" href>{{view.name}} <i class="icon-right pull-right"></i></a>'
        }
    }).directive("result", function () {
        return {
            restrict: "E",
            replace: !0,
            scope: {result: "="},
            template: "<div ng-class=\"{'alert': result.resultlevel!=null, 'alert-danger': result.resultlevel==3, 'alert-warning': result.resultlevel==2, 'alert-info': result.resultlevel==1, 'alert-success': result.resultlevel==0}\"><h3 ng-bind-html=\"result.result + result.suffix | to_trusted\"></h3><h4 ng-bind-html=\"result.explanation | to_trusted\"></h4></div>"
        }
    }).directive("multiresult", function () {
        return {
            restrict: "E",
            replace: !0,
            scope: {result: "="},
            link: function (a) {
                a.$watchCollection("result", function (a, b, c) {
                    c.resultlevel = Math.round(_.reduce(c.result, function (a, b) {
                            return a + b.resultlevel
                        }, 0) / c.result.length)
                })
            },
            template: "<div ng-class=\"{'alert': resultlevel!=null, 'alert-danger': resultlevel==3, 'alert-warning': resultlevel==2, 'alert-info': resultlevel==1, 'alert-success': resultlevel==0}\"><h4><ul class=\"list-group\"><li class=\"list-group-item\" ng-class=\"{'list-group-item-danger': resultitem.resultlevel==3, 'list-group-item-warning': resultitem.resultlevel==2, 'list-group-item-info': resultitem.resultlevel==1, 'list-group-item-success': resultitem.resultlevel==0}\" ng-repeat=\"resultitem in result track by $index\">{{resultitem.name}} <span class=\"badge\">{{resultitem.value}}</span></li></ul></h4></div>"
        }
    }).directive("view", ["$compile", "$http", "$templateCache", function (a, b, c) {
        return {
            restrict: "E", replace: !0, scope: {view: "="}, link: function (d, e) {
                d.view.update && (d.view.init && d.view.init(), _.each(d.view.fields, function (a) {
                    d.$watch("view.values." + a.id, function (b, c, d) {
                        d.view.update && (d.view.result = d.view.update(b, c, d, a))
                    })
                }), _.each(d.view.external, function (a) {
                    d.$watch("view.values." + a, function (a, b, c) {
                        c.view.update && (c.view.result = c.view.update(a, b, c, null))
                    })
                }), d.$watchCollection("view.values.calculatorsActive", function () {
                    _.each(d.view.fields, function (a) {
                        a.input.disabled = _.contains(_.keys(d.view.values.calculatorsActive), a.id)
                    })
                }));
                var f = d.view.template || "calculator", g = b.get("partials/views/" + f + ".html", {cache: c});
                g.success(function (a) {
                    e.html(a)
                }).then(function () {
                    e.replaceWith(a(e.html())(d))
                })
            }
        }
    }]).directive("switch", function () {
        return {
            restrict: "E",
            require: "^ngModel",
            replace: !0,
            scope: {},
            template: '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" checked><label class="onoffswitch-label"><span class="onoffswitch-inner" data-off="{{::off}}"" data-on="{{::on}}"></span><span class="onoffswitch-switch"></span></label></div>',
            link: function (a, b, c, d) {
                a.on = c.on, a.off = c.off, d.$render = function () {
                    $(b.children(0)[0]).prop("checked", d.$viewValue)
                }, b.on("click tap", function () {
                    c.disabled || (a.$apply(d.$setViewValue(!d.$viewValue)), d.$render())
                })
            }
        }
    }).directive("customInput", ["$compile", function (a) {
        var b = {
            none: "",
            image: '<img ng-src="{{field.url}}" class="img-responsive"/>',
            number: '<input select-on-focus visible-on-focus class="form-control" type="number" step="{{field.input.step}}" min="{{field.input.min}}" max="{{field.input.max}}" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]"/><span class="help-inline">{{field.description}}</span>',
            text: '<input select-on-focus visible-on-focus class="form-control" type="text" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" maxlength="{{field.input.length || 524288}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
            telephone: '<div class="input-group"><input select-on-focus visible-on-focus class="form-control" type="tel" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" maxlength="10" ng-model="values[field.id]" /><span class="input-group-btn"><a class="btn btn-default" href="tel:{{values[field.id]}}">Κλήση</a></span></div><span class="help-inline">{{field.description}}</span>',
            amka: '<input select-on-focus="#" visible-on-focus class="form-control" type="tel" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" maxlength="11" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
            select: '<select class="form-control" required ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-options="option.value as option.name for option in field.input.options"></select><span class="help-inline">{{fieldFromAnyValue(values[field.id], "value", field.input.options).description}}</span>',
            check: '<switch ng-model="values[field.id]"></switch>',
            radio: '<div class="btn-group" data-toggle="buttons-checkbox"><button type="button" class="btn span2" ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
            vradio: '<div class="btn-group btn-group-vertical" data-toggle="buttons-checkbox"><button type="button" class="btn span4" ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
            result: '<result result="result"></result>',
            multiresult: '<multiresult result="result"></multiresult>',
            "static": '<div class="form-control-static" name="{{field.id}}" ng-bind-html="values[field.id] | to_trusted"></div>',
            staticmultiline: '<textarea class="form-control" ng-disabled="true" ng-class="{disabled: true}" name="{{field.id}}" ng-model="values[field.id]" />',
            date: '<input type="text" class="form-control" ng-model="values[field.id]" name="field.id" bs-datepicker data-date-type="date" data-date-format="dd-MM-yyyy" data-autoclose="true" data-max-date="today" data-icon-left="icon-left" data-icon-right="icon-right" data-use-native="true" data-start-view=2 />',
            multiline: '<textarea autosize visible-on-focus class="form-control" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
            richtext: '<textarea ui-tinymce="{language : \'el\', menubar : false, statusbar : false, resize: false, toolbar: [ \'undo redo paste | searchreplace | styleselect bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | insertdatetime\'], insertdatetime_formats:[\'%d/%m/%Y\', \'%H:%M\', \'%d/%m/%Y %H:%M\'], plugins: \'autoresize paste insertdatetime lists searchreplace\'}" autosize visible-on-focus class="form-control" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>'
        };
        return {
            restrict: "E", replace: !0, scope: {field: "=", values: "=", result: "="}, link: function (c, d) {
                var e = b[c.field.input.type];
                d.html(e), d.replaceWith(a(e)(c))
            }
        }
    }]).directive("verifiedClick", ["$timeout", "$animate", function (a, b) {
        return {
            restrict: "A", scope: {verifiedClick: "&"}, link: function (c, d, e) {
                d.on("tap click", function () {
                    c.$apply(function () {
                        var f = e.verifyWait || 1500;
                        c.timer ? (a.cancel(c.timer), c.timer = !1, b.removeClass(d, "verify"), c.verifiedClick(c.elem, e)) : (b.addClass(d, "verify"), c.timer = a(function () {
                            c.timer = !1, b.removeClass(d, "verify")
                        }, f))
                    })
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("medicalCalculator", ["medical.controllers", "medical.filters", "medical.services", "medical.directives", "ngRoute", "ngTouch", "ngAnimate", "ngSanitize", "mobile-angular-ui", "mgcrea.ngStrap"])
}();