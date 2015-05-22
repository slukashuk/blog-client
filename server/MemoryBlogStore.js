var BlogStoreSync = require('./BlogStoreSync');

exports = module.exports = MemoryBlogStore;

function MemoryBlogStore(data) {
	var delegate = this._delegate = new BlogStoreSync(data);

	for (var key in delegate) {
		var value = delegate[key];
		if (typeof value === 'function' && value[0] !== '_') {
			this[key] = decorateAsync(value, delegate);
		}
	}
}

function decorateAsync(f, context) {
	return function() {
		// remove callback from the args
		var cb = arguments[arguments.length - 1];
		var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
		process.nextTick(function() {
			try {
				cb(null, f.apply(context, args));
			} catch (e) {
				cb(e);
			}
		});
	}
}
