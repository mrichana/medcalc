module CalculatorViews {
  'use strict';

  class ECG_QTc extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('ECG_QTc', 'Διορθωμένο QT', 'ΗΚΓ', 'ΗΚΓ', ECG_QTc)))();

    id: string = 'ECG_QTc';
    name: string = 'Διορθωμένο QT';
    category: string = 'ΗΚΓ';
    tags: string = 'ΗΚΓ';
    template: string = 'calculator.basic';
    defaultValues = {
    HeartRate: 70,
    ECG_QT: 400
    };
    fields: IField[] = [
    {
        id: 'ECG_QT',
        name: 'Διάστημα QT(msec)',
        calculator: 'ECG_QT',
        input: {
            type: 'number',
            step: 10,
            min: 200,
            max: 1000
        }
    }, {
        id: 'HeartRate',
        name: 'Σφύξεις',
        input: {
            type: 'number',
            step: 1,
            min: 20,
            max: 280
        }
    },
    resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = 'ECG_QT / sqrt(60 / HeartRate)';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));

      if (ret.result >= 480) {
          ret.explanation = 'Έντονα παρατεταμένο QT';
          ret.resultlevel = 3;
      } else if (ret.result >= 460) {
          ret.explanation = 'Παρατεταμένο QT';
          ret.resultlevel = 2;
      } else if (ret.result >= 440) {
          ret.explanation = 'Μικρή παράταση QT';
          ret.resultlevel = 1;
      } else if (ret.result <= 330) {
          ret.explanation = 'Έντονη βράχυνση QT';
          ret.resultlevel = 3;
      } else if (ret.result <= 350) {
          ret.explanation = 'Βραχύ QT';
          ret.resultlevel = 2;
      } else if (ret.result <= 370) {
          ret.explanation = 'Μικρή βράχυνση QT';
          ret.resultlevel = 1;
      } else {
          ret.explanation = 'Φυσιολογικό QT';
          ret.resultlevel = 0;
      }
      return ret;
    };
  }
}
