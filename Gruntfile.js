// Generated by CoffeeScript 1.8.0
(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        production: {
          files: {
            'dest/js/bundle.js': ['bower_components/jquery/dist/jquery.js', 'bower_components/jquery-cycle2/build/jquery.cycle2.js']
          }
        }
      },
      cssmin: {
        production: {
          files: {
            'dest/css/bundle.css': ['bower_components/bootstrap/dist/css/bootstrap.css', 'out/css/futura.css', 'out/css/style.css']
          }
        }
      },
      copy: {
        css: {
          expand: true,
          flatten: true,
          src: 'src/css/*.css',
          dest: 'out/css/'
        },
        files: {
          expand: true,
          flatten: true,
          src: 'src/files/**',
          dest: 'out/'
        },
        js: {
          expand: true,
          flatten: true,
          src: 'src/js/**',
          dest: 'out/js/'
        },
        production: {
          expand: true,
          flatten: true,
          src: ['out/**', '!out/js/**', '!out/css/**'],
          dest: 'dest/'
        }
      },
      stylus: {
        options: {
          compress: false
        },
        compile: {
          files: {
            'out/css/style.css': 'src/css/*.styl'
          }
        }
      },
      jade: {
        compile: {
          options: {
            data: function() {
              var jade_data;
              jade_data = require('./data.json');
              jade_data.env = 'dev';
              jade_data.timestamp = new Date();
              return jade_data;
            },
            pretty: true
          },
          files: {
            'out/index.html': ['src/*.jade']
          }
        },
        production: {
          options: {
            data: function() {
              var jade_data;
              jade_data = require('./data.json');
              jade_data.env = 'production';
              jade_data.timestamp = new Date();
              return jade_data;
            },
            pretty: false
          },
          files: {
            'out/index.html': ['src/*.jade']
          }
        }
      },
      watch: {
        css: {
          files: ['src/css/*.css'],
          tasks: ['copy'],
          options: {
            livereload: true
          }
        },
        styl: {
          files: ['src/css/*.styl'],
          tasks: ['stylus'],
          options: {
            livereload: true
          }
        },
        js: {
          files: ['src/js/*.js'],
          tasks: ['jshint', 'copy'],
          options: {
            livereload: true
          }
        },
        jade: {
          files: ['src/index.jade', 'src/jade/*.jade'],
          tasks: ['jade:compile'],
          options: {
            livereload: true
          }
        }
      },
      clean: {
        out: ['out'],
        dest: ['dest']
      },
      jshint: {
        all: ['src/js/*.js']
      }
    });
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['clean:out', 'stylus', 'jade:compile', 'copy:css', 'copy:js', 'copy:files']);
    return grunt.registerTask('export', ['clean:dest', 'build', 'jade:production', 'copy:production', 'cssmin:production', 'uglify:production', 'build']);
  };

}).call(this);
