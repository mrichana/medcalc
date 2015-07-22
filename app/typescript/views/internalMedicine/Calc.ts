module CalculatorViews {
  'use strict';

  class Calc extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Calc', 'Υπολογιστής', 'generic', Calc)))();

    id: string = 'Calc';
    name: string = 'Υπολογιστής';
    category: string = 'generic';
    template: string = 'calculator.basic';
    defaultValues = {
      Calculation: ''
    };
    fields: IField[] = [
      {
        id: 'Calculation',
        name: 'Υπολογισμός',
        value: '',
        input: {
          type: 'text'
        }
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();
      try {
        ret.formula = values.Calculation;
        ret.result = math.eval(ret.formula);
        ret.resultlevel = 0;
        if (!angular.isNumber(ret.result)) {
          throw 'nan';
        }
        if (!isFinite(ret.result)) {
          ret.result = 'Άπειρο';
          ret.resultlevel = 2;
        }
      } catch (err) {
        ret.result = 'Λάθος Υπολογισμός';
        ret.resultlevel = 3;
      }
      return ret;
    };
  }
}
