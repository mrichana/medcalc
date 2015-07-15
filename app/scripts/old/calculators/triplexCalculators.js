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
    factory('triplexCalculators', ['roundNum', 'evaluator',
        function(roundNum, evaluator) {
            return {
                Triplex_LeftAtrium_Volume: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    return ret;
                },
                Triplex_LeftAtrium_Volume_Index: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    return ret;
                },
                Triplex_AorticValve_VelocityRatio_Vmax: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    ret.formula = 'Triplex_LVOT_Vmax / Triplex_AorticValve_Vmax';
                    ret.result = roundNum(evaluator(local, ret.formula), 2);

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
                Triplex_AorticValve_VelocityRatio_VTI: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    ret.formula = 'Triplex_LVOT_VTI / Triplex_AorticValve_VTI';
                    ret.result = roundNum(evaluator(local, ret.formula), 2);

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
                Triplex_AorticValve_Area_VTI: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    ret.formula = '(pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI / Triplex_AorticValve_VTI';
                    ret.result = roundNum(evaluator(local, ret.formula), 2);

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
                Triplex_AorticValve_Area_Vmax: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    ret.formula = '(pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_Vmax / Triplex_AorticValve_Vmax';
                    ret.result = roundNum(evaluator(local, ret.formula), 2);

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
                Triplex_AorticValve_Impedance: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    ret.formula = '( BloodPressure_Systolic + 4 * Triplex_AorticValve_Vmean ^ 2 ) / ( ( ( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI ) / BSA )';
                    ret.result = roundNum(evaluator(local, ret.formula));

                    if (ret.result >= 5.5) {
                        ret.explanation = 'Πολύ Υψηλή Αορτοβαλβιδική Αντίσταση';
                        ret.resultlevel = 3;
                    } else if (ret.result >= 4.5) {
                        ret.explanation = 'Υψηλή Αορτοβαλβιδική Αντίσταση';
                        ret.resultlevel = 2;
                    } else if (ret.result > 3.50) {
                        ret.explanation = 'Μέτρια Αορτοβαλβιδική Αντίσταση';
                        ret.resultlevel = 1;
                    } else {
                        ret.explanation = 'Μικρή Αορτοβαλβιδική Αντίσταση';
                        ret.resultlevel = 0;
                    }
                    return ret;
                },
                Triplex_Stroke_Volume: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    ret.formula = '( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI';
                    ret.result = roundNum(evaluator(local, ret.formula));
                    ret.resultlevel = 1;
                    return ret;
                },
                Triplex_Stroke_Volume_Index: function(values) {
                    this.evaluator = evaluator;
                    var ret = {};
                    var local = angular.copy(values);
                    ret.formula = '( ( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI ) / BSA ';
                    ret.result = roundNum(evaluator(local, ret.formula));
                    if (ret.result < 35) {
                        ret.resultlevel = 3;
                    } else {
                        ret.resultlevel = 1;
                    }
                    return ret;
                },
                Triplex_AorticValve_Regurgitation: function(values) {
                    var ret = [];
                    var vc = {};
                    vc.name = 'Vena Contracta';
                    if (values.Triplex_AorticValve_Regurgitation_VenaContracta_Width > 0.6) {
                        vc.value = 'Σοβαρή Ανεπάρκεια';
                        vc.resultlevel = 3;
                    } else if (values.Triplex_AorticValve_Regurgitation_VenaContracta_Width > 0.3) {
                        vc.value = 'Μέτρια Ανεπάρκεια';
                        vc.resultlevel = 2;
                    } else {
                        vc.value = 'Μικρή Ανεπάρκεια';
                        vc.resultlevel = 1;
                    }
                    ret.push(vc);

                    var pht = {};
                    pht.name = 'Pressure Half Time'
                    if (values.Triplex_AorticValve_Regurgitation_PHT < 200) {
                        pht.value = 'Σοβαρή Ανεπάρκεια';
                        pht.resultlevel = 3;
                    } else if (values.Triplex_AorticValve_Regurgitation_PHT < 500) {
                        pht.value = 'Μέτρια Ανεπάρκεια';
                        pht.resultlevel = 2;
                    } else {
                        pht.value = 'Μικρή Ανεπάρκεια';
                        pht.resultlevel = 1;
                    }
                    ret.push(pht);

                    return ret;
                }
            };
        }
    ]);
})();
