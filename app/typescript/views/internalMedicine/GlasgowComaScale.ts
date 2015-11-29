module CalculatorViews {
  'use strict';

  class GlasgowComaScale extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('GlasgowComaScale', 'Κλίμακα Γλασκόβης', 'Παθολογία', 'Παθολογία', GlasgowComaScale)))();

    id: string = 'GlasgowComaScale';
    name: string = 'Κλίμακα Γλασκόβης';
    category: string = 'Παθολογία';
    tags: string = 'Παθολογία';
    template: string = 'calculator.basic';
    defaultValues = {
      GlasgowComaScale_Eyes: 4,
      GlasgowComaScale_Speech: 5,
      GlasgowComaScale_Mobility: 6
    };
    fields: IField[] = [
      {
        id: 'GlasgowComaScale_Eyes',
        name: 'Μάτια',
        input: {
          type: 'select',
          options: [{
            value: 1,
            name: 'Παραμένουν κλειστά'
          }, {
              value: 2,
              name: 'Ανοίγουν στον πόνο'
            }, {
              value: 3,
              name: 'Ανοίγουν στην εντολή'
            }, {
              value: 4,
              name: 'Ανοικτά'
            }]
        }
      }, {
        id: 'GlasgowComaScale_Speech',
        name: 'Ομιλία',
        input: {
          type: 'select',
          options: [{
            value: 1,
            name: 'Κανένας ήχος'
          }, {
              value: 2,
              name: 'Άναρθρες κραυγές'
            }, {
              value: 3,
              name: 'Ομιλία με ασάφεια'
            }, {
              value: 4,
              name: 'Αποπροσανατολισμένος'
            }, {
              value: 5,
              name: 'Φυσιολογική Επικοινωνία'
            }]
        }
      }, {
        id: 'GlasgowComaScale_Mobility',
        name: 'Κινητικότητα',
        input: {
          type: 'select',
          options: [{
            value: 1,
            name: 'Καμία κινητικότητα'
          }, {
              value: 2,
              name: 'Εκτείνει στον πόνο(απεγκεφαλισμός)'
            }, {
              value: 3,
              name: 'Κάμπτει στον πόνο (αποφλοίωση)'
            }, {
              value: 4,
              name: 'Αποσύρει στα επώδυνα ερεθίσματα'
            }, {
              value: 5,
              name: 'Εντοπίζει τα επώδυνα ερεθίσματα'
            }, {
              value: 6,
              name: 'Εκτελεί εντολές'
            }]
        }
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.result = values.GlasgowComaScale_Eyes * 1 +
      values.GlasgowComaScale_Speech * 1 +
      values.GlasgowComaScale_Mobility * 1;

      if (ret.result > 13) {
        ret.explanation = 'Καμμία ή Μικρή Βαθμού Εγκεφαλική Βλαβη';
        ret.resultlevel = 0;
      } else if (ret.result > 8) {
        ret.explanation = 'Μέτριου Βαθμού Εγκεφαλική Βλάβη';
        ret.resultlevel = 2;
      } else if (ret.result > 0) {
        ret.explanation = 'Σοβαρού Βαθμού Εγκεφαλική Βλάβη (Διασωλήνωση)';
        ret.resultlevel = 3;
      } else {
        ret.explanation = '';
      }


      return ret;
    };
  }
}
