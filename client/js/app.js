var app = angular.module('blog', ['ngRoute','angularModalService']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/post-list.html'
		})
		.when('/posts/:post_id', {
			controller: 'PostPageController',
			templateUrl: 'views/post-details.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});