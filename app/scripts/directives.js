/*global angular: true */
/*global _: true */
/*global $: true */

(function() {
    'use strict';

    var scrollFunction = function (item) {
            item = $(item);
            var parent = item.closest('.scrollable-content');
            var top = parent.scrollTop() + item.offset().top - parent.offset().top;
            parent.animate({
                scrollTop: top
            }, 1800);
    }

    /* Directives */
    angular.module('medical.directives', [])
        .directive('scrollto', [
            function() {
                return function(scope, elm, attrs) {
                    elm.bind('click', function(e) {
                        e.preventDefault();
                        if (attrs.href) {
                            attrs.scrollto = attrs.href;
                        }
                        var item = $(attrs.scrollto);
                        scrollFunction(item);
                    });
                };
            }
        ])
        .directive('affix', ['$window',
            function($window) {
                return {
                    restrict: 'A',
                    link: function($scope, elem, attrs) {
                        $($window).scroll(function() {
                            var scroll = $window.scrollY;
                            var $body, offset, padding;
                            if (scroll > elem.offset().top) {
                                this.originalOffset = elem.offset().top;
                                $body = $('body');
                                padding = parseInt($body.css('padding-top'), 10);
                                offset = parseInt(attrs.affixOffset, 10);
                                $body.css('padding-top', padding + offset);
                                elem.addClass(attrs.affix || 'affix');
                            }
                            if (scroll < this.originalOffset) {
                                $body = $('body');
                                offset = parseInt(attrs.affixOffset, 10);
                                padding = parseInt($body.css('padding-top'), 10);
                                $body.css('padding-top', padding - offset);
                                elem.removeClass(attrs.affix || 'affix');
                            }
                        });
                    }
                };
            }
        ])
        .directive('scrollSpy', [

            function() {
                return {
                    restrict: 'A',
                    link: function($scope, elem, attrs) {
                        var parent = $('.scroll-spy-target');
                        var scrollHandler = function() {
                            var element = $(attrs.scrollSpy);
                            var parent = $('.scroll-spy-target');
                            if (!element.length) {
                                parent.off('scroll', scrollHandler);
                                return;
                            }
                            var parentHalf = parent.height() / 2;
                            var elementPos = element.offset().top - parent.offset().top;
                            if ((elementPos < parentHalf) && (elementPos + element.height() > parentHalf)) {
                                elem.addClass('active');
                            } else {
                                elem.removeClass('active');
                            }
                        };
                        parent.on('scroll', scrollHandler);
                    }
                };
            }
        ])
        .directive('selectOnFocus', function() {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    var focusedElement;
                    element.on('click', function() {
                        if (focusedElement !== this) {
                            this.select();
                            focusedElement = this;
                        }
                    });
                    element.on('blur', function() {
                        focusedElement = null;
                    });
                }
            };
        })
        .directive('visibleOnFocus', function() {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    var focusedElement;
                    element.on('click', function() {
                        if (focusedElement !== this)
                        {
                            focusedElement = this; 
                            scrollFunction($(this).parent().parent().prev('label') || this);
                        }
                    });
                    element.on('blur', function() {
                        focusedElement = null; 
                    });
                }
            };
        })
        .directive('navView', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    view: '='
                },
                template: '<a class="list-group-item" scrollto="#{{view.id}}" scroll-spy="#{{view.id}}" href>{{view.name}} <i class="icon-right pull-right"></i></a>'
            };
        })
        .directive('result', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    result: '='
                },
                template: '<div ng-class="{\'alert\': result.resultlevel!=null, \'alert-danger\': result.resultlevel==3, \'alert-warning\': result.resultlevel==2, \'alert-info\': result.resultlevel==1, \'alert-success\': result.resultlevel==0}"><h3 ng-bind-html="result.result | to_trusted"></h3><h4 ng-bind-html="result.explanation | to_trusted"></h4></div>'
            };
        })
        .directive('multiresult', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    result: '='
                },
                link: function(scope) {
                    scope.$watchCollection('result', function(newValue, oldValue, scope) {
                        scope.resultlevel = Math.round(
                            _.reduce(scope.result, function(
                                memo, item) {
                                return memo + item.resultlevel;
                            }, 0) / scope.result.length);
                    });
                },
                template: '<div ng-class="{\'alert\': resultlevel!=null, \'alert-danger\': resultlevel==3, \'alert-warning\': resultlevel==2, \'alert-info\': resultlevel==1, \'alert-success\': resultlevel==0}"><h4><ul class="list-group"><li class="list-group-item" ng-class="{\'list-group-item-danger\': resultitem.resultlevel==3, \'list-group-item-warning\': resultitem.resultlevel==2, \'list-group-item-info\': resultitem.resultlevel==1, \'list-group-item-success\': resultitem.resultlevel==0}" ng-repeat="resultitem in result track by $index">{{resultitem.name}} <span class="badge">{{resultitem.value}}</span></li></ul></h4></div>'
            };
        })
        .directive('view', ['$compile', '$http', '$templateCache',
            function($compile, $http, $templateCache) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        view: '='
                    },
                    link: function(scope, element) {
                        if (scope.view.update) {
                            if (scope.view.init) {
                                scope.view.init();
                            }
                            _.each(scope.view.fields, function(field) {
                                scope.$watch('view.values.' + field.id, function(newValue, oldValue, scope) {
                                    if (scope.view.update) {
                                        scope.view.result = scope.view.update(newValue, oldValue, scope, field);
                                    }
                                });
                            });
                            _.each(scope.view.external, function(field) {
                                scope.$watch('view.values.' + field, function(newValue, oldValue, scope) {
                                    if (scope.view.update) {
                                        scope.view.result = scope.view.update(newValue, oldValue, scope, null);
                                    }
                                });
                            });
                            scope.$watchCollection('view.values.calculatorsActive', function() {
                                _.each(scope.view.fields, function(field) {
                                    field.input.disabled = _.contains(_.keys(scope.view.values.calculatorsActive), field.id);
                                });
                            });
                        }

                        var templateName = scope.view.template || 'calculator';
                        var loader = $http.get('partials/views/' + templateName + '.html', {
                            cache: $templateCache
                        });

                        loader.success(function(html) {
                            element.html(html);
                        }).
                        then(function() {
                            element.replaceWith($compile(element.html())(scope));
                        });
                    }
                };
            }
        ])
        .directive('switch', function() {
            return {
                restrict: 'E',
                require: '^ngModel',
                replace: true,
                scope: {},
                template: '<div class="switch"><div class="switch-handle"></div></div>',
                link: function(scope, elem, attrs, ngModelController) {

                    ngModelController.$render = function() {
                        elem.toggleClass('active', ngModelController.$viewValue);
                    };

                    elem.on('click tap', function() {
                        if (!attrs.disabled) {
                            scope.$apply(ngModelController.$setViewValue(!ngModelController.$viewValue));
                            ngModelController.$render();
                        }
                    });

                    elem.addClass('switch-transition-enabled');
                }
            };
        })
        .directive('customInput', ['$compile',
            function($compile) {
                var options = {
                    none: '',
                    image: '<img ng-src="{{field.url}}" class="img-responsive"/>',
                    number: '<input select-on-focus visible-on-focus class="form-control" type="number" step="{{field.input.step}}" min="{{field.input.min}}" max="{{field.input.max}}" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]"/><span class="help-inline">{{field.description}}</span>',
                    text: '<input select-on-focus visible-on-focus class="form-control" type="text" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" maxlength="{{field.input.length || 524288}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
                    select: '<select class="form-control" required ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-options="option.value as option.name for option in field.input.options"></select><span class="help-inline">{{fieldFromAnyValue(values[field.id], "value", field.input.options).description}}</span>',
                    check: '<switch ng-model="values[field.id]"></switch>',
                    radio: '<div class="btn-group" data-toggle="buttons-checkbox"><button type="button" class="btn span2" ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
                    vradio: '<div class="btn-group btn-group-vertical" data-toggle="buttons-checkbox"><button type="button" class="btn span4" ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
                    result: '<result result="result"></result>',
                    multiresult: '<multiresult result="result"></multiresult>',
                    'static': '<div class="form-control-static" name="{{field.id}}" ng-bind-html="values[field.id] | to_trusted"></div>',
                    date: '<input type="text" class="form-control" ng-model="values[field.id]" name="field.id" ng-required="true" bs-datepicker data-date-format="dd-MM-yyyy" data-autoclose="true" data-max-date="today" data-icon-left="icon-left" data-icon-right="icon-right"/>',
                    multiline: '<textarea visible-on-focus class="form-control" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
                    richtext: '<textarea visible-on-focus class="form-control" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>'
                };
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        field: '=',
                        values: '=',
                        result: '='
                    },
                    link: function(scope, element) {
                        var html = options[scope.field.input.type];
                        element.html(html);
                        element.replaceWith($compile(html)(scope));
                    }
                };
            }
        ])
        .directive('verifiedClick', ['$timeout', '$animate',
            function($timeout, $animate) {
                return {
                    restrict: 'A',
                    scope: {
                        verifiedClick: '&'
                    },
                    link: function($scope, elem, attrs) {
                        elem.on('tap click', function() {
                            $scope.$apply(function() {
                                var waitTime = attrs.verifyWait || 1500;
                                if (!$scope.timer) {
                                    $animate.addClass(elem, 'verify');
                                    $scope.timer = $timeout(function() {
                                        $scope.timer = false;
                                        $animate.removeClass(elem, 'verify');
                                    }, waitTime);
                                } else {
                                    $timeout.cancel($scope.timer);
                                    $scope.timer = false;
                                    $animate.removeClass(elem, 'verify');
                                    $scope.verifiedClick($scope.elem, attrs);
                                }
                            });
                        });
                    }
                };
            }
        ]);
})();