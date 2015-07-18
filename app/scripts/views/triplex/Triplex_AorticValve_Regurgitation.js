var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalculatorViews;
(function (CalculatorViews) {
    'use strict';
    var Triplex_AorticValve_Regurgitation_VC = (function (_super) {
        __extends(Triplex_AorticValve_Regurgitation_VC, _super);
        function Triplex_AorticValve_Regurgitation_VC() {
            _super.apply(this, arguments);
            this.id = 'Triplex_AorticValve_Regurgitation_VC';
            this.name = 'Aortic Valve Regurgitation (Vena Contracta)';
            this.category = 'triplex';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_AorticValve_Regurgitation_VenaContracta_Width: 0.0,
            };
            this.fields = [
                {
                    id: 'Triplex_AorticValve_Regurgitation_VenaContracta_Width',
                    name: 'Vena Contracta Width (cm)',
                    input: {
                        type: 'number',
                        step: 0.1,
                        min: 0.0,
                        max: 1.5
                    }
                },
                CalculatorViews.resultField
            ];
        }
        Triplex_AorticValve_Regurgitation_VC.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = values.Triplex_AorticValve_Regurgitation_VenaContracta_Width;
            if (values.Triplex_AorticValve_Regurgitation_VenaContracta_Width > 0.6) {
                ret.explanation = 'Σοβαρή Ανεπάρκεια';
                ret.resultlevel = 3;
            }
            else if (values.Triplex_AorticValve_Regurgitation_VenaContracta_Width > 0.3) {
                ret.explanation = 'Μέτρια Ανεπάρκεια';
                ret.resultlevel = 2;
            }
            else {
                ret.explanation = 'Μικρή Ανεπάρκεια';
                ret.resultlevel = 1;
            }
            return ret;
        };
        ;
        Triplex_AorticValve_Regurgitation_VC.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Triplex_AorticValve_Regurgitation_VC()]); })();
        return Triplex_AorticValve_Regurgitation_VC;
    })(CalculatorViews.View);
    var Triplex_AorticValve_Regurgitation_PHT = (function (_super) {
        __extends(Triplex_AorticValve_Regurgitation_PHT, _super);
        function Triplex_AorticValve_Regurgitation_PHT() {
            _super.apply(this, arguments);
            this.id = 'Triplex_AorticValve_Regurgitation_PHT';
            this.name = 'Aortic Valve Regurgitation (PHT)';
            this.category = 'triplex';
            this.template = 'calculator.basic';
            this.defaultValues = {
                Triplex_AorticValve_Regurgitation_PHT: 550
            };
            this.fields = [
                {
                    id: 'Triplex_AorticValve_Regurgitation_PHT',
                    name: 'Pressure Half Time (ms)',
                    input: {
                        type: 'number',
                        step: 10,
                        min: 10,
                        max: 1000
                    }
                }, CalculatorViews.resultField
            ];
        }
        Triplex_AorticValve_Regurgitation_PHT.prototype.calculator = function (values) {
            var ret = new CalculatorViews.Result();
            ret.result = values.Triplex_AorticValve_Regurgitation_PHT;
            if (values.Triplex_AorticValve_Regurgitation_PHT < 200) {
                ret.explanation = 'Σοβαρή Ανεπάρκεια';
                ret.resultlevel = 3;
            }
            else if (values.Triplex_AorticValve_Regurgitation_PHT < 500) {
                ret.explanation = 'Μέτρια Ανεπάρκεια';
                ret.resultlevel = 2;
            }
            else {
                ret.explanation = 'Μικρή Ανεπάρκεια';
                ret.resultlevel = 1;
            }
            return ret;
        };
        ;
        Triplex_AorticValve_Regurgitation_PHT.Ctor = (function () { return CalculatorViews.viewsCollection.add([new Triplex_AorticValve_Regurgitation_PHT()]); })();
        return Triplex_AorticValve_Regurgitation_PHT;
    })(CalculatorViews.View);
})(CalculatorViews || (CalculatorViews = {}));
//# sourceMappingURL=Triplex_AorticValve_Regurgitation.js.map