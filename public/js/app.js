var beer_app = angular.module("beer_app", ["ngRoute", "directive.loading", "ngResource", "navigation", "reviews"]);

angular.module('directive.loading', [])

    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        //accordionize();
                        elm.hide();
                    }
                });
            }
        };

    }]);

beer_app.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.	
		when('/create-new-review', {
			templateUrl: 'templates/reviews/new-review.html',
			controller: 'NewReviewCtrl'
		}).		
		when('/reviews', {
			templateUrl: 'templates/reviews/reviews-list.html',
			controller: 'ReviewsCtrl'
		}).
		when('/reviews/:reviewId', {
			templateUrl: 'templates/reviews/review-detail.html',
			controller: 'ReviewDetailCtrl'
		}).		       																										
		otherwise({
			redirectTo: '/reviews'
		});	
}]);

function mainCtrl($scope, $http){              
    
  $scope.log = function(msg){
    console.log(msg);
  };        	
  
}