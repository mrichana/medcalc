var controllers;
(function (controllers) {
    'use strict';
    var calculatorCtrl = (function () {
        function calculatorCtrl($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            var views = CalculatorViews.viewsCollection;
            $scope.filters = [
                {
                    id: 'All',
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
            $scope.setRelativeFilter = function (movement) {
                var selection = _.findIndex($scope.filters, function (filter) { return filter.address === $scope.location; });
                selection += movement;
                if (selection >= 0 && selection < $scope.filters.length) {
                    $location.path($scope.filters[selection].address);
                }
            };
            $scope.$watch('location', function () {
                $location.path($scope.location);
            });
            $scope.setAbsoluteFilter = function (filterName) {
                $scope.activeFilterIndex = _.findIndex($scope.filters, function (filter) { return filter.id === filterName; });
                $scope.views = $scope.filters[$scope.activeFilterIndex].content;
                $scope.panelsList = $scope.views;
                $scope.values = {};
                _.each($scope.panelsList, function (panel) {
                    panel.values = $scope.values;
                });
            };
            $scope.$on('$routeChangeSuccess', function (event, route) {
                $scope.setAbsoluteFilter(route.params.id);
                $scope.location = $location.path();
            });
            $scope.clearPanel = function (id) {
                var panel = _.find($scope.views, function (panel) {
                    return panel.id === id;
                });
                panel.reset();
            };
        }
        ;
        calculatorCtrl.$inject = ['$scope', '$location'];
        return calculatorCtrl;
    })();
    controllers.calculatorCtrl = calculatorCtrl;
})(controllers || (controllers = {}));
//# sourceMappingURL=controllers.js.map