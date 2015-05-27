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
                id: 'Triplex_LeftAtrium_Volume',
                name: 'Left Atrial Volume',
                category: 'triplex atrium volume',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LeftAtrium_Area4Ch: 15,
                    Triplex_LeftAtrium_Area2Ch: 15,
                    Triplex_LeftAtrium_Length: 40
                },
                fields: [{
                    id: 'Triplex_LeftAtrium_Area4Ch',
                    name: 'A1(cm<sup>2</sup>)',
                    description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 4 κοιλοτήτων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'Triplex_LeftAtrium_Area2Ch',
                    name: 'A2(cm<sup>2</sup>)',
                    description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 2 κοιλοτήτων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'Triplex_LeftAtrium_Length',
                    name: 'L(mm)',
                    description: 'Μήκος αριστερού κόλπου',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
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
                    url: 'images/lav.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_LeftAtrium_Volume_Index',
                name: 'Left Atrial Volume Index',
                category: 'triplex atrium volume index',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LeftAtrium_Area4Ch: 15,
                    Triplex_LeftAtrium_Area2Ch: 15,
                    Triplex_LeftAtrium_Length: 40,
                    BSA: 1.82
                },
                fields: [{
                    id: 'Triplex_LeftAtrium_Area4Ch',
                    name: 'A1(cm<sup>2</sup>)',
                    description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 4 κοιλοτήτων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'Triplex_LeftAtrium_Area2Ch',
                    name: 'A2(cm<sup>2</sup>)',
                    description: 'Πλανιμέτρηση αριστερού κόλπου από εικόνα 2 κοιλοτήτων',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'Triplex_LeftAtrium_Length',
                    name: 'L(mm)',
                    description: 'Μήκος αριστερού κόλπου',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 5,
                        max: 80
                    }
                }, {
                    id: 'BSA',
                    name: 'BSA (m<sup>2</sup>)',
                    calculator: 'BSA',
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
                    url: 'images/lav.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_AorticValve_VelocityRatio_Vmax',
                name: 'Aortic Valve Vmax Ratio',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LVOT_Vmax: 1,
                    Triplex_AorticValve_Vmax: 1
                },
                fields: [{
                    id: 'Triplex_LVOT_Vmax',
                    name: 'LVOT Vmax<sub>1</sub> (m/s)',
                    description: 'Υποβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'Triplex_AorticValve_Vmax',
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
                    url: 'images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_AorticValve_VelocityRatio_VTI',
                name: 'Aortic Valve VTI Ratio',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LVOT_VTI: 25,
                    Triplex_AorticValve_VTI: 25
                },
                fields: [{
                    id: 'Triplex_LVOT_VTI',
                    name: 'LVOT VTI<sub>1</sub> (m)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 10,
                        max: 100
                    }
                }, {
                    id: 'Triplex_AorticValve_VTI',
                    name: 'AV VΤΙ<sub>2</sub> (m)',
                    description: 'Διαβαλβιδικό Ολοκλήρωμα Ταχύτητας Χρόνου',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 10,
                        max: 400
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
                    url: 'images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_AorticValve_Area_VTI',
                name: 'Aortic Valve Area (VTI)',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LVOT_Diameter: 20,
                    Triplex_LVOT_VTI: 20,
                    Triplex_AorticValve_VTI: 40
                },
                fields: [{
                    id: 'Triplex_LVOT_Diameter',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'Triplex_LVOT_VTI',
                    name: 'LVOT VTI<sub>1</sub> (cm)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
                    }
                }, {
                    id: 'Triplex_AorticValve_VTI',
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
                    url: 'images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_AorticValve_Area_Vmax',
                name: 'Aortic Valve Area (Vmax)',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LVOT_Diameter: 20,
                    Triplex_LVOT_Vmax: 1,
                    Triplex_AorticValve_Vmax: 1
                },
                fields: [{
                    id: 'Triplex_LVOT_Diameter',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'Triplex_LVOT_Vmax',
                    name: 'LVOT Vmax<sub>1</sub> (m/s)',
                    description: 'Υποβαλβιδική Μέγιστη Ταχύτητα',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                }, {
                    id: 'Triplex_AorticValve_Vmax',
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
                    url: 'images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_AorticValve_Impedance',
                name: 'Aorto-Valvular Impedance (Zva)',
                category: 'triplex valvular aortic stenosis',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LVOT_Diameter: 20,
                    Triplex_LVOT_VTI: 20,
                    BSA: 1.82,
                    BloodPressure_Systolic: 120,
                    Triplex_AorticValve_Vmean: 1
                },
                fields: [{
                    id: 'Triplex_LVOT_Diameter',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'Triplex_LVOT_VTI',
                    name: 'LVOT VTI<sub>1</sub> (cm)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
                    }
                }, {
                    id: 'BSA',
                    name: 'BSA (m<sup>2</sup>)',
                    calculator: 'BSA',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 3
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
                    id: 'Triplex_AorticValve_Vmean',
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
                    url: 'images/AVVR.png'
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_Stroke_Volume',
                name: 'Stroke Volume (SV)',
                category: 'triplex valvular aortic stenosis stroke volume',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LVOT_Diameter: 20,
                    Triplex_LVOT_VTI: 20
                },
                fields: [{
                    id: 'Triplex_LVOT_Diameter',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'Triplex_LVOT_VTI',
                    name: 'LVOT VTI<sub>1</sub> (cm)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα',
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
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_Stroke_Volume_Index',
                name: 'Stroke Volume Index (SVi)',
                category: 'triplex valvular aortic stenosis stroke volume',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_LVOT_Diameter: 20,
                    Triplex_LVOT_VTI: 20,
                    BSA: 1.82
                },
                fields: [{
                    id: 'Triplex_LVOT_Diameter',
                    name: 'Διάμετρος LVOT (mm)',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 50
                    }
                }, {
                    id: 'Triplex_LVOT_VTI',
                    name: 'LVOT VTI<sub>1</sub> (cm)',
                    description: 'Υποβαλβιδικό Ολοκλήρωμα',
                    input: {
                        type: 'number',
                        step: 1,
                        min: 1,
                        max: 100
                    }
                }, {
                    id: 'BSA',
                    name: 'BSA (m<sup>2</sup>)',
                    calculator: 'BSA',
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
                }],
                init: init,
                reset: reset,
                update: update
            }, {
                id: 'Triplex_AorticValve_Regurgitation',
                name: 'Aortic Valve Regurgitation',
                category: 'triplex valvular aortic regurgitation',
                template: 'calculator.basic',
                defaultValues: {
                    Triplex_AorticValve_Regurgitation_VenaContracta_Width: 0.0,
                    Triplex_AorticValve_Regurgitation_PHT: 550
                },
                fields: [{
                    id: 'Triplex_AorticValve_Regurgitation_VenaContracta_Width',
                    name: 'Vena Contracta Width (cm)',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.0,
                        max: 1.5
                    }
                }, {
                    id: 'Triplex_AorticValve_Regurgitation_PHT',
                    name: 'Pressure Half Time (ms)',
                    input: {
                        type: 'number',
                        step: 10,
                        min: 10,
                        max: 1000
                    }
                }, {
                    id: 'result',
                    input: {
                        type: 'multiresult'
                    }
                }],
                init: init,
                reset: reset,
                update: update
            }]);
        }
    ]);
})();
