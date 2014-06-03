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
                        templateUrl: '/partials/calculators.html',
                        controller: 'calculatorCtrl'
                    })
                    .when('/Patient/:amka', {
                        templateUrl: '/partials/patient.html',
                        controller: 'patientCtrl'
                    })
                    .when('/Patients', {
                        templateUrl: '/partials/patients.html',
                        controller: 'patientsCtrl'
                    })
                    .otherwise({
                        redirectTo: '/Calculators/Generic'
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
                    name: 'Κλινική Ιατρική',
                    content: '/Calculators/Generic',
                    category: 'Υπολογιστές'
                }, {
                    name: 'Καρδιολογία',
                    content: '/Calculators/Cardiology',
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
                    Generic: {
                        name: 'Κλινική Ιατρική',
                        content: views.categories().generic
                    },
                    Cardiology: {
                        name: 'Cardiology',
                        content: views.categories().cardiology
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
        .controller('patientCtrl',
            function($scope, $route, $routeParams, $location, $timeout, patientStorage, views, patientViews, internalMedicineViews, triplexViews) {
                $scope.$on('$routeChangeSuccess', function(event, route) {
                    $scope.patient = angular.copy(patientStorage.patient(route.params.amka));
                    $scope.panelsList = _.filter(views.all(), function(view) {
                        return _.contains(_.keys($scope.patient.calculatorsActive), view.id);
                    });
                    _.each($scope.panelsList, function(panel) {
                        panel.values = $scope.patient;
                    });
                });
                $scope.fullName = function(patient) {
                    return patient.lastname + ', ' + patient.firstname;
                };
                $scope.save = function() {
                    _.extend(patientStorage.patient($scope.patient.amka), $scope.patient);
                    $location.path('/Patients');
                };
                $scope.delete = function() {
                    patientStorage.removePatient($scope.patient);
                    $location.path('/Patients');
                }
                $scope.removePanel = function(id) {
                    delete $scope.patient.calculatorsActive[id];
                    $scope.panelsList = _.filter(views.all(), function(view) {
                        return _.contains(_.keys($scope.patient.calculatorsActive), view.id);
                    });
                }
            })
        .controller('patientsCtrl',
            function($scope, $location, views, patientStorage, patientViews) {
                var values = {};
                $scope.patientStorage = patientStorage;
                $scope.searchView = views.all().newPatient;
                $scope.patientView = views.all().patientView;
                $scope.searchView.values = $scope.values = values;

                $scope.searchView.addPatient = function() {
                    patientStorage.addPatient(this.result);
                    $scope.go('/Patient/' + this.values.amka);
                };

                $scope.go = function(address) {
                    $location.path(address);
                };
                $scope.$watch('values.newPatient', function() {
                    $scope.values.patients = patientStorage.filterPatients(values.newPatient);
                    $scope.patients = _.map($scope.values.patients, function(patient) {
                        var view = angular.copy(views.all().patientView);
                        view.values = patient;
                        return view;
                    });
                });

                $scope.clearPanel = function(id) {
                    views.all()[id].reset();
                };

                $scope.fullName = function(patient) {
                    return patient.lastname + ', ' + patient.firstname;
                };
            });
})();