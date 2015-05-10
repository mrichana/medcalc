
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
    factory('pulmonologyViews', ['views', 'update', 'init', 'reset',
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
                    id: 'ArterialBloodGasses',
                    name: 'Αέρια Αίματος',
                    category: 'pulmonology',
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
                },
                {
                    id: 'WellsScore',
                    name: 'Κριτήρια του Wells',
                    category: 'pulmonology pe pulmonary_embolism',
                    template: 'calculator.basic',
                    defaultValues: {
                        'HistoryOf_DVT': false,
                        'HeartRate': 70,
                        'HistoryOf_Immobilization': false,
                        'Haemoptysis': false,
                        'Cancer': false,
                        'DVT': false,
                        'PEMostLikely': false
                    },
                    fields: [{
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
                        name: 'Ακινητοποίηση ή πρόσφατο χειρουργείο',
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
                        id: 'DVT',
                        name: 'Κλινικά σημεία DVT',
                        input: {
                            type: 'check'
                        }
                    }, {
                        id: 'PEMostLikely',
                        name: 'Διάγνωση PE πιο πιθανή από εναλλακτικές',
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
                    id: 'GenevaScore',
                    name: 'Score της Γενέβης',
                    category: 'pulmonology pe pulmonary_embolism',
                    template: 'calculator.basic',
                    defaultValues: {
                        'HistoryOf_DVT': false,
                        'HeartRate': 70,
                        'HistoryOf_Immobilization': false,
                        'Haemoptysis': false,
                        'Cancer': false,
                        'UnilateralLLimbPain': false,
                        'UnilateralLLimbOedema': false,
                        'Age': 65
                    },
                    fields: [{
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
                        generalFields.Age,
                        generalFields.Result
                    ],
                    init: init,
                    reset: reset,
                    update: update
                }]);
        }
    ]);
})();
