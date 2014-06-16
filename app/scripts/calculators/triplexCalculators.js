/*global angular: true */

(function() {
    'use strict';

    /* Services */

    /**
     * medical.calculators Module
     *
     * Description
     */
    angular.module('medical.calculators').
    factory('triplexCalculators', ['mathParser', 'roundNum', 'evaluator',
        function(mathParser, roundNum, evaluator) {
            return {
                Triplex_LeftAtriumVolume: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    ret.formula = '8 * Triplex_LeftAtrium_Area4Ch * Triplex_LeftAtrium_Area2Ch / ( 3 * pi * ( Triplex_LeftAtrium_Length / 10 ))';
                    ret.result = roundNum(this.evaluator(values, ret.formula));

                    return ret;
                },
                Triplex_LeftAtriumVolumeIndex: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    ret.formula = '8 * Triplex_LeftAtrium_Area4Ch * Triplex_LeftAtrium_Area2Ch / ( 3 * pi * ( Triplex_LeftAtrium_Length / 10 )) / BSA';
                    ret.result = roundNum(this.evaluator(values, ret.formula));

                    if (ret.result >= 40) {
                        ret.explanation = 'Μεγάλη διάταση αριστερού κόλπου';
                        ret.resultlevel = 3;
                    } else if (ret.result >= 34) {
                        ret.explanation = 'Μέτρια διάταση αριστερού κόλπου';
                        ret.resultlevel = 2;
                    } else if (ret.result >= 29) {
                        ret.explanation = 'Μικρή διάταση αριστερού κόλπου';
                        ret.resultlevel = 1;
                    } else if (ret.result >= 16) {
                        ret.explanation = 'Φυσιολογικές διάστασεις αριστερού κόλπου';
                        ret.resultlevel = 0;
                    } else {
                        ret.explanation = 'Υπερβολικά χαμηλή τιμή - Πιθανό λάθος μετρήσεως';
                        ret.resultlevel = 3;
                    }

                    return ret;
                },
                Triplex_AorticValve_VelocityRatio: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    ret.formula = 'Triplex_LVOT_Vmax / Triplex_AorticValve_Vmax';
                    ret.result = roundNum(evaluator(values, ret.formula), 2);

                    if (ret.result < 0.25) {
                        ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 3;
                    } else if (ret.result <= 0.50) {
                        ret.explanation = 'Μέτρια στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 2;
                    } else {
                        ret.explanation = 'Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας';
                        ret.resultlevel = 0;
                    }
                    return ret;
                },
                Triplex_AorticValve_VTIRatio: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    ret.formula = 'Triplex_LVOT_VTI / Triplex_AorticValve_VTI';
                    ret.result = roundNum(evaluator(values, ret.formula), 2);

                    if (ret.result < 0.25) {
                        ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 3;
                    } else if (ret.result <= 0.50) {
                        ret.explanation = 'Μέτρια στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 2;
                    } else {
                        ret.explanation = 'Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας';
                        ret.resultlevel = 0;
                    }
                    return ret;
                },
                avavti: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    ret.formula = '(pi * ((LVOT / 10) / 2) ^ 2) * LVOTVTI / AoVTI';
                    ret.result = roundNum(evaluator(values, ret.formula), 2);

                    if (ret.result < 1.0) {
                        ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 3;
                    } else if (ret.result <= 1.50) {
                        ret.explanation = 'Μέτρια στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 2;
                    } else {
                        ret.explanation = 'Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας';
                        ret.resultlevel = 0;
                    }
                    return ret;
                },
                avamax: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    ret.formula = '(pi * ((LVOT / 10) / 2) ^ 2) * LVOTV / AoV';
                    ret.result = roundNum(evaluator(values, ret.formula), 2);

                    if (ret.result < 1.0) {
                        ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 3;
                    } else if (ret.result <= 1.50) {
                        ret.explanation = 'Μέτρια στένωση αορτικής βαλβίδας';
                        ret.resultlevel = 2;
                    } else {
                        ret.explanation = 'Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας';
                        ret.resultlevel = 0;
                    }
                    return ret;
                },
                Zva: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    ret.formula = '( sbp + 4 * AoVmean ^ 2 ) / ( ( ( pi * ((LVOT / 10) / 2) ^ 2) * LVOTVTI ) / bsa )';
                    ret.result = roundNum(evaluator(values, ret.formula));

                    if (ret.result >= 4.5) {
                        ret.explanation = 'Υψηλή Αορτοβαλβιδική Αντίσταση';
                        ret.resultlevel = 3;
                    } else if (ret.result > 3.50) {
                        ret.explanation = 'Μέτρια Αορτοβαλβιδική Αντίσταση';
                        ret.resultlevel = 1;
                    } else {
                        ret.explanation = 'Μικρή Αορτοβαλβιδική Αντίσταση';
                        ret.resultlevel = 0;
                    }
                    return ret;
                }
            };
        }
    ]);
})();
