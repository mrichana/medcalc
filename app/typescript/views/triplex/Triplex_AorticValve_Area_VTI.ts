module CalculatorViews {
  'use strict';

  class Triplex_AorticValve_Area_VTI extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_AorticValve_Area_VTI', 'Aortic Valve Area (VTI)', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα AoV Stenosis', Triplex_AorticValve_Area_VTI)))();

    id: string = 'Triplex_AorticValve_Area_VTI';
    name: string = 'Aortic Valve Area (VTI)';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα AoV Stenosis';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_LVOT_Diameter: 20,
      Triplex_LVOT_VTI: 20,
      Triplex_AorticValve_VTI: 40
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
        id: 'Triplex_AorticValve_VTI',
        name: 'AV VTI<sub>2</sub> (cm)',
        description: 'Διαβαλβιδικό Ολοκλήρωμα',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 100
        }
      }, resultField, {
        id: 'image',
        input: {
          type: 'image'
        },
        url: 'images/AVVR.png'
      }
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = '(pi * ((Triplex_LVOT_Diameter / 10) / 2) ^ 2) * Triplex_LVOT_VTI / Triplex_AorticValve_VTI';
      ret.result = View.roundNum(View.evaluator(values, ret.formula), 2);
      ret.suffix = 'cm<sup>2</sup>'

      if (ret.result < 1.0) {
        ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
        ret.resultlevel = 3;
      } else if (ret.result <= 1.50) {
        ret.explanation = 'Μέτρια στένωση αορτικής βαλβίδας';
        ret.resultlevel = 2;
      } else {
        ret.explanation = 'Μικρή στένωση/Σκλήρυνση αορτικής βαλβίδας';
        ret.resultlevel = 0;
      }
      return ret;
    };
  }
}
