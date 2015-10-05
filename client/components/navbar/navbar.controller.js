'use strict';

angular.module('nashvivaDesktopApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Culture',
      'link': '/'
    }, {
      'title': 'Outdoors',
      'link': '/outdoors'
    }, {
      'title': 'Utilities',
      'link': '/utilities'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
