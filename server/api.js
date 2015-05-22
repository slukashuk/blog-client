var express = require('express');

module.exports = function(store) {

	var router = express.Router();

	router.route('/posts')
		.get(function(req, res) {getPosts(req, res, store);})
		.post(function(req, res) {addPost(req, res, store);});

	router.route('/posts/:id')
		.get(function(req, res) {getPost(req, res, store);})
		.put(function(req, res) {updatePost(req, res, store);})
		.delete(function(req, res) {deletePost(req, res, store);});

	router.route('/posts/:id/comments')
		.get(function(req, res) {getComments(req, res, store);})
		.post(function(req, res) {addComment(req, res, store);});

	router.route('/posts/:pid/comments/:cid')
		.get(function(req, res) {getComment(req, res, store);})
		.put(function(req, res) {updateComment(req, res, store);})
		.delete(function(req, res) {deleteComment(req, res, store);});

	router.route('/search')
		.get(function(req, res) {search(req, res, store);});

	return router;
}

function getPosts(req, res, store) {
	console.log('GET /posts');
	if (req.query.length === undefined) {
		sendError(res, 400, 'Should specify [length] parameter');
		return;
	}
	var length = +req.query.length;

	console.log('Requested', length, 'posts');

	if (req.query.after !== undefined) {
		console.log('Requested', length, 'posts');
		var after = +req.query.after;
		store.getPostsAfter(after, length, onPostsReceived);
	} else if (req.query.begin !== undefined) {
		var begin = +req.query.begin;
		store.getPostsRange(begin, length, onPostsReceived);
	} else {
		sendError(res, 400, 'Should specify [begin] or [after] parameter');
	}

	function onPostsReceived(err, data) {
		if (err) {
			sendError(res, 400, err + '');
			return;
		}
		res.json(data);
	}
}

function addPost(req, res, store) {
	// req.body should already be a json
	store.addPost(req.body, function(err, post) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		res.json(post);
	});
}

function getPost(req, res, store) {
	var id = +req.params.id;
	store.getPost(id, function(err, post) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		if (!post) {
			sendError(res, 404, 'Could not find post id ' + id);
			return;
		}

		res.json(post);
	});
}

function deletePost(req, res, store) {
	var id = +req.params.id;

	store.deletePost(id, function(err, post) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		if (!post) {
			sendError(res, 404, 'Could not find post id ' + id);
			return;
		}

		res.json(post);
	});
}

function getComments(req, res, store) {
	var postId = +req.params.id;
	store.getComments(postId, function(err, comments) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		if (comments === null) {
			sendError(res, 404, 'Could not find post id ' + postId);
			return;
		}

		res.json(comments);
	});
}

function getComment(req, res, store) {
	var postId = +req.params.pid;
	var commentId = +req.params.cid;

	store.getComment(postId, commentId, function(err, comment) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		if (!comment) {
			sendError(res, 404, 'Could not find post id ' 
				+ postId + ' or comment id ' + commentId);
			return;
		}

		res.json(comment);
	});
}

function addComment(req, res, store) {
	var postId = +req.params.id;
	store.addComment(postId, req.body, function(err, comment) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		if (comment === null) {
			sendError(res, 404, 'Could not find post id ' + postId);
			return;
		}

		res.json(comment);
	});
}

function updateComment(req, res, store) {
	var postId = +req.params.pid;
	var commentId = +req.params.cid;
	store.updateComment(postId, commentId, req.body, function(err, comment) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		if (comment === null) {
			sendError(res, 404, 'Could not find post id ' + postId + ' or comment id '
				+ commentId);
			return;
		}

		res.json(comment);
	});
}

function deleteComment(req, res, store) {
	var postId = +req.params.pid;
	var commentId = +req.params.cid;
	store.deleteComment(postId, commentId, function(err, comment) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		if (comment === null) {
			sendError(res, 404, 'Could not find post id ' + postId + ' or comment id '
				+ commentId);
			return;
		}

		res.json(comment);
	});
}

function search(req, res, store) {
	var begin = +req.query.begin;
	var length = +req.query.length;
	var query = req.query.q;

	store.searchPosts(query, begin, length, function(err, posts) {
		if (err) {
			res.status(400);
			res.json(err);
			return;
		} 

		res.json(posts);
	});
}

function sendError(res, code, text) {
	res.status(code);
	res.json({
		error: text
	});
}
