'use strict';

angular.module('nashvivaDesktopApp')
  .controller('MainCtrl', function ($scope, $http, uiGmapGoogleMapApi) {

    var vm = this;

    $scope.map = { center: {latitude: 36.16, longitude: -86.78}, zoom: 14, pan: false}

    uiGmapGoogleMapApi.then(function (maps) {
      console.log('shenanigans')
    });

    $scope.preMarkers = [];
    $scope.markers = [];

    $http
      .get('https://data.nashville.gov/resource/dqkw-tj5j.json?$$app_token=8efm64PGcgXye0PGdUl0S2zw3')
      .then(function (data) {
        var arr = []
        // console.log(data.data)
        data.data.forEach(function (art) {
          var marker = {
            idKey: null,
            coords: art.mapped_location,
            title: art.artwork || art.title,
            description: art.description,
            artist: art.first_name + " " + art.last_name
          }

          arr.push(marker);
        })
        vm.secondDataSet(arr)

      }, function (err) {
        console.log(err)
      })

      $scope.clicked = {
        show: false
      };

      vm.secondDataSet = function (arr) {
        $http
          .get('https://data.nashville.gov/resource/eviu-nxp6.json?$$app_token=8efm64PGcgXye0PGdUl0S2zw3')
          .then(function (data) {
            // console.log(data.data)
            data.data.forEach(function (art) {
              var marker = {
                coords: art.mapped_location,
                title: art.artwork,
                description: art.description,
                artist: art.first_name + " " + art.last_name
              }
              arr.push(marker)
            })
            arr = arr.map(function (art, i) {
              art.id = i;
              art.options = {
                icon: 'assets/images/Modern Statue-26.png'
              }
              art.show = false;
              art.isIconVisibleOnClick = true;

              art.onClick = function (marker, event, model) {
                console.log($scope.clicked)
                $scope.clicked.show = false;
                $scope.clicked = model || this;
                $scope.clicked.show = true;
                console.log($scope.clicked)
                if (!model) {
                  $scope.map.center = this.coords;
                }
              }

              return art
            })
            $scope.markers = arr;
          }, function (err) {
            console.log(err)
          })
      }
  });


