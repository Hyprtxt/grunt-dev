jade_data = {
	title: 'The Site Title'
	env: process.env.ENV || 'dev'
	description: 'This is the SEO description'
}

module.exports = ( grunt ) ->
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
			# html:
			# 	expand: true
			# 	flatten: true
			# 	src: 'src/*.html'
			# 	dest: 'out/'
			production:
				expand: true
				flatten: true
				src: 'out/*.html'
				dest: 'dest/'

		stylus:
			options:
				compress: false
			compile:
				files:
					'out/css/style.css': 'src/css/*.styl'

		jade:
			options:
				data: jade_data
					# debug: true
				pretty: true
			compile:
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
				tasks: ['jade']
				options:
					livereload: true
		clean: ['out', 'dest']
	})

	# env = grunt.option('env') || 'dev'

	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-cssmin')

	grunt.registerTask('default',
		[
			'build',
			'watch'
		]
	)
	grunt.registerTask('build',
		[
			'clean',
			'stylus',
			'jade',
			'copy:css'
		]
	)
	grunt.registerTask('export',
		[
			'build',
			'copy:production',
			'cssmin:production',
			'uglify:production'
		]
	)

	# grunt.event.on('watch', ( action, filepath, target ) ->
	# 	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	# );

	# grunt.event.on('stylus', ( action, filepath, target ) ->
	# 	grunt.log.writeln( env )
	# 	console.log( 'event!' );
	# );
