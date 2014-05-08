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

      var patientStorage = angular.injector(['medicalCalculator.services', 'ngStorage', 'ng']).get('patientStorage');

      return {
        newPatient: {
          id: "newPatient",
          name: "Αναζήτηση/Νέος Ασθενής",
          type: "basic",
          template: "patient.basic",
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
            }
          ],
          update: function (newValue, oldValue, scope) {
            var patienttempl = _.reduce(newValue, function(patient, field){
              patient[field.id]=field.value;
              return patient;
            }, {});
            var result = patientStorage.filterPatients(patienttempl);
            return {
              result: result
            };
          }
        }
      };
    });
})();

