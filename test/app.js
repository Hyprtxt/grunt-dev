process.env.NODE_ENV = 'test';
// use zombie.js as headless browser
var Browser = require('zombie');
// var assert = require('assert');

var setupBrowser = function() {
  this.browser = new Browser({ site: 'http://local.hyprtxt.com' });
}
var visit = function (done, dest) {
  this.browser.visit(dest, done);
}

describe('home page', function() {
  before( setupBrowser() );
 
  // load the contact page
  // '/grunt/dest'
  before( visit( done, '/grunt/dest') );

  it('should return HTTP 200', function() {
    this.browser.assert.status(200);
  })

  it('should show a title', function() {
    // this.browser.assert.elements('.container', 3);
    this.browser.assert.text('title', 'The Title');
    // this.browser.assert.text('h2', 'Hyprtxt Static');
  });

  // it('should refuse empty submissions');
});

describe('error page', function() {
  before( setupBrowser );

  before(function(done) {
    this.browser.visit('/grunt/dest', done);
  });

  it('should return a 404', function () {
    this.browser.assert.status(404);
  });

});
