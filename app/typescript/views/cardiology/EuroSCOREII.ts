module CalculatorViews {
  'use strict';

  class EuroSCOREII extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('EuroSCOREII', 'EuroSCORE II', 'Καρδιολογία', 'Καρδιολογία', EuroSCOREII)))();

    id: string = 'EuroSCOREII';
    name: string = 'EuroSCORE II';
    category: string = 'Καρδιολογία';
    tags: string = 'Καρδιολογία';
    template: string = 'calculator.basic';
    defaultValues = {
      Age: 65,
      Sex: 0,
      GFR: 73,
      HistoryOf_VascularDisease: false,
      HistoryOf_PoorMobility: false,
      HistoryOf_CardiacSurgery: false,
      HistoryOf_PulmonaryDisease: false,
      EuroSCORE_ActiveEndocarditis: false,
      EuroSCORE_CriticalState: false,
      HistoryOf_Diabetes: false,
      NYHAClass: 'I',
      AnginaAtRest: false,
      LVEF: 60,
      EuroSCORE_MIinTheLast90Days: false,
      PASP: 40,
      EuroSCOREII_Emergency: 0,
      EuroSCOREII_OperationWeight: 0,
      EuroSCORE_ThoracicAorta: false
    };
    fields: IField[] = [
      ageField,
      sexField, {
        id: 'GFR',
        name: 'GFR',
        calculator: 'GFR',
        input: {
          type: 'number',
          step: 0.1,
          min: 0,
          max: 250
        }
      }, {
        id: 'HistoryOf_VascularDisease',
        name: 'Εξωκαρδιακή Αρτηριοπάθεια',
        input: {
          type: 'check'
        }
      }, {
        id: 'HistoryOf_PoorMobility',
        name: 'Σοβαρά Μειωμένη Κινητικότητα',
        input: {
          type: 'check'
        }
      }, {
        id: 'HistoryOf_CardiacSurgery',
        name: 'Προηγηθήσα Καρδιοχειρουργική Επέμβαση',
        input: {
          type: 'check'
        }
      }, {
        id: 'HistoryOf_PulmonaryDisease',
        name: 'Χ.Α.Π.',
        input: {
          type: 'check'
        }
      }, {
        id: 'EuroSCORE_ActiveEndocarditis',
        name: 'Ενεργή Ενδοκαρδίτιδα',
        input: {
          type: 'check'
        }
      }, {
        id: 'EuroSCORE_CriticalState',
        name: 'Κρίσιμη Προεγχειρητική Κατάσταση',
        input: {
          type: 'check'
        }
      }, {
        id: 'HistoryOf_Diabetes',
        name: 'Σακχαρώδης Διαβήτης ύπο ινσουλίνη',
        input: {
          type: 'check'
        }
      }, {
        id: 'NYHAClass',
        name: 'NYHA Class',
        input: {
          type: 'select',
          options: [{
            value: 'I',
            name: 'Class I',
            description: 'Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα'
          }, {
              value: 'II',
              name: 'Class II',
              description: 'Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα'
            }, {
              value: 'III',
              name: 'Class III',
              description: 'Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση'
            }, {
              value: 'IV',
              name: 'Class IV',
              description: 'Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση'
            }]
        }
      }, {
        id: 'AnginaAtRest',
        name: 'Στηθάγχη Ηρεμίας',
        input: {
          type: 'check'
        }
      }, {
        id: 'LVEF',
        name: 'Λειτουργικότητα Αρ. Κοιλίας',
        input: {
          type: 'number',
          step: 5,
          min: 10,
          max: 70
        }
      }, {
        id: 'EuroSCORE_MIinTheLast90Days',
        name: 'Πρόσφατο Έμφραγμα Μυοκαρδίου (90 ημερών)',
        input: {
          type: 'check'
        }
      }, {
        id: 'PASP',
        name: 'Πίεση Πνευμονικής Αρτηρίας (mmHg)',
        input: {
          type: 'number',
          step: 5,
          min: 10,
          max: 140
        }
      }, {
        id: 'EuroSCOREII_Emergency',
        name: 'Επείγουσα Επέμβαση',
        input: {
          type: 'select',
          options: [{
            name: 'Προγραμματισμένη',
            value: 0
          }, {
              name: 'Επείγουσα',
              value: 1
            }, {
              name: 'Κατεπείγουσα',
              value: 2
            }, {
              name: 'Διάσωσης',
              value: 3
            }]
        }
      }, {
        id: 'EuroSCOREII_OperationWeight',
        name: 'Βαρύτητα Επέμβασης',
        input: {
          type: 'select',
          options: [{
            name: 'Απλή αορτοστεφανιαία παράκαμψη',
            value: 0
          }, {
              name: 'Απλή μη αορτοστεφανιαία παράκαμψη',
              value: 1
            }, {
              name: 'Διπλή Επέμβαση',
              value: 2
            }, {
              name: 'Τριπλή Επέμβαση',
              value: 3
            }]
        }
      }, {
        id: 'EuroSCORE_ThoracicAorta',
        name: 'Επέμβαση Θωρακικής Αορτής',
        input: {
          type: 'check'
        }
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();

      var value = -5.324537;
      value += (0.0285181 * (values.Age < 60 ? 1 : values.Age - 59));
      value += (values.Sex * 0.2196434);

      value += (values.GFR == 0 ? 0.6421508 : (values.GFR < 50 ? 0.8592256 : (values.GFR < 85 ? 0.30355 : 0)));
      value += (values.HistoryOf_VascularDisease * 0.5360268);
      value += (values.HistoryOf_PoorMobility * 0.2407181);
      value += (values.HistoryOf_CardiacSurgery * 1.118599);
      value += (values.HistoryOf_PulmonaryDisease * 0.1886564);
      value += (values.EuroSCORE_ActiveEndocarditis * 0.6194522);
      value += (values.EuroSCORE_CriticalState * 1.086517);
      value += (values.HistoryOf_Diabetes * 0.3542749);
      value += (values.NYHAClass == 'I' ? 0 : (values.NYHAClass == 'II' ? 0.1070545 : (values.NYHAClass == 'III' ? 0.2958358 : 0.5597929)));
      value += (values.AnginaAtRest * 0.2226147);
      value += (values.LVEF < 20 ? 0.9346919 : (values.LVEF < 30 ? 0.8084096 : (values.LVEF < 50 ? 0.3150652 : 0)));
      value += (values.EuroSCORE_MIinTheLast90Days * 0.1528943);
      value += (values.PASP > 55 ? 0.3491475 : (values.PASP > 30 ? 0.1788899 : 0));
      value += (values.EuroSCOREII_Emergency == 3 ? 1.362947 : (values.EuroSCOREII_Emergency == 2 ? 0.7039121 : (values.EuroSCOREII_Emergency == 1 ? 0.3174673 : 0)));
      value += (values.EuroSCOREII_OperationWeight == 3 ? 0.9724533 : (values.EuroSCOREII_OperationWeight == 2 ? 0.5521478 : (values.EuroSCOREII_OperationWeight == 1 ? 0.0062118 : 0)));
      value += (values.EuroSCORE_ThoracicAorta * 0.6527205);

      ret.result = 100 * Math.exp(value) / (1 + Math.exp(value));
      ret.result = Math.round(ret.result * 100) / 100;

      if (ret.result > 8) {
        ret.explanation = 'Υψηλού Κινδύνου';
        ret.resultlevel = 3;
      } else if (ret.result > 4) {
        ret.explanation = 'Μετρίου Κινδύνου';
        ret.resultlevel = 2;
      } else {
        ret.explanation = 'Μικρού Κινδύνου';
        ret.resultlevel = 1;
      }

      ret.prefix = 'Υπολογιζόμενη Θνητότητα Χειρουργείου: ';
      ret.suffix = '%';


      return ret;
    };
  }
}
