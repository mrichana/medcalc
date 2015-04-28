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
    factory('cardiologyViews', ['views', 'update', 'init', 'reset',
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
                },
                BloodPressure_Systolic: {
                id: 'BloodPressure_Systolic',
                    name: 'Συστολική Αρτηριακή Πίεση',
                    input: {
                    type: 'number',
                        step: 5,
                        min: 60,
                        max: 280
                }
            }
            };
            return views.add([
                {
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
                    },
                    {
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
                    generalFields.Age,
                    generalFields.Sex,
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            },
                {
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
                        name: 'Σφύξεις κατά την εισαγωγή',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 20,
                            max: 280
                        }
                    },
                    generalFields.BloodPressure_Systolic, {
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
                id: 'ESCSCORE',
                name: 'ESC SCORE',
                category: 'cardiology',
                template: 'calculator.basic',
                defaultValues: {
                    Age: 65,
                    Sex: 0,
                    BloodPressure_Systolic: 120,
                    Smoker: false,
                    Cholesterol: 180
                },
                fields: [
                    generalFields.Age, generalFields.Sex, generalFields.BloodPressure_Systolic, {
                        id: 'Smoker',
                        name: 'Καπνιστής',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'Cholesterol',
                        name: 'Ολική Χοληστερίνη Ορού',
                        input: {
                            type: 'number',
                            step: 5,
                            min: 50,
                            max: 400
                        }
                    },
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
                validate: function(newValue, oldValue, scope, field) {
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
            },
                {
                id: 'EuroSCOREII',
                name: 'EuroSCORE II',
                category: 'cardiology cardiosurgery',
                template: 'calculator.basic',
                defaultValues: {
                    Age: 65,
                    Sex: 0,
                    GFR: 73,
                    HistoryOf_VascularDisease: false,
                    HistoryOf_PoorMobility: false,
                    HistoryOf_CardiacSurgery: false,
                    HistoryOf_PulmonaryDisease: false,
                    EuroSCORE_ActiveEndocarditis: false,
                    EuroSCORE_CriticalState: false,
                    HistoryOf_Diabetes: false,
                    NYHAClass: 'I',
                    AnginaAtRest: false,
                    LVEF: 60,
                    EuroSCORE_MIinTheLast90Days: false,
                    PASP: 40,
                    EuroSCOREII_Emergency: 0,
                    EuroSCOREII_OperationWeight: 0,
                    EuroSCORE_ThoracicAorta: false

                },
                fields: [
                    generalFields.Age,
                    generalFields.Sex, {
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
                        id: 'HistoryOf_VascularDisease',
                        name: 'Εξωκαρδιακή Αρτηριοπάθεια',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'HistoryOf_PoorMobility',
                        name: 'Σοβαρά Μειωμένη Κινητικότητα',
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
                        id: 'HistoryOf_PulmonaryDisease',
                        name: 'Χ.Α.Π.',
                        input: {
                            type: 'check'
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
                        id: 'HistoryOf_Diabetes',
                        name: 'Σακχαρώδης Διαβήτης ύπο ινσουλίνη',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'NYHAClass',
                        name: 'NYHA Class',
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
                        id: 'EuroSCOREII_Emergency',
                        name: 'Επείγουσα Επέμβαση',
                        input: {
                            type: 'select',
                            options: [{
                                name: 'Προγραμματισμένη',
                                value: 0
                            }, {
                                name: 'Επείγουσα',
                                value: 1
                            }, {
                                name: 'Κατεπείγουσα',
                                value: 2
                            }, {
                                name: 'Διάσωσης',
                                value: 3
                            }]
                        }
                    }, {
                        id: 'EuroSCOREII_OperationWeight',
                        name: 'Βαρύτητα Επέμβασης',
                        input: {
                            type: 'select',
                            options: [{
                                name: 'Απλή αορτοστεφανιαία παράκαμψη',
                                value: 0
                            }, {
                                name: 'Απλή μη αορτοστεφανιαία παράκαμψη',
                                value: 1
                            }, {
                                name: 'Διπλή Επέμβαση',
                                value: 2
                            }, {
                                name: 'Τριπλή Επέμβαση',
                                value: 3
                            }]
                        }
                    }, {
                        id: 'EuroSCORE_ThoracicAorta',
                        name: 'Επέμβαση Θωρακικής Αορτής',
                        input: {
                            type: 'check'
                        }
                    },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            },
                {
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
                    }, generalFields.BloodPressure_Systolic, {
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
            },
                {
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
                fields: [
                    generalFields.BloodPressure_Systolic,
                    {
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
                validate: function(newValue, oldValue, scope, field) {
                    if (field.id === 'HASBLED_RenalFailure') {
                        var creatField = _.find(this.fields, function(field) {
                            return field.id === 'Plasma_Creatinine';
                        });
                        creatField.input.disabled = newValue;
                    }
                }
            },
                {
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
            },
                {
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
                },
                {
                id: 'QTc',
                name: 'Διορθωμένο QT',
                category: 'ecg',
                template: 'calculator.basic',
                defaultValues: {
                    HeartRate: 70,
                    QT: 400
                },
                fields: [{
                    id: 'QT',
                    name: 'Διάστημα QT',
                    calculator: 'QT',
                    input: {
                        type: 'number',
                        step: 10,
                        min: 200,
                        max: 1000
                    }
                }, {
                    id: 'HeartRate',
                    name: 'Σφύξεις',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 20,
                        max: 280
                    }
                },
                    generalFields.Result
                ],
                init: init,
                reset: reset,
                update: update
            },
                {
                    id: 'QT',
                    name: 'mm σε msec',
                    category: 'hiddencalculator',
                    template: 'calculator.basic',
                    defaultValues: {
                        QTmm: 10,
                        paperSpeed: 25
                    },
                    fields: [{
                        id: 'QTmm',
                        name: 'Διάστημα (mm)',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 1,
                            max: 1000
                        }
                    }, {
                        id: 'paperSpeed',
                        name: 'Ταχύτητα χαρτιού (mm/sec)',
                        input: {
                            type: 'select',
                            options: [
                                {name:'25', value:25},
                                {name:'50', value: 50}
                            ]
                        }
                    },
                        generalFields.Result
                    ],
                    init: init,
                    reset: reset,
                    update: update
                },
                {
                    id: 'Sokolow',
                    name: 'Δείκτης Sokolow-Lyon',
                    category: 'ecg',
                    template: 'calculator.basic',
                    defaultValues: {
                        V1S: 10,
                        V5R: 10,
                        V6R: 10,
                        aVLR: 10
                    },
                    fields: [{
                        id: 'V1S',
                        name: 'Κύμα S στην V1 (mV)',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 1,
                            max: 50
                        }
                    }, {
                        id: 'V5R',
                        name: 'Κύμα R στην V5 (mV)',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 1,
                            max: 50
                        }
                    }, {
                        id: 'V6R',
                        name: 'Κύμα R στην V6 (mV)',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 1,
                            max: 50
                        }
                    }, {
                        id: 'aVLR',
                        name: 'Κύμα R στην aVL (mV)',
                        input: {
                            type: 'number',
                            step: 1,
                            min: 1,
                            max: 50
                        }
                    },
                        generalFields.Result
                    ],
                    init: init,
                    reset: reset,
                    update: update
                },
                {
                id: 'HeartRate',
                name: 'Καρδιακή Συχνότητα',
                category: 'ecg',
                template: 'calculator.basic',
                defaultValues: {
                    HRQRS2QRSmm: 21,
                    HRcycles: 1,
                    paperSpeed: 25
                },
                fields: [{
                    id: 'HRQRS2QRSmm',
                    name: 'Απόσταση από QRS σε QRS(mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 100
                    }
                }, {
                    id: 'HRcycles',
                    name: 'Αριθμός κύκλων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 10
                    }
                }, {
                    id: 'paperSpeed',
                    name: 'Ταχύτητα χαρτιού (mm/sec)',
                    input: {
                        type: 'select',
                        options: [
                            {name:'25', value:25},
                            {name:'50', value: 50}
                        ]
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
