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
                    .when('/Patient/:id', {
                        templateUrl: 'partials/patient.html',
                        controller: 'patientCtrl',
                        resolve: {
                            patient: ['$route', 'patientLocalStorage', function($route, patientStorage) {
                                return patientStorage.patient($route.current.params.id);
                            }]
                        }
                    })
                    .when('/Patients', {
                        templateUrl: 'partials/patients.html',
                        controller: 'patientsCtrl',
                        resolve: {
                            patients: ['patientLocalStorage', function(patientStorage) {
                                return patientStorage.patients();
                            }]
                        }
                    })
                    .otherwise({
                        redirectTo: '/Calculators/Generic'
                    });
                // configure html5 to get links working on jsfiddle
                $locationProvider.html5Mode(false);
            }
        ])
        .controller('generalCtrl', ['$scope', '$route', '$location',
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

                $scope.$on('$routeChangeSuccess', function() {
                    $scope.location = $location.path();
                });

                $scope.$watch('location', function() {
                    $location.path($scope.location);
                });
            }
        ])
        .controller('calculatorCtrl', ['$scope', '$route', '$routeParams', 'views', 'internalMedicineViews', 'triplexViews',
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

                    $scope.panelsList = $scope.views;
                    $scope.filters.active = filterName;
                    $scope.values = {};
                    _.each($scope.panelsList, function(panel) {
                        panel.values = $scope.values;
                    });
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
            }
        ])
        .controller('patientCtrl', ['$scope', '$location', 'patient', 'views', 'patientViews', 'internalMedicineViews', 'triplexViews',
            function($scope, $location, patient, views, patientViews, internalMedicineViews, triplexViews) {
                var updatePanelsList = function() {
                    $scope.panelsList = angular.copy(_.sortBy(_.filter(views.all(), function(view) {
                        return _.contains(_.keys($scope.patient.calculatorsActive), view.id);
                    }), 'order'));
                };

                $scope.patient = patient.value;
                updatePanelsList();
                _.each($scope.panelsList, function(panel) {
                    panel.values = $scope.patient;
                });

                $scope.fullName = function(patient) {
                    return patient && patient.lastname + ', ' + patient.firstname;
                };
                $scope.save = function() {
                    patient.save();
                    $location.path('/Patients');
                };
                $scope.delete = function() {
                    patient.delete();
                    $location.path('/Patients');
                };

                $scope.dropdown = [{
                    text: 'Στοιχεία Επικοινωνίας...',
                    disabled: 'existPanel(\'patientContactDetails\')',
                    click: 'addPanel(\'patientContactDetails\')'
                }, {
                    text: 'Σημειώσεις...',
                    disabled: 'existPanel(\'patientNotes\')',
                    click: 'addPanel(\'patientNotes\')'
                }];


                $scope.existPanel = function(panelId) {
                    return _.contains(_.keys($scope.patient.calculatorsActive), panelId);
                };

                $scope.addPanel = function(panelId) {
                    $scope.patient.calculatorsActive = $scope.patient.calculatorsActive || {};
                    $scope.patient.calculatorsActive[panelId] = true;

                    updatePanelsList();

                    _.each($scope.panelsList, function(panel) {
                        panel.values = $scope.patient;
                    });
                };

                $scope.removePanel = function(id) {
                    _.each(views.all()[id].defaultValues, function(value, key) {
                        $scope.patient[key] = value;
                    });
                    delete $scope.patient.calculatorsActive[id];
                    $scope.panelsList = _.filter(views.all(), function(view) {
                        return _.contains(_.keys($scope.patient.calculatorsActive), view.id);
                    });
                    _.each($scope.panelsList, function(panel) {
                        panel.values = $scope.patient;
                    });
                };
            }
        ])
        .controller('patientsCtrl', ['$scope', '$location', 'views', 'patients', 'patientViews',
            function($scope, $location, views, patients, patientViews) {

                var values = {};
                $scope.searchView = views.all().newPatient;
                $scope.patientView = views.all().patientView;
                $scope.searchView.values = $scope.values = values;

                $scope.values.patients = patients.list;

                $scope.searchView.addPatient = function() {
                    this.result.calculatorsActive = {
                        patientEdit: true
                    };
                    patients.add(this.result);
                    $scope.go('/Patient/' + this.result.id);
                };

                $scope.go = function(address) {
                    $location.path(address);
                };

                $scope.$watch('values', function() {
                    $scope.patientTemplate = {
                        amka: values.amka,
                        firstname: values.firstname,
                        lastname: values.lastname
                    };
                    //     // $scope.values.filteredPatients = patientStorage.filterPatients({
                    //     //     amka: values.amka,
                    //     //     firstname: values.firstname,
                    //     //     lastname: values.lastname
                    //     // });

                    //     // $scope.patients = _.map($scope.values.patients, function(patient) {
                    //     //     var view = views.all().patientView;
                    //     //     view.values = patient;
                    //     //     return view;
                    //     // });
                }, true);
                $scope.clearPanel = function(id) {
                    views.all()[id].reset();
                };

                $scope.fullName = function(patient) {
                    return patient && patient.lastname + ', ' + patient.firstname;
                };
            }
        ]);
})();
