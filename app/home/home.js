define(["text!app/home/home-tpl.html", "underscore", "jquery", "component"], function (tpl, _, $) {

    function _init() {

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