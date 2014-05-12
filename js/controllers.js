/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  /* Controllers */

  angular.module('medical.controllers', ['medical.panelgroups']).
    controller('calculatorCtrl', function ($scope, $location, $anchorScroll, patientStorage, patientsFile, basicCalculatorPanels, triplexCalculatorPanels) {
      $scope.filters = [
        {name: 'Αρχείο Ασθενών', content: patientsFile},
        {name: 'Βασικά', content: basicCalculatorPanels},
        {name: 'Triplex', content: triplexCalculatorPanels}
      ];
      $scope.filters.setAbsolute = function (filterNumber) {
        $scope.panels = angular.copy($scope.filters[filterNumber].content);
        $scope.panelsList = _.sortBy($scope.panels, "ordinal");
        $scope.slideAnimationInvert = ($scope.filters.active < filterNumber);
        $scope.filters.active = filterNumber;
      };
      $scope.filters.setAbsolute(1);
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
        var panel = _.find($scope.panels, function (panel) {
          return panel.id === id;
        });
        panel.reset();
      };

      $scope.filteredPatients = function () {
        return $scope.panels.newPatient ? $scope.panels.newPatient.result.result : [];
      };
    });
})();
