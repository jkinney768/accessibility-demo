module.exports = function(grunt) {


/* Configuring Grunt task options
   ========================================================================== */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['src/**/*.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     files: {
    //       'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //     }
    //   }
    // },

     // -- Styling Tasks ----------------------------------------------------

    less: {
      development: {
        options: {
          paths: ["app/assets/theme/styles"],
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "app/assets/theme/styles/application.css": "app/assets/theme/styles/application.less",
        }
      }
    },

    accessibility: {
      options : {
        accessibilityLevel: 'WCAG2A',
        outputFormat: 'json',
        force: true,
        domElement: true
      },
      test : {
        files: [{
          expand  : true,
          cwd     : '',
          src     : ['**.html'],
          dest    : 'reports/',
          ext     : '-report'
        }]
      }
    },


    // -- Icon Tasks ----------------------------------------------------

    // Automated icon generation task.  It's worth noting that there is currently a
    // a bug in grunticon where the automated icon coloring doesn't work if you try to
    // place the destination output outside the specified cwd. Also, the auto coloring
    // seems to produce blurred icons.  I've avoided that entirely on this project.
    // https://github.com/filamentgroup/grunticon/issues/164

    grunticon: {
        generate: {
            files: [{
                expand: true,
                cwd: 'app/assets/icon-src/',
                src: ['*.svg', '*.png'],
                dest: 'app/assets/icon-src/icon-output/'
            }],
            options: {
                pngpath: '../media/images/icon-fallbacks/',
                cssprefix: '.icon--',
                customselectors: {
                    'logo': ['.branding-logo']
                }
            }
        }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    jshint: {
      files: ['Gruntfile.js', 'app/modules/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'app/styles/**/*.less'],
      tasks: ['jshint', 'less'],
      // styles: {
      //   files: ['app/less/**/*.less'], // which files to watch
      //   tasks: ['less'],
      //   options: {
      //     nospawn: true
      //   }
      // }
    },

    // -- Utility Tasks ----------------------------------------------------

        // Automatically removes generated files and directories. Useful for
        // rebuilding the project with fresh copies of everything.
        clean: {
            options: {
                // force: '<%= env.UNSAFE_MODE %>'
            },
            dest: ['app/web'],
            docs: ['app/docs'],
            tmp: ['app/tmp'],

            // Will be set up to clean production components
            //production: ['<%= env.DIR_THEME %>/assets']
        },

        // Copies any files that should be moved to the destination directory
        // that are not already handled by another task.
        copy: {
            media: {
                files: [{
                    expand: true,
                    cwd: 'app/src',
                    src: [
                        '*.html',
                        '*.js',  // TODO: Move any JS in the /src root to a new directory
                        'assets/media/**',
                        'assets/styles/*.css'
                    ],
                    dest: 'app/web',
                }]
            },

            // This will copy to our production directories

            // productionMedia: {
            //     files: [{
            //         expand: true,
            //         cwd: '<%= env.DIR_SRC %>',
            //         src: ['assets/media/**'],
            //         dest: '<%= env.DIR_THEME %>',
            //     }]
            // },


            iconPngs: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'app/icon-src/icon-output/png/',
                    src: [
                        '*.png'
                    ],
                    dest: 'app/assets/media/images/icon-fallbacks/'
              }]
            },

            // This will copy to our production directories

            // productionIconPngs: {
            //     files: [{
            //         expand: true,
            //         flatten: true,
            //         cwd: '<%= env.DIR_SRC %>/icon-src/icon-output/png/',
            //         src: [
            //             '*.png'
            //         ],
            //         dest: '<%= env.DIR_THEME %>/assets/media/images/icon-fallbacks/'
            //   }]
            // },


            iconStyles: {
              files: [{
                expand: true,
                flatten: true,
                    cwd: 'app/icon-src/icon-output/',
                    src: [
                        '*.css'
                    ],
                    dest: 'app/assets/styles/'
              }]
            },

            // This will copy to our production directories

            // productionIconStyles: {
            //   files: [{
            //     expand: true,
            //     flatten: true,
            //         cwd: '<%= env.DIR_SRC %>/icon-src/icon-output/',
            //         src: [
            //             '*.css'
            //         ],
            //         dest: '<%= env.DIR_THEME %>/assets/styles/'
            //   }]
            // }
        }

  });


/* Loading in Grunt tasks
   ========================================================================== */

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-accessibility');
  // grunt.loadNpmTasks('grunt-contrib-concat');
 


/* Registered Grunt tasks
   ========================================================================== */
  grunt.registerTask('default', ['less']);
  grunt.registerTask('report', ['accessibility']);
};