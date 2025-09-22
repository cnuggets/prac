define(["text!app/detail/detail-tpl.html", "bootstrap", "underscore", "jquery", "component"], function (tpl, b, _, $) {

    function _init() {
        $("#breadcrumb").breadcrumb([{
            name: "Home",
            uri: "/"
        }, {
            name: "Component",
            uri: "/component"
        }, {
            name: "Detail",
            current: true
        }], {
            history: true,
            divider: "/"
        });

        $("#back").on("click", function () {
            back("Home");
        });
    }

    return {
        name: "Detail",
        enter: function(args) {
            console.log(args);
        },
        init: function () {
            _init();
        },
        render: function (ctx, args, onload) {
            ctx.html(_.template(tpl)());
            onload(args);
        },
        leave: function() {
            console.log("leave detail");
        }
    }
});