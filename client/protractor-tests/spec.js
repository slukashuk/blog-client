
var apiBase = 'http://localhost:3003/#/';

describe('Blog Suite', function(){

	it('should have a title', function(){
		browser.get(apiBase);
		expect(browser.getTitle()).toEqual('Blog');
		});

	it('should load existing on server posts', function(){
		browser.get(apiBase + 'index.html');
		var posts = getAllPosts();
		expect(posts.count()).toEqual(2);
		});

	it('should show just added post', function(){
		browser.get(apiBase + 'index.html');
		var posts = getAllPosts();
		element(by.id('Text')).sendKeys('Post')
		element(by.id('AddPost')).click();
		expect(posts.count()).toEqual(3);
		
		});

	it('should load post detailes', function(){
		browser.get(apiBase + 'posts/1');
		getAllComments();
		expect(element(by.id('EditPost')).isPresent()).toBe(true);

		});

	it('should delete just added post', function(){
		browser.get(apiBase + 'index.html');
		var posts = getAllPosts();

		element(by.css('.glyphicon.glyphicon-trash')).click();
		element(by.css('.btn.btn-primary')).click();
		setTimeout(function(){
			
		}, 20000);
		expect(posts.count()).toEqual(3);
		
	});
});

function getAllPosts(){
	return element.all(by.repeater('post in posts'));
};

function getAllComments(){
	return element.all(by.repeater('comment in comments'));
};


