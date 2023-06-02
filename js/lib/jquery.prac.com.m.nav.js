(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap", "common"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b) {
    $.fn.indexNav = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            class: "primary"
        };
        options = $.extend(true, {}, defaultCfg, options);

        var anchors = self.find("[p-anchor]");
        var indexTpl = `
            <ul class="index">
                <%_.each(indices, function(index) {%>
                    <li target="<%=index%>"><%=index%></li>
                <% }); %>
            </ul>
        `;
        var indices = [];
        $.each(anchors, function (i, anchor) {
            indices.push($(anchor).attr("p-anchor"));
        });

        var index = $(_.template(indexTpl)({
            indices: indices
        }));
        self.append(index);

        var hover = $(_.template(`<div class="anchor-fixed text-<%=clazz%>"></div>`)({
            clazz: options.class
        }));
        hover.text(anchors.eq(0).attr("p-anchor"));
        self.prepend(hover);

        var navHeight = anchors.height();
        var timer;
        self.scroll(function (e) {
            _onScroll(0);
        });
        $(window).scroll(function (e) {
            _onScroll($(window).scrollTop());
        });

        function _onScroll(offset) {
            clearTimeout(timer);
            _scroll(offset);
            timer = setTimeout(function () {
                _scroll(offset);
            }, 1000);
        }

        function _scroll(offset) {
            var indexing = false;
            var current;
            $.each(anchors, function (i, anchor) {
                var top = $(anchor).position().top - offset;
                if (top < 0) {
                    if (i < anchors.length - 1) {
                        var next = anchors.eq(i + 1);
                        var nextTop = next.position().top - offset;
                        if (nextTop > 0) {
                            current = $(anchor).attr("p-anchor");
                            if (nextTop <= navHeight) {
                                hover.css("position", "absolute");
                                hover.css("transform", "translateY(-100%)");
                                next.before(hover);
                            } else {
                                hover.css("position", "fixed");
                                hover.css("transform", "");
                                self.prepend(hover);
                            }
                        }
                    }
                    hover.show();
                    indexing = true;
                }
            });
            if (!indexing) {
                hover.hide();
                current = anchors.eq(0).attr("p-anchor");
            }

            _change(current);
        }

        function _change(selected) {
            if (selected == undefined) {
                return;
            }
            hover.text(selected);
            var clazz = "text-" + options.class;
            var li = index.find("li[target='" + selected + "']");
            if (!li.hasClass(clazz)) {
                index.find("li").removeClass(clazz);
                index.find("li[target='" + selected + "']").addClass(clazz);
                if (options.onChange) {
                    options.onChange(selected);
                }
            }
        }

        index.find("li").on("click", function () {
            if (!$(this).hasClass("text-" + options.class)) {
                var selected = $(this).attr("target");
                _select(selected);
                _change(selected);
            }
        });

        function _select(selected) {
            self[0].scrollTo(0, 0);
            window.scrollTo(0, 0);
            var anchor = self.find("[p-anchor='" + selected + "']");
            self[0].scrollTo(0, anchor.position().top + 1);
            window.scrollTo(0, anchor.position().top + 1);
            _change(selected);
        }

        return {
            select: _select
        }
    }

    $.fn.tab = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            class: "primary"
        };
        options = $.extend(true, {}, defaultCfg, options);

        if (options.fixed) {
            self.css("position", "fixed").css("top", options.fixed.top ? options.fixed.top : "0").css("bottom", "0");
        }

        var navBtns = self.find(".nav li");
        var contents = self.find(".contents > div");
        var underline = $(_.template(`<div class="underline bg-<%=clazz%>"></div>`)({
            clazz: options.class
        }));
        var selected = 0;
        self.find(".nav").after(underline);
        _move(0);

        navBtns.on("click", function () {
            if (!$(this).hasClass("selected")) {
                navBtns.removeClass("selected");
                contents.removeClass("selected");
                $(this).addClass("selected");
                var index = $(this).index();
                contents.eq(index).addClass("selected");
                if (options.onChange) {
                    options.onChange(index);
                }
                selected = index;
                _move(index, true);
            }
        });

        function _move(index, animation) {
            var tab = navBtns.eq(index).find("span");
            var pos = tab.position().left;
            underline.css("transform", "translateX(" + pos + "px)");
            underline.css("width", tab.outerWidth());
            if (animation) {
                underline.css("transition", "all, 0.2s");
            } else {
                underline.css("transition", "none");
            }
        }

        function _select(index) {
            navBtns.eq(index).trigger("click");
        }

        $(window).on("resize", function () {
            _move(selected);
        });

        return {
            select: _select
        }
    }

    $.fn.tabBar = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            class: "primary"
        };
        options = $.extend(true, {}, defaultCfg, options);

        if (options.fixed) {
            self.css("position", "fixed").css("top", options.fixed.top ? options.fixed.top : "0").css("bottom", "0");
        }

        var navBtns = self.find(".nav li");
        var contents = self.find(".contents > div");
        var selected = 0;
        self.find(".nav li.selected").addClass("text-" + options.class);

        navBtns.on("click", function () {
            if (!$(this).hasClass("selected")) {
                navBtns.removeClass();
                contents.removeClass("selected");
                $(this).addClass("selected").addClass("text-" + options.class);
                var index = $(this).index();
                contents.eq(index).addClass("selected");
                if (options.onChange) {
                    options.onChange(index);
                }
                selected = index;
            }
        });

        function _select(index) {
            navBtns.eq(index).trigger("click");
        }

        return {
            select: _select
        }
    }

    $.fn.collapse = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            accordion: false
        };
        options = $.extend(true, {}, defaultCfg, options);

        var title = self.find(".title");
        title.on("click", function () {
            var current = $(this);
            if (options.accordion) {
                self.find(".content").slideUp(200);
                self.find(".title i").css("transform", "rotate(0)").css("transition", "all 0.2s");
            }

            var content = current.next();
            var arrow = current.find("i");
            if (content.is(":hidden")) {
                arrow.css("transform", "rotate(90deg)").css("transition", "all 0.2s");
                content.slideDown(200, function () {
                    if (options.onUncollapse) {
                        options.onUncollapse(current.closest(".item").index());
                    }
                });
            } else {
                arrow.css("transform", "rotate(0)").css("transition", "all 0.2s");
                content.slideUp(200, function () {
                    if (options.onCollapse) {
                        options.onCollapse(current.closest(".item").index());
                    }
                });
            }
        });
    }

    $.fn.topMenu = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
        };
        options = $.extend(true, {}, defaultCfg, options);

        self.find(".item.selected").closest("ul").show();
        self.css("top", -self.height()).css("transition", "none");
        self.hide();

        var items = self.find(".item");
        items.on("click", function (e) {
            e.stopPropagation();
            var icon = $(this).find("i");
            if (icon.hasClass("bi-dash")) {
                items.removeClass("selected");
                $(this).addClass("selected");
            } else {
                var subMenu = $(this).next();
                if (subMenu.is(":hidden")) {
                    $(this).find(".bi-chevron-right").css("transform", "rotate(90deg)");
                    subMenu.slideDown(200);
                } else {
                    $(this).find(".bi-chevron-right").css("transform", "rotate(0)");
                    subMenu.slideUp(200);
                }
            }
        });

        self.on("click", function (e) {
            e.stopPropagation();
        });

        $("body").on("click", function (e) {
            _hide();
        });

        function _show() {
            self.show();
            self.css("top", 0).css("transition", "top 0.2s");
        }

        function _hide() {
            self.css("top", -self.height()).css("transition", "top 0.2s");
            setTimeout(function () {
                self.hide();
            }, 200);
        }

        function _toggle() {
            if (self.is(":visible")) {
                _hide();
            } else {
                _show();
            }
        }

        function _bindTo(obj) {
            obj.on("click", function (e) {
                e.stopPropagation();
                _toggle();
            });
        }

        return {
            show: _show,
            hide: _hide,
            toggle: _toggle,
            bindTo: _bindTo
        }
    }

    $.fn.sidebar = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            place: "start" // start, end
        };
        options = $.extend(true, {}, defaultCfg, options);

        self.addClass("offcanvas").addClass("offcanvas-" + options.place);

        self.find("a.close").on("click", function () {
            _toggle();
        });

        function _toggle() {
            self.offcanvas("toggle");
        }

        function _bindTo(obj) {
            obj.on("click", function (e) {
                e.stopPropagation();
                _toggle();
            });
        }

        return {
            toggle: _toggle,
            bindTo: _bindTo
        }
    }

    $.fn.pagination = function (skip, limit, total, url, options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            max: 5,
        };
        options = $.extend(true, {}, defaultCfg, options);
        var self = $(this);
        var tpl = `
            <div class="p-pagination">
                <nav>
                    <ul class="pagination">
                        <li class="page-item<% if (skip == 0) { %> disabled<% } %>">
                            <a aria-label="Previous" class="page-link" href="<%=url%>/<%=skip - limit%>/<%=limit%><%=queryString%>" p-router>
                                <span class="page-icon prev" aria-hidden=true>&laquo;</span>
                            </a>
                        </li>
                        <%  _.each(pageNos, function(pageNo, i) { %>
                            <% if (pageNo != -1) { %>
                                <li class="page-item<% if (skip == pageNo * limit) { %> active<% } %>" number>
                                    <a class="page-link" href="<%=url%>/<%=limit * pageNo%>/<%=limit%><%=queryString%>" p-router><%=pageNo + 1%></a>
                                </li>
                            <% } else { %>
                                <li class="page-item disabled" ellipsis>
                                    <a class="page-link" href="javascript:void(0)">
                                        <i class="bi bi-three-dots"></i>
                                    </a> 
                                </li>
                            <% } %>
                        <% }); %>
                        <li class="page-item<% if (skip == limit * (pages - 1) || pages == 0) { %> disabled<% } %>">
                            <a aria-label="Next" class="page-link" href="<%=url%>/<%=skip + limit%>/<%=limit%><%=queryString%>" p-router>
                                <span class="page-icon next" aria-hidden=true>&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <% if (options.pages) { %>
                <select class="form-select" style="width: 70px;" name="pageSize">
                    <%  _.each(options.pages, function(page, i) { %>
                    <option value="<%=page%>"<% if (page == limit) { %> selected<% } %>><%=page%></option>
                    <% }); %>
                </select>
                <% } %>
            </div>            
        `;

        var count = Math.ceil(total / limit);
        var positions = options.max;
        var pageNos = [];
        var current = Math.ceil(skip / limit);

        // There's no enough position
        if (positions + 4 < count) {
            // front
            var i = current;
            while (i >= 0 && positions > options.max / 2) {
                // lpush
                pageNos.splice(0, 0, i);
                positions--;
                i--;
            }
            // behind
            i = current + 1;
            while (i < count && positions > 0) {
                // rpush
                pageNos.push(i);
                positions--;
                i++;
            }
            i = pageNos[0] - 1;
            while (positions > 0) {
                // lpush
                pageNos.splice(0, 0, i);
                i--;
                positions--;
            }
            // first
            if (pageNos[0] != 0) {
                pageNos.splice(0, 0, 0);
            }
            // last
            if (pageNos[pageNos.length - 1] != count - 1) {
                pageNos.splice(pageNos.length, 0, count - 1);
            }
            // ellipsis
            if (pageNos[0] != pageNos[1] - 1) {
                if (pageNos[0] == pageNos[1] - 2) {
                    pageNos.splice(1, 0, pageNos[0] + 1);
                } else {
                    pageNos.splice(1, 0, -1);
                }
            }
            if (pageNos[pageNos.length - 2] != pageNos[pageNos.length - 1] - 1) {
                if (pageNos[pageNos.length - 2] == pageNos[pageNos.length - 1] - 2) {
                    pageNos.splice(pageNos.length - 1, 0, pageNos[pageNos.length - 1] - 1);
                } else {
                    pageNos.splice(pageNos.length - 1, 0, -1);
                }
            }
        } else {
            for (var i = 0; i < count; i++) {
                pageNos.push(i);
            }
        }

        var queryString = "";
        if (url.indexOf("?") > 0) {
            var parts = url.split("?");
            url = parts[0];
            queryString = "?" + parts[1];
        }
        self.html(_.template(tpl)({
            skip: parseInt(skip),
            limit: parseInt(limit),
            total: parseInt(total),
            url: url,
            queryString: queryString,
            pages: count,
            pageNos: pageNos,
            options: options,
        }));
        self.find("select[name='pageSize']").on("change", function () {
            route(url + "/0/" + $(this).find("option:selected").val() + queryString);
        });
    }
}));