module controllers {
  'use strict';

  interface ICalculatorScope extends ng.IScope {
    filters: any[];
    activeFilterIndex: number;
    setRelativeFilter(movement: number): void;
    setAbsoluteFilter(filterName: string): void;
    location: string;
    views: any[];
    panelsList: any[];
    values: any;
    clearPanel(id: string): void;
  }

  /* Controllers */
  export class calculatorCtrl {
    public static $inject = ['$scope', '$location'];
    constructor(private $scope: ICalculatorScope, private $location: ng.ILocationService) {
      var views = CalculatorViews.viewsCollection;
      $scope.filters = [
        {
          id: 'All',
          name: 'Όλοι',
          address: '/Calculators/All',
          category: 'Υπολογιστές',
          content: _.reject( views.allList(), function (view: IViewDescription) { return view.category=='hidden'; })
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
          name: 'ΗΚΓ',
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

      $scope.setRelativeFilter = function(movement) {
        var selection = _.findIndex($scope.filters, function(filter) { return filter.address === $scope.location });
        selection += movement;
        if (selection >= 0 && selection < $scope.filters.length) {
          $location.path($scope.filters[selection].address);
        }
      };

      $scope.$watch('location', function() {
        $location.path($scope.location);
      });

      $scope.setAbsoluteFilter = function(filterName) {
        $scope.activeFilterIndex = _.findIndex($scope.filters, function(filter) { return filter.id === filterName });

        $scope.values = {};
        $scope.views = _.map($scope.filters[$scope.activeFilterIndex].content, function(viewDesc) {return viewDesc.factory($scope.values)});

        $scope.panelsList = $scope.views;
      };

      $scope.$on('$routeChangeSuccess', function(event, route) {
        $scope.setAbsoluteFilter(route.params.id);
        $scope.location = $location.path();
      });

      $scope.clearPanel = function(id) {
        var panel = _.find($scope.views, function(panel) {
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
    public static $inject = ['$scope', '$location', 'patient', 'views', 'patientViews', 'internalMedicineViews', 'pulmonologyViews', 'cardiologyViews', 'triplexViews'];
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
