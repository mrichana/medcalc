module CalculatorViews {
  'use strict';

  class KillipClassEval extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('KillipClassEval', 'Killip Class', 'Καρδιολογία', 'Καρδιολογία stemi nstemi', KillipClassEval)))();

    id: string = 'KillipClassEval';
    name: string = 'Killip Class';
    category: string = 'Καρδιολογία';
    tags: string = 'Καρδιολογία stemi nstemi';
    template: string = 'calculator.basic';
    defaultValues = {
      KillipClass: 'I'
    };
    fields: IField[] = [
      {
        id: 'KillipClass',
        name: 'Killip Class',
        input: {
          type: 'select',
          options: [{
            value: 'I',
            name: 'Class I',
            description: 'Απουσία κλινικών σημείων καρδιακής ανεπάρκειας'
          }, {
              value: 'II',
              name: 'Class II',
              description: 'Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικών Φλεβών'
            }, {
              value: 'III',
              name: 'Class III',
              description: 'Οξύ Πνευμονικό Οίδημα'
            }, {
              value: 'IV',
              name: 'Class IV',
              description: 'Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)'
            }]
        }
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();

      var result = values.KillipClass;
      switch (result) {
        case 'I':
          ret.explanation = 'Απουσία κλινικών σημείων καρδιακής ανεπάρκειας';
          ret.resultlevel = 0;
          break;
        case 'II':
          ret.explanation = 'Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικών Φλεβών';
          ret.resultlevel = 1;
          break;
        case 'III':
          ret.explanation = 'Οξύ Πνευμονικό Οίδημα';
          ret.resultlevel = 2;
          break;
        case 'IV':
          ret.explanation = 'Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)';
          ret.resultlevel = 3;
          break;
      }

      ret.result = '';
      return ret;
    };
  }
}
