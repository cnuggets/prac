module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            js: {
                src: ["dist/js"]
            },
            css: {
                src: ["dist/style"]
            }
        },
        uglify: {
            minjs: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: "js",
                    src: "**/*.js",
                    dest: "dist/js",
                    // rename: function (dst, src) {
                    //     return dst + "/" + src.replace(".js", ".min.js");
                    // }
                }]
            }
        },
        cssmin: {
            mincss: {
                files: [{
                    expand: true,
                    cwd: "style",
                    src: "**/*.css",
                    dest: "dist/style",
                    ext: ".css"
                }]
            }
        },
        copy: {
            js: {
                expand: true,
                cwd: "js",
                src: "**/*",
                dest: "dist/js",
            },
            style: {
                expand: true,
                cwd: "style",
                src: ["**", "!**/*.css"],
                dest: "dist/style",
            },
            lib: {
                expand: true,
                cwd: "dist",
                src: "**/*",
                dest: grunt.option["base"]
            },
            index: {
                expand: true,
                cwd: ".",
                src: ["index.html", "main.js"],
                dest: grunt.option["base"]
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-rename");

    grunt.registerTask("cleandist", ["clean:js", "clean:css"]);
    grunt.registerTask("minjs", ["uglify:minjs"]);
    grunt.registerTask("mincss", ["cssmin:mincss", "copy:style"]);
    grunt.registerTask("min", ["cleandist", "minjs", "mincss"]);

    grunt.registerTask("init", ["copy:lib", "copy:index"]);
};