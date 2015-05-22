exports = module.exports = BlogStoreSync;

function BlogStoreSync(posts) {
	this._posts = [];
	this._maxPostId = 0;
	this._maxCommentId = 0;
	this._init(posts);
}

var _p = BlogStoreSync.prototype;

_p._init = function(posts) {
	if (!posts) {
		return;
	}

	var self = this;
	posts.forEach(function(it) {
		self._posts.push(it);
		if (it.id > self._maxPostId) {
			self._maxPostId = it.id;
		}
	});
}

_p.addPost = function(post) {
	post.id = ++this._maxPostId;
	post.comments = [];
	this._posts.push(post);
	return post;
};

_p.getPostsRange = function(begin, length) {
	console.log('Getting posts range from', begin, 'total', length, 'posts');
	var posts = this._posts.slice(begin, begin + length);
	return posts.map(function(it) {
		return stripText(stripComments(it));
	});
};

_p.getPostsAfter = function(id, length) {
	var index = this._getPostIndex(id);
	return this.getPostsRange(index + 1, length);
};

_p.getPost = function(id) {
	var fullPost = this._getFullPost(id);

	if (fullPost == null) {
		return null;
	}

	return stripComments(fullPost);
};

_p.updatePost = function(id, post) {
	var index = this._getPostIndex(id);
	if (index === -1) {
		return null;
	}
	var oldPost = this._posts[index];

	post.id = oldPost.id;
	post.comments = oldPost.comments;

	this._posts[index] = post;
	return post;
};

_p.deletePost = function(id) {
	var index = this._getPostIndex(id);
	if (index === -1) {
		return null;
	}
	return this._posts.splice(index, 1)[0];
};

_p.searchPosts = function(text, begin, length) {
	var result = this._posts.filter(function(post) {
		return post.title.indexOf(text) !== -1 
			|| post.text.indexOf(text) !== -1;
	});

	return result.splice(begin, length).map(function(it) {
		return stripComments(it);
	});
};

_p.addComment = function(postId, comment) {
	var post = this._getFullPost(postId);
	if (post === null) {
		return null;
	}

	comment.id = ++this._maxCommentId;
	post.comments.push(comment);
	return comment;
};

_p.getComments = function(postId) {
	var fullPost = this._getFullPost(postId);
	if (fullPost == null) {
		return null;
	}

	return fullPost.comments;
};

_p.getComment = function(postId, commentId) {
	var post = this._getFullPost(postId);
	if (post === null) {
		return null;
	}

	var index = this._getCommentIndex(post, commentId);
	if (index === -1) {
		return null;
	}

	return post.comments[index];
};

_p.updateComment = function(postId, commentId, comment) {
	var post = this._getFullPost(postId);
	if (post === null) {
		return null;
	}

	var index = this._getCommentIndex(post, commentId);
	if (index === -1) {
		return null;
	}

	comment.id = commentId;
	post.comments[index] = comment;
	return comment;
};

_p.deleteComment = function(postId, commentId) {
	var post = this._getFullPost(postId);
	if (post === null) {
		return null;
	}

	var index = this._getCommentIndex(post, commentId);
	if (index === -1) {
		return null;
	}

	return post.comments.splice(index, 1)[0];
};

_p._getPostIndex = function(id) {
	for(var i = 0; i < this._posts.length; i++) {
		if (id === this._posts[i].id) {
			return i;
		}
	}
	return -1;
};

_p._getCommentIndex = function(post, commentId) {
	for (var i = 0; i < post.comments.length; i++) {
		if (post.comments[i].id === commentId) {
			return i;
		}
	}

	return -1;
};

_p._getFullPost = function(id) {
	var index = this._getPostIndex(id);
	if (index === -1) {
		return null;
	}
	return this._posts[index]
};

function stripComments (post) {
	return cloneIgnoring(post, ['comments']);
};

function stripText (post) {
	var moreTagIndex = post.text.indexOf('--more--');

	if (moreTagIndex !== -1) {
		post.text = post.text.substring(0, moreTagIndex);
	}
	return post;
};

function cloneIgnoring(obj, ignoreList) {
	var result = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && ignoreList.indexOf(key) === -1) {
			result[key] = obj[key];
		}
	}
	return result;
}