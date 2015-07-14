module directives {
  'use strict';

  function scrollFunction(item: JQuery): void {
    var $item = $(item);
    var parent = $item.closest('.scrollable-content');
    var top = parent.scrollTop() + $item.offset().top - parent.offset().top;
    parent.animate({
      scrollTop: top
    }, { duration: 1800 });
  };

  export function autosize(): ng.IDirective {
    return {
      restrict: 'A',
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
        element.css('resize', 'none');
        var update = function() {
          element.height(0).height(element[0].scrollHeight);
        };
        element.on('change keyup keydown paste cut', function() {
          update();
        });
        setTimeout(update, 0);
      }
    }
  };

  interface IScrollToAttributes extends ng.IAttributes {
    scrollto: string;
    href: string;
  };
  export function scrollto(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: IScrollToAttributes) => {
        element.bind('click', function(e) {
          e.preventDefault();
          if (attributes.href) {
            attributes.scrollto = attributes.href;
          }
          var item = $(attributes.scrollto);
          scrollFunction(item);
        });
      }
    };
  };

  interface ISelectOnFocusAttributes extends ng.IAttributes {
    selectOnFocus: boolean;
  };
  export function selectOnFocus(): ng.IDirective {
    return {
      restrict: 'A',
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ISelectOnFocusAttributes) => {
        var focusedElement;
        element.on('click', function() {
          if (focusedElement !== this) {
            var position = this.value.search(attributes.selectOnFocus);
            if (attributes['type'] !== 'number') {
              this.setSelectionRange(position, this.value.length);
            } else {
              this.select();
            }
            focusedElement = this;
          }
        });
        element.on('blur', function() {
          focusedElement = null;
        });
      }
    };
  };

  export function navView(): ng.IDirective {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        view: '='
      },
      template: '<a class="list-group-item" scrollto="#{{view.id}}" scroll-spy="#{{view.id}}" href>{{view.name}} <i class="fa fa-chevron-right pull-right"></i></a>'
    };
  };

  interface IScrollMonitorAttributes extends ng.IAttributes {
  };
  export function scrollMonitor($rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService): ng.IDirective {
    return {
      restrict: 'A',
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ISelectOnFocusAttributes) => {
        var parent = element;
        var scrollUpdate = function() {
          var elements = $('.scroll-item', parent);

          var result = { viewSelected: null, viewsVisible: [] };
          var parentHalf = parent.height() / 2;
          _.forEach(elements, function(element, index, list) {
            var $element = $(element);
            var elementTop = $element.offset().top - parent.offset().top;
            var elementBottom = elementTop + $element.height();
            if ((elementTop < parentHalf) && (elementBottom > parentHalf)) {
              $rootScope.$broadcast('viewSelected', $element);
              $('[scroll-spy]').removeClass('active');
              $('[scroll-spy="#'+$element.attr('id')+'"]').addClass('active');
            };
          });
        };
        parent.on('scroll', scrollUpdate);
        $timeout(scrollUpdate, 1000); //Hack as I dont know when the view panels will load
      }
    };
  };
  scrollMonitor.$inject = ['$rootScope', '$timeout'];

  interface IScrollSpyAttributes extends ng.IAttributes {
    scrollSpy: string;
  };
  export function scrollSpy(): ng.IDirective {
    return {
      restrict: 'A',
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: IScrollSpyAttributes) => {
        $scope.$on('viewSelected', function(event, viewActive) {
          $('scroll-spy').removeClass('active');
          element.toggleClass('active', viewActive.is($(attributes.scrollSpy)));
        });
      }
    };
  };

  interface IAffixAttributes extends ng.IAttributes {
    affix: string;
    affixOffset: string;
  };
  export function affix($window: ng.IWindowService): ng.IDirective {
    return {
      restrict: 'A',
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: IAffixAttributes) => {
        $($window).scroll(function() {
          var scroll = $window.scrollY;
          var $body, offset, padding;
          if (scroll > element.offset().top) {
            this.originalOffset = element.offset().top;
            $body = $('body');
            padding = parseInt($body.css('padding-top'), 10);
            offset = parseInt(attributes.affixOffset, 10);
            $body.css('padding-top', padding + offset);
            element.addClass(attributes.affix || 'affix');
          }
          if (scroll < this.originalOffset) {
            $body = $('body');
            offset = parseInt(attributes.affixOffset, 10);
            padding = parseInt($body.css('padding-top'), 10);
            $body.css('padding-top', padding - offset);
            element.removeClass(attributes.affix || 'affix');
          }
        });
      }
    };
  };
  affix.$inject = ['$window'];

  interface IResultAttributes extends ng.IAttributes {
  };
  export function result(): ng.IDirective {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        result: '='
      },
      template: '<div ng-class="{\'alert\': result.resultlevel!=null, \'alert-danger\': result.resultlevel==3, \'alert-warning\': result.resultlevel==2, \'alert-info\': result.resultlevel==1, \'alert-success\': result.resultlevel==0}"><h3 ng-bind-html="result.result + result.suffix | to_trusted"></h3><h4 ng-bind-html="result.explanation | to_trusted"></h4></div>'
    };
  };

  interface IViewScope extends ng.IScope {
    resultlevel: number;
    result: any;
    description: string;
  };
  interface IMultiResultAttributes extends ng.IAttributes {
  };
  export function multiresult(): ng.IDirective {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        result: '='
      },
      link: ($scope: IViewScope, element: ng.IAugmentedJQuery, attributes: IMultiResultAttributes) => {
        $scope.$watchCollection('result', function(newValue, oldValue, scope: IViewScope) {
          scope.resultlevel = Math.round(
            _.reduce(scope.result, function(
              memo: number, item) {
              return memo + item.resultlevel;
            }, 0) / scope.result.length);
        });
      },
      template: '<div ng-class="{\'alert\': resultlevel!=null, \'alert-danger\': resultlevel==3, \'alert-warning\': resultlevel==2, \'alert-info\': resultlevel==1, \'alert-success\': resultlevel==0}"><h4><ul class="list-group"><li class="list-group-item" ng-class="{\'list-group-item-danger\': resultitem.resultlevel==3, \'list-group-item-warning\': resultitem.resultlevel==2, \'list-group-item-info\': resultitem.resultlevel==1, \'list-group-item-success\': resultitem.resultlevel==0}" ng-repeat="resultitem in result track by $index">{{resultitem.name}} <span class="badge">{{resultitem.value}}</span></li></ul></h4></div>'
    };
  };

  interface IViewAttributes extends ng.IAttributes {
  };
  export function view($compile: ng.ICompileService, $http: ng.IHttpService, $templateCache: ng.ITemplateCacheService, $timeout: ng.ITimeoutService): ng.IDirective {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="text-center"><h3><i class="fa fa-spinner fa-spin"></i></h3></div>',
      scope: {
        view: '='
      },
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: IViewAttributes) => {
        if ($scope.view.update) {
          if ($scope.view.init) {
            $scope.view.init();
          }
          _.each($scope.view.fields, function(field) {
            $scope.$watch('view.values.' + field.id, function(newValue, oldValue, $scope) {
              if ($scope.view.update) {
                $scope.view.result = $scope.view.update(newValue, oldValue, $scope, field);
              }
            });
          });
          _.each($scope.view.external, function(field) {
            $scope.$watch('view.values.' + field, function(newValue, oldValue, $scope) {
              if ($scope.view.update) {
                $scope.view.result = $scope.view.update(newValue, oldValue, $scope, null);
              }
            });
          });
          $scope.$watchCollection('view.values.calculatorsActive', function() {
            _.each($scope.view.fields, function(field) {
              field.input.disabled = _.contains(_.keys($scope.view.values.calculatorsActive), field.id);
            });
          });
        }

        var templateName = $scope.view.template || 'calculator';

        var loader;

        $timeout(function() {
          loader = $http.get('partials/views/' + templateName + '.html', {
            cache: $templateCache
          });

          loader.success(function(html) {
            element.html(html);
          }).
            then(function() {
            element.replaceWith($compile(element.html())($scope));
          });
        });
      }
    };
  };
  view.$inject = ['$compile', '$http', '$templateCache', '$timeout'];

  interface IFlipswitchAttributes extends ng.IAttributes {
  };
  export function flipswitch(): ng.IDirective {
    return {
      restrict: 'E',
      require: '^ngModel',
      replace: true,
      scope: {},
      template: '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" checked><label class="onoffswitch-label"><span class="onoffswitch-inner" data-off="{{::off}}"" data-on="{{::on}}"></span><span class="onoffswitch-switch"></span></label></div>',
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: IFlipswitchAttributes, ngModel: ng.INgModelController) => {
        $scope.on = attributes['on'];
        $scope.off = attributes['off'];

        ngModel.$render = function() {
          $(element.children(0)[0]).prop('checked', ngModel.$viewValue);
        };

        element.on('click tap', function() {
          if (!attributes.disabled) {
            $scope.$apply(ngModel.$setViewValue(!ngModel.$viewValue));
            ngModel.$render();
          }
        });
      },
    };
  };

  interface ICustomInputAttributes extends ng.IAttributes {
  };
  export function customInput($compile: ng.ICompileService): ng.IDirective {
    var options = {
      none: '',
      image: '<img ng-src="{{field.url}}" class="img-responsive"/>',
      number: '<input select-on-focus visible-on-focus class="form-control" type="number" step="{{field.input.step}}" min="{{field.input.min}}" max="{{field.input.max}}" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]"/><span class="help-inline">{{field.description}}</span>',
      text: '<input select-on-focus visible-on-focus class="form-control" type="text" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" maxlength="{{field.input.length || 524288}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
      telephone: '<div class="input-group"><input select-on-focus visible-on-focus class="form-control" type="tel" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" maxlength="10" ng-model="values[field.id]" /><span class="input-group-btn"><a class="btn btn-default" href="tel:{{values[field.id]}}">Κλήση</a></span></div><span class="help-inline">{{field.description}}</span>',
      amka: '<input select-on-focus="#" visible-on-focus class="form-control" type="tel" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" maxlength="11" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
      select: '<select class="form-control" required ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-options="option.value as option.name for option in field.input.options"></select><span class="help-inline">{{fieldFromAnyValue(values[field.id], "value", field.input.options).description}}</span>',
      check: '<flipswitch ng-model="values[field.id]"></switch>',
      radio: '<div class="btn-group" data-toggle="buttons-checkbox"><button type="button" class="btn span2" ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
      vradio: '<div class="btn-group btn-group-vertical" data-toggle="buttons-checkbox"><button type="button" class="btn span4" ng-model="values[field.id]" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" ng-repeat="option in field.input.options" btn-radio="{{option.value}}">{{option.name}}</button></div><span class="help-block">{{fieldFromAnyValue(field.value, "value", field.input.options).description}}</span>',
      result: '<result result="result"></result>',
      multiresult: '<multiResult result="result"></multiResult>',
      'static': '<div class="form-control-static" name="{{field.id}}" ng-bind-html="values[field.id] | to_trusted"></div>',
      staticmultiline: '<textarea class="form-control" ng-disabled="true" ng-class="{disabled: true}" name="{{field.id}}" ng-model="values[field.id]" />',
      date: '<input type="text" class="form-control" ng-model="values[field.id]" name="field.id" bs-datepicker data-date-type="date" data-date-format="dd-MM-yyyy" data-autoclose="true" data-max-date="today" data-icon-left="icon-left" data-icon-right="icon-right" data-use-native="true" data-start-view=2 />',
      multiline: '<textarea autosize visible-on-focus class="form-control" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>',
      richtext: '<textarea ui-tinymce="{language : \'el\', menubar : false, statusbar : false, resize: false, toolbar: [ \'undo redo paste | searchreplace | styleselect bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | insertdatetime\'], insertdatetime_formats:[\'%d/%m/%Y\', \'%H:%M\', \'%d/%m/%Y %H:%M\'], plugins: \'autoresize paste insertdatetime lists searchreplace\'}" autosize visible-on-focus class="form-control" ng-disabled="{{field.input.disabled}}" ng-class="{disabled: field.input.disabled}" name="{{field.id}}" ng-model="values[field.id]" /><span class="help-inline">{{field.description}}</span>'
    };
    return {
      restrict: 'E',
      replace: true,
      scope: {
        field: '=',
        values: '=',
        result: '='
      },
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ICustomInputAttributes) => {
        var html = options[$scope.field.input.type];
        element.html(html);
        element.replaceWith($compile(html)($scope));
      }
    }
  };
  customInput.$inject = ['$compile'];

  interface IVerifiedClickAttributes extends ng.IAttributes {
    verifyWait: number;
  };
  export function verifiedClick($timeout: ng.ITimeoutService, $animate: ng.IAnimateService): ng.IDirective {
    return {
      restrict: 'A',
      scope: {
        verifiedClick: '&'
      },
      link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: IVerifiedClickAttributes) => {
        element.on('tap click', function() {
          $scope.$apply(function() {
            var waitTime = attributes.verifyWait || 1500;
            if (!$scope.timer) {
              $animate.addClass(element, 'verify');
              $scope.timer = $timeout(function() {
                $scope.timer = false;
                $animate.removeClass(element, 'verify');
              }, waitTime);
            } else {
              $timeout.cancel($scope.timer);
              $scope.timer = false;
              $animate.removeClass(element, 'verify');
              $scope.verifiedClick(element, attributes);
            }
          });
        });
      }
    };
  };
  verifiedClick.$inject = ['$timeout', '$animate'];
}
