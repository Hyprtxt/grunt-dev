## Static Website Builder

* Jade
* Stylus/Nib
* Live Reload

### Get Started

* Clone the repo `git clone ...`
* Install Global Dependancies `npm install -g bower grunt-cli`
* Install Server Side Dependancies `npm install`
* Install Client Side Dependancies `bower install`
* Run Grunt `grunt` or `grunt watch`

You will also need an HTTP server, I prefer nginx. If you don't already have a local server, SimpleHTTPServer is a good option. You'll need another terminal window.

```bash
cd out/
python -m SimpleHTTPServer
```

### Jade Templating

There is a data.json file in the root dir that handles site wide template data.

### Commands

* `grunt` default task is watch (LiveReload with Stylus and Jade templates)
* `grunt watch` same as above, outputs a dev version of the site to `dev/` and starts a livereload server
* `grunt stylus` compile stylus
* `grunt jade` compile jade
* `grunt clean` clean up the out & dest directories
* `grunt build` clean, jade then stylus
* `grunt export` builds, concatonates and minifies to `dest/`

