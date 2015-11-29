module CalculatorViews {
  'use strict';

  class ECG_Heart_Rate extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('ECG_Heart_Rate', 'Καρδιακή Συχνότητα', 'ΗΚΓ', 'ΗΚΓ af', ECG_Heart_Rate)))();

    id: string = 'ECG_Heart_Rate';
    name: string = 'Καρδιακή Συχνότητα';
    category: string = 'ΗΚΓ';
    tags: string = 'ΗΚΓ af';
    template: string = 'calculator.basic';
    defaultValues = {
    ECG_HRQRS2QRSmm: 21,
    ECG_Cycles: 1,
    ECG_PaperSpeed: 25
    };
    fields: IField[] = [
    {
        id: 'ECG_HRQRS2QRSmm',
        name: 'Απόσταση από QRS σε QRS(mm)',
        input: {
            type: 'number',
            step: 1,
            min: 5,
            max: 100
        }
    }, {
        id: 'ECG_Cycles',
        name: 'Αριθμός κύκλων',
        input: {
            type: 'number',
            step: 1,
            min: 1,
            max: 10
        }
    }, {
        id: 'ECG_PaperSpeed',
        name: 'Ταχύτητα χαρτιού (mm/sec)',
        input: {
            type: 'select',
            options: [
                {name:'25', value:25},
                {name:'50', value: 50}
            ]
        }
    },
        resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = '60*ECG_PaperSpeed/ECG_HRQRS2QRSmm/ECG_Cycles';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));
      ret.suffix = ' BPM';
      ret.resultlevel = 0;
      return ret;
    };
  }
}
