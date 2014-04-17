(function () {
  'use strict';

  /* Services */

  /**
   * medicalCalculator.services Module
   *
   * Description
   */
  angular.module('medical.services', []).
    factory('appVersion', function () {
      return 0.01;
    });
  angular.module('medicalCalculator.services', []).
    factory('null', function () {
      return null;
    });
  angular.module('medicalFile.services', []).
    factory('null', function () {
      return null;
    });
})();
