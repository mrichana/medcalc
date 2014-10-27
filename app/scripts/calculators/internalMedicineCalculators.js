/*global angular: true */
/*global _: true */

(function() {
    'use strict';

    /* Services */

    /**
     * medical.calculators Module
     *
     * Description
     */
    angular.module('medical.calculators').
    factory('internalMedicineCalculators', ['mathParser', 'roundNum', 'evaluator',
        function(mathParser, roundNum, evaluator) {
            return {
                ArterialBloodGasses: function(values) {
                    var expectedPco2, phHigh, phLow, hco3High, hco3Low;
                    var result = '',
                        explanation = '',
                        resultlevel;

                    //  Primary Metabolic Disorders
                    if ((values['ArterialBlood_pH'] < 7.36) && (values['ArterialBlood_pCO2'] <= 40)) {
                        result = 'Πρωτοπαθής μεταβολική οξέωση';
                        expectedPco2 = 1.5 * values['ArterialBlood_H2CO3'] + 8;
                    }

                    if ((values['ArterialBlood_pH'] > 7.44) && (values['ArterialBlood_pCO2'] >= 40)) {
                        result = 'Πρωτοπαθής μεταβολική αλκάλωση';
                        expectedPco2 = 0.7 * values['ArterialBlood_H2CO3'] + 21;
                    }

                    expectedPco2 = roundNum(expectedPco2, 0);

                    if (values['ArterialBlood_pCO2'] > (expectedPco2 + 2)) {
                        result += ',\nμε αναπνευστική οξέωση';
                        resultlevel = 2;
                    }
                    if (values['ArterialBlood_pCO2'] < (expectedPco2 - 2)) {
                        result += ',\nμε αναπνευστική αλκάλωση';
                        resultlevel = 2;
                    }
                    if ((values['ArterialBlood_pCO2'] <= (expectedPco2 + 2)) && (values['ArterialBlood_pCO2'] >= (expectedPco2 - 2))) {
                        result += ',\nμε πλήρη αναπνευστική αντιρρόπηση';
                        resultlevel = 1;
                    }

                    //  Primary Respiratory Disorders
                    if ((values['ArterialBlood_pH'] < 7.4) && (values['ArterialBlood_pCO2'] > 44)) {
                        result = 'Πρωτοπαθής αναπνευστική οξέωση';

                        phHigh = 7.4 - (0.003 * (values['ArterialBlood_pCO2'] - 40));
                        phLow = 7.4 - (0.008 * (values['ArterialBlood_pCO2'] - 40));
                        hco3High = 24 + (0.35 * (values['ArterialBlood_pCO2'] - 40));
                        hco3Low = 24 + (0.1 * (values['ArterialBlood_pCO2'] - 40));

                        phLow = roundNum(phLow, 2);
                        phHigh = roundNum(phHigh, 2);
                        hco3Low = roundNum(hco3Low, 0);
                        hco3High = roundNum(hco3High, 0);

                        if (values['ArterialBlood_pH'] <= (phLow + 0.02)) {
                            result = 'Οξεία (μη αντιρροπούμενη) ' + result;
                            if (values['ArterialBlood_H2CO3'] < (hco3Low - 2)) {
                                result += ',\nμε μεταβολική οξέωση';
                                resultlevel = 3;
                            }
                        }

                        if (values['ArterialBlood_pH'] >= (phHigh - 0.02001)) {
                            result = 'Χρόνια (αντιρροπούμενη) ' + result;
                            if (values['ArterialBlood_H2CO3'] > (hco3High + 2)) {
                                result += ',\nμε μεταβολική αλκάλωση';
                                resultlevel = 1;
                            }
                        }

                        if ((values['ArterialBlood_pH'] > (phLow + 0.02)) && (values['ArterialBlood_pH'] < (phHigh - 0.02001))) {
                            result = '(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική οξέωση, ή\n(2) οξεία επί χρόνιας ' + result + ', ή\n(3) μικτή οξεία αναπνευστική οξέωση με μικρή μεταβολική αλκάλωση';
                            resultlevel = 2;

                        }
                    }

                    if ((values['ArterialBlood_pH'] > 7.4) && (values['ArterialBlood_pCO2'] < 36)) {
                        result = 'Πρωτοπαθής αναπνευστική αλκάλωση';
                        phLow = 7.4 + (0.0017 * (40 - values.ArterialBlood_pCO2));
                        phHigh = 7.4 + (0.008 * (40 - values.ArterialBlood_pCO2));
                        hco3Low = 24 - (0.5 * (40 - values.ArterialBlood_pCO2));
                        hco3High = 24 - (0.25 * (40 - values.ArterialBlood_pCO2));

                        phLow = roundNum(phLow, 2);
                        phHigh = roundNum(phHigh, 2);
                        hco3Low = roundNum(hco3Low, 0);
                        hco3High = roundNum(hco3High, 0);

                        if (values['ArterialBlood_pH'] <= (phLow + 0.02)) {
                            result = 'Χρόνια (αντιρροπούμενη) ' + result;
                            if (values['ArterialBlood_H2CO3'] < (hco3Low - 2)) {
                                result += ',\nμε μεταβολική οξέωση';
                            }
                            resultlevel = 1;
                        }

                        if (values['ArterialBlood_pH'] >= (phHigh - 0.02)) {
                            result = 'Οξεία (μη αντιρροπούμενη) ' + result;
                            if (values['ArterialBlood_H2CO3'] > (hco3High + 2)) {
                                result += ',\nμε μεταβολική αλκάλωση';
                            }
                            resultlevel = 3;
                        }

                        if ((values['ArterialBlood_pH'] > (phLow + 0.02)) && (values['ArterialBlood_pH'] < (phHigh - 0.02))) {
                            result = '(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική αλκάλωση, ή\n' +
                                '(2) οξεία επί χρόνιας ' + result + ', ή\n' +
                                '(3) μικτή οξεία αναπνευστική αλκάλωση με μικρή μεταβολική οξέωση';
                            resultlevel = 2;
                        }
                    }

                    //  Mixed Acid-Base Disorders
                    if ((result === '') || (result === null)) {
                        if ((values['ArterialBlood_pH'] >= 7.36) && (values['ArterialBlood_pH'] <= 7.44)) {
                            if ((values['ArterialBlood_pCO2'] > 40) && (values['ArterialBlood_H2CO3'] > 26)) {
                                result = 'Μικτή αναπνευστική οξέωση - μεταβολική αλκάλωση';
                                //expectedPco2 = 0.7 * values['ArterialBlood_H2CO3'] + 21;
                                resultlevel = 3;
                            } else if ((values['ArterialBlood_pCO2'] < 40) && (values['ArterialBlood_H2CO3'] < 22)) {
                                result = 'Μικτή αναπνευστική αλκάλωση - μεταβολική οξέωση';
                                //expectedPco2 = 1.5 * values['ArterialBlood_H2CO3'] + 8;
                                resultlevel = 3;
                            } else {
                                result = 'Φυσιολογικά αέρια αίματος';
                                resultlevel = 0;
                            }
                        }
                    }

                    var Aa = roundNum(((values.FiO2 * 713) - (values.pCO2 / 0.8)) - values.pO2, 0);
                    if (Aa >= 10) {
                        explanation = 'Αυξημένο shunt<br />Εκτεταμένες Διαταραχές του V/Q<br />Διαταραχή στην Ανταλλαγή των Αερίων';
                    } else if (Aa > 0) {
                        explanation = 'Υποαερισμός (Κεντρικής Αιτιολογίας, Νευρομυικός κτλ.)<br />Χαμηλή Συγκέντρωση Οξυγόνου (Υψόμετρο κτλ.)';
                    }

                    return {
                        result: result,
                        explanation: explanation,
                        resultlevel: resultlevel
                    };
                },
                BMI: function(values) {
                    var ret = {};
                    var local = _.extend({}, values);
                    ret.formula = 'Weight / (Height/100) ^ 2';
                    ret.result = roundNum(evaluator(local, ret.formula));

                    if (ret.result > 40) {
                        ret.explanation = 'Νοσογόνος Παχυσαρκία';
                        ret.resultlevel = 3;
                    } else if (ret.result > 35) {
                        ret.explanation = 'Παχύσαρκος';
                        ret.resultlevel = 3;
                    } else if (ret.result > 30) {
                        ret.explanation = 'Ήπια Παχύσαρκος';
                        ret.resultlevel = 2;
                    } else if (ret.result > 25) {
                        ret.explanation = 'Υπέρβαρος';
                        ret.resultlevel = 1;
                    } else if (ret.result > 18.5) {
                        ret.explanation = 'Υγειές Βάρος';
                        ret.resultlevel = 0;
                    } else if (ret.result > 16) {
                        ret.explanation = 'Ελιποβαρής';
                        ret.resultlevel = 1;
                    } else if (ret.result > 15) {
                        ret.explanation = 'Έντονα Ελιποβαρής';
                        ret.resultlevel = 3;
                    } else {
                        ret.explanation = 'Καχεκτικός';
                        ret.resultlevel = 3;
                    }
                    return ret;
                },
                BSA: function(values) {
                    var ret = {};
                    var local = _.extend({}, values);
                    ret.formula = 'sqrt (( Height * Weight ) / 3600)';
                    ret.result = roundNum(evaluator(local, ret.formula), 2);
                    ret.resultlevel = 0;

                    return ret;
                },
                Calculator: function(values) {
                    var ret = {};

                    try {
                        ret.formula = values.Calculation;
                        ret.result = mathParser.eval(ret.formula);
                        ret.resultlevel = 0;
                        if (!angular.isNumber(ret.result)) {
                            throw 'nan';
                        }
                        if (!isFinite(ret.result)) {
                            ret.result = 'Άπειρο';
                            ret.resultlevel = 2;
                        }
                    } catch (err) {
                        ret.result = 'Λάθος Υπολογισμός';
                        ret.resultlevel = 3;
                    }
                    return ret;
                },
                CHADScore: function(values) {
                    var ret = {};
                    var local = _.extend({}, values);

                    if (values.Age > 75) {
                        local['ChadScore_AgeGroup'] = 2;
                    } else if (values.Age > 65) {
                        local['ChadScore_AgeGroup'] = 1;
                    } else {
                        local['ChadScore_AgeGroup'] = 0;
                    }


                    ret.formula = 'HistoryOf_CHF + HistoryOf_Hypertension + ChadScore_AgeGroup + HistoryOf_Diabetes + (HistoryOf_Stroke * 2) + HistoryOf_VascularDisease + Sex';
                    ret.result = evaluator(local, ret.formula);

                    switch (ret.result) {
                        case 0:
                            ret.explanation = 'Όχι αγωγή';
                            ret.resultlevel = 0;
                            break;
                        case 1:
                            ret.explanation = 'Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή NOAC ή Ασπιρίνη';
                            ret.resultlevel = 1;
                            break;
                        default:
                            ret.explanation = 'Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή NOAC';
                            ret.resultlevel = 2;
                    }
                    return ret;
                },
                CRUSADEScore: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;
                    var local = _.extend({}, values);
                    if (values.Hematocrit >= 40) {
                        local.ht = 0;
                    } else if (values.Hematocrit >= 37) {
                        local.ht = 2;
                    } else if (values.Hematocrit >= 34) {
                        local.ht = 3;
                    } else if (values.Hematocrit >= 31) {
                        local.ht = 7;
                    } else {
                        local.ht = 9;
                    }

                    if (values.GFR > 120) {
                        local.gfr = 0;
                    } else if (values.GFR > 90) {
                        local.gfr = 7;
                    } else if (values.GFR > 60) {
                        local.gfr = 17;
                    } else if (values.GFR > 30) {
                        local.gfr = 28;
                    } else {
                        local.gfr = 35;
                    }

                    if (values.HeartRate > 120) {
                        local.hr = 11;
                    } else if (values.HeartRate > 110) {
                        local.hr = 10;
                    } else if (values.HeartRate > 100) {
                        local.hr = 8;
                    } else if (values.HeartRate > 90) {
                        local.hr = 6;
                    } else if (values.HeartRate > 80) {
                        local.hr = 3;
                    } else if (values.HeartRate > 70) {
                        local.hr = 1;
                    } else {
                        local.hr = 0;
                    }

                    if (values.BloodPressure_Systolic > 200) {
                        local.sbp = 5;
                    } else if (values.BloodPressure_Systolic > 180) {
                        local.sbp = 3;
                    } else if (values.BloodPressure_Systolic > 120) {
                        local.sbp = 1;
                    } else if (values.BloodPressure_Systolic > 100) {
                        local.sbp = 5;
                    } else if (values.BloodPressure_Systolic > 90) {
                        local.sbp = 8;
                    } else {
                        local.sbp = 10;
                    }

                    var probability = [2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4, 4.1, 4.3, 4.4, 4.6, 4.7, 4.9, 5, 5.2, 5.4, 5.6, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9, 7.2, 7.4, 7.6, 7.9, 8.1, 8.4, 8.6, 8.9, 9.2, 9.5, 9.8, 10.1, 10.4, 10.7, 11.1, 11.4, 11.7, 12.1, 12.5, 12.8, 13.2, 13.6, 14, 14.4, 14.9, 15.3, 15.7, 16.2, 16.7, 17.1, 17.6, 18.1, 18.6, 19.2, 19.7, 20.2, 20.8, 21.4, 21.9, 22.5, 23.1, 23.7, 24.4, 25, 25.6, 26.3, 27, 27.6, 28.3, 29, 29.7, 30.4, 31.2, 31.9, 32.6, 33.4, 34.2, 34.9, 35.7, 36.5, 37.3, 38.1, 38.9, 39.7, 40.5, 41.3, 42.2, 43, 43.8];

                    result =
                        local.ht * 1 +
                        local.gfr * 1 +
                        local.hr * 1 +
                        local.sbp * 1 +
                        local.HistoryOf_VascularDisease * 6 +
                        local.HistoryOf_Diabetes * 6 +
                        local.CRUSADEScore_CHFAtPresentation * 7 +
                        local.Sex * 8;

                    explanation = 'Πιθανότητα σοβαρής αιμορραγίας κατά την νοσηλεία: ' + probability[result] + '%';
                    if (result >= 40) {
                        resultlevel = 3;
                    } else if (result >= 30) {
                        resultlevel = 2;
                    } else {
                        resultlevel = 1;
                    }

                    return {
                        result: result,
                        explanation: explanation,
                        resultlevel: resultlevel
                    };
                },
                EuroSCORE: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;

                    var calc = [];
                    calc.push(0.0666354 * (values.Age < 60 ? 1 : values.Age - 58));
                    calc.push(values.Sex * 0.3304052);
                    calc.push(values.HistoryOf_PulmonaryDisease * 0.4931341);
                    calc.push(values.HistoryOf_VascularDisease * 0.6558917);
                    calc.push(values.HistoryOf_NeurologicalDisease * 0.841626);
                    calc.push(values.HistoryOf_CardiacSurgery * 1.002625);
                    calc.push((values.Plasma_Creatinine > 2.25) ? 0.6521653 : 0);
                    calc.push(values.EuroSCORE_ActiveEndocarditis * 1.101265);
                    calc.push(values.EuroSCORE_CriticalState * 0.9058132);
                    calc.push(values.AnginaAtRest * 0.5677075);
                    var ef;
                    if (values.LVEF > 50) {
                        ef = 0;
                    } else if (values.LVEF > 30) {
                        ef = 0.4191643;
                    } else {
                        ef = 1.094443;
                    }
                    calc.push(ef);
                    calc.push(values.EuroSCORE_MIinTheLast90Days * 0.5460218);
                    calc.push((values.PASP > 60) ? 0.7676924 : 0);
                    calc.push(values.EuroSCORE_Emergency * 0.7127953);
                    calc.push(!values.EuroSCORE_SimpleCABG * 0.5420364);
                    calc.push(values.EuroSCORE_ThoracicAorta * 1.159787);
                    calc.push(values.EuroSCORE_SeptalRupture * 1.462009);

                    var sup = _(calc).reduce(function(memo, value) {
                        return (memo += value);
                    }, -4.789594);

                    var value = Math.exp(sup);
                    result = 100 * value / (1 + value);

                    result = Math.round(result * 100) / 100;

                    if (result > 8) {
                        explanation = 'Υψηλού Κινδύνου';
                        resultlevel = 3;
                    } else if (result > 4) {
                        explanation = 'Μετρίου Κινδύνου';
                        resultlevel = 2;
                    } else {
                        explanation = 'Μικρού Κινδύνου';
                        resultlevel = 1;
                    }

                    return {
                        result: 'Υπολογιζόμενη Θνητότητα Χειρουργείου ' + result + '%',
                        explanation: explanation,
                        resultlevel: resultlevel
                    };
                },
                GFR: function(values) {
                    var ret = {};
                    if (values.Sex === 0) {
                        values['GFR_Sex'] = 1;
                    } else {
                        values['GFR_Sex'] = 0.85;
                    }

                    ret.formula = '((140 - Age) * Weight * GFR_Sex ) / ( 72 * Plasma_Creatinine )';
                    ret.result = roundNum(evaluator(values, ret.formula));

                    if (ret.result < 15) {
                        ret.explanation = 'Νεφρική ανεπάρκεια';
                        ret.resultlevel = 3;
                    } else if (ret.result < 30) {
                        ret.explanation = 'Νεφρική βλάβη με σοβαρή μείωση του GFR';
                        ret.resultlevel = 3;
                    } else if (ret.result < 60) {
                        ret.explanation = 'Νεφρική βλάβη με μέτρια μείωση του GFR';
                        ret.resultlevel = 2;
                    } else if (ret.result < 90) {
                        ret.explanation = 'Νεφρική βλάβη με ήπια μείωση του GFR';
                        ret.resultlevel = 1;
                    } else {
                        ret.explanation = 'Φυσιολογική νεφρική λειτουργία';
                        ret.resultlevel = 0;
                    }
                    return ret;
                },
                GlasgowComaScale: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;
                    result =
                        values.GlasgowComaScale_Eyes * 1 +
                        values.GlasgowComaScale_Speech * 1 +
                        values.GlasgowComaScale_Mobility * 1;

                    if (result > 13) {
                        explanation = 'Καμμία ή Μικρή Βαθμού Εγκεφαλική Βλαβη';
                        resultlevel = 0;
                    } else if (result > 8) {
                        explanation = 'Μέτριου Βαθμού Εγκεφαλική Βλάβη';
                        resultlevel = 2;
                    } else if (result > 0) {
                        explanation = 'Σοβαρού Βαθμού Εγκεφαλική Βλάβη (Διασωλήνωση)';
                        resultlevel = 3;
                    } else {
                        explanation = '';
                    }

                    return {
                        result: result,
                        explanation: explanation,
                        resultlevel: resultlevel
                    };
                },
                GRACEScore: function(values) {
                    var result;
                    var explanation;

                    var GRACEScore_Age;
                    if (0 <= values.Age && values.Age < 35) {
                        GRACEScore_Age = 0;
                    } else if (35 <= values.Age && values.Age < 45) {
                        GRACEScore_Age = 0 + (values.Age - 35) * (1.8);
                    } else if (45 <= values.Age && values.Age < 55) {
                        GRACEScore_Age = 18 + (values.Age - 45) * (1.8);
                    } else if (55 <= values.Age && values.Age < 65) {
                        GRACEScore_Age = 36 + (values.Age - 55) * (1.8);
                    } else if (65 <= values.Age && values.Age < 75) {
                        GRACEScore_Age = 54 + (values.Age - 65) * (1.9);
                    } else if (75 <= values.Age && values.Age < 85) {
                        GRACEScore_Age = 73 + (values.Age - 75) * (1.8);
                    } else if (85 <= values.Age && values.Age < 90) {
                        GRACEScore_Age = 91 + (values.Age - 85) * (1.8);
                    } else if (values.Age >= 90) {
                        GRACEScore_age = 100;
                    }


                    var GRACEScore_HeartRate;
                    if (0 <= values.HeartRate && values.HeartRate < 70) {
                        GRACEScore_HeartRate = 0;
                    } else if (70 <= values.HeartRate && values.HeartRate < 80) {
                        GRACEScore_HeartRate = 0 + (values.HeartRate - 70) * (0.3);
                    } else if (80 <= values.HeartRate && values.HeartRate < 90) {
                        GRACEScore_HeartRate = 3 + (values.HeartRate - 80) * (0.2);
                    } else if (90 <= values.HeartRate && values.HeartRate < 100) {
                        GRACEScore_HeartRate = 5 + (values.HeartRate - 90) * (0.3);
                    } else if (100 <= values.HeartRate && values.HeartRate < 110) {
                        GRACEScore_HeartRate = 8 + (values.HeartRate - 100) * (0.2);
                    } else if (110 <= values.HeartRate && values.HeartRate < 150) {
                        GRACEScore_HeartRate = 10 + (values.HeartRate - 110) * (0.3);
                    } else if (150 <= values.HeartRate && values.HeartRate < 200) {
                        GRACEScore_HeartRate = 22 + (values.HeartRate - 150) * (0.3);
                    } else if (values.HeartRate >= 200) {
                        GRACEScore_HeartRate = 34;
                    }


                    var GRACEScore_BloodPressure;
                    if (0 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 80) {
                        GRACEScore_BloodPressure = 40;
                    } else if (80 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 100) {
                        GRACEScore_BloodPressure = 40 - (values.BloodPressure_Systolic - 80) * (0.3);
                    } else if (100 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 110) {
                        GRACEScore_BloodPressure = 34 - (values.BloodPressure_Systolic - 100) * (0.3);
                    } else if (110 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 120) {
                        GRACEScore_BloodPressure = 31 - (values.BloodPressure_Systolic - 110) * (0.4);
                    } else if (120 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 130) {
                        GRACEScore_BloodPressure = 27 - (values.BloodPressure_Systolic - 120) * (0.3);
                    } else if (130 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 140) {
                        GRACEScore_BloodPressure = 24 - (values.BloodPressure_Systolic - 130) * (0.3);
                    } else if (140 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 150) {
                        GRACEScore_BloodPressure = 20 - (values.BloodPressure_Systolic - 140) * (0.4);
                    } else if (150 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 160) {
                        GRACEScore_BloodPressure = 17 - (values.BloodPressure_Systolic - 150) * (0.3);
                    } else if (160 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 180) {
                        GRACEScore_BloodPressure = 14 - (values.BloodPressure_Systolic - 160) * (0.3);
                    } else if (180 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 200) {
                        GRACEScore_BloodPressure = 8 - (values.BloodPressure_Systolic - 180) * (0.4);
                    } else if (values.BloodPressure_Systolic >= 200) {
                        GRACEScore_BloodPressure = 0;
                    }


                    var GRACEScore_Creatinine;
                    if (0.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.2) {
                        GRACEScore_Creatinine = 0 + (values.Plasma_Creatinine - 0) * (1 / 0.2);
                    } else if (0.2 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.4) {
                        GRACEScore_Creatinine = 1 + (values.Plasma_Creatinine - 0.2) * (2 / 0.2);
                    } else if (0.4 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.6) {
                        GRACEScore_Creatinine = 3 + (values.Plasma_Creatinine - 0.4) * (1 / 0.2);
                    } else if (0.6 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.8) {
                        GRACEScore_Creatinine = 4 + (values.Plasma_Creatinine - 0.6) * (2 / 0.2);
                    } else if (0.8 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.0) {
                        GRACEScore_Creatinine = 6 + (values.Plasma_Creatinine - 0.8) * (1 / 0.2);
                    } else if (1.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.2) {
                        GRACEScore_Creatinine = 7 + (values.Plasma_Creatinine - 1.0) * (1 / 0.2);
                    } else if (1.2 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.4) {
                        GRACEScore_Creatinine = 8 + (values.Plasma_Creatinine - 1.2) * (2 / 0.2);
                    } else if (1.4 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.6) {
                        GRACEScore_Creatinine = 10 + (values.Plasma_Creatinine - 1.4) * (1 / 0.2);
                    } else if (1.6 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.8) {
                        GRACEScore_Creatinine = 11 + (values.Plasma_Creatinine - 1.6) * (2 / 0.2);
                    } else if (1.8 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 2.0) {
                        GRACEScore_Creatinine = 13 + (values.Plasma_Creatinine - 1.8) * (1 / 0.2);
                    } else if (2.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 3.0) {
                        GRACEScore_Creatinine = 14 + (values.Plasma_Creatinine - 2.0) * (7 / 1);
                    } else if (3.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 4.0) {
                        GRACEScore_Creatinine = 21 + (values.Plasma_Creatinine - 3.0) * (7 / 1);
                    } else if (values.Plasma_Creatinine >= 4.0) {
                        GRACEScore_Creatinine = 28;
                    }

                    var GRACEScore_Killip;
                    if (values.KillipClass === 'I') {
                        GRACEScore_Killip = 0;
                    } else if (values.KillipClass === 'II') {
                        GRACEScore_Killip = 15;
                    } else if (values.KillipClass === 'III') {
                        GRACEScore_Killip = 29;
                    } else if (values.KillipClass === 'IV') {
                        GRACEScore_Killip = 44;
                    }

                    result = GRACEScore_Killip + GRACEScore_BloodPressure + GRACEScore_HeartRate + GRACEScore_Age + GRACEScore_Creatinine + 17 * values.GRACEScore_stemi + 13 * values.GRACEScore_troponine + 30 * values.GRACEScore_arrest;

                    if (result >= 6) {
                        explanation = 0.2;
                    }
                    if (result >= 27) {
                        explanation = 0.4;
                    }
                    if (result >= 39) {
                        explanation = 0.6;
                    }
                    if (result >= 48) {
                        explanation = 0.8;
                    }
                    if (result >= 55) {
                        explanation = 1.0;
                    }
                    if (result >= 60) {
                        explanation = 1.2;
                    }
                    if (result >= 65) {
                        explanation = 1.4;
                    }
                    if (result >= 69) {
                        explanation = 1.6;
                    }
                    if (result >= 73) {
                        explanation = 1.8;
                    }
                    if (result >= 76) {
                        explanation = 2;
                    }
                    if (result >= 88) {
                        explanation = 3;
                    }
                    if (result >= 97) {
                        explanation = 4;
                    }
                    if (result >= 104) {
                        explanation = 5;
                    }
                    if (result >= 110) {
                        explanation = 6;
                    }
                    if (result >= 115) {
                        explanation = 7;
                    }
                    if (result >= 119) {
                        explanation = 8;
                    }
                    if (result >= 123) {
                        explanation = 9;
                    }
                    if (result >= 126) {
                        explanation = 10;
                    }
                    if (result >= 129) {
                        explanation = 11;
                    }
                    if (result >= 132) {
                        explanation = 12;
                    }
                    if (result >= 134) {
                        explanation = 13;
                    }
                    if (result >= 137) {
                        explanation = 14;
                    }
                    if (result >= 139) {
                        explanation = 15;
                    }
                    if (result >= 141) {
                        explanation = 16;
                    }
                    if (result >= 143) {
                        explanation = 17;
                    }
                    if (result >= 145) {
                        explanation = 18;
                    }
                    if (result >= 147) {
                        explanation = 19;
                    }
                    if (result >= 149) {
                        explanation = 20;
                    }
                    if (result >= 150) {
                        explanation = 21;
                    }
                    if (result >= 152) {
                        explanation = 22;
                    }
                    if (result >= 153) {
                        explanation = 23;
                    }
                    if (result >= 155) {
                        explanation = 24;
                    }
                    if (result >= 156) {
                        explanation = 25;
                    }
                    if (result >= 158) {
                        explanation = 26;
                    }
                    if (result >= 159) {
                        explanation = 27;
                    }
                    if (result >= 160) {
                        explanation = 28;
                    }
                    if (result >= 162) {
                        explanation = 29;
                    }
                    if (result >= 163) {
                        explanation = 30;
                    }
                    if (result >= 174) {
                        explanation = 40;
                    }
                    if (result >= 183) {
                        explanation = 50;
                    }
                    if (result >= 191) {
                        explanation = 60;
                    }
                    if (result >= 200) {
                        explanation = 70;
                    }
                    if (result >= 208) {
                        explanation = 80;
                    }
                    if (result >= 219) {
                        explanation = 90;
                    }
                    if (result >= 285) {
                        explanation = 99;
                    }

                    var resultlevel;
                    if (explanation <= 2) {
                        resultlevel = 0;
                    } else if (explanation <= 10) {
                        resultlevel = 1;
                    } else if (explanation <= 20) {
                        resultlevel = 2;
                    } else {
                        resultlevel = 3;
                    }

                    return {
                        result: roundNum(result),
                        explanation: 'Θνησιμότητα εντός εξαμήνου: ' + explanation + '%',
                        resultlevel: resultlevel
                    };
                },
                HASBLED: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;

                    result = 0;
                    result += (values.BloodPressure_Systolic > 160) ? 1 : 0;
                    result += (values.Plasma_Creatinine > 2.6) ? 1 : 0;
                    result += (values.HistoryOf_HepaticFailure) ? 1 : 0;
                    result += (values.HistoryOf_Stroke) ? 1 : 0;
                    result += (values.HistoryOf_Bleeding) ? 1 : 0;
                    result += (values.HistoryOf_UncontrolledINR) ? 1 : 0;
                    result += (values.Age > 65) ? 1 : 0;
                    result += (values.HASBLED_Drugs) ? 1 : 0;
                    result += (values.HistoryOf_Alcohol) ? 1 : 0;

                    switch (result) {
                        case 0:
                            explanation = 'Ο κίνδυνος είναι 0.9%';
                            resultlevel = 0;
                            break;
                        case 1:
                            explanation = 'Ο κίνδυνος είναι 3.4%';
                            resultlevel = 0;
                            break;
                        case 2:
                            explanation = 'Ο κίνδυνος είναι 4.1%';
                            resultlevel = 1;
                            break;
                        case 3:
                            explanation = 'Ο κίνδυνος είναι 5.8%';
                            resultlevel = 1;
                            break;
                        case 4:
                            explanation = 'Ο κίνδυνος είναι 8.9%';
                            resultlevel = 2;
                            break;
                        case 5:
                            explanation = 'Ο κίνδυνος είναι 9.1%';
                            resultlevel = 2;
                            break;
                        default:
                            explanation = 'Δεν έχει υπολογισθεί ο κίνδυνος';
                            resultlevel = 3;
                            break;
                    }

                    return {
                        result: result,
                        explanation: explanation,
                        resultlevel: resultlevel
                    };
                },
                KillipClassEval: function(values) {
                    var result = values.KillipClass;
                    var explanation;
                    var resultlevel;
                    switch (result) {
                        case 'I':
                            explanation = '6%';
                            resultlevel = 0;
                            break;
                        case 'II':
                            explanation = '17%';
                            resultlevel = 1;
                            break;
                        case 'III':
                            explanation = '38%';
                            resultlevel = 2;
                            break;
                        case 'IV':
                            explanation = '67%';
                            resultlevel = 3;
                            break;
                    }
                    return {
                        result: result,
                        explanation: 'Ποσοστό Θνησιμότητας σε 30 Ημέρες: ' + explanation,
                        resultlevel: resultlevel
                    };
                },
                NYHAClassEval: function(values) {
                    var result = values.NYHAClass;
                    var explanation = '';
                    var resultlevel;
                    if (result === 'IV') {
                        explanation = 'Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση';
                        resultlevel = 3;
                    }
                    if (result === 'III') {
                        explanation = 'Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση';
                        resultlevel = 2;
                    }
                    if (result === 'II') {
                        explanation = 'Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα';
                        resultlevel = 1;
                    }
                    if (result === 'I') {
                        explanation = 'Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα';
                        resultlevel = 0;
                    }
                    return {
                        result: result,
                        explanation: explanation,
                        resultlevel: resultlevel
                    };
                },
                QTc: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;
                    var ret = {};
                    ret.formula = 'QT / sqrt(60 / HeartRate)';
                    ret.result = roundNum(evaluator(values, ret.formula));

                    if (ret.result >= 480) {
                        ret.explanation = 'Έντονα παρατεταμένο QT';
                        ret.resultlevel = 3;
                    } else if (ret.result >= 460) {
                        ret.explanation = 'Παρατεταμένο QT';
                        ret.resultlevel = 2;
                    } else if (ret.result >= 440) {
                        ret.explanation = 'Μικρή παράταση QT';
                        ret.resultlevel = 1;
                    } else if (ret.result <= 330) {
                        ret.explanation = 'Έντονη βράχυνση QT';
                        ret.resultlevel = 3;
                    } else if (ret.result <= 350) {
                        ret.explanation = 'Βραχύ QT';
                        ret.resultlevel = 2;
                    } else if (ret.result <= 370) {
                        ret.explanation = 'Μικρή βράχυνση QT';
                        ret.resultlevel = 1;
                    } else {
                        ret.explanation = 'Φυσιολογικό QT';
                        ret.resultlevel = 0;
                    }
                    return ret;
                }
            };
        }
    ]);
})();
