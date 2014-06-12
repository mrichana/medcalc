/*global angular: true */
(function() {
    'use strict';
    /**
     * calculators Module
     *
     * Available calculators
     */
    angular.module('medical.views').
    factory('triplexViews', ['views', 'update', 'init', 'reset',
        function(views, update, init, reset) {
            return views.add([{
                id: 'lavi',
                name: 'Left Atrium Volume Index',
                category: 'triplex atrium',
                template: 'calculator.basic',
                defaultValues: {
                    area4Ch: 15,
                    area2Ch: 15,
                    leftAtriumLength: 40,
                    bsa: 1.8
                },
                fields: [{
                    id: 'area4Ch',
                    name: 'A1(cm<sup>2</sup>)',
                    description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 4 κοιλοτήτων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'area2Ch',
                    name: 'A2(cm<sup>2</sup>)',
                    description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 2 κοιλοτήτων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'leftAtriumLength',
                    name: 'L(mm)',
                    description: 'Μήκος αριστερού κόλπου',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'bsa',
                    name: 'BSA (m<sup>2</sup>)',
                    calculator: 'bsa',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 3
                    }
                }, {
                    id: 'result',
                    input: {
                        type: 'result'
                    }
                }, {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: '/images/lav.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'avvr',
                name: 'Aortic Valve Velocity Ratio',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    LVOTV: 1,
                    AoV: 1
                },
                fields: [{
                    id: 'LVOTV',
                    name: 'LVOT Vmax<sub>1</sub> (m/s)',
                    description: 'Υποβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'AoV',
                    name: 'AV Vmax<sub>2</sub> (m/s)',
                    description: 'Διαβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'result',
                    input: {
                        type: 'result'
                    }
                }, {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: '/images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'avavti',
                name: 'Aortic Valve Area (VTI)',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    LVOT: 20,
                    LVOTVTI: 20,
                    AoVTI: 40
                },
                fields: [{
                    id: 'LVOT',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'LVOTVTI',
                    name: 'LVOT VTI<sub>1</sub> (cm)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
                    }
                }, {
                    id: 'AoVTI',
                    name: 'AV VTI<sub>2</sub> (cm)',
                    description: 'Διαβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
                    }
                }, {
                    id: 'result',
                    input: {
                        type: 'result'
                    }
                }, {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: '/images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'avamax',
                name: 'Aortic Valve Area (Vmax)',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    LVOT: 20,
                    LVOTV: 1,
                    AoV: 1
                },
                fields: [{
                    id: 'LVOT',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'LVOTV',
                    name: 'LVOT Vmax<sub>1</sub> (m/s)',
                    description: 'Υποβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'AoV',
                    name: 'AV Vmax<sub>2</sub> (m/s)',
                    description: 'Διαβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'result',
                    input: {
                        type: 'result'
                    }
                }, {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: '/images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Zva',
                name: 'Αορτοβαλβιδική Αντίσταση (Zva)',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    LVOT: 20,
                    LVOTVTI: 20,
                    bsa: 1.9,
                    sbp: 120,
                    AoVmean: 1
                },
                fields: [{
                    id: 'LVOT',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'LVOTVTI',
                    name: 'LVOT VTI<sub>1</sub> (cm)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
                    }
                }, {
                    id: 'bsa',
                    name: 'BSA (m<sup>2</sup>)',
                    calculator: 'bsa',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 3
                    }
                }, {
                    id: 'sbp',
                    name: 'Σ.Α.Π. (mmHg)',
                    description: 'Συστηματική Συστολική Αρτηριακή Πίεση',
                    input: {
                        type: 'number',
                        step: 5,
                        min: 60,
                        max: 220
                    }
                }, {
                    id: 'AoVmean',
                    name: 'AV Vmean(m/s)',
                    description: 'Διαβαλβιδική Μέση Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'result',
                    input: {
                        type: 'result'
                    }
                }, {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: '/images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }]);
        }
    ]);
})();
