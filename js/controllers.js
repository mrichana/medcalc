/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  /* Controllers */

  angular.module('medicalCalculator.controllers', ['medicalCalculator.panelgroups']).
    controller('calculatorCtrl', function ($scope, $location, $anchorScroll, patientStorage, patientsFile, basicCalculators, triplexCalculators, algorithmCalculators) {
      $scope.filters = [
        {name: 'Αρχείο Ασθενών', content: patientsFile},
        {name: 'Βασικά', content: basicCalculators},
        {name: 'Triplex', content: triplexCalculators},
        {name: 'Αλγόριθμοι', content: algorithmCalculators}
      ];
      $scope.filters.setAbsolute = function (filterNumber) {
        $scope.panels = angular.copy($scope.filters[filterNumber].content);
        $scope.panelsList = _.sortBy($scope.panels, "ordinal");
        $scope.slideAnimationInvert = ($scope.filters.active < filterNumber);
        $scope.filters.active = filterNumber;
      };
      $scope.filters.setAbsolute(0);
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
      $scope.patientStorage = patientStorage;

      $scope.clearPanel = function(id) {
        angular.copy($scope.filters[$scope.filters.active].content[id], $scope.panels[id]);
      };

      $scope.filteredPatients = function () {
        return $scope.panels.newPatient ? $scope.panels.newPatient.result.result : [];
      };
    });
})();
