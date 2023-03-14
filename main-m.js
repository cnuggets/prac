prac.config({
    paths: {
        // Add your library dependencies here
        // For example
        // "datepicker": "datepicker" // Put the js file datepicker.js to js/lib directory first
    },
    shim: {
        // "datepicker": ["jquery"]
    },
    routes: {
        // Add your routers here
        // For example
        home: { path: "/", moduleId: "app/home/home-m" },
        m: { path: "/component/m", moduleId: "app/component/m" },
    },
    interceptor: { // Add your interceptors here
        init: function ($) { },
        page: {
            // on enter page
            enter: [function (name, uri, args, $, next) {
                next();
            }],
            // Before page render
            before: [function (name, uri, args, $, next) {
                next();
            }, function (name, uri, args, $, next) {
                next();
            }],
            // After page render
            after: [function (name, uri, args, $, next) {
                next();
            }],
            // on leave page
            leave: [function (name, $, next) {
                next();
            }],
            // On error
            error: [function(e, $) {
            }]
        },
        request: {
            // On request before send
            beforeSend: [function (xhr, $, next) {
                next();
            }],
            // On request complete
            complete: [function (xhr, status, $, next) {
                next();
            }]
        }
    }
});