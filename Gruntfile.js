module.exports = function (grunt) {

    var babel = require('rollup-plugin-babel');
    var typescript = require('rollup-plugin-typescript');

    const conf = {
        cwd: 'src/',
        dest: 'dist/',

        vendorCwd: 'node_modules/',
        jsCwd: 'src/scripts/',
        jsDest: 'dist/js/',
        jsCompile: 'src/scripts/_tmp',

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
                plugins: [
                    typescript(),
                ]
            },
            folder: {
                src: [
                    conf.jsCwd + '/**/*.ts',
                ],
                dest: conf.jsDest + 'rollup',
            },

            file: {
                src: [
                    conf.jsCwd + '/index.ts',
                ],
                dest: conf.jsDest + 'rollup.js',
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
                    conf.jsCwd + '/**/*.ts',
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
                tasks: ['replace:views'],
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