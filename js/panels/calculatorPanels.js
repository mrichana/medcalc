/*global angular: true */
/*global _: true */

(function () {
  'use strict';
  /**
   * calculators Module
   *
   * Available calculators
   */
  angular.module('medical.panels').
    factory('calculatorPanels', function (update, init, reset) {
      return [
        {
          id: "abg",
          name: "Αέρια Αίματος",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            pH: 7.40,
            pO2: 100,
            pCO2: 40,
            H2CO3: 24,
            FiO2: 0.21
          },
          fields: [
            {
              id: "pH",
              name: "pH",
              input: {
                type: "number",
                step: 0.01,
                min: 6,
                max: 8
              }
            },
            {
              id: "pO2",
              name: "pO<sub>2</sub>(mmHg)",
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 200
              }
            },
            {
              id: "pCO2",
              name: "pCO<sub>2</sub>(mmHg)",
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 100
              }
            },
            {
              id: "H2CO3",
              name: "H<sub>2</sub>CO<sub>3</sub>(mEq/L)",
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 100
              }
            },
            {
              id: "FiO2",
              name: "FiO2(%)",
              input: {
                type: "select",
                options: [
                  {
                    value: 0.21,
                    name: "21% (Ατμοσφαιρικός Αέρας)"
                  },
                  {
                    value: 0.24,
                    name: "24% (Ρινικό 1lt ή Ventouri 24%)"
                  },
                  {
                    value: 0.28,
                    name: "28% (Ρινικό 2lt ή Ventouri 28%)"
                  },
                  {
                    value: 0.31,
                    name: "31% (Ventouri 31%)"
                  },
                  {
                    value: 0.35,
                    name: "35% (Ventouri 35%)"
                  },
                  {
                    value: 0.40,
                    name: "40% (Ventouri 40%)"
                  },
                  {
                    value: 0.50,
                    name: "50% (Ventouri 50%)"
                  },
                  {
                    value: 0.60,
                    name: "60% (Ventouri 60%)"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "bmi",
          name: "Δείκτης Μάζας Σώματος",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            height: 170,
            weight: 70
          },
          fields: [
            {
              id: "height",
              name: "Ύψος (cm)",
              input: {
                type: "number",
                step: 1,
                min: 0,
                max: 250
              }
            },
            {
              id: "weight",
              name: "Βάρος (kgr)",
              input: {
                type: "number",
                step: 1,
                min: 0,
                max: 250
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "bsa",
          name: "Επιφάνεια Σώματος (BSA)",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            height: 170,
            weight: 70
          },
          fields: [
            {
              id: "height",
              name: "Ύψος (cm)",
              input: {
                type: "number",
                step: 1,
                min: 0,
                max: 250
              }
            },
            {
              id: "weight",
              name: "Βάρος (kgr)",
              input: {
                type: "number",
                step: 1,
                min: 0,
                max: 250
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "calculator",
          name: "Υπολογιστής",
          template: "calculator.basic",
          type: "basic",
          defaultValues: {
            calculation: ""
          },
          fields: [
            {
              id: "calculation",
              name: "Υπολογισμός",
              value: "",
              input: {
                type: "text"
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "chad",
          name: "CHAD Score",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            chf: false,
            hypertension: false,
            ageGroup: 0,
            diabetes: false,
            stroke: false,
            vascular: false,
            sex: 0
          },
          fields: [
            {
              id: "chf",
              name: "Συμφορητική Καρδιακή Ανεπάρκεια",
              input: {
                type: "check"
              }
            },
            {
              id: "hypertension",
              name: "Αρτηριακή Υπέρταση",
              input: {
                type: "check"
              }
            },
            {
              id: "ageGroup",
              name: "Ηλικία",
              input: {
                type: "select",
                options: [
                  {
                    value: 0,
                    name: "< 65 ετών"
                  },
                  {
                    value: 1,
                    name: "65 εώς 75 ετών"
                  },
                  {
                    value: 2,
                    name: "> 75 ετών"
                  }
                ]
              }
            },
            {
              id: "diabetes",
              name: "Σακχαρώδης Διαβήτης",
              input: {
                type: "check"
              }
            },
            {
              id: "stroke",
              name: "Ιστορικό TIA ή εγκεφαλικού",
              input: {
                type: "check"
              }
            },
            {
              id: "vascular",
              name: "Περιφερική Αγγειοπάθεια",
              value: false,
              input: {
                type: "check"
              }
            },
            {
              id: "sex",
              name: "Φύλο",
              input: {
                type: "select",
                options: [
                  {
                    value: 0,
                    name: "♂ Άρρεν"
                  },
                  {
                    value: 1,
                    name: "♀ Θήλυ"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "crusade",
          name: "CRUSADE Score",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            ht: 3,
            gfr: 0,
            hr: 1,
            sbp: 1,
            sn: 0,
            diabetes: 0,
            chf: 0,
            sex: 0
          },
          fields: [
            {
              id: "ht",
              name: "Αιματοκρίτης κατά την εισαγωγή",
              input: {
                type: "select",
                options: [
                  {
                    value: 0,
                    name: ">39.9"
                  },
                  {
                    value: 2,
                    name: "37-39.9"
                  },
                  {
                    value: 3,
                    name: "34-36.9"
                  },
                  {
                    value: 7,
                    name: "31-33.9"
                  },
                  {
                    value: 9,
                    name: "<31"
                  }
                ]
              }
            },
            {
              id: "gfr",
              name: "GFR",
              input: {
                type: "select",
                options: [
                  {
                    value: 0,
                    name: ">120"
                  },
                  {
                    value: 7,
                    name: "91-120"
                  },
                  {
                    value: 17,
                    name: "61-90"
                  },
                  {
                    value: 28,
                    name: "31-60"
                  },
                  {
                    value: 35,
                    name: "<30"
                  }
                ]
              }
            },
            {
              id: "hr",
              name: "Σφίξεις κατά την εισαγωγή",
              input: {
                type: "select",
                options: [
                  {
                    value: 11,
                    name: ">120"
                  },
                  {
                    value: 10,
                    name: "111-120"
                  },
                  {
                    value: 8,
                    name: "101-110"
                  },
                  {
                    value: 6,
                    name: "91-100"
                  },
                  {
                    value: 3,
                    name: "81-90"
                  },
                  {
                    value: 1,
                    name: "71-80"
                  },
                  {
                    value: 0,
                    name: "<71"
                  }
                ]
              }
            },
            {
              id: "sbp",
              name: "Συστολική Πίεση κατά την εισαγωγή",
              input: {
                type: "select",
                options: [
                  {
                    value: 5,
                    name: ">200"
                  },
                  {
                    value: 3,
                    name: "181-200"
                  },
                  {
                    value: 1,
                    name: "121-180"
                  },
                  {
                    value: 5,
                    name: "101-120"
                  },
                  {
                    value: 8,
                    name: "91-100"
                  },
                  {
                    value: 10,
                    name: "<91"
                  }
                ]
              }
            },
            {
              id: "sn",
              name: "Ιστορικό αγγειακής νόσου",
              input: {
                type: "check",
                multiplier: 6
              }
            },
            {
              id: "diabetes",
              name: "Σακχαρώδης Διαβήτης",
              input: {
                type: "check",
                multiplier: 6
              }
            },
            {
              id: "chf",
              name: "Καρδιακή ανεπάρκεια κατά την εισαγωγή",
              input: {
                type: "check",
                multiplier: 7
              }
            },
            {
              id: "sex",
              name: "Φύλο",
              input: {
                type: "select",
                options: [
                  {
                    value: 0,
                    name: "♂ Άρρεν"
                  },
                  {
                    value: 8,
                    name: "♀ Θήλυ"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "euroscore",
          name: "EuroSCORE",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            age: 65,
            sex: 0,
            lung: false,
            arteropathy: false,
            neuro: false,
            surgery: false,
            creatinine: false,
            endocarditis: false,
            critical: false,
            angina: false,
            lvef: 0,
            mi: false,
            polmhyper: false,
            emergency: false,
            cabg: false,
            aorta: false,
            septal: false
          },
          fields: [
            {
              id: "age",
              name: "Ηλικία",
              input: {
                type: "number",
                step: 1,
                min: 1,
                max: 120
              }
            },
            {
              id: "sex",
              name: "Φύλο",
              input: {
                type: "select",
                options: [
                  {
                    value: 0,
                    name: "♂ Άρρεν"
                  },
                  {
                    value: 0.3304052,
                    name: "♀ Θήλυ"
                  }
                ]
              }
            },
            {
              id: "lung",
              name: "Χ.Α.Π.",
              input: {
                type: "check",
                multiplier: 0.4931341
              }
            },
            {
              id: "arteropathy",
              name: "Εξωκαρδιακή Αρτηριοπάθεια",
              input: {
                type: "check",
                multiplier: 0.6558917
              }
            },
            {
              id: "neuro",
              name: "Νευρολογική Δυσλειτουργία",
              input: {
                type: "check",
                multiplier: 0.841626
              }
            },
            {
              id: "surgery",
              name: "Προηγηθήσα Καρδιοχειρουργική Επέμβαση",
              input: {
                type: "check",
                multiplier: 1.002625
              }
            },
            {
              id: "creatinine",
              name: "Κρεατινίνη Πλάσματος > 2.25mg/dl",
              input: {
                type: "check",
                multiplier: 0.6521653
              }
            },
            {
              id: "endocarditis",
              name: "Ενεργή Ενδοκαρδίτιδα",
              input: {
                type: "check",
                multiplier: 1.101265
              }
            },
            {
              id: "critical",
              name: "Κρίσιμη Προεγχειρητική Κατάσταση",
              input: {
                type: "check",
                multiplier: 0.9058132
              }
            },
            {
              id: "angina",
              name: "Στηθάγχη Ηρεμίας",
              input: {
                type: "check",
                multiplier: 0.5677075
              }
            },
            {
              id: "lvef",
              name: "Λειτουργία Αρ. Κοιλίας",
              input: {
                type: "select",
                options: [
                  {
                    value: 0,
                    name: "Καλή LVEF > 50%"
                  },
                  {
                    value: 0.4191643,
                    name: "Μέτρια LVEF 30-50%"
                  },
                  {
                    value: 1.094443,
                    name: "Κακή LVEF < 30%"
                  }
                ]
              }
            },
            {
              id: "mi",
              name: "Πρόσφατο Έμφραγμα Μυοκαρδίου (90 ημερών)",
              input: {
                type: "check",
                multiplier: 0.5460218
              }
            },
            {
              id: "polmhyper",
              name: "Πνευμονική Υπέρταση &gt; 60mmHg",
              input: {
                type: "check",
                multiplier: 0.7676924
              }
            },
            {
              id: "emergency",
              name: "Επείγουσα Επέμβαση",
              input: {
                type: "check",
                multiplier: 0.7127953
              }
            },
            {
              id: "cabg",
              name: "Απλή Αορτοστεφανιαία Παράκαμψη",
              input: {
                type: "check"
              }
            },
            {
              id: "aorta",
              name: "Επέμβαση Θωρακικής Αορτής",
              input: {
                type: "check",
                multiplier: 1.159787
              }
            },
            {
              id: "septal",
              name: "Μετεμφραγματική Ρήξη Μεσοκοιλιακού Διαφράγματος",
              input: {
                type: "check",
                multiplier: 1.462009
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: function (newValue, oldValue, scope) {
            var ret = update.call(this, newValue, oldValue);

            var aorta = _.find(scope.panel.fields, function (field) {
              return field.id === 'aorta';
            });
            var septal = _.find(scope.panel.fields, function (field) {
              return field.id === 'septal';
            });
            var cabg = _.find(scope.panel.fields, function (field) {
              return field.id === 'cabg';
            });

            if (this.values.aorta || this.values.septal) {
              this.values.cabg = false;
              cabg.input.disabled = true;
            } else {
              cabg.input.disabled = false;
            }

            if (this.values.cabg) {
              this.values.aorta = false;
              aorta.input.disabled = true;
              this.values.septal = false;
              septal.input.disabled = true;
            } else {
              aorta.input.disabled = false;
              septal.input.disabled = false;
            }

            return ret;
          }
        },
        {
          id: "gfr",
          name: "eGFR",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            creatinine: 1.0,
            age: 50,
            weight: 75,
            sex: 1
          },
          fields: [
            {
              id: "creatinine",
              name: "Κρεατινίνη Πλάσματος",
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 4
              }
            },
            {
              id: "age",
              name: "Ηλικία",
              input: {
                type: "number",
                step: 1,
                min: 20,
                max: 100
              }
            },
            {
              id: "weight",
              name: "Σωματικό Βάρος",
              input: {
                type: "number",
                step: 1,
                min: 50,
                max: 200
              }
            },
            {
              id: "sex",
              name: "Φύλο",
              input: {
                type: "select",
                options: [
                  {
                    value: 1,
                    name: "♂ Άρρεν"
                  },
                  {
                    value: 0.85,
                    name: "♀ Θήλυ"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "glasgow",
          name: "Κλίμακα Γλασκόβης",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            eyes: 4,
            speech: 5,
            mobility: 6
          },
          fields: [
            {
              id: "eyes",
              name: "Μάτια",
              input: {
                type: "select",
                options: [
                  {
                    value: 1,
                    name: "Παραμένουν κλειστά"
                  },
                  {
                    value: 2,
                    name: "Ανοίγουν στον πόνο"
                  },
                  {
                    value: 3,
                    name: "Ανοίγουν στην εντολή"
                  },
                  {
                    value: 4,
                    name: "Ανοικτά"
                  }
                ]
              }
            },
            {
              id: "speech",
              name: "Ομιλία",
              input: {
                type: "select",
                options: [
                  {
                    value: 1,
                    name: "Κανένας ήχος"
                  },
                  {
                    value: 2,
                    name: "Άναρθρες κραυγές"
                  },
                  {
                    value: 3,
                    name: "Ομιλία με ασάφεια"
                  },
                  {
                    value: 4,
                    name: "Αποπροσανατολισμένος"
                  },
                  {
                    value: 5,
                    name: "Φυσιολογική Επικοινωνία"
                  }
                ]
              }
            },
            {
              id: "mobility",
              name: "Κινητικότητα",
              input: {
                type: "select",
                options: [
                  {
                    value: 1,
                    name: "Καμία κινητικότητα"
                  },
                  {
                    value: 2,
                    name: "Εκτείνει στον πόνο(απεγκεφαλισμός)"
                  },
                  {
                    value: 3,
                    name: "Κάμπτει στον πόνο (αποφλοίωση)"
                  },
                  {
                    value: 4,
                    name: "Αποσύρει στα επώδυνα ερεθίσματα"
                  },
                  {
                    value: 5,
                    name: "Εντοπίζει τα επώδυνα ερεθίσματα"
                  },
                  {
                    value: 6,
                    name: "Εκτελεί εντολές"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "grace",
          name: "GRACE Score",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            arrest: false,
            stemi: false,
            trop: false,
            age: 60,
            rate: 70,
            bp: 120,
            creat: 1.0,
            killip: 1
          },
          fields: [
            {
              id: "arrest",
              name: "Καρδιακή Ανακοπή",
              input: {
                type: "check"
              }
            },
            {
              id: "stemi",
              name: "ST Ανάσπαση ή Κατάσπαση",
              input: {
                type: "check"
              }
            },
            {
              id: "trop",
              name: "Παρουσία Καρδιοενζύμων",
              input: {
                type: "check"
              }
            },
            {
              id: "age",
              name: "Ηλικία",
              input: {
                type: "number",
                step: 1,
                min: 20,
                max: 120
              }
            },
            {
              id: "rate",
              name: "Καρδιακή Συχνότητα",
              input: {
                type: "number",
                step: 1,
                min: 30,
                max: 200
              }
            },
            {
              id: "bp",
              name: "Συστολική Πίεση",
              input: {
                type: "number",
                step: 1,
                min: 60,
                max: 250
              }
            },
            {
              id: "creat",
              name: "Κρεατινίνη Πλάσματος",
              input: {
                type: "number",
                step: 0.1,
                min: 0.1,
                max: 10.0
              }
            },
            {
              id: "killip",
              name: "Killip Class",
              input: {
                type: "select",
                options: [
                  {
                    value: 1,
                    name: "Class I",
                    description: "Απουσία κλινικών σημείων καρδιακής ανεπάρκειας"
                  },
                  {
                    value: 2,
                    name: "Class II",
                    description: "Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικής Φλέβας"
                  },
                  {
                    value: 3,
                    name: "Class III",
                    description: "Οξύ Πνευμονικό Οίδημα"
                  },
                  {
                    value: 4,
                    name: "Class IV",
                    description: "Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "hasbled",
          name: "HAS-BLED Score",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            hypertension: false,
            renalfailure: false,
            hepaticfailure: false,
            stroke: false,
            history: false,
            int: false,
            age: false,
            drugs: false,
            alcohol: false
          },
          fields: [
            {
              id: "hypertension",
              name: "Υπέρταση",
              description: "Σ.Π.>160mmHg",
              input: {
                type: "check"
              }
            },
            {
              id: "renalfailure",
              name: "Νεφρική Νόσος",
              description: "Τ.Ν. ή Creatinine>2.6mg/dL",
              input: {
                type: "check"
              }
            },
            {
              id: "hepaticfailure",
              name: "Ηπατική Νόσος",
              description: "Κίρρωση, Χολερυθρίνη>2xΦυσιολογικό, Τρανσαμινάσες>3xΦυσιολογικό",
              input: {
                type: "check"
              }
            },
            {
              id: "stroke",
              name: "Ιστορικό ΑΕΕ",
              input: {
                type: "check"
              }
            },
            {
              id: "history",
              name: "Αιμορραγική διάθεση",
              input: {
                type: "check"
              }
            },
            {
              id: "inr",
              name: "Δύσκολα ρυθμιζόμενο INR",
              input: {
                type: "check"
              }
            },
            {
              id: "age",
              name: "Ηλικία>65",
              input: {
                type: "check"
              }
            },
            {
              id: "drugs",
              name: "Φάρμακα",
              description: "Αντιαιμοπεταλιακά, ΜΣΑΦ",
              input: {
                type: "check"
              }
            },
            {
              id: "alcohol",
              name: "Ιστορικό χρήσης Αλκοόλ",
              input: {
                type: "check"
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "killip",
          name: "Killip Class",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            killip: "I"
          },
          fields: [
            {
              id: "killip",
              name: "Killip Class",
              input: {
                type: "select",
                options: [
                  {
                    value: "I",
                    name: "I",
                    description: "Απουσία κλινικών σημείων καρδιακής ανεπάρκειας"
                  },
                  {
                    value: "II",
                    name: "II",
                    description: "Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικής Φλέβας"
                  },
                  {
                    value: "III",
                    name: "III",
                    description: "Οξύ Πνευμονικό Οίδημα"
                  },
                  {
                    value: "IV",
                    name: "IV",
                    description: "Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        },
        {
          id: "nyha",
          name: "NYHA Class",
          type: "basic",
          template: "calculator.basic",
          defaultValues: {
            nyha: "I"
          },
          fields: [
            {
              id: "nyha",
              name: "NYHA Class",
              value: "I",
              input: {
                type: "select",
                options: [
                  {
                    value: "I",
                    name: "I",
                    description: "Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα"
                  },
                  {
                    value: "II",
                    name: "II",
                    description: "Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα"
                  },
                  {
                    value: "III",
                    name: "III",
                    description: "Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση"
                  },
                  {
                    value: "IV",
                    name: "IV",
                    description: "Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση"
                  }
                ]
              }
            },
            {
              id: "result",
              input: {
                type: "result"
              }
            }
          ],
          init: init,
          reset: reset,
          update: update
        }
      ];
    });
})();