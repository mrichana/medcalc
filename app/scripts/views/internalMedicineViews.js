/*global angular: true */
/*global _: true */

(function() {
    'use strict';
    /**
     * calculators Module
     *
     * Available calculators
     */
    angular.module('medical.views').
    factory('internalMedicineViews', ['views', 'update', 'init', 'reset',
        function(views, update, init, reset) {
            var generalFields = {
                Result: {
                    id: 'result',
                    input: {
                        type: 'result'
                    }
                },
                Age: {
                    id: 'Age',
                    name: 'Ηλικία',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 120
                    }
                },
                Sex: {
                    id: 'Sex',
                    name: 'Φύλο',
                    input: {
                        type: 'select',
                        options: [{
                            value: 0,
                            name: '♂ Άρρεν'
                        }, {
                            value: 1,
                            name: '♀ Θήλυ'
                        }]
                    }
                },
                Height: {
                    id: 'Height',
                    name: 'Ύψος (cm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 250
                    }
                },
                Weight: {
                    id: 'Weight',
                    name: 'Βάρος (kgr)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 0,
                        max: 250
                    }
                }
            };
            return views.add([{
                id: 'ArterialBloodGasses',
                name: 'Αέρια Αίματος',
                category: 'generic internalmed pneumonology cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    'ArterialBlood_pH': 7.40,
                    'ArterialBlood_pO2': 100,
                    'ArterialBlood_pCO2': 40,
                    'ArterialBlood_H2CO3': 24,
                    'ArterialBlood_FiO2': 0.21
                },
                fields: [{
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
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'BMI',
                name: 'Δείκτης Μάζας Σώματος',
                category: 'generic',
                template: 'calculator.basic',
                defaultValues: {
                    Height: 170,
                    Weight: 70
                },
                fields: [
                    generalFields.Height,
                    generalFields.Weight,
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'BSA',
                name: 'Επιφάνεια Σώματος (BSA)',
                category: 'generic',
                template: 'calculator.basic',
                defaultValues: {
                    Height: 170,
                    Weight: 70
                },
                fields: [
                    generalFields.Height,
                    generalFields.Weight,
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Calculator',
                name: 'Υπολογιστής',
                category: 'generic',
                template: 'calculator.basic',
                defaultValues: {
                    Calculation: ''
                },
                fields: [{
                        id: 'Calculation',
                        name: 'Υπολογισμός',
                        value: '',
                        input: {
                            type: 'text'
                        }
                    },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'CHADScore',
                name: 'CHAD Score',
                category: 'cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    'HistoryOf_CHF': false,
                    'HistoryOf_Hypertension': false,
                    'Age': 65,
                    'HistoryOf_Diabetes': false,
                    'HistoryOf_Stroke': false,
                    'HistoryOf_VascularDisease': false,
                    'Sex': 0
                },
                fields: [{
                        id: 'HistoryOf_CHF',
                        name: 'Συμφορητική Καρδιακή Ανεπάρκεια',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_Hypertension',
                        name: 'Αρτηριακή Υπέρταση',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'Age',
                        name: 'Ηλικία',
                        input: {
                            type: 'number'
                        }
                    }, {
                        id: 'HistoryOf_Diabetes',
                        name: 'Σακχαρώδης Διαβήτης',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_Stroke',
                        name: 'Ιστορικό TIA ή εγκεφαλικού',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_VascularDisease',
                        name: 'Περιφερική Αγγειοπάθεια',
                        value: false,
                        input: {
                            type: 'check'
                        }
                    },
                    generalFields.Sex,
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'CRUSADEScore',
                name: 'CRUSADE Score',
                category: 'cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    Hematocrit: 40,
                    GFR: 73,
                    HeartRate: 70,
                    BloodPressure_Systolic: 120,
                    HistoryOf_VascularDisease: false,
                    HistoryOf_Diabetes: false,
                    CRUSADEScore_CHFAtPresentation: false,
                    Sex: 0
                },
                fields: [{
                        id: 'Hematocrit',
                        name: 'Αιματοκρίτης κατά την εισαγωγή',
                        input: {
                            type: 'number',
                            step: 0.1,
                            min: 10,
                            max: 70
                        }
                    }, {
                        id: 'GFR',
                        name: 'GFR',
                        calculator: 'GFR',
                        input: {
                            type: 'number',
                            step: 0.1,
                            min: 0,
                            max: 250
                        }
                    }, {
                        id: 'HeartRate',
                        name: 'Σφίξεις κατά την εισαγωγή',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 20,
                            max: 280
                        }
                    }, {
                        id: 'BloodPressure_Systolic',
                        name: 'Συστολική Πίεση κατά την εισαγωγή',
                        input: {
                            type: 'number',
                            step: 5,
                            min: 60,
                            max: 280
                        }
                    }, {
                        id: 'HistoryOf_VascularDisease',
                        name: 'Ιστορικό αγγειακής νόσου',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_Diabetes',
                        name: 'Σακχαρώδης Διαβήτης',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'CRUSADEScore_CHFAtPresentation',
                        name: 'Καρδιακή ανεπάρκεια κατά την εισαγωγή',
                        input: {
                            type: 'check'
                        }
                    },
                    generalFields.Sex,
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'EuroSCORE',
                name: 'EuroSCORE',
                category: 'cardiology cardiosurgery',
                template: 'calculator.basic',
                defaultValues: {
                    Age: 65,
                    Sex: 0,
                    HistoryOf_PulmonaryDisease: false,
                    HistoryOf_VascularDisease: false,
                    HistoryOf_NeurologicalDisease: false,
                    HistoryOf_CardiacSurgery: false,
                    Plasma_Creatinine: 1.0,
                    EuroSCORE_ActiveEndocarditis: false,
                    EuroSCORE_CriticalState: false,
                    AnginaAtRest: false,
                    LVEF: 60,
                    EuroSCORE_MIinTheLast90Days: false,
                    PASP: 40,
                    EuroSCORE_Emergency: false,
                    EuroSCORE_SimpleCABG: false,
                    EuroSCORE_ThoracicAorta: false,
                    EuroSCORE_SeptalRupture: false
                },
                fields: [
                    generalFields.Age,
                    generalFields.Sex, {
                        id: 'HistoryOf_PulmonaryDisease',
                        name: 'Χ.Α.Π.',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_VascularDisease',
                        name: 'Εξωκαρδιακή Αρτηριοπάθεια',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_NeurologicalDisease',
                        name: 'Νευρολογική Δυσλειτουργία',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_CardiacSurgery',
                        name: 'Προηγηθήσα Καρδιοχειρουργική Επέμβαση',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'Plasma_Creatinine',
                        name: 'Κρεατινίνη Πλάσματος',
                        input: {
                            type: 'number',
                            step: 0.1,
                            min: 0.1,
                            max: 8
                        }
                    }, {
                        id: 'EuroSCORE_ActiveEndocarditis',
                        name: 'Ενεργή Ενδοκαρδίτιδα',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'EuroSCORE_CriticalState',
                        name: 'Κρίσιμη Προεγχειρητική Κατάσταση',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'AnginaAtRest',
                        name: 'Στηθάγχη Ηρεμίας',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'LVEF',
                        name: 'Λειτουργικότητα Αρ. Κοιλίας',
                        input: {
                            type: 'number',
                            step: 5,
                            min: 10,
                            max: 70
                        }
                    }, {
                        id: 'EuroSCORE_MIinTheLast90Days',
                        name: 'Πρόσφατο Έμφραγμα Μυοκαρδίου (90 ημερών)',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'PASP',
                        name: 'Πίεση Πνευμονικής Αρτηρίας (mmHg)',
                        input: {
                            type: 'number',
                            step: 5,
                            min: 10,
                            max: 140
                        }
                    }, {
                        id: 'EuroSCORE_Emergency',
                        name: 'Επείγουσα Επέμβαση',
                        input: {
                            type: 'check',
                            multiplier: 0.7127953
                        }
                    }, {
                        id: 'EuroSCORE_SimpleCABG',
                        name: 'Απλή Αορτοστεφανιαία Παράκαμψη',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'EuroSCORE_ThoracicAorta',
                        name: 'Επέμβαση Θωρακικής Αορτής',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'EuroSCORE_SeptalRupture',
                        name: 'Μετεμφραγματική Ρήξη Μεσοκοιλιακού Διαφράγματος',
                        input: {
                            type: 'check'
                        }
                    },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update,
                validate: function(newValue, scope, field) {
                    if (field.id === 'aorta' && this.values.aorta === true) {
                        this.values.cabg = false;
                    }
                    if (field.id === 'septal' && this.values.septal === true) {
                        this.values.cabg = false;
                    }
                    if (field.id === 'cabg' && this.values.cabg === true) {
                        this.values.aorta = this.values.septal = false;
                    }
                }
            }, {
                id: 'GFR',
                name: 'eGFR',
                category: 'generic',
                template: 'calculator.basic',
                defaultValues: {
                    Plasma_Creatinine: 1.0,
                    Age: 65,
                    Weight: 70,
                    Sex: 0
                },
                fields: [{
                        id: 'Plasma_Creatinine',
                        name: 'Κρεατινίνη Πλάσματος',
                        input: {
                            type: 'number',
                            step: 0.1,
                            min: 0.1,
                            max: 8
                        }
                    },
                    generalFields.Age,
                    generalFields.Weight,
                    generalFields.Sex,
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'GlasgowComaScale',
                name: 'Κλίμακα Γλασκόβης',
                category: 'generic neurology trauma',
                template: 'calculator.basic',
                defaultValues: {
                    GlasgowComaScale_Eyes: 4,
                    GlasgowComaScale_Speech: 5,
                    GlasgowComaScale_Mobility: 6
                },
                fields: [{
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
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'GRACEScore',
                name: 'GRACE Score',
                category: 'cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    GRACEScore_arrest: false,
                    GRACEScore_stemi: false,
                    GRACEScore_troponine: false,
                    Age: 60,
                    HeartRate: 70,
                    BloodPressure_Systolic: 120,
                    Plasma_Creatinine: 1.0,
                    KillipClass: 'I'
                },
                fields: [{
                        id: 'GRACEScore_arrest',
                        name: 'Καρδιακή Ανακοπή',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'GRACEScore_stemi',
                        name: 'ST Ανάσπαση ή Κατάσπαση',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'GRACEScore_troponine',
                        name: 'Παρουσία Καρδιοενζύμων',
                        input: {
                            type: 'check'
                        }
                    },
                    generalFields.Age, {
                        id: 'HeartRate',
                        name: 'Καρδιακή Συχνότητα',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 20,
                            max: 280
                        }
                    }, {
                        id: 'BloodPressure_Systolic',
                        name: 'Συστολική Πίεση',
                        input: {
                            type: 'number',
                            step: 5,
                            min: 60,
                            max: 280
                        }
                    }, {
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
                    },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'HASBLED',
                name: 'HAS-BLED Score',
                category: 'cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    BloodPressure_Systolic: 120,
                    Plasma_Creatinine: 1,
                    HistoryOf_HepaticFailure: false,
                    HistoryOf_Stroke: false,
                    HistoryOf_Bleeding: false,
                    HistoryOf_UncontrolledINR: false,
                    Age: 60,
                    HASBLED_Drugs: false,
                    HistoryOf_Alcohol: false
                },
                fields: [{
                        id: 'BloodPressure_Systolic',
                        name: 'Συστολική Πίεση',
                        input: {
                            type: 'number',
                            step: 5,
                            min: 60,
                            max: 280
                        }
                    }, {
                        id: 'Plasma_Creatinine',
                        name: 'Κρεατινίνη Πλάσματος',
                        input: {
                            type: 'number',
                            step: 0.1,
                            min: 0.1,
                            max: 8
                        }
                    }, {
                        id: 'HistoryOf_HepaticFailure',
                        name: 'Ηπατική Νόσος',
                        description: 'Κίρρωση, Χολερυθρίνη>2xΦυσιολογικό, Τρανσαμινάσες>3xΦυσιολογικό',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_Stroke',
                        name: 'Ιστορικό ΑΕΕ',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_Bleeding',
                        name: 'Αιμορραγική διάθεση',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_UncontrolledINR',
                        name: 'Δύσκολα ρυθμιζόμενο INR',
                        input: {
                            type: 'check'
                        }
                    },
                    generalFields.Age, {
                        id: 'HASBLED_Drugs',
                        name: 'Φάρμακα',
                        description: 'Αντιαιμοπεταλιακά, ΜΣΑΦ',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_Alcohol',
                        name: 'Ιστορικό χρήσης Αλκοόλ',
                        input: {
                            type: 'check'
                        }
                    },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update,
                validate: function(newValue, scope, field) {
                    if (field.id === 'HASBLED_RenalFailure') {
                        var creatField = _.find(this.fields, function(field) {
                            return field.id === 'Plasma_Creatinine';
                        });
                        creatField.input.disabled = newValue;
                    }
                }
            }, {
                id: 'KillipClassEval',
                name: 'Killip Class',
                category: 'cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    KillipClass: 'I'
                },
                fields: [{
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
                    },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'NYHAClassEval',
                name: 'NYHA Class',
                category: 'cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    NYHAClass: 'I'
                },
                fields: [{
                        id: 'NYHAClass',
                        name: 'NYHA Class',
                        value: 'I',
                        input: {
                            type: 'select',
                            options: [{
                                value: 'I',
                                name: 'Class I',
                                description: 'Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα'
                            }, {
                                value: 'II',
                                name: 'Class II',
                                description: 'Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα'
                            }, {
                                value: 'III',
                                name: 'Class III',
                                description: 'Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση'
                            }, {
                                value: 'IV',
                                name: 'Class IV',
                                description: 'Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση'
                            }]
                        }
                    },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            }]);
        }
    ]);
})();
