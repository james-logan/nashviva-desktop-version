'use strict';

angular.module('nashvivaDesktopApp')
  .controller('MainCtrl', function ($scope, $http, uiGmapGoogleMapApi) {
    // $scope.awesomeThings = [];
    var vm = this;

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });

    $scope.map = { center: {latitude: 36.16, longitude: -86.78}, zoom: 14, pan: false}

    uiGmapGoogleMapApi.then(function (maps) {
      console.log('shenanigans')
    });

    // {
    //   idKey: 10000000,
    //   icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/512px-Map_marker_font_awesome.svg.png',
    //   options: {
    //     icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/512px-Map_marker_font_awesome.svg.png'
    //   },
    //   coords: {
    //     latitude: 36.16,
    //     longitude: -86.78
    //   }
    // }
    $scope.preMarkers = [];
    $scope.markers = [];

    // $scope.$watch($scope.active, function() {})

    $http
      .get('https://data.nashville.gov/resource/dqkw-tj5j.json?$$app_token=8efm64PGcgXye0PGdUl0S2zw3')
      .then(function (data) {
        var arr = []
        // console.log(data.data)
        data.data.forEach(function (art) {
          var marker = {
            idKey: null,
            coords: art.mapped_location
            // latitude: art.mapped_location.latitude,
            // longitude: art.mapped_location.longitude
          }
          arr.push(marker);
        })
        vm.secondDataSet(arr)

      }, function (err) {
        console.log(err)
      })

      vm.secondDataSet = function (arr) {
        $http
          .get('https://data.nashville.gov/resource/eviu-nxp6.json?$$app_token=8efm64PGcgXye0PGdUl0S2zw3')
          .then(function (data) {
            // console.log(data.data)
            data.data.forEach(function (art) {
              var marker = {
                idKey: null,
                coords: art.mapped_location
              }
              arr.push(marker)
            })
            arr = arr.map(function (art, i) {
              art.idKey = i;
              art.id = art.idKey;
              art.icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/512px-Map_marker_font_awesome.svg.png'
              art.options = {
                icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/512px-Map_marker_font_awesome.svg.png'
              }
              // if (art.coords) {
              //   art.latitude = art.coords.latitude
              //   art.longitude = art.coords.longitude
              // }
              return art
            })
            $scope.markers = arr;
            console.log($scope.markers)
            // console.log(arr)
          }, function (err) {
            console.log(err)
          })
      }
  });


