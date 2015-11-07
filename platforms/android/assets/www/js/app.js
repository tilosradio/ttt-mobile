// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.card', {
    url: '/description',
    views: {
      'menuContent': {
        templateUrl: 'templates/card.html'
      }
    }
    })
    .state('app.businesses', {
      url: '/businesses',
      views: {
        'menuContent': {
          templateUrl: 'templates/businesslist.html',
          controller: 'BusinessListCtrl'
        }
      }
    })

  .state('app.business', {
    url: '/business/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/business.html',
        controller: 'BusinessCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/description');
})
.factory('pouchService', function () {
    // var db = new PouchDB('http://192.168.0.15:5984/maraton');
    var db = new PouchDB('tttx5');
    db.load('db.dump').then(function () {
        console.log("content data is loaded")
    }).catch(function (err) {

    });
    return db;
})
.run(function(pouchService){


})
.directive('browseTo', function ($ionicGesture) {
 return {
  restrict: 'A',
  link: function ($scope, $element, $attrs) {
   var handleTap = function (e) {
    // todo: capture Google Analytics here
    var inAppBrowser = window.open(encodeURI($attrs.browseTo), '_system');
   };
   var tapGesture = $ionicGesture.on('tap', handleTap, $element);
   $scope.$on('$destroy', function () {
    // Clean up - unbind drag gesture handler
    $ionicGesture.off(tapGesture, 'tap', handleTap);
   });
  }
 }
});

