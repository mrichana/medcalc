module CalculatorViews {
  'use strict';

  class Triplex_Stroke_Volume extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_Stroke_Volume', 'Stroke Volume (SV)', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα', Triplex_Stroke_Volume)))();

    id: string = 'Triplex_Stroke_Volume';
    name: string = 'Stroke Volume (SV)';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_LVOT_Diameter: 20,
      Triplex_LVOT_VTI: 20,
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
      }, resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = '( pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));
      ret.suffix = 'cm<sup>3</sup>'

      if (ret.result < 60) {
        ret.resultlevel = 3;
      } else {
        ret.resultlevel = 1;
      }
      return ret;
    };
  }
}
