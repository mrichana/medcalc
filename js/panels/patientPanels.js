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
    factory('patientPanels', function (update, init, reset) {
      return [
        {
          id: "newPatient",
          name: "Αναζήτηση/Νέος Ασθενής",
          ordinal: 0,
          type: "basic",
          template: "patient.basic",
          defaultValues: {
            id: "",
            lastname: "",
            firstname: ""
          },
          fields: [
            {
              id: "id",
              name: "Α.Μ.Κ.Α.",
              input: {
                type: "text"
              }
            },
            {
              id: "lastname",
              name: "Επώνυμο",
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
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "listPatients",
          name: "Λίστα Ασθενών",
          ordinal: 1,
          type: "basic",
          template: "patient.list",
          update: update
        }
      ];
    });
})();

