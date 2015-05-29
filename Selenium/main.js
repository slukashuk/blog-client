var driver = require('webdriverio');

var options = {
	desiredCapabilities: {
		browserName: 'firefox'
	}
};

driver
 	.remote(options)
 	.init()
 	.url('http://localhost:3003/')
 	.title(function(err, title){
 		console.log(title);
 	})
 	.end();