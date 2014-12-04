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

### Jade Templating

There is a data.json file in the root dir that handles site wide template data.

### Commands

* `grunt` default task is watch (LiveReload with Stylus and Jade templates)
* `grunt stylus` compile stylus
* `grunt jade` compile jade
* `grunt clean` clean up the out & dest directories
* `grunt build` clean, jade then stylus
* `grunt export` builds, concatonates and minifies to `dest/`

