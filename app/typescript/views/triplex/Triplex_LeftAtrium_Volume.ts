module CalculatorViews {
  'use strict';

  class Triplex_LeftAtrium_Volume extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('Triplex_LeftAtrium_Volume', 'Left Atrial Volume', 'Υπερηχοκαρδιογράφημα', 'Υπερηχοκαρδιογράφημα', Triplex_LeftAtrium_Volume)))();

    id: string = 'Triplex_LeftAtrium_Volume';
    name: string = 'Left Atrial Volume';
    category: string = 'Υπερηχοκαρδιογράφημα';
    tags: string = 'Υπερηχοκαρδιογράφημα';
    template: string = 'calculator.basic';
    defaultValues = {
      Triplex_LeftAtrium_Area4Ch: 15,
      Triplex_LeftAtrium_Area2Ch: 15,
      Triplex_LeftAtrium_Length: 40
    };
    fields: IField[] = [
      {
        id: 'Triplex_LeftAtrium_Area4Ch',
        name: 'A1(cm<sup>2</sup>)',
        description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 4 κοιλοτήτων',
        input: {
          type: 'number',
          step: 1,
          min: 5,
          max: 80
        }
      }, {
        id: 'Triplex_LeftAtrium_Area2Ch',
        name: 'A2(cm<sup>2</sup>)',
        description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 2 κοιλοτήτων',
        input: {
          type: 'number',
          step: 1,
          min: 5,
          max: 80
        }
      }, {
        id: 'Triplex_LeftAtrium_Length',
        name: 'L(mm)',
        description: 'Μήκος αριστερού κόλπου',
        input: {
          type: 'number',
          step: 1,
          min: 5,
          max: 80
        }
      }, resultField, {
        id: 'image',
        input: {
          type: 'image'
        },
        url: 'images/lav.png'
      }
    ];
    calculator(values) {
      var ret = new Result();
      ret.formula = '8 * Triplex_LeftAtrium_Area4Ch * Triplex_LeftAtrium_Area2Ch / ( 3 * pi * ( Triplex_LeftAtrium_Length / 10 ))';
      ret.result = View.roundNum(View.evaluator(values, ret.formula));
      ret.suffix = 'cm<sup>3</sup>'

      if (ret.result >= 73) {
        ret.explanation = 'Μεγάλη διάταση αριστερού κόλπου';
        ret.resultlevel = 3;
      } else if (ret.result >= 63) {
        ret.explanation = 'Μέτρια διάταση αριστερού κόλπου';
        ret.resultlevel = 2;
      } else if (ret.result >= 53) {
        ret.explanation = 'Μικρή διάταση αριστερού κόλπου';
        ret.resultlevel = 1;
      } else if (ret.result >= 22) {
        ret.explanation = 'Φυσιολογικές διάστασεις αριστερού κόλπου';
        ret.resultlevel = 0;
      } else {
        ret.explanation = 'Υπερβολικά χαμηλή τιμή - Πιθανό λάθος μετρήσεως';
        ret.resultlevel = 3;
      }

      return ret;
    };
  }
}
