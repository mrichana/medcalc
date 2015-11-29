module CalculatorViews {
  'use strict';

  class GenevaScore extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('GenevaScore', 'Score της Γενέβης', 'Πνευμονολογία', 'Πνευμονολογία pe', GenevaScore)))();

    id: string = 'GenevaScore';
    name: string = 'Score της Γενέβης';
    category: string = 'Πνευμονολογία';
    tags: string = 'Πνευμονολογία pe';
    template: string = 'calculator.basic';
    defaultValues = {
      'HistoryOf_DVT': false,
      'HeartRate': 70,
      'HistoryOf_Immobilization': false,
      'Haemoptysis': false,
      'Cancer': false,
      'UnilateralLLimbPain': false,
      'UnilateralLLimbOedema': false,
      'Age': 65
    };
    fields: IField[] = [
      {
        id: 'HistoryOf_DVT',
        name: 'Ιστορικό PE ή DVT',
        input: {
          type: 'check'
        }
      }, {
        id: 'HeartRate',
        name: 'Σφύξεις κατά την εισαγωγή',
        input: {
          type: 'number',
          step: 1,
          min: 20,
          max: 280
        }
      }, {
        id: 'HistoryOf_Immobilization',
        name: 'Πρόσφατο χειρουργείο ή κάταγμα',
        input: {
          type: 'check'
        }
      }, {
        id: 'Haemoptysis',
        name: 'Αιμόπτυση',
        input: {
          type: 'check'
        }
      }, {
        id: 'Cancer',
        name: 'Ενεργός καρκίνος',
        input: {
          type: 'check'
        }
      }, {
        id: 'UnilateralLLimbPain',
        name: 'Μονόπλευρο άλγος κάτω άκρου',
        input: {
          type: 'check'
        }
      }, {
        id: 'UnilateralLLimbOedema',
        name: 'Άλγος στη ψηλάφηση και οίδημα κάτω άκρου ',
        input: {
          type: 'check'
        }
      },
      ageField,
      resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.result = 0;
      ret.result += values.HistoryOf_DVT*3;
      ret.result += (values.HeartRate>=75)?3:0;
      ret.result += (values.HeartRate>=95)?2:0;
      ret.result += values.HistoryOf_Immobilization*2;
      ret.result += values.Haemoptysis*2;
      ret.result += values.Cancer*2;
      ret.result += values.UnilateralLLimbPain*3;
      ret.result += values.UnilateralLLimbOedema*4;
      ret.result += (values.Age>65)?1:0;

      if (ret.result>=11) {
          ret.explanation="Υψηλή κλινική πιθανότητα";
          ret.resultlevel=3;
      }
      else if (ret.result>=4) {
          ret.explanation="Ενδιάμεση κλινική πιθανότητα";
          ret.resultlevel=2;
      }
      else {
          ret.explanation="Χαμηλή κλινική πιθανότητα";
          ret.resultlevel=0;
      };

      return ret;
    };
  }
}
