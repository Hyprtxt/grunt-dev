module.exports = ( grunt )->
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		stylus: 
			options:
				compress: false
			compile:
				files: 
					'out/css/style.css': 'src/css/style.styl'
	})
	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.registerTask('default', ['stylus'])
	# grunt.registerTask('build', ['stylus:build'])
