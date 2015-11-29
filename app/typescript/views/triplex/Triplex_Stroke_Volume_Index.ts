module CalculatorViews {
  'use strict';

  class Triplex_Stroke_Volume_Index extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_Stroke_Volume_Index', 'Stroke Volume Index (SVi)', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα', Triplex_Stroke_Volume_Index)))();

    id: string = 'Triplex_Stroke_Volume_Index';
    name: string = 'Stroke Volume Index (SVi)';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_LVOT_Diameter: 20,
      Triplex_LVOT_VTI: 20,
      BSA: 1.82
    };
    fields: IField[] = [
      {
        id: 'Triplex_LVOT_Diameter',
        name: 'Διάμετρος LVOT (mm)',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 50
        }
      }, {
        id: 'Triplex_LVOT_VTI',
        name: 'LVOT VTI<sub>1</sub> (cm)',
        description: 'Υποβαλβιδικό Ολοκλήρωμα',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 100
        }
      }, {
        id: 'BSA',
        name: 'BSA (m<sup>2</sup>)',
        calculator: 'BSA',
        input: {
          type: 'number',
          step: 0.1,
          min: 0.1,
          max: 3
        }
      }, resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = '( ( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI ) / BSA ';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));
      if (ret.result < 35) {
        ret.resultlevel = 3;
      } else {
        ret.resultlevel = 1;
      }
      return ret;
    };
  }
}
