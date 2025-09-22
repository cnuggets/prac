define(["text!app/component/component-m-tpl.html", "bootstrap", "underscore", "jquery", "form"], function (tpl, b, _, $) {

    function _init() {
        var picker1 = $.picker(
            $("#picker1"),
            ["Dalian", "Shenyang", "Beijing", "Shanghai", "Guangzhou", "Wuhan", "Nanning", "Chengdu", "Jinan", "Zhengzhou", "Xi'an"],
            {
                title: "City",
                confirm: {
                    onConfirm: function (value) {
                        console.log(value);
                    }
                },
                cancel: {
                    onCancel: function () {

                    }
                },
                onChange: function (value) {
                    console.log(value);
                }
            }
        );
        var loading1 = $("#picker1").loading({
            // bgStyle: "light",
            // loadingClass: "success"
        });
        setTimeout(function () {
            loading1.stop();
        }, 1000);
        // picker1.select("Guangzhou");
        // setTimeout(function() {
        //     picker1.setData(["One", "Two", "Three", "Four"]);
        // }, 2000);

        $("#city").on("click", function () {
            $("#offcanvasBottom").offcanvas("toggle");
        });
    }

    return {
        name: "component",
        init: function () {
            _init();
        },
        render: function (ctx, args, onload) {
            ctx.html(_.template(tpl)());
            onload(args);
        }
    }
});