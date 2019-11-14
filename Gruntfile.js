module.exports = function (grunt) {

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

        /**
         * Compile TypeScript
         * https://www.npmjs.com/package/grunt-ts
         */
        ts: {
            default: {
                options: {
                    allowJs: false,
                    module: 'commonjs',
                    moduleResolution: 'Node',
                    target: 'es6',
                    declaration: false,
                    diagnostics: false,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    sourceMap: true,
                    rootDir: conf.jsCwd,
                    compile: true
                },
                src: [
                    conf.jsCwd + '**/*.ts'
                ],
                outDir: conf.jsCompile
            }
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
                transform: [
                    [
                        "babelify", {
                        "presets": ["@babel/env"],
                        "plugins": ["wildcard", {}]
                    }
                    ]
                ],
                external: []
            },

            app: {
                src: [
                    conf.jsCompile + '/**/*.js',
                ],
                dest: conf.jsDest + 'app.js',
                paths: [conf.vendorCwd, conf.jsCompile],
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
                tasks: ['ts', 'browserify:app'],
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
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Define Task(s)
    grunt.registerTask('default', ['ts', 'browserify', 'uglify', 'copy']);
    grunt.registerTask('dev', ['default', 'watch']);
};