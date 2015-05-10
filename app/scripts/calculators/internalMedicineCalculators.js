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
