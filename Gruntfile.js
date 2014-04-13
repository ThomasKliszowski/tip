module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      css: {
        files: ['src/**/*.less', 'example/**/*.less'],
        tasks: ['less:develop'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['example/**/*.html'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/**/*.js', 'example/**/*.js'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bower:install'],
        options: {
          spawn: false
        }
      }
    },
    concat: {
      dist: {
        files: {
          'dist/jquery.tip.js': [
            'bower-components/transitionEnd/transition-end.min.js',
            'src/jquery.tip.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          "dist/jquery.tip.min.js": "dist/jquery.tip.js"
        }
      }
    },
    less: {
      develop: {
        options: {
          sourceMap: true
        },
        files: {
          "example/builds/style.css": "example/less/style.less"
        }
      },
      dist: {
        files: {
          "dist/jquery.tip.css": "example/less/build.less"
        }
      }
    },
    bower: {
      install: {
        forceLatest: false,
        options: {
          targetDir: 'bower-components',
          layout: 'byComponent',
          install: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          livereload: true,
          open: {
            target: 'http://localhost:8000/example/'
          }
        }
      }
    }
  });

  grunt.registerTask('default', []);

  grunt.registerTask('server', [
    'bower:install',
    'less:develop',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    'bower:install',
    'less:dist',
    'concat:dist',
    'uglify:dist'
  ]);

};