var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var ESCSCORE = (function (_super) {
        __extends(ESCSCORE, _super);
        function ESCSCORE() {
            _super.apply(this, arguments);
            this.id = 'ESCSCORE';
            this.name = 'EuroHeart SCORE';
            this.category = 'cardiology nstemi';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Age: 65,
                Sex: 0,
                BloodPressure_Systolic: 120,
                Smoker: false,
                Cholesterol: 180
            };
            this.fields = [
                CalculatorViews.ageField,
                CalculatorViews.sexField,
                CalculatorViews.bloodPressure_SystolicField, {
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
                CalculatorViews.resultField
            ];
            this.results = {
                female: {
                    nonsmoker: [
                        [
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 1, 1, 1],
                            [1, 1, 1, 1, 1]
                        ],
                        [
                            [0, 0, 1, 1, 1],
                            [1, 1, 1, 1, 1],
                            [1, 1, 1, 1, 1],
                            [1, 1, 2, 2, 2]
                        ],
                        [
                            [1, 1, 1, 1, 1],
                            [1, 1, 1, 2, 2],
                            [2, 2, 2, 2, 3],
                            [3, 3, 3, 4, 4]
                        ],
                        [
                            [1, 1, 2, 2, 2],
                            [2, 2, 2, 3, 3],
                            [3, 3, 4, 4, 5],
                            [4, 5, 6, 6, 7]
                        ]
                    ],
                    smoker: [
                        [
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1],
                            [1, 1, 1, 1, 1],
                            [1, 1, 1, 1, 1],
                            [1, 1, 2, 2, 2]
                        ],
                        [
                            [1, 1, 1, 1, 1],
                            [1, 1, 1, 2, 2],
                            [2, 2, 2, 3, 3],
                            [3, 3, 3, 4, 4]
                        ],
                        [
                            [1, 2, 2, 2, 3],
                            [2, 2, 3, 3, 4],
                            [3, 4, 4, 5, 5],
                            [5, 5, 6, 7, 8]
                        ],
                        [
                            [3, 3, 3, 4, 4],
                            [4, 4, 5, 6, 7],
                            [6, 6, 7, 8, 10],
                            [9, 9, 11, 12, 14]
                        ]
                    ]
                },
                male: {
                    nonsmoker: [
                        [
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 1, 1],
                            [0, 1, 1, 1, 1]
                        ],
                        [
                            [1, 1, 1, 1, 1],
                            [1, 1, 1, 1, 2],
                            [1, 1, 2, 2, 2],
                            [2, 2, 3, 3, 4]
                        ],
                        [
                            [1, 1, 1, 2, 2],
                            [1, 2, 2, 2, 3],
                            [2, 2, 3, 3, 4],
                            [3, 4, 4, 5, 6]
                        ],
                        [
                            [2, 2, 2, 3, 3],
                            [2, 3, 3, 4, 4],
                            [3, 4, 5, 5, 6],
                            [5, 6, 7, 8, 9]
                        ],
                        [
                            [2, 3, 3, 4, 5],
                            [4, 4, 5, 6, 7],
                            [5, 6, 7, 8, 10],
                            [8, 9, 10, 12, 14]
                        ]
                    ],
                    smoker: [
                        [
                            [0, 0, 0, 1, 1],
                            [0, 1, 1, 1, 1],
                            [1, 1, 1, 1, 1],
                            [1, 1, 1, 2, 2]
                        ],
                        [
                            [1, 1, 2, 2, 2],
                            [2, 2, 2, 3, 3],
                            [2, 3, 3, 4, 5],
                            [4, 4, 5, 6, 7]
                        ],
                        [
                            [2, 2, 3, 3, 4],
                            [3, 3, 4, 5, 6],
                            [4, 5, 6, 7, 8],
                            [6, 7, 8, 10, 12]
                        ],
                        [
                            [3, 4, 4, 5, 6],
                            [5, 5, 6, 7, 9],
                            [7, 8, 9, 11, 13],
                            [10, 11, 13, 15, 18]
                        ],
                        [
                            [5, 5, 6, 8, 9],
                            [7, 8, 9, 11, 13],
                            [10, 12, 14, 16, 19],
                            [15, 17, 20, 23, 26]
                        ]
                    ]
                }
            };
        }
        ESCSCORE.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            var results = this.results[(!values.sex) ? 'male' : 'female'][(values.Smoker) ? 'smoker' : 'nonsmoker'];
            if (values.Age < 45) {
                results = results[0];
            }
            else if (values.Age < 53) {
                results = results[1];
            }
            else if (values.Age < 58) {
                results = results[2];
            }
            else if (values.Age < 62) {
                results = results[3];
            }
            else {
                results = results[4];
            }
            if (values.BloodPressure_Systolic < 130) {
                results = results[0];
            }
            else if (values.BloodPressure_Systolic < 150) {
                results = results[1];
            }
            else if (values.BloodPressure_Systolic < 170) {
                results = results[2];
            }
            else {
                results = results[3];
            }
            if (values.Cholesterol < 150) {
                ret.result = results[0];
            }
            else if (values.Cholesterol < 200) {
                ret.result = results[1];
            }
            else if (values.Cholesterol < 250) {
                ret.result = results[2];
            }
            else if (values.Cholesterol < 300) {
                ret.result = results[3];
            }
            else {
                ret.result = results[4];
            }
            if (ret.result < 2) {
                ret.resultlevel = 1;
            }
            else if (ret.result < 5) {
                ret.resultlevel = 2;
            }
            else {
                ret.resultlevel = 3;
            }
            ret.suffix = '%';
            ret.explanation = 'Πιθανότητα θανατηφόρου καρδιαγγειακού συμβάματος στην δεκαετία';
            return ret;
        };
        ;
        ESCSCORE.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('ESCSCORE', 'EuroHeart SCORE', 'cardiology nstemi', ESCSCORE)); })();
        return ESCSCORE;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=ESCSCORE.js.map