(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap", "moment", "clipboard"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b, moment, Clipboard) {

    function Crontab() {
        function _fromToExpr(values) {
            return "(" + values + "\\-" + values + ")";
        }
        function _stepExpr(values) {
            if (values.indexOf("([0-") == 0) {
                values = "([1-" + values.split("([0-")[1];
            }
            return "(" + "\\*/" + values + ")";
        }
        function _listExpr(values) {
            return "(" + values + "((\\," + values + ")" + ")+)";
        }
        var exprTpl = `^(<%=values%>|<%=any%>|<%=fromTo%>|<%=step%>|<%=list%>)$`;
        var exprAlternativeTpl = `^(<%=values%>|<%=any%>|<%=fromTo%>|<%=list%>)$`;

        var partNames = ["minute", "hour", "day-of-month", "month", "day-of-week"];

        var validations = {
            "minute": {
                allowedValues: {
                    begin: 0,
                    end: 59,
                    text: "0-59",
                    valuesExpr: "([0-9]|[1-5][0-9])",
                    expr: ""
                },
            },
            "hour": {
                allowedValues: {
                    begin: 0,
                    end: 23,
                    text: "0-23",
                    valuesExpr: "([0-9]|1[0-9]|[2][0-3])",
                    expr: ""
                }
            },
            "day-of-month": {
                allowedValues: {
                    begin: 1,
                    end: 31,
                    text: "1-31",
                    valuesExpr: "([1-9]|[1-2][0-9]|[3][0-1])",
                    expr: ""
                }
            },
            "month": {
                allowedValues: {
                    begin: 1,
                    end: 12,
                    text: "1-12",
                    valuesExpr: "([1-9]|1[0-2])",
                    expr: ""
                },
                allowedValuesAlternative: {
                    begin: "Jan",
                    end: "Dec",
                    text: "JAN-DEC",
                    valuesExpr: "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)",
                    expr: ""
                }
            },
            "day-of-week": {
                allowedValues: {
                    begin: 0,
                    end: 6,
                    text: "0-6",
                    valuesExpr: "([0-6])",
                    expr: ""
                },
                allowedValuesAlternative: {
                    begin: "Sun",
                    end: "Sat",
                    text: "SUN-SAT",
                    valuesExpr: "(Sun|Mon|Tue|Wed|Thu|Fri|Sta)",
                    expr: ""
                }
            }
        };

        var a2v = {
            "jan": 1,
            "feb": 2,
            "mar": 3,
            "apr": 4,
            "may": 5,
            "jun": 6,
            "jul": 7,
            "aug": 8,
            "sep": 9,
            "oct": 10,
            "nov": 11,
            "dec": 12,
            "sun": 0,
            "mon": 1,
            "tue": 2,
            "wed": 3,
            "thu": 4,
            "fri": 5,
            "sta": 6
        };

        var any = "(\\*)";

        function _expr(av, tpl) {
            if (av) {
                var valuesExpr = av.valuesExpr;
                av.expr = _.template(tpl)({
                    values: valuesExpr,
                    any: any,
                    fromTo: _fromToExpr(valuesExpr),
                    step: _stepExpr(valuesExpr),
                    list: _listExpr(valuesExpr)
                });
            }
        }

        for (var key in validations) {
            var part = validations[key];
            _expr(part["allowedValues"], exprTpl);
            _expr(part["allowedValuesAlternative"], exprAlternativeTpl);
        }

        function _validate(cronExpr) {
            var parts = cronExpr.replace(new RegExp("\\s+", "gm"), " ").split(" ");
            if (parts.length != 5) {
                return false;
            }
            var valid = true;
            parts.forEach(function (part, i) {
                valid = valid && _validatePart(part, partNames[i]);
            });
            return valid;
        }

        function _validatePart(input, name) {
            var expr = validations[name]["allowedValues"].expr;
            if (validations[name]["allowedValuesAlternative"]) {
                expr += "|" + validations[name]["allowedValuesAlternative"].expr;
            }
            var regexp = new RegExp(expr, "i");
            return input.match(regexp);
        }

        function _nextRun(cronExpr, count) {
            if (!_validate(cronExpr)) {
                return [];
            }

            // candidate values for calculating next run
            function _values(input, begin, end, wd) {
                var count = end - begin + 1;
                var values = [];
                if (input == "*") {
                    if (!wd) {
                        for (var i = 0; i < count; i++) {
                            values.push(begin + i);
                        }
                    }
                } else if (input.indexOf("-") > 0) {
                    var parts = input.split("-");
                    var from = isNaN(parts[0]) ? a2v[parts[0].toLowerCase()] : parseInt(parts[0]);
                    var to = isNaN(parts[1]) ? a2v[parts[1].toLowerCase()] : parseInt(parts[1]);
                    if (wd) {
                        while (values.length < count + end + 1) {
                            for (var i = from; i <= to; i++) {
                                values.push(i);
                            }
                        }
                    } else {
                        for (var i = from; i <= to; i++) {
                            values.push(i);
                        }
                    }
                } else if (input.indexOf(",") > 0) {
                    if (wd) {
                        while (values.length < count + end + 1) {
                            input.split(",").forEach(function (iValue) {
                                var value = isNaN(iValue) ? a2v[iValue.toLowerCase()] : parseInt(iValue);
                                values.push(value);
                            });
                        }
                    } else {
                        input.split(",").forEach(function (iValue) {
                            var value = isNaN(iValue) ? a2v[iValue.toLowerCase()] : parseInt(iValue);
                            values.push(value);
                        });
                    }
                } else if (input.indexOf("*/") == 0) {
                    var step = parseInt(input.split("/")[1]);
                    var v = begin + step;
                    if (v > end) {
                        v = begin;
                    }
                    for (var i = 0; i < count + end + 1; i++) {
                        if (v > end) {
                            v = begin;
                        }
                        values.push(v);
                        v += step;
                    }
                } else {
                    var value = isNaN(input) ? a2v[input.toLowerCase()] : parseInt(input);
                    if (wd) {
                        while (values.length < count + end + 1) {
                            values.push(value);
                        }
                    } else {
                        values.push(value);
                    }
                }
                return values;
            }

            var now = new Date();
            var cronValues = {
                "minute": [],
                "hour": [],
                "day-of-month": [],
                "month": [],
                "day-of-week": [],
                "year": []
            };

            var values = cronExpr.split(" ");
            var date = values[2];
            var day = values[4];
            var month = values[3];
            var dayOnly = day != "*" && date == "*";
            var allMonth = month == "*";

            // candidate values
            partNames.forEach(function (name, i) {
                var input = values[i];
                var scope = validations[name]["allowedValues"];
                cronValues[name] = _values(input, scope.begin, scope.end, name == "day-of-week");
            });
            var year = now.getFullYear();
            for (var i = 0; i <= count; i++) {
                cronValues["year"].push(year + i);
            }

            var nexts1 = {};
            var nexts2 = {};
            var enough1;
            var enough2;
            cronValues["year"].forEach(function (year) {
                if (enough1 && enough2) {
                    return
                }
                cronValues["month"].forEach(function (month) {
                    if (enough1 && enough2) {
                        return
                    }
                    var start = new Date(now.getTime());
                    start.setFullYear(year);
                    start.setMonth(month - 1);

                    // after now, start from 1st day of month
                    if (month - 1 > now.getMonth() || year > now.getFullYear()) {
                        start.setDate(1);
                    }
                    // last Saturday (last day of last week), just for safe
                    start.setDate(start.getDate() - (start.getDay() - 6 + 7));

                    // day of week
                    cronValues["day-of-week"].forEach(function (day) {
                        var wDate = new Date(start.getTime());
                        var currentDay = wDate.getDay();

                        // get the distance between today and next week 'day'
                        var distance = (day + 7 - currentDay) % 7;
                        if (distance == 0) {
                            distance = 7;
                        }

                        // to next week 'day'
                        wDate.setDate(wDate.getDate() + distance);

                        cronValues["hour"].forEach(function (hour) {
                            if (enough1) {
                                return
                            }
                            cronValues["minute"].forEach(function (minute) {
                                var currentDate = new Date(wDate.getTime());
                                currentDate.setHours(hour);
                                currentDate.setMinutes(minute);
                                currentDate.setSeconds(0);
                                if (currentDate.getTime() > now.getTime() && (allMonth || currentDate.getMonth() == month - 1)) {
                                    nexts1[moment(currentDate).format("YYYY-MM-DD HH:mm:ss")] = "";
                                }
                                if (Object.keys(nexts1).length >= count) {
                                    enough1 = true;
                                    return;
                                }
                            });
                        });

                        start = new Date(wDate.getTime());
                    });

                    if (!dayOnly) {
                        // date
                        cronValues["day-of-month"].forEach(function (date) {
                            if (enough2) {
                                return
                            }
                            cronValues["hour"].forEach(function (hour) {
                                if (enough2) {
                                    return
                                }
                                cronValues["minute"].forEach(function (minute) {
                                    var currentDate = new Date(now.getTime());
                                    currentDate.setFullYear(year);
                                    currentDate.setMonth(month - 1);
                                    currentDate.setDate(date);
                                    currentDate.setHours(hour);
                                    currentDate.setMinutes(minute);
                                    currentDate.setSeconds(0);
                                    if (currentDate.getTime() > now.getTime()) {
                                        nexts2[moment(currentDate).format("YYYY-MM-DD HH:mm:ss")] = "";
                                    }
                                    if (Object.keys(nexts2).length >= count) {
                                        enough2 = true
                                        return;
                                    }
                                });
                            });
                        });
                    } else {
                        enough2 = true;
                    }
                });
            });

            for (var date in nexts2) {
                nexts1[date] = "";
            }
            var datetimes = Object.keys(nexts1);
            datetimes.sort(function (d1, d2) {
                return new Date(d1).getTime() - new Date(d2).getTime();
            });

            return datetimes.splice(0, count);
        }

        return {
            validate: _validate,
            validatePart: _validatePart,
            nextRun: _nextRun,
            validations: validations
        }
    }

    $.Crontab = Crontab;

    $.fn.crontab = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            lang: "en",
            nextRun: {
                disabled: false,
                max: 5
            }
        };
        options = $.extend(true, {}, defaultCfg, options);

        var lang = {
            en: {
                part: {
                    min: "Mniute",
                    hour: "Hour",
                    dayOfMonth: "Day(Month)",
                    month: "Month",
                    dayOfWeek: "Day(Week)"
                },
                nextRun: {
                    next: "next at",
                    more: "more"
                },
                tip: {
                    "anyValue": "any value",
                    "valueListSeparator": "value list separator",
                    "rangeOfValues": "range of values",
                    "stepValue": "step values",
                    "allowedValues": "allowed values",
                    "allowedValuesAlternative": "allowed values alternative"
                }
            },
            zh: {
                part: {
                    min: "分",
                    hour: "时",
                    dayOfMonth: "天(月)",
                    month: "月",
                    dayOfWeek: "天(周)"
                },
                nextRun: {
                    next: "下次执行时间：",
                    more: "更多"
                },
                tip: {
                    "anyValue": "任意值",
                    "valueListSeparator": "值列表",
                    "rangeOfValues": "范围",
                    "stepValue": "步长",
                    "allowedValues": "允许值",
                    "allowedValuesAlternative": "允许值替代方案"
                }
            }
        }

        var tpl = `
            <div class="crontab">
                <div class="op">
                    <div class="expression">
                        <div class="input<% if (size) { %> input-<%=size%><% } %>">
                            <input type="text" name="minute" autocomplete="off">
                            <input type="text" name="hour" autocomplete="off">
                            <input type="text" name="day-of-month" autocomplete="off">
                            <input type="text" name="month" autocomplete="off">
                            <input type="text" name="day-of-week" autocomplete="off">
                        </div>
                        <div class="part">
                            <label name="minute"><%=labels.part.min%></label>
                            <label name="hour"><%=labels.part.hour%></label>
                            <label name="day-of-month"><%=labels.part.dayOfMonth%></label>
                            <label name="month"><%=labels.part.month%></label>
                            <label name="day-of-week"><%=labels.part.dayOfWeek%></label>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="copy" copy-to-clipboard>
                        <i class="bi bi-stickies"></i>
                    </a>
                </div>
                <% if (!nextRun.disabled) { %>
                    <div class="next-run">
                        <label><%=labels.nextRun.next%></label>
                        <div class="list">
                            <div class="next">
                                <div></div>
                                <a href="javascript:void(0)" class="more"><%=labels.nextRun.more%></a>
                            </div>
                            <ul class="then">
                            </ul>
                        </div>
                    </div>
                <% } %>
            </div>
        `;

        var tooltipTpl = `
            <ul class="crontab-tip">
                <li>
                    <div class="value">*</div>
                    <div class="desc"><%=labels.tip.anyValue%></div>
                </li>
                <li>
                    <div class="value">,</div>
                    <div class="desc"><%=labels.tip.valueListSeparator%></div>
                </li>
                <li>
                    <div class="value">-</div>
                    <div class="desc"><%=labels.tip.rangeOfValues%></div>
                </li>
                <li>
                    <div class="value">/</div>
                    <div class="desc"><%=labels.tip.stepValue%></div>
                </li>
                <li>
                    <div class="value"><%=part.allowedValues.text%></div>
                    <div class="desc"><%=labels.tip.allowedValues%></div>
                </li>
                <% if (part.allowedValuesAlternative) { %>
                <li>
                    <div class="value"><%=part.allowedValuesAlternative.text%></div>
                    <div class="desc"><%=labels.tip.allowedValuesAlternative%></div>
                </li>
                <% } %>
            </ul>
        `;

        var crontab = new Crontab();

        var size = "";
        if (self.hasClass("form-control-sm")) {
            size = "sm";
        } else if (self.hasClass("form-control-lg")) {
            size = "lg";
        }

        var cron = $(_.template(tpl)({
            size: size,
            labels: lang[options.lang],
            nextRun: options.nextRun
        }));

        var defaultValue = self.val();

        var next = cron.find(".next-run .next div");
        var then = cron.find(".next-run .then");
        var more = cron.find(".next-run .more");

        self.hide();
        self.after(cron);

        if (!options.nextRun.disabled) {
            more.on("click", function () {
                if (then.find("li").length > 0) {
                    then.show();
                }
            });
        }

        new Clipboard("[copy-to-clipboard]", {
            container: cron.get(0),
            text: function (trigger) {
                return $(trigger).closest(".crontab").prev("input").val();
            }
        });

        for (var key in crontab.validations) {
            var part = crontab.validations[key];

            // tooltip
            var input = cron.find("input[name='" + key + "']");
            input.tooltip({
                placement: "top",
                title: _.template(tooltipTpl)({
                    labels: lang[options.lang],
                    part: part
                }),
                html: true,
                trigger: "focus"
            });

            var scopes = [[48, 57], [96, 105]];
            var codes = [8, 9, 13, 16, 37, 39, 46, 56, 188, 189, 191];

            function _validCode(scopes, codes, code) {
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

            function _validate(obj) {
                var name = obj.attr("name");
                var value = obj.val();
                var partLabel = cron.find(".part label[name='" + name + "']");
                if (crontab.validatePart(value, name)) {
                    partLabel.removeClass("text-danger").addClass("text-success");

                    if (value.indexOf(",") > 0) {
                        var m = {};
                        value.split(",").forEach(function (v) {
                            m[v] = "";
                        });
                        var values = Object.keys(m);
                        values.sort(function (v1, v2) {
                            if (isNaN(v1)) {
                                return a2v[v1.toLowerCase()] - a2v[v2.toLowerCase()];
                            } else {
                                return v1 - v2;
                            }
                        });
                        obj.val(values.join(","));
                    } else if (value.indexOf("-") > 0) {
                        var parts = value.split("-");
                        var from = isNaN(parts[0]) ? a2v[parts[0].toLowerCase()] : parseInt(parts[0]);
                        var to = isNaN(parts[1]) ? a2v[parts[1].toLowerCase()] : parseInt(parts[1]);
                        if (from > to) {
                            obj.val(parts[1] + "-" + parts[0]);
                        } else if (from == to) {
                            obj.val(parts[0]);
                        }
                    }

                    obj.removeClass("text-danger");

                    if (cron.find(".part label.text-danger").length == 0) {
                        cron.find(".input").removeClass("is-invalid");
                        var inputs = [];
                        $.each(cron.find("input"), function (i, value) {
                            inputs.push($(value).val());
                        });
                        self.val(inputs.join(" ")).change();

                        return true
                    }
                } else {
                    obj.addClass("text-danger");
                    cron.find(".input").addClass("is-invalid");
                    partLabel.removeClass("text-success").addClass("text-danger");
                    self.val("").change();
                    next.html("");
                    then.html("");
                    then.hide();
                    more.hide();
                }

                return false;
            }

            input.on("keydown", function (event) {
                var name = $(this).attr("name");
                if (crontab.validations[name]["allowedValuesAlternative"]) {
                    if (!_validCode(scopes.concat([[65, 90]]), codes, event.keyCode)) {
                        event.preventDefault();
                    }
                } else {
                    if (!_validCode(scopes, codes, event.keyCode)) {
                        event.preventDefault();
                    }
                }
            });

            input.on("change", function () {
                if (_validate($(this))) {
                    if (!options.nextRun.disabled && crontab.validate(self.val())) {
                        var datetimes = crontab.nextRun(self.val(), options.nextRun.max);
                        then.html("");
                        more.show();
                        datetimes.forEach(function (datetime, i) {
                            if (i >= options.nextRun.max) {
                                return;
                            }
                            if (i == 0) {
                                next.text(datetime);
                            } else {
                                var li = $("<li></li>");
                                li.text(datetime);
                                then.append(li);
                            }
                        });
                    }
                }
            });

            if (defaultValue) {
                var parts = defaultValue.split(" ");
                $.each(cron.find("input"), function (i, value) {
                    if (i == parts.length - 1) {
                        $(value).val(parts[i]).change();
                    } else {
                        $(value).val(parts[i]);
                        _validate($(value));
                    }
                });
            }
        }
    }
}));