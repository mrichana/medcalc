/*global angular: true */
/*global _: true */

(function () {
  'use strict';
  /**
   * calculators Module
   *
   * Available calculators
   */
  angular.module('medical.panels').
    factory('triplexpanels', function () {
      var roundNum = function (thisNum, dec) {
        thisNum = thisNum * Math.pow(10, dec);
        thisNum = Math.round(thisNum);
        thisNum = thisNum / Math.pow(10, dec);
        return thisNum;
      };
      var fieldFromAnyValue = function (value, field, array) {
        return _.find(array, function (iterator) {
          return iterator[field] === value;
        });
      };
      var fieldFromId = function (id, array) {
        return fieldFromAnyValue(id, "id", array);
      };
      var val = function (id, array) {
        var field = fieldFromId(id, array);
        var ret = field.value;
        if (field.input.type === "check") {
          ret = ret * (field.input.multiplier || 1);
        }
        return ret;
      };


      return {
        lavi: {
          id: "lavi",
          name: "Left Atrium Volume Index",
          type: "basic",
          template: "calculator.basic",
          fields: [
            {
              id: "Area4Ch",
              name: "Πλανιμέτρηση αριστερού κόλπου από εικόνα 4 κοιλοτήτων A1(cm<sup>2</sup>)",
              value: 15,
              input: {
                type: "number",
                step: 1,
                min: 5,
                max: 80
              }
            },
            {
              id: "Area2Ch",
              name: "Πλανιμέτρηση αριστερού κόλπου από εικόνα 2 κοιλοτήτων A2(cm<sup>2</sup>)",
              value: 15,
              input: {
                type: "number",
                step: 1,
                min: 5,
                max: 80
              }
            },
            {
              id: "Length",
              name: "Μήκος αριστερού κόλπου L(mm)",
              value: 40,
              input: {
                type: "number",
                step: 1,
                min: 5,
                max: 80
              }
            },
            {
              id: "bsa",
              name: "BSA (m<sup>2</sup>)",
              value: 1.9,
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 3
              }
            },
            {
              id: "image",
              input: {
                type: "image"
              },
              url: "img/panels/lav.png"
            }
          ],
          update: function (newValue) {
            var area4Ch = val("Area4Ch", newValue);
            var area2Ch = val("Area4Ch", newValue);
            var length = val("Length", newValue);
            var bsa = val("bsa", newValue);
            var result;
            var explanation;
            var resultlevel;

            result = roundNum((8 * area4Ch * area2Ch / (3 * Math.PI * (length / 10))) / bsa, 0);

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
          id: "avvr",
          name: "Aortic Valve Velocity Ratio",
          type: "basic",
          template: "calculator.basic",
          fields: [
            {
              id: "LVOTV",
              name: "Υποβαλβιδική Μέγιστη Ταχύτητα Vmax<sub>1</sub> (m/s)",
              value: 1,
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 8
              }
            },
            {
              id: "AorticV",
              name: "Διαβαλβιδική Μέγιστη Ταχύτητα Vmax<sub>2</sub> (m/s)",
              value: 1,
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 8
              }
            },
            {
              id: "image",
              input: {
                type: "image"
              },
              url: "img/panels/AVVR.png"
            }
          ],
          update: function (newValue) {
            var lvot = val("LVOTV", newValue);
            var av = val("AorticV", newValue);
            var result;
            var explanation;
            var resultlevel;

            result = roundNum(lvot / av, 2);

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
          id: "avavti",
          name: "Aortic Valve Area (VTI)",
          type: "basic",
          template: "calculator.basic",
          fields: [
            {
              id: "LVOT",
              name: "Διάμετρος LVOT (mm)",
              value: 20,
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 50
              }
            },
            {
              id: "LVOTVTI",
              name: "Υποβαλβιδικό Ολοκλήρωμα VTI<sub>1</sub> (cm)",
              value: 20,
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 100
              }
            },
            {
              id: "AorticVTI",
              name: "Διαβαλβιδικό Ολοκλήρωμα VTI<sub>2</sub> (cm)",
              value: 40,
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 100
              }
            },
            {
              id: "image",
              input: {
                type: "image"
              },
              url: "img/panels/AVVR.png"
            }
          ],
          update: function (newValue) {
            var lvot = val("LVOT", newValue);
            var lvotv = val("LVOTVTI", newValue);
            var av = val("AorticVTI", newValue);
            var result;
            var explanation;
            var resultlevel;

            var lvotarea = Math.PI * Math.pow((lvot / 10) / 2, 2);
            result = roundNum((lvotarea * lvotv / av), 2);

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
          id: "avamax",
          name: "Aortic Valve Area (Vmax)",
          type: "basic",
          template: "calculator.basic",
          fields: [
            {
              id: "LVOT",
              name: "Διάμετρος LVOT (mm)",
              value: 20,
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 50
              }
            },
            {
              id: "LVOTVmax",
              name: "Υποβαλβιδική Μέγιστη Ταχύτητα Vmax<sub>1</sub> (m/s)",
              value: 1,
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 8
              }
            },
            {
              id: "AorticVmax",
              name: "Διαβαλβιδική Μέγιστη Ταχύτητα Vmax<sub>2</sub> (m/s)",
              value: 1,
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 8
              }
            },
            {
              id: "image",
              input: {
                type: "image"
              },
              url: "img/panels/AVVR.png"
            }
          ],
          update: function (newValue) {
            var lvot = val("LVOT", newValue);
            var lvotv = val("LVOTVmax", newValue);
            var av = val("AorticVmax", newValue);
            var result;
            var explanation;
            var resultlevel;

            var lvotarea = Math.PI * Math.pow((lvot / 10) / 2, 2);
            result = roundNum(((lvotarea * lvotv) / av), 2);

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
          id: "Zva",
          name: "Αορτοβαλβιδική Αντίσταση (Zva)",
          type: "basic",
          template: "calculator.basic",
          fields: [
            {
              id: "LVOT",
              name: "Διάμετρος LVOT (mm)",
              value: 20,
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 50
              }
            },
            {
              id: "LVOTVTI",
              name: "Υποβαλβιδικό Ολοκλήρωμα VTI<sub>1</sub> (cm)",
              value: 20,
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 100
              }
            },
            {
              id: "bsa",
              name: "BSA (m<sup>2</sup>)",
              value: 1.9,
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 3
              }
            },
            {
              id: "bp",
              name: "Συστηματική Συστολική Αρτηριακή Πίεση (mmHg)",
              value: 120,
              input: {
                type: "number",
                step: 5,
                min: 60,
                max: 220
              }
            },
            {
              id: "AorticVmean",
              name: "Διαβαλβιδική Μέση Ταχύτητα (m/s)",
              value: 1,
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 8
              }
            }
          ],
          update: function (newValue) {
            var lvot = val("LVOT", newValue);
            var lvotvti = val("LVOTVTI", newValue);
            var bsa = val("bsa", newValue);
            var bp = val("bp", newValue);
            var av = val("AorticVmean", newValue);
            var result;
            var explanation;
            var resultlevel;

            var lvotarea = Math.PI * Math.pow((lvot / 10) / 2, 2);
            var pressure = bp + (4 * Math.pow(av, 2));
            var strokevolume = lvotarea * lvotvti;
            result = roundNum(pressure / (strokevolume / bsa), 0);

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