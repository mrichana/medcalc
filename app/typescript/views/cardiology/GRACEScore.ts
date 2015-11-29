module CalculatorViews {
  'use strict';

  class GRACEScore extends View {
      static Ctor = (() => viewsCollection.add(new ViewDescription('GRACEScore', 'GRACE Score', 'Καρδιολογία', 'Καρδιολογία stemi nstemi', GRACEScore)))();

    id: string = 'GRACEScore';
    name: string = 'GRACE Score';
    category: string = 'Καρδιολογία';
    tags: string = 'Καρδιολογία stemi nstemi';
    template: string = 'calculator.basic';
    defaultValues = {
      GRACEScore_arrest: false,
      ACS_stmi: false,
      ACS_Troponine: false,
      Age: 60,
      HeartRate: 70,
      BloodPressure_Systolic: 120,
      Plasma_Creatinine: 1.0,
      KillipClass: 'I'
    };
    fields: IField[] = [
      {
        id: 'GRACEScore_arrest',
        name: 'Καρδιακή Ανακοπή',
        input: {
          type: 'check'
        }
      }, {
        id: 'ACS_stmi',
        name: 'ST Ανάσπαση ή Κατάσπαση',
        input: {
          type: 'check'
        }
      }, {
        id: 'ACS_Troponine',
        name: 'Παρουσία Καρδιοενζύμων',
        input: {
          type: 'check'
        }
      },
      ageField,
      {
        id: 'HeartRate',
        name: 'Καρδιακή Συχνότητα',
        input: {
          type: 'number',
          step: 1,
          min: 20,
          max: 280
        }
      },
      bloodPressure_SystolicField,
      {
        id: 'Plasma_Creatinine',
        name: 'Κρεατινίνη Πλάσματος',
        input: {
          type: 'number',
          step: 0.1,
          min: 0.1,
          max: 8.0
        }
      }, {
        id: 'KillipClass',
        name: 'Killip Class',
        calculator: 'KillipClassEval',
        input: {
          type: 'select',
          options: [{
            value: 'I',
            name: 'Class I',
            description: 'Απουσία κλινικών σημείων καρδιακής ανεπάρκειας'
          }, {
              value: 'II',
              name: 'Class II',
              description: 'Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικής Φλέβας'
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
      }, resultField
    ];
    calculator(values) {
      var ret = new Result();

      var GRACEScore_Age;
      if (0 <= values.Age && values.Age < 35) {
        GRACEScore_Age = 0;
      } else if (35 <= values.Age && values.Age < 45) {
        GRACEScore_Age = 0 + (values.Age - 35) * (1.8);
      } else if (45 <= values.Age && values.Age < 55) {
        GRACEScore_Age = 18 + (values.Age - 45) * (1.8);
      } else if (55 <= values.Age && values.Age < 65) {
        GRACEScore_Age = 36 + (values.Age - 55) * (1.8);
      } else if (65 <= values.Age && values.Age < 75) {
        GRACEScore_Age = 54 + (values.Age - 65) * (1.9);
      } else if (75 <= values.Age && values.Age < 85) {
        GRACEScore_Age = 73 + (values.Age - 75) * (1.8);
      } else if (85 <= values.Age && values.Age < 90) {
        GRACEScore_Age = 91 + (values.Age - 85) * (1.8);
      } else if (values.Age >= 90) {
        GRACEScore_Age = 100;
      }


      var GRACEScore_HeartRate;
      if (0 <= values.HeartRate && values.HeartRate < 70) {
        GRACEScore_HeartRate = 0;
      } else if (70 <= values.HeartRate && values.HeartRate < 80) {
        GRACEScore_HeartRate = 0 + (values.HeartRate - 70) * (0.3);
      } else if (80 <= values.HeartRate && values.HeartRate < 90) {
        GRACEScore_HeartRate = 3 + (values.HeartRate - 80) * (0.2);
      } else if (90 <= values.HeartRate && values.HeartRate < 100) {
        GRACEScore_HeartRate = 5 + (values.HeartRate - 90) * (0.3);
      } else if (100 <= values.HeartRate && values.HeartRate < 110) {
        GRACEScore_HeartRate = 8 + (values.HeartRate - 100) * (0.2);
      } else if (110 <= values.HeartRate && values.HeartRate < 150) {
        GRACEScore_HeartRate = 10 + (values.HeartRate - 110) * (0.3);
      } else if (150 <= values.HeartRate && values.HeartRate < 200) {
        GRACEScore_HeartRate = 22 + (values.HeartRate - 150) * (0.3);
      } else if (values.HeartRate >= 200) {
        GRACEScore_HeartRate = 34;
      }


      var GRACEScore_BloodPressure;
      if (0 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 80) {
        GRACEScore_BloodPressure = 40;
      } else if (80 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 100) {
        GRACEScore_BloodPressure = 40 - (values.BloodPressure_Systolic - 80) * (0.3);
      } else if (100 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 110) {
        GRACEScore_BloodPressure = 34 - (values.BloodPressure_Systolic - 100) * (0.3);
      } else if (110 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 120) {
        GRACEScore_BloodPressure = 31 - (values.BloodPressure_Systolic - 110) * (0.4);
      } else if (120 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 130) {
        GRACEScore_BloodPressure = 27 - (values.BloodPressure_Systolic - 120) * (0.3);
      } else if (130 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 140) {
        GRACEScore_BloodPressure = 24 - (values.BloodPressure_Systolic - 130) * (0.3);
      } else if (140 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 150) {
        GRACEScore_BloodPressure = 20 - (values.BloodPressure_Systolic - 140) * (0.4);
      } else if (150 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 160) {
        GRACEScore_BloodPressure = 17 - (values.BloodPressure_Systolic - 150) * (0.3);
      } else if (160 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 180) {
        GRACEScore_BloodPressure = 14 - (values.BloodPressure_Systolic - 160) * (0.3);
      } else if (180 <= values.BloodPressure_Systolic && values.BloodPressure_Systolic < 200) {
        GRACEScore_BloodPressure = 8 - (values.BloodPressure_Systolic - 180) * (0.4);
      } else if (values.BloodPressure_Systolic >= 200) {
        GRACEScore_BloodPressure = 0;
      }


      var GRACEScore_Creatinine;
      if (0.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.2) {
        GRACEScore_Creatinine = 0 + (values.Plasma_Creatinine - 0) * (1 / 0.2);
      } else if (0.2 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.4) {
        GRACEScore_Creatinine = 1 + (values.Plasma_Creatinine - 0.2) * (2 / 0.2);
      } else if (0.4 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.6) {
        GRACEScore_Creatinine = 3 + (values.Plasma_Creatinine - 0.4) * (1 / 0.2);
      } else if (0.6 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 0.8) {
        GRACEScore_Creatinine = 4 + (values.Plasma_Creatinine - 0.6) * (2 / 0.2);
      } else if (0.8 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.0) {
        GRACEScore_Creatinine = 6 + (values.Plasma_Creatinine - 0.8) * (1 / 0.2);
      } else if (1.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.2) {
        GRACEScore_Creatinine = 7 + (values.Plasma_Creatinine - 1.0) * (1 / 0.2);
      } else if (1.2 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.4) {
        GRACEScore_Creatinine = 8 + (values.Plasma_Creatinine - 1.2) * (2 / 0.2);
      } else if (1.4 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.6) {
        GRACEScore_Creatinine = 10 + (values.Plasma_Creatinine - 1.4) * (1 / 0.2);
      } else if (1.6 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 1.8) {
        GRACEScore_Creatinine = 11 + (values.Plasma_Creatinine - 1.6) * (2 / 0.2);
      } else if (1.8 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 2.0) {
        GRACEScore_Creatinine = 13 + (values.Plasma_Creatinine - 1.8) * (1 / 0.2);
      } else if (2.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 3.0) {
        GRACEScore_Creatinine = 14 + (values.Plasma_Creatinine - 2.0) * (7 / 1);
      } else if (3.0 <= values.Plasma_Creatinine && values.Plasma_Creatinine < 4.0) {
        GRACEScore_Creatinine = 21 + (values.Plasma_Creatinine - 3.0) * (7 / 1);
      } else if (values.Plasma_Creatinine >= 4.0) {
        GRACEScore_Creatinine = 28;
      }

      var GRACEScore_Killip;
      if (values.KillipClass === 'I') {
        GRACEScore_Killip = 0;
      } else if (values.KillipClass === 'II') {
        GRACEScore_Killip = 15;
      } else if (values.KillipClass === 'III') {
        GRACEScore_Killip = 29;
      } else if (values.KillipClass === 'IV') {
        GRACEScore_Killip = 44;
      }

      ret.result = View.roundNum(GRACEScore_Killip + GRACEScore_BloodPressure + GRACEScore_HeartRate + GRACEScore_Age + GRACEScore_Creatinine + 17 * values.ACS_stmi + 13 * values.ACS_Troponine + 30 * values.GRACEScore_arrest);

      if (ret.result > 140) {
        ret.explanation = 'Θνησιμότητα κατά την νοσηλεία >3%';
      } else
        if (ret.result > 108) {
          ret.explanation = 'Θνησιμότητα κατά την νοσηλεία 1-3%';
        } else {
          ret.explanation = 'Θνησιμότητα κατά την νοσηλεία <1%';
        }


      if (ret.result > 118) {
        ret.explanation += ', στους 6 μήνες >8%';
        ret.resultlevel = 3;
      } else
        if (ret.result > 88) {
          ret.explanation += ', στους 6 μήνες 3-8%';
          ret.resultlevel = 2;
        } else {
          ret.explanation += ', στους 6 μήνες <3%';
          ret.resultlevel = 0;
        }

      return ret;
    };
  }
}
