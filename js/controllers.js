(function () {
  'use strict';

  /* Controllers */

  angular.module('medicalCalculator.controllers', ['medicalCalculator.panelgroups']).
    controller('calculatorCtrl', function ($scope, $location, $anchorScroll, patients, basicCalculators, triplexCalculators, algorithmCalculators) {
      $scope.filters = [
        {name: 'Αρχείο Ασθενών', content: patients},
        {name: 'Βασικά', content: basicCalculators},
        {name: 'Triplex', content: triplexCalculators},
        {name: 'Αλγόριθμοι', content: algorithmCalculators}
      ];
      ($scope.filters.setAbsolute = function (filterNumber) {
        $scope.panels = angular.copy($scope.filters[filterNumber].content);
        $scope.slideAnimationInvert = ($scope.filters.active < filterNumber);
        $scope.filters.active = filterNumber;
      })(0);
      $scope.filters.setRelative = function (steps) {
        var newValue = $scope.filters.active + steps;
        if (newValue >= $scope.filters.length) {
          newValue = $scope.filters.length - 1;
        }
        if (newValue < 0) {
          newValue = 0;
        }
        $scope.filters.setAbsolute(newValue);
      };
    });


  angular.module('medicalFile.controllers', []).
    controller('fileCtrl', function ($scope, $location, $anchorScroll) {
    });
})();
