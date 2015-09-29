'use strict';

angular.module('nashvivaDesktopApp')
  .controller('MainCtrl', function ($scope, $http, uiGmapGoogleMapApi) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.map = { center: {latitude: 36.16, longitude: -86.78}, zoom: 14, pan: false}

    uiGmapGoogleMapApi.then(function (maps) {
      console.log('shenanigans')
    });

  });
