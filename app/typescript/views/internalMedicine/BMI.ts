module CalculatorViews {
  'use strict';

  class BMI extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('BMI', 'Δείκτης Μάζας Σώματος', 'Παθολογία', 'Παθολογία', BMI)))();

    id: string = 'BMI';
    name: string = 'Δείκτης Μάζας Σώματος';
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
      ret.formula = 'Weight / (Height/100) ^ 2';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));

      if (ret.result > 40) {
          ret.explanation = 'Νοσογόνος Παχυσαρκία';
          ret.resultlevel = 3;
      } else if (ret.result > 35) {
          ret.explanation = 'Παχύσαρκος';
          ret.resultlevel = 3;
      } else if (ret.result > 30) {
          ret.explanation = 'Ήπια Παχύσαρκος';
          ret.resultlevel = 2;
      } else if (ret.result > 25) {
          ret.explanation = 'Υπέρβαρος';
          ret.resultlevel = 1;
      } else if (ret.result > 18.5) {
          ret.explanation = 'Υγειές Βάρος';
          ret.resultlevel = 0;
      } else if (ret.result > 16) {
          ret.explanation = 'Ελιποβαρής';
          ret.resultlevel = 1;
      } else if (ret.result > 15) {
          ret.explanation = 'Έντονα Ελιποβαρής';
          ret.resultlevel = 3;
      } else {
          ret.explanation = 'Καχεκτικός';
          ret.resultlevel = 3;
      }
      return ret;
    };
  }
}
