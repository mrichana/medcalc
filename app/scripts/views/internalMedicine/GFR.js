var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var GFR = (function (_super) {
        __extends(GFR, _super);
        function GFR() {
            _super.apply(this, arguments);
            this.id = 'GFR';
            this.name = 'GFR';
            this.category = 'generic';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Plasma_Creatinine: 1.0,
                Age: 65,
                Weight: 70,
                Sex: 0
            };
            this.fields = [
                {
                    id: 'Plasma_Creatinine',
                    name: 'Κρεατινίνη Πλάσματος',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.1,
                        max: 8
                    }
                },
                CalculatorViews.ageField,
                CalculatorViews.weightField,
                CalculatorViews.sexField,
                CalculatorViews.resultField
            ];
        }
        GFR.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            if (values.Sex === 0) {
                values['GFR_Sex'] = 1;
            }
            else {
                values['GFR_Sex'] = 0.85;
            }
            ret.formula = '((140 - Age) * Weight * GFR_Sex ) / ( 72 * Plasma_Creatinine )';
            ret.result = CalculatorViews.View.roundNum(CalculatorViews.View.evaluator(values, ret.formula));
            if (ret.result < 15) {
                ret.explanation = 'Νεφρική ανεπάρκεια';
                ret.resultlevel = 3;
            }
            else if (ret.result < 30) {
                ret.explanation = 'Νεφρική βλάβη με σοβαρή μείωση του GFR';
                ret.resultlevel = 3;
            }
            else if (ret.result < 60) {
                ret.explanation = 'Νεφρική βλάβη με μέτρια μείωση του GFR';
                ret.resultlevel = 2;
            }
            else if (ret.result < 90) {
                ret.explanation = 'Νεφρική βλάβη με ήπια μείωση του GFR';
                ret.resultlevel = 1;
            }
            else {
                ret.explanation = 'Φυσιολογική νεφρική λειτουργία';
                ret.resultlevel = 0;
            }
            return ret;
        };
        ;
        GFR.Ctor = (function () { return CalculatorViews.viewsCollection.add([new GFR()]); })();
        return GFR;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=GFR.js.map