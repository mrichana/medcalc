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
                category: 'generic',
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
                id: 'GFR',
                name: 'GFR',
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
            }]);
        }
    ]);
})();
