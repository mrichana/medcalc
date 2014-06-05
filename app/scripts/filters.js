/*global angular: true */

(function () {
  'use strict';

  /* Filters */

  angular.module('medical.filters', []).
    filter('to_trusted', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(angular.isDefined(text)?'' + text : '');
      };
    }]).
    filter('interpolate', ['version', function (version) {
      return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }]);
})();
