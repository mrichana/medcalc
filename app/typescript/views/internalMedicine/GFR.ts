module CalculatorViews {
  'use strict';

  class GFR extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('GFR', 'GFR', 'Παθολογία', 'Παθολογία', GFR)))();

    id: string = 'GFR';
    name: string = 'GFR';
    category: string = 'Παθολογία';
    tags: string = 'Παθολογία renal';
    template: string = 'calculator.basic';
    defaultValues = {
      Plasma_Creatinine: 1.0,
      Age: 65,
      Weight: 70,
      Sex: 0
    };
    fields: IField[] = [
      {
        id: 'Plasma_Creatinine',
        name: 'Κρεατινίνη Πλάσματος',
        input: {
          type: 'number',
          step: 0.1,
          min: 0.1,
          max: 8
        }
      },
      ageField,
      weightField,
      sexField,
      resultField
    ];
    calculator(values) {
      var ret = new Result();
      if (values.Sex === 0) {
        values['GFR_Sex'] = 1;
      } else {
        values['GFR_Sex'] = 0.85;
      }

      ret.formula = '((140 - Age) * Weight * GFR_Sex ) / ( 72 * Plasma_Creatinine )';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));

      if (ret.result < 15) {
        ret.explanation = 'Νεφρική ανεπάρκεια';
        ret.resultlevel = 3;
      } else if (ret.result < 30) {
        ret.explanation = 'Νεφρική βλάβη με σοβαρή μείωση του GFR';
        ret.resultlevel = 3;
      } else if (ret.result < 60) {
        ret.explanation = 'Νεφρική βλάβη με μέτρια μείωση του GFR';
        ret.resultlevel = 2;
      } else if (ret.result < 90) {
        ret.explanation = 'Νεφρική βλάβη με ήπια μείωση του GFR';
        ret.resultlevel = 1;
      } else {
        ret.explanation = 'Φυσιολογική νεφρική λειτουργία';
        ret.resultlevel = 0;
      }
      return ret;
    };
  }
}
