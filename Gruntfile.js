// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'app/**/*.js']
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        // Concat
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        // cssmin
        cssmin: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        copy: {
            dist: {
                cwd: 'app',
                src: ['**', '!styles/**/*.css', '!styles/**/*.scss', '!scripts/**/*.js', '!images/cards/*.png'],
                dest: 'dist',
                expand: true
            },
            fonts: {
                files: [{
                    //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        usemin: {
            html: ['dist/*.html', 'dist/views/*.html'],
            options: {
                assetsDirs: ['dist/app/scripts', 'dist/app/styles']
            }
        },
        /*connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'dist',
                    keepalive: true
                }
            }
        }*/
        browserSync: {
            files: {
                src: [
                    'app/styles/*.css',
                    'app/**/*.html',
                    'app/scripts/*.js',
                    'app/images/*.png'
                ]
            },
            options: {
                watchTask: false,
                server: {
                    baseDir: "app",
                    index: "index.html",
                    routes: {
                        "/bower_components": "bower_components",
                        "/images": "images",
                        "/views": "views"
                    }
                }
            }
        },
        ngtemplates: {
            app: {
                src: 'app/**/*.html',
                dest: 'app/scripts/template.js',
                options: {
                    usemin: 'dist/scripts/main.js', // 
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives! 
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        }

        // all of our configuration will go here

    });



    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-angular-templates');

    // ============= // CREATE TASKS ========== //
    grunt.registerTask('build', ['clean', 'jshint', 'useminPrepare', 'ngtemplates', 'concat', 'uglify', 'cssmin', 'copy', 'usemin']);
    grunt.registerTask('serve', ['browserSync']);

};