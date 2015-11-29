module CalculatorViews {
  'use strict';

  class BSA extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('BSA', 'Επιφάνεια Σώματος (BSA)', 'Παθολογία', 'Παθολογία', BSA)))();

    id: string = 'BSA';
    name: string = 'Επιφάνεια Σώματος (BSA)';
    category: string = 'Παθολογία';
    tags: string = 'Παθολογία';
    template: string = 'calculator.basic';
    defaultValues = {
      Height: 170,
      Weight: 70
    };
    fields: IField[] = [
      heightField,
      weightField,
      resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = 'sqrt (( Height * Weight ) / 3600)';
      ret.result = View.roundNum(View.evaluator(values, ret.formula), 2);
      ret.resultlevel = 0;
      return ret;
    };
  }
}
