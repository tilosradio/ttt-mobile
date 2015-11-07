// Ionic Starter App

if (Number.prototype.toRadians === undefined) {
  Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
  };
}


/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
  Number.prototype.toDegrees = function () {
    return this * 180 / Math.PI;
  };
}


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

  .config(function ($stateProvider, $urlRouterProvider) {
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
  .run(function (pouchService) {


  })
  .factory('position', function ($cordovaGeolocation, $rootScope) {
    function Position(lat, long) {
      this.lat = lat;
      this.long = long;
    }

    Position.prototype.distance = function (lat2, lon2) {
      if (this.lat == 0 && this.long == 0) {
        return 99999;
      } else {
        if (lat2 && lon2) {
          var lat1 = this.lat
          var lon1 = this.long

          var R = 6371000; // metres
          var φ1 = lat1.toRadians();
          var φ2 = lat2.toRadians();
          var Δφ = (lat2 - lat1).toRadians();
          var Δλ = (lon2 - lon1).toRadians();

          var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          var d = R * c;
          return d;
        } else return 99999;
      }
    }
    Position.prototype.init = function () {
      var p = this;
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        p.lat = position.coords.latitude
        p.long = position.coords.longitude
        $rootScope.$emit('position', this.lat, this.lang);
      }, function (err) {
        // error
      });
    };
    Position.prototype.refresh = function () {
      var watchOptions = {
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
      };

      var watch = $cordovaGeolocation.watchPosition(watchOptions);
      watch.then(
        null,
        function (err) {
          // error
        },
        function (position) {
          this.lat = position.coords.latitude
          this.long = position.coords.longitude
        });


    };
    result = new Position(0, 0);
    result.init();
    result.refresh();
    return result;

  })
  .filter('distance', function () {
    return function (value) {
      if (!value || value == 0) {
        return "";
      } else if (value == 99999) {
        return "";
      }
      else if (value < 1000) {
        return (Math.round(value /10) * 10) + " m"
      }
      else if (value < 10000) {
        return (Math.round(value / 100) / 10) + " km"
      } else {
        return Math.round(value / 1000) + " km";
      }
    }
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

