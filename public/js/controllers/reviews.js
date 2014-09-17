'use strict';

var reviews_route = 'api/v1/reviews/';

var reviews_module = angular.module('reviews', ['ngResource', 'ui.bootstrap']);

reviews_module.factory('ReviewFactory', function ($resource) {
	return $resource(reviews_route + ':id',
		{id:'@id'},
		{'update': {method:'PUT'}}
	);
});

function ReviewsCtrl($scope, $http, $filter, $resource, $location, $routeParams, ReviewFactory){
  $scope.reviews = ReviewFactory.query();  
   
  $scope.sort = {
      column: '',
      descending: false
  };    
   
  var log = [];
  
  $scope.selectedCls = function(column) {
      return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
  };  
 
  $scope.changed_industry = 0; 
  
  $scope.showReviewDetail = function(review_id) {         
    $location.path("/reviews/" + review_id);
  };
  
  $scope.deleteReview = function(review_id) {
    ReviewFactory.delete({id: review_id});   
    // Refresh the list to remove deleted item.
    $scope.reviews = ReviewFactory.query();     
  }
  
  $scope.changeSorting = function(column) {    
      var sort = $scope.sort;

      if (sort.column == column) {
          sort.descending = !sort.descending;
      } else {
          sort.column = column;
          sort.descending = false;
      }      
  }; 
  
  $scope.changeSorting('review.review_id');     	
}

function ReviewDetailCtrl($scope, $http, $resource, $location, $routeParams, ReviewFactory){ 
  $scope.current_review_id = $routeParams.reviewId;   
  $scope.review = ReviewFactory.get({id: $scope.current_review_id});
  $scope.max_rating = 5;
  $scope.stars = [];  
  
  $scope.review.$promise.then(function (result) {
    if($scope.review.drink_again == 1)
      $scope.review.drink_again = true;
      
    $scope.setRatingStars();          
  });          
  
  $scope.showReviewDetail = function(review_id) {         
    $location.path("/reviews/" + review_id);
  };
  
  $scope.deleteReview = function() {     
    ReviewFactory.delete({id: $scope.current_review_id});   
    $location.path("/reviews/"); 
  };                   

  $scope.saveReview = function() {        
		ReviewFactory.update({id: $scope.current_review_id},$scope.review);   
    $location.path("/reviews/"); 
  }   
  
  $scope.setRatingStars = function () {
    $scope.stars = [];
    
    for (var i = 0; i < $scope.max_rating; i++) {
        $scope.stars.push({
            filled: i < $scope.review.rating
        });
    }   
  } 
  
  $scope.toggleRating = function ($index) {
    $scope.review.rating = $index + 1;
    $scope.setRatingStars();
  }                      	
}

function NewReviewCtrl($scope, $timeout, $http, $location, ReviewFactory) {      
  $scope.review = {
    "beer_name": "",
    "maker": "",
    "drink_again": false,
    "rating": "0",
    "comments": ""
  };
  
  $scope.max_rating = 5;
  $scope.stars = [];                          

  $scope.saveReview = function() {       
    ReviewFactory.save($scope.review);                                                                
    $location.path("/reviews/");
  } 
  
  $scope.setRatingStars = function () {
    $scope.stars = [];
    
    for (var i = 0; i < $scope.max_rating; i++) {
        $scope.stars.push({
            filled: i < $scope.review.rating
        });
    }   
  } 
  
  $scope.toggleRating = function ($index) {
    $scope.review.rating = $index + 1;
    $scope.setRatingStars();
  }
  
  $scope.setRatingStars();                   
}
    