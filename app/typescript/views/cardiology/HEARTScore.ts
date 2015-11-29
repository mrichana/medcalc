module CalculatorViews {
  'use strict';

  class HEARTScore extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('HEARTScore', 'HEART Score', 'Καρδιολογία', 'Καρδιολογία nstemi', HEARTScore)))();

    id: string = 'HEARTScore';
    name: string = 'HEART Score';
    category: string = 'Καρδιολογία';
    tags: string = 'Καρδιολογία nstemi';
    template: string = 'calculator.basic';
    defaultValues = {
      'HEARTScore_History': 0,
      'HEARTScore_ECG': 0,
      'Age': 65,

      'HistoryOf_Diabetes': false,
      'Smoker': false,
      'HistoryOf_Hypertension': false,
      'HistoryOf_Hyperlipidemia': false,
      'FamilyHistoryOf_CAD': false,
      'Obesity': false,

      'HEARTScore_Troponine': 0
    };
    fields: IField[] = [
      {
        id: 'HEARTScore_History',
        name: 'Ιστορικό',
        input: {
          type: 'select',
          options: [
            {
              value: 0,
              name: 'Μη ύποπτο'
            },
            {
              value: 1,
              name: 'Μέτρια ύποπτο'
            },
            {
              value: 2,
              name: 'Έντονα ύποπτο'
            }
          ]
        }
      }, {
        id: 'HEARTScore_ECG',
        name: 'ΗΚΓ',
        input: {
          type: 'select',
          options: [
            {
              value: 0,
              name: 'Φυσιολογικό'
            },
            {
              value: 1,
              name: 'Μη ειδικές διαταραχές επαναπολώσης'
            },
            {
              value: 2,
              name: 'Σημαντική κατάσπαση ST'
            }
          ]
        }
      },
      ageField,
      {
        id: 'HistoryOf_Diabetes',
        name: 'Σακχαρώδης Διαβήτης',
        input: {
          type: 'check'
        }
      }, {
        id: 'Smoker',
        name: 'Καπνιστής',
        input: {
          type: 'check'
        }
      }, {
        id: 'HistoryOf_Hypertension',
        name: 'Αρτηριακή Υπέρταση',
        input: {
          type: 'check'
        }
      }, {
        id: 'HistoryOf_Hyperlipidemia',
        name: 'Υπερλιπιδαιμία',
        input: {
          type: 'check'
        }
      }, {
        id: 'FamilyHistoryOf_CAD',
        name: 'Οικογενειακό ιστορικό (♂ < 55, ♀ < 65)',
        input: {
          type: 'check'
        }
      }, {
        id: 'Obesity',
        name: 'Παχυσαρκία',
        input: {
          type: 'check'
        }
      }, {
        id: 'HEARTScore_Troponine',
        name: 'Τροπονίνη κατά την είσοδο',
        input: {
          type: 'select',
          options: [
            {
              value: 0,
              name: '<= Φυσιολογικού Ορίου'
            },
            {
              value: 1,
              name: '1-3x Φυσιολογικού Ορίου'
            },
            {
              value: 2,
              name: '>3x Φυσιολογικού Ορίου'
            }
          ]
        }
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();

      ret.result = 0;
      ret.result += values.HEARTScore_History;
      ret.result += values.HEARTScore_ECG;

      ret.result += (values.Age >= 45) ? 1 : 0;
      ret.result += (values.Age >= 65) ? 1 : 0;

      var partialresult = 0;
      partialresult += (values.HistoryOf_Diabetes) ? 1 : 0;
      partialresult += (values.Smoker) ? 1 : 0;
      partialresult += (values.HistoryOf_Hypertension) ? 1 : 0;
      partialresult += (values.HistoryOf_Hyperlipidemia) ? 1 : 0;
      partialresult += (values.FamilyHistoryOf_CAD) ? 1 : 0;
      partialresult += (values.Obesity) ? 1 : 0;

      ret.result += (partialresult >= 1) ? 1 : 0;
      ret.result += (partialresult >= 3) ? 1 : 0;

      ret.result += values.HEARTScore_Troponine;

      switch (ret.result) {
        case 0:
        case 1:
        case 2:
        case 3:
          ret.explanation = '0.9-1.7%';
          ret.resultlevel = 0;
          break;
        case 4:
        case 5:
        case 6:
        case 7:
          ret.explanation = '12-16.6%';
          ret.resultlevel = 1;
          break;
        case 8:
        case 9:
        case 10:
          ret.explanation = '50-65%';
          ret.resultlevel = 2;
          break;
      };

      ret.explanation = 'Πιθανότητα καρδιαγγειακού συμβαμάτος σε 6 εβδομάδες: ' + ret.explanation;

      return ret;
    };
  }
}
