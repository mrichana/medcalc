/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  /* Controllers */

  angular.module('medical.controllers', ['ngRoute', 'medical.panelgroups'])
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $routeProvider
          .when('/Calculators/:id', {
            templateUrl: 'partials/calculators.html',
            controller: 'calculatorCtrl'
          })
          .when('/Patients', {
            templateUrl: 'partials/calculators.html',
            controller: 'patientListCtrl'
          })
          .when('/Patient/:id', {
            templateUrl: 'partials/calculators.html',
            controller: 'patientCtrl'
          })
          .otherwise({redirectTo: '/Calculators/General'});
        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
      }])
    .controller('generalCtrl',
      function ($scope, $route) {
        $scope.filters = [
          {name: 'Αρχείο Ασθενών', content: '#/Patients'},
          {name: 'Βασικά', content: '#/Calculator/General'},
          {name: 'Triplex', content: '#/Calculator/Triplex'}
        ];
        $scope.$on("$routeChangeSuccess", function (event, route) {
//          $scope.location = $location.url();
        });
      })
    .controller('calculatorCtrl',
    function ($scope, $route, $routeParams, basicCalculatorPanels, triplexCalculatorPanels) {
      $scope.filters = {
        General: {name: 'Βασικά', content: basicCalculatorPanels},
        Triplex: {name: 'Triplex', content: triplexCalculatorPanels}
      };

      $scope.filters.setAbsolute = function (filterName) {
        $scope.panels = $scope.filters[filterName].content;

        $scope.panelsList = _.sortBy($scope.panels, "ordinal");
        $scope.filters.active = filterName;
      };

      $scope.$on("$routeChangeSuccess", function (event, route) {
        $scope.filters.setAbsolute(route.params.id);
      });

      $scope.clearPanel = function (id) {
        var panel = _.find($scope.panels, function (panel) {
          return panel.id === id;
        });
        panel.reset();
      };
    })
    .controller('patientListCtrl',
    function ($scope, $route, $routeParams, patientsFile, patientStorage) {
      var values = {};
      $scope.patientStorage = patientStorage;
      $scope.panelsList = _.sortBy(patientsFile, 'ordinal');
      _.each($scope.panelsList, function (panel){panel.values = values;});
      $scope.clearPanel = function (id) {
        var panel = _.find($scope.panels, function (panel) {
          return panel.id === id;
        });
        panel.reset();
      };
    })
  .controller('patientCtrl',
    function ($scope, $route, $location, patientStorage) {
      var patient;
      $scope.$on("$routeChangeSuccess", function (event, route) {
        patient = patientStorage.patient(route.params.id);
        if (!patient) {
          $location.path('/Patients');
        }
      });
    });
})();
