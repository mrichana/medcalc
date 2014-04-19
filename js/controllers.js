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

      $scope.newPatientModal = function () {
        var modalInstance = $modal.open({
          templateUrl: 'partials/newPatientModal.html',
          controller: function ($scope, $modalInstance) {
            $scope.patient = {id:'', lastname:'', firstname:'', birthday:''};
            $scope.ok = function () { $modalInstance.close($scope.patient); };
            $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
          },
          resolve: {
            items: function () {
              return $scope.patientStorage;
            }
          }
        });
        modalInstance.result.then(function (patient) {
          $scope.patientStorage.addPatient(patient);
        });
      };
    });
})();
