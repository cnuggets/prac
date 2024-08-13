module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            jsmin: {
                src: ["appmin"]
            },
            js: {
                src: ["app"]
            }
        },
        uglify: {
            minjs: {
                files: [{
                    expand: true,
                    cwd: "app",
                    src: ["**/*.js", "!config*.js"],
                    dest: "appmin"
                }]
            }
        },
        copy: {
            config: {
                expand: true,
                cwd: "app",
                src: "config-" + grunt.option("env") + ".js",
                dest: "appmin",
            },
            tpl: {
                expand: true,
                cwd: "app",
                src: "**/*.html",
                dest: "appmin",
            }
        },
        rename: {
            config: {
                files: [{
                    src: ["appmin/config-" + grunt.option("env") + ".js"], 
                    dest: "appmin/config.js"
                }]
            },
            backupjs: {
                files: [{
                    src: ["app"], 
                    dest: "appsource"
                }]
            },
            useminjs: {
                files: [{
                    src: ["appmin"], 
                    dest: "app"
                }]
            },
            recoverjs: {
                files: [{
                    src: ["appsource"], 
                    dest: "app"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-rename");

    grunt.registerTask("cleanjs", "clean:jsmin");
    grunt.registerTask("copytpl", "copy:tpl");
    grunt.registerTask("backupjs", "rename:backupjs");
    grunt.registerTask("useminjs", "rename:useminjs");

    grunt.registerTask("recover", ["clean:js", "rename:recoverjs"]);
    grunt.registerTask("build", ["uglify:minjs", "copy:config", "copy:tpl", "rename:config", "rename:backupjs", "rename:useminjs"]);
};