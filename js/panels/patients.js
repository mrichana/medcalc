(function () {
  'use strict';
  /**
   * calculators Module
   *
   * Available calculators
   */
  angular.module('medicalCalculator.panels').
    factory('patients', function () {
      return {
        patient: {
          id: "patient",
          name: "Ασθενείς",
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
              url: "img/panels/lavolbpm_01s.jpg"
            },
            {
              id: "image",
              input: {
                type: "image"
              },
              url: "img/panels/lavolbpm_02s.jpg"
            }
          ],
          calc: function (newValue, oldValue, scope) {
            return {
              result: "result",
              explanation: "explanation",
              resultlevel: 0
            };
          }
        }
      };
    });
})();