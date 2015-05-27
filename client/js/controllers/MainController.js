app.controller('MainController', function($scope, ModalService, BlogService) {
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

	var deletePost = function(postId){
		BlogService
		 	.deletePost(postId)
		 	.then(loadPosts);
	};

	$scope.deletePost = function(postId){
		ModalService.showModal({
			templateUrl: "views/confirmation-dialog.html",
			controller: "ModalController"
		}).then(function(modal) {
			modal.element.modal();
			modal.close.then(function(result) {
				if(result !== 'Yes')
					return;
					
				deletePost(postId);
			});
		});
	};
});

app.controller('ModalController', function($scope, close) {
	 $scope.close = function(result) {
	 	close(result, 500); // close, but give 500ms for bootstrap to animate
	 };
});
