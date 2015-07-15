var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Triplex_LeftAtrium_Volume_Index = (function (_super) {
        __extends(Triplex_LeftAtrium_Volume_Index, _super);
        function Triplex_LeftAtrium_Volume_Index() {
            _super.apply(this, arguments);
            this.id = 'Triplex_LeftAtrium_Volume_Index';
            this.name = 'Left Atrial Volume Index';
            this.category = 'triplex';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_LeftAtrium_Area4Ch: 15,
                Triplex_LeftAtrium_Area2Ch: 15,
                Triplex_LeftAtrium_Length: 40,
                BSA: 1.82
            };
            this.fields = [
                {
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
                }, CalculatorViews.resultField, {
                    id: 'image',
                    input: {
                        type: 'image'
                    },
                    url: 'images/lav.png'
                }
            ];
        }
        Triplex_LeftAtrium_Volume_Index.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.formula = '8 * Triplex_LeftAtrium_Area4Ch * Triplex_LeftAtrium_Area2Ch / ( 3 * pi * ( Triplex_LeftAtrium_Length / 10 )) / BSA';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            if (ret.result >= 40) {
                ret.explanation = 'Μεγάλη διάταση αριστερού κόλπου';
                ret.resultlevel = 3;
            }
            else if (ret.result >= 34) {
                ret.explanation = 'Μέτρια διάταση αριστερού κόλπου';
                ret.resultlevel = 2;
            }
            else if (ret.result >= 29) {
                ret.explanation = 'Μικρή διάταση αριστερού κόλπου';
                ret.resultlevel = 1;
            }
            else if (ret.result >= 16) {
                ret.explanation = 'Φυσιολογικές διάστασεις αριστερού κόλπου';
                ret.resultlevel = 0;
            }
            else {
                ret.explanation = 'Υπερβολικά χαμηλή τιμή - Πιθανό λάθος μετρήσεως';
                ret.resultlevel = 3;
            }
            return ret;
        };
        ;
        Triplex_LeftAtrium_Volume_Index.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Triplex_LeftAtrium_Volume_Index()]); })();
        return Triplex_LeftAtrium_Volume_Index;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Triplex_LeftAtrium_Volume_Index.js.map