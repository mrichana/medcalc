(function () {
  'use strict';

  /* Services */

  /**
   * medicalCalculator.services Module
   *
   * Description
   */
  angular.module('medicalCalculator.services', []).
    factory('appVersion', function () {
      return 0.01;
    });

  /**
   * Storage Module
   *
   * Persist to Storage
   */
  angular.module('storage', []).
    factory('localStorage', function () {
      return {
        get: function (name) {
          return angular.fromJson(localStorage.getItem(name));
        },
        set: function (name, value) {
          localStorage.setItem(name, angular.toJson(value));
        }
      };
    });
})();
