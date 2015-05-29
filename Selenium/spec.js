describe('angular test', function() {
	it ('should have a title', function() {
		browser.ignoreSynchronization = true; // set to ignore non-Angular web-sites
		browser.get('http://google.com.ua');
		
		element(by.id('lst-ib')).sendKeys('selenium');
		element(by.id('sblsbb')).click();
		browser.wait(function() {
			return browser.isElementPresent(by.partialLinkText('Selenium - Web Browser'));
		});

		element(by.linkText('Selenium - Web Browser Automation')).click();
		
		expect(browser.getTitle()).toEqual('Selenium - Web Browser Automation');
	});
});


// If I need to wait some element is present
// =========================================

// 1. 
//   browser.driver.wait(function() {
//       return browser.driver.isElementPresent(by.xpath("//a[@href='#/contacts']"));
//   }); 
// 
// 2. expect(ptor.isElementPresent(waitLoading)).toBeTruthy();
//
// 3. 
// http://stackoverflow.com/questions/22072327/how-can-i-wait-for-a-condition
// examples of way fix this problem  



    
