(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _) {

    (function () {
        var scopes = [[48, 57], [96, 105]];
        var codes = [8, 9, 13, 37, 39, 46, 189];
        $.fn.decimal = function () {
            $(this).on("keydown", function (event) {
                if (!_validCode(codes.concat([190]), event.keyCode)) {
                    event.preventDefault();
                }
            }).on("change", function () {
                _onChange($(this));
            });
        }

        $.fn.integer = function () {
            $(this).on("keydown", function (event) {
                if (!_validCode(codes, event.keyCode)) {
                    event.preventDefault();
                }
            }).on("change", function () {
                _onChange($(this));
            });
        }

        function _validCode(codes, code) {
            if (codes.indexOf(code) >= 0) {
                return true;
            }
            for (var i = 0; i < scopes.length; i++) {
                var scope = scopes[i];
                if (code >= scope[0] && code <= scope[1]) {
                    return true;
                }
            }
            return false;
        }

        function _onChange(input) {
            if (isNaN(input.val()) || input.val().length == 0) {
                input.val(0);
            }
            var min = input.attr("min");
            if (min != undefined) {
                if (input.val() < Number(min)) {
                    input.val(min);
                }
            }
            var max = input.attr("max");
            if (max != undefined) {
                if (input.val() > Number(max)) {
                    input.val(max);
                }
            }
        }
    }());

    $.fn.bindDragMove = function (onBegin, onMove, onEnd, options) {
        if (!options) {
            options = {};
        }
        var self = $(this);
        var timestamp = 0;
        var lastPos = {
            x: 0,
            y: 0
        };
        var speed = {
            x: 0,
            y: 0
        };
        var moving = false;
        self.on("mousedown", function (e) {
            if (e.button != 0) {
                return;
            }
            e.stopPropagation();
            moving = true;
            onBegin(e, {
                x: e.pageX,
                y: e.pageY
            }, self);
            $(document).on("mousemove", function (e) {
                if (e.button != 0) {
                    return;
                }
                e.stopPropagation();
                if (!timestamp) {
                    timestamp = new Date().getTime();
                } else {
                    var now = new Date().getTime();
                    speed = {
                        x: Math.abs(e.pageX - lastPos.x) / (now - timestamp),
                        y: Math.abs(e.pageY - lastPos.y) / (now - timestamp),
                    }
                    timestamp = now;
                }
                lastPos = {
                    x: e.pageX,
                    y: e.pageY
                }
                onMove(e, lastPos, speed, self);
            });
        });
        $(document).on("mouseup", function (e) {
            if (e.button != 0) {
                return;
            }
            $(document).unbind("mousemove");
            onEnd(e, {
                x: e.pageX,
                y: e.pageY
            }, speed);
        });

        if (options.preventBody) {
            document.body.addEventListener("touchmove", function (e) {
                if (moving) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
        self.on("touchstart", function (e) {
            e.stopPropagation();
            moving = true;
            onBegin(e, {
                x: e.originalEvent.changedTouches[0].clientX,
                y: e.originalEvent.changedTouches[0].clientY
            }, self);
            $(document).on("touchmove", function (e) {
                e.stopPropagation();
                if (!timestamp) {
                    timestamp = new Date().getTime();
                } else {
                    var now = new Date().getTime();
                    if (now - timestamp != 0) {
                        speed = {
                            x: Math.abs(e.originalEvent.touches[0].clientX - lastPos.x) / (now - timestamp),
                            y: Math.abs(e.originalEvent.touches[0].clientY - lastPos.y) / (now - timestamp),
                        }
                        timestamp = now;
                    }
                }
                lastPos = {
                    x: e.originalEvent.touches[0].clientX,
                    y: e.originalEvent.touches[0].clientY
                }
                onMove(e, lastPos, speed, self);
            });
        });
        $(document).on("touchend", function (e) {
            $(document).off("touchmove");
            timestamp = 0;
            if (!moving) {
                return;
            }
            moving = false;
            onEnd(e, {
                x: e.originalEvent.changedTouches[0].clientX,
                y: e.originalEvent.changedTouches[0].clientY
            }, speed);
        });
    }

    $.fn.bindMouseWheel = function (onWheel) {
        var self = $(this);
        var over = false;
        document.body.addEventListener("mousewheel", function (e) {
            if (over) {
                e.preventDefault();
            }
        }, { passive: false });
        self.on("mouseover", function (e) {
            over = true;
        });
        self.on("mouseout", function (e) {
            over = false;
        });
        self.on("mousewheel", function (e) {
            onWheel(e, e.originalEvent.wheelDelta)
        });
    }

    $.pageLoading = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            class: "secondary"
        };
        options = $.extend(true, {}, defaultCfg, options);
        var tpl = `
            <div class="p-page-loading page-loading">
                <button class="btn btn-<%=cfg.class%>" type="button" disabled>
                    <span class="spinner-border spinner-border-sm"></span>
                    <span class="visually-hidden">Loading...</span>
                </button>
            </div>
        `;
        var loading = $(_.template(tpl)({
            cfg: options
        }));

        $("body").append(loading);

        function _stop() {
            loading.remove();
        }

        return {
            stop: _stop
        }
    }

    $.remToPixels = function (rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    $.uuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}));