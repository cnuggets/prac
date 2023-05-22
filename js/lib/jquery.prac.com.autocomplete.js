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

    $.fn.autocomplete = function (options) {
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            limit: 0,
            data: []
        };
        options = $.extend(true, {}, defaultCfg, options);

        var self = $(this);
        var invalidFeedback = self.next();

        var tpl = `
            <div class="autocomplete">
                <div class="result">
                    <ul class="options">
                        <% _.each(data, function(item) { %>
                            <li value="<%=item.value%>"><%=item.text%></li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `;

        var optionTpl = `
            <% _.each(data, function(item) { %>
                <li value="<%=item.value%>"><%=item.text%></li>
            <% }); %>
        `;

        function _convert(data) {
            if ($.isArray(data) && data.length > 0) {
                if (typeof data[0] == "string" || typeof data[0] == "number") {
                    var arr = [];
                    data.forEach(function (item) {
                        arr.push({
                            value: String(item),
                            text: String(item)
                        });
                    });
                    return arr;
                }
            } else if (typeof data == "object") {
                var arr = [];
                for (var value in data) {
                    arr.push({
                        value: value,
                        text: data[value]
                    });
                }
                return arr;
            }
            return data;
        }

        function _render(data, hidden) {
            result.find(".options").html(_.template(optionTpl)({
                data: data
            }));

            result.find(".options li").on("click", function () {
                var value = $(this).attr("value");
                self.val(value).change();
                result.hide();
            });

            if (data.length > 0 && !hidden) {
                result.show();
            } else {
                result.hide();
            }
        }

        // data
        var data = _convert(options.data);
        var defaultData = data;
        if (data.length > 0 && options.limit > 0) {
            defaultData = data.slice(0, options.limit);
        }
        var ac = $(_.template(tpl)({
            data: defaultData
        }));

        // render
        self.after(ac);
        var result = ac.find(".result")
        result.before(self);
        result.after(invalidFeedback);

        // event
        $("body").on("click", function () {
            result.hide();
        });
        ac.on("click", function (e) {
            e.stopPropagation();
        });
        result.find(".options li").on("click", function () {
            var value = $(this).attr("value");
            self.val(value).change();
            result.hide();
        });

        var timer;
        var _setData;
        if (options.async) { // async
            self.on("focus", function () {
                if (self.val().length == 0) {
                    result.hide();
                    return;
                }
                _completeAsync(self.val());
            });

            self.on("keyup", function () {
                clearTimeout(timer);
                if (self.val().length == 0) {
                    result.hide();
                    return;
                }
                timer = setTimeout(function () {
                    _completeAsync(self.val());
                }, 300);
            });

            function _completeAsync(keyword) {
                options.async(keyword, function (resp) {
                    var data = _convert(resp);
                    _render(data);
                });
            }
        } else { // static
            self.on("focus", function () {
                _complete();
            });

            self.on("keyup", function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    _complete();
                }, 50);
            });

            function _complete() {
                var keyword = $.trim(self.val());
                var arr = [];
                if (keyword.length > 0) {
                    data.forEach(function (item) {
                        if (item.value.indexOf(keyword) >= 0) {
                            var value = item.value;
                            var parts = item.value.split(keyword);
                            var text = parts.join(`<b>` + keyword + `</b>`);
                            arr.push({
                                value: value,
                                text: text
                            });
                        }
                    });
                } else {
                    arr = data.slice(0);
                }
                if (arr.length > 0 && options.limit > 0) {
                    arr = arr.slice(0, options.limit);
                }
                _render(arr);
            }

            _setData = function (newData) {
                data = _convert(newData);
                self.val("").change();
                _render(data, true);
            }
        }

        return {
            setData: _setData
        }
    }
}));
