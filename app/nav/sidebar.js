define(["text!app/nav/sidebar-tpl.html", "underscore", "jquery", "nav"], function (tpl, _, $) {

    function _init(ctx, data, toggle) {
        var sidebar = $(_.template(tpl)(data));
        ctx.append(sidebar);
        $(".p-sidebar").sidebar().bindTo(toggle ? toggle : $("[p-sidebar-toggle]"));
    }

    return {
        init: _init
    }
});