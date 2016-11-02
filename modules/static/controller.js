angular
  .controller('staticCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$http', 'storageService'];

function loadFunction($scope, structureService, $location, $http, storageService){
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
      .success(storeTokenAndGo)
      .error(function(e) {
        $scope.static.status = e.error || e.message;
        applyScope();
      });
  }

  function storeTokenAndGo(data) {
    storageService.update('tuintraLogin', data).then(function(e) {
      if (e) {
        console.log('[V] Storage successful');
        $scope.static.status = 'User created successfully!!';
        goToIndex();
      } else {
        console.log('[V] Storage error');
        $scope.static.status = 'Error in storage';
        applyScope();
      }
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
