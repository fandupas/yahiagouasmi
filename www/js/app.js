// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myMod = angular.module('ngPASLinfo', ['ionic',
                                          'gapi',
                                          'PasControllers',
                                          'PasServices',
                                          'PasFilters',
                                          'youtube-embed',
                                          'ngCordova'
                                         ]);

    myMod.value('GoogleApp', {
        apiKey: 'AIzaSyCgOF5EH4i6f1rVntIsLxORMQzRsYFQtfk'
    });
    myMod.constant('PASLinfoChannel', 'UCFgAEHHtZ67NvYI051jYfwQ');
    myMod.constant('YoutubeUrl', 'https://www.youtube.com/watch?v=');

    myMod.run(function ($ionicPlatform, VideoService) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });

    myMod.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.main', {
                url: "/main",
                views: {
                    'menuContent': {
                        templateUrl: "templates/main.html",
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })
            .state('app.video', {
                url: "/playlist/:playID/video/:videoID",
                views: {
                    'menuContent': {
                        templateUrl: "templates/video.html",
                        controller: 'VideoCtrl'
                    }
                }
            })
            .state('app.single', {
                url: "/playlists/:playlistID",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/main');
    });

