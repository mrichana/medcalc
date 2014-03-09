(function() {
	'use strict';

	/* Directives */

	angular.module('medicalCalculator.directives', [])
		.directive('scrollto', [function() {
			return function(scope, elm, attrs) {
				elm.bind('click', function(e) {
					e.preventDefault();
					if (attrs.href) {
						attrs.scrollto = attrs.href;
					}
					var top = $(attrs.scrollto).offset().top;
					$('body,html').animate({ scrollTop: top - 20 }, 800);
				});
			};
		}])
        .directive('scrollSpy', function ($window) {
            return {
                restrict: 'A',
                controller: function ($scope) {
                    $scope.spies = [];
                    this.addSpy = function (spyObj) {
                        $scope.spies.push(spyObj);
                    };
                },
                link: function (scope, elem, attrs) {
                    var spyElems;
                    spyElems = [];

                    scope.$watch('spies', function (spies) {
                        var spy, _i, _len, _results;
                        _results = [];

                        for (_i = 0, _len = spies.length; _i < _len; _i++) {
                            spy = spies[_i];

                            if (spyElems[spy.id] == null) {
                                _results.push(spyElems[spy.id] = elem.find('#' + spy.id));
                            }
                        }
                        return _results;
                    });

                    $($window).scroll(function () {
                        var highlightSpy, pos, spy, _i, _len, _ref;
                        highlightSpy = null;
                        _ref = scope.spies;

                        // cycle through `spy` elements to find which to highlight
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            spy = _ref[_i];
                            spy.out();

                            // catch case where a `spy` does not have an associated `id` anchor
                            if (spyElems[spy.id].offset() === undefined) {
                                continue;
                            }

                            if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0) {
                                // the window has been scrolled past the top of a spy element
                                spy.pos = pos;

                                if (highlightSpy == null) {
                                    highlightSpy = spy;
                                }
                                if (highlightSpy.pos < spy.pos) {
                                    highlightSpy = spy;
                                }
                            }
                        }

                        // select the last `spy` if the scrollbar is at the bottom of the page
                        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                            spy.pos = pos;
                            highlightSpy = spy;
                        }

                        return highlightSpy != null ? highlightSpy["in"]() : void 0;
                    });
                }
            };
        })
        .directive('spy', function ($location, $anchorScroll) {
            return {
                restrict: "A",
                require: "^scrollSpy",
                link: function(scope, elem, attrs, affix) {
                    elem.click(function () {
                        $location.hash(attrs.spy);
                        $anchorScroll();
                    });

                    affix.addSpy({
                        id: attrs.spy,
                        in: function() {
                            elem.addClass('active');
                        },
                        out: function() {
                            elem.removeClass('active');
                        }
                    });
                }
            };
        })
		.directive('navCalc', ['$compile', function($compile) {
			return {
				restrict: "E",
				replace: true,
				template: '<a scrollto ng-href="#{{panel.id}}" spy="{{panel.id}}">{{panel.name}} <span class="glyphicon glyphicon-chevron-right"></span></a>'
			};
		}])
		.directive('result', function() {
			return {
				restrict: "E",
				replace: true,
				scope: {
					result: '='
				},
				template: '<div ng-class="{\'alert\': result.resultlevel!=null, \'alert-danger\': result.resultlevel==3, \'alert-warning\': result.resultlevel==2, \'alert-info\': result.resultlevel==1, \'alert-success\': result.resultlevel==0}"><h3 ng-bind-html="result.result | to_trusted"></h3><h4 ng-bind-html="result.explanation | to_trusted"></h4></div>'
			};
		})
		.directive('calc', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {
			return {
				restrict: "E",
				replace: true,
				scope: {
					panel: '='
				},
				link: function(scope, element, attrs) {
					var templateName = scope.panel.template || "calculator";
					var loader = $http.get("partials/panels/" + templateName + ".html", {
						cache: $templateCache
					});
	
					var promise = loader.success(function(html) {
						element.html(html);
					}).
					then(function(response) {
						element.replaceWith($compile(element.html())(scope));
					});

					scope.id = scope.panel.id;
					scope.name = scope.panel.name;
					scope.fields = scope.panel.fields;

					if (scope.panel.calc) {
						scope.$watch("fields", function(newValue, oldValue, scope) {
							var result = scope.panel.calc(newValue, oldValue, scope);
							scope.panel.result = result;
						}, true);
					}
				}
			};
		}])
		.directive('customInput', ['$compile', function($compile) {
			var options = {
				none: '',
				image: '<img ng-src="{{field.url}}" class="img-responsive"></img>',
				number: '<input class="form-control" type="number" step="{{field.input.step}}" min="{{field.input.min}}" max="{{field.input.max}}" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="field.value"></input><span class="help-inline">{{field.description}}</span>',
				text: '<input class="form-control" type="text" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="field.value"></input><span class="help-inline">{{field.description}}</span>',
				select: '<select class="form-control" required ng-model="field.value" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-options="option.value as option.name for option in field.input.options"></select><span class="help-inline">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
				check: '<button type="button" class="btn" ng-model="field.value" btn-checkbox ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}"><span class="glyphicon glyphicon-remove-circle" ng-hide="field.value" /><span class="glyphicon glyphicon-ok-sign" ng-show="field.value" /></button><span class="help-inline">{{field.description}}</span>',
				radio: '<div class="btn-group" data-toggle="buttons-checkbox"><button type="button" class="btn span2" ng-model="field.value" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
				vradio: '<div class="btn-group btn-group-vertical" data-toggle="buttons-checkbox"><button type="button" class="btn span4" ng-model="field.value" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>'
			};
			return {
				restrict: "E",
				replace: true,
				scope: false,
				link: function(scope, element, attrs) {
					scope.fieldFromAnyValue = function(value, field, array) {
						return _.find(array, function(iterator) {
							return iterator[field] === value;
						});
					};
					var html = options[scope.field.input.type];
					element.html(html);
					element.replaceWith($compile(html)(scope));
				}
			};
		}]);
})();