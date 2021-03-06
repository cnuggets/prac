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
        home: { path: "/", moduleId: "app/home/home" },
        component: { path: "/component", moduleId: "app/component/component" }
    },
    interceptor: { // Add your interceptors here
        page: {
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
            // On error
            error: [function(e, $) {
            }]
        },
        request: {
            // On request complete
            complete: [function (xhr, status, $, next) {
                next();
            }]
        }
    }
});