define(["text!app/component/doc-tpl.html", "underscore", "jquery"], function (tpl, _, $) {

    function _init() {

    }

    return {
        name: "doc",
        init: function () {
            _init();
        },
        render: function (ctx, args, onload) {
            ctx.html(_.template(tpl)());
            onload(args);
        }
    }
});