module CalculatorViews {
  'use strict';

  class Triplex_AorticValve_VelocityRatio_VTI extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_AorticValve_VelocityRatio_VTI', 'Aortic Valve Velocity Ratio (VTI)', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα AoV Stenosis', Triplex_AorticValve_VelocityRatio_VTI)))();

    id: string = 'Triplex_AorticValve_VelocityRatio_VTI';
    name: string = 'Aortic Valve Velocity Ratio (VTI)';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα AoV Stenosis';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_LVOT_VTI: 25,
      Triplex_AorticValve_VTI: 25
    };
    fields: IField[] = [
      {
        id: 'Triplex_LVOT_VTI',
        name: 'LVOT VTI<sub>1</sub> (m)',
        description: 'Υποβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου',
        input: {
          type: 'number',
          step: 1,
          min: 10,
          max: 100
        }
      }, {
        id: 'Triplex_AorticValve_VTI',
        name: 'AV VΤΙ<sub>2</sub> (m)',
        description: 'Διαβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου',
        input: {
          type: 'number',
          step: 1,
          min: 10,
          max: 400
        }
      },
      resultField,
      {
        id: 'image',
        input: {
          type: 'image'
        },
        url: 'images/AVVR.png'
      }
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = 'Triplex_LVOT_VTI / Triplex_AorticValve_VTI';
      ret.result = View.roundNum(View.evaluator(values, ret.formula), 2);

      if (ret.result < 0.25) {
        ret.explanation = 'Σοβαρή στένωση αορτικής βαλβίδας';
        ret.resultlevel = 3;
      } else if (ret.result <= 0.50) {
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
