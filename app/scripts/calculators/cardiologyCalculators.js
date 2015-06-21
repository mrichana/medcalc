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
    factory('cardiologyCalculators', ['roundNum', 'evaluator',
        function(roundNum, evaluator) {
            return {
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
                ESCSCORE: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;
                    var results =
                    {
                        female:{
                            nonsmoker:[
                                [//Age<45
                                    [0,0,0,0,0],//sbp<130
                                    [0,0,0,0,0],//sbp<150
                                    [0,0,0,0,0],//sbp<170
                                    [0,0,0,0,0] //sbp>170
                                ],
                                [//Age<53
                                    [0,0,0,0,0],//sbp<130
                                    [0,0,0,0,0],//sbp<150
                                    [0,0,1,1,1],//sbp<170
                                    [1,1,1,1,1] //sbp>170
                                ],
                                [//Age<58
                                    [0,0,1,1,1],//sbp<130
                                    [1,1,1,1,1],//sbp<150
                                    [1,1,1,1,1],//sbp<170
                                    [1,1,2,2,2] //sbp>170
                                ],
                                [//Age<62
                                    [1,1,1,1,1],//sbp<130
                                    [1,1,1,2,2],//sbp<150
                                    [2,2,2,2,3],//sbp<170
                                    [3,3,3,4,4] //sbp>170
                                ],
                                [//Age>62
                                    [1,1,2,2,2],//sbp<130
                                    [2,2,2,3,3],//sbp<150
                                    [3,3,4,4,5],//sbp<170
                                    [4,5,6,6,7] //sbp>170
                                ]
                            ],
                            smoker:[
                                [//Age<45
                                    [0,0,0,0,0],//sbp<130
                                    [0,0,0,0,0],//sbp<150
                                    [0,0,0,0,0],//sbp<170
                                    [0,0,0,0,0] //sbp>170
                                ],
                                [//Age<53
                                    [0,0,0,1,1],//sbp<130
                                    [1,1,1,1,1],//sbp<150
                                    [1,1,1,1,1],//sbp<170
                                    [1,1,2,2,2] //sbp>170
                                ],
                                [//Age<58
                                    [1,1,1,1,1],//sbp<130
                                    [1,1,1,2,2],//sbp<150
                                    [2,2,2,3,3],//sbp<170
                                    [3,3,3,4,4] //sbp>170
                                ],
                                [//Age<62
                                    [1,2,2,2,3],//sbp<130
                                    [2,2,3,3,4],//sbp<150
                                    [3,4,4,5,5],//sbp<170
                                    [5,5,6,7,8] //sbp>170
                                ],
                                [//Age>62
                                    [3,3,3,4,4],//sbp<130
                                    [4,4,5,6,7],//sbp<150
                                    [6,6,7,8,10],//sbp<170
                                    [9,9,11,12,14] //sbp>170
                                ]
                            ]
                        },

                        male:{
                            nonsmoker:[
                                [//Age<45
                                    [0,0,0,0,0],//sbp<130
                                    [0,0,0,0,0],//sbp<150
                                    [0,0,0,1,1],//sbp<170
                                    [0,1,1,1,1] //sbp>170
                                ],
                                [//Age<53
                                    [1,1,1,1,1],//sbp<130
                                    [1,1,1,1,2],//sbp<150
                                    [1,1,2,2,2],//sbp<170
                                    [2,2,3,3,4] //sbp>170
                                ],
                                [//Age<58
                                    [1,1,1,2,2],//sbp<130
                                    [1,2,2,2,3],//sbp<150
                                    [2,2,3,3,4],//sbp<170
                                    [3,4,4,5,6] //sbp>170
                                ],
                                [//Age<62
                                    [2,2,2,3,3],//sbp<130
                                    [2,3,3,4,4],//sbp<150
                                    [3,4,5,5,6],//sbp<170
                                    [5,6,7,8,9] //sbp>170
                                ],
                                [//Age>62
                                    [2,3,3,4,5],//sbp<130
                                    [4,4,5,6,7],//sbp<150
                                    [5,6,7,8,10],//sbp<170
                                    [8,9,10,12,14] //sbp>170
                                ]
                            ],
                            smoker:[
                                [//Age<45
                                    [0,0,0,1,1],//sbp<130
                                    [0,1,1,1,1],//sbp<150
                                    [1,1,1,1,1],//sbp<170
                                    [1,1,1,2,2] //sbp>170
                                ],
                                [//Age<53
                                    [1,1,2,2,2],//sbp<130
                                    [2,2,2,3,3],//sbp<150
                                    [2,3,3,4,5],//sbp<170
                                    [4,4,5,6,7] //sbp>170
                                ],
                                [//Age<58
                                    [2,2,3,3,4],//sbp<130
                                    [3,3,4,5,6],//sbp<150
                                    [4,5,6,7,8],//sbp<170
                                    [6,7,8,10,12] //sbp>170
                                ],
                                [//Age<62
                                    [3,4,4,5,6],//sbp<130
                                    [5,5,6,7,9],//sbp<150
                                    [7,8,9,11,13],//sbp<170
                                    [10,11,13,15,18] //sbp>170
                                ],
                                [//Age>62
                                    [5,5,6,8,9],//sbp<130
                                    [7,8,9,11,13],//sbp<150
                                    [10,12,14,16,19],//sbp<170
                                    [15,17,20,23,26] //sbp>170
                                ]
                            ]
                        }
                    };
                    results = !(values.Sex)?results.male:results.female;
                    results = (values.Smoker)?results.smoker:results.nonsmoker;
                    if (values.Age<45) {
                        results = results[0];
                    } else if (values.Age<53) {
                        results = results[1];
                    } else if (values.Age<58) {
                        results = results[2];
                    } else if (values.Age<62) {
                        results = results[3];
                    } else {
                        results = results[4];
                    }

                    if (values.BloodPressure_Systolic<130) {
                        results = results[0];
                    } else if (values.BloodPressure_Systolic<150) {
                        results = results[1];
                    } else if (values.BloodPressure_Systolic<170) {
                        results = results[2];
                    } else {
                        results = results[3];
                    }

                    if (values.Cholesterol<150) {
                        result = results[0];
                    } else if (values.Cholesterol<200) {
                        result = results[1];
                    } else if (values.Cholesterol<250) {
                        result = results[2];
                    } else if (values.Cholesterol<300) {
                        result = results[3];
                    } else {
                        result = results[4];
                    }

                    if (result < 2) {
                        resultlevel=1;
                    } else if (result < 5) {
                        resultlevel=2;
                    } else {
                        resultlevel=3;
                    }

                    return {
                        result: result,
                        suffix: '%',
                        explanation: 'Πιθανότητα θανατηφόρου καρδιαγγειακού συμβάματος στην δεκαετία',
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
                EuroSCOREII: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;

                    var calc = [];
                    calc.push(0.0285181 * (values.Age < 60 ? 1 : values.Age - 59));
                    calc.push(values.Sex * 0.2196434);
                    var renal = 0;
                    if (values.GFR < 85) renal = 0.303553;
                    if (values.GFR < 50) renal = 0.8592256;
                    if (values.GFR == 0) renal = 0.6421508;
                    calc.push(renal);
                    calc.push(values.HistoryOf_VascularDisease * 0.5360268);
                    calc.push(values.HistoryOf_PoorMobility * 0.2407181);
                    calc.push(values.HistoryOf_CardiacSurgery * 1.118599);
                    calc.push(values.HistoryOf_PulmonaryDisease * 0.1886564);
                    calc.push(values.EuroSCORE_ActiveEndocarditis * 0.6194522);
                    calc.push(values.EuroSCORE_CriticalState * 1.086517);
                    calc.push(values.HistoryOf_Diabetes * 0.3542749);
                    var hf = 0;
                    if (values.NYHAClass == 'II') hf = 0.1070545;
                    if (values.NYHAClass == 'III') hf = 0.2958358;
                    if (values.NYHAClass == 'IV') hf = 0.5597929;
                    calc.push(hf);
                    calc.push(values.AnginaAtRest * 0.2226147);
                    var ef = 0;
                    if (values.LVEF < 50) ef = 0.3150652;
                    if (values.LVEF < 30) ef = 0.8084096;
                    if (values.LVEF < 20) ef = 0.9346919;
                    calc.push(ef);
                    calc.push(values.EuroSCORE_MIinTheLast90Days * 0.1528943);
                    var phyper = 0;
                    if (values.PASP > 30) phyper = 0.1788899;
                    if (values.PASP > 55) phyper = 0.3491475;
                    calc.push(phyper);
                    var emerg = 0;
                    if (values.EuroSCOREII_Emergency == 1) emerg = 0.3174673;
                    if (values.EuroSCOREII_Emergency == 2) emerg = 0.7039121;
                    if (values.EuroSCOREII_Emergency == 3) emerg = 1.362947;
                    calc.push(emerg);
                    var opweight = 0;
                    if (values.EuroSCOREII_OperationWeight == 1) opweight = 0.0062118;
                    if (values.EuroSCOREII_OperationWeight == 2) opweight = 0.5521478;
                    if (values.EuroSCOREII_OperationWeight == 3) opweight = 0.9724533;
                    calc.push(opweight);
                    calc.push(values.EuroSCORE_ThoracicAorta * 0.6527205);

                    var sup = _(calc).reduce(function(memo, value) {
                        return (memo += value);
                    }, -5.324537);
                    result = 100 * Math.exp(sup) / (1 + Math.exp(sup));
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
                        GRACEScore_Age = 100;
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
                DTS: function (values) {
                    var ret = {};
                    ret.formula = 'Bruce_ExerciseTime - 5*Bruce_STDeviation - 4*Bruce_AnginaIndex';
                    ret.result = roundNum(evaluator(values, ret.formula));

                    if (ret.result >= 5) {
                        ret.explanation = 'Χαμηλός κίνδυνος (Θνησιμότητα στο έτος: 0.25%)';
                        ret.resultlevel = 0;
                    } else if (ret.result >= -11) {
                        ret.explanation = 'Ενδιάμεσος κίνδυνος (Θνησιμότητα στο έτος: 1.25%)';
                        ret.resultlevel = 2;
                    } else {
                        ret.explanation = 'Υψηλός κίνδυνος (Θνησιμότητα στο έτος: 5.25%)';
                        ret.resultlevel = 3;
                    }
                    return ret;
                },
                QTc: function (values) {
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
                },
                QT: function(values) {
                    var ret = {};
                    ret.formula = 'QTmm * (1/paperSpeed) * 1000';
                    ret.result = evaluator(values, ret.formula);
                    ret.suffix = 'msec';
                    return ret;
                },
                Sokolow: function(values) {
                    var ret = {};
                    var hypertrophy = values.V1S + Math.max(values.V5R, values.V6R) >= 35 || values.aVLR >= 11;

                    if (hypertrophy) {
                        ret.result = 'Θετικός για υπερτροφία μυοκαρδίου';
                        ret.explanation = 'Ειδικότητα 100%';
                        ret.resultlevel = 3;
                    } else {
                        ret.result = 'Αρνητικός για υπερτροφία μυοκαρδίου';
                        ret.explanation = 'Ευαισθησία 22%';
                        ret.resultlevel = 0;
                    }
                    return ret;
                },
                HeartRate: function(values) {
                    var ret = {};
                    ret.formula = '60*paperSpeed/HRQRS2QRSmm/HRcycles';
                    ret.result = roundNum(evaluator(values, ret.formula));
                    return ret;
                }
            };
        }
    ]);
})();
