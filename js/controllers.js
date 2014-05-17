/*global angular: true */
/*global _: true */

(function() {
    'use strict';

    /* Controllers */

    angular.module('medical.controllers', ['ngRoute', 'medical.panels'])
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/Calculators/:id', {
                        templateUrl: 'partials/calculators.html',
                        controller: 'calculatorCtrl'
                    })
                    .when('/Patients', {
                        templateUrl: 'partials/patients.html',
                        controller: 'patientListCtrl'
                    })
                    .when('/Patient/:id', {
                        templateUrl: 'partials/calculators.html',
                        controller: 'patientCtrl'
                    })
                    .otherwise({
                        redirectTo: '/Calculators/General'
                    });
                // configure html5 to get links working on jsfiddle
                $locationProvider.html5Mode(false);
            }
        ])
        .controller('generalCtrl',
            function($scope, $route) {
                $scope.filters = [{
                    name: 'Αρχείο Ασθενών',
                    content: '#/Patients'
                }, {
                    name: 'Βασικά',
                    content: '#/Calculators/General'
                }, {
                    name: 'Triplex',
                    content: '#/Calculators/Triplex'
                }];
                $scope.$on('$routeChangeSuccess', function(event, route) {
                    //          $scope.location = $location.url();
                });
            })
        .controller('calculatorCtrl',
            function($scope, $route, $routeParams,
                panels, calculatorPanels, triplexPanels) {
                $scope.filters = {
                    General: {
                        name: 'Βασικά',
                        content: panels.categories().general
                    },
                    Triplex: {
                        name: 'Triplex',
                        content: panels.categories().triplex
                    }
                };

                $scope.filters.setAbsolute = function(filterName) {
                    $scope.panels = $scope.filters[filterName].content;

                    $scope.panelsList = _.sortBy($scope.panels, 'ordinal');
                    $scope.filters.active = filterName;
                };

                $scope.$on('$routeChangeSuccess', function(event, route) {
                    $scope.filters.setAbsolute(route.params.id);
                });

                $scope.clearPanel = function(id) {
                    var panel = _.find($scope.panels, function(panel) {
                        return panel.id === id;
                    });
                    panel.reset();
                };
            })
        .controller('patientListCtrl',
            function($scope, panels, patientStorage, patientPanels) {
                var values = {};
                $scope.patientStorage = patientStorage;
                $scope.searchPanel = panels.categories().patient[0];
                //$scope.listPanel = panels.categories().patient[1];
                $scope.searchPanel.values = $scope.values = values;
        $scope.patients = patientStorage.filterPatients(values.newPatient);
                $scope.clearPanel = function(id) {
                    panels.all()[id].reset();
                };
            })
        .controller('searchPatientCtrl',
            function($scope, panels, patientStorage, patientPanels) {
                $scope.searchPanel.addPatient = function() {
                    patientStorage.addPatient(this.result);
                    $scope.searchPanel.reset();
                };
            })
        .controller('patientCtrl',
            function($scope, $route, $location, patientStorage) {
                var patient;
                $scope.$on('$routeChangeSuccess', function(event, route) {
                    patient = patientStorage.patient(route.params.id);
                    if (!patient) {
                        $location.path('/Patients');
                    }
                });
            });
})();