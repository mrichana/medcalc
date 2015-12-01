module controllers {
    'use strict';

    interface ICalculatorScope extends ng.IScope {
        filterText: string;
        onFilterTextChange
        setFilter(filterName: string): void;
        location: string;
        views: CalculatorViews.IViewDescriptionList;
        panelsList: CalculatorViews.IView[];
        categories: any;
        values: any;

        CreateHeader(string):boolean;

        currentCategory: string;

        clearPanel(id: string): void;
    }

    /* Controllers */
    export class calculatorCtrl {
        public static $inject = ['$scope', '$location'];
        constructor(private $scope: ICalculatorScope, private $location: ng.ILocationService) {
            var views = CalculatorViews.viewsCollection;
            $scope.filterText = '';
            $scope.values = {};

            $scope.$watch("filterText", function(newValue, olValue) {
              $scope.setFilter(newValue);
            });

            $scope.currentCategory = '';
            $scope.CreateHeader = function(category:string):boolean {
              var showHeader = (category!=$scope.currentCategory);
              $scope.currentCategory = category;
              return showHeader;
            };

            ($scope.setFilter = function (filterText: string ="") {
                $scope.views = views.filter(filterText);
                $scope.panelsList = _.map($scope.views.list, function (viewDesc: CalculatorViews.IViewDescription) {
                    return viewDesc.factory($scope.values);
                });
                //$scope.categories = _.groupBy($scope.views.list, "category");
                //$scope.categories = _.pairs($scope.views.categories);
            })();

            $scope.clearPanel = function (id) {
                var panel = _.find($scope.panelsList, function (panel) {
                    return panel.id === id;
                });
                panel.reset();
            };
        };
    }

    /*
      interface IPatientScope extends ICalculatorScope {
        patient: any;
      };
      export class patientCtrl {
        public static $inject = ['$scope', '$location', 'patient', 'views', 'patientViews', 'internalMedicineViews', 'ΠνευμονολογίαViews', 'ΚαρδιολογίαViews', 'triplexViews'];
        constructor(private $scope: IPatientScope, private $location, private patient, private views, private patientViews, private internalMedicineViews, private pulmonologyViews, private cardiologyViews, private triplexViews) {
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
        };
      }

      export class patientsCtrl {
        public static $inject = ['$scope', '$location', 'views', 'patients', 'patientViews'];
        constructor($scope, $location, views, patients, patientViews) {
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
      }
    */
}
