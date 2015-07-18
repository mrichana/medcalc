var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var KillipClassEval = (function (_super) {
        __extends(KillipClassEval, _super);
        function KillipClassEval() {
            _super.apply(this, arguments);
            this.id = 'KillipClassEval';
            this.name = 'Killip Class';
            this.category = 'cardiology';
            this.template = 'calculator.basic';
            this.defaultValues = {
                KillipClass: 'I'
            };
            this.fields = [
                {
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
                                description: 'Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικών Φλεβών'
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
                CalculatorViews.resultField
            ];
        }
        KillipClassEval.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            var result = values.KillipClass;
            switch (result) {
                case 'I':
                    ret.explanation = 'Απουσία κλινικών σημείων καρδιακής ανεπάρκειας';
                    ret.resultlevel = 0;
                    break;
                case 'II':
                    ret.explanation = 'Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικών Φλεβών';
                    ret.resultlevel = 1;
                    break;
                case 'III':
                    ret.explanation = 'Οξύ Πνευμονικό Οίδημα';
                    ret.resultlevel = 2;
                    break;
                case 'IV':
                    ret.explanation = 'Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)';
                    ret.resultlevel = 3;
                    break;
            }
            ret.result = '';
            return ret;
        };
        ;
        KillipClassEval.Ctor = (function () { return CalculatorViews.viewsCollection.add([new KillipClassEval()]); })();
        return KillipClassEval;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=KillipClassEval.js.map