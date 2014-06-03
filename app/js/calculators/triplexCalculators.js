/*global angular: true */
/*global _: true */
/*global sprintf: true */

(function() {
    'use strict';

    /* Services */

    /**
     * medical.calculators Module
     *
     * Description
     */
    angular.module('medical.calculators').
    factory('triplexCalculators', function(mathParser, roundNum, evaluator) {
        return {
            lavi: function(values) {
                this.evaluator = evaluator;
                var ret = {};
                ret.formula = '8 * area4Ch * area2Ch / ( 3 * pi * ( leftAtriumLength / 10 )) / bsa';
                ret.result = roundNum(this.evaluator(values, ret.formula));

                if (ret.result >= 40) {
                    ret.explanation = "Μεγάλη διάταση αριστερού κόλπου";
                    ret.resultlevel = 3;
                } else if (ret.result >= 34) {
                    ret.explanation = "Μέτρια διάταση αριστερού κόλπου";
                    ret.resultlevel = 2;
                } else if (ret.result >= 29) {
                    ret.explanation = "Μικρή διάταση αριστερού κόλπου";
                    ret.resultlevel = 1;
                } else if (ret.result >= 16) {
                    ret.explanation = "Φυσιολογικές διάστασεις αριστερού κόλπου";
                    ret.resultlevel = 0;
                } else {
                    ret.explanation = "Υπερβολικά χαμηλή τιμή - Πιθανό λάθος μετρήσεως";
                    ret.resultlevel = 3;
                }

                return ret;
            },
            avvr: function(values) {
                this.evaluator = evaluator;
                var ret = {};
                ret.formula = "LVOTV / AoV";
                ret.result = roundNum(evaluator(values, ret.formula), 2);

                if (ret.result < 0.25) {
                    ret.explanation = "Σοβαρή στένωση αορτικής βαλβίδας";
                    ret.resultlevel = 3;
                } else if (ret.result <= 0.50) {
                    ret.explanation = "Μέτρια στένωση αορτικής βαλβίδας";
                    ret.resultlevel = 2;
                } else {
                    ret.explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας";
                    ret.resultlevel = 0;
                }
                return ret;
            },
            avavti: function(values) {
                this.evaluator = evaluator;
                var ret = {};
                ret.formula = "(pi * ((LVOT / 10) / 2) ^ 2) * LVOTVTI / AoVTI";
                ret.result = roundNum(evaluator(values, ret.formula), 2);

                if (ret.result < 1.0) {
                    ret.explanation = "Σοβαρή στένωση αορτικής βαλβίδας";
                    ret.resultlevel = 3;
                } else if (ret.result <= 1.50) {
                    ret.explanation = "Μέτρια στένωση αορτικής βαλβίδας";
                    ret.resultlevel = 2;
                } else {
                    ret.explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας";
                    ret.resultlevel = 0;
                }
                return ret;
            },
            avamax: function(values) {
                this.evaluator = evaluator;
                var ret = {};
                ret.formula = "(pi * ((LVOT / 10) / 2) ^ 2) * LVOTV / AoV";
                ret.result = roundNum(evaluator(values, ret.formula), 2);

                if (ret.result < 1.0) {
                    ret.explanation = "Σοβαρή στένωση αορτικής βαλβίδας";
                    ret.resultlevel = 3;
                } else if (ret.result <= 1.50) {
                    ret.explanation = "Μέτρια στένωση αορτικής βαλβίδας";
                    ret.resultlevel = 2;
                } else {
                    ret.explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας";
                    ret.resultlevel = 0;
                }
                return ret;
            },
            Zva: function(values) {
                this.evaluator = evaluator;
                var ret = {};
                ret.formula = "( sbp + 4 * AoVmean ^ 2 ) / ( ( ( pi * ((LVOT / 10) / 2) ^ 2) * LVOTVTI ) / bsa )";
                ret.result = roundNum(evaluator(values, ret.formula));

                if (ret.result >= 4.5) {
                    ret.explanation = "Υψηλή Αορτοβαλβιδική Αντίσταση";
                    ret.resultlevel = 3;
                } else if (ret.result > 3.50) {
                    ret.explanation = "Μέτρια Αορτοβαλβιδική Αντίσταση";
                    ret.resultlevel = 1;
                } else {
                    ret.explanation = "Μικρή Αορτοβαλβιδική Αντίσταση";
                    ret.resultlevel = 0;
                }
                return ret;
            }
        };
    });
})();