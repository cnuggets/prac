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
        "form": "jquery.prac.com.m.form",
        "action": "jquery.prac.com.m.action",
        "nav": "jquery.prac.com.m.nav",
        "biz": "jquery.prac.com.m.biz"
    },
    shim: {
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
        require(["router", "underscore", "jquery", "common"], function (router, _, $) {
            _setup();
            _router($("[p-content]"));
            // _component($("body"));

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

            function _router(ctx) {
                var loading;
                router.registerRoutes(cfg.routes).on("routeload", function (module, routeArguments) {
                    loading = $.pageLoading();

                    // before
                    _exec(
                        cfg.interceptor && cfg.interceptor.page ? cfg.interceptor.page.before : [],
                        module,
                        [module.name, location.pathname, routeArguments, $],
                        function () {
                            $("body>.content").removeAttr("style");
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
                ctx.find("input[p-integer]").integer();
                ctx.find("input[p-decimal]").decimal();

                $.each(ctx.find("[p-form]"), function (i, item) {
                    $(item).form();
                });
                $.each(ctx.find("[p-swipe]"), function (i, item) {
                    $(item).swipeCell();
                });
            }
        });
    }

    return {
        config: _config
    }
}
var prac = new Prac();
