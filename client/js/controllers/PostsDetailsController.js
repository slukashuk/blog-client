app.controller('PostPageController', ['$scope', '$routeParams', 'BlogService',
	function($scope, $routeParams, BlogService) {
		BlogService.getPost($routeParams.post_id).then(function(response) {
			$scope.post = response.data;	
		});

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
	}
]);