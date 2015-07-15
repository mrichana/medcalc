var app;
(function (app) {
    'use strict';
    angular.module('medicalCalculator', [
        'medical.services',
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'ngSanitize',
        'mobile-angular-ui',
        'mgcrea.ngStrap',
        'firebase'
    ])
        .filter('to_trusted', filters.to_trusted)
        .controller('calculatorCtrl', controllers.calculatorCtrl)
        .directive('autosize', directives.autosize)
        .directive('scrollto', directives.scrollto)
        .directive('selectOnFocus', directives.selectOnFocus)
        .directive('navView', directives.navView)
        .directive('scrollMonitor', directives.scrollMonitor)
        .directive('affix', directives.affix)
        .directive('scrollSpy', directives.scrollSpy)
        .directive('result', directives.result)
        .directive('multiresult', directives.multiresult)
        .directive('view', directives.view)
        .directive('flipswitch', directives.flipswitch)
        .directive('customInput', directives.customInput)
        .directive('verifiedClick', directives.verifiedClick)
        .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/Calculators/:id', {
                templateUrl: 'partials/calculators.html',
                controller: 'calculatorCtrl'
            })
                .when('/Patient/:id', {
                templateUrl: 'partials/patient.html',
                controller: 'patientCtrl',
                resolve: {
                    patient: ['$route', 'patientHybridStorage', function ($route, patientStorage) {
                            return patientStorage.patient($route.current.params.id);
                        }]
                }
            })
                .when('/Patients', {
                templateUrl: 'partials/patients.html',
                controller: 'patientsCtrl',
                resolve: {
                    patients: ['patientHybridStorage', function (patientStorage) {
                            return patientStorage.patients();
                        }]
                }
            })
                .otherwise({
                redirectTo: '/Calculators/Generic'
            });
            $locationProvider.html5Mode(false);
        }
    ]);
})(app || (app = {}));
//# sourceMappingURL=app.js.map