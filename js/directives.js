/*global angular: true */
/*global _: true */
/*global $: true */

(function () {
  'use strict';

  /* Directives */
  angular.module('medical.directives', [])
    .directive('scrollto', [function () {
      return function (scope, elm, attrs) {
        elm.bind('click', function (e) {
          e.preventDefault();
          if (attrs.href) {
            attrs.scrollto = attrs.href;
          }
          var top = $(attrs.scrollto).offset().top;
          $('body,html').animate({ scrollTop: top - 40 }, 800);
        });
      };
    }])
    .directive('affix', function ($window) {
      return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
          $($window).scroll(function () {
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
    })
    .directive('scrollSpy', function ($window) { //works but could get a lot more optimised. Check bellow... Also should check first the previous spy element and if still selected, return. Finally if the element does not exist anymore, remove it from the spy array.
      return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
          $($window).scroll(function () {
            var scroll = $window.scrollY;
            var element = $('#' + attrs.scrollSpy);
            if (element.length) {
              if (scroll > element.offset().top && scroll < (element.offset().top + element.height())) {
                elem.addClass('active');
              } else {
                elem.removeClass('active');
              }
            }
          });
        }
      };
    })
    .directive('navPanel', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<a scrollto ng-href="#{{panel.id}}" scroll-spy="{{panel.id}}"><span class="glyphicon glyphicon-chevron-right"></span> {{panel.name}}</a>'
      };
    }])
      .directive('result', function () {
        return {
          restrict: 'E',
          replace: true,
          scope: {
            result: '='
          },
          template: '<div ng-class="{\'alert\': result.resultlevel!=null, \'alert-danger\': result.resultlevel==3, \'alert-warning\': result.resultlevel==2, \'alert-info\': result.resultlevel==1, \'alert-success\': result.resultlevel==0}"><h3 ng-bind-html="result.result | to_trusted"></h3><h4 ng-bind-html="result.explanation | to_trusted"></h4></div>'
        };
      })
      .directive('panel', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {
        return {
          restrict: 'E',
          replace: true,
          scope: {
            panel: '='
          },
          link: function (scope, element, attrs) {
            if (scope.panel.update) {
              scope.$watch('panel.fields', function (newValue, oldValue, scope) {
                scope.panel.result = scope.panel.update(newValue, oldValue, scope);
              }, true);
            }
            var templateName = scope.panel.template || 'calculator';
            var loader = $http.get('partials/panels/' + templateName + '.html', {
              cache: $templateCache
            });

            loader.success(function (html) {
              element.html(html);
            }).
              then(function (response) {
                element.replaceWith($compile(element.html())(scope));
              });
          }
        };
      }])
    .directive('customInput', ['$compile', function ($compile) {
      var options = {
        none: '',
        image: '<img ng-src="{{field.url}}" class="img-responsive"/>',
        number: '<input class="form-control" type="number" step="{{field.input.step}}" min="{{field.input.min}}" max="{{field.input.max}}" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="field.value"/><span class="help-inline">{{field.description}}</span>',
        text: '<input class="form-control" type="text" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="field.value" /><span class="help-inline">{{field.description}}</span>',
        select: '<select class="form-control" required ng-model="field.value" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-options="option.value as option.name for option in field.input.options"></select><span class="help-inline">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
        check: '<button type="button" class="btn" ng-model="field.value" btn-checkbox ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}"><span class="glyphicon glyphicon-remove-circle" ng-hide="field.value" /><span class="glyphicon glyphicon-ok-sign" ng-show="field.value" /></button><span class="help-inline">{{field.description}}</span>',
        radio: '<div class="btn-group" data-toggle="buttons-checkbox"><button type="button" class="btn span2" ng-model="field.value" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
        vradio: '<div class="btn-group btn-group-vertical" data-toggle="buttons-checkbox"><button type="button" class="btn span4" ng-model="field.value" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
        result: '<result result="panel.result"></result>',
        date:   '<p class="input-group"><input type="text" class="form-control" datepicker-popup="yyyy-MM-dd" ng-model="field.value" name="field.id" is-open="opened" ng-required="true" close-text="Close" /><span class="input-group-btn"><button class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></p>'
      };
      return {
        restrict: 'E',
        replace: true,
        scope: false,
        link: function (scope, element, attrs) {
          scope.fieldFromAnyValue = function (value, field, array) {
            return _.find(array, function (iterator) {
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