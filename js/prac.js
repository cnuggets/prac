var require = {
    baseUrl: "/js/lib",
    paths: {
        app: "/app",
        "jquery": "jquery-3.6.0",
        "bootstrap": "bootstrap-5.1.3",
        "underscore": "underscore-1.13.1",
        "text": "text-2.0.16",
        "router": "router-0.8.0",
        "moment": "moment",
        "async": "async",
        "common": "jquery.prac.common",
        "component": "jquery.prac.component",
        "datepicker": "jquery.prac.com.datepicker",
        "uploader": "jquery.prac.com.uploader",
        "tree": "jquery.prac.com.tree"
    },
    shim: {
        "component": ["jquery", "underscore", "bootstrap", "common"]
    }
};

function Prac() {
    function _config(cfg) {
        // config
        if (cfg.paths) {
            for (var key in cfg.paths) {
                require.paths[key] = cfg.paths[key];
            }
        }
        if (cfg.shim) {
            for (var key in cfg.shim) {
                require.shim[key] = cfg.shim[key];
            }
        }

        // load require.js
        var script = document.createElement("script");
        script.onload = function () {
            _onload(cfg);
        };
        script.src = "/js/lib/require.js";
        document.head.appendChild(script);
    }

    function _onload(cfg) {
        require(["router", "underscore", "jquery", "common", "component"], function (router, _, $) {
            _setup();
            _router($("[p-content]"));
            _component($("body"));

            function _setup() {
                // ajax
                $.ajaxSetup({
                    complete: function (xhr, status) {
                        _exec(
                            cfg.interceptor && cfg.interceptor.request ? cfg.interceptor.request.complete : [],
                            $,
                            [xhr, status, $]
                        );
                    }
                });

                // template
                var template = _.template;
                _.template = function () {
                    var render = template.apply(_, arguments);
                    return function () {
                        try {
                            return render.apply(_, arguments)
                        } catch (e) {
                            console.error(e);
                            _exec(
                                cfg.interceptor && cfg.interceptor.page ? cfg.interceptor.page.error : [],
                                _,
                                [e, $]
                            );
                        }
                    }
                }
            }

            var loading;
            function _router(ctx) {
                router.registerRoutes(cfg.routes).on("routeload", function (module, routeArguments) {
                    if (loading) {
                        loading.stop();
                    }
                    loading = $.pageLoading();

                    // before
                    _exec(
                        cfg.interceptor && cfg.interceptor.page ? cfg.interceptor.page.before : [],
                        module,
                        [module.name, location.pathname, routeArguments, $],
                        function () {
                            _render();
                        }
                    );

                    // render
                    function _render() {
                        module.render(ctx, routeArguments, function (args) {
                            module.init(args);
                            _component(ctx);
                            _route(ctx);

                            // after
                            _exec(
                                cfg.interceptor && cfg.interceptor.page ? cfg.interceptor.page.after : [],
                                module,
                                [module.name, location.pathname, args, $]
                            );

                            loading.stop();
                        });
                    }
                }).on("statechange", function () {
                }).init();

                window.addEventListener("popstate", function (e) {
                    router.fire("statechange");
                });

                _route($("body"));
                function _route(ctx) {
                    ctx.find("a[p-router]").off("click");
                    ctx.find("a[p-router]").on("click", function (e) {
                        e.preventDefault();
                        _doRoute($(this).attr("href"), $(this).attr("title"));
                    });
                }
                function _doRoute(url, param, title) {
                    history.pushState({}, title ? title : "", url);
                    router.fire("statechange");
                }

                window.route = _doRoute;
            }

            function _exec(chains, obj, args, callback) {
                var i = 0;
                _do();

                // recurse
                function _recurse(interceptor) {
                    args.splice(4, 1, function () {
                        _do();
                    });
                    interceptor.apply(obj, args);
                }

                // exec
                function _do() {
                    if (i < chains.length) {
                        _recurse(chains[i++]);
                    } else {
                        if (callback) {
                            callback();
                        }
                    }
                }
            }

            function _component(ctx) {
                ctx.find("div[p-menu]").menu();

                $.each(ctx.find("[p-info]"), function (i, item) {
                    $(item).info($(item).attr("p-info"));
                });
                $.each(ctx.find("[p-alert]"), function (i, item) {
                    $(item).alert($(item).attr("p-alert"));
                });
                ctx.find("input[p-integer]").integer();
                ctx.find("input[p-decimal]").decimal();

                $.each(ctx.find("[p-slider]"), function (i, item) {
                    var min = $(item).attr("min");
                    var max = $(item).attr("max");
                    var defaultValue = $(item).attr("default");
                    var step = $(item).attr("step");
                    if (isNaN(min)) {
                        min = 0;
                    }
                    if (isNaN(max)) {
                        max = 100;
                    }
                    if (isNaN(max)) {
                        defaultValue = 0;
                    }
                    if (isNaN(step)) {
                        step = 1;
                    }
                    $(item).slider({
                        min: Number(min),
                        max: Number(max),
                        default: Number(defaultValue),
                        step: Number(step),
                    });
                });

                $.each(ctx.find("[p-multiselect]"), function (i, item) {
                    $(item).multiselect();
                });
                $.each(ctx.find("[p-stepper]"), function (i, item) {
                    $(item).stepper();
                });
            }
        });
    }

    return {
        config: _config
    }
}
var prac = new Prac();
