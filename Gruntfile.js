module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        //parameters configuration

        appName: "App",

        //used by grunt
        pkg: grunt.file.readJSON('package.json'),
        distFolder: 'www/dist',
        srcFolder: "src",

        //tasks
        clean: {
            dist: ["<%= distFolder %>"]
        },
        copy: {
            libs: {
              files: [{
                  src: [
                      'node_modules/es6-shim/es6-shim.min.js',
                      'node_modules/es6-shim/es6-shim.map',
                      'node_modules/zone.js/dist/zone.js',
                      'node_modules/reflect-metadata/Reflect.js',
                      'node_modules/reflect-metadata/Reflect.js.map'
                  ],
                  dest: '<%= distFolder %>/lib/'
              }]
            },
             dist: {
                files: [{
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'img/**',
                    dest: '<%= distFolder %>'
                }, {
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'fonts/**',
                    dest: '<%= distFolder %>'
                }, {
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: '**/*.html',
                    dest: '<%= distFolder %>'
                }]
             }
        },
        browserify: {
            build: {
                files: {
                    "<%= distFolder %>/app.js": ["<%= srcFolder %>/app.ts"]
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: [
                        ['tsify']
                    ]
                }
            },
            dev: {
                files: {
                    "<%= distFolder %>/app.js": ["<%= srcFolder %>/app.ts", './typings/index.d.ts']
                },
                options: {
                    watch: true,
                    keepalive: true,
                    cache: {},
                    packageCache: {},
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: [
                        ['tsify']
                    ]
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= srcFolder %>/app.scss': '<%= distFolder %>/css/styles.css'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= distFolder %>/app.min.js': ["<%= distFolder %>/app.js"]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= distFolder %>/css/styles.css': ["<%= distFolder %>/css/styles.css"]
                }
            }
        },
        watch: {
            less: {
                files: ['<%= srcFolder %>/**/*.less'],
                tasks: ['less:build']
            },
            img: {
                files: ['<%= srcFolder %>/img/**'],
                tasks: ['copy:img']
            },
            fonts: {
                files: ['<%= srcFolder %>/fonts/**'],
                tasks: ['copy:fonts']
            },
            templates: {
                files: ['<%= srcFolder %>/**/*.html'],
                tasks: ['processhtml:build','copy:templates']
            }
        }
    });


    grunt.registerTask('dev', ['clean:build', 'copy:build', 'sass:build', 'browserify:dev']);


};
