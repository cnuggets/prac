(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "common", "component"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _) {

    $.fn.condition = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var lang = {
            en: {
                ops: {
                    "lt": {
                        "value": "<",
                        "text": "less than"
                    },
                    "lte": {
                        "value": "<=",
                        "text": "less than or equal"
                    },
                    "gt": {
                        "value": ">",
                        "text": "greater than"
                    },
                    "gte": {
                        "value": ">=",
                        "text": "greater than or equal"
                    },
                    "eq": {
                        "value": "=",
                        "text": "equal"
                    },
                    "neq": {
                        "value": "!=",
                        "text": "not equal"
                    },
                    "in": {
                        "value": "in",
                        "text": "in"
                    },
                    "nin": {
                        "value": "not in",
                        "text": "not in"
                    },
                    "match": {
                        "value": "match",
                        "text": "match"
                    },
                    "notmatch": {
                        "value": "not match",
                        "text": "not match"
                    },
                    "range": {
                        "value": "range",
                        "text": "range"
                    },
                    "nil": {
                        "value": "empty",
                        "text": "empty"
                    },
                    "notnil": {
                        "value": "not empty",
                        "text": "not empty"
                    }
                },
                text: {
                    "add": "Add Condition"
                }
            },
            zh: {
                ops: {
                    "lt": {
                        "value": "<",
                        "text": "小于"
                    },
                    "lte": {
                        "value": "<=",
                        "text": "小于等于"
                    },
                    "gt": {
                        "value": ">",
                        "text": "大于"
                    },
                    "gte": {
                        "value": ">=",
                        "text": "大于等于"
                    },
                    "eq": {
                        "value": "=",
                        "text": "等于"
                    },
                    "neq": {
                        "value": "!=",
                        "text": "不等于"
                    },
                    "in": {
                        "value": "包含",
                        "text": "包含"
                    },
                    "nin": {
                        "value": "不包含",
                        "text": "不包含"
                    },
                    "match": {
                        "value": "匹配",
                        "text": "匹配"
                    },
                    "notmatch": {
                        "value": "不匹配",
                        "text": "不匹配"
                    },
                    "range": {
                        "value": "范围",
                        "text": "范围"
                    },
                    "nil": {
                        "value": "为空",
                        "text": "为空"
                    },
                    "notnil": {
                        "value": "不为空",
                        "text": "不为空"
                    }
                },
                text: {
                    "add": "添加条件"
                }
            }
        }
        var defaultCfg = {
            lang: "en",
            options: {
                names: {},
                values: {}
            }
        };
        var langOpt = lang[options.lang] ? lang[options.lang] : lang["en"];
        options = $.extend(true, {}, defaultCfg, langOpt, options);

        var tpl = `
            <div class="p-cond">
                <div class="cop" op="and">
                    <div class="inner">
                        <span>And</span>
                        <i class="bi bi-arrow-repeat"></i>
                    </div>
                </div>
                <div class="conn"></div>
                <div class="conds">
                </div>
                <div class="add">
                    <button type="button" class="btn btn-secondary btn-sm">
                        <i class="bi bi-plus"></i>
                        <span><%=opt.text.add%></span>
                    </button>
                </div>
            </div>
        `;

        var condTpl = `
            <div class="cond">
                <div class="input">
                    <div class="nao">
                        <div class="name">
                            <select class="form-select" name="_p_cond_name" required>
                            <% if (opt.options.names) { %>
                                <% for (var value in opt.options.names) { %>
                                    <option value="<%=value%>"<% if (cond && cond.name == value) { %> selected<% } %>><%=opt.options.names[value]%></option>
                                <% } %>
                            <% } %>
                            </select>
                        </div>
                        <div class="op">
                            <div class="separator"></div>
                            <div class="selected">
                                <% 
                                    var op = cond ? cond.op : "eq";
                                    var value = opt.ops[op].value;
                                %>
                                <input type="hidden" name="_p_cond_op" value="<%=op%>">
                                <span><%=value%></span>
                                <i class="bi bi-chevron-down"></i>
                            </div>
                            <ul class="select">
                                <% for (var op in opt.ops) { %>
                                <li value="<%=op%>">
                                    <a href="javascript:void(0)" title="<%=opt.ops[op].text%>" p-tooltip><%=opt.ops[op].value%></a>
                                </li>
                                <% } %>
                            </ul>
                        </div>
                    </div>
                    <div class="value">
                        <select class="form-select" name="_p_cond_value" required<% if (cond && ["in", "nin", "range"].indexOf(cond.op) >= 0) { %> multiple<% } %>>
                        <% if (opt.options.values) { %>
                            <% for (var value in opt.options.values) { %>
                                <option value="<%=value%>"<% if (cond && cond.values.indexOf(value) >= 0) { %> selected<% } %>><%=opt.options.values[value]%></option>
                            <% } %>
                        <% } %>
                        </select>
                    </div>
                </div>
                <div class="remove">
                    <a href="javascript:void(0)">
                        <i class="bi bi-trash"></i>
                    </a>
                </div>
            </div>
        `;

        function _convert(data) {
            if (data && $.isArray(data)) {
                var values = {};
                data.forEach(function (value) {
                    values[value] = value;
                });
                return values;
            }
            return data;
        }
        options.options.names = _convert(options.options.names);
        options.options.values = _convert(options.options.values);

        self.html("");
        self.append($(_.template(tpl)({
            opt: options
        })));
        var conds = self.find(".conds");
        var conn = self.find(".conn");
        var andOr = self.find(".cop");
        var addBtn = self.find(".add button");

        if (options.data) {
            if (options.data.op == "or") {
                andOr.attr("op", "or");
                andOr.find("span").text("Or");
            }
            if (options.data.conditions) {
                options.data.conditions.forEach(function (cond) {
                    if (!options.options.names[cond.name]) {
                        options.options.names[cond.name] = cond.name;
                    }
                    cond.values.forEach(function (value) {
                        if (!options.options.values[value]) {
                            options.options.values[value] = value;
                        }
                    });
                    _add(cond);
                });
            }
        }

        function _condNumChange() {
            if (self.find(".cond").length > 1) {
                andOr.css("display", "flex");
                conn.show();
                addBtn.closest(".add").addClass("multi");
            } else {
                andOr.hide();
                conn.hide();
                addBtn.closest(".add").removeClass("multi");
            }
        }

        andOr.on("click", function () {
            if ($(this).attr("op") == "and") {
                $(this).attr("op", "or");
                $(this).find("span").text("Or");
            } else {
                $(this).attr("op", "and");
                $(this).find("span").text("And");
            }
        });

        function _onOpChange(valueSelector, op) {
            if (["in", "nin", "range"].indexOf(op) >= 0) {
                valueSelector.closest(".value").show();
                valueSelector.attr("required", true);
                if (!valueSelector.attr("multiple")) {
                    valueSelector.attr("multiple", true);
                    valueSelector.multiselect({
                        search: true,
                        allowCreate: true
                    });
                }
            } else if (["nil", "notnil"].indexOf(op) >= 0) {
                valueSelector.removeAttr("required");
                valueSelector.closest(".value").hide();
            } else {
                valueSelector.closest(".value").show();
                valueSelector.attr("required", true);
                if (valueSelector.attr("multiple")) {
                    valueSelector.removeAttr("multiple");
                    valueSelector.multiselect({
                        search: true,
                        allowCreate: true
                    });
                }
            }
        }

        function _add(data) {
            var cond = $(_.template(condTpl)({
                opt: options,
                cond: data
            }));

            $.each(cond.find(".name select"), function (i, item) {
                $(item).multiselect({
                    search: true,
                    allowCreate: options.allowCreate
                });
            });

            $.each(cond.find(".value select"), function (i, item) {
                $(item).multiselect({
                    search: true,
                    allowCreate: true
                });
            });

            cond.find(".remove").on("click", function () {
                $(this).closest(".cond").remove();
                _condNumChange();
            });

            cond.find(".multiselect input").on("focus", function () {
                self.find(".cond .select").prev(".selected").removeClass("changing");
            });

            cond.find(".multiselect .selected").on("click", function () {
                self.find(".cond .select").prev(".selected").removeClass("changing");
            });

            var selected = cond.find(".op .selected");
            var selector = cond.find(".op .select");
            $("body").on("click", function () {
                self.find(".selected").removeClass("changing");
            });
            selected.on("click", function (e) {
                e.stopPropagation();
                if ($(this).hasClass("changing")) {
                    $(this).removeClass("changing");
                } else {
                    self.find(".selected").removeClass("changing");
                    $(this).addClass("changing");
                }
                self.find(".multiselect .select").hide();
            });
            selector.on("click", function (e) {
                e.stopPropagation();
            });
            selector.find("li").on("click", function () {
                var value = $(this).attr("value");
                var text = options.ops[value].value;
                var selected = $(this).closest(".select").prev(".selected");
                selected.find("input").val(value);
                selected.find("span").text(text);
                selected.removeClass("changing");

                _onOpChange($(this).closest(".input").find(".value select"), value);
            });

            conds.append(cond);
            _condNumChange();
        }

        addBtn.on("click", function () {
            _add();
        });

        function _data() {
            return _conditions(self);
        }

        return {
            data: _data
        }
    }

    function _conditions(elem) {
        var data = {
            conditions: [],
            op: elem.find(".cop").attr("op")
        }
        $.each(elem.find(".cond"), function (i, cond) {
            if (!$(cond).find("select[name='_p_cond_name'] option:selected").attr("value")) {
                return;
            }
            var name = $(cond).find("select[name='_p_cond_name'] option:selected").attr("value").trim();
            var values = [];
            $.each($(cond).find("select[name='_p_cond_value'] option:selected"), function (i, item) {
                values.push($(item).attr("value").trim());
            });
            var op = $(cond).find("input[name='_p_cond_op']").val();

            if (name.length >= 0 && (["nil", "notnil"].indexOf(op) >= 0 || values.length > 0)) {
                data.conditions.push({
                    name: name,
                    values: values,
                    op: op
                });
            }
        });
        return data;
    }

    $.conditions = _conditions;
}));