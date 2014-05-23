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
                        redirectTo: '/Calculators/InternalMedicine'
                    });
                // configure html5 to get links working on jsfiddle
                $locationProvider.html5Mode(false);
            }
        ])
        .controller('generalCtrl',
            function($scope, $route, $location) {
                $scope.filters = [{
                    name: 'Αρχείο Ασθενών',
                    content: '/Patients',
                    category: 'Αρχείο'
                }, {
                    name: 'Γενική Παθολογία',
                    content: '/Calculators/InternalMedicine',
                    category: 'Υπολογιστές'
                }, {
                    name: 'Triplex',
                    content: '/Calculators/Triplex',
                    category: 'Υπολογιστές'
                }];

                $scope.$on('$routeChangeSuccess', function(event, route) {
                    $scope.location = $location.path();
                });

                $scope.$watch('location', function() {
                    $location.path($scope.location);
                });
            })
        .controller('calculatorCtrl',
            function($scope, $route, $routeParams,
                views, internalMedicineViews, triplexViews) {
                $scope.filters = {
                    InternalMedicine: {
                        name: 'Γενική Παθολογία',
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
                $scope.searchView = views.categories().patient[0];
                $scope.searchView.values = $scope.values = values;
                $scope.patients = patientStorage.filterPatients(values.searchPatient);
                $scope.clearPanel = function(id) {
                    views.all()[id].reset();
                };
            })
        .controller('searchPatientCtrl',
            function($scope, views, patientStorage, patientViews) {
                $scope.searchView.addPatient = function() {
                    patientStorage.addPatient(this.result);
                    $scope.searchView.reset();
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