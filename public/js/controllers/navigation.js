'use strict';

angular.module('navigation', []);

angular.module('navigation').controller('navigationCtrl', 
	function($scope){	
	    
  		$scope.main_navigation_list = [     
  			{ "title": "View Reviews",   "page":"reviews",     "selected": true },
  			{ "title": "Create New Review",   "page":"create-new-review",     "selected": false }
  	  ];
		
	    $scope.selected = $scope.previous = 0;
	   	$scope.currentSelectedTab = $scope.main_navigation_list[0];
		
	    $scope.setSelectedTab = function(tab){
	        $scope.currentSelectedTab = tab
	    }
	    
	    $scope.isSelected = function(tab){
	        if(tab == $scope.currentSelectedTab) return true;	        
	        return false;
	    }
	    
	    $scope.setSelected = function(index) {		
	        $scope.previous = $scope.selected;
	        $scope.selected = index;
	        $scope.main_navigation_list[$scope.previous].selected = false;
	        $scope.main_navigation_list[$scope.selected].selected = false;
	    };		
		
  	}
);
