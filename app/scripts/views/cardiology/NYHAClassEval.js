var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var NYHAClassEval = (function (_super) {
        __extends(NYHAClassEval, _super);
        function NYHAClassEval() {
            _super.apply(this, arguments);
            this.id = 'NYHAClassEval';
            this.name = 'NYHA Class';
            this.category = 'cardiology hf';
            this.template = 'calculator.basic';
            this.defaultValues = {
                NYHAClass: 'I'
            };
            this.fields = [
                {
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
                }, CalculatorViews.resultField
            ];
        }
        NYHAClassEval.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            var result = values.NYHAClass;
            if (result === 'IV') {
                ret.explanation = 'Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση';
                ret.resultlevel = 3;
            }
            if (result === 'III') {
                ret.explanation = 'Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση';
                ret.resultlevel = 2;
            }
            if (result === 'II') {
                ret.explanation = 'Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα';
                ret.resultlevel = 1;
            }
            if (result === 'I') {
                ret.explanation = 'Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα';
                ret.resultlevel = 0;
            }
            return ret;
        };
        ;
        NYHAClassEval.Ctor = (function () { return CalculatorViews.viewsCollection.add(new CalculatorViews.ViewDescription('NYHAClassEval', 'NYHA Class', 'cardiology hf', NYHAClassEval)); })();
        return NYHAClassEval;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=NYHAClassEval.js.map