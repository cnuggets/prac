(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "common"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _) {

    $.fn.tree = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            icon: {
                node: "bi-file-earmark",
                folder: "bi-folder-fill"
            },
            checkable: false,
            editable: true
        };
        options = $.extend(true, {}, defaultCfg, options);

        var nodeTpl = `
            <div class="node" node-id="<%=data.id ? data.id : ""%>">
                <% if (type == "folder") { %>
                    <i class="bi bi-caret-right-fill"></i>
                <% } %>
                <div class="item">
                    <div class="content">
                        <% if (cfg.checkable) { %>
                            <input type="checkbox" class="form-check-input" <% if (data.checked) { %>checked<% } %> />
                        <% } else { %>
                            <% if (type == "folder") { %>
                                <i class="bi <%=cfg.icon.folder%> text-warning folder"></i>
                            <% } else { %>
                                <i class="bi <%=cfg.icon.node%> file"></i>
                            <% } %>
                        <% } %>
                        <% if (edit) { %>
                            <input type="text" placeholder="content" autocomplete="off" value="<%=data.content ? data.content : ''%>" />
                        <% } else { %>
                            <span class="text"><%=data.content%></span>
                        <% } %>
                    </div>
                    <% if (edit) { %>
                        <% for (var i = 0;i < columns - 1;i ++) { %>
                            <div class="description">
                                <input type="text" placeholder="description" autocomplete="off" value="<%=i < data.descriptions.length ? data.descriptions[i] : ''%>" />
                            </div>
                        <% } %>
                    <% } else { %>
                        <% _.each(data.descriptions, function(description) { %>
                            <div class="description">
                                <span class="text"><%=description%></span>
                            </div>
                        <% }); %>
                    <% } %>
                </div>
            </div>
        `;

        var movingNodeTpl = `
            <div class="moving-node">
                <div class="item">
                    <div class="content">
                    <% if (!cfg.checkable) { %>
                        <% if (type == "folder") { %>
                            <i class="bi <%=cfg.icon.folder%> text-warning folder"></i>
                        <% } else { %>
                            <i class="bi <%=cfg.icon.node%> file"></i>
                        <% } %>
                    <% } %>
                        <span class="text"><%=content%></span>
                    </div>
                </div>
            </div>
        `;

        var insertLine = $(`
            <div class="insert-line">
                <i class="bi bi-caret-right-fill"></i>
                <div class="line"></div>
            </div>
        `);

        var menu;

        if (options.data && options.data.length > 0) {
            self.html("");
            self.addClass("tree");
            self.append($(`<ul></ul>`));

            _build(self.find("ul"), options.data);
            _refresh();
            function _build(ctx, data) {
                data.forEach(function (item) {
                    var type = item.children ? "folder" : "node";
                    var node = _new(item, type);
                    var li = $("<li></li>");
                    li.append(node);
                    ctx.append(li);
                    if (type == "folder") {
                        var children = $("<ul></ul>");
                        li.append(children);
                        _build(children, item.children);
                    }
                });
            }
            $.each(_nodes(), function (i, node) {
                if (_type($(node)) == "folder") {
                    if ($(node).find("input[type='checkbox']").is(":checked")) {
                        $(node).siblings("ul").find("input[type='checkbox']").prop("checked", true);
                    }
                }
            });
        } else {
            $.each(self.find(".node"), function (i, elem) {
                _bind($(elem));
                if ($(elem).hasClass("unfold")) {
                    $(elem).siblings("ul").show();
                }
            });
            _refresh();
        }

        function _refresh() {
            _updateLevel(self.children("ul"), 0);
            _ajustColumnWidth();
        }

        function _nodes() {
            return self.find(".node");
        }

        function _new(data, type, edit) {
            var node = $(_.template(nodeTpl)({
                type: type,
                data: data,
                cfg: options,
                columns: _maxColumns(),
                edit: edit == undefined ? false : edit
            }));
            node.data("value", data.value);
            _bind(node);
            return node;
        }

        function _remove(ctx) {
            ctx.remove();
        }

        function _bind(ctx) {
            ctx.children("i.bi").on("click", function (e) {
                e.stopPropagation();
                var node = $(this).closest(".node");
                var children = node.siblings("ul");
                if (children.is(":hidden")) {
                    node.addClass("unfold");
                    children.slideDown(200);
                } else {
                    node.removeClass("unfold");
                    children.slideUp(200);
                }
            });

            ctx.on("click", function (e) {
                e.stopPropagation();
                _onSelect($(this));
            });

            function _onSelect(node) {
                var editingNode = _editing();
                if (editingNode) {
                    if (editingNode != node) {
                        if (!_doSave(editingNode)) {
                            return;
                        }
                    }
                }
                _select(node);
                _unfocus();
            }

            if (options.editable) {
                ctx.on("contextmenu", function (e) {
                    _menu(e, $(this));
                });

                var offset;
                var timer;
                ctx.find(".content").bindDragMove(function (e, pos, obj) {
                    _unfocus();
                    var node = obj.closest(".node");
                    offset = {
                        x: node.position().left - pos.x,
                        y: node.position().top - pos.y
                    };
                    self.addClass("none-user-select");
                }, function (e, pos, speed, obj) {
                    clearTimeout(timer);
                    var node = obj.closest(".node");
                    if (node.find("input[type='text']").length > 0) {
                        return;
                    };
                    node.attr("moving", true);
                    var movingNode = self.find(".moving-node")
                    if (movingNode.length == 0) {
                        movingNode = $(_.template(movingNodeTpl)({
                            type: _type(node),
                            cfg: options,
                            content: node.find(".content span.text").text()
                        }));
                        self.append(movingNode);
                    }
                    var mTop = pos.y + offset.y;
                    movingNode.css("top", mTop);
                    movingNode.css("left", pos.x + offset.x);

                    timer = setTimeout(function () {
                        var height = node.height();
                        $.each(self.find(".node:not([moving]"), function (i, n) {
                            if ($(n).is(":visible")) {
                                var node = self.find(".node[moving]");
                                if (_type(node) == "folder") {
                                    if (parseInt($(n).attr("level")) > parseInt(node.attr("level"))) {
                                        return;
                                    }
                                }

                                var top = $(n).position().top;
                                var dist = top - mTop;
                                if (_type($(n)) == "folder") {
                                    if (Math.abs(dist) < height / 5) {
                                        if (!$(n).hasClass("unfold")) {
                                            $(n).children("i.bi").trigger("click");
                                        }
                                        var nodes = $(n).siblings("ul").find(".node");
                                        if (nodes.length == 0) {
                                            $(n).siblings("ul").append(insertLine);
                                        } else {
                                            nodes.eq(0).closest("li").before(insertLine);
                                        }
                                        return;
                                    }
                                }

                                if (dist < 0 && dist >= -height * 4 / 5) {
                                    $(n).closest("li").after(insertLine);
                                    return;
                                }

                                if (dist > height / 5 && dist <= height * 4 / 5) {
                                    $(n).closest("li").before(insertLine);
                                    return;
                                }
                            }
                        });
                    }, 110);
                }, function (e, pos, speed) {
                    clearTimeout(timer);
                    var movingNode = self.find(".moving-node")
                    if (movingNode.length > 0) {
                        if (self.find(".insert-line").length > 0) {
                            var node = self.find(".node[moving]");
                            insertLine.after(node.closest("li"));
                            _refresh();
                        }
                        movingNode.remove();
                        _nodes().removeAttr("moving");
                        if (options.checkable) {
                            _check();
                        }
                    }
                    self.find(".insert-line").remove();
                    self.removeClass("none-user-select");
                });
            }

            if (options.checkable) {
                var checkbox = ctx.find(">.item>.content>input[type='checkbox']");
                checkbox.on("click", function (e) {
                    e.stopPropagation();
                });
                checkbox.on("change", function (e) {
                    var children = $(this).closest(".node").siblings("ul").find("input[type='checkbox']");
                    if ($(this).is(":checked")) {
                        children.prop("checked", true);
                    } else {
                        children.prop("checked", false);
                        _uncheck($(this).closest("ul").siblings(".node"))
                    }

                    function _uncheck(node) {
                        if (node.length > 0) {
                            node.find("input[type='checkbox']").prop("checked", false);
                            _uncheck(node.closest("ul").siblings(".node"));
                        }
                    }
                });
            }

            return ctx;
        }

        function _select(node) {
            if (!options.checkable) {
                _nodes().removeClass("selected");
                node.addClass("selected");
            }
        }

        function _menu(e, node) {
            e.preventDefault();
            e.stopPropagation();
            _unfocus();
            node.addClass("focus");

            var nodeMenuTpl = `
                <div class="tree-menu">
                    <ul>
                        <li new-node>New Node</li>
                        <li new-folder>New Folder</li>
                        <hr/>
                        <li move-up>Move Up</li>
                        <li move-down>Move Down</li>
                        <hr/>
                        <li edit>Edit</li>
                        <li delete>Delete</li>
                    </ul>
                </div>
            `;
            var folderMenuTpl = `
                <div class="tree-menu">
                    <ul>
                        <li new-node>New Node</li>
                        <li new-folder>New Folder</li>
                        <li new-child-node>New Child Node</li>
                        <li new-child-folder>New Child Folder</li>
                        <hr/>
                        <li move-up>Move Up</li>
                        <li move-down>Move Down</li>
                        <hr/>
                        <li edit>Edit</li>
                        <li delete>Delete</li>
                    </ul>
                </div>
            `;
            var tpl = _type(node) == "node" ? nodeMenuTpl : folderMenuTpl;
            menu = $(tpl);

            $("body").append(menu);
            menu.css("left", e.pageX);
            menu.css("top", e.pageY);

            menu.on("click", function (e) {
                e.stopPropagation();
            });

            menu.find("li[move-up]").on("click", function () {
                node.closest("li").prev().before(node.closest("li"));
                _unfocus();
            });
            menu.find("li[move-down]").on("click", function () {
                node.closest("li").next().after(node.closest("li"));
                _unfocus();
            });
            menu.find("li[delete]").on("click", function () {
                _remove(node.closest("li"));
                _unfocus();
            });
            menu.find("li[edit]").on("click", function (e) {
                e.stopPropagation();
                _edit(node);
            });

            menu.find("li[new-node]").on("click", function () {
                _add("node");
            });
            menu.find("li[new-folder]").on("click", function () {
                _add("folder");
            });
            menu.find("li[new-child-node]").on("click", function () {
                if (_type(node) == "folder" && !node.hasClass("unfold")) {
                    node.children("i.bi").trigger("click");
                }
                _add("node", true);
            });
            menu.find("li[new-child-folder]").on("click", function () {
                if (_type(node) == "folder" && !node.hasClass("unfold")) {
                    node.children("i.bi").trigger("click");
                }
                _add("folder", true);
            });

            function _add(type, child) {
                var newNode = _new({
                    content: "",
                    descriptions: []
                }, type, true);
                var li = $("<li></li>");
                li.append(newNode);
                if (type == "folder") {
                    li.append($("<ul></ul>"));
                }
                if (child) {
                    node.siblings("ul").append(li);
                    newNode.attr("level", parseInt(node.attr("level")) + 1);
                } else {
                    node.closest("li").after(li);
                    newNode.attr("level", node.attr("level"));
                }
                newNode.find("input[type='text']").on("click", function (e) {
                    e.stopPropagation();
                });
                newNode.find("input[type='text']").on("keyup", function (e) {
                    if (e.keyCode == 13) {
                        _save();
                    }
                });
                newNode.trigger("click");
                newNode.find("input[type='text']").eq(0).focus();
                _select(newNode);
                _ajustColumnWidth();
                menu.remove();
            }

            function _edit(node) {
                var content = "";
                var descriptions = [];
                $.each(node.find("span.text"), function (i, text) {
                    if (i == 0) {
                        content = $(text).text();
                    } else {
                        descriptions.push($(text).text());
                    }
                });
                var type = _type(node);
                var editingNode = _new({
                    content: content,
                    descriptions: descriptions
                }, type, true);
                if (type == "folder" && node.hasClass("unfold")) {
                    editingNode.addClass("unfold");
                }
                editingNode.attr("level", node.attr("level"));
                editingNode.data("value", node.data("value"));
                editingNode.find("input[type='text']").on("click", function (e) {
                    e.stopPropagation();
                });
                editingNode.find("input[type='text']").on("keyup", function (e) {
                    if (e.keyCode == 13) {
                        _save();
                    }
                });
                node.after(editingNode);
                editingNode.find("input[type='text']").eq(0).focus().select();
                node.remove();
                _ajustColumnWidth();
                _select(editingNode);
                menu.remove();
            }
        }

        function _type(node) {
            if (node.siblings("ul").length > 0) {
                return "folder";
            }
            return "node";
        }

        function _maxColumns() {
            var maxColumns = 1;
            $.each(_nodes(), function (i, node) {
                var columns = $(node).find(".item").children("div").length;
                if (columns > maxColumns) {
                    maxColumns = columns;
                }
            });
            return maxColumns;
        }

        function _updateLevel(uls, level) {
            $.each(uls, function (i, ul) {
                $(ul).find(">li>.node").attr("level", level);
                _updateLevel($(ul).find(">li>ul"), level + 1);
            });
        }

        function _lowestLevel() {
            var lowest = 0;
            $.each(_nodes(), function (i, node) {
                var level = parseInt($(node).attr("level"));
                if (level > lowest) {
                    lowest = level;
                }
            });
            return lowest;
        }

        function _ajustColumnWidth() {
            var n = _lowestLevel();
            var columns = _maxColumns();

            var nodeWidthBase = _nodes().eq(0).width();
            var contentWidthBase = nodeWidthBase / columns;

            $.each(_nodes(), function (i, node) {
                var offset = $.remToPixels(1.25);
                var level = parseInt($(node).attr("level"));

                var contentWidth = contentWidthBase + offset * (n - level);
                var descriptionWidth = nodeWidthBase - offset * level - contentWidth;
                $(node).find(">.item>.content").css("width", contentWidth);
                $(node).find(">.item>.description").css("width", descriptionWidth / (columns - 1));
            });
        }

        function _unfocus() {
            if (menu) {
                _nodes().removeClass("focus");
                menu.remove();
            }
        }

        function _save() {
            _doSave(_editing());
        }

        function _editing() {
            var input = self.find(".item input[type='text']");
            if (input.length > 0) {
                return input.closest(".node");
            }
        }

        function _doSave(editingNode) {
            if (!editingNode || editingNode.find("input[type='text']").eq(0).val().length == 0) {
                return false;
            }
            var content = "";
            var descriptions = [];
            $.each(editingNode.find("input[type='text']"), function (i, input) {
                if (i == 0) {
                    content = $(input).val();
                } else {
                    descriptions.push($(input).val());
                }
            });
            var type = _type(editingNode);
            var newNode = _new({
                content: content,
                descriptions: descriptions
            }, type);
            if (type == "folder" && editingNode.hasClass("unfold")) {
                newNode.addClass("unfold");
            }
            newNode.attr("level", editingNode.attr("level"));
            newNode.data("value", editingNode.data("value"));
            editingNode.after(newNode);
            editingNode.remove();
            _ajustColumnWidth();
            if (options.checkable) {
                _check();
            }
            return true;
        }

        function _check() {
            $.each(_nodes(), function (i, node) {
                if (_type($(node)) == "folder") {
                    if ($(node).find("input[type='checkbox']").is(":checked")) {
                        var children = $(node).siblings("ul").find(">li>.node");
                        $.each(children, function (i, child) {
                            if (!$(child).find("input[type='checkbox']").is(":checked")) {
                                $(node).find("input[type='checkbox']").prop("checked", false);
                            }
                        });
                    }
                }
            });
        }

        $("body").on("contextmenu", function (e) {
            _unfocus();
            _save();
        });

        self.on("click", function () {
            _unfocus();
            _save();
        });

        $("body").on("click", function () {
            _unfocus();
            _save();
        });

        $(window).on("resize", function () {
            _ajustColumnWidth();
        });

        function _data() {
            var data = [];
            _recurse(self.find(">ul>li>.node"), data)
            function _recurse(nodes, parent) {
                $.each(nodes, function (i, node) {
                    var descriptions = [];
                    $.each($(node).find(".description .text"), function (i, item) {
                        descriptions.push($(item).text());
                    });
                    var nodeData = {
                        id: $(node).attr("node-id"),
                        content: $(node).find(".content .text").text(),
                        descriptions: descriptions,
                        value: $(node).data("value"),
                        children: []
                    };
                    if (options.checkable) {
                        nodeData.checked = $(node).find("input[type='checkbox']").is(":checked");
                    }
                    parent.push(nodeData);
                    _recurse($(node).siblings("ul").find(">li>.node"), nodeData.children);
                });
            }
            return data;
        }

        return {
            data: _data
        };
    };
}));