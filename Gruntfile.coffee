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
						'out/css/futura.css'
						'out/css/style.css'
					]

		copy:
			css: 
				expand: true
				flatten: true
				src: 'src/css/*.css'
				dest: 'out/css/'
			files:
				expand: true
				flatten: true
				src: 'src/files/**'
				dest: 'out/'
			# html:
			# 	expand: true
			# 	flatten: true
			# 	src: 'src/*.html'
			# 	dest: 'out/'
			production:
				expand: true
				flatten: true
				src: ['out/**', '!out/js/**', '!out/css/**']
				dest: 'dest/'


		stylus:
			options:
				compress: false
			compile:
				files:
					'out/css/style.css': 'src/css/*.styl'

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
					'out/index.html': ['src/*.jade']
			production:
				options:
					data: ()->
						jade_data = require( './data.json' )
						jade_data.env = 'production'
						jade_data.timestamp = new Date()
						jade_data
					pretty: false
				files:
					'out/index.html': ['src/*.jade']

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
			jade:
				files: ['src/index.jade', 'src/jade/*.jade']
				tasks: ['jade:compile']
				options:
					livereload: true
		clean: 
			out: ['out']
			dest: ['dest']
	})

	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-cssmin')

	grunt.registerTask('default',
		[
			'build'
			'watch'
		]
	)
	grunt.registerTask('build',
		[
			'clean:out'
			'stylus'
			'jade:compile'
			'copy:css'
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
		]
	)

	# grunt.event.on('watch', ( action, filepath, target ) ->
	# 	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	# );

	# grunt.event.on('stylus', ( action, filepath, target ) ->
	# 	grunt.log.writeln( env )
	# 	console.log( 'event!' );
	# );
