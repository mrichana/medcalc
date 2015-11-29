module CalculatorViews {
  'use strict';

  class Triplex_AorticValve_Regurgitation_VC extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_AorticValve_Regurgitation_VC', 'Aortic Valve Regurgitation (Vena Contracta)', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα AoV regurgitation', Triplex_AorticValve_Regurgitation_VC)))();

    id: string = 'Triplex_AorticValve_Regurgitation_VC';
    name: string = 'Aortic Valve Regurgitation (Vena Contracta)';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα AoV regurgitation';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_AorticValve_Regurgitation_VenaContracta_Width: 0.0,
    };
    fields: IField[] = [
      {
        id: 'Triplex_AorticValve_Regurgitation_VenaContracta_Width',
        name: 'Vena Contracta Width (cm)',
        input: {
          type: 'number',
          step: 0.1,
          min: 0.0,
          max: 1.5
        }
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();

      ret.result = values.Triplex_AorticValve_Regurgitation_VenaContracta_Width;
      if (values.Triplex_AorticValve_Regurgitation_VenaContracta_Width > 0.6) {
        ret.explanation = 'Σοβαρή Ανεπάρκεια';
        ret.resultlevel = 3;
      } else if (values.Triplex_AorticValve_Regurgitation_VenaContracta_Width > 0.3) {
        ret.explanation = 'Μέτρια Ανεπάρκεια';
        ret.resultlevel = 2;
      } else {
        ret.explanation = 'Μικρή Ανεπάρκεια';
        ret.resultlevel = 1;
      }
      return ret;
    };
  }


  class Triplex_AorticValve_Regurgitation_PHT extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_AorticValve_Regurgitation_PHT', 'Aortic Valve Regurgitation (PHT)', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα AoV regurgitation', Triplex_AorticValve_Regurgitation_PHT)))();

    id: string = 'Triplex_AorticValve_Regurgitation_PHT';
    name: string = 'Aortic Valve Regurgitation (PHT)';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα AoV regurgitation';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_AorticValve_Regurgitation_PHT: 550
    };
    fields: IField[] = [
      {

        id: 'Triplex_AorticValve_Regurgitation_PHT',
        name: 'Pressure Half Time (ms)',
        input: {
          type: 'number',
          step: 10,
          min: 10,
          max: 1000
        }
      }, resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.result = values.Triplex_AorticValve_Regurgitation_PHT;
      if (values.Triplex_AorticValve_Regurgitation_PHT < 200) {
        ret.explanation = 'Σοβαρή Ανεπάρκεια';
        ret.resultlevel = 3;
      } else if (values.Triplex_AorticValve_Regurgitation_PHT < 500) {
        ret.explanation = 'Μέτρια Ανεπάρκεια';
        ret.resultlevel = 2;
      } else {
        ret.explanation = 'Μικρή Ανεπάρκεια';
        ret.resultlevel = 1;
      }
      return ret;
    };
  }
}
