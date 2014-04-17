(function () {
  'use strict';

  /* Filters */

  angular.module('medical.filters', []).
    filter('to_trusted', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text ? '' + text : '');
      };
    }]).
    filter('interpolate', ['version', function (version) {
      return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }]);


  angular.module('medicalCalculator.filters', []).
    filter('null', [ function (){
      return function(text) {
        return text;
      };
    }]);


  angular.module('medicalFile.filters', []).
    filter('null', [ function (){
      return function(text) {
        return text;
      };
    }]);
})();
