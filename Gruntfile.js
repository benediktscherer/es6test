module.exports = function (grunt) {

    var babel = require('rollup-plugin-babel');
    var typescript = require('rollup-plugin-typescript');
    var multiEntry = require('rollup-plugin-multi-entry');

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


        babel: {
            options: {
                sourceType: 'module',
                sourceMap: true,
                cwd: conf.jsCwd
            },
            dist: {
                files: {
                    'dist/js/babel.js': 'src/scripts/**/*.ts'
                }
            }
        },


        /**
         * https://rollupjs.org
         * https://www.npmjs.com/package/grunt-rollup
         */
        rollup: {
            options: {
                presets: [],
                dir: conf.jsDest,
                plugins: [
                    typescript(),
                    multiEntry()
                ]
            },

            bundle: {
                src: [
                    conf.jsCwd + '/index.ts',
                ],
                dest: conf.jsDest + 'rollup.js',
            },
            components: {
                src: [
                    conf.jsCwd + '/components/**/*.ts'
                ],
                dest: conf.jsDest + 'components',
            },
        },


        /**
         * Browserify
         * https://github.com/jmreidy/grunt-browserify
         * https://github.com/browserify/browserify
         * https://mitchgavan.com/es6-modules/
         */
        browserify: {
            options: {
                sourceType: 'module',
                debug: true,
                extensions: ['.ts', '.js'],
                plugins: [
                    'tsify', {
                        target: 'es6'
                    }
                ],
                transform: [
                    [
                        "babelify", {presets: ["@babel/env"], extensions: ['.tsx', '.ts']}
                    ]
                ],
                external: []
            },

            app: {
                src: [
                    conf.jsCompile + '/**/*.js',
                ],
                dest: conf.jsDest + 'browserify.js',
                paths: [conf.vendorCwd],
            }
        },


        uglify: {
            libraries: {
                files: [{
                    src: [
                        conf.vendorCwd + "document-register-element/build/document-register-element.js"
                    ],
                    dest: conf.jsDest + "libraries.min.js"
                }]
            }
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
            vendor: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: conf.jsCwd,
                    src: [
                        '**/**.js',
                        '!_tmp/**/*',
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
                tasks: ['rollup'],
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


    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-rollup");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Define Task(s)
    grunt.registerTask('default', ['rollup', 'uglify', 'copy']);
    grunt.registerTask('dev', ['default', 'watch']);
};