## Hyprtxt Static

This is my personal preferred development stack.

	* Jade
	* Stylus/Nib
	* Live Reload

### Get Started

	* Clone the repo `git clone ...`
	* Install Dependancies `npm install`
	* Run Grunt `grunt` or `grunt watch`

	You will also need an HTTP server, I prefer nginx. If you don't already have a local server, SimpleHTTPServer is a good option. You'll need another terminal window.

	```bash
	cd out/
	python -m SimpleHTTPServer
	```

### Commands

	* `grunt` default task is watch
	* `grunt stylus` compile stylus
	* `grunt jade` compile jade
	* `grunt clean` clean up the out directory
	* `grunt build` clean, jade then stylus

