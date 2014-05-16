/*global angular: true */
/*global _: true */

(function () {
  'use strict';

  /* Services */

  /**
   * medical.calculators Module
   *
   * Description
   */
  angular.module('medical.calculators').
    factory('basicCalculators', function (mathParser, roundNum, evaluator) {
      return {
        abg: function (values) {
          var expectedPco2, phHigh, phLow, hco3High, hco3Low;
          var result = "",
            explanation = "",
            resultlevel;

          //  Primary Metabolic Disorders
          if ((values.pH < 7.36) && (values.pCO2 <= 40)) {
            result = "Πρωτοπαθής μεταβολική οξέωση";
            expectedPco2 = 1.5 * values.H2CO3 + 8;
          }

          if ((values.pH > 7.44) && (values.pCO2 >= 40)) {
            result = "Πρωτοπαθής μεταβολική αλκάλωση";
            expectedPco2 = 0.7 * values.H2CO3 + 21;
          }

          expectedPco2 = roundNum(expectedPco2, 0);

          if (values.pCO2 > (expectedPco2 + 2)) {
            result += ",\nμε αναπνευστική οξέωση";
            resultlevel = 2;
          }
          if (values.pCO2 < (expectedPco2 - 2)) {
            result += ",\nμε αναπνευστική αλκάλωση";
            resultlevel = 2;
          }
          if ((values.pCO2 <= (expectedPco2 + 2)) && (values.pCO2 >= (expectedPco2 - 2))) {
            result += ",\nμε πλήρη αναπνευστική αντιρρόπηση";
            resultlevel = 1;
          }

          //  Primary Respiratory Disorders
          if ((values.pH < 7.4) && (values.pCO2 > 44)) {
            result = "Πρωτοπαθής αναπνευστική οξέωση";

            phHigh = 7.4 - (0.003 * (values.pCO2 - 40));
            phLow = 7.4 - (0.008 * (values.pCO2 - 40));
            hco3High = 24 + (0.35 * (values.pCO2 - 40));
            hco3Low = 24 + (0.1 * (values.pCO2 - 40));

            phLow = roundNum(phLow, 2);
            phHigh = roundNum(phHigh, 2);
            hco3Low = roundNum(hco3Low, 0);
            hco3High = roundNum(hco3High, 0);

            if (values.pH <= (phLow + 0.02)) {
              result = "Οξεία (μη αντιρροπούμενη) " + result;
              if (values.H2CO3 < (hco3Low - 2)) {
                result += ",\nμε μεταβολική οξέωση";
                resultlevel = 3;
              }
            }

            if (values.pH >= (phHigh - 0.02001)) {
              result = "Χρόνια (αντιρροπούμενη) " + result;
              if (values.H2CO3 > (hco3High + 2)) {
                result += ",\nμε μεταβολική αλκάλωση";
                resultlevel = 1;
              }
            }

            if ((values.pH > (phLow + 0.02)) && (values.pH < (phHigh - 0.02001))) {
              result = "(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική οξέωση, ή\n" +
                "(2) οξέια επί χρόνιας " + result + ", ή\n" +
                "(3) μικτή οξεία αναπνευστική οξέωση με μικρή μεταβολική αλκάλωση";
              resultlevel = 2;

            }
          }

          if ((values.pH > 7.4) && (values.pCO2 < 36)) {
            result = "Πρωτοπαθής αναπνευστική αλκάλωση";
            phLow = 7.4 + (0.0017 * (40 - values.pCO2));
            phHigh = 7.4 + (0.008 * (40 - values.pCO2));
            hco3Low = 24 - (0.5 * (40 - values.pCO2));
            hco3High = 24 - (0.25 * (40 - values.pCO2));

            phLow = roundNum(phLow, 2);
            phHigh = roundNum(phHigh, 2);
            hco3Low = roundNum(hco3Low, 0);
            hco3High = roundNum(hco3High, 0);

            if (values.pH <= (phLow + 0.02)) {
              result = "Χρόνια (αντιρροπούμενη) " + result;
              if (values.H2CO3 < (hco3Low - 2)) {
                result += ",\nμε μεταβολική οξέωση";
              }
              resultlevel = 1;
            }

            if (values.pH >= (phHigh - 0.02)) {
              result = "Οξεία (μη αντιρροπούμενη) " + result;
              if (values.H2CO3 > (hco3High + 2)) {
                result += ",\nμε μεταβολική αλκάλωση";
              }
              resultlevel = 3;
            }

            if ((values.pH > (phLow + 0.02)) && (values.pH < (phHigh - 0.02))) {
              result = "(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική αλκάλωση, ή\n" +
                "(2) οξεία επί χρόνιας " + result + ", ή\n" +
                "(3) μικτή οξεία αναπνευστική αλκάλωση με μικρή μεταβολική οξέωση";
              resultlevel = 2;
            }
          }

          //  Mixed Acid-Base Disorders
          if ((result === "") || (result === null)) {
            if ((values.pH >= 7.36) && (values.pH <= 7.44)) {
              if ((values.pCO2 > 40) && (values.H2CO3 > 26)) {
                result = "Μικτή αναπνευστική οξέωση - μεταβολική αλκάλωση";
                //expectedPco2 = 0.7 * values.H2CO3 + 21;
                resultlevel = 3;
              } else if ((values.pCO2 < 40) && (values.H2CO3 < 22)) {
                result = "Μικτή αναπνευστική αλκάλωση - μεταβολική οξέωση";
                //expectedPco2 = 1.5 * values.H2CO3 + 8;
                resultlevel = 3;
              } else {
                result = "Φυσιολογικά αέρια αίματος";
                resultlevel = 0;
              }
            }
          }

          var Aa = roundNum(((values.FiO2 * 713) - (values.pCO2 / 0.8)) - values.pO2, 0);
          if (Aa >= 10) {
            explanation = "Αυξημένο shunt<br />Εκτεταμένες Διαταραχές του V/Q<br />Διαταραχή στην Ανταλλαγή των Αερίων";
          } else if (Aa > 0) {
            explanation = "Υποαερισμός (Κεντρικής Αιτιολογίας, Νευρομυικός κτλ.)<br />Χαμηλή Συγκέντρωση Οξυγόνου (Υψόμετρο κτλ.)";
          }

          return {
            result: result,
            explanation: explanation,
            resultlevel: resultlevel
          };
        },
        bmi: function (values) {
          var ret = {};
          ret.formula = 'weight / (height/100) ^ 2';
          ret.result = roundNum(evaluator(values, ret.formula));

          if (ret.result > 40) {
            ret.explanation = "Νοσογόνος Παχυσαρκία";
            ret.resultlevel = 3;
          } else if (ret.result > 35) {
            ret.explanation = "Παχύσαρκος";
            ret.resultlevel = 3;
          } else if (ret.result > 30) {
            ret.explanation = "Ήπια Παχύσαρκος";
            ret.resultlevel = 2;
          } else if (ret.result > 25) {
            ret.explanation = "Υπέρβαρος";
            ret.resultlevel = 1;
          } else if (ret.result > 18.5) {
            ret.explanation = "Υγειές Βάρος";
            ret.resultlevel = 0;
          } else if (ret.result > 16) {
            ret.explanation = "Ελιποβαρής";
            ret.resultlevel = 1;
          } else if (ret.result > 15) {
            ret.explanation = "Έντονα Ελιποβαρής";
            ret.resultlevel = 3;
          } else {
            ret.explanation = "Καχεκτικός";
            ret.resultlevel = 3;
          }
          return ret;
        },
        bsa: function (values) {
          var ret={};
          ret.formula = 'sqrt (( height * weight ) / 3600)';
          ret.result = roundNum(evaluator(values, ret.formula), 2);
          ret.resultlevel = 0;

          return ret;
        },
        calculator: function (values) {
          var ret = {};

          try {
            ret.formula = values.calculation;
            ret.result = mathParser.eval(ret.formula);
            ret.resultlevel = 0;
            if (!angular.isNumber(ret.result)) {
              throw "nan";
            }
            if (!isFinite(ret.result)) {
              ret.result = "Άπειρο";
              ret.resultlevel = 2;
            }
          }
          catch(err){
            ret.result = "Λάθος Υπολογισμός";
            ret.resultlevel = 3;
          }
          return ret;
        },
        chad: function (values) {
          var ret = {};

          ret.formula = 'chf + hypertension + ageGroup + diabetes + (stroke * 2) + vascular + sex';
          ret.result = evaluator(values, ret.formula);

          switch (ret.result) {
            case 0:
              ret.explanation = "Όχι αγωγή";
              ret.resultlevel = 0;
              break;
            case 1:
              ret.explanation = "Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή NOAC ή Ασπιρίνη";
              ret.resultlevel = 1;
              break;
            default:
              ret.explanation = "Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή NOAC";
              ret.resultlevel = 2;
          }
          return ret;
        },
        crusade: function (values) {
          var result;
          var explanation;
          var resultlevel;

          var probability = [2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4, 4.1, 4.3, 4.4, 4.6, 4.7, 4.9, 5, 5.2, 5.4, 5.6, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9, 7.2, 7.4, 7.6, 7.9, 8.1, 8.4, 8.6, 8.9, 9.2, 9.5, 9.8, 10.1, 10.4, 10.7, 11.1, 11.4, 11.7, 12.1, 12.5, 12.8, 13.2, 13.6, 14, 14.4, 14.9, 15.3, 15.7, 16.2, 16.7, 17.1, 17.6, 18.1, 18.6, 19.2, 19.7, 20.2, 20.8, 21.4, 21.9, 22.5, 23.1, 23.7, 24.4, 25, 25.6, 26.3, 27, 27.6, 28.3, 29, 29.7, 30.4, 31.2, 31.9, 32.6, 33.4, 34.2, 34.9, 35.7, 36.5, 37.3, 38.1, 38.9, 39.7, 40.5, 41.3, 42.2, 43, 43.8];

          result =
            values.ht*1+
            values.gfr*1+
            values.hr*1+
            values.sbp*1+
            values.sn*1+
            values.diabetes*1+
            values.chf*1+
            values.sex*1

          explanation = "Πιθανότητα σοβαρής αιμορραγίας κατά την νοσηλεία: " + probability[result] + "%";
          if (probability[result] >= 30) {resultlevel = 3;}
          else if (probability[result] >= 20) {resultlevel = 2;}
          else if (probability[result] >= 10) {resultlevel = 1;}
          else {resultlevel = 0;}

          return {
            result: result,
            explanation: explanation,
            resultlevel: resultlevel
          };
        },
        euroscore: function (values) {
          var result;
          var explanation;

          var calc =[];
          calc.push(0.0666354 * values.age < 60 ? 1 : values.age - 58);
          calc.push(values.sex * 0.3304052);
          calc.push(values.lung * 0.4931341);
          calc.push(values.arteropathy * 0.6558917);
          calc.push(values.neuro * 0.841626);
          calc.push(values.surgery * 1.002625);
          calc.push(values.creatinine * 0.6521653);
          calc.push(values.endocarditis * 1.101265);
          calc.push(values.critical * 0.9058132);
          calc.push(values.angina * 0.5677075);
          calc.push(values.lvef);
          calc.push(values.mi * 0.5460218);
          calc.push(values.polmhyper * 0.7676924);
          calc.push(values.emergency * 0.7127953);
          calc.push(!values.cabg * 0.5420364);
          calc.push(values.aorta * 1.159787);
          calc.push(values.septal * 1.462009);

          var sup = _(calc).reduce(function (memo, value) {
            return (memo += value);
          }, -4.789594);

          var value = Math.exp(sup);
          result = 100 * value / (1 + value);

          if (isFinite(result)) {
            result = "Υπολογιζόμενη Θνητότητα Χειρουργείου " + Math.round(result * 100) / 100 + "%";
          } else {
            result = "";
          }

          return {
            result: result,
            explanation: ''
          };
        },
        gfr: function (values) {
          var ret = {};

          ret.formula = '((140 - age) * weight * sex ) / ( 72 * creatinine )';
          ret.result = roundNum(evaluator(values, ret.formula));

          if (ret.result < 90) {
            ret.explanation = "Νεφρική βλάβη με ήπια μείωση του GFR";
            ret.resultlevel = 1;
          }
          else if (ret.result < 60) {
            ret.explanation = "Νεφρική βλάβη με μέτρια μείωση του GFR";
            ret.resultlevel = 2;
          }
          else if (ret.result < 30) {
            ret.explanation = "Νεφρική βλάβη με σοβαρή μείωση του GFR";
            ret.resultlevel = 3;
          }
          else if (ret.result < 15) {
            ret.explanation = "Νεφρική ανεπάρκεια";
            ret.resultlevel = 3;
          }
          else {
            ret.explanation = "Φυσιολογική νεφρική λειτουργία";
            ret.resultlevel = 0;
          }
          return ret;
        },
        glasgow: function (values) {
          var result;
          var explanation;
          var resultlevel;
          result =
            values.eyes*1+
            values.speech*1+
            values.mobility*1;

          if (result > 13) {
            explanation = "Καμμία ή Μικρή Βαθμού Εγκεφαλική Βλαβη";
            resultlevel = 0;
          } else if (result > 8) {
            explanation = "Μέτριου Βαθμού Εγκεφαλική Βλάβη";
            resultlevel = 2;
          } else if (result > 0) {
            explanation = "Σοβαρού Βαθμού Εγκεφαλική Βλάβη (Διασωλήνωση)";
            resultlevel = 3;
          } else {
            explanation = "";
          }

          return {
            result: result,
            explanation: explanation,
            resultlevel: resultlevel
          };
        },
        grace: function (values) {
          var result;
          var explanation;

          var age2;
          if (0 <= values.age && values.age < 35) {
            age2 = 0;
          } else if (35 <= values.age && values.age < 45) {
            age2 = 0 + (values.age - 35) * (1.8);
          } else if (45 <= values.age && values.age < 55) {
            age2 = 18 + (values.age - 45) * (1.8);
          } else if (55 <= values.age && values.age < 65) {
            age2 = 36 + (values.age - 55) * (1.8);
          } else if (65 <= values.age && values.age < 75) {
            age2 = 54 + (values.age - 65) * (1.9);
          } else if (75 <= values.age && values.age < 85) {
            age2 = 73 + (values.age - 75) * (1.8);
          } else if (85 <= values.age && values.age < 90) {
            age2 = 91 + (values.age - 85) * (1.8);
          } else if (values.age >= 90) {
            age2 = 100;
          }


          var pulse2;
          if (0 <= values.rate && values.rate < 70) {
            pulse2 = 0;
          } else if (70 <= values.rate && values.rate < 80) {
            pulse2 = 0 + (values.rate - 70) * (0.3);
          } else if (80 <= values.rate && values.rate < 90) {
            pulse2 = 3 + (values.rate - 80) * (0.2);
          } else if (90 <= values.rate && values.rate < 100) {
            pulse2 = 5 + (values.rate - 90) * (0.3);
          } else if (100 <= values.rate && values.rate < 110) {
            pulse2 = 8 + (values.rate - 100) * (0.2);
          } else if (110 <= values.rate && values.rate < 150) {
            pulse2 = 10 + (values.rate - 110) * (0.3);
          } else if (150 <= values.rate && values.rate < 200) {
            pulse2 = 22 + (values.rate - 150) * (0.3);
          } else if (values.rate >= 200) {
            pulse2 = 34;
          }


          var sysbp2;
          if (0 <= values.bp && values.bp < 80) {
            sysbp2 = 40;
          } else if (80 <= values.bp && values.bp < 100) {
            sysbp2 = 40 - (values.bp - 80) * (0.3);
          } else if (100 <= values.bp && values.bp < 110) {
            sysbp2 = 34 - (values.bp - 100) * (0.3);
          } else if (110 <= values.bp && values.bp < 120) {
            sysbp2 = 31 - (values.bp - 110) * (0.4);
          } else if (120 <= values.bp && values.bp < 130) {
            sysbp2 = 27 - (values.bp - 120) * (0.3);
          } else if (130 <= values.bp && values.bp < 140) {
            sysbp2 = 24 - (values.bp - 130) * (0.3);
          } else if (140 <= values.bp && values.bp < 150) {
            sysbp2 = 20 - (values.bp - 140) * (0.4);
          } else if (150 <= values.bp && values.bp < 160) {
            sysbp2 = 17 - (values.bp - 150) * (0.3);
          } else if (160 <= values.bp && values.bp < 180) {
            sysbp2 = 14 - (values.bp - 160) * (0.3);
          } else if (180 <= values.bp && values.bp < 200) {
            sysbp2 = 8 - (values.bp - 180) * (0.4);
          } else if (values.bp >= 200) {
            sysbp2 = 0;
          }


          var crt2;
          if (0.0 <= values.creat && values.creat < 0.2) {
            crt2 = 0 + (values.creat - 0) * (1 / 0.2);
          } else if (0.2 <= values.creat && values.creat < 0.4) {
            crt2 = 1 + (values.creat - 0.2) * (2 / 0.2);
          } else if (0.4 <= values.creat && values.creat < 0.6) {
            crt2 = 3 + (values.creat - 0.4) * (1 / 0.2);
          } else if (0.6 <= values.creat && values.creat < 0.8) {
            crt2 = 4 + (values.creat - 0.6) * (2 / 0.2);
          } else if (0.8 <= values.creat && values.creat < 1.0) {
            crt2 = 6 + (values.creat - 0.8) * (1 / 0.2);
          } else if (1.0 <= values.creat && values.creat < 1.2) {
            crt2 = 7 + (values.creat - 1.0) * (1 / 0.2);
          } else if (1.2 <= values.creat && values.creat < 1.4) {
            crt2 = 8 + (values.creat - 1.2) * (2 / 0.2);
          } else if (1.4 <= values.creat && values.creat < 1.6) {
            crt2 = 10 + (values.creat - 1.4) * (1 / 0.2);
          } else if (1.6 <= values.creat && values.creat < 1.8) {
            crt2 = 11 + (values.creat - 1.6) * (2 / 0.2);
          } else if (1.8 <= values.creat && values.creat < 2.0) {
            crt2 = 13 + (values.creat - 1.8) * (1 / 0.2);
          } else if (2.0 <= values.creat && values.creat < 3.0) {
            crt2 = 14 + (values.creat - 2.0) * (7 / 1);
          } else if (3.0 <= values.creat && values.creat < 4.0) {
            crt2 = 21 + (values.creat - 3.0) * (7 / 1);
          } else if (values.creat >= 4.0) {
            crt2 = 28;
          }

          var chfs;
          if (values.killip === 1) {
            chfs = 0;
          } else if (values.killip === 2) {
            chfs = 15;
          } else if (values.killip === 3) {
            chfs = 29;
          } else if (values.killip === 4) {
            chfs = 44;
          }

          result = chfs + sysbp2 + pulse2 + age2 + crt2 + 17 * values.stemi + 13 * values.trop + 30 * values.arrest;

          if (result >= 6) {
            explanation = 0.2;
          }
          if (result >= 27) {
            explanation = 0.4;
          }
          if (result >= 39) {
            explanation = 0.6;
          }
          if (result >= 48) {
            explanation = 0.8;
          }
          if (result >= 55) {
            explanation = 1.0;
          }
          if (result >= 60) {
            explanation = 1.2;
          }
          if (result >= 65) {
            explanation = 1.4;
          }
          if (result >= 69) {
            explanation = 1.6;
          }
          if (result >= 73) {
            explanation = 1.8;
          }
          if (result >= 76) {
            explanation = 2;
          }
          if (result >= 88) {
            explanation = 3;
          }
          if (result >= 97) {
            explanation = 4;
          }
          if (result >= 104) {
            explanation = 5;
          }
          if (result >= 110) {
            explanation = 6;
          }
          if (result >= 115) {
            explanation = 7;
          }
          if (result >= 119) {
            explanation = 8;
          }
          if (result >= 123) {
            explanation = 9;
          }
          if (result >= 126) {
            explanation = 10;
          }
          if (result >= 129) {
            explanation = 11;
          }
          if (result >= 132) {
            explanation = 12;
          }
          if (result >= 134) {
            explanation = 13;
          }
          if (result >= 137) {
            explanation = 14;
          }
          if (result >= 139) {
            explanation = 15;
          }
          if (result >= 141) {
            explanation = 16;
          }
          if (result >= 143) {
            explanation = 17;
          }
          if (result >= 145) {
            explanation = 18;
          }
          if (result >= 147) {
            explanation = 19;
          }
          if (result >= 149) {
            explanation = 20;
          }
          if (result >= 150) {
            explanation = 21;
          }
          if (result >= 152) {
            explanation = 22;
          }
          if (result >= 153) {
            explanation = 23;
          }
          if (result >= 155) {
            explanation = 24;
          }
          if (result >= 156) {
            explanation = 25;
          }
          if (result >= 158) {
            explanation = 26;
          }
          if (result >= 159) {
            explanation = 27;
          }
          if (result >= 160) {
            explanation = 28;
          }
          if (result >= 162) {
            explanation = 29;
          }
          if (result >= 163) {
            explanation = 30;
          }
          if (result >= 174) {
            explanation = 40;
          }
          if (result >= 183) {
            explanation = 50;
          }
          if (result >= 191) {
            explanation = 60;
          }
          if (result >= 200) {
            explanation = 70;
          }
          if (result >= 208) {
            explanation = 80;
          }
          if (result >= 219) {
            explanation = 90;
          }
          if (result >= 285) {
            explanation = 99;
          }

          var resultlevel;
          if (explanation <= 2) {resultlevel = 0;}
          else if (explanation <= 10) {resultlevel = 1;}
          else if (explanation <= 20) {resultlevel = 2;}
          else {resultlevel = 3;}

          return {
            result: roundNum(result),
            explanation: "Θνησιμότητα εντός εξαμήνου: " + explanation + "%",
            resultlevel: resultlevel
          };
        },
        hasbled: function (values) {
          var result;
          var explanation;
          var resultlevel;

          result =
            values.hypertension*1 +
            values.renalfailure*1 +
            values.hepaticfailure*1 +
            values.stroke*1 +
            values.history*1 +
            values.int*1 +
            values.age*1 +
            values.drugs*1 +
            values.alcohol*1;

          switch (result) {
            case 0:
              explanation = "Ο κίνδυνος είναι 0.9%";
              resultlevel = 0;
              break;
            case 1:
              explanation = "Ο κίνδυνος είναι 3.4%";
              resultlevel = 0;
              break;
            case 2:
              explanation = "Ο κίνδυνος είναι 4.1%";
              resultlevel = 1;
              break;
            case 3:
              explanation = "Ο κίνδυνος είναι 5.8%";
              resultlevel = 1;
              break;
            case 4:
              explanation = "Ο κίνδυνος είναι 8.9%";
              resultlevel = 2;
              break;
            case 5:
              explanation = "Ο κίνδυνος είναι 9.1%";
              resultlevel = 2;
              break;
            default:
              explanation = "Δεν έχει υπολογισθεί ο κίνδυνος";
              resultlevel = 3;
              break;
          }

          return {
            result: result,
            explanation: explanation,
            resultlevel: resultlevel
          };
        },
        killip: function (values) {
          var result = values.killip;
          var explanation;
          var resultlevel;
          switch (result) {
            case 'I':
              explanation = "6%";
              resultlevel = 0;
              break;
            case 'II':
              explanation = "17%";
              resultlevel = 1;
              break;
            case 'III':
              explanation = "38%";
              resultlevel = 2;
              break;
            case 'IV':
              explanation = "67%";
              resultlevel = 3;
              break;
          }
          return {
            result: result,
            explanation: "Ποσοστό Θνησιμότητας σε 30 Ημέρες: " + explanation,
            resultlevel: resultlevel
          };
        },
        nyha: function (values) {
          var result = values.nyha;
          var resultlevel;
          if (result === "IV") {resultlevel = 3;}
          if (result === "III") {resultlevel = 2;}
          if (result === "II") {resultlevel = 1;}
          if (result === "I") {resultlevel = 0;}
          return {
            result: result,
            //explanation: explanation,
            resultlevel: resultlevel
          };
        }
      };
    });
})();
