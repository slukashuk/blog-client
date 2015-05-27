app.controller('PostPageController', ['$scope', '$routeParams', 'BlogService', 'ModalService',
	function($scope, $routeParams, BlogService, ModalService) {
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

		$scope.deleteComment = function(commentId){
		ModalService.showModal({
			templateUrl: "views/confirmation-dialog.html",
			controller: "ModalController"
		}).then(function(modal) {
			modal.element.modal();
			modal.close.then(function(result) {
				if(result !== 'Yes')
					return;
					
				BlogService
					.deleteComment($routeParams.post_id, commentId)
					.then(refreshComments);

			});
		});
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
app.controller('ModalController', function($scope, close) {
	 $scope.close = function(result) {
	 	close(result, 500); // close, but give 500ms for bootstrap to animate
	 };
});