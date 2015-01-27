# Reap Report Maker Application

## Static Website Builder

* Jade
* Stylus/Nib
* Live Reload

### Installing Client Side Deps with BOWER

1. `bower install --save SOMETHING`
1. Add scripts to `src/jade/footer.jade`
1. Add stylesheets to `src/jade/header.jade`
1. Add scripts the uglify task in `Gruntfile.coffee`
1. Add stylesheets to the cssmin task in `Gruntfile.coffee`

Adding your includes to `header.jade` and `footer.jade` files allows thier use in the `/dev` version of the site. Files are included in the exported `/dest` version of the site when you add them to the Gruntfile tasks.


### Get Started

#### Webserver

You will also need an HTTP server, I prefer nginx. If you don't already have a local server, SimpleHTTPServer is a good option. You'll need another terminal window.

```bash
python -m SimpleHTTPServer
```

You should serve up the whole `reportmaker` directory on your webserver. This means you will develop your site at the url `/reportmaker/dev`

#### Command Line Stuff

* Clone the repo `git clone ...`
* Install Global Dependancies `npm install -g bower grunt-cli`
* Install Server Side Dependancies `npm install`
* Install Client Side Dependancies `bower install`
* Run Grunt `grunt` or `grunt watch`

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

### Edge Cases

Fontawesome - You'll need to copy the /fonts directory into `src_files` to make it work in production, any bower component that does an relative internal 'require', 'url' or 'import' call will run into this sort of thing.

Google Fonts - I really wish Bower and Google Fonts would play nice together, but they just don't. For now just use the `bypass` configuration section to include the stylesheet directly from the CDN. (even in production)
