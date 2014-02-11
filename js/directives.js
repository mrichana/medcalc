(function() {
	'use strict';

	/* Directives */

	angular.module('medicalCalculator.directives', [])
		.directive('fillparent', function($window) {
			return function(scope, element) {
				scope.width = element.parent().width();
				scope.height = element.parent().height();
				$($window).bind('resize', function() {
					scope.$apply(function() {
						scope.width = element.parent().width();
						scope.height = element.parent().height();
					});
				});
			};
		})
		.directive('scrollto', [function() {
			return function(scope, elm, attrs) {
				elm.bind('click', function(e) {
					e.preventDefault();
					if (attrs.href) {
						attrs.scrollto = attrs.href;
					}
					var top = $(attrs.scrollto).offset().top;
					$('body,html').animate({
						scrollTop: top
					}, 800);
				});
			};
		}])
		.directive('ecgView', function($parse) {
			return function(scope, element, attrs) {
				scope.$watch("[pixelsPerCm,width,height]", function(newValue, oldValue) {
					var ecgCanvas = element[0];
					var context = ecgCanvas.getContext('2d');
	
					context.clearRect(0, 0, newValue[1], newValue[2]);
					context.strokeStyle = "#ff0000";
					for (var pos = 0; pos < newValue[1]; pos += newValue[0]) {
						for (var count = 0; count < 2; count++) {
							if (count === 0) {
								context.beginPath();
								context.lineWidth = 1;
								context.fillText(Math.round(pos / newValue[0]), pos + 2, 10, newValue[0]);
								context.fillText(Math.round(pos / newValue[0]), pos + 2, newValue[2] - 18, newValue[0]);
								context.moveTo(pos, 0);
								context.lineTo(pos, newValue[2]);
								context.stroke();
							} else {
								context.beginPath();
								context.lineWidth = 0.5;
								context.moveTo(pos + newValue[0] / 2, 0);
								context.lineTo(pos + newValue[0] / 2, newValue[2]);
								context.stroke();
							}
						}
					}
				}, true);
			};
		})
		.directive('persist', ['storage', function($parse, localStorage) {
			return {
				require: 'ngModel',
				link: function(scope, element, attrs, model) {
					var loaded;
					var localStorageName;
					if (angular.isUndefined(localStorageName)) {
						var ngController = element.attr("ng-controller") || (function(par) {
							return (function recursive(par) { //Expects ng-controller to be defined in the DOM or untested behaevure
								par = par.parent();
								return (par.attr("ng-controller") || recursive(par));
							})(element); // Avoid closest or parents jquery function as jquery may not be loaded
						})(element);
	
						localStorageName = attrs.persist + (attrs.persist ? "." : "") + ngController + "." + attrs.ngModel;
	
					}
					if (angular.isUndefined(loaded)) {
						loaded = {};
					}
					if (!loaded[attrs.ngModel]) {
						var storedValue = localStorage.get(localStorageName);
						if (storedValue) {
							scope[attrs.ngModel] = storedValue;
							loaded[attrs.ngModel] = true;
						}
					}
					scope.$watch(attrs.ngModel, function(value) {
						localStorage.set(localStorageName, value);
					});
				}
			};
		}])
		.directive('navCalc', ['$compile', function($compile) {
			return {
				restrict: "E",
				replace: true,
				template: '<a ng-href="#{{panel.id}}"><span class="glyphicon glyphicon-chevron-right"></span> {{panel.name}}</a>'
			};
		}])
		.directive('result', function() {
			return {
				restrict: "E",
				replace: true,
				scope: {
					result: '='
				},
				template: '<div ng-class="{\'alert\': result.resultlevel!=null, \'alert-error\': result.resultlevel==3, \'alert-warning\': result.resultlevel==2, \'alert-info\': result.resultlevel==1, \'alert-success\': result.resultlevel==0}" class="well well-small"><h3 ng-bind-html="result.result | to_trusted"></h3><h4 ng-bind-html="result.explanation | to_trusted"></h4></div>'
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