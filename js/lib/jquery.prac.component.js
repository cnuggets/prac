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

    /* ------------------- Pagination ------------------- */
    $.fn.pagination = function (skip, limit, total, url, options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            max: 5
        };
        options = $.extend(true, {}, defaultCfg, options);

        var self = $(this);
        var tpl = `
            <div class="navigation">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item<% if (skip == 0) { %> disabled<% } %>">
                            <a aria-label="Previous" class="page-link" href="<%=url%>/<%=skip - limit%>/<%=limit%>" p-router>
                                <span class="page-icon prev" aria-hidden=true>&laquo;</span>
                            </a>
                        </li>
                        <%  _.each(pageNos, function(pageNo, i) { %>
                            <% if (pageNo != -1) { %>
                                <li class="page-item<% if (skip == pageNo * limit) { %> active<% } %>" number>
                                    <a class="page-link" href="<%=url%>/<%=limit * pageNo%>/<%=limit%>" p-router><%=pageNo + 1%></a>
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
                            <a aria-label="Next" class="page-link" href="<%=url%>/<%=skip + limit%>/<%=limit%>" p-router>
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

        self.html(_.template(tpl)({
            skip: parseInt(skip),
            limit: parseInt(limit),
            total: parseInt(total),
            url: url,
            pages: count,
            pageNos: pageNos,
            options: options,
        }));
        self.find("select[name='pageSize']").on("change", function () {
            route(url + "/0/" + $(this).find("option:selected").val());
        });
    }

    // Validation
    function _validation(form) {
        var valid = true;
        if (form.length > 0 && form.hasClass("needs-validation")) {
            $.each(form.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"), function (i, item) {
                _clear($(item));
                _input($(item));
                $(item).on("change", function () {
                    _input($(this));
                });
            });
            function _input(obj) {
                var value = obj.val();
                var pattern = obj.attr("pattern");
                if (obj.attr("required")) {
                    if (value.length == 0) {
                        _error(obj);
                    } else {
                        _ok(obj);
                    }
                } else if (pattern) {
                    if (!value.match(new RegExp(pattern))) {
                        _error(obj);
                    } else {
                        _ok(obj);
                    }
                }
            }

            $.each(form.find("select"), function (i, item) {
                _clear($(item));
                _select($(item));
                $(item).on("change", function () {
                    _select($(this));
                });
            });
            function _select(obj) {
                if (obj.attr("required")) {
                    var selected = obj.find("option:selected");
                    if (selected.length == 0) {
                        _error(obj);
                    } else {
                        if (selected.length == 1) {
                            if (selected.val().length == 0) {
                                _error(obj);
                            } else {
                                _ok(obj);
                            }
                        } else {
                            _ok(obj);
                        }
                    }
                }
            }

            $.each(form.find("input[type='checkbox']"), function (i, item) {
                _clear($(item));
                _check($(item));
                $(item).on("change", function () {
                    _check($(this));
                });
            });
            function _check(obj) {
                if (obj.attr("required")) {
                    if (!obj.is(":checked")) {
                        _error(obj);
                    } else {
                        _ok(obj);
                    }
                }
            }
        }

        function _clear(ctx) {
            ctx.removeClass("is-valid");
            ctx.removeClass("is-invalid");
        }

        function _ok(ctx) {
            ctx.removeClass("is-invalid").addClass("is-valid");
        }

        function _error(ctx) {
            valid = false;
            ctx.removeClass("is-valid").addClass("is-invalid");
        }

        return valid;
    }

    // Form data
    function _data(form) {
        var data = {};
        if (!form || form.length == 0) {
            return data;
        }
        $.each(form.find("input[name]"), function (i, item) {
            var input = $(item);
            var name = input.attr("name");
            var type = input.prop("type");
            var value = input.val();
            if (input.attr("p-integer") != undefined || input.attr("p-decimal") != undefined) {
                if (!isNaN(value)) {
                    value = Number(value);
                }
            }

            if (type == "radio" || type == "checkbox") {
                if (input.is(":checked")) {
                    _set(name, value);
                }
            } else {
                _set(name, value);
            }
        });

        $.each(form.find("textarea[name]"), function (i, item) {
            var textarea = $(item);
            var name = textarea.attr("name");
            var value = textarea.val();
            _set(name, value);
        });

        $.each(form.find("select[name]"), function (i, item) {
            var select = $(item);
            var name = select.attr("name");
            $.each(select.find("option:selected"), function (i, option) {
                var value = $(option).attr("value");
                if (select.attr("p-integer") != undefined || select.attr("p-decimal") != undefined) {
                    if (!isNaN(value)) {
                        value = Number(value);
                    }
                }
                _set(name, value);
            });
        });

        function _set(name, value) {
            if (data[name] != undefined) {
                if (!$.isArray(data[name])) {
                    data[name] = [data[name]];
                }
                data[name].push(value);
            } else {
                data[name] = value;
            }
        }

        return data;
    }

    /* ------------------- Modal ------------------- */
    (function () {
        function _modal(ctx, title, message, options) {
            var self = ctx;

            if (!options) {
                options = {};
            }
            var defaultCfg = {
                autoTrigger: false,
                close: true,
                footer: true,
                confirm: {
                    class: "primary",
                    label: "Confirm",
                    waiting: "Waiting",
                    onConfirm: null
                },
                cancel: {
                    class: "secondary",
                    label: "Cancel",
                    onCancel: null,
                    disabled: false
                }
            };
            options = $.extend(true, {}, defaultCfg, options);

            var tpl = `
                <div class="modal fade" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="confirm-<%=new Date().getTime()%>" style="display:none">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <% if (close || title) { %>
                            <div class="modal-header">
                                <h5 class="modal-title" style="overflow-wrap: break-word;overflow: auto;"></h5>
                                <% if (close) { %>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <% } %>
                            </div>
                            <% } %>
                            <div class="modal-body"></div>
                            <% if (footer) { %>
                            <div class="modal-footer">
                                <% if (!cancel.disabled) { %>
                                <button class="btn btn-<%=cancel.class%>" data-bs-dismiss="modal" type="button" cancel><%=cancel.label%></button>
                                <% } %>
                                <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                    <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                </button>
                                <button class="btn btn-<%=confirm.class%>" type="button" confirm><%=confirm.label%></button>
                            </div>
                            <% } %>
                        </div>
                    </div>
                </div>
            `;
            options.title = title ? true : false;

            var obj;
            if (options.autoTrigger) {
                obj = _show();
            } else {
                if (self) {
                    self.off("click");
                    self.on("click", function () {
                        obj = _show();
                    });
                } else {
                    obj = _show();
                }
            }

            function _show() {
                var modal = $(_.template(tpl)(options));

                if (typeof title == "string") {
                    modal.find(".modal-title").text(title);
                } else {
                    modal.find(".modal-title").append(title);
                }

                if (typeof message == "string") {
                    var body = $("<p></p>");
                    body.html(message);
                    modal.find(".modal-body").append(body);
                } else {
                    modal.find(".modal-body").append(message);
                }

                if (options.size) {
                    modal.find(".modal-dialog").addClass("modal-" + options.size);
                }
                if (options.css) {
                    for (var key in options.css) {
                        modal.find(".modal-dialog").css(key, options.css[key]);
                    }
                }

                $("body").append(modal);

                if (options && options.before) {
                    options.before();
                }
                modal.on("show.bs.modal", function () {
                    if (options && options.after) {
                        options.after();
                    }
                });
                modal.modal("toggle");

                var cancelBtn = modal.find("button[cancel]");
                cancelBtn.on("click", function () {
                    if (options.cancel.onCancel) {
                        options.cancel.onCancel();
                    }
                });

                var confirmBtn = modal.find("button[confirm]");
                var waiting = modal.find("button[waiting]");
                confirmBtn.on("click", function () {
                    if (!_validation(modal.find("form"))) {
                        return;
                    }

                    waiting.show();
                    confirmBtn.hide();
                    if (options.confirm.onConfirm) {
                        if (modal.find("form").length > 0) {
                            options.confirm.onConfirm(_data(modal.find("form")), function () {
                                _complete();
                            }, self);
                        } else {
                            options.confirm.onConfirm(function () {
                                _complete();
                            }, self);
                        }
                    } else {
                        _complete();
                    }

                    function _complete() {
                        waiting.hide();
                        confirmBtn.show();
                        modal.modal("toggle");
                    }
                });

                modal.on("hidden.bs.modal", function () {
                    modal.remove();
                });

                return modal;
            }

            function _reset() {
                obj.find("button[waiting]").hide();
                obj.find("button[confirm]").show();
            }

            return {
                reset: _reset
            }
        }

        // Dialog
        $.fn.dialog = function (title, message, options) {
            return _modal($(this), title, message, options);
        }

        $.dialog = function (title, message, options) {
            return _modal(null, title, message, options);
        }

        // Confirm
        $.fn.confirm = function (title, message, options) {
            return _modal($(this), title, message, options);
        }
        $.confirm = function (title, message, options) {
            return _modal(null, title, message, options);
        }

        // Info
        $.fn.info = function (message, options) {
            return _info($(this), message, options);
        };
        $.info = function (message, options) {
            return _info(null, message, options);
        };
        function _info(ctx, message, options) {
            if (!options) {
                options = {};
            }
            options = $.extend(true, {}, options, {
                footer: false
            });
            return _modal(ctx, $('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'), message, options);
        }

        // Alert
        $.fn.alert = function (message, options) {
            return _alert($(this), message, options);
        };
        $.alert = function (message, options) {
            return _alert(null, message, options);
        };
        function _alert(ctx, message, options) {
            if (!options) {
                options = {};
            }
            options = $.extend(true, {}, options, {
                close: false,
                cancel: {
                    disabled: true
                },
                confirm: {
                    class: "danger"
                }
            });
            return _modal(ctx, $('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'), message, options);
        }
    }());

    /* ------------------- Form ------------------- */
    (function () {
        $.fn.form = function (options) {
            var self = $(this);

            if (!options) {
                options = {};
            }
            var defaultCfg = {
                footer: {
                    fixed: false,
                    align: "left"
                },
                confirm: {
                    class: "primary",
                    label: "Submit",
                    waiting: "Waiting",
                    onConfirm: null
                },
                cancel: {
                    class: "secondary",
                    label: "Cancel",
                    onCancel: null,
                    disabled: false
                }
            };
            options = $.extend(true, {}, defaultCfg, options);

            var tpl = `
                <div form-footer class="mt-2<% if (footer.fixed) { %> fixed-bottom border-top bg-white opacity-90 py-3<% } %>">
                    <div class="row">
                        <% if (footer.element) { %>
                            <% if (footer.align == "right") { %>
                                <div class="col-md-6" element>
                                </div>
                                <div class="col-md-6" style="display: flex;justify-content: right;align-items: center;padding-right: 5rem">
                                    <% if (!cancel.disabled) { %>
                                        <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                                    <% } %>
                                    <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                                    <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                        <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                    </button>
                                </div>
                            <% } else { %>
                                <div class="col-md-6">
                                    <% if (!cancel.disabled) { %>
                                        <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                                    <% } %>
                                    <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                                    <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                        <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                    </button>
                                </div>
                                <div class="col-md-6" element>
                                </div>
                            <% } %>
                        <% } else { %>
                            <div class="col-md-12">
                                <% if (!cancel.disabled) { %>
                                    <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                                <% } %>
                                <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                                <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                    <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                </button>
                            </div>
                        <% } %>
                    </div>
                </div>
            `;
            var footer = $(_.template(tpl)(options));

            if ($(".side-menu").length > 0 && options.footer.fixed) {
                if ($(".side-menu").hasClass("fold")) {
                    footer.css("margin-left", "2rem");
                } else {
                    footer.css("margin-left", "20rem");
                }
            }

            if (options.footer.element) {
                footer.find("[element]").append(options.footer.element);
            }

            var cancelBtn = footer.find("button[cancel]");
            cancelBtn.on("click", function () {
                if (options.cancel.onCancel) {
                    options.cancel.onCancel();
                }
            });

            var confirmBtn = footer.find("button[confirm]");
            var waiting = footer.find("button[waiting]");
            confirmBtn.on("click", function () {
                if (!_validation(self)) {
                    return;
                }

                waiting.show();
                confirmBtn.hide();
                if (options.confirm.onConfirm) {
                    options.confirm.onConfirm(_data(self), function () {
                        _complete();
                    }, self);
                } else {
                    _complete();
                }

                function _complete() {
                    waiting.hide();
                    confirmBtn.show();
                }
            });

            self.find("[form-footer]").remove();
            self.append(footer);
        }
    }());

    /* ------------------- Slider ------------------- */
    $.fn.slider = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            height: 3,
            classes: [],
            min: 0,
            max: 100,
            default: 0,
            step: 1,
            onChange: function (value) { }
        };
        options = $.extend(true, {}, defaultCfg, options);

        var tpl = `
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `;

        // init
        var current = options.default;
        var self = $(this);
        var disabled = self.attr("disabled");
        var slider = $(_.template(tpl)(options));
        var bar = slider.find(".progress-bar");
        var btn = slider.find(".btn");
        if (options.btn) {
            bar.parent().after(options.btn);
            btn.remove();
            btn = options.btn;
            btn.css("position", "relative").css("cursor", "pointer");
        }
        self.append(slider);
        if (disabled) {
            _disable();
        }

        var farLeft;
        var farRight;
        btn.css("top", - (btn.outerHeight() / 2 + options.height / 2 + 1) + "px");

        function _position(obj) {
            obj = obj.get(0);
            var p = {};
            p.left = obj.offsetLeft;
            p.top = obj.offsetTop;
            while (obj.offsetParent) {
                p.left = p.left + obj.offsetParent.offsetLeft;
                p.top = p.top + obj.offsetParent.offsetTop;
                if (obj == $("body").get(0)) {
                    break;
                }
                else {
                    obj = obj.offsetParent;
                }
            }
            return p;
        }

        _size();
        function _size() {
            farLeft = _position(slider).left;
            farRight = farLeft + slider.width();
        }

        // move to default
        _move(options.default);

        function _move(value) {
            if (current != value) {
                current = value;
                options.onChange(current);
            }
            var left = _btnX(value);
            var width = _percentage(value);
            btn.css("left", left + "%");
            bar.css("width", width + "%");

            function _btnX(value) {
                var offset = btn.outerWidth() / 2;
                var offsetValue = ((options.max - options.min) / slider.width() * offset);
                return _percentage(value - offsetValue);
            }

            function _percentage(value) {
                return ((value - options.min) / (options.max - options.min)) * 100;
            }
        }

        function _actionMove(x) {
            if (x < farLeft) {
                x = farLeft;
            }
            if (x > farRight) {
                x = farRight;
            }
            var value = options.min + Math.round((options.max - options.min) / (farRight - farLeft) * (x - farLeft));
            if (options.step > 1) {
                for (var i = options.min; i < options.max; i = i + options.step) {
                    if (value == i) {
                        break;
                    }
                    if (i + options.step <= options.max) {
                        if (value > i && value < i + options.step) {
                            if (value - i > i + options.step - value) {
                                value = i + options.step;
                            } else {
                                value = i;
                            }
                            break;
                        }
                    }
                }
            }
            _move(value);
        }

        btn.bindDragMove(function (e, pos) {
            e.preventDefault();
        }, function (e, pos, speed) {
            _actionMove(pos.x);
        }, function (e, pos, speed) {
        });

        // on resize
        $(window).on("resize", function () {
            _size();
            _move(current);
        });

        $(window).on("p-resize", function () {
            _size();
            _move(current);
        });

        function _disable() {
            disabled = true;
            self.attr("disabled", true);
            self.find(".progress-bar").css("opacity", 0.6);
        }

        function _enable() {
            disabled = false;
            self.removeAttr("disabled");
            self.find(".progress-bar").css("opacity", "");
        }

        return {
            setValue: function (value) {
                _move(value);
            },
            disable: _disable,
            enable: _enable
        }
    }

    /* ------------------- Multiple Select ------------------- */
    $.fn.multiselect = function (opt) {
        var self = $(this);
        if (!opt) {
            opt = {};
        }
        var defaultCfg = {
            search: false,
        };
        opt = $.extend(true, {}, defaultCfg, opt);

        var tpl = `
            <div class="multiselect">
                <div class="selected">
                    <% if (opt.single) { %>
                        <% if (selecteds.length > 0) { %>
                        <label class="single" value="<%=selecteds[0].value%>"><%=selecteds[0].text%></label>
                        <% } %>
                    <% } else { %>
                        <%_.each(selecteds, function(selected) {%>
                            <span class="item">
                                <label value="<%=selected.value%>"><%=selected.text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        <% }); %>
                    <% } %>
                </div>
                <div class="validation">
                    <i class="bi bi-exclamation-circle text-danger"></i>
                    <i class="bi bi-check-lg text-success"></i>
                </div>
                <i class="bi bi-chevron-down"></i>
                <div class="select">
                    <% if (opt.search) { %>
                    <div class="search">
                        <i class="bi bi-search"></i>
                        <input type="text">
                        <% if (opt.search.async) { %>
                        <div class="spinner-border text-secondary spinner-border-sm">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <% } %>
                    </div>
                    <% } %>
                    <ul class="options">
                        <%_.each(options, function(option) {%>
                            <li>
                                <span class="checked"><i class="bi<% if (option.selected) { %> bi-check-lg<% } %>"></i></span>
                                <span value="<%=option.value%>"><%=option.text%></span>
                            </li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `;

        var single = !self.attr("multiple");
        var selecteds = [];
        var options = [];
        $.each($(this).find("option"), function (i, item) {
            var option = {
                value: $(item).attr("value"),
                text: $(item).text()
            };
            if ($(item).is(":selected")) {
                option.selected = true;
                selecteds.push(option);
            }
            options.push(option);
        });

        opt.single = single;
        var multi = $(_.template(tpl)({
            selecteds: selecteds,
            options: options,
            opt: opt
        }));
        var selected = multi.find(".selected");
        var select = multi.find(".select");

        $.each(selected.find("span i"), function (i, item) {
            $(item).on("click", function (e) {
                e.stopPropagation();
                _deselect($(this).closest("span"));
            });
        });

        selected.on("click", function (e) {
            e.stopPropagation();
            select.is(":hidden") ? select.show() : select.hide();
        });
        select.on("click", function (e) {
            e.stopPropagation();
        });
        $("body").on("click", function () {
            select.hide();
        });

        _bindOnSelect();
        function _bindOnSelect() {
            select.find("ul.options li").on("click", function (e) {
                e.stopPropagation();
                var checked = $(this).find("span.checked i");
                var option = $(this).find("span:last-child");
                var value = option.attr("value");
                if (checked.hasClass("bi-check-lg")) {
                    _deselect(selected.find("span label[value='" + value + "']").closest("span"));
                } else {
                    if (single) {
                        var tpl = `
                            <label class="single" value="<%=value%>"><%=text%></label>
                        `;
                        select.find("span.checked i").removeClass("bi-check-lg");
                        checked.addClass("bi-check-lg");
                        selected.html(_.template(tpl)({
                            value: value,
                            text: option.text()
                        }));
                        self.find("option[value='" + value + "']").prop("selected", true).change();
                        select.hide();
                    } else {
                        var tpl = `
                            <span class="item">
                                <label value="<%=value%>"><%=text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        `;

                        var newSelected = $(_.template(tpl)({
                            value: value,
                            text: option.text()
                        }));
                        newSelected.find("i").on("click", function (e) {
                            e.stopPropagation();
                            _deselect($(this).closest("span"));
                        });
                        checked.addClass("bi-check-lg");
                        selected.append(newSelected);
                        self.find("option[value='" + value + "']").prop("selected", true).change();
                    }
                }
            });
        }

        function _deselect(obj) {
            var value = obj.find("label").attr("value");
            select.find("li span[value='" + value + "']").siblings("span").find("i").removeClass("bi-check-lg");
            obj.remove();
            self.find("option[value='" + value + "']").prop("selected", false).change();
        }

        if (opt.search) {
            var input = multi.find(".search input");
            var waiting = select.find(".search .spinner-border");
            if (opt.search.async) {
                if (opt.search.keyword) {
                    input.val(opt.search.keyword);
                }
                if (opt.search.autoTrigger) {
                    _search(input.val());
                }
                var timeout;
                input.on("keyup", function (e) {
                    var keyword = $(this).val();
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        _search(keyword);
                    }, 600);
                });

                function _search(keyword) {
                    waiting.show();
                    opt.search.async(keyword, function (data) {
                        var tpl = `
                            <%_.each(options, function(option) {%>
                                <li>
                                    <span class="checked"><i class="bi"></i></span>
                                    <span value="<%=option.value%>"><%=option.text%></span>
                                </li>
                            <% }); %>
                        `;
                        select.find("ul").html(_.template(tpl)({
                            options: data
                        }));
                        _highlight(keyword);
                        self.find("option").remove();
                        self.append($("<option value=''></option>"));
                        data.forEach(function (item) {
                            var option = $("<option></option>");
                            option.attr("value", item.value);
                            option.text(item.text);
                            self.append(option);
                        });
                        waiting.hide();

                        $.each(selected.find("span.item"), function (i, value) {
                            var selectedValue = $(value).find("label").attr("value");
                            self.find("option[value='" + selectedValue + "']").prop("selected", true);
                            select.find("ul li span[value='" + selectedValue + "']").siblings("span.checked").find("i").addClass("bi-check-lg");
                        });

                        _bindOnSelect();
                        if (opt.search.autoSelect && input.val().length == 0) {
                            select.find("ul.options li:first-child").trigger("click");
                        }
                    });
                }
            } else {
                input.on("keyup", function (e) {
                    var keyword = $(this).val();
                    _highlight(keyword, true);
                });
            }

            function _highlight(keyword, filter) {
                var options = select.find("ul.options li span:last-child");
                $.each(options, function (i, option) {
                    var text = $(option).text();
                    var regexp = new RegExp(keyword, "i");
                    var groups = text.match(regexp);
                    if (groups) {
                        var matched = text.substring(groups.index, groups.index + keyword.length);
                        $(option).html(text.replace(regexp, "<b>" + matched + "</b>"));
                        $(option).closest("li").show();
                    } else {
                        if (filter) {
                            $(option).closest("li").hide();
                        }
                    }
                });
            }
        }

        self.after(multi);
        self.hide();
    };

    /* ------------------- Stepper ------------------- */
    $.fn.stepper = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            class: "primary",
            default: 0,
            step: 1,
            decimal: 0
        };
        options = $.extend(true, {}, defaultCfg, options);

        var tpl = `
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `;

        var stepper = $(_.template(tpl)({
            options: options
        }));
        if (options.class.indexOf("outline-") >= 0) {
            self.addClass("border-" + options.class.split("outline-")[1]);
        }
        self.val(options.default);
        self.css("text-align", "center");
        if (!isNaN(options.min)) {
            self.attr("min", options.min);
        }
        if (!isNaN(options.max)) {
            self.attr("max", options.max);
        }
        if (options.decimal > 0) {
            self.decimal();
        } else {
            self.integer();
        }

        var down = stepper.find("button:first-child");
        var up = stepper.find("button:last-child");

        down.on("click", function () {
            var value = Number(self.val());
            if (options.min == undefined || value > Number(options.min)) {
                if (options.decimal > 0) {
                    self.val((value - options.step / (10 ** options.decimal)).toFixed(options.decimal)).change();
                } else {
                    self.val(value - options.step).change();
                }
            }
        });
        up.on("click", function () {
            var value = Number(self.val());
            if (options.max == undefined || value < Number(options.max)) {
                if (options.decimal > 0) {
                    self.val((value + options.step / (10 ** options.decimal)).toFixed(options.decimal)).change();
                } else {
                    self.val(value + options.step).change();
                }
            }
        });
        self.on("change", function () {
            var value = Number($(this).val());
            if (options.min != undefined) {
                if (value <= Number(options.min)) {
                    down.attr("disabled", true);
                } else {
                    down.removeAttr("disabled");
                }
            }
            if (options.max != undefined) {
                if (value >= Number(options.max)) {
                    up.attr("disabled", true);
                } else {
                    up.removeAttr("disabled");
                }
            }
        });

        self.after(stepper);
        down.after(self);
    }

    /* ------------------- Page loading ------------------- */
    $.fn.pageLoading = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            left: function () {
                return $(window).width() / 2 - self.width() / 2;
            },
            top: function () {
                return $(window).height() / 2 - self.height() / 2
            }
        };
        options = $.extend(true, {}, defaultCfg, options);
        var self = $(this);
        self.css("position", "absolute");

        _position();
        $(window).on("resize", function () {
            _position();
        });

        function _position() {
            if (typeof options.left == "function") {
                self.css("left", options.left());
            } else {
                self.css("left", options.left);
            }
            if (typeof options.top == "function") {
                self.css("top", options.top());
            } else {
                self.css("top", options.top);
            }
        }

        return {
            show: function () {
                self.show();
            },
            hide: function () {
                self.hide();
            }
        }
    }

    /* ------------------- Left Menu ------------------- */
    $.fn.menu = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
        };
        options = $.extend(true, {}, defaultCfg, options);
        var self = $(this);

        self.find(".fold-btn").on("click", function () {
            var menu = $(this).closest("[p-menu]");
            if (menu.hasClass("fold")) {
                menu.removeClass("fold");
                if ($("[form-footer]").hasClass("fixed-bottom")) {
                    $("[form-footer]").css("margin-left", "20rem").css("transition", "margin-left .2s ease-in");
                }
            } else {
                menu.addClass("fold");
                if ($("[form-footer]").hasClass("fixed-bottom")) {
                    $("[form-footer]").css("margin-left", "2rem").css("transition", "margin-left .2s ease-in");
                }
            }
            setTimeout(function () {
                $(window).trigger("p-resize");
            }, 300);
        });

        self.find(".menu a").on("click", function () {
            var next = $(this).next();
            var right = $(this).find("i.bi-chevron-right");
            self.find(".menu a").removeClass("selected");
            if (next.is(":hidden")) {
                next.slideDown(200);
                right.css("transform", "rotate(90deg)");
                right.css("transition", "all 0.2s");
            } else {
                next.slideUp(200);
                right.css("transform", "rotate(0)");
                right.css("transition", "all 0.2s");
            }
            $(this).addClass("selected");
        });
    };

    /* ------------------- Cascade Select ------------------- */
    $.cascadeSelect = function (options) {
        if (!options || !$.isArray(options) || options.length == 0) {
            return;
        }
        options.forEach(function (opt, i) {
            opt.selector.attr("index", i);
        });

        _init(options[0], "");

        function _init(opt, value) {
            if (opt.async) {
                opt.selector.prepend("<option selected>loading...</option>");
                opt.async(value, function (data, selected) {
                    _render(opt.selector, data, selected);
                });
            } else {
                _render(opt.selector, value ? opt.data[value] : opt.data, opt.selected);
            }
        }

        function _render(ctx, data, selected) {
            var tpl = `
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `;
            ctx.find("option").remove();
            ctx.append(_.template(tpl)({
                data: data,
                selected: selected
            }));

            _onSelect(parseInt(ctx.attr("index")), ctx.find("option:selected").val());

            ctx.on("change", function () {
                _onSelect(parseInt($(this).attr("index")), $(this).find("option:selected").val());
            });
        }

        function _onSelect(index, value) {
            if (index < options.length - 1) {
                _init(options[++index], value);
            }
        }
    }

    $.fn.breadcrumb = function (data, options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            history: true,
            divider: ">"
        };
        options = $.extend(true, {}, defaultCfg, options);
        var self = $(this);
        var tpl = `
            <nav style="--bs-breadcrumb-divider: '<%=cfg.divider%>';">
                <ol class="breadcrumb">
                    <% _.each(data, function (item) { %>
                        <% if (!item.current) { %>
                            <li class="breadcrumb-item">
                                <a href="<%=item.uri%>" p-router><%=item.name%></a>
                            </li>
                        <% } else { %>
                            <li class="breadcrumb-item active"><%=item.name%></li>
                        <% } %>
                    <% }); %>
                </ol>
            </nav>
        `;

        if (!data || data.length == 0) {
            return;
        }

        if (options.history) {
            data.forEach(function (item) {
                var pairs = $.localStorage.all("back");
                for (var key in pairs) {
                    var value = JSON.parse(pairs[key]);
                    if (value.name == item.name) {
                        item.uri = value.uri;
                    }
                }
            });
        }

        self.html(_.template(tpl)({
            data: data,
            cfg: options
        }));
    }
}));
