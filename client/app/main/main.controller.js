'use strict';

angular.module('nashvivaDesktopApp')
  .controller('MainCtrl', function ($scope, $http, uiGmapGoogleMapApi) {
    $scope.awesomeThings = [];
    var vm = this;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.map = { center: {latitude: 36.16, longitude: -86.78}, zoom: 14, pan: false}

    uiGmapGoogleMapApi.then(function (maps) {
      console.log('shenanigans')
    });

    $http
      .get('https://data.nashville.gov/resource/dqkw-tj5j.json?$$app_token=8efm64PGcgXye0PGdUl0S2zw3')
      .then(function (data) {
        console.log(data.data)
        vm.secondDataSet()

      }, function (err) {
        console.log(err)
      })

      vm.secondDataSet = function () {
        $http
          .get('https://data.nashville.gov/resource/eviu-nxp6.json?$$app_token=8efm64PGcgXye0PGdUl0S2zw3')
          .then(function (data) {
            console.log(data.data)
          }, function (err) {})
      }
  });


