var MemoryBlogStore = require('./MemoryBlogStore');

var blogStore = new MemoryBlogStore();

blogStore.addPost({
	text: 'Hello'
}, function(err, post) {
	console.log(err, post);
});

blogStore.addPost({
	text: 'Hello'
}, function(err, post) {
	console.log(err, post);
});

blogStore.addPost({
	text: 'Hello'
}, function(err, post) {
	console.log(err, post);
});

// blogStore.getPostsRange(0, 2, function(err, posts) {
// 	console.log(err, posts)
// });

blogStore.getPostsAfter(1, 2, function(err, posts) {
 	console.log(err, posts)
});