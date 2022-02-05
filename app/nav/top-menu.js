define(["text!app/nav/top-menu-tpl.html", "underscore", "jquery", "nav"], function (tpl, _, $) {

    function _init(ctx, data, toggle) {
        var topMenu = $(_.template(tpl)(data));
        ctx.append(topMenu);
        $(".p-top-menu").topMenu().bindTo(toggle ? toggle : $("[p-top-menu-toggle]"));
    }

    return {
        init: _init
    }
});