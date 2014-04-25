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
    factory('patientpanels', function () {
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
        newPatient: {
          id: "newPatient",
          name: "Νέος Ασθενής",
          type: "basic",
          template: "calculator.basic",
          fields: [
            {
              id: "id",
              name: "Α.Μ.Κ.Α.",
              value: "",
              input: {
                type: "text"
              }
            },
            {
              id: "lastname",
              name: "Επώνυμο",
              value: "",
              input: {
                type: "text"
              }
            },
            {
              id: "firstname",
              name: "Όνομα",
              value: "",
              input: {
                type: "text"
              }
            },
            {
              id: "birthday",
              name: "Ημερομηνία Γέννησης",
              value: new Date(1960),
              input: {
                type: "date"
              }
            }
          ],
          update: function (newValue, oldValue, scope) {
            return _.reduce(newValue, function(patient, field){
              patient[field.id]=field.value;
              return patient;
            }, {});
          }
        }
      };
    });
})();