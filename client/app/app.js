'use strict';

angular.module('nashvivaDesktopApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
])
  .config(function ($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDFERo_-aBRo9DGiPEQwhejX_MSPG41wKM',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'geometry,visualization'
    });
  });
