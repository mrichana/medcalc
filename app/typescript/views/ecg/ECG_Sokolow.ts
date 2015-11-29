module CalculatorViews {
  'use strict';

  class ECG_Sokolow extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('ECG_Sokolow', 'Δείκτης Sokolow-Lyon', 'ΗΚΓ', 'ΗΚΓ hypertrophic cardiomyopathy', ECG_Sokolow)))();

    id: string = 'ECG_Sokolow';
    name: string = 'Δείκτης Sokolow-Lyon';
    category: string = 'ΗΚΓ';
    tags: string = 'ΗΚΓ υπερτροφική μυοκαρδιοπάθεια';
    template: string = 'calculator.basic';
    defaultValues = {
    ECG_V1S: 10,
    ECG_V5R: 10,
    ECG_V6R: 10,
    ECG_aVLR: 10
    };
    fields: IField[] = [
    {
        id: 'ECG_V1S',
        name: 'Κύμα S στην V1 (mV)',
        input: {
            type: 'number',
            step: 1,
            min: 1,
            max: 50
        }
    }, {
        id: 'ECG_V5R',
        name: 'Κύμα R στην V5 (mV)',
        input: {
            type: 'number',
            step: 1,
            min: 1,
            max: 50
        }
    }, {
        id: 'ECG_V6R',
        name: 'Κύμα R στην V6 (mV)',
        input: {
            type: 'number',
            step: 1,
            min: 1,
            max: 50
        }
    }, {
        id: 'ECG_aVLR',
        name: 'Κύμα R στην aVL (mV)',
        input: {
            type: 'number',
            step: 1,
            min: 1,
            max: 50
        }
    },
        resultField
    ];
    calculator(values) {
      var ret = new Result();
      var hypertrophy = values.ECG_V1S + Math.max(values.ECG_V5R, values.ECG_V6R) >= 35 || values.ECG_aVLR >= 11;

      if (hypertrophy) {
          ret.result = 'Θετικός για υπερτροφία μυοκαρδίου';
          ret.explanation = 'Ειδικότητα 100%';
          ret.resultlevel = 3;
      } else {
          ret.result = 'Αρνητικός για υπερτροφία μυοκαρδίου';
          ret.explanation = 'Ευαισθησία 22%';
          ret.resultlevel = 0;
      }
      return ret;
    };
  }
}
