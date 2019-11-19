module.exports = function (grunt) {

    const webpackConfig = require('./webpack.config.js');
    const conf = {
        cwd: 'src/',
        dest: 'dist/',

        vendorCwd: 'node_modules/',
        jsCwd: 'src/scripts/',
        jsDest: 'dist/js/',
        jsCompile: 'comp/',

        viewsCwd: 'src/views/',
        viewsDest: 'dist/'
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {
            config: webpackConfig,
        },

        /**
         * Copy Files & Dependencies
         */
        copy: {
            views: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: conf.viewsCwd,
                    src: ['**/**.html'],
                    dest: conf.viewsDest
                }]
            },
            js: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: conf.jsCwd,
                    src: [
                        '**/**.js',
                    ],
                    dest: conf.jsDest
                }]
            },
            jsVendor: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: conf.vendorCwd,
                    src: [
                        "document-register-element/build/document-register-element.js"
                    ],
                    dest: conf.jsDest
                }]
            }
        },


        /**
         * Watch Tasks
         */
        watch: {
            scripts: {
                files: [
                    conf.jsCwd + '**/*.ts'
                ],
                tasks: ['webpack'],
                options: {
                    spawn: false
                }
            },
            views: {
                files: [
                    conf.viewsCwd + '/**'
                ],
                tasks: ['copy'],
                options: {
                    spawn: false
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Define Task(s)
    grunt.registerTask('default', ['webpack', 'copy']);
    grunt.registerTask('dev', ['default', 'watch']);
};