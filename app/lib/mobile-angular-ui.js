angular.module('mobile-angular-ui.directives.navbars', [])

.directive('navbarAbsoluteTop', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      elem.parent().addClass('has-navbar-top');
    }
  };
})

.directive('navbarAbsoluteBottom', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      elem.parent().addClass('has-navbar-bottom');
    }
  };
});

angular.module('mobile-angular-ui.directives.sidebars', [])
.directive('sidebar', ['$document', '$rootScope', function($document, $rootScope) {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      var shouldCloseOnOuterClicks = true;
      
      if( attrs.closeOnOuterClicks == 'false' || attrs.closeOnOuterClicks == '0') {
        shouldCloseOnOuterClicks = false;
      }

      if (elem.hasClass('sidebar-left')) {
        elem.parent().addClass('has-sidebar-left');
      }

      if (elem.hasClass('sidebar-right')) {
        elem.parent().addClass('has-sidebar-right');
      }

      var isAncestorOrSelf = function(element, target) {
        var parent = element;

        while (parent.length > 0) {
            if (parent[0] === target[0]) {
                parent = null;     
                return true;
            }
            parent = parent.parent();
        }

        parent = null;
        return false;
      };

      var closeOnOuterClicks = function(e) {
        if(! isAncestorOrSelf(angular.element(e.target), elem)) {
            $rootScope.toggle(attrs.id, 'off');
            e.preventDefault()
            return false;
        }
      }
      
      var clearCb1 = angular.noop();
      
      if (shouldCloseOnOuterClicks) {
        clearCb1 = $rootScope.$on('mobile-angular-ui.toggle.toggled', function(e, id, active){
          if(id == attrs.id) {
            if(active) {
              setTimeout(function(){
                $document.on('click tap', closeOnOuterClicks);
              }, 300);
            } else {
              $document.unbind('click tap', closeOnOuterClicks);
            }
          }
        });
      }

      scope.$on('$destroy', function(){
        clearCb1();
        $document.unbind('click tap', closeOnOuterClicks);
      });

    }
  };
}]);

angular.module('mobile-angular-ui.directives.toggle', [])
.factory('ToggleHelper', [
  '$rootScope', function($rootScope) {
    return {
      
      events: {
        toggle: "mobile-angular-ui.toggle.toggle",
        toggleByClass: "mobile-angular-ui.toggle.toggleByClass",
        togglerLinked: "mobile-angular-ui.toggle.linked",
        toggleableToggled: "mobile-angular-ui.toggle.toggled"
      },

      commands: {
        alternate: "toggle",
        activate: "on",
        deactivate: "off"
      },

      toggle: function(target, command) {
        if (command == null) {
          command = "toggle";
        }
        $rootScope.$emit(this.events.toggle, target, command);
      },

      toggleByClass: function(targetClass, command) {
        if (command == null) {
          command = "toggle";
        }
        $rootScope.$emit(this.events.toggleByClass, targetClass, command);
      },

      notifyToggleState: function(elem, attrs, toggleState) {
        $rootScope.$emit(this.events.toggleableToggled, attrs.id, toggleState, attrs.exclusionGroup);
      },

      toggleStateChanged: function(elem, attrs, toggleState) {
        this.updateElemClasses(elem, attrs, toggleState);
        this.notifyToggleState(elem, attrs, toggleState);
      },

      applyCommand: function(command, oldState) {
        switch (command) {
          case this.commands.activate:
            return true;
          case this.commands.deactivate:
            return false;
          case this.commands.alternate:
            return !oldState;
        }
      },

      updateElemClasses: function(elem, attrs, active) {

        if (active) {
          if (attrs.activeClass) {
            elem.addClass(attrs.activeClass);
          }
          if (attrs.inactiveClass) {
            elem.removeClass(attrs.inactiveClass);
          }
          var parent = elem.parent();
          if (attrs.parentActiveClass) {
            parent.addClass(attrs.parentActiveClass);
          }
          if (attrs.parentInactiveClass) {
             parent.removeClass(attrs.parentInactiveClass);
          }
        } else {
          if (attrs.inactiveClass) {
            elem.addClass(attrs.inactiveClass);
          }
          if (attrs.activeClass) {
            elem.removeClass(attrs.activeClass);
          }
          var parent = elem.parent();
          if (attrs.parentInactiveClass) {
            parent.addClass(attrs.parentInactiveClass);
          }
          if (attrs.parentActiveClass) {
             parent.removeClass(attrs.parentActiveClass);
          }
        }
      }
    };
  }
])

.run([
  "$rootScope", "ToggleHelper", function($rootScope, ToggleHelper) {
    
    $rootScope.toggle = function(target, command) {
      if (command == null) {
        command = "toggle";
      }
      ToggleHelper.toggle(target, command);
    };

    $rootScope.toggleByClass = function(targetClass, command) {
      if (command == null) {
        command = "toggle";
      }
      ToggleHelper.toggleByClass(targetClass, command);
    };
  }
])

.directive('toggle', [
  "$rootScope", "ToggleHelper", function($rootScope, ToggleHelper) {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var command = attrs.toggle || ToggleHelper.commands.alternate;
        var target = attrs.target;
        var targetClass = attrs.targetClass;
        var bubble = attrs.bubble === "true" || attrs.bubble === "1" || attrs.bubble === 1 || attrs.bubble === "" || attrs.bubble === "bubble";
        
        if ((!target) && attrs.href) {
          target = attrs.href.slice(1);
        }
        
        if (!(target || targetClass)) {
          throw "'target' or 'target-class' attribute required with 'toggle'";
        }
        
        elem.on("click tap", function(e) {
          var angularElem = angular.element(e.target);
          if (!angularElem.hasClass("disabled")) {
            if (target != null) {
              ToggleHelper.toggle(target, command);
            }
            if (targetClass != null) {
              ToggleHelper.toggleByClass(targetClass, command);
            }
            if (!bubble) {
              e.preventDefault();
              return false;
            } else {
              return true;
            }
          }
        });

        var unbindUpdateElemClasses = $rootScope.$on(ToggleHelper.events.toggleableToggled, function(e, id, newState) {
          if (id === target) {
            ToggleHelper.updateElemClasses(elem, attrs, newState);
          }
        });

        if (target != null) {
          $rootScope.$emit(ToggleHelper.events.togglerLinked, target);
        }

        scope.$on('$destroy', unbindUpdateElemClasses);
      }
    };
  }
])

.directive('toggleable', [
  "$rootScope", "ToggleHelper", function($rootScope, ToggleHelper) {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {        
        var toggleState = false;
        
        if (attrs["default"]) {
          switch (attrs["default"]) {
            case "active":
              toggleState = true;
              break;
            case "inactive":
              toggleState = false;
          }
          ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
        }
        
        var unbindToggle = $rootScope.$on(ToggleHelper.events.toggle, function(e, target, command) {
          var oldState;
          if (target === attrs.id) {
            oldState = toggleState;
            toggleState = ToggleHelper.applyCommand(command, oldState);
            if (oldState !== toggleState) {
              ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
            }
          }
        });
        
        var unbindToggleByClass = $rootScope.$on(ToggleHelper.events.toggleByClass, function(e, targetClass, command) {
          var oldState;
          if (elem.hasClass(targetClass)) {
            oldState = toggleState;
            toggleState = ToggleHelper.applyCommand(command, oldState);
            if (oldState !== toggleState) {
              ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
            }
          }
        });
        
        var unbindToggleableToggled = $rootScope.$on(ToggleHelper.events.toggleableToggled, function(e, target, newState, sameGroup) {
          if (newState && (attrs.id !== target) && (attrs.exclusionGroup === sameGroup) && (attrs.exclusionGroup != null)) {
            toggleState = false;
            ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
          }
        });
        
        var unbindTogglerLinked = $rootScope.$on(ToggleHelper.events.togglerLinked, function(e, target) {
          if (attrs.id === target) {
            ToggleHelper.notifyToggleState(elem, attrs, toggleState);
          }
        });
        
        scope.$on('$destroy', function() {
          unbindToggle();
          unbindToggleByClass();
          unbindToggleableToggled();
          unbindTogglerLinked();
        });
      }
    };
  }
]);

angular.module("mobile-angular-ui", [
  'mobile-angular-ui.directives.toggle',
  'mobile-angular-ui.directives.sidebars',
  'mobile-angular-ui.directives.navbars'
 ]);