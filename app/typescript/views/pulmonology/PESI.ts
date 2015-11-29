module CalculatorViews {
  'use strict';

  class PESI extends View {
    static Ctor = (() => viewsCollection.add(new ViewDescription('PESI', 'Δείκτης σοβαρότητας Πνευμονικής Εμβολής (PESI)', 'Πνευμονολογία', 'Πνευμονολογία pe', PESI)))();

    id: string = 'PESI';
    name: string = 'Δείκτης σοβαρότητας Πνευμονικής Εμβολής (PESI)';
    category: string = 'Πνευμονολογία';
    tags: string = 'Πνευμονολογία pe';
    template: string = 'calculator.basic';
    defaultValues = {
      'Age': 65,
      'Sex': 0,
      'Cancer': false,
      'HistoryOf_CHF': false,
      'HistoryOf_PulmonaryDisease': false,
      'HeartRate': 70,
      'BloodPressure_Systolic': 120,
      'BreathRate': 16,
      'BodyTemperature': 36.6,
      'AltMentalStatus': false,
      'ArterialBlood_pO2': 100
    };
    fields: IField[] = [
      ageField, sexField,
      {
        id: 'Cancer',
        name: 'Ενεργός καρκίνος',
        input: {
          type: 'check'
        }
      },
      {
        id: 'HistoryOf_CHF',
        name: 'Συμφορητική Καρδιακή Ανεπάρκεια',
        input: {
          type: 'check'
        }
      },
      {
        id: 'HistoryOf_PulmonaryDisease',
        name: 'Χ.Α.Π.',
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
      }, bloodPressure_SystolicField,
      {
        id: 'BreathRate',
        name: 'Ρυθμός αναπνοής (bpm)',
        input: {
          type: 'number',
          step: 1,
          min: 1,
          max: 60
        }
      }, {
        id: 'BodyTemperature',
        name: 'Θερμοκρασία σώματος',
        input: {
          type: 'number',
          step: 0.1,
          min: 35,
          max: 43
        }
      }, {
        id: 'AltMentalStatus',
        name: 'Επηρεασμένη πνευματική κατάσταση',
        input: {
          type: 'check'
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
      },
      resultField
    ];
    calculator(values) {
      var ret = new Result();
      ret.result = 0;
      ret.result += values.Age;
      ret.result += (values.Sex) ? 0 : 10;
      ret.result += values.Cancer * 30;
      ret.result += values.HistoryOf_CHF * 10;
      ret.result += values.HistoryOf_PulmonaryDisease * 10;
      ret.result += (values.HeartRate >= 110) ? 20 : 0;
      ret.result += (values.BloodPressure_Systolic < 100) ? 30 : 0;
      ret.result += (values.BreathRate > 30) ? 20 : 0;
      ret.result += (values.BodyTemperature < 36) ? 20 : 0;
      ret.result += values.AltMentalStatus * 60;
      ret.result += (values.ArterialBlood_pO2 < 90) ? 20 : 0;

      if (ret.result > 125) {
        ret.explanation = "Class V Πολύ υψηλή θνησιμότητα (10-24.5%)";
        ret.resultlevel = 3;
      }
      else if (ret.result > 105) {
        ret.explanation = "Class IV Υψηλή θνησιμότητα (4-11.4%)";
        ret.resultlevel = 3;
      }
      else if (ret.result > 85) {
        ret.explanation = "Class III Μέτρια θνησιμότητα (3.2-7.1%)";
        ret.resultlevel = 2;
      }
      else if (ret.result > 65) {
        ret.explanation = "Class II Χαμηλή θνησιμότητα (1.7-3.5%)";
        ret.resultlevel = 1;
      }
      else {
        ret.explanation = "Class I Πολύ χαμηλή κλινική θνησιμότητα (0-1.6%)";
        ret.resultlevel = 0;
      };
      return ret;
    };
  }
}
