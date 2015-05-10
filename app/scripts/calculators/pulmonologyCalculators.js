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
    factory('pulmonologyCalculators', ['mathParser', 'roundNum', 'evaluator',
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
                WellsScore: function(values) {
                    var result = {
                        result: 0,
                        explanation: "",
                        resultlevel: 0
                    };
                    result.result += values.HistoryOf_DVT*1.5;
                    result.result += (values.HeartRate>100)*1.5;
                    result.result += values.HistoryOf_Immobilization*1.5;
                    result.result += values.Haemoptysis*1;
                    result.result += values.Cancer*1;
                    result.result += values.DVT*3;
                    result.result += values.PEMostLikely*3;

                    if (result.result>=7) {
                        result.explanation="Υψηλή κλινική πιθανότητα";
                        result.resultlevel=3;
                    }
                    else if (result.result>=2) {
                        result.explanation="Ενδιάμεση κλινική πιθανότητα";
                        result.resultlevel=2;
                    }
                    else {
                        result.explanation="Χαμηλή κλινική πιθανότητα";
                        result.resultlevel=0;
                    };

                    return result;
                },
                GenevaScore: function(values) {
                    var result = {
                        result: 0,
                        explanation: "",
                        resultlevel: 0
                    };
                    result.result += values.HistoryOf_DVT*3;
                    result.result += (values.HeartRate>=75)*3;
                    result.result += (values.HeartRate>=95)*2;
                    result.result += values.HistoryOf_Immobilization*2;
                    result.result += values.Haemoptysis*2;
                    result.result += values.Cancer*2;
                    result.result += values.UnilateralLLimbPain*3;
                    result.result += values.UnilateralLLimbOedema*4;
                    result.result += (values.Age>65)*1;

                    if (result.result>=11) {
                        result.explanation="Υψηλή κλινική πιθανότητα";
                        result.resultlevel=3;
                    }
                    else if (result.result>=4) {
                        result.explanation="Ενδιάμεση κλινική πιθανότητα";
                        result.resultlevel=2;
                    }
                    else {
                        result.explanation="Χαμηλή κλινική πιθανότητα";
                        result.resultlevel=0;
                    };

                    return result;
                }
            };
        }
    ]);
})();
