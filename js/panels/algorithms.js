/*global angular: true */

(function () {
  'use strict';
  /**
   * calculators Module
   *
   * Available calculators
   */
  /* type options:
   *		default
   *		success
   *		warning
   *		important
   *		info
   *		inverse
   */
  angular.module('medical.panels').
    factory('algorithms', ['$http', '$templateCache', function ($http, $templateCache) {
      var panels = [];
      var ret = {};

      angular.forEach(panels, function (value) {
        ret[value] = $http.get("js/panels/base/" + value + ".json", { cache: $templateCache });
      });
      return ret;
    }]);
})();