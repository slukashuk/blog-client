var http = require('http');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var api = require('./api');

var data = require('../data/posts.json');
var MemoryBlogStore = require('./MemoryBlogStore');

var app = express();
app.use(cors());

var server = http.createServer(app);

var sessionMiddleware = session({
	secret: 'keyboardcat',
	saveUninitialized: true,
	resave: true
});

app.use(express.static(__dirname + '/../client/'));
app.use('/uploads', express.static(__dirname + '/../uploads'));

app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api(new MemoryBlogStore(data)));

server.listen(3003);
console.log('Initialized on port 3003');