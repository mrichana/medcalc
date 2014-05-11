/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  /* Services */

  /**
   * medical.calculators Module
   *
   * Description
   */
  angular.module('medical.calculators', []).
    factory('triplexCalculators', function () {
      var roundNum = function (thisNum, dec) {
        thisNum = thisNum * Math.pow(10, dec);
        thisNum = Math.round(thisNum);
        thisNum = thisNum / Math.pow(10, dec);
        return thisNum;
      };
      return {
        lavi: {
          area4Ch: 15,
          area2Ch: 15,
          length: 40,
          bsa: 1.8,

          result: function () {
            var result;
            var explanation;
            var resultlevel;

            result = roundNum((8 * this.area4Ch * this.area2Ch / (3 * Math.PI * (this.length / 10))) / this.bsa, 0);

            if (result >= 40) {
              explanation = "Μεγάλη διάταση αριστερού κόλπου";
              resultlevel = 3;
            }
            else if (result >= 34) {
              explanation = "Μέτρια διάταση αριστερού κόλπου";
              resultlevel = 2;
            }
            else if (result >= 29) {
              explanation = "Μικρή διάταση αριστερού κόλπου";
              resultlevel = 1;
            }
            else if (result >= 16) {
              explanation = "Φυσιολογικές διάστασεις αριστερού κόλπου";
              resultlevel = 0;
            }
            else {
              explanation = "";
              resultlevel = null;
            }

            return {
              result: result,
              explanation: explanation,
              resultlevel: resultlevel
            };
          }
        },
        avvr: {
          LVOTV: 1,
          AoV: 1,

          result: function () {
            var result;
            var explanation;
            var resultlevel;

            result = roundNum(this.LVOTV / this.AoV, 2);

            if (result < 0.25) {
              explanation = "Σοβαρή στένωση αορτικής βαλβίδας";
              resultlevel = 3;
            }
            else if (result <= 0.50) {
              explanation = "Μέτρια στένωση αορτικής βαλβίδας";
              resultlevel = 2;
            }
            else {
              explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας";
              resultlevel = 0;
            }
            return {
              result: result,
              explanation: explanation,
              resultlevel: resultlevel
            };
          }
        },
        avavti: {
          LVOT: 20,
          LVOTVTI: 20,
          AoVTI: 40,
          result: function () {
            var result;
            var explanation;
            var resultlevel;

            var lvotarea = Math.PI * Math.pow((this.LVOT / 10) / 2, 2);
            result = roundNum((lvotarea * this.LVOTVTI / this.AoVTI), 2);

            if (result < 1.0) {
              explanation = "Σοβαρή στένωση αορτικής βαλβίδας";
              resultlevel = 3;
            }
            else if (result <= 1.50) {
              explanation = "Μέτρια στένωση αορτικής βαλβίδας";
              resultlevel = 2;
            }
            else {
              explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας";
              resultlevel = 0;
            }
            return {
              result: result,
              explanation: explanation,
              resultlevel: resultlevel
            };
          }
        },
        avamax: {
          LVOT: 20,
          LVOTV: 1,
          AoV: 1,
          result: function () {
            var result;
            var explanation;
            var resultlevel;

            var lvotarea = Math.PI * Math.pow((this.LVOT / 10) / 2, 2);
            result = roundNum(((lvotarea * this.LVOTV) / this.AoV), 2);

            if (result < 1.0) {
              explanation = "Σοβαρή στένωση αορτικής βαλβίδας";
              resultlevel = 3;
            }
            else if (result <= 1.50) {
              explanation = "Μέτρια στένωση αορτικής βαλβίδας";
              resultlevel = 2;
            }
            else {
              explanation = "Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας";
              resultlevel = 0;
            }
            return {
              result: result,
              explanation: explanation,
              resultlevel: resultlevel
            };

          }
        },
        Zva: {
          LVOT: 20,
          LVOTVTI: 20,
          bsa: 1.9,
          sbp: 120,
          AoVmean: 1,
          result: function () {
            var result;
            var explanation;
            var resultlevel;

            var lvotarea = Math.PI * Math.pow((this.LVOT / 10) / 2, 2);
            var pressure = this.sbp + (4 * Math.pow(this.AoVmean, 2));
            var strokevolume = lvotarea * this.LVOTVTI;
            result = roundNum(pressure / (strokevolume / this.bsa), 0);

            if (result >= 4.5) {
              explanation = "Υψηλή Αορτοβαλβιδική Αντίσταση";
              resultlevel = 3;
            }
            else if (result > 3.50) {
              explanation = "Μέτρια Αορτοβαλβιδική Αντίσταση";
              resultlevel = 1;
            }
            else {
              explanation = "Μικρή Αορτοβαλβιδική Αντίσταση";
              resultlevel = 0;
            }
            return {
              result: result,
              explanation: explanation,
              resultlevel: resultlevel
            };
          }
        }
      };
    });
})();
