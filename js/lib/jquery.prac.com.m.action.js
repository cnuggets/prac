(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap", "moment", "common"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b, moment) {
    $.fn.loading = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            overlay: {
                disabled: false,
                css: {
                    "z-index": 4,
                }
            },
            spinner: {
                class: "primary"
            }
        };
        options = $.extend(true, {}, defaultCfg, options);
        var self = $(this);
        var tpl = `
            <% if (!cfg.overlay.disabled) { %>
                <div class="p-loading-overlay" style="<% for (var key in cfg.overlay.css) { %><%=key%>:<%=cfg.overlay.css[key]%>;<% } %>"></div>
            <% } %>
            <div class="p-loading" style="z-index: <%=cfg.overlay.css['z-index'] + 1%>;">
            <% if (cfg.overlay.disabled) { %>
                <button class="btn btn-<%=cfg.spinner.class%>" type="button" disabled>
                    <span class="spinner-border spinner-border-sm"></span>
                    <span class="visually-hidden">Loading...</span>
                </button>
            <% } else { %>
                <div class="spinner-border text-<%=cfg.spinner.class%>"></div>
            <% } %>
            </div>
        `;
        var loading = $(_.template(tpl)({
            cfg: options
        }));

        var position = self.css("position");
        if (position == "static") {
            self.css("position", "relative");
        }

        self.append(loading);

        function _stop() {
            if (position == "static") {
                self.css("position", "static");
            }
            loading.remove();
        }

        return {
            stop: _stop
        }
    }

    $.fn.pullRefresh = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            stretch: false
        };
        options = $.extend(true, {}, defaultCfg, options);

        if (options.stretch) {
            $("body>.content").css("height", "100%");
        }

        var refresh = self.find(".refresh");
        var pullable = self.find(".pullable");
        var spinner = self.find(".spinner");
        var offset = refresh.height();
        var position;
        var loading;
        var degree = 270 / offset;
        var allowDrag = true;
        var inDragScope = false;
        pullable.bindDragMove(function (e, pos) {
            if (loading || !allowDrag) {
                return;
            }
            inDragScope = true;
            position = pos.y;
        }, function (e, pos, speed) {
            if (loading || !allowDrag || !inDragScope) {
                return;
            }
            var distance = pos.y - position;
            if (distance > 0) {
                pullable.css("transform", "translateY(" + distance + "px)");
                spinner.css("transform", "rotate(" + (degree * distance) + "deg)");
            }
        }, function (e, pos) {
            if (loading || !allowDrag || !inDragScope) {
                return;
            }
            var distance = pos.y - position;
            if (distance >= offset) {
                loading = true;
                if (options.onLoading) {
                    options.onLoading(function () {
                        _stopLoading();
                    });
                }
                pullable.css("transform", "translateY(" + offset + "px)");
                pullable.css("transition", "all 0.2s");
                spinner.css("transform", "");
                spinner.css("animation", "0.75s linear infinite spinner-border");
            } else {
                pullable.css("transform", "translateY(0)");
                pullable.css("transition", "all 0.2s");
            }
            inDragScope = false;
        });

        var top = self.position().top;
        $(window).scroll(function () {
            if ($(window).scrollTop() > top) {
                allowDrag = false;
            } else {
                allowDrag = true;
            }
        });

        function _stopLoading() {
            loading = false;
            pullable.css("transform", "translateY(0)");
            pullable.css("transition", "all 0.2s");
            spinner.css("animation", "");
        }

        return {
            stopLoading: _stopLoading
        };
    }

    $.fn.swipeCell = function (options) {
        var self = $(this).find(".wrapper");
        if (!options) {
            options = {};
        }
        var defaultCfg = {};
        options = $.extend(true, {}, defaultCfg, options);

        var left = self.find(".left");
        var right = self.find(".right");
        var content = self.find(".content");
        left.css("left", -left.width());
        right.css("right", -right.width());

        var position;
        var offset = 20;
        var stopped = 0;
        var swiping = false;
        var swiped = false;
        content.bindDragMove(function (e, pos) {
            swiping = true;
            self.css("transition", "none");
            position = pos;
        }, function (e, pos, speed) {
            if (Math.abs(pos.y - position.y) * 2 > Math.abs(pos.x - position.x)) {
                position = pos;
                return;
            }
            e.preventDefault();
            var distance = pos.x - position.x + stopped;
            if (distance > 0) {
                self.css("transform", "translateX(" + (distance > left.width() ? left.width() : distance) + "px)");
            } else if (distance < 0) {
                self.css("transform", "translateX(" + (distance < -right.width() ? -right.width() : distance) + "px)");
            }

            if (Math.abs(distance) > 0) {
                swiped = true;
                if (options.onSwipe) {
                    options.onSwipe();
                }
            }
        }, function (e, pos) {
            if (!swiping) {
                return;
            }
            if (e.target.nodeName == "BUTTON") {
                return;
            }
            swiping = false;
            var distance = pos.x - position.x;
            // Moved distance over offset
            if (Math.abs(distance) > offset) {
                // Moved to right
                if (distance > 0) {
                    if (stopped < 0) { // hide right
                        if (distance > -stopped + offset) {
                            self.css("transform", "translateX(" + left.width() + "px)");
                            self.css("transition", "all 0.2s");
                            stopped = left.width();
                        } else {
                            self.css("transform", "translateX(0)");
                            self.css("transition", "all 0.2s");
                            stopped = 0;
                        }
                    } else if (stopped == 0) { // show left
                        self.css("transform", "translateX(" + left.width() + "px)");
                        self.css("transition", "all 0.2s");
                        stopped = left.width();
                    }
                } else if (distance < 0) { // Move to left
                    if (stopped > 0) { // hide left
                        if (distance < -stopped - offset) {
                            self.css("transform", "translateX(-" + right.width() + "px)");
                            self.css("transition", "all 0.2s");
                            stopped = -right.width();
                        } else {
                            self.css("transform", "translateX(0)");
                            stopped = 0;
                        }
                    } else if (stopped == 0) { // show right
                        self.css("transform", "translateX(-" + right.width() + "px)");
                        self.css("transition", "all 0.2s");
                        stopped = -right.width();
                    }
                }
            } else { // Keep the position
                self.css("transform", "translateX(" + stopped + "px)");
                self.css("transition", "all 0.2s");
            }
            setTimeout(function () {
                if (Math.abs(distance) > 0) {
                    swiped = false;
                    if (options.onStopSwipe) {
                        options.onStopSwipe();
                    }
                }
            }, 200);
        });

        self.on("click", function (e) {
            e.stopPropagation();
            if (!swiped) {
                if (options.onClick) {
                    options.onClick(e, $(e.currentTarget).closest(".p-swipe-cell"));
                }
            }
        });
        self.on("touchend", function (e) {
            if (!swiped) {
                if (options.onTouchEnd) {
                    options.onTouchEnd(e, $(e.currentTarget).closest(".p-swipe-cell"));
                }
            }
        });

        self.find("button").on("click", function (e) {
            e.stopPropagation();
            _reset();
        });

        function _reset() {
            stopped = 0;
            position = undefined;
            self.css("transform", "translateX(0)");
            self.css("transition", "all 0.2s");
        }

        return {
            reset: _reset
        };
    }

    $.dialog = function (title, message, options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            type: "alert", // alert, confirm
            cancel: {
                class: "secondary",
                label: "Cancel"
            },
            confirm: {
                class: "danger",
                label: "Confirm"
            }
        };
        options = $.extend(true, {}, defaultCfg, options);
        var tpl = `
            <div class="offcanvas-backdrop p-overlay">
                <div class="p-dialog">
                    <% if (title) { %>
                    <div class="title"><%=title%></div>
                    <% } %>
                    <div class="message"><%=message%></div>
                    <div class="footer">
                        <% if (cfg.type == "confirm") { %>
                            <div class="col">
                                <button class="btn text-<%=cfg.cancel.class%> first" cancel><%=cfg.cancel.label%></button>
                            </div>
                        <% } %>
                        <div class="col">
                            <button class="btn text-<%=cfg.confirm.class%>" confirm><%=cfg.confirm.label%></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        var loadingTpl = `<span class="loading text-<%=clazz%>"></span>`;

        var dialog = $(_.template(tpl)({
            title: title,
            message: message,
            cfg: options
        }));

        _button("cancel");
        _button("confirm");
        function _button(type) {
            var btn = dialog.find("[" + type + "]");
            var func = options[type]["on" + type.substring(0, 1).toUpperCase() + type.substring(1)];
            btn.on("click", function (e) {
                e.stopPropagation();
                btn.blur();
                if (func) {
                    if (options[type].async) {
                        btn.html(_.template(loadingTpl)({
                            clazz: options[type].class
                        }));
                        func(function () {
                            btn.html(options[type].label);
                            dialog.remove();
                        });
                    } else {
                        func();
                        dialog.remove();
                    }
                } else {
                    dialog.remove();
                }
            });
        }

        dialog.on("click", function (e) {
            e.stopPropagation();
        });

        $("body").append(dialog);
    }

    $.toast = function (content, options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            class: "primary",
            timeout: 2000
        };
        options = $.extend(true, {}, defaultCfg, options);
        var tpl = `
            <div class="p-toaster"></div>
        `;

        var toaster = $(tpl);
        if (options.height) {
            toaster.css("height", options.height);
        }
        $("body").prepend(toaster);
        var height = toaster.outerHeight();

        if (typeof content == "string") {
            toaster.addClass("bg-" + options.class);
            toaster.html(content);
        } else {
            toaster.append(content);
        }

        toaster.css("transform", "translateY(0)");
        setTimeout(function () {
            toaster.css("transform", "translateY(-" + height + "px)");
            if (options.onComplete) {
                options.onComplete();
            }
            setTimeout(function () {
                toaster.remove();
            }, 200);
        }, options.timeout);
    }

    $.fn.loadList = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            text: ["loading", "no more data"],
            topOffset: 0
        };
        options = $.extend(true, {}, defaultCfg, options);

        var tpl = `
            <div class="loading"><%=text%>...</div>
        `;

        var loader = $(_.template(tpl)({
            text: options.text[0]
        }));
        self.append(loader);

        var loading = false;

        _init();
        function _init() {
            _onScroll($(window).scrollTop(), $(window).height(), options.topOffset);
        }
        $(window).scroll(function (e) {
            _onScroll($(window).scrollTop(), $(window).height(), options.topOffset);
        });

        function _onScroll(scrollerTop, scollerHeight, offset) {
            if (!offset) {
                offset = 0;
            }
            if (scrollerTop + scollerHeight > offset + loader.position().top + loader.height() / 2) {
                if (!loading) {
                    loading = true;
                    if (options.onLoading) {
                        options.onLoading(function (done) {
                            if (!done) {
                                _stopLoading();
                            } else {
                                loader.text(options.text[1]);
                            }
                        });
                    }
                }
            }
        }

        function _reset() {
            loader.text(options.text[0] + "...");
            loading = false;
            _init();
        }

        function _stopLoading() {
            loading = false;
            _init();
        }

        return {
            stopLoading: _stopLoading,
            reset: _reset
        }
    }

    $.fn.lazyload = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            topOffset: 0,
            selfScroll: false
        };
        options = $.extend(true, {}, defaultCfg, options);

        var containers = self.find("img[data-src]").closest("div");

        _init();
        function _init() {
            _onScroll($(window).scrollTop(), $(window).height(), options.topOffset);
            if (options.selfScroll) {
                _onScroll(self.position().top, self.height());
            }
        }
        $(window).scroll(function (e) {
            _onScroll($(window).scrollTop(), $(window).height(), options.topOffset);
        });
        if (options.selfScroll) {
            self.scroll(function (e) {
                _onScroll(self.position().top, self.height());
            });
        }
        function _onScroll(scrollerTop, scollerHeight, offset) {
            if (!offset) {
                offset = 0;
            }
            var boundary = scrollerTop + scollerHeight;
            $.each(containers, function (i, c) {
                var top = $(c).position().top;
                var image = $(c).find("img");
                if (boundary > top + offset) {
                    if (!image.attr("src")) {
                        image.attr("src", image.attr("data-src"));
                        image.on("load", function () {
                            var width = $(this).width();
                            var height = $(this).height();
                            if (height > width) {
                                $(this).attr("width", (width / height) * 100 + "%");
                            } else {
                                $(this).attr("width", "100%");
                            }
                            if (options.onLoad) {
                                options.onLoad(image);
                            }
                        });
                    }
                }
            });
        }
    }

    $.fn.slides = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            autoplay: 3000,
            indicator: true
        };
        options = $.extend(true, {}, defaultCfg, options);

        var wrapper = self.find(".wrapper");
        var slides = wrapper.children("div");

        _width();
        function _width() {
            var width = self.width();
            slides.css("width", width);
            wrapper.css("width", width * slides.length);
        }

        var obj = {
            select: function () { }
        };
        if (slides.length > 1) {
            obj = _init();
        }
        function _init() {
            var position;
            var index = 0;
            var indicator;
            if (options.indicator) {
                var tpl = `
                    <div class="indicator">
                        <ul>
                            <% for (var i = 0;i < size;i ++) { %>
                            <li<% if (i == 0) { %> class="selected"<% } %>></li>
                            <% } %>
                        </ul>
                    </div>
                `;

                indicator = $(_.template(tpl)({
                    size: slides.length
                }));
                indicator.find("li").on("click", function (e) {
                    e.stopPropagation();
                    index = $(this).index();
                    _select(index, true);
                });
                self.append(indicator);
            }

            var swiping;
            wrapper.bindDragMove(function (e, pos) {
                wrapper.css("transition", "none");
                position = pos;
                swiping = true;
                _pause();
            }, function (e, pos, speed) {
                if (!swiping) {
                    return;
                }
                if (Math.abs(pos.y - position.y) > Math.abs(pos.x - position.x)) {
                    position = pos;
                    return;
                }
                e.preventDefault();
                var distance = pos.x - position.x;
                if (Math.abs(distance) <= self.width()) {
                    if (distance < 0 && index == slides.length - 1) {
                        var first = slides.eq(0);
                        var lastPos = slides.length * self.width();
                        first.css("transform", "translateX(" + lastPos + "px)");
                    } else if (distance > 0 && index == 0) {
                        var last = slides.eq(slides.length - 1);
                        var firstPos = -slides.length * self.width();
                        last.css("transform", "translateX(" + firstPos + "px)");
                    }
                    var pos = -index * self.width() + distance;
                    wrapper.css("transform", "translateX(" + pos + "px)");
                }
                if (Math.abs(distance) > 0) {
                    if (options.onSwipe) {
                        options.onSwipe();
                    }
                }
            }, function (e, pos, speed) {
                if (!swiping) {
                    return;
                }
                var distance = pos.x - position.x;
                if (isNaN(distance)) {
                    return;
                }
                if ((Math.abs(speed.x) > 0.4 && Math.abs(distance) > 5) || Math.abs(distance) > self.width() / 2) {
                    if (distance < 0) {
                        index++;
                    } else {
                        index--;
                    }
                }
                wrapper.css("transform", "translateX(" + (-index * self.width()) + "px)");
                wrapper.css("transition", "all 0.2s");
                swiping = false;

                var loop = false;
                if (index < 0) {
                    index = slides.length - 1;
                    loop = true;
                } else if (index >= slides.length) {
                    index = 0;
                    loop = true;
                }
                _change(index, true);

                setTimeout(function () {
                    if (loop) {
                        wrapper.css("transform", "translateX(" + (-index * self.width()) + "px)");
                        wrapper.css("transition", "none");
                    }
                    slides.css("transform", "");
                    if (options.autoplay) {
                        _play()
                    }

                    if (Math.abs(distance) > 0) {
                        if (options.onStopSwipe) {
                            options.onStopSwipe();
                        }
                    }
                }, 200);
            });

            function _change(index) {
                if (indicator) {
                    indicator.find("li").removeClass("selected");
                    indicator.find("li").eq(index).addClass("selected");
                }
                if (options.onChange) {
                    options.onChange(index);
                }
            }

            function _move(index, animation) {
                wrapper.css("transform", "translateX(" + (-index * self.width()) + "px)");
                animation ? wrapper.css("transition", "all 0.2s") : wrapper.css("transition", "none");
            }

            function _select(i, animation) {
                index = i;
                if (index >= slides.length || index < 0) {
                    index = 0;
                }
                _change(index);
                _move(index, animation);
            }

            var timer;
            if (options.autoplay) {
                _play()
            }

            function _play() {
                clearInterval(timer);
                timer = setInterval(function () {
                    index++;
                    if (index >= slides.length) {
                        index = 0;
                    }
                    _select(index, true);
                }, options.autoplay);
            }

            function _pause() {
                clearInterval(timer);
            }

            $(window).on("resize", function () {
                _width();
                wrapper.css("transform", "translateX(" + (-index * self.width()) + "px)");
                wrapper.css("transition", "none");
            });

            return {
                select: _select
            }
        }

        return obj;
    }

    $.imagePreview = function (data, options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
        };
        options = $.extend(true, {}, defaultCfg, options);

        var tpl = `
            <div class="p-preview">
                <div class="indicator">1 / <%=images.length%></div>
                <div class="p-slides" style="height: 100%;">
                    <div class="wrapper">
                        <% _.each(images, function(image) { %>
                        <div>
                            <img src="<%=image.path%>" />
                        </div>
                        <% }); %>
                    </div>
                </div>
            </div>
        `;

        var preview = $(_.template(tpl)({
            images: data
        }));
        $("body").append(preview);
        $("body").css("overflow", "hidden");
        preview.find("img").on("load", function () {
            _size($(this));
        });

        var indicator = preview.children(".indicator");
        var swipe = false;
        var slides = preview.find(".p-slides").slides({
            autoplay: false,
            onSwipe: function () {
                swipe = true;
            },
            onStopSwipe: function () {
                swipe = false;
            },
            onChange: function (index) {
                indicator.text((index + 1) + " / " + data.length);
            }
        });

        preview.on("click", function (e) {
            if (!swipe) {
                $(this).remove();
                $("body").css("overflow", "");
            }
        });
        preview.on("touchend", function (e) {
            if (!swipe) {
                $(this).remove();
                $("body").css("overflow", "");
            }
        });

        function _size(image) {
            var viewRatio = preview.width() / preview.height();
            var imgRatio = image.width() / image.height();
            if (imgRatio < viewRatio) {
                image.css("height", preview.height());
            } else {
                image.css("width", preview.width());
            }
        }

        function _select(index) {
            slides.select(index);
        }

        return {
            select: _select
        }
    }

    $.fn.dropdown = function (options) {
        var objs = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            class: "danger"
        };
        options = $.extend(true, {}, defaultCfg, options);

        $.each(objs, function (i, value) {
            _init($(value));
        });

        function _init(self) {
            var dropdown = self.find(".dropdown");

            _size();
            function _size() {
                var opts = self.find(".options");
                opts.css("width", self.width());
                $.each(opts, function (i, item) {
                    $(item).css("left", - (self.width() / opts.length) * i);
                });
            }
            $(window).on("resize", function () {
                _size();
            });

            $.each(dropdown, function (i, value) {
                $(value).attr("index", i);
            });
            $.each(dropdown.find(".options .option"), function (i, option) {
                if ($(option).children("i.bi-check-lg").length == 0) {
                    $(option).append($(`<i class="bi bi-check-lg"></i>`));
                }
            });

            dropdown.on("click", function (e) {
                e.stopPropagation();
                $.each(objs, function (i, value) {
                    if ($(value).attr("index") != self.attr("index")) {
                        _hide($(value).find(".dropdown"));
                    }
                });

                var index = $(this).attr("index");
                _hide(self.find(".dropdown[index!='" + index + "']"));
                _toggle($(this));
            });

            dropdown.find(".option").on("click", function (e) {
                e.stopPropagation();
                var value = $(this).attr("value");
                var text = $(this).children("span").text();
                var opts = $(this).closest(".options");
                var select = opts.prev(".select");

                var color = select.css("color");
                opts.find(".option").removeClass("selected").removeAttr("style");
                $(this).addClass("selected").css("color", color);

                var span = select.children("span");
                span.attr("value", value);
                span.text(text);

                _hide($(this).closest(".dropdown"));

                if (options.onChange) {
                    options.onChange(value, parseInt(select.closest(".dropdown").attr("index")));
                }
            });
            $("body").on("click", function () {
                _hide(dropdown);
            });

            function _show(obj) {
                var select = obj.find(".select");
                var opts = select.next("ul.options");
                opts.slideDown(200);
                select.addClass("shown");
                select.addClass("text-" + options.class);

                var color = select.css("color");
                opts.find("li.option.selected").css("color", color);
                opts.find("li.option").off("mouseover").off("mouseout");
                opts.find("li.option:not(.selected)").on("mouseover", function () {
                    $(this).css("color", color);
                }).on("mouseout", function () {
                    $(this).css("color", "");
                });
            }

            function _hide(obj) {
                var select = obj.find(".select");
                select.next("ul.options").slideUp(200);
                select.removeClass().addClass("select");
            }

            function _toggle(obj) {
                var select = obj.find(".select");
                var opt = select.next("ul.options");
                if (opt.is(":hidden")) {
                    _show(obj);
                } else {
                    _hide(obj);
                }
            }
        }

        $.each($(".p-dropdown"), function (i, value) {
            $(value).attr("index", i);
            $(value).css("z-index", objs.length - i);
        });
    }

    $.fn.share = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
        };
        options = $.extend(true, {}, defaultCfg, options);

        self.find("[p-cancel-share]").on("click", function () {
            _toggle();
        });

        var list = self.find(".list");
        var items = list.find(".item");
        items.on("click", function () {
            if (options.onSelect) {
                options.onSelect($(this).index());
            }
            _toggle();
        });

        function _toggle() {
            self.closest(".offcanvas").offcanvas("toggle");
        }
    }
}));