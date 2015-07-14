var filters;
(function (filters) {
    'use strict';
    ;
    function to_trusted($sce) {
        this.$inject = ["$sce"];
        return function (text) {
            return $sce.trustAsHtml(angular.isDefined(text) ? '' + text : '');
        };
    }
    filters.to_trusted = to_trusted;
    ;
})(filters || (filters = {}));
//# sourceMappingURL=filters.js.map