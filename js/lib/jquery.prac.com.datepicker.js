(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap", "moment"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b, moment) {

    $.fn.datepicker = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var today = new Date();
        var defaultCfg = {
            type: "date", // date, month, year
            class: "danger",
            range: false,
            multiple: false,
            btns: {
                back: {
                    label: "Back"
                },
                clear: {
                    label: "Clear",
                    onClear: function () { }
                },
                confirm: {
                    label: "Confirm",
                    onConfirm: function () { }
                },
            },
            week: {
                days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                firstDay: 0 // 0: Sun, 1: Mon
            },
            month: {
                months: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                format: "MM",
            },
            year: {
                format: "YYYY"
            },
            scope: [
                new Date(1970, 0, 1),
                new Date(today.getFullYear() + 50, 11, 31)
            ]
        };
        options = $.extend(true, {}, defaultCfg, options);

        var tpl = `
            <div class="datepicker" style="position: absolute;" id="<%=id%>">
                <div class="header">
                    <div class="year-month">
                        <div class="prev">
                            <i class="bi bi-chevron-double-left"></i>
                            <i class="bi bi-chevron-left"></i>
                        </div>
                        <div class="select">
                        </div>
                        <div class="next">
                            <i class="bi bi-chevron-right"></i>
                            <i class="bi bi-chevron-double-right"></i>
                        </div>
                    </div>
                    <% if (cfg.type == "date") { %>
                    <ul class="days">
                        <%_.each(days, function(day) {%>
                            <li><%=day%></li>
                        <% }); %>
                    </ul>
                    <% } %>
                </div>
                <div class="body">
                </div>
                <div class="footer">
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-<%=cfg.class%>" back><%=cfg.btns.back.label%></button>
                        <button type="button" class="btn btn-<%=cfg.class%>" clear><%=cfg.btns.clear.label%></button>
                        <button type="button" class="btn btn-<%=cfg.class%>" confirm><%=cfg.btns.confirm.label%></button>
                    </div>
                </div>
            </div>
        `;
        var from = typeof options.scope[0] == "object" ? options.scope[0] : new Date(options.scope[0]);
        var to = typeof options.scope[1] == "object" ? options.scope[1] : new Date(options.scope[1]);
        var format = options.format;
        self.attr("readonly", true);
        self.css("background-color", "#fff");

        var dp;
        self.on("click", function () {
            if ($(this).next(".datepicker[id]").length == 0) {
                dp = _datepicker();
            }
            $.each($(".datepicker[id]"), function (i, value) {
                if ($(value).attr("id") != dp.id()) {
                    $(value).remove();
                }
            });
        });
        $("body").on("click", function () {
            if (dp) {
                dp.close();
            }
        });
        self.on("click", function (e) {
            e.stopPropagation();
        });

        function _datepicker() {
            // current
            var current = new Date();
            var paging = current;

            // Days
            var days = [];
            var firstDay = options.week.firstDay;
            if (options.type == "date") {
                days = options.week.days;
                if (firstDay > 0) {
                    var part1 = days.slice(0, firstDay);
                    var part2 = days.slice(firstDay);
                    days = part2.concat(part1);
                }
            }

            // Init
            var id = "dp" + new Date().getTime();
            var datepicker = $(_.template(tpl)({
                id: id,
                cfg: options,
                days: days
            }));
            self.after(datepicker);
            datepicker.on("click", function (e) {
                e.stopPropagation();
            });
            var body = datepicker.find(".body");
            var headerDays = datepicker.find(".days");
            var selector = datepicker.find(".select");
            var dprev = datepicker.find("i.bi-chevron-double-left");
            var prev = datepicker.find("i.bi-chevron-left");
            var dnext = datepicker.find("i.bi-chevron-double-right");
            var next = datepicker.find("i.bi-chevron-right");
            var back = datepicker.find("button[back]");
            var clear = datepicker.find("button[clear]");
            var confirm = datepicker.find("button[confirm]");
            var yearSelect = $(_.template(`<span value="<%=value%>"><%=year%></span>`)({
                value: current.getFullYear(),
                year: moment(current).format(options.year.format)
            }));
            var monthSelect = $(_.template(`<span value="<%=value%>"><%=month%></span>`)({
                value: current.getMonth(),
                month: moment(current).format(options.month.format)
            }));

            var types = {
                values: ["month", "year", "years"],
                month: _month,
                year: _year,
                years: _years
            }

            function _type() {
                return body.find("ul").attr("class");
            }

            // Select date, month, year
            var begin;
            var end;
            var values = [];
            function _select(obj, beginOrEnd) {
                obj.addClass("selected").addClass("bg-" + options.class);
                if (beginOrEnd) {
                    obj.addClass(beginOrEnd);
                }
                if (!options.range && !options.multiple) {
                    paging = current;
                }
            }

            function _between(ctx) {
                var color = confirm.css("background-color");
                var bgColor = color.replace(")", ", 0.2)");
                $.each(ctx.find("li"), function (i, item) {
                    var value = $(item).attr("value");
                    if (value) {
                        if (value > begin && value < end) {
                            $(item).css("color", color).css("background-color", bgColor)
                        }
                    }
                });
            }

            function _surround(dates) {
                $.each(dates, function (i, item) {
                    if (i > 0) {
                        if (dates.eq(i - 1).hasClass("selected")) {
                            $(item).addClass("right");
                        } else {
                            $(item).removeClass("right");
                        }
                    }
                    if (i < dates.length - 1) {
                        if (dates.eq(i + 1).hasClass("selected")) {
                            $(item).addClass("left");
                        } else {
                            $(item).removeClass("left");
                        }
                    }
                });
            }

            // Page month, year
            function _page(y, m) {
                paging = new Date(paging.getFullYear() + y, paging.getMonth() + m, paging.getDate());
                types[_type()](paging.getFullYear(), paging.getMonth());
                _changeSelector(paging);
            }

            // Back to prev level
            function _back() {
                var index = types.values.indexOf(_type());
                if (index > 0) {
                    types[types.values[--index]](current.getFullYear(), current.getMonth());
                    _changeSelector(current);
                }
            }

            function _changeSelector(date) {
                if (_type() != "years") {
                    yearSelect.text(moment(date).format(options.year.format));
                    yearSelect.attr("value", date.getFullYear());
                    monthSelect.text(moment(date).format(options.month.format));
                    monthSelect.attr("value", date.getMonth());
                }
            }

            dprev.on("click", function () {
                if (_type() == "years") {
                    _page(-15, 0);
                } else {
                    _page(-1, 0);
                }
            });
            dnext.on("click", function () {
                if (_type() == "years") {
                    _page(15, 0);
                } else {
                    _page(1, 0);
                }
            });
            prev.on("click", function () {
                _page(0, -1);
            });
            next.on("click", function () {
                _page(0, 1);
            });

            yearSelect.on("click", function () {
                _years(paging.getFullYear());
            });
            monthSelect.on("click", function () {
                _year(paging.getFullYear());
            });

            back.on("click", function () {
                paging = current;
                _back();
            });
            clear.on("click", function () {
                self.val("");
                values = [];
                datepicker.find("ul li").removeClass();
                datepicker.find("ul li").removeAttr("style");
                options.btns.clear.onClear();
                _close();
            });
            confirm.on("click", function () {
                var valFmt;
                if (options.type == "date") {
                    valFmt = "YYYYMMDD";
                } else if (options.type == "month") {
                    valFmt = "YYYYMM";
                } else if (options.type == "year") {
                    valFmt = "YYYY";
                }
                if (options.range) {
                    if (!begin || !end) {
                        return;
                    }
                    var d1;
                    var d2;
                    d1 = moment(begin, valFmt).toDate();
                    d2 = moment(end, valFmt).toDate();
                    options.btns.confirm.onConfirm([d1, d2]);
                    self.val(moment(d1).format(format) + " - " + moment(d2).format(format));
                } else if (options.multiple) {
                    var dates = [];
                    var data = [];
                    values = values.sort();
                    values.forEach(function (value) {
                        var date = moment(value, valFmt).toDate();
                        dates.push(date);
                        data.push(moment(date).format(format));
                    });
                    options.btns.confirm.onConfirm(dates);
                    self.val(data.join(","));
                } else {
                    options.btns.confirm.onConfirm(current);
                    self.val(moment(current).format(format));
                }
                _close();
            });

            // Dates of month
            function _month(year, month) {
                body.html("");

                var first = new Date(year, month, 1);
                var last = new Date(year, month + 1, 0);
                var firstIndex = first.getDay() - firstDay;
                var tpl = `
                    <ul class="month">
                        <% for (var i = 1;i <= lastDate;i ++) { 
                            var date = new Date(year, month, i);
                            var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                            var selected = false;
                            if (!cfg.range && !cfg.multiple && current.getTime() == date.getTime()) {
                                selected = true;
                            }

                            var clazz = "";
                            if (disabled) {
                                clazz = "disabled";
                            } else if (selected) {
                                clazz = "selected bg-" + cfg.class;
                            }
                        %>
                            <li value="<%=moment(date).format('YYYYMMDD')%>"<% if (clazz) { %> class="<%=clazz%>"<% } %>><%=i%></li>
                        <% } %>
                        <div class="bg"><%=month + 1%></div>
                    </ul>
                `;
                var m = $(_.template(tpl)({
                    current: new Date(current.getFullYear(), current.getMonth(), current.getDate()),
                    from: from,
                    to: to,
                    year: year,
                    month: month,
                    moment: moment,
                    lastDate: last.getDate(),
                    cfg: options
                }));
                for (var i = 1; i <= firstIndex; i++) {
                    var item = $("<li></li>");
                    m.prepend(item);
                }
                body.append(m);

                monthSelect.show();
                headerDays.show();
                prev.show();
                next.show();

                var dates = m.find("li[value]:not(.disabled)");

                if (options.range) {
                    _select(m.find("li[value='" + begin + "']"), "begin");
                    _select(m.find("li[value='" + end + "']"), "end");
                    _between(m);
                } else if (options.multiple) {
                    values.forEach(function (value) {
                        $.each(dates, function (i, item) {
                            if ($(item).attr("value") == value) {
                                _select($(item));
                            }
                        });
                    });
                    _surround(dates);
                }

                dates.on("click", function () {
                    var selected = new Date(
                        parseInt(yearSelect.attr("value")),
                        parseInt(monthSelect.attr("value")),
                        moment($(this).attr("value"), "YYYYMMDD").toDate().getDate()
                    );
                    if (options.range) {
                        if ((!begin && !end) || (begin && end) || $(this).attr("value") <= begin) {
                            dates.removeClass();
                            dates.removeAttr("style");
                            begin = moment(selected).format("YYYYMMDD");
                            end = null;
                            _select($(this), "begin");
                        } else {
                            end = moment(selected).format("YYYYMMDD");
                            _select($(this), "end");
                            _between(m);
                        }
                    } else {
                        if (options.multiple) {
                            var value = moment(selected).format("YYYYMMDD");
                            if ($(this).hasClass("selected")) {
                                $(this).removeClass();
                                values.splice(values.indexOf(value), 1);
                            } else {
                                values.push(value);
                                _select($(this));
                            }
                            _surround(dates);
                        } else {
                            dates.removeClass();
                            current = selected;
                            _select($(this));
                        }
                    }
                });
            }

            // Months of year
            function _year(year) {
                body.html("");
                var tpl = `
                    <ul class="year">
                        <%_.each(cfg.month.months, function(month, i) { 
                            var date = new Date(year, i, 1);
                            var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                            var selected = false;
                            if (!cfg.range && !cfg.multiple && current.getTime() == date.getTime()) {
                                selected = true;
                            }
                            var clazz = "";
                            if (disabled) {
                                clazz = "disabled";
                            } else if (selected) {
                                clazz = "selected bg-" + cfg.class;
                            }
                        %>
                            <li value="<%=moment(date).format('YYYYMM')%>"<% if (clazz) { %> class="<%=clazz%>"<% } %>><%=month%></li>
                        <% }); %>
                    </ul>
                `;
                var y = $(_.template(tpl)({
                    current: new Date(current.getFullYear(), current.getMonth(), 1),
                    from: new Date(from.getFullYear(), from.getMonth(), 1),
                    to: new Date(to.getFullYear(), to.getMonth(), 1),
                    year: year,
                    cfg: options,
                    moment: moment
                }));
                body.append(y);
                monthSelect.hide();
                headerDays.hide();
                prev.hide();
                next.hide();

                var months = y.find("li[value]:not(.disabled)");

                if (options.type == "month") {
                    if (options.range) {
                        _select(y.find("li[value='" + begin + "']"), "begin");
                        _select(y.find("li[value='" + end + "']"), "end");
                        _between(y);
                    } else if (options.multiple) {
                        values.forEach(function (value) {
                            $.each(months, function (i, item) {
                                if ($(item).attr("value") == value) {
                                    _select($(item));
                                }
                            });
                        });
                        _surround(months);
                    }
                }

                months.on("click", function () {
                    var selected = new Date(
                        parseInt(yearSelect.attr("value")),
                        moment($(this).attr("value"), "YYYYMM").toDate().getMonth(),
                        1
                    );

                    if (options.type == "month") {
                        if (options.range) {
                            if ((!begin && !end) || (begin && end) || $(this).attr("value") <= begin) {
                                months.removeClass();
                                months.removeAttr("style");
                                begin = moment(selected).format("YYYYMM");
                                end = null;
                                _select($(this), "begin");
                            } else {
                                end = moment(selected).format("YYYYMM");
                                _select($(this), "end");
                                _between(y);
                            }
                        } else if (options.multiple) {
                            var value = moment(selected).format("YYYYMM");
                            if ($(this).hasClass("selected")) {
                                $(this).removeClass();
                                values.splice(values.indexOf(value), 1);
                            } else {
                                values.push(value);
                                _select($(this));
                            }
                            _surround(months);
                        } else {
                            months.removeClass();
                            current = selected;
                            _select($(this));
                            _back();
                        }
                    } else {
                        months.removeClass();
                        current = selected;
                        _select($(this));
                        _back();
                    }
                });
            }

            // Years
            function _years(year) {
                body.html("");
                var tpl = `
                    <ul class="years">
                        <% for (var i = begin;i <= end;i ++) {
                            var date = new Date(i, 0, 1);
                            var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                            var selected = false;
                            if (!cfg.range && !cfg.multiple && current.getTime() == date.getTime()) {
                                selected = true;
                            }
                            var clazz = "";
                            if (disabled) {
                                clazz = "disabled";
                            } else if (selected) {
                                clazz = "selected bg-" + cfg.class;
                            }
                        %>
                            <li value="<%=moment(date).format('YYYY')%>"<% if (clazz) { %> class="<%=clazz%>"<% } %>><%=moment(date).format(cfg.year.format)%></li>
                        <% } %>
                    </ul>
                `;
                var yBegin = year - 7;
                var yEnd = year + 7;
                var ys = $(_.template(tpl)({
                    current: new Date(current.getFullYear(), 0, 1),
                    from: new Date(from.getFullYear(), 0, 1),
                    to: new Date(to.getFullYear(), 0, 1),
                    begin: yBegin,
                    end: yEnd,
                    cfg: options,
                    moment: moment
                }));
                body.append(ys);
                yearSelect.text(yBegin + " - " + yEnd);
                monthSelect.hide();
                headerDays.hide();
                prev.hide();
                next.hide();

                var years = ys.find("li[value]:not(.disabled)");

                if (options.type == "year") {
                    if (options.range) {
                        _select(ys.find("li[value='" + begin + "']"), "begin");
                        _select(ys.find("li[value='" + end + "']"), "end");
                        _between(ys);
                    } else if (options.multiple) {
                        values.forEach(function (value) {
                            $.each(years, function (i, item) {
                                if ($(item).attr("value") == value) {
                                    _select($(item));
                                }
                            });
                        });
                        _surround(years);
                    }
                }

                years.on("click", function () {
                    var selected = new Date(
                        moment($(this).attr("value"), "YYYY").toDate().getFullYear(),
                        0,
                        1
                    );

                    if (options.type == "year") {
                        if (options.range) {
                            if ((!begin && !end) || (begin && end) || $(this).attr("value") <= begin) {
                                years.removeClass();
                                years.removeAttr("style");
                                begin = moment(selected).format("YYYY");
                                end = null;
                                _select($(this), "begin");
                            } else {
                                end = moment(selected).format("YYYY");
                                _select($(this), "end");
                                _between(ys);
                            }
                        } else if (options.multiple) {
                            var value = moment(selected).format("YYYY");
                            if ($(this).hasClass("selected")) {
                                $(this).removeClass();
                                values.splice(values.indexOf(value), 1);
                            } else {
                                values.push(value);
                                _select($(this));
                            }
                            _surround(years);
                        } else {
                            years.removeClass();
                            current = selected;
                            _select($(this));
                            _back();
                        }
                    } else {
                        years.removeClass();
                        current = selected;
                        _select($(this));
                        _back();
                    }
                });
            }

            function _init(valFmt) {
                if (self.val().length > 0) {
                    if (options.range) {
                        var pair = self.val().split(" - ");
                        begin = _format(pair[0]);
                        end = _format(pair[1]);
                        current = moment(pair[0], format).toDate();
                    } else if (options.multiple) {
                        var data = self.val().split(",");
                        values = [];
                        data.forEach(function (v) {
                            values.push(_format(v));
                        });
                        current = moment(data[0], format).toDate();
                    } else {
                        current = moment(self.val(), format).toDate();
                    }
                    paging = current;
                }
                _changeSelector(paging);

                function _format(value) {
                    return moment(moment(value, format).toDate()).format(valFmt);
                }
            }

            if (options.type == "date") {
                if (!format) {
                    format = "YYYY-MM-DD"
                }
                _init("YYYYMMDD");
                selector.append(yearSelect).append(monthSelect);
                _month(current.getFullYear(), current.getMonth());
            } else if (options.type == "month") {
                if (!format) {
                    format = "YYYY-MM"
                }
                types.values = ["year", "years"];
                _init("YYYYMM");
                selector.append(yearSelect);
                _year(current.getFullYear());
            } else if (options.type == "year") {
                if (!format) {
                    format = "YYYY"
                }
                types.values = ["years"];
                _init("YYYY");
                selector.append(yearSelect);
                _years(current.getFullYear());
            }

            function _close() {
                datepicker.remove();
            }

            return {
                id: function () {
                    return id;
                },
                close: function () {
                    _close();
                }
            }
        }
    }
}));