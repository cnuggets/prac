define([
    "text!app/home/home-m-tpl.html", "underscore", "app/nav/top-menu", "app/nav/sidebar", "jquery", "form", "action", "nav"
], function (tpl, _, topMenu, sidebar, $) {

    function _init() {
        topMenu.init($("#top-menu"));
        sidebar.init($("#sidebar"));
    }

    return {
        name: "home",
        init: function () {
            _init();
        },
        render: function (ctx, args, onload) {
            ctx.html(_.template(tpl)());
            onload(args);
        }
    }
});