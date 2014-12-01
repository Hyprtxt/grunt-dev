module.exports = ( grunt ) ->
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		stylus:
			options:
				compress: false
			compile:
				files:
					'out/css/style.css': 'src/css/style.styl'

		jade:
			compile:
				options:
					data:
						debug: true
					pretty: true
				files:
					'out/index.html': ['src/*.jade']

		watch:
			css:
				files: ['src/css/*.styl']
				tasks: ['stylus']
				options:
					livereload: true
			html:
				files: ['src/index.jade', 'src/jade/*.jade']
				tasks: ['jade']
				options:
					livereload: true
		clean: ['out']
	})
	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.registerTask('default', ['watch'])
	grunt.registerTask('build', ['clean','stylus','jade'])

	# grunt.event.on('watch', ( action, filepath, target ) ->
	# 	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	# );