(function() {
    'use strict';
    var app;

    app = angular.module('ngModal', []);

    app.provider('ngModalDefaults', function() {
        return {
            options: {
                closeButtonHtml: '<span class="ng-modal-close-x">X</span>'
            },
            $get: function() {
                return this.options;
            },
            set: function(keyOrHash, value) {
                var k, v, _results;
                if (typeof keyOrHash === 'object') {
                    _results = [];
                    for (k in keyOrHash) {
                        v = keyOrHash[k];
                        _results.push(this.options[k] = v);
                    }
                    return _results;
                } else {
                    this.options[keyOrHash] = value;
                    return value;
                }
            }
        };
    });

    app.directive('modalDialog', [
        'ngModalDefaults', '$sce',
        function(ngModalDefaults, $sce) {
            return {
                restrict: 'E',
                scope: {
                    show: '=',
                    dialogTitle: '@',
                    onClose: '&?'
                },
                replace: true,
                transclude: true,
                link: function(scope, element, attrs) {
                    var setupCloseButton, setupStyle;
                    setupStyle = function() {
                        scope.dialogStyle = {};
                        if (attrs.width) {
                            scope.dialogStyle.width = attrs.width;
                        }
                        if (attrs.height) {
                            scope.dialogStyle.height = attrs.height;
                            return scope.dialogStyle.height;
                        }
                    };
                    scope.$watch('show', function(newVal, oldVal) {
                        if (newVal && !oldVal) {
                            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                        } else {
                            document.getElementsByTagName('body')[0].style.overflow = '';
                        }
                        if ((!newVal && oldVal) && (scope.onClose !== null)) {
                            return scope.onClose();
                        }
                    });
                    return setupStyle();
                },
                templateUrl: 'partials/modalDialog.html'
            };
        }
    ]);

}).call(this);
