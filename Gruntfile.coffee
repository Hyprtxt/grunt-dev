# jade_data = {
# 	title: 'The Site Title'
# 	env: 'dev'
# 	description: 'This is the SEO description'
# }

module.exports = ( grunt ) ->

	# target = grunt.option('target') || 'dev'

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		uglify:
			production:
				files:
					'dest/js/bundle.js': [
						'bower_components/jquery/dist/jquery.js'
						'bower_components/jquery-cycle2/build/jquery.cycle2.js'
					]

		cssmin:
			production:
				files:
					'dest/css/bundle.css': [
						'bower_components/bootstrap/dist/css/bootstrap.css'
						'dev/css/futura.css'
						'dev/css/style.css'
					]

		copy:
			css:
				expand: true
				cwd: 'src/css/'
				src: '*.css'
				dest: 'dev/css/'
			files:
				expand: true
				cwd: 'src/files/'
				src: '**'
				dest: 'dev/'
			js:
				expand: true
				cwd: 'src/js/'
				src: '**'
				dest: 'dev/js/'
			# html:
			# 	expand: true
			# 	flatten: true
			# 	src: 'src/*.html'
			# 	dest: 'dev/'
			production:
				expand: true
				flatten: false
				cwd: 'dev'
				src: ['**', '!js/**', '!css/**']
				dest: 'dest/'

		stylus:
			options:
				compress: false
			compile:
				files:
					'dev/css/style.css': 'src/css/*.styl'

		jade:
			compile:
				options:
					data: ()->
						jade_data = require( './data.json' )
						jade_data.env = 'dev'
						jade_data.timestamp = new Date()
						jade_data
					pretty: true
				files:
					'dev/index.html': ['src/*.jade']
			production:
				options:
					data: ()->
						jade_data = require( './data.json' )
						jade_data.env = 'production'
						jade_data.timestamp = new Date()
						jade_data
					pretty: false
				files:
					'dev/index.html': ['src/*.jade']

		watch:
			css:
				files: ['src/css/*.css']
				tasks: ['copy']
				options:
					livereload: true
			styl:
				files: ['src/css/*.styl']
				tasks: ['stylus']
				options:
					livereload: true
			js:
				files: ['src/js/*.js']
				tasks: ['jshint', 'copy']
				options:
					livereload: true
			jade:
				files: ['src/index.jade', 'src/jade/*.jade']
				tasks: ['jade:compile']
				options:
					livereload: true

		clean: 
			dev: ['dev']
			dest: ['dest']

		jshint:
			all: ['src/js/*.js']

		open:
			dev: 
				path: 'http://localhost'
			subl:
				path: '.'
				app: 'Sublime Text'
	})

	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-jade')

	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-copy')

	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-cssmin')

	grunt.loadNpmTasks('grunt-contrib-jshint')

	grunt.loadNpmTasks('grunt-open')

	grunt.registerTask('default',
		[
			'build'
			'watch'
		]
	)
	grunt.registerTask('build',
		[
			'clean:dev'
			'stylus'
			'jade:compile'
			'copy:css'
			'copy:js'
			'copy:files'
		]
	)
	grunt.registerTask('export',
		[
			'clean:dest'
			'build'
			'jade:production'
			'copy:production'
			'cssmin:production'
			'uglify:production'
			'build'
			# 'clean:post'
		]
	)

	# grunt.event.on('watch', ( action, filepath, target ) ->
	# 	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	# );

	# grunt.event.on('stylus', ( action, filepath, target ) ->
	# 	grunt.log.writeln( env )
	# 	console.log( 'event!' );
	# );
