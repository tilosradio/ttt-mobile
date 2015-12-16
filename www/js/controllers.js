angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Perform the login action when the user submits the login form

  })

  .controller('BusinessListCtrl', function ($scope, pouchService, position, $rootScope) {
    pouchService.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      $scope.$apply(function () {
        $scope.items = result.rows;

      });
    }).catch(function (err) {
      console.log(err);
    });

    $rootScope.$on('position', function () {
      angular.forEach($scope.items, function (value, key) {
        value.doc.distance = position.distance(value.doc.lat, value.doc.long);
      });
    });
  })

  .controller('BusinessCtrl', function ($scope, $stateParams, pouchService) {
    pouchService.get($stateParams.id, {attachment: true}).then(function (result) {
      $scope.$apply(function () {
        $scope.business = result;
      });
      return pouchService.getAttachment($stateParams.id, "photo.jpg");
    }).then(function (blob) {
      $scope.$apply(function () {
        $scope.imgUrl = URL.createObjectURL(blob);
      });
    }).catch(function (err) {
      console.log(err);
    });
  })

