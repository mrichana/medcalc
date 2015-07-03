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
                            patient: ['$route', 'patientHybridStorage', function($route, patientStorage) {
                                return patientStorage.patient($route.current.params.id);
                            }]
                        }
                    })
                    .when('/Patients', {
                        templateUrl: 'partials/patients.html',
                        controller: 'patientsCtrl',
                        resolve: {
                            patients: ['patientHybridStorage', function(patientStorage) {
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
        .controller('calculatorCtrl', ['$scope', '$location', 'views', 'internalMedicineViews', 'pulmonologyViews','cardiologyViews', 'triplexViews',
            function($scope, $location,
                views, internalMedicineViews, pulmonologyViews, cardiologyViews, triplexViews) {
                $scope.filters = [
                    {   id: 'All',
                        name: 'Όλοι',
                        address: '/Calculators/All',
                        category: 'Υπολογιστές',
                        content: views.allList()
                    }, {
                        id: 'Generic',
                        name: 'Κλινική Ιατρική',
                        address: '/Calculators/Generic',
                        category: 'Υπολογιστές',
                        content: views.categories().generic
                    }, {
                        id: 'Pulmonology',
                        name: 'Πνευμονολογία',
                        address: '/Calculators/Pulmonology',
                        category: 'Υπολογιστές',
                        content: views.categories().pulmonology
                    }, {
                        id: 'Cardiology',
                        name: 'Καρδιολογία',
                        address: '/Calculators/Cardiology',
                        category: 'Υπολογιστές',
                        content: views.categories().cardiology
                    }, {
                        id: 'Ecg',
                        name: 'Ηλεκτροκαρδιογράφημα',
                        address: '/Calculators/Ecg',
                        category: 'Υπολογιστές',
                        content: views.categories().ecg
                    }, {
                        id: 'Triplex',
                        name: 'Triplex',
                        address: '/Calculators/Triplex',
                        category: 'Υπολογιστές',
                        content: views.categories().triplex
                    }, {
                        id: 'nstemi',
                        name: 'NSTEMI',
                        address: '/Calculators/nstemi',
                        category: 'Κλινική',
                        content: views.categories().nstemi
                    }, {
                        id: 'stemi',
                        name: 'STEMI',
                        address: '/Calculators/stemi',
                        category: 'Κλινική',
                        content: views.categories().stemi
                    }, {
                        id: 'af',
                        name: 'Κολπική Μαρμαρυγή',
                        address: '/Calculators/af',
                        category: 'Κλινική',
                        content: views.categories().af
                    }, {
                        id: 'hf',
                        name: 'Καρδιακή Ανεπάρκεια',
                        address: '/Calculators/hf',
                        category: 'Κλινική',
                        content: views.categories().hf
                    }
                ];

                $scope.setRelative = function (movement) {
                    var selection = _.findIndex($scope.filters, function(filter){return filter.address === $scope.location});
                    selection += movement;
                    if (selection >= 0 && selection < $scope.filters.length){
                        $location.path($scope.filters[selection].address);
                    }
                };

                //$scope.swipeLeft = function() {
                //    $scope.setRelative(1);
                //};
                //$scope.swipeRight = function() {
                //    $scope.setRelative(-1);
                //};

                $scope.$watch('location', function() {
                    $location.path($scope.location);
                });

                $scope.filters.setAbsolute = function(filterName) {
                    $scope.filters.activeIndex = _.findIndex($scope.filters, function(filter){return filter.id === filterName});
                    $scope.views = $scope.filters[$scope.filters.activeIndex].content;
                    $scope.panelsList = $scope.views;
                    $scope.values = {};
                    _.each($scope.panelsList, function(panel) {
                        panel.values = $scope.values;
                    });
                };

                $scope.$on('$routeChangeSuccess', function(event, route) {
                    $scope.filters.setAbsolute(route.params.id);
                    $scope.location = $location.path();
                });

                $scope.clearPanel = function(id) {
                    var panel = _.find($scope.views, function(panel) {
                        return panel.id === id;
                    });
                    panel.reset();
                };
            }
        ])
        .controller('patientCtrl', ['$scope', '$location', 'patient', 'views', 'patientViews', 'internalMedicineViews', 'pulmonologyViews', 'cardiologyViews', 'triplexViews',
            function($scope, $location, patient, views, patientViews, internalMedicineViews, pulmonologyViews, cardiologyViews, triplexViews) {
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
