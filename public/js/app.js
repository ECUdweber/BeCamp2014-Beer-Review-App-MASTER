var beer_app = angular.module("beer_app", ["ngRoute", "directive.loading", "navigation", "reviews"]);

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