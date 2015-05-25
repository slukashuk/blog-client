app.controller('PostPageController', ['$scope','BlogService', '$routeParams',
	function($scope, BlogService,$routeParams) {

		var posts;
		BlogService.getPosts().then(function(posts_list) {

			posts = posts_list.data; //[{},{}]

			// $scope.post = posts.filter(function(post_object){
			// 	 return post_object.id == $routeParams.post_id 
			// })[0]

			var filteredPosts = posts.filter(function(post_object){
				return post_object.id == $routeParams.post_id 
			})
			
			$scope.post = filteredPosts[0];
				
			//------------------------------------------------
			// posts.forEach(function(post_object){
			// 	if(post_object.id == $routeParams.post_id){
			// 		$scope.post = post_object
			// 	}
			// })	

			// for (var i = 0; i < posts.length; i++) {
			// 	if(posts[i].id == $routeParams.post_id){
			// 		$scope.post = posts[i]
			// 	}
			// };		

		});
}]);