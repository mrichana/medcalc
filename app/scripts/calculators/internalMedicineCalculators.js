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
                }
            };
        }
    ]);
})();
