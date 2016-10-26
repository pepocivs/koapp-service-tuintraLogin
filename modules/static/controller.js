angular
  .controller('staticCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  structureService.registerModule($location, $scope, 'static');
  $scope.login = login;

  function login() {
    var loginData = {
      club    : $scope.static.club,
      user    : $scope.static.user,
      password: $scope.static.pwd
    };
    $scope.static.status = loginData;
  }

  function goToIndex() {
    $location.path(structureService.get().config.indexOld);
    applyScope();
  }

  function applyScope() {
    if(!$scope.$$phase) {
      $scope.$apply();
    }
  }

}
