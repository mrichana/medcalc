module CalculatorViews {
  'use strict';

  class WellsScore extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('WellsScore', 'Κριτήρια του Wells', 'Πνευμονολογία', 'Πνευμονολογία pe', WellsScore)))();

    id: string = 'WellsScore';
    name: string = 'Κριτήρια του Wells';
    category: string = 'Πνευμονολογία';
    tags: string = 'Πνευμονολογία pe';
    template: string = 'calculator.basic';
    defaultValues = {
    'HistoryOf_DVT': false,
    'HeartRate': 70,
    'HistoryOf_Immobilization': false,
    'Haemoptysis': false,
    'Cancer': false,
    'DVT': false,
    'PEMostLikely': false
    };
    fields: IField[] = [
    {
        id: 'HistoryOf_DVT',
        name: 'Ιστορικό PE ή DVT',
        input: {
            type: 'check'
        }
    }, {
        id: 'HeartRate',
        name: 'Σφύξεις κατά την εισαγωγή',
        input: {
            type: 'number',
            step: 1,
            min: 20,
            max: 280
        }
    }, {
        id: 'HistoryOf_Immobilization',
        name: 'Ακινητοποίηση ή πρόσφατο χειρουργείο',
        input: {
            type: 'check'
        }
    }, {
        id: 'Haemoptysis',
        name: 'Αιμόπτυση',
        input: {
            type: 'check'
        }
    }, {
        id: 'Cancer',
        name: 'Ενεργός καρκίνος',
        input: {
            type: 'check'
        }
    }, {
        id: 'DVT',
        name: 'Κλινικά σημεία DVT',
        input: {
            type: 'check'
        }
    }, {
        id: 'PEMostLikely',
        name: 'Διάγνωση PE πιο πιθανή από εναλλακτικές',
        input: {
            type: 'check'
        }
    },
      resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.result = 0;
      ret.result += values.HistoryOf_DVT*1.5;
      ret.result += (values.HeartRate>100)?1.5:0;
      ret.result += values.HistoryOf_Immobilization*1.5;
      ret.result += values.Haemoptysis*1;
      ret.result += values.Cancer*1;
      ret.result += values.DVT*3;
      ret.result += values.PEMostLikely*3;

      if (ret.result>=7) {
          ret.explanation="Υψηλή κλινική πιθανότητα";
          ret.resultlevel=3;
      }
      else if (ret.result>=2) {
          ret.explanation="Ενδιάμεση κλινική πιθανότητα";
          ret.resultlevel=2;
      }
      else {
          ret.explanation="Χαμηλή κλινική πιθανότητα";
          ret.resultlevel=0;
      };

      return ret;
    };
  }
}
