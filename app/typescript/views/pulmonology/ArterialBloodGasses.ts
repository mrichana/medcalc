module CalculatorViews {
  'use strict';

  class ArterialBloodGasses extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('ArterialBloodGasses', 'Αέρια Αίματος', 'Πνευμονολογία', 'Πνευμονολογία pe', ArterialBloodGasses)))();

    id: string = 'ArterialBloodGasses';
    name: string = 'Αέρια Αίματος';
    category: string = 'Πνευμονολογία';
    tags: string = 'Πνευμονολογία pe';
    template: string = 'calculator.basic';
    defaultValues = {
      'ArterialBlood_pH': 7.40,
      'ArterialBlood_pO2': 100,
      'ArterialBlood_pCO2': 40,
      'ArterialBlood_H2CO3': 24,
      'ArterialBlood_FiO2': 0.21
    };
    fields: IField[] = [
      {
        id: 'ArterialBlood_pH',
        name: 'pH',
        input: {
          type: 'number',
          step: 0.01,
          min: 6,
          max: 8
        }
      }, {
        id: 'ArterialBlood_pO2',
        name: 'pO<sub>2</sub>(mmHg)',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 200
        }
      }, {
        id: 'ArterialBlood_pCO2',
        name: 'pCO<sub>2</sub>(mmHg)',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 100
        }
      }, {
        id: 'ArterialBlood_H2CO3',
        name: 'H<sub>2</sub>CO<sub>3</sub>(mEq/L)',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 100
        }
      }, {
        id: 'ArterialBlood_FiO2',
        name: 'FiO2(%)',
        input: {
          type: 'select',
          options: [{
            value: 0.21,
            name: '21% (Ατμοσφαιρικός Αέρας)'
          }, {
              value: 0.24,
              name: '24% (Ρινικό 1lt ή Ventouri 24%)'
            }, {
              value: 0.28,
              name: '28% (Ρινικό 2lt ή Ventouri 28%)'
            }, {
              value: 0.31,
              name: '31% (Ventouri 31%)'
            }, {
              value: 0.35,
              name: '35% (Ventouri 35%)'
            }, {
              value: 0.40,
              name: '40% (Ventouri 40%)'
            }, {
              value: 0.50,
              name: '50% (Ventouri 50%)'
            }, {
              value: 0.60,
              name: '60% (Ventouri 60%)'
            }]
        }
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();

      var expectedPco2, phHigh, phLow, hco3High, hco3Low;
      //  Primary Metabolic Disorders

      if ((values['ArterialBlood_pH'] < 7.36) && (values['ArterialBlood_pCO2'] <= 40)) {
        ret.result = 'Πρωτοπαθής μεταβολική οξέωση';
        expectedPco2 = 1.5 * values['ArterialBlood_H2CO3'] + 8;
      }

      if ((values['ArterialBlood_pH'] > 7.44) && (values['ArterialBlood_pCO2'] >= 40)) {
        ret.result = 'Πρωτοπαθής μεταβολική αλκάλωση';
        expectedPco2 = 0.7 * values['ArterialBlood_H2CO3'] + 21;
      }

      expectedPco2 = View.roundNum(expectedPco2, 0);

      if (values['ArterialBlood_pCO2'] > (expectedPco2 + 2)) {
        ret.result += ',\nμε αναπνευστική οξέωση';
        ret.resultlevel = 2;
      }
      if (values['ArterialBlood_pCO2'] < (expectedPco2 - 2)) {
        ret.result += ',\nμε αναπνευστική αλκάλωση';
        ret.resultlevel = 2;
      }
      if ((values['ArterialBlood_pCO2'] <= (expectedPco2 + 2)) && (values['ArterialBlood_pCO2'] >= (expectedPco2 - 2))) {
        ret.result += ',\nμε πλήρη αναπνευστική αντιρρόπηση';
        ret.resultlevel = 1;
      }

      //  Primary Respiratory Disorders
      if ((values['ArterialBlood_pH'] < 7.4) && (values['ArterialBlood_pCO2'] > 44)) {
        ret.result = 'Πρωτοπαθής αναπνευστική οξέωση';

        phHigh = 7.4 - (0.003 * (values['ArterialBlood_pCO2'] - 40));
        phLow = 7.4 - (0.008 * (values['ArterialBlood_pCO2'] - 40));
        hco3High = 24 + (0.35 * (values['ArterialBlood_pCO2'] - 40));
        hco3Low = 24 + (0.1 * (values['ArterialBlood_pCO2'] - 40));

        phLow = View.roundNum(phLow, 2);
        phHigh = View.roundNum(phHigh, 2);
        hco3Low = View.roundNum(hco3Low, 0);
        hco3High = View.roundNum(hco3High, 0);

        if (values['ArterialBlood_pH'] <= (phLow + 0.02)) {
          ret.result = 'Οξεία (μη αντιρροπούμενη) ' + ret.result;
          if (values['ArterialBlood_H2CO3'] < (hco3Low - 2)) {
            ret.result += ',\nμε μεταβολική οξέωση';
            ret.resultlevel = 3;
          }
        }

        if (values['ArterialBlood_pH'] >= (phHigh - 0.02001)) {
          ret.result = 'Χρόνια (αντιρροπούμενη) ' + ret.result;
          if (values['ArterialBlood_H2CO3'] > (hco3High + 2)) {
            ret.result += ',\nμε μεταβολική αλκάλωση';
            ret.resultlevel = 1;
          }
        }

        if ((values['ArterialBlood_pH'] > (phLow + 0.02)) && (values['ArterialBlood_pH'] < (phHigh - 0.02001))) {
          ret.result = '(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική οξέωση, ή\n(2) οξεία επί χρόνιας ' + ret.result + ', ή\n(3) μικτή οξεία αναπνευστική οξέωση με μικρή μεταβολική αλκάλωση';
          ret.resultlevel = 2;

        }
      }

      if ((values['ArterialBlood_pH'] > 7.4) && (values['ArterialBlood_pCO2'] < 36)) {
        ret.result = 'Πρωτοπαθής αναπνευστική αλκάλωση';
        phLow = 7.4 + (0.0017 * (40 - values.ArterialBlood_pCO2));
        phHigh = 7.4 + (0.008 * (40 - values.ArterialBlood_pCO2));
        hco3Low = 24 - (0.5 * (40 - values.ArterialBlood_pCO2));
        hco3High = 24 - (0.25 * (40 - values.ArterialBlood_pCO2));

        phLow = View.roundNum(phLow, 2);
        phHigh = View.roundNum(phHigh, 2);
        hco3Low = View.roundNum(hco3Low, 0);
        hco3High = View.roundNum(hco3High, 0);

        if (values['ArterialBlood_pH'] <= (phLow + 0.02)) {
          ret.result = 'Χρόνια (αντιρροπούμενη) ' + ret.result;
          if (values['ArterialBlood_H2CO3'] < (hco3Low - 2)) {
            ret.result += ',\nμε μεταβολική οξέωση';
          }
          ret.resultlevel = 1;
        }

        if (values['ArterialBlood_pH'] >= (phHigh - 0.02)) {
          ret.result = 'Οξεία (μη αντιρροπούμενη) ' + ret.result;
          if (values['ArterialBlood_H2CO3'] > (hco3High + 2)) {
            ret.result += ',\nμε μεταβολική αλκάλωση';
          }
          ret.resultlevel = 3;
        }

        if ((values['ArterialBlood_pH'] > (phLow + 0.02)) && (values['ArterialBlood_pH'] < (phHigh - 0.02))) {
          ret.result = '(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική αλκάλωση, ή\n' +
          '(2) οξεία επί χρόνιας ' + ret.result + ', ή\n' +
          '(3) μικτή οξεία αναπνευστική αλκάλωση με μικρή μεταβολική οξέωση';
          ret.resultlevel = 2;
        }
      }

      //  Mixed Acid-Base Disorders
      if (!ret.result) {
        if ((values['ArterialBlood_pH'] >= 7.36) && (values['ArterialBlood_pH'] <= 7.44)) {
          if ((values['ArterialBlood_pCO2'] > 40) && (values['ArterialBlood_H2CO3'] > 26)) {
            ret.result = 'Μικτή αναπνευστική οξέωση - μεταβολική αλκάλωση';
            //expectedPco2 = 0.7 * values['ArterialBlood_H2CO3'] + 21;
            ret.resultlevel = 3;
          } else if ((values['ArterialBlood_pCO2'] < 40) && (values['ArterialBlood_H2CO3'] < 22)) {
            ret.result = 'Μικτή αναπνευστική αλκάλωση - μεταβολική οξέωση';
            //expectedPco2 = 1.5 * values['ArterialBlood_H2CO3'] + 8;
            ret.resultlevel = 3;
          } else {
            ret.result = 'Φυσιολογικά αέρια αίματος';
            ret.resultlevel = 0;
          }
        }
      }

      var Aa = View.roundNum(((values['ArterialBlood_FiO2'] * 713) - (values['ArterialBlood_pCO2'] / 0.8)) - values['ArterialBlood_pO2'], 0);
      if (Aa >= 10) {
        ret.explanation = 'Αυξημένο shunt<br />Εκτεταμένες Διαταραχές του V/Q<br />Διαταραχή στην Ανταλλαγή των Αερίων';
      } else if (Aa > 0) {
        ret.explanation = 'Υποαερισμός (Κεντρικής Αιτιολογίας, Νευρομυικός κτλ.)<br />Χαμηλή Συγκέντρωση Οξυγόνου (Υψόμετρο κτλ.)';
      }

      return ret;
    };
  }
}
