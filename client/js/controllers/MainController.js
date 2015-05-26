app.controller('MainController', function($scope, BlogService) {
	var loadPosts = function() {
		BlogService.getPosts(0).then(function(payload) {
			$scope.posts = payload.data;
		});
	};

	loadPosts();

	$scope.showOldPosts = function (){

		BlogService.getPosts($scope.posts.length).then(function(payload) {
			
			$scope.posts = $scope.posts.concat(payload.data);
			
		});
	};

	$scope.addPost = function(post) {
		BlogService
			.addPost(post)
			.then(loadPosts);
	};
});
