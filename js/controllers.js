/*global angular: true */

(function () {
  'use strict';

  /* Controllers */

  angular.module('medicalCalculator.controllers', ['medicalCalculator.panelgroups']).
    controller('calculatorCtrl', function ($scope, $location, $anchorScroll, basicCalculators, triplexCalculators, algorithmCalculators) {
      $scope.filters = [
        {name: 'Βασικά', content: basicCalculators},
        {name: 'Triplex', content: triplexCalculators},
        {name: 'Αλγόριθμοι', content: algorithmCalculators}
      ];
      $scope.filters.setAbsolute = function (filterNumber) {
        $scope.panels = angular.copy($scope.filters[filterNumber].content);
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
    });


  angular.module('medicalFile.controllers', ['medicalFile.services', 'ui.bootstrap']).
    controller('fileCtrl', function ($scope, $location, $anchorScroll, patientStorage, $modal) {
      $scope.patientStorage = patientStorage;

      $scope.items = ['item1', 'item2', 'item3'];
      $scope.open = function () {
        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: function ($scope, $modalInstance, items) {
            $scope.items = items;
            $scope.selected = {
              item: $scope.items[0]
            };
            $scope.ok = function () { $modalInstance.close($scope.selected.item); };
            $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
          },
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        });
      };
    });
})();
