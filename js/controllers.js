/*global angular: true */
/*global _: true */

(function() {
    'use strict';

    /* Controllers */

    angular.module('medical.controllers', ['ngRoute', 'medical.views'])
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
                views, internalMedicineViews, triplexViews) {
                $scope.filters = {
                    General: {
                        name: 'Βασικά',
                        content: views.categories().general
                    },
                    Triplex: {
                        name: 'Triplex',
                        content: views.categories().triplex
                    }
                };

                $scope.filters.setAbsolute = function(filterName) {
                    $scope.views = $scope.filters[filterName].content;

                    $scope.panelsList = _.sortBy($scope.views, 'ordinal');
                    $scope.filters.active = filterName;
                };

                $scope.$on('$routeChangeSuccess', function(event, route) {
                    $scope.filters.setAbsolute(route.params.id);
                });

                $scope.clearPanel = function(id) {
                    var panel = _.find($scope.views, function(panel) {
                        return panel.id === id;
                    });
                    panel.reset();
                };
            })
        .controller('patientListCtrl',
            function($scope, views, patientStorage, patientViews) {
                var values = {};
                $scope.patientStorage = patientStorage;
                $scope.searchPanel = views.categories().patient[0];
                //$scope.listPanel = views.categories().patient[1];
                $scope.searchPanel.values = $scope.values = values;
        $scope.patients = patientStorage.filterPatients(values.newPatient);
                $scope.clearPanel = function(id) {
                    views.all()[id].reset();
                };
            })
        .controller('searchPatientCtrl',
            function($scope, views, patientStorage, patientViews) {
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