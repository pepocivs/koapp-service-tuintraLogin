angular
  .controller('staticCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$http'];

function loadFunction($scope, structureService, $location, $http){
  structureService.registerModule($location, $scope, 'static');
  $scope.login = login;

  function login() {
    var loginData = {
      domain   : $scope.static.club,
      userName : $scope.static.user,
      password : ($scope.static.pwd) ? sha1($scope.static.pwd) : ''
    };
    callApi(loginData);
  }

  function callApi(data) {
    $http({
        method: 'POST',
        url: 'http://api.tuintra.com/login',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'es_ES'
        }
      })
      .success(function(data) {
        $scope.static.status = data;
        applyScope();
      })
      .error(function(e) {
        $scope.static.status = e.error || e.message;
        applyScope();
      });
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
