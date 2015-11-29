module CalculatorViews {
  'use strict';

  class Triplex_Modified_Bernoulli_Equation extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_Modified_Bernoulli_Equation', 'Τροποποιημένη Εξίσωση Bernoulli', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα', Triplex_Modified_Bernoulli_Equation)))();

    id: string = 'Triplex_Modified_Bernoulli_Equation';
    name: string = 'Τροποποιημένη Εξίσωση Bernoulli';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_Modified_Bernoulli_Equation_V1: 0,
      Triplex_Modified_Bernoulli_Equation_V2: 2
    };
    fields: IField[] = [
      {
        id: 'Triplex_Modified_Bernoulli_Equation_V1',
        name: 'V<sub>1</sub> (m/sec)',
        input: {
          type: 'number',
          step: 0.01,
          min: 0,
          max: 10
        }
      }, {
        id: 'Triplex_Modified_Bernoulli_Equation_V2',
        name: 'V<sub>2</sub> (m/sec)',
        input: {
          type: 'number',
          step: 0.01,
          min: 0,
          max: 10
        }
      }, resultField, {
        id: 'image',
        input: {
          type: 'image'
        },
        url: 'images/bernoulli.png'
      }
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = '4 * ((Triplex_Modified_Bernoulli_Equation_V2 ^ 2) - (Triplex_Modified_Bernoulli_Equation_V1 ^ 2))';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));
      ret.suffix = 'mmHg'
      return ret;
    };
  }
}
