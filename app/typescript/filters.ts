module filters {
  'use strict';

  /* Filters */
  export interface Patient {
    lastname: string;
    firstname: string;
  };

  export function to_trusted($sce) {
    this.$inject = ["$sce"];
    return function(text: string) {
      return $sce.trustAsHtml(angular.isDefined(text) ? '' + text : '');
    };
  };

  /*angular.module('medical.filters', []).
  filter('filterPatients', ['patientTemplateTest',
      function(patientTemplateTest) {
          return function(array, patientTemplate) {
            var filterfunc = patientTemplateTest;

            var ret = _.sortBy(_.filter(array, function(patient : Patient) {
                return filterfunc(patient, patientTemplate);
            }), function(item: Patient) {
                return item.lastname + ' ' + item.firstname;
            });
            return ret;
          };
      }
  ]);*/
}
