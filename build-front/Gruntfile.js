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
                    '../css/style.css': 'styles/style.scss',
                    '../css/ie8.css': 'styles/ie8.scss'
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
                    'html/**/*.html'
                ],
                tasks: ['bake']
            },

            sass: {
                files: [
                    'styles/*.scss'
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
              src: '../css/*.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['bake', 'sass', 'postcss', 'watch']);
};
