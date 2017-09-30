module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    '../css/style.css': 'styles/style.scss'
                }
            }
        },

        bake: {
            your_target: {
                options: {
                },

                files: {
                    "../index.html": "html/index.html"
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },

            bake: {
                files: [
                    'html/*.html',
                    'html/**/.html'
                ],
                tasks: ['bake']
            },

            sass: {
                files: [
                    'scss/**/*.scss'
                ],
                tasks: ['sass', 'postcss']
            }
            
        },
        
        postcss: {
            options: {
              processors: [
                require('autoprefixer')({browsers: ['last 2 versions', 'ie 10']})
              ]
            },
            dist: {
              src: '../css/style.css'
            }
        },

        browserSync: {
            bsFiles: {
                src : [
                    'css/*.css',
                    'index.html',
                    'js/*.js'
                ]
            },
            options: {
                watchTask: true,
                server: './',
                index: '../index.html'
            }
        }

    });

    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['bake', 'sass', 'postcss',  'browserSync', 'watch']);
};
