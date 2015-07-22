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

                    result = GRACEScore_Killip + GRACEScore_BloodPressure + GRACEScore_HeartRate + GRACEScore_Age + GRACEScore_Creatinine + 17 * values.ACS_stmi + 13 * values.ACS_Troponine + 30 * values.GRACEScore_arrest;

                    var ret= {};
                    ret.result = roundNum(result);

                    if (result > 140) {
                        ret.explanation = 'Θνησιμότητα κατά την νοσηλεία >3%';
                    } else
                    if (result > 108) {
                        ret.explanation = 'Θνησιμότητα κατά την νοσηλεία 1-3%';
                    } else
                    {
                        ret.explanation = 'Θνησιμότητα κατά την νοσηλεία <1%';
                    }


                    if (result > 118) {
                        ret.explanation += ', στους 6 μήνες >8%';
                        ret.resultlevel = 3;
                    } else
                    if (result > 88) {
                        ret.explanation += ', στους 6 μήνες 3-8%';
                        ret.resultlevel = 2;
                    } else
                    {
                        ret.explanation += ', στους 6 μήνες <3%';
                        ret.resultlevel = 0;
                    }

                    return ret;
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
                            explanation = 'Απουσία κλινικών σημείων καρδιακής ανεπάρκειας';
                            resultlevel = 0;
                            break;
                        case 'II':
                            explanation = 'Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικών Φλεβών';
                            resultlevel = 1;
                            break;
                        case 'III':
                            explanation = 'Οξύ Πνευμονικό Οίδημα';
                            resultlevel = 2;
                            break;
                        case 'IV':
                            explanation = 'Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)';
                            resultlevel = 3;
                            break;
                    }
                    return {
                        result: result,
                        explanation: explanation,
                        resultlevel: resultlevel
                    };
                },
                HEARTScore: function(values) {
                    var result;
                    var explanation;
                    var resultlevel;

                    result = 0;
                    result += values.HEARTScore_History;
                    result += values.HEARTScore_ECG;

                    result += (values.Age >= 45) ? 1 : 0;
                    result += (values.Age >= 65) ? 1 : 0;

                    var partialresult = 0;
                    partialresult += (values.HistoryOf_Diabetes) ? 1 : 0;
                    partialresult += (values.Smoker) ? 1 : 0;
                    partialresult += (values.HistoryOf_Hypertension) ? 1 : 0;
                    partialresult += (values.HistoryOf_Hyperlipidemia) ? 1 : 0;
                    partialresult += (values.FamilyHistoryOf_CAD) ? 1 : 0;
                    partialresult += (values.Obesity) ? 1 : 0;

                    result += (partialresult >=1) ? 1 : 0;
                    result += (partialresult >=3) ? 1 : 0;

                    result += values.HEARTScore_Troponine;

                    switch (result) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            explanation = '0.9-1.7%';
                            resultlevel = 0;
                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            explanation = '12-16.6%';
                            resultlevel = 1;
                            break;
                        case 8:
                        case 9:
                        case 10:
                            explanation = '50-65%';
                            resultlevel = 2;
                            break;
                    };

                    return {
                        result: result,
                        explanation: 'Πιθανότητα καρδιαγγειακού συμβαμάτος σε 6 εβδομάδες: ' + explanation,
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
                    return ret;
                },
                QT: function(values) {
                    var ret = {};
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
