app.service('BlogService', function($http) {

	this.getPosts = function(begin) {
		return $http({
			url: 'http://localhost:3003/api/posts?begin=' + begin + '&length=5',
			method: 'GET'
		});
    };

    this.getPost = function(postId) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId,
			method: 'GET'
		});
    };

    this.addPost = function (post) {
	    return $http({
			url: 'http://localhost:3003/api/posts',
			method: 'POST',
			data: post
		});
    };

	this.deletePost = function(postId) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId,
			method: 'delete'
		});
    };
    
    this.savePost = function (post) {
	    return $http({
			url: 'http://localhost:3003/api/posts/' + post.id,
			method: 'PUT',
			data: post
		});
    };

    this.addComment = function (postId, comment){
	    return $http({
			url: 'http://localhost:3003/api/posts/' + postId + '/comments',
			method: 'POST',
			data: comment
		});
    };

    this.getComments = function (postId){
	    return $http({
			url: 'http://localhost:3003/api/posts/' + postId + '/comments',
			method: 'GET'
		});
    };

});
