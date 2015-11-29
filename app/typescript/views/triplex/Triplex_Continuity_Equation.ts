module CalculatorViews {
  'use strict';

  class Triplex_Continuity_Equation extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_Continuity_Equation', 'Εξίσωση Συνεχείας', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα', Triplex_Continuity_Equation)))();

    id: string = 'Triplex_Continuity_Equation';
    name: string = 'Εξίσωση Συνεχείας';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_Continuity_Equation_A1_Diameter: 20,
      Triplex_Continuity_Equation_VTI1: 20,
      Triplex_Continuity_Equation_VTI2: 40
    };
    fields: IField[] = [
      {
        id: 'Triplex_Continuity_Equation_A1_Diameter',
        name: 'Διάμετρος A<sub>1</sub> (mm)',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 50
        }
      }, {
        id: 'Triplex_Continuity_Equation_VTI1',
        name: 'VTI<sub>1</sub> (cm)',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 100
        }
      }, {
        id: 'Triplex_Continuity_Equation_VTI2',
        name: 'VTI<sub>2</sub> (cm)',
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
        url: 'images/VR.png'
      }
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = '(pi * ((Triplex_Continuity_Equation_A1_Diameter / 10) / 2) ^ 2) * Triplex_Continuity_Equation_VTI1 / Triplex_Continuity_Equation_VTI2';
      ret.result = View.roundNum(View.evaluator(values, ret.formula), 2);
      ret.suffix = 'cm<sup>2</sup>'
      return ret;
    };
  }
}
