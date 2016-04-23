module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            scripts: {
                files: 'app/**/*.js',
                tasks: ['browserify'],
                options: {
                    interrupt: true
                }
            },
            templates: {
                files: 'app/**/*.hbs',
                tasks: ['handlebars'],
                options: {
                    interrupt: true
                }
            },
            copy: {
                files: 'static/**',
                tasks: ['copy']
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: false,
                    commonjs: true,
                    processName: function (filename) {
                        return filename.replace('app/templates', '').replace('.hbs', '');
                    }
                },
                src: "app/templates/**/*.hbs",
                dest: "app/templates/compiledTemplates.js"
            }
        },

        browserify: {
            options: {
                debug: true,
                aliasMappings: [
                    {
                        cwd: 'app/',
                        src: ['**/*.js'],
                        dest: 'app/'
                    }
                ]
            },
            app: {
                src: [ 'app/**/*.js' ],
                dest: 'static/bundle.js'
            }
        },

        copy: {
            build: {
                files: [
                    {
                        cwd: 'static',
                        expand: true,
                        src: ['**/**'],
                        dest: '../api/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('runNode', function () {
        grunt.util.spawn({
            cmd: 'node',
            args: ['./node_modules/.bin/nodemon', 'server.js'],
            opts: {
                stdio: 'inherit'
            }
        }, function () {
            grunt.fail.fatal(new Error("nodemone quit"));
        });
    });
    grunt.registerTask('build', ['copy']);

    grunt.registerTask('compile', ['handlebars', 'browserify']);

    grunt.registerTask('server', ['compile', 'runNode', 'watch']);

    grunt.registerTask('default', ['compile']);
};