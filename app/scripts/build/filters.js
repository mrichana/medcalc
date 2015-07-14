var filters;
(function (filters) {
    'use strict';
    ;
    function to_trusted($sce) {
        return function (text) {
            return $sce.trustAsHtml(angular.isDefined(text) ? '' + text : '');
        };
    }
    filters.to_trusted = to_trusted;
    ;
    to_trusted.$inject = ['$sce'];
})(filters || (filters = {}));
//# sourceMappingURL=filters.js.map