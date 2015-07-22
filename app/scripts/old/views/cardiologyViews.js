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
    factory('cardiologyViews', ['views', 'update', 'init', 'reset',
        function(views, update, init, reset) {
            return views.add([

                {
                    id: 'QT',
                    name: 'mm σε msec',
                    category: 'hiddencalculator',
                    template: 'calculator.basic',
                    defaultValues: {
                        QTmm: 10,
                        paperSpeed: 25
                    },
                    fields: [
                        generalFields.Result
                    ],
                    init: init,
                    reset: reset,
                    update: update
                }
            }]);
        }
    ]);
})();
