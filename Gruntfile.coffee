jade_data = {
	title: 'The Site Title'
	env: process.env.ENV || 'dev'
	description: 'This is the SEO description'
}

module.exports = ( grunt ) ->
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		copy:
			css: 
				expand: true
				flatten: true
				src: 'src/css/*.css'
				dest: 'out/css/'
			html:
				expand: true
				flatten: true
				src: 'src/*.html'
				dest: 'out/'

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
		clean: ['out']
	})

	# env = grunt.option('env') || 'dev'

	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-copy')

	grunt.registerTask('default', ['watch'])
	grunt.registerTask('build', ['clean', 'stylus', 'jade', 'copy:css'])

	# grunt.event.on('watch', ( action, filepath, target ) ->
	# 	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	# );

	# grunt.event.on('stylus', ( action, filepath, target ) ->
	# 	grunt.log.writeln( env )
	# 	console.log( 'event!' );
	# );
