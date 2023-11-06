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
    $.fn.ellipsis = function (options) {
        var self = $(this);
        if (!options) {
            options = {
                lines: 1,
                expandable: false
            };
        }

        var lang = {
            en: {
                label: {
                    fold: "show less",
                    unfold: "show all"
                }
            },
            zh: {
                label: {
                    fold: "收起",
                    unfold: "展开"
                }
            }
        };

        var defaultCfg = {
            lang: "en"
        };
        var langOpt = lang[options.lang] ? lang[options.lang] : lang["en"];
        options = $.extend(true, {}, defaultCfg, langOpt, options);

        function _clear(ctx) {
            ctx.removeClass("p-text-ellipsis").removeClass("p-text-ellipsis-ml");
        }

        function _fold(ctx) {
            if (options.lines > 1) {
                ctx.addClass("p-text-ellipsis-ml");
                ctx.attr("style", "-webkit-line-clamp: " + options.lines);
            } else {
                ctx.addClass("p-text-ellipsis");
            }
        }

        function _isEllipsisActive(elem) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var styles = getComputedStyle(elem);
            return ctx.measureText(elem.innerText).width > parseFloat(styles.width)
        }

        _clear(self);
        if (options.expandable) {
            var tpl = `
                <span><%=text%></span>
                <a href="javascript:void(0)"><%=options.label.unfold%></a>
            `;
            var text = self.text();
            self.html(_.template(tpl)({
                text: text,
                options: options
            }));
            var ctx = self.children("span");
            _fold(ctx);
            var btn = self.children("a");
            if (_isEllipsisActive(ctx.get(0))) {
                btn.on("click", function () {
                    if (ctx.hasClass("p-text-ellipsis") || ctx.hasClass("p-text-ellipsis-ml")) {
                        _clear(ctx);
                        btn.text(options.label.fold);
                    } else {
                        _fold(ctx);
                        btn.text(options.label.unfold);
                    }
                });
            } else {
                btn.remove();
            }
        } else {
            _fold(self);
        }
    };

    $.fn.popover = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }

        var lang = {
            en: {
            },
            zh: {
            }
        };

        var defaultCfg = {
            lang: "en",
            position: "bottom", // top, bottom, left, right
            location: "begin" // begin, end, middle
        };
        var langOpt = lang[options.lang] ? lang[options.lang] : lang["en"];
        options = $.extend(true, {}, defaultCfg, langOpt, options);

        if (self.next(".p-popover").length == 0) {
            var tpl = `
                <div class="p-popover">
                    <div class="p-content"></div>
                    <i class="bi p-arrow"></i>
                </div>
            `;
            var content = self.attr("title");
            if (options.content) {
                content = options.content;
            }

            var popover = $(_.template(tpl)());
            self.after(popover);

            if (typeof content == "object") {
                popover.find(".p-content").append(content);
            } else {
                popover.find(".p-content").html(content);
            }
        }

        var popover = self.next(".p-popover");
        var arrow = popover.find(".p-arrow");

        function _loc() {
            // position
            if (options.position == "top") {
                arrow.addClass("bi-caret-down-fill");
                popover.css("top", self.position().top - popover.outerHeight() - 7);
                arrow.css("top", popover.outerHeight() - 10);
            } else if (options.position == "bottom") {
                arrow.addClass("bi-caret-up-fill");
                popover.css("top", self.position().top + self.outerHeight() + 7);
                arrow.css("top", - 14);
            } else if (options.position == "left") {
                arrow.addClass("bi-caret-right-fill");
                popover.css("left", self.position().left - popover.outerWidth() - 7);
                arrow.css("right", -9);
            } else if (options.position == "right") {
                arrow.addClass("bi-caret-left-fill");
                popover.css("left", self.position().left + self.outerWidth() + 7);
                arrow.css("left", -9);
            }

            // location
            if (options.location == "begin") {
                if (options.position == "top" || options.position == "bottom") {
                    arrow.css("left", self.outerWidth() * 0.3);
                    popover.css("left", self.position().left);
                } else {
                    arrow.css("top", self.outerHeight() * 0.3);
                    popover.css("top", self.position().top);
                }
            } else if (options.location == "end") {
                if (options.position == "top" || options.position == "bottom") {
                    arrow.css("right", self.outerWidth() * 0.3);
                    popover.css("left", self.position().left - (popover.outerWidth() - self.outerWidth()));
                } else {
                    arrow.css("bottom", self.outerHeight() * 0.3);
                    popover.css("top", self.position().top - (popover.outerHeight() - self.outerHeight()));
                }
            } else if (options.location == "middle") {
                if (options.position == "top" || options.position == "bottom") {
                    arrow.css("left", popover.outerWidth() * 0.5 - arrow.outerWidth() / 2)
                    popover.css("left", self.position().left + self.outerWidth() / 2 - popover.outerWidth() / 2);
                } else {
                    arrow.css("top", popover.outerHeight() * 0.5 - arrow.outerHeight() / 2)
                    popover.css("top", self.position().top + self.outerHeight() / 2 - popover.outerHeight() / 2);
                }
            }
        }

        $("body").on("click", function () {
            $(".p-popover").hide();
        });

        self.on("click", function (e) {
            e.stopPropagation();
            if (arrow.is(":hidden")) {
                $(".p-popover").hide();
                popover.show();
                _loc();
            } else {
                popover.hide();
            }
        });

        popover.on("click", function (e) {
            e.stopPropagation();
        });

        $(window).on("resize", function () {
            _loc();
        });

        function _close() {
            popover.hide();
        }

        return {
            close: _close
        }
    };

    $.fn.progress = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            height: 5,
            classes: ["bg-primary"],
            min: 0,
            max: 100,
            default: 0,
            step: 1,
            formatter: function (value) {
                return value;
            },
            onChange: function (value) { }
        };
        options = $.extend(true, {}, defaultCfg, options);

        var tpl = `
            <div class="p-progress">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn<%_.each(classes, function(c) { %><% if (c.indexOf("bg-") == 0) { %> <%=c%><% } %><% }); %>"></div>
            </div>
        `;

        // init
        var current = options.default;
        var self = $(this);
        var progress = $(_.template(tpl)(options));
        var bar = progress.find(".progress-bar");
        var btn = progress.find(".btn");
        self.append(progress);
        if (options.height > btn.outerHeight()) {
            options.height = btn.outerHeight();
            progress.find(".progress").css("height", btn.outerHeight());
        }
        progress.css("transform", "translateY(" + (btn.outerHeight() / 2 + 1) + "px)");
        btn.css("top", - (btn.outerHeight() / 2 + options.height / 2) + "px");

        // move to default
        _move(options.default);

        function _move(value) {
            if (value > options.max) {
                value = options.max;
            }
            if (value < options.min) {
                value = options.min;
            }
            if (current != value) {
                current = value;
                options.onChange(current);
            }
            btn.text(options.formatter(current));
            var left = _btnX(value);
            var width = _percentage(value);
            btn.css("left", left + "%");
            bar.css("width", width + "%");

            function _btnX(value) {
                var offset = btn.outerWidth() / 2;
                var offsetValue = ((options.max - options.min) / progress.width() * offset);
                return _percentage(value - offsetValue);
            }

            function _percentage(value) {
                return ((value - options.min) / (options.max - options.min)) * 100;
            }
        }

        // on resize
        $(window).on("resize", function () {
            _move(current);
        });

        return {
            setValue: function (value) {
                _move(value);
            },
            getValue: function () {
                return current;
            }
        }
    }
}));