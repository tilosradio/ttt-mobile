angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Perform the login action when the user submits the login form

})

.controller('BusinessListCtrl', function($scope, pouchService) {
    pouchService.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      $scope.$apply(function(){
        $scope.items = result.rows;
      });
    }).catch(function (err) {
      console.log(err);
    });
})

.controller('BusinessCtrl', function($scope, $stateParams, pouchService) {
    pouchService.get($stateParams.id).then(function (result) {
      $scope.$apply(function(){
        $scope.business = result;
      });
    }).catch(function (err) {
      console.log(err);
    });
})

