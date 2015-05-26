app.controller('PostPageController', ['$scope', '$routeParams', 'BlogService',
	function($scope, $routeParams, BlogService) {
		$scope.editingDisabled = true;
		
		var loadPost = function(){
			BlogService.getPost($routeParams.post_id).then(function(response) {
					$scope.post = response.data;	
				});
		}; 
 
 		loadPost();

 		$scope.cancelEditing = function(){
 			$scope.editingDisabled = true;
 			loadPost();
 		};

		var refreshComments = function(){
			BlogService.getComments($routeParams.post_id).then(function(response) {
				$scope.comments = response.data;	
			});
		};

		refreshComments();

		$scope.addComment = function(comment) {
			BlogService
				.addComment($routeParams.post_id, comment)
				.then(refreshComments);
		};

		$scope.savePost = function(){
            BlogService
            	.savePost($scope.post)
                .then(function(){
            		$scope.editingDisabled = true;
            	});
		};
	}
]);
