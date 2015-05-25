app.controller('MainController', function($scope, BlogService) {
	var refreshPosts = function() {
		BlogService.getPosts().then(function(payload) {
			$scope.posts = payload.data;
		});
	};

	refreshPosts();

	$scope.addPost = function(post) {
		BlogService
			.addPost(post)
			.then(refreshPosts);
	};
});
