(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap", "moment", "async", "common"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b, moment, async) {
    $.fn.picker = function (datas, options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            columns: 1,
            height: "260px",
            title: "Please select",
            toolbar: true,
            cancel: {
                label: "Cancel",
                class: "secondary"
            },
            confirm: {
                label: "Confirm",
                class: "primary"
            }
        };
        options = $.extend(true, {}, defaultCfg, options);
        if (options.columns == 1) { // single column
            return new Picker(self, datas, options);
        } else { // multiple column
            var tpl = `
                <div class="p-pickers">
                    <div class="toolbar">
                        <a href="javascript:void(0)" class="text-<%=cfg.cancel.class%>" cancel><%=cfg.cancel.label%></a>
                        <label class="title"><%=cfg.title%></label>
                        <a href="javascript:void(0)" class="text-<%=cfg.confirm.class%>" confirm><%=cfg.confirm.label%></a>
                    </div>
                    <div class="columns"></div>
                </div>
            `;
            var columns = $(_.template(tpl)({
                cfg: options
            }));
            self.append(columns);

            var pickers = [];

            // Cascade
            if (options.cascade) {
                datas.forEach(function (data, i) {
                    var column = $(`<div class="column"></div>`);
                    columns.find(".columns").append(column);
                    var opt = $.extend(true, {}, options, {
                        toolbar: false,
                        onChange: function (value) {
                            // Cascaded select
                            if (i + 1 < datas.length) {
                                pickers[i + 1].setData(_data(datas[i + 1][value]));
                            }
                        }
                    });
                    if (i == 0) {
                        pickers.push(new Picker(column, _data(data), opt));
                    } else {
                        pickers.push(new Picker(column, _data(data[pickers[i - 1].value()]), opt));
                    }
                });

                // Convert map to array
                function _data(map) {
                    var data = [];
                    for (var key in map) {
                        data.push({
                            value: key,
                            text: map[key]
                        });
                    }
                    return data;
                }
            } else {
                datas.forEach(function (data, i) {
                    var column = $(`<div class="column"></div>`);
                    columns.find(".columns").append(column);
                    var opt = $.extend(true, {}, options, {
                        column: i,
                        toolbar: false
                    });
                    pickers.push(new Picker(column, data, opt));
                });
            }

            // Toolbar
            var toolbar = columns.find(".toolbar");
            toolbar.find("[cancel]").on("click", function () {
                if (options.cancel.onCancel) {
                    options.cancel.onCancel();
                }
            });
            toolbar.find("[confirm]").on("click", function () {
                if (options.confirm.onConfirm) {
                    var selecteds = [];
                    pickers.forEach(function (picker, i) {
                        selecteds[i] = picker.value();
                    });
                    options.confirm.onConfirm(selecteds);
                }
            });

            function _select() {
                for (var i = 0; i < arguments.length; i++) {
                    var value = arguments[i];
                    pickers[i].select(value);
                }
            }

            return {
                select: _select,
                pickers: function () {
                    return pickers
                }
            }
        }

        function Picker(ctx, data, options) {
            var tpl = `
                <div class="p-picker">
                    <% if (cfg.toolbar) { %>
                        <div class="toolbar">
                            <a href="javascript:void(0)" class="text-secondary" cancel><%=cfg.cancel.label%></a>
                            <label class="title"><%=cfg.title%></label>
                            <a href="javascript:void(0)" class="text-primary" confirm><%=cfg.confirm.label%></a>
                        </div>
                    <% } %>
                    <div class="wrapper" style="height: <%=cfg.height%>">
                        <ul class="items">
                            <%_.each(items, function(item) {%>
                                <li value="<%=item.value%>"><%=item.text%></li>
                            <% }); %>
                        </ul>
                        <div class="mask">
                        </div>
                        <div class="selected-frame">
                            <div></div>
                        </div>
                    </div>
                </div>
            `;

            // data
            var records;
            _convert(data);
            function _convert(data) {
                records = [];
                if (!$.isArray(data)) {
                    for (var key in data) {
                        records.push({
                            value: key,
                            text: data[key]
                        });
                    }
                } else {
                    data.forEach(function (item) {
                        if (typeof item == "string" || typeof item == "number") {
                            records.push({
                                value: item,
                                text: item
                            });
                        } else {
                            records.push(item);
                        }
                    });
                }
            }

            // Render
            var picker = $(_.template(tpl)({
                cfg: options,
                items: records
            }));
            ctx.html("");
            ctx.append(picker);

            // init
            var wrapper = picker.find(".wrapper");
            var items = wrapper.find(".items");
            var mask = wrapper.find(".mask");
            var itemHeight = wrapper.find(".selected-frame").outerHeight();
            var originPos = (wrapper.height() - itemHeight) / 2;
            mask.css("background-size", "100% " + originPos + "px");

            // variables for scroll
            var position;                                               // Origin or stopped position after scroll
            var top;                                                    // scroll top position
            var bottom = originPos;                                     // scroll bottom position
            var beginY                                                  // The begin Y of scroll
            var endY;                                                   // The end Y of scroll
            var scrolling = false;                                      // If is on scrolling

            // set position
            _refresh();
            function _refresh() {
                top = originPos - (records.length - 1) * itemHeight;
                position = originPos;
                items.css("transform", "translateY(" + originPos + "px)");
                items.css("transition", "none");
            }

            wrapper.bindDragMove(function (e, pos) {
                e.preventDefault();
                scrolling = true;
                beginY = pos.y;
            }, function (e, pos, speed) {
                _onScroll(pos.y - beginY);
            }, function (e, pos, speed) {
                endY = pos.y;
                if (speed.y > 0.8) {
                    _fastScroll(speed.y);
                } else {
                    _onStopScroll();
                }
                scrolling = false;
            });

            wrapper.bindMouseWheel(function (e, delta) {
                _onMouseWheel(delta)
            });

            function _onMouseWheel(delta) {
                var c = delta / 120;
                var distance = c * itemHeight;
                var stoppedPos = position + distance;
                if (stoppedPos <= top) {
                    stoppedPos = top;
                } else if (stoppedPos >= bottom) {
                    stoppedPos = bottom;
                }
                items.css("transform", "translateY(" + stoppedPos + "px)");
                items.css("transition", "all 0.2s");
                position = stoppedPos;
                _onSelect();
            }

            function _fastScroll(speedY) {
                if (!scrolling) {
                    return
                }
                var factor = 4;
                var c = Math.round(speedY * factor);
                var distance = endY < beginY ? -c * itemHeight : c * itemHeight;
                var stoppedPos = position + distance;
                if (stoppedPos <= top) {
                    stoppedPos = top;
                } else if (stoppedPos >= bottom) {
                    stoppedPos = bottom;
                }
                items.css("transform", "translateY(" + stoppedPos + "px)");
                items.css("transition", "all 0.4s ease-out");
                position = stoppedPos;
                _onSelect();
            }

            function _onScroll(distance) {
                if (!scrolling) {
                    return
                }
                var pos = position + distance;
                if (pos >= originPos - records.length * itemHeight && pos <= originPos + itemHeight) {
                    items.css("transform", "translateY(" + pos + "px)");
                    items.css("transition", "none");
                }
            }

            function _onStopScroll() {
                // Get stopped posistion
                var transform = items.css("transform");
                if (!transform || transform.indexOf(",") <= 0) {
                    return;
                }
                var stoppedPos = Number(transform.split(",")[5].split(")")[0]);

                // Fixed the stopped posistion
                var top = originPos - (records.length - 1) * itemHeight;
                var bottom = originPos;
                if (stoppedPos <= top) {
                    stoppedPos = top;
                } else if (stoppedPos >= bottom) {
                    stoppedPos = bottom;
                } else {
                    for (var i = 0; i < records.length; i++) {
                        var prevPos = originPos - i * itemHeight;
                        if (i + 1 < records.length) {
                            var nextPos = originPos - (i + 1) * itemHeight;
                            if (stoppedPos >= nextPos && stoppedPos <= prevPos) {
                                if (stoppedPos - nextPos > prevPos - stoppedPos) {
                                    stoppedPos = prevPos;
                                } else {
                                    stoppedPos = nextPos;
                                }
                            }
                        }
                    }
                }

                items.css("transform", "translateY(" + stoppedPos + "px)");
                items.css("transition", "all 0.2s ease-out");

                // Next time from this position start
                position = stoppedPos;
                _onSelect();
            }

            var selected = records.length > 0 ? records[0].value : "";
            function _onSelect() {
                var c = Math.round((originPos - position) / itemHeight);
                items.find("li").removeAttr("selected");
                var selectedItem = items.find("li").eq(c);
                selectedItem.attr("selected", "true");
                var value = selectedItem.attr("value");
                if (options.onChange && selected != value) {
                    options.onChange(value, options.column);
                }
                selected = value;
            }

            var toolbar = picker.find(".toolbar");
            toolbar.find("[cancel]").on("click", function (e) {
                if (options.cancel.onCancel) {
                    options.cancel.onCancel();
                }
            });
            toolbar.find("[confirm]").on("click", function (e) {
                if (options.confirm.onConfirm) {
                    options.confirm.onConfirm(selected);
                }
            });

            function _select(value) {
                var index = 0;
                records.forEach(function (record, i) {
                    if (record.value == value) {
                        index = i;
                        return;
                    }
                });
                position = originPos - index * itemHeight;
                items.css("transform", "translateY(" + position + "px)");
                items.css("transition", "all 0.2s linear");
                _onSelect();
            }

            function _setData(data) {
                _convert(data);

                var tpl = `
                    <%_.each(items, function(item) {%>
                        <li value="<%=item.value%>"><%=item.text%></li>
                    <% }); %>
                `;
                items.html("");
                items.append(_.template(tpl)({
                    items: records
                }));

                _refresh();
                _onSelect();
            }

            return {
                select: _select,
                setData: _setData,
                value: function () {
                    return selected;
                }
            }
        }
    }

    $.fn.datePicker = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var today = new Date();
        var defaultCfg = {
            type: "ymd",  // ymd, ym, md
            year: {
                scope: [today.getFullYear(), today.getFullYear() + 4],
                formatter: undefined
            },
            month: {
                formatter: undefined
            },
            date: {
                formatter: undefined
            }
        };
        options = $.extend(true, {}, defaultCfg, options);

        var from = options.year.scope[0];
        var to = options.year.scope[1];
        var columns;
        var data;
        var selecteds = [];
        var fullDates = [];
        if (options.type == "ymd") {
            columns = 3;
            data = [_years(), _months(), _dates()];
        } else if (options.type == "ym") {
            columns = 2;
            data = [_years(), _months()];
        } else if (options.type == "md") {
            columns = 2;
            data = [_months(), _dates()];
        }

        function _years() {
            var years = [];
            for (var i = from; i <= to; i++) {
                var year = String(i);
                if (options.year.formatter) {
                    years.push({
                        value: year,
                        text: options.year.formatter(year)
                    });
                } else {
                    years.push(year);
                }
                if (i == from) {
                    selecteds.push(year);
                }
            }
            return years;
        }

        function _months() {
            var months = [];
            for (var i = 1; i <= 12; i++) {
                var month = _format(i);
                if (options.month.formatter) {
                    months.push({
                        value: month,
                        text: options.month.formatter(month)
                    });
                } else {
                    months.push(month);
                }
                if (i == i) {
                    selecteds.push(month);
                }
            }
            return months;
        }

        function _dates() {
            var dates = [];
            for (var i = 1; i <= 31; i++) {
                var date = _format(i);
                if (options.date.formatter) {
                    dates.push({
                        value: date,
                        text: options.date.formatter(date)
                    });
                } else {
                    dates.push(date);
                }
                if (i == i) {
                    selecteds.push(date);
                }
                fullDates.push(date);
            }
            return dates;
        }

        function _format(i) {
            return i < 10 ? "0" + i : String(i)
        }

        var cfg = $.extend(true, {}, options, {
            columns: columns,
            onChange: _onChange,
            confirm: {
                onConfirm: _onConfirm
            }
        });
        var picker = self.picker(data, cfg);
        var subPickers = picker.pickers();
        if (options.type == "ymd") {
            subPickers[0].select(_format(today.getFullYear()));
            subPickers[1].select(_format(today.getMonth() + 1));
            subPickers[2].select(_format(today.getDate()));
        } else if (options.type == "ym") {
            subPickers[0].select(_format(today.getFullYear()));
            subPickers[1].select(_format(today.getMonth() + 1));
        } else if (options.type == "md") {
            subPickers[0].select(_format(today.getMonth() + 1));
            subPickers[1].select(_format(today.getDate()));
        }

        var lastSelectedDate = fullDates[0]
        function _onChange(value, column) {
            if (options.type == "ymd") {
                lastSelectedDate = selecteds[2];
                selecteds[column] = value;
                if ((column == 0 && selecteds[1] == "02") || column == 1) {
                    var lastDate = String(new Date(parseInt(selecteds[0]), parseInt(selecteds[1]), 0).getDate());
                    var newDates = _newDates(fullDates.slice(0, fullDates.indexOf(lastDate) + 1));
                    subPickers[2].setData(newDates);
                    subPickers[2].select(lastSelectedDate > lastDate ? lastDate : lastSelectedDate);
                }
            } else if (options.type == "md") {
                lastSelectedDate = selecteds[1];
                selecteds[column] = value;
                if (column == 0) {
                    var lastDate = String(new Date(2024, parseInt(selecteds[0]), 0).getDate());
                    var newDates = _newDates(fullDates.slice(0, fullDates.indexOf(lastDate) + 1));
                    subPickers[1].setData(newDates);
                    subPickers[1].select(lastSelectedDate > lastDate ? lastDate : lastSelectedDate);
                }
            }
        }

        function _newDates(dates) {
            var r = [];
            if (options.date.formatter) {
                dates.forEach(function (date) {
                    r.push({
                        value: date,
                        text: options.date.formatter(date)
                    });
                });
            } else {
                r = dates;
            }
            return r;
        }

        function _onConfirm(values) {
            if (options.confirm && options.confirm.onConfirm) {
                options.confirm.onConfirm(values);
            }
        }

        return picker;
    }

    $.fn.timePicker = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var now = new Date();
        var defaultCfg = {
            type: "hms",  // hms, hm, ms
            hour: {
                scope: [0, 23],
                formatter: undefined
            },
            minute: {
                formatter: undefined
            },
            second: {
                formatter: undefined
            }
        };
        options = $.extend(true, {}, defaultCfg, options);

        var from = options.hour.scope[0];
        var to = options.hour.scope[1];
        var columns;
        var data;
        if (options.type == "hms") {
            columns = 3;
            data = [_hours(), _minutes(), _seconds()];
        } else if (options.type == "hm") {
            columns = 2;
            data = [_hours(), _minutes()];
        } else if (options.type == "ms") {
            columns = 2;
            data = [_minutes(), _seconds()];
        }

        function _hours() {
            var hours = [];
            for (var i = from; i <= to; i++) {
                var hour = _format(i);
                if (options.hour.formatter) {
                    hours.push({
                        value: hour,
                        text: options.hour.formatter(hour)
                    });
                } else {
                    hours.push(hour);
                }
            }
            return hours;
        }

        function _minutes() {
            var minutes = [];
            for (var i = 0; i <= 59; i++) {
                var minute = _format(i);
                if (options.minute.formatter) {
                    minutes.push({
                        value: minute,
                        text: options.minute.formatter(minute)
                    });
                } else {
                    minutes.push(minute);
                }
            }
            return minutes;
        }

        function _seconds() {
            var seconds = [];
            for (var i = 0; i <= 59; i++) {
                var second = _format(i);
                if (options.second.formatter) {
                    seconds.push({
                        value: second,
                        text: options.second.formatter(second)
                    });
                } else {
                    seconds.push(second);
                }
            }
            return seconds;
        }

        function _format(i) {
            return i < 10 ? "0" + i : String(i)
        }

        var cfg = $.extend(true, {}, options, {
            columns: columns,
            confirm: {
                onConfirm: _onConfirm
            }
        });
        var picker = self.picker(data, cfg);
        var subPickers = picker.pickers();
        if (options.type == "hms") {
            subPickers[0].select(_format(now.getHours()));
            subPickers[1].select(_format(now.getMinutes()));
            subPickers[2].select(_format(now.getSeconds()));
        } else if (options.type == "hm") {
            subPickers[0].select(_format(now.getHours()));
            subPickers[1].select(_format(now.getMinutes()));
        } else if (options.type == "ms") {
            subPickers[0].select(_format(now.getMinutes()));
            subPickers[1].select(_format(now.getSeconds()));
        }

        function _onConfirm(values) {
            if (options.confirm && options.confirm.onConfirm) {
                options.confirm.onConfirm(values);
            }
        }

        return picker;
    }

    $.fn.calendar = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var today = new Date();
        var defaultCfg = {
            title: "Date Select",
            class: "primary",
            range: false,
            multiple: false,
            confirm: {
                label: "Confirm",
                onConfirm: function () { }
            },
            week: {
                days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                firstDay: 0 // 0: Sun, 1: Mon
            },
            month: {
                format: "YYYY-MM",
            },
            scope: [
                new Date(today.getFullYear(), today.getMonth(), 1),
                new Date(today.getFullYear(), today.getMonth() + 7, 0)
            ]
        };
        options = $.extend(true, {}, defaultCfg, options);
        var tpl = `
            <div class="p-calendar">
                <div class="header">
                    <% if (cfg.title) { %>
                    <div class="title"><%=cfg.title%></div>
                    <% } %>
                    <div class="current-month"><%=currentMonth%></div>
                    <ul class="days">
                        <%_.each(days, function(day) {%>
                            <li><%=day%></li>
                        <% }); %>
                    </ul>
                </div>
                <div class="body">
                </div>
                <div class="footer">
                    <button type="button" class="btn btn-<%=cfg.class%>" confirm><%=cfg.confirm.label%></button>
                </div>
            </div>
        `;

        var from = typeof options.scope[0] == "object" ? options.scope[0] : new Date(options.scope[0]);
        var to = typeof options.scope[1] == "object" ? options.scope[1] : new Date(options.scope[1]);
        var months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
        var month = from.getMonth();
        var days = options.week.days;
        var firstDay = options.week.firstDay;
        if (firstDay > 0) {
            var part1 = days.slice(0, firstDay);
            var part2 = days.slice(firstDay);
            days = part2.concat(part1);
        }

        // Render weekdays and calendar frame
        var calendar = $(_.template(tpl)({
            currentMonth: moment(from).format(options.month.format),
            days: days,
            cfg: options
        }));
        var body = calendar.find(".body");
        var currentMonth = calendar.find(".current-month");
        var confirmBtn = calendar.find("button[confirm]");

        // Render dates of month
        for (var i = 0; i < months; i++) {
            date = new Date(from.getFullYear(), month + i, 1);
            _datesOfMonth(date.getFullYear(), date.getMonth(), i);
        }
        function _datesOfMonth(year, month, index) {
            var first = new Date(year, month, 1);
            var last = new Date(year, month + 1, 0);
            var firstIndex = first.getDay() - firstDay;
            var tpl = `
                <ul class="month">
                    <% for (var i = 1;i <= lastDate;i ++) { 
                        var date = new Date(year, month, i);
                        var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                        var selected = false;
                        if (!cfg.range && today.getTime() == date.getTime()) {
                            selected = true;
                        }
                    %>
                        <li value="<%=moment(date).format('YYYY-MM-DD')%>"<% if (disabled) { %> class="disabled"<% } %><% if (selected) { %> class="selected bg-<%=cfg.class%>"<% } %>><%=i%></li>
                    <% } %>
                    <div class="bg"><%=month + 1%></div>
                </ul>
            `;
            var m = $(_.template(tpl)({
                today: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
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
            var month = moment(new Date(year, month)).format(options.month.format);
            var nextMonth = $(`<div class="next-month"></div>`);
            nextMonth.attr("month", month);
            if (index == 0) {
                nextMonth.css("height", 0);
            } else {
                nextMonth.text(month);
            }
            m.before(nextMonth);
        }

        self.append(calendar);
        if (body.find("li.selected").length > 0) {
            _scrollTo(body.find("li.selected").eq(0).closest(".month"));
        }

        // Next month
        var nextMonth = body.find(".next-month");
        var offset = (body.outerHeight() - body.height()) / 2;
        body.scroll(function (e) {
            $.each(nextMonth, function (i, item) {
                if ($(item).position().top <= -offset) {
                    currentMonth.text($(item).attr("month"));
                }
            });
        });

        // Date select
        var date = body.find("li[value]:not(.disabled)");
        date.on("click", function () {
            if (options.range) {
                var selected = body.find("li.selected");
                if (selected.length == 0 || selected.length == 2) {
                    date.removeClass();
                    date.removeAttr("style");
                    _select($(this), "begin");
                } else {
                    if ($(this).attr("value") > selected.attr("value")) {
                        _select($(this), "end");
                        _between();
                    } else {
                        date.removeClass();
                        date.removeAttr("style");
                        _select($(this), "begin");
                    }
                }
            } else {
                if (options.multiple) {
                    if ($(this).hasClass("selected")) {
                        $(this).removeClass();
                    } else {
                        _select($(this));
                    }
                    $.each(date, function (i, item) {
                        if (i > 0) {
                            if (date.eq(i - 1).hasClass("selected")) {
                                $(item).addClass("right");
                            } else {
                                $(item).removeClass("right");
                            }
                        }
                        if (i < date.length - 1) {
                            if (date.eq(i + 1).hasClass("selected")) {
                                $(item).addClass("left");
                            } else {
                                $(item).removeClass("left");
                            }
                        }
                    });
                } else {
                    date.removeClass();
                    _select($(this));
                }
            }
        });
        function _select(obj, beginOrEnd) {
            obj.addClass("selected").addClass("bg-" + options.class);
            if (beginOrEnd) {
                obj.addClass(beginOrEnd);
            }
        }
        function _between() {
            var selected = body.find("li.selected");
            var color = selected.css("background-color");
            var bgColor = color.replace(")", ", 0.2)");
            $.each(date, function (i, item) {
                var value = $(item).attr("value");
                if (value) {
                    if (value > selected.eq(0).attr("value") && value < selected.eq(1).attr("value")) {
                        $(item).css("color", color).css("background-color", bgColor)
                    }
                }
            });
        }

        confirmBtn.on("click", function () {
            if (options.confirm.onConfirm) {
                var dates = [];
                var selected = body.find("li.selected");
                $.each(selected, function (i, item) {
                    dates.push(new Date($(item).attr("value")));
                });

                if (options.multiple && dates.length == 0) {
                    return;
                }
                if (options.range && dates.length != 2) {
                    return;
                }

                if (dates.length == 1) {
                    options.confirm.onConfirm(options.multiple ? dates : dates[0]);
                } else {
                    options.confirm.onConfirm(dates);
                }
            }
        });

        function _scrollTo(elem) {
            body.animate({
                scrollTop: elem.position().top
            }, 10);
        }

        function _selectDate(dates) {
            if (!dates) {
                return;
            }
            if (options.range) {
                if (!$.isArray(dates) || dates.length < 2) {
                    return;
                }
                // dates.sort();
            } else {
                if (!$.isArray(dates)) {
                    dates = [dates];
                }
            }
            body.find("li:not(.disabled)").removeClass();
            dates.forEach(function (date) {
                _select(date);
            });

            var first = dates[0]
            if (typeof first == "object") {
                first = moment(first).format("YYYY-MM-DD");
            }
            _scrollTo(body.find("li[value='" + first + "']").closest(".month"));

            function _select(date) {
                if (typeof date == "object") {
                    date = moment(date).format("YYYY-MM-DD");
                }
                body.find("li[value='" + date + "']").trigger("click");
            }
        }

        return {
            select: _selectDate
        }
    }

    $.fn.form = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            validations: {},
            submit: {
                btn: null,
                onSubmit: null
            },
            cancel: {
                btn: null,
                onCancel: null
            }
        };
        options = $.extend(true, {}, defaultCfg, options);
        var self = $(this);

        var submitBtn = options.submit.btn;
        if (!submitBtn) {
            submitBtn = self.find("[p-submit]");
        }
        var cancelBtn = options.cancel.btn;
        if (!cancelBtn) {
            cancelBtn = self.find("[p-cancel]");
        }
        submitBtn.on("click", function (e) {
            if (!self.hasClass("validated")) {
                self.addClass("validated");
            }
            _validate(self, function (valid) {
                if (!valid) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                } else {
                    if (options.submit.onSubmit) {
                        options.submit.onSubmit(_data());
                    }
                }
            });
        });
        cancelBtn.on("click", function (e) {
            self.removeClass("validated");
            if (options.cancel.onCancel) {
                options.cancel.onCancel();
            }
        });

        function _validate(form, callback) {
            var valid = true;
            $.each(form.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"), function (i, item) {
                // _clear($(item));
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
                //_clear($(item));
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

            var checks = {};
            $.each(form.find("input[type='checkbox'][required]"), function (i, item) {
                var name = $(item).attr("name");
                if (!checks[name]) {
                    checks[name] = [];
                }
                checks[name].push($(item));

                $(item).on("change", function () {
                    _check();
                });
            });

            _check();
            function _check() {
                for (var name in checks) {
                    var items = checks[name];
                    if (items.length == 0) {
                        continue;
                    }
                    var checked = false;
                    items.forEach(function (item) {
                        if (item.is(":checked")) {
                            checked = true;
                        }
                    });

                    //_clear(items[0]);
                    if (checked) {
                        _ok(items[0]);
                    } else {
                        _error(items[0]);
                    }
                }
            }

            function _custom() {
                var keys = Object.keys(options.validations);
                async.each(keys, function (key, notice) {
                    var elem = self.find("[validation='" + key + "']");

                    elem.off("change");
                    elem.on("change", function () {
                        _validate($(this));
                    });

                    var control = elem.closest(".control");
                    if (control.hasClass("is-valid") || control.hasClass("is-invalid")) {
                        if (control.hasClass("is-invalid")) {
                            valid = false;
                        }
                        notice();
                    } else {
                        _validate(elem, function () {
                            notice();
                        });
                    }
                }, function () {
                    callback(valid);
                });

                function _validate(elem, callback) {
                    var func = options.validations[elem.attr("validation")];
                    _loading(elem, function (onLoaded) {
                        func(elem, function (result, message) {
                            if (result) {
                                _ok(elem);
                            } else {
                                _error(elem, message);
                            }
                            onLoaded(elem);
                            if (callback) {
                                callback();
                            }
                        });
                    });
                }
            }

            function _clear(ctx) {
                ctx.closest(".control").removeClass("is-valid");
                ctx.closest(".control").removeClass("is-invalid");
            }

            function _ok(ctx) {
                ctx.closest(".control").removeClass("is-invalid").addClass("is-valid");
            }

            function _error(ctx, message) {
                valid = false;
                if (message) {
                    ctx.closest(".control").find(".msg.invalid").text(message);
                }
                ctx.closest(".control").removeClass("is-valid").addClass("is-invalid");
            }

            if (!$.isEmptyObject(options.validations)) {
                _custom();
            } else {
                callback(valid);
            }
        }

        function _data() {
            var data = {};
            $.each(self.find("input[name]"), function (i, item) {
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

            $.each(self.find("textarea[name]"), function (i, item) {
                var textarea = $(item);
                var name = textarea.attr("name");
                var value = textarea.val();
                _set(name, value);
            });

            $.each(self.find("select[name]"), function (i, item) {
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
                if (data[name]) {
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

        function _loading(elem, async) {
            if (elem.siblings(".loading").length > 0) {
                return;
            }
            elem.closest(".control").removeClass("is-valid").removeClass("is-invalid");
            var loading = $(`<div class="loading"></div>`);
            elem.after(loading);
            async(function (elem) {
                elem.siblings(".loading").remove();
            });
        }

        return {
            loading: _loading
        };
    }

    $.fn.rate = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            selected: 0,
            half: false,
            class: "warning",
            type: "star", // star, heart
            count: 5
        };
        options = $.extend(true, {}, defaultCfg, options);

        var tpl = `
            <div class="p-rate">
            <% for (var i = 0;i < count;i ++) { %>
                <div<% if (half) { %> class="half"<% } %>>
                    <i class="bi bi-<%=type%>"></i>
                </div>
                <% if (half) { %>
                <div class="fill"></div>
                <% } %>
            <% } %>
            </div>
        `;

        self.html("");
        self.append($(_.template(tpl)(options)));

        var selected = options.selected;
        if (selected > options.count) {
            selected = options.count;
        }

        var step = options.half ? 0.5 : 1;
        var radios = self.find("div.p-rate > div");
        $.each(radios, function (i, radio) {
            var value = (i + 1) * step;
            if (options.half) {
                value = value.toFixed(1);
            }
            $(radio).attr("value", value);
        });
        if (!options.readonly) {
            radios.on("click", function () {
                if (selected != Number($(this).attr("value"))) {
                    _select($(this));
                }
            });
        }

        function _select(obj, first) {
            var current = Number(obj.attr("value"));
            selected = current;

            // clear
            radios.find("i").removeClass().addClass("bi").addClass("bi-" + options.type);

            // select
            $.each(radios, function (i, radio) {
                var value = Number($(radio).attr("value"));
                if (value < current) {
                    $(radio).find("i").removeClass().addClass("bi").addClass("bi-" + options.type + "-fill").addClass("text-" + options.class);
                }
            });
            obj.find("i").removeClass().addClass("bi").addClass("text-" + options.class);
            if (options.half) {
                obj.find("i").addClass("bi-" + options.type + "-" + obj.attr("class"));
            } else {
                obj.find("i").addClass("bi-" + options.type + "-fill");
            }

            if (options.onChange && !first) {
                options.onChange(selected);
            }
        }

        if (selected > 0) {
            _select(self.find("div[value='" + selected + "']"), true);
        }

        return {
            getValue: function () {
                return selected;
            }
        }
    }

    $.fn.uploader = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            url: "/upload",
            fieldName: "file",
            validation: {
                size: function (size, index) {
                    return true;
                },
                type: function (type, index) {
                    return true
                }
            },
            limit: 0,
            progress: "percent", // percent, text
            text: {
                uploading: "uploading...",
                failed: "upload failed"
            },
            width: "6rem",
            accept: "*",
            icon: "bi-cloud-upload-fill",
            data: [],
            preview: false,
            onSuccess: function (result, textStatus, xhr) {
                return result;
            },
            onError: function (xhr, textStatus, errorThrown) {
                return {
                    code: xhr.status,
                    msg: xhr.responseText
                }
            }
        };
        options = $.extend(true, {}, defaultCfg, options);
        if (!self.hasClass("p-file-upload")) {
            self.addClass("p-file-upload");
        }

        var types = {
            "application/vnd.ms-excel": "excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel",
            "application/msword": "word",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "word",
            "application/vnd.ms-powerpoint": "ppt",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": "ppt",
            "application/pdf": "pdf",
            "image/*": "image",
            "video/*": "video",
            "audio/*": "audio",
            "text/html": "html",
            "text/xml": "xml",
            "text/plain": "txt"
        };

        var icons = {
            "excel": "bi-file-earmark-excel",
            "word": "bi-file-earmark-word",
            "ppt": "bi-file-earmark-ppt",
            "pdf": "bi-file-earmark-pdf",
            "video": "bi-camera-video",
            "audio": "bi-optical-audio",
            "html": "bi-file-earmark-code",
            "xml": "bi-file-earmark-code",
            "txt": "bi-file-earmark-text",
            "file": "bi-file-earmark"
        };

        var extensions = {
            ".jpg": "image",
            ".jpeg": "image",
            ".png": "image",
            ".svg": "image",
            ".gif": "image",
            ".xls": "excel",
            ".xlsx": "excel",
            ".doc": "word",
            ".docx": "word",
            ".ppt": "ppt",
            ".pptx": "ppt",
            ".pdf": "pdf",
            ".mp4": "video",
            ".webm": "video",
            ".mp3": "audio",
            ".wma": "audio",
            ".html": "html",
            ".xml": "xml",
            ".txt": "txt"
        }

        var blankTpl = `
            <div class="file" style="width:<%=width%>" blank>
                <i class="bi <%=icon%>"></i>
                <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
            </div>
        `;
        var uploadingTpl = `
            <div class="file" style="width:<%=width%>" count>
                <i class="bi <%=icon%>"></i>
                <div class="uploading">
                    <div class="spinner-border text-light"></div>
                    <span>0%</span>
                </div>
            </div>
        `;
        var failedTpl = `
            <div class="file" style="width:<%=width%>" count>
                <i class="bi <%=icon%>"></i>
                <div class="failed">
                    <i class="bi bi-x-circle"></i>
                    <span><%=error%></span>
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `;
        var uploadedImageTpl = `
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded image">
                    <img src="<%=path%>" />
                </div>
                <% if (!preview) { %>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
                <% } %>
            </div>
        `;
        var uploadedFileTpl = `
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded">
                    <i class="bi <%=icon%>"></i>
                    <span><%=name%></span>
                </div>
                <% if (!preview) { %>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
                <% } %>
            </div>
        `;

        // init
        if (options.data && options.data.length > 0) {
            options.data.forEach(function (path) {
                var type, name;
                if (path.indexOf("data:image") == 0) {
                    name = "";
                    type = "image";
                } else {
                    var ext = path.substring(path.lastIndexOf("."));
                    type = extensions[ext];
                    name = path.substring(path.lastIndexOf("/") + 1);
                }
                var uploaded;
                if (type == "image") {
                    uploaded = $(_.template(uploadedImageTpl)({
                        width: options.width,
                        path: path,
                        preview: options.preview
                    }));
                } else {
                    if (!type) {
                        type = "file";
                    }
                    var icon = icons[type];
                    var name = path.substring(path.lastIndexOf("/") + 1);
                    uploaded = $(_.template(uploadedFileTpl)({
                        width: options.width,
                        icon: icon,
                        name: name,
                        preview: options.preview
                    }));
                    uploaded.on("click", function () {
                        window.location.href = path;
                    });
                }
                uploaded.data("file", {
                    name: name,
                    path: path
                });
                uploaded.find(".remove").on("click", function (e) {
                    e.stopPropagation();
                    _remove($(this));
                });

                self.append(uploaded);
                if (type == "image") {
                    uploaded.find("div.uploaded").css("height", uploaded.width());
                }
            });

            _preview();

            if (!options.preview) {
                if (options.limit <= 0 || options.data.length < options.limit) {
                    _blank();
                }
            }
        } else {
            if (!options.preview) {
                _blank();
            }
        }

        function _blank() {
            var blank = $(_.template(blankTpl)({
                width: options.width,
                accept: options.accept,
                icon: options.icon
            }));
            self.append(blank);
            var fileInput = blank.find("input[type='file']");

            var progressor;

            fileInput.on("change", function (e) {
                var files = e.originalEvent.target.files;
                if (files.length > 0) {
                    var file = files[0];
                    var type = _validate(file, blank.index());
                    file = _beforeUpload(file);
                    if (type) {
                        _upload(file, type);
                    } else {
                        $(this).val(null);
                    }
                }
            });

            function _type(file) {
                var originalType = file.type;
                var type = types[originalType];
                if (!type) {
                    var pattern = originalType.split("/")[0] + "/*";
                    type = types[pattern];
                    if (!type) {
                        type = "file";
                    }
                }
                return {
                    name: type,
                    originalType: originalType
                };
            }

            function _validate(file, index) {
                if (options.validation.size(file.size, index)) {
                    var type = _type(file);
                    if (options.validation.type(type, index)) {
                        return type;
                    }
                }
            }

            function _beforeUpload(file) {
                if (options.beforeUpload) {
                    return options.beforeUpload(file);
                }
                return file;
            }

            function _upload(file, type) {
                var formData = new FormData();
                formData.append(options.fieldName, file);
                $.ajax({
                    url: options.url,
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    xhr: function () {
                        _uploading();
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function (event) {
                            if (event.lengthComputable) {
                                if (options.progress == "percent") {
                                    var percent = ((event.loaded / event.total) * 100).toFixed(0) + "%";
                                    progressor.find("span").text(percent);
                                }
                                if (options.onProgress) {
                                    options.onProgress(event.loaded, event.total);
                                }
                            }
                        }, false);
                        return xhr;
                    },
                    success: function (result, textStatus, xhr) {
                        var file = options.onSuccess(result, textStatus, xhr);
                        var uploaded;
                        if (type.name == "image") {
                            uploaded = $(_.template(uploadedImageTpl)({
                                width: options.width,
                                path: file.path,
                                preview: options.preview
                            }));
                        } else {
                            uploaded = $(_.template(uploadedFileTpl)({
                                width: options.width,
                                icon: icons[type.name],
                                name: file.name,
                                preview: options.preview
                            }));
                        }
                        uploaded.data("file", file);
                        _onComplete(uploaded);
                        if (type.name == "image") {
                            uploaded.find("div.uploaded").css("height", uploaded.width());
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        options.onError(xhr, textStatus, errorThrown);
                        var error = $(_.template(failedTpl)({
                            error: options.text.failed,
                            icon: options.icon
                        }));
                        _onComplete(error);
                    }
                });
            }

            function _onComplete(elem) {
                progressor.after(elem);
                progressor.remove();

                if (options.limit <= 0 || _count() < options.limit) {
                    _blank();
                }

                elem.find(".remove").on("click", function (e) {
                    e.stopPropagation();
                    _remove($(this));
                });

                if (options.onComplete) {
                    options.onComplete(elem.index());
                }

                _preview();
            }

            function _uploading() {
                progressor = $(_.template(uploadingTpl)({
                    width: options.width,
                    icon: options.icon
                }));
                blank.after(progressor);
                blank.remove();
                if (options.progress == "text") {
                    progressor.find("span").text(options.text.uploading);
                }
            }

            function _count() {
                return self.find(".file[count]").length;
            }
        }

        function _preview() {
            var images = self.find(".uploaded img");
            images.off("click");
            images.on("click", function () {
                var data = [];
                $.each(images, function (i, image) {
                    $(image).attr("index", i);
                    data.push({
                        path: $(image).attr("src")
                    });
                });
                var preview = $.imagePreview(data);
                preview.select(parseInt($(this).attr("index")));
            });
        }

        function _remove(elem) {
            var file = elem.closest(".file");
            var data = file.data("file");
            var index = file.index();
            file.remove();
            if (self.find(".file[blank]").length == 0) {
                _blank();
            }
            if (options.onRemove) {
                options.onRemove(data, index);
            }
        }

        function _files() {
            var files = [];
            $.each(self.find(".file"), function (i, file) {
                var d = $(file).data("file");
                if (d) {
                    files.push(d);
                }
            });
            return files;
        }

        function _reset() {
            self.find(".file").remove();
            _blank();
        }

        return {
            files: _files,
            reset: _reset
        };
    }

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
            <div class="p-slider">
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
        self.on("touchstart", function (e) {
            e.preventDefault();
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
            getValue: function () {
                return current;
            },
            disable: _disable,
            enable: _enable
        }
    }

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

    $.fn.multiselect = function (data, options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            height: "260px",
            title: "Please select",
            toolbar: true,
            class: "primary",
            cancel: {
                label: "Cancel",
                class: "secondary"
            },
            confirm: {
                label: "Confirm",
                class: "primary"
            }
        };
        options = $.extend(true, {}, defaultCfg, options);

        var records;
        _convert(data);
        function _convert(data) {
            records = [];
            if (!$.isArray(data)) {
                for (var key in data) {
                    records.push({
                        value: key,
                        text: data[key]
                    });
                }
            } else {
                data.forEach(function (item) {
                    if (typeof item == "string" || typeof item == "number") {
                        records.push({
                            value: item,
                            text: item
                        });
                    } else {
                        records.push(item);
                    }
                });
            }
        }

        var tpl = `
            <div class="p-multiselect">
                <% if (cfg.toolbar) { %>
                    <div class="toolbar">
                        <a href="javascript:void(0)" class="text-secondary" cancel><%=cfg.cancel.label%></a>
                        <label class="title"><%=cfg.title%></label>
                        <a href="javascript:void(0)" class="text-primary" confirm><%=cfg.confirm.label%></a>
                    </div>
                <% } %>
                <div class="wrapper" style="height: <%=cfg.height%>">
                    <ul class="items">
                        <%_.each(items, function(item) {%>
                            <li class="item" value="<%=item.value%>">
                                <i class="bi text-<%=cfg.class%><% if (item.selected) { %> bi-check-lg<% } %>"></i>
                                <div class="text"><%=item.text%></div>
                                <i></i>
                            </li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `;

        // Render
        var selector = $(_.template(tpl)({
            cfg: options,
            items: records
        }));
        self.html("");
        self.append(selector);

        selector.find("li.item").on("click", function (e) {
            e.stopPropagation();
            var check = $(this).find("i.bi");
            if (check.hasClass("bi-check-lg")) {
                check.removeClass("bi-check-lg");
            } else {
                check.addClass("bi-check-lg");
            }
        });

        var toolbar = selector.find(".toolbar");
        toolbar.find("[cancel]").on("click", function (e) {
            if (options.cancel.onCancel) {
                options.cancel.onCancel();
            }
        });
        toolbar.find("[confirm]").on("click", function (e) {
            if (options.confirm.onConfirm) {
                options.confirm.onConfirm(_selected());
            }
        });

        function _select(values) {
            if (!$.isArray(values)) {
                values = [values];
            }
            values.forEach(function (value) {
                var item = selector.find("li.item[value='" + value + "']");
                if (!item.find("i.bi").hasClass("bi-check-lg")) {
                    item.find("i.bi").addClass("bi-check-lg");
                }
            });
        }

        function _selected() {
            var values = [];
            $.each(selector.find("li.item i.bi.bi-check-lg").closest("li"), function (i, item) {
                values.push($(item).attr("value"));
            });
            return values;
        }

        return {
            select: _select,
            values: _selected
        }
    }
}));