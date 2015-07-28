module filters {
  'use strict';

  /* Filters */
  export function to_trusted($sce: ng.ISCEService): ng.IFilterService {
    return function(text: string): any {
      return $sce.trustAsHtml(angular.isDefined(text) ? '' + text : '');
    };
  };
  to_trusted.$inject=['$sce'];

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
