app.controller('MainController', ['$scope', '$http', function($scope, $http) {
	$scope.call = 0;
	$scope.startups = [];
	$scope.requestActive = false;
	$scope.loadMoreStartups = function(){
		if($scope.requestActive === true)
			return;
		$scope.requestActive = true;
		$http({
			  url: '/api/indexList.php',
			  method: "POST",
			  data: 'call=' + ++($scope.call),
			  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 }).
			success(function(data, status, headers, config) {
				$scope.startups = $scope.startups.concat(data);
				if(data.length > 0)
					$scope.requestActive = false;
			}).
			error(function(data, status, headers, config) {
		});
	}
}]);

app.controller('aboutController', ['$scope', function($scope) {
	$scope.founded = 'Today';
	$scope.mission = 'Help startups start';
}]);

app.controller('contactController', ['$scope', function($scope) {
	$scope.company = 'StartupsList.in';
	$scope.email = 'contact@startupslist.in';
	$scope.phone = '800 2218 457';
}]);


app.controller('profileController', ['$scope', '$stateParams', function($scope, $stateParams) {
	$scope.title = $stateParams.profile;
}]);

