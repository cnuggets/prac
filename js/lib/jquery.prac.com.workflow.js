(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "moment", "common", "component"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, moment) {

    $.fn.workflow = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }

        var lang = {
            en: {
                text: {
                    tooltip: {
                        "plus": "Click to Add / Drag and Drop to Connect",
                        "zoomIn": "Zoom In",
                        "zoomOut": "Zoom Out",
                        "addNode": "Add",
                        "tidyNode": "Tidy",
                        "more": "More",
                        "close": "Close"
                    },
                    contextMenu: {
                        "copy": "Copy",
                        "delete": "Delete"
                    },
                    btn: {
                        "save": "Save",
                        "run": "Run",
                        "stop": "Stop",
                        "deploy": "Deploy"
                    },
                    other: {
                        autoSave: "Auto Saved At:"
                    },
                    errMsg: {
                        "inputRequired": "Input node is required",
                        "outputRequired": "Output node is required",
                        "nodeRequired": `<%=name%> node is required`
                    }
                }
            },
            zh: {
                text: {
                    tooltip: {
                        "plus": "点击添加节点或拖拽连接节点",
                        "zoomIn": "放大",
                        "zoomOut": "缩小",
                        "addNode": "添加节点",
                        "tidyNode": "整理节点",
                        "more": "更多",
                        "close": "关闭"
                    },
                    contextMenu: {
                        "copy": "复制",
                        "delete": "删除"
                    },
                    btn: {
                        "save": "保存",
                        "run": "运行",
                        "stop": "停止",
                        "deploy": "发布"
                    },
                    other: {
                        autoSave: "自动保存于"
                    },
                    errMsg: {
                        "inputRequired": "缺少输入节点",
                        "outputRequired": "缺少输出节点",
                        "nodeRequired": `必须有一个<%=name%>节点`
                    }
                }
            }
        };

        var defaultCfg = {
            lang: "en",
            data: {},
            mode: "edit",
            topOffset: 0,
            save: {
                disabled: false,
                onSave: function (data, callback) {
                    setTimeout(function () {
                        callback();
                    }, 1000);
                }
            },
            run: {
                disabled: false,
                onRun: function (data, callback) {
                    setTimeout(function () {
                        callback();
                    }, 1000);
                }
            },
            stop: {
                disabled: false,
                onStop: function (callback) {
                    setTimeout(function () {
                        callback();
                    }, 1000);
                }
            },
            deploy: {
                disabled: false,
                onDeploy: function (data, callback) {
                    setTimeout(function () {
                        callback();
                    }, 1000);
                }
            },
            autoSave: {
                enabled: false,
                interval: 60, // seconds
                ignoreError: false,
                onSave: function (data, callback) {
                    callback();
                }
            },
            nodes: {
                "start": {
                    name: "Start",
                    icon: {
                        bi: "house-door",
                        color: "#fff",
                        bgColor: "primary"
                    },
                    input: {
                        max: -1
                    },
                    output: {
                        max: 0
                    },
                    max: 1,
                    settings: {
                        tpl: `
                            <div class="mb-3">
                                <textarea class="form-control" rows="3" name="description" placeholder="Description"></textarea>
                            </div>
                        `,
                        bindEvent: function (context, settings, data, node) { },
                        onChange: function (context, elem) { },
                        data: function (settings, formData) {
                            return formData;
                        }
                    },
                    disabled: true
                },
                "end": {
                    name: "End",
                    icon: {
                        bi: "box2",
                        color: "#fff",
                        bgColor: "success"
                    },
                    input: {
                        max: 0 // no limit
                    },
                    output: {
                        max: -1
                    },
                    settings: {
                        tpl: `
                            <div class="mb-3">
                                <textarea class="form-control" rows="3" name="description" placeholder="Description"></textarea>
                            </div>
                        `,
                        bindEvent: function (context, settings, data, node) { },
                        onChange: function (context, elem) { },
                        data: function (settings, formData) {
                            return formData;
                        }
                    },
                    max: 1
                }
            },
            required: ["start"]
        };
        var langOpt = lang[options.lang] ? lang[options.lang] : lang["en"];
        options = $.extend(true, {}, defaultCfg, langOpt, options);

        var tpl = `
            <div class="p-workflow">
                <div class="pane">
                    <div class="viewport">
                        <svg width="100%" height="100%"></svg>
                        <div class="menu">
                            <% _.each(Object.keys(opt.nodes), function(type) { 
                                var node = opt.nodes[type];
                                if (node.disabled) {
                                    return;
                                }
                            %>
                            <div class="item" type="<%=type%>">
                                <a href="javascript:void(0)">
                                    <div class="icon<% if (node.icon.bgColor) { %> bg-<%=node.icon.bgColor%><% } %>"<% if (node.icon.color) { %> style="color:<%=node.icon.color%>"<% } %>>
                                        <i class="bi bi-<%=node.icon.bi%>"></i>
                                    </div>
                                    <div class="name"><%=node.name%></div>
                                </a>
                            </div>
                            <% }); %>
                        </div>
                    </div>
                </div>
                <div class="zoom">
                    <a href="javascript:void(0)" zoom-out class="inout" title="<%=opt.text.tooltip.zoomOut%>" p-tooltip>
                        <i class="bi bi-zoom-out"></i>
                    </a>
                    <div class="scale" value="1">100%</div>
                    <a href="javascript:void(0)" zoom-in class="inout" title="<%=opt.text.tooltip.zoomIn%>" p-tooltip>
                        <i class="bi bi-zoom-in"></i>
                    </a>
                    <div class="select">
                        <div class="item" value="2">
                            <a href="javascript:void(0)">200%</a>
                        </div>
                        <div class="item" value="1.5">
                            <a href="javascript:void(0)">150%</a>
                        </div>
                        <div class="item" value="1">
                            <a href="javascript:void(0)">100%</a>
                        </div>
                        <div class="item" value="0.75">
                            <a href="javascript:void(0)">75%</a>
                        </div>
                        <div class="item" value="0.5">
                            <a href="javascript:void(0)">50%</a>
                        </div>
                        <div class="item" value="0.3">
                            <a href="javascript:void(0)">30%</a>
                        </div>
                    </div>
                </div>
                <div class="toolbar">
                    <% if (opt.mode == "edit") { %>
                    <div class="tool" add>
                        <a href="javascript:void(0)" title="<%=opt.text.tooltip.addNode%>">
                            <i class="bi bi-plus-circle-fill"></i>
                        </a>
                    </div>
                    <% } %>
                    <div class="tool" tidy>
                        <a href="javascript:void(0)" title="<%=opt.text.tooltip.tidyNode%>">
                            <i class="bi bi-layout-wtf"></i>
                        </a>
                    </div>
                    <div class="menu-add">
                        <% _.each(Object.keys(opt.nodes), function(type) { 
                            var node = opt.nodes[type];
                            if (node.disabled) {
                                return;
                            }
                        %>
                        <div class="item" type="<%=type%>">
                            <a href="javascript:void(0)">
                                <div class="icon<% if (node.icon.bgColor) { %> bg-<%=node.icon.bgColor%><% } %>"<% if (node.icon.color) { %> style="color:<%=node.icon.color%>"<% } %>>
                                    <i class="bi bi-<%=node.icon.bi%>"></i>
                                </div>
                                <div class="name"><%=node.name%></div>
                            </a>
                        </div>
                        <% }); %>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-header">
                        <div class="info">
                            <div class="icon">
                                <i class="bi"></i>
                            </div>
                            <div class="name"></div>
                        </div>
                        <div class="tools">
                            <div class="tools-ext"></div>
                            <div class="tools-fixed">
                                <div class="tool more" more>
                                    <a href="javascript:void(0)" title="<%=opt.text.tooltip.more%>" p-tooltip>
                                        <i class="bi bi-three-dots"></i>
                                    </a>
                                </div>
                                <div class="separator"></div>
                                <div class="tool close" close>
                                    <a href="javascript:void(0)" title="<%=opt.text.tooltip.close%>" p-tooltip>
                                        <i class="bi bi-x-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="settings">
                            <form class="g-3 needs-validation" onsubmit="return false;">
                                
                            </form>
                        </div>
                        <% if (opt.mode == "readonly") { %>
                        <div class="panel-overlay"></div>
                        <% } %>
                    </div>
                </div>

                <div class="topbar">
                    <div class="info">
                        <% if (opt.autoSave.enabled && opt.mode == "edit") { %>
                        <div class="auto-save-time">
                            <span><%=opt.text.other.autoSave%></span>
                            <span autoSaveTime></span>
                        </div>
                        <% } %>
                    </div>
                    <div class="tools">
                        <% if (opt.mode == "edit" && !opt.save.disabled) { %>
                        <button type="button" class="btn btn-light" save op>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-floppy"></i><%=opt.text.btn.save%>
                        </button>
                        <% } %>
                        <% if (opt.mode == "edit" && !opt.run.disabled) { %>
                        <button type="button" class="btn btn-light" run op>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-play"></i><%=opt.text.btn.run%>
                        </button>
                        <% } %>
                        <% if (!opt.stop.disabled) { %>
                        <button type="button" class="btn btn-light" stop<% if (opt.mode != "run") { %> style="display: none"<% } %>>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-stop-circle"></i><%=opt.text.btn.stop%>
                        </button>
                        <% } %>
                        <% if (opt.mode == "edit" && !opt.deploy.disabled) { %>
                        <button type="button" class="btn btn-light" deploy op>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-send"></i><%=opt.text.btn.deploy%>
                        </button>
                        <% } %>
                    </div>
                </div>

                <div class="menu-context">
                    <div class="item" copy>
                        <a href="javascript:void(0)"><%=opt.text.contextMenu.copy%></a>
                    </div>
                    <div class="item" delete>
                        <a href="javascript:void(0)"><%=opt.text.contextMenu.delete%></a>
                    </div>
                </div>

                <div class="settings-backup"></div>

                <div class="overlay"></div>
            </div>
            <div class="position-fixed top-0 end-0 p-3" style="z-index: 999">
                <div class="toast align-items-center text-white bg-danger border-0" data-bs-delay="5000" errmsg>
                    <div class="d-flex">
                        <div class="toast-body"></div>
                    </div>
                </div>
            </div>
        `;

        var _nodeTpl = `
            <% 
                var node = opt.nodes[type];
            %>
            <div class="node" node-id="<%=id%>"<% if (type == "start") { %> start<% } %> type="<%=type%>" x="<%=x%>" y="<%=y%>" style="transform: translate(<%=x%>px, <%=y%>px);" parent-id="<%=parentId%>" level="<%=level%>" index="<%=index%>">
                <div class="header" header>
                    <div class="welding left"<% if (parentId) { %> style="display: block"<% } %> max="<%=node.input.max%>"<% if (type != "start") { %> required<% } %>></div>
                    <div class="content">
                        <div class="icon<% if (node.icon.bgColor) { %> bg-<%=node.icon.bgColor%><% } %>"<% if (node.icon.color) { %> style="color:<%=node.icon.color%>"<% } %>>
                            <i class="bi bi-<%=node.icon.bi%>"></i>
                        </div>
                        <div class="name"><%=node.name%></div>
                    </div>
                    <div class="waiting">
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div class="progress" progress></div>
                    <% if (node.output.max >= 0) { %>
                    <div class="welding right" max="<%=node.output.max%>"<% if (node.output.required) { %> required<% } %>></div>
                    <a class="plus" title="<%=opt.text.tooltip.plus%>" p-tooltip>
                        <i class="bi bi-plus-circle-fill"></i>
                    </a>
                    <% } %>
                </div>
                <% if (node.body) { %>
                <div class="body" body></div>
                <% } %>
                <div class="footer" description></div>
            </div>`;

        var _errorTpl = `
            <div class="error">
                <i class="bi bi-exclamation-circle"></i>
                <div class="msg"><%=msg%></div>
            </div>
        `;

        self.append($(_.template(tpl)({
            opt: options
        })));

        function Context(nodeId, data, parentContext) {
            var _nodeId = nodeId;
            var _data = {};
            var _pctxs = {};

            if (data) {
                _data = $.extend(true, {}, data);
            }

            _addParent(parentContext);
            function _addParent(parentContext) {
                if (parentContext) {
                    _pctxs[parentContext.nodeId()] = parentContext;
                }
            }

            function _removeParent(parentContext) {
                delete _pctxs[parentContext.nodeId()];
            }

            function _getNodeId() {
                return _nodeId;
            }

            function _set(key, value) {
                _data[key] = value;
                _contextChange(_nodeId);
            }

            function _get(key) {
                return _data[key];
            }

            function _delete(key) {
                delete _data[key];
                _contextChange(_nodeId);
            }

            function _getData() {
                return $.extend(true, {}, _data);
            }

            function _getParents() {
                return _pctxs;
            }

            function _getParentData() {
                var data = {};
                for (var nodeId in _pctxs) {
                    var parent = _pctxs[nodeId];
                    var pdata = parent.data();
                    for (var key in pdata) {
                        var value = pdata[key];
                        if (data[key]) {
                            if (!$.isArray(data[key])) {
                                data[key] = [data[key]];
                            }
                            if (!$.isArray(value)) {
                                value = [value];
                            }
                            // concat & deduplicate
                            data[key] = data[key].concat(value).filter(function (item, index, self) {
                                return self.indexOf(item) === index;
                            });
                        } else {
                            data[key] = value;
                        }
                    }
                }
                return data;
            }

            function _allData(merge) {
                var data = {};
                if (merge) {
                    data = _getData();
                    for (var parentNodeId in _pctxs) {
                        var pctx = _pctxs[parentNodeId];
                        var pctxAlldata = pctx.allData(merge);
                        for (var key in pctxAlldata) {
                            var value = pctxAlldata[key];
                            if (data[key]) {
                                if (!$.isArray(data[key])) {
                                    data[key] = [data[key]];
                                }
                                if (!$.isArray(value)) {
                                    value = [value];
                                }
                                // concat & deduplicate
                                data[key] = data[key].concat(value).filter(function (item, index, self) {
                                    return self.indexOf(item) === index;
                                });
                            } else {
                                data[key] = value;
                            }
                        }
                    }
                } else {
                    data[_nodeId] = _getData();
                    for (var parentNodeId in _pctxs) {
                        var pctx = _pctxs[parentNodeId];
                        var pctxAlldata = pctx.allData();
                        for (var nodeId in pctxAlldata) {
                            data[nodeId] = pctxAlldata[nodeId];
                        }
                    }
                }
                return data;
            }

            return {
                set: _set,
                get: _get,
                delete: _delete,
                data: _getData,
                allData: _allData,
                nodeId: _getNodeId,
                addParent: _addParent,
                removeParent: _removeParent,
                getParents: _getParents,
                getParentData: _getParentData
            }
        }

        var contexts = {};

        var workflow = self.find(".p-workflow");
        var pane = self.find(".pane");
        var viewport = self.find(".viewport");
        var svg = viewport.find("svg");
        var menu = viewport.find(".menu");
        var zoom = self.find(".zoom");
        var toolbar = self.find(".toolbar");
        var addMenu = self.find(".menu-add");
        var contextMenu = self.find(".menu-context");
        var panel = self.find(".panel");
        var settingsBackup = self.find(".settings-backup");
        var overlay = self.find(".overlay");

        if (options.mode == "run") {
            panel.css("top", "10px");
        } else if (options.mode == "readonly") {
            panel.find(".panel-body").on("scroll", function () {
                $(this).find(".panel-overlay").css("top", $(this).scrollTop() + "px");
            });
        }

        // size
        function _height() {
            workflow.css("height", $(window).height() - options.topOffset);
        }
        _height();
        $(window).on("resize", function () {
            _height();
        });

        // initialize
        var nodePath = {};
        function _findChildByPathIn(children, pathId) {
            var node;
            $.each(children, function (i, child) {
                var nodeId = $(child).attr("node-id");
                for (var inPathId in options.data[nodeId].in) {
                    if (inPathId == pathId) {
                        node = $(child);
                        return;
                    }
                }
            });
            return node;
        }
        function _setData(data) {
            options.data = data;
            viewport.find(".node").remove();
            svg.find("path").remove();
            panel.find(".settings form").html("");
            settingsBackup.html("");

            // add nodes
            var nodes = [];
            for (var nodeId in data) {
                nodes.push(data[nodeId]);
            }
            nodes.sort(function (node1, node2) {
                if (node1.level < node2.level) {
                    return -1;
                } else if (node1.level > node2.level) {
                    return 1
                } else {
                    return node1.index - node2.index;
                }
            });
            nodes.forEach(function (node) {
                _addNode(node.type, node.nodeId, node.pos, node.parentId, node.level, node.index, node.settings, node.context);
                viewport.find(".node[type='start']").attr("start", "");
            });

            // add paths
            $.each(viewport.find(".node"), function (i, node) {
                var nodeId = $(node).attr("node-id");
                var children = viewport.find(".node[parent-id*='" + nodeId + "']");
                if (children.length == 0) {
                    return;
                }
                var out = data[nodeId].out;
                $.each($(node).find(".plus"), function (i, plus) {
                    var pathOutOffsetY = _pathOutOffsetY($(plus), true);
                    var outWelding = $(plus).prev(".welding.right");
                    var index = $(plus).closest(".node").find(".welding.right").index(outWelding);
                    var nodeId = $(plus).closest(".node").attr("node-id");
                    for (var pathId in out) {
                        if (out[pathId] == index) { // find pathId of out by index
                            var child = _findChildByPathIn(children, pathId);
                            var pathInOffsetY = _pathInOffsetY(child, true);
                            _addPath(
                                pathId, child, $(node),
                                { x: Number(child.attr("x")), y: Number(child.attr("y")) },
                                pathOutOffsetY, pathInOffsetY
                            );
                            nodePath[nodeId].out[pathId] = index;
                            nodePath[child.attr("node-id")].in[pathId] = index;
                            _addMultiId(outWelding, "path-id", pathId);
                            outWelding.show();
                            var inWelding = child.find(".welding.left");
                            _addMultiId(inWelding, "path-id", pathId);
                            inWelding.show();
                        }
                    }
                });
            });
        }
        if (options.data) {
            _setData(options.data);
        }

        // validate
        function _toastErr(msg) {
            $("[errmsg] .toast-body").text(msg);
            $("[errmsg]").toast("show");
        }
        function _clearError() {
            viewport.find(".node").removeClass("error");
            panel.find(".errors").html("");
            panel.find(".errors").hide();
            settingsBackup.find(".errors").html("");
            settingsBackup.find(".errors").hide();
        }
        function _validate(checkOnly) {
            if (!checkOnly) {
                _clearError();
            }

            var valid = true;
            $.each(settingsBackup.children("[node-id]"), function (i, item) {
                var form = $(item);
                if (!$.validate(form)) {
                    valid = false;
                    if (!checkOnly) {
                        var nodeId = form.attr("node-id");
                        viewport.find(".node[node-id='" + nodeId + "']").addClass("error");
                    }
                }
            });
            var settings = panel.find(".settings [node-id]");
            if (settings.length > 0) {
                if (!$.validate(settings)) {
                    valid = false;
                    if (!checkOnly) {
                        var nodeId = settings.attr("node-id");
                        viewport.find(".node[node-id='" + nodeId + "']").addClass("error");
                    }
                }
            }

            if (!valid) {
                return valid;
            }

            function _error(key) {
                return $(_.template(_errorTpl)({
                    msg: options.text.errMsg[key]
                }));
            }

            $.each(viewport.find(".node"), function (i, node) {
                var weldings = $(node).find(".welding[required]");
                var nodeId = $(node).attr("node-id");
                $.each(weldings, function (i, welding) {
                    if (!$(welding).attr("path-id")) {
                        if (!checkOnly) {
                            $(node).addClass("error");
                            var key = $(welding).hasClass("left") ? "inputRequired" : "outputRequired";
                            panel.find(".settings [node-id='" + nodeId + "'] .errors").append(_error(key)).show();
                            settingsBackup.find("[node-id='" + nodeId + "'] .errors").append(_error(key)).show();
                        }
                        valid = false;
                        return;
                    }
                });
            });

            if (!valid) {
                return valid;
            }

            for (var i = 0; i < options.required.length; i++) {
                var nodeType = options.required[i];
                if (viewport.find(".node[type='" + nodeType + "']").length == 0) {
                    if (!checkOnly) {
                        var nodeName = options.nodes[nodeType].name;
                        var msg = _.template(options.text.errMsg["nodeRequired"])({
                            name: nodeName
                        });
                        _toastErr(msg);
                    }
                    valid = false;
                    return;
                }
            }

            return valid
        }

        // worflow config data & form data
        function _serialize() {
            var data = {};
            $.each(viewport.find(".node"), function (i, node) {
                var nodeId = $(node).attr("node-id");
                var nodeType = $(node).attr("type");
                var parentId = $(node).attr("parent-id");
                var level = Number($(node).attr("level"));
                var index = Number($(node).attr("index"));
                var pos = { x: Number($(node).attr("x")), y: Number($(node).attr("y")) };

                var form = settingsBackup.children("[node-id='" + nodeId + "']");
                if (form.length == 0) {
                    form = panel.find(".settings form [node-id='" + nodeId + "']");
                }
                var settings = {};
                if (form.length > 0) {
                    var formData = $.formData(form);
                    var cfg = options.nodes[nodeType].settings;
                    settings = cfg.data(form, formData);
                }

                data[nodeId] = {
                    nodeId: nodeId,
                    type: nodeType,
                    parentId: parentId,
                    level: level,
                    index: index,
                    pos: pos,
                    out: nodePath[nodeId].out,
                    in: nodePath[nodeId].in,
                    settings: settings,
                    context: contexts[nodeId].data()
                };
            });

            return data;
        }

        function _op(handler, elem) {
            if (!_validate()) {
                return;
            }
            overlay.show();
            elem.find("[waiting]").css("display", "inline-block");
            elem.find("i").hide();
            handler(_serialize(), function () {
                elem.find("[waiting]").hide();
                elem.find("i").show();
                overlay.hide();
            });
        }

        // save & run & deploy
        self.find("[save]").on("click", function () {
            _op(options.save.onSave, $(this));
        });
        self.find("[run]").on("click", function () {
            self.find("[op]").hide();
            self.find("[stop]").show();
            options.run.onRun(_serialize(), function () {
                self.find("[op]").show();
                self.find("[stop]").hide();
            });
        });
        self.find("[stop]").on("click", function () {
            var elem = $(this);
            overlay.show();
            elem.find("[waiting]").css("display", "inline-block");
            elem.find("i").hide();
            options.stop.onStop(function () {
                overlay.hide();
                self.find("[op]").show();
                self.find("[stop]").hide();
                elem.find("[waiting]").css("display", "none");
                elem.find("i").show();
            });
        });
        self.find("[deploy]").on("click", function () {
            _op(options.deploy.onDeploy, $(this));
        });
        var autoSaveTimer
        if (options.autoSave.enabled) {
            function _save() {
                options.autoSave.onSave(_serialize(), function () {
                    var time = moment().format("HH:mm:ss");
                    self.find("[autoSaveTime]").text(time);
                    self.find("[autoSaveTime]").closest(".auto-save-time").show();
                });
            }

            autoSaveTimer = setInterval(function () {
                if (!options.autoSave.ignoreError) {
                    if (_validate(true)) {
                        _save();
                    }
                } else {
                    _save();
                }
            }, options.autoSave.interval * 1000);
        }

        // pane & viewport
        var offset = { x: 0, y: 0 };
        var start = false;
        viewport.css("transform", `translate(${offset.x}px, ${offset.y}px) scale(1)`);
        viewport.attr("x", offset.x).attr("y", offset.y).attr("scale", 1);
        pane.bindDragMove(function (e, pos, obj) {
            start = true;
            pane.addClass("dragging");
            startPos = pos;
            viewport.find(".node").removeAttr("dragging");
            var x = Number(viewport.attr("x"));
            var y = Number(viewport.attr("y"));
            viewport.attr("sx", pos.x - x);
            viewport.attr("sy", pos.y - y);
        }, function (e, pos, speed, obj) {
            var sx = Number(viewport.attr("sx"));
            var sy = Number(viewport.attr("sy"));
            var x = pos.x - sx;
            var y = pos.y - sy;
            var scale = viewport.attr("scale");
            pane.css("background-position", `${x}px ${y}px`);
            viewport.css("transform", `translate(${x}px, ${y}px) scale(${scale})`);
            viewport.attr("x", x).attr("y", y);
        }, function (e, pos, speed) {
            if (start) {
                start = false;
            } else {
                return;
            }
            pane.removeClass("dragging");
        });

        // node
        var nodeHMargin = 100;
        var nodeVMargin = 40;

        function _id(prefix) {
            return `${prefix}_${new Date().getTime()}`;
        }

        function _addMultiId(obj, name, id) {
            var ids = obj.attr(name);
            if (ids) {
                ids = ids.split(",");
            } else {
                ids = [];
            }
            ids.push(id);
            obj.attr(name, ids.join(","));
        }

        function _removeMultiId(obj, name, id) {
            var ids = obj.attr(name);
            if (ids) {
                ids = ids.split(",");
                var index = ids.indexOf(id);
                if (index >= 0) {
                    ids.splice(index, 1);
                    obj.attr(name, ids.join(","));
                }
            }
        }

        function _pathIds(nodeId) {
            var pathIn = nodePath[nodeId].in;
            var pathOut = nodePath[nodeId].out;
            var pathIds = Object.keys(pathIn).concat(Object.keys(pathOut));
            return pathIds;
        }

        function _stagger(x, y) {
            function _occupied(x, y) {
                var occupied = viewport.find(".node[x='" + x + "'][y='" + y + "']");
                return occupied.length > 0
            }

            if (_occupied(x, y)) {
                return _stagger(x + 20, y + 40);
            }

            return { x: x, y: y };
        }

        function _checkWelding(node, welding, inout) {
            var max = Number(welding.attr("max"));
            if (max <= 0) {
                return true;
            }

            var clazz = inout == "in" ? "left" : "right";
            var nodeId = node.attr("node-id");
            var index = node.find(`.welding.${clazz}`).index(welding);
            var count = 0;
            if (nodePath[nodeId]) {
                for (var pathId in nodePath[nodeId][inout]) {
                    var i = nodePath[nodeId][inout][pathId];
                    if (i == index) {
                        count++;
                    }
                }
            }
            if (count >= max) {
                return false;
            }
            return true;
        }

        function _checkWeldingOut(node, welding) {
            return _checkWelding(node, welding, "out");
        }

        function _checkWeldingIn(node, welding) {
            return _checkWelding(node, welding, "in");
        }

        function _showWelding(welding) {
            if (welding && welding.attr("path-id") && welding.attr("path-id").length > 0) {
                welding.show();
            }
        }

        // add start node by default
        if (!options.data || Object.keys(options.data).length == 0) {
            _addNode("start", "n_0", { x: 80, y: 260 }, "", 1, "");
        }

        function _addNode(type, id, pos, parentId, level, index, data, contextData) {
            var nodeCfg = options.nodes[type];
            if (nodeCfg.max > 0 && viewport.find(".node[type='" + type + "']").length >= nodeCfg.max) {
                return;
            }
            var node = $(_.template(_nodeTpl)({
                id: id,
                x: pos.x,
                y: pos.y,
                parentId: parentId,
                level: level,
                index: index,
                type: type,
                opt: options
            }));
            if (nodeCfg.body) {
                if (typeof (nodeCfg.body) == "string") {
                    node.find(".body").html(nodeCfg.body);
                } else {
                    node.find(".body").append(nodeCfg.body);
                }
            }

            nodePath[id] = {
                in: {},
                out: {}
            };

            menu.before(node);

            if (options.mode == "run" || options.mode == "readonly") {
                node.find(".header").on("mouseover", function () {
                    $(this).find(".plus").hide();
                });
                node.find(".body").on("mouseover", function () {
                    $(this).find(".plus").hide();
                });
            }

            if (data && data["description"]) {
                node.find("[description]").text(data["description"]);
                node.find("[description]").show();
            }

            _bindAdd(node);
            _bindSelect(node);
            _bindDragMove(node);
            if (options.mode == "edit" && type != "start") {
                _bindContextMenu(node);
            }

            var context = new Context(id, contextData);
            if (parentId) {
                var parentIds = parentId.split(",");
                parentIds.forEach(function (id) {
                    if (contexts[id]) {
                        context.addParent(contexts[id]);
                    }
                });
            }
            contexts[id] = context;

            var settings = options.nodes[type].settings;
            if (settings && settings.tpl != undefined) {
                var ctx = $(`
                    <div node-id="${id}" settings class="needs-validation">
                        <div class="errors"></div>
                        ${settings.tpl}
                    </div>`
                );
                settingsBackup.append(ctx);
                if (data) {
                    $.setFormData(ctx, data);
                }

                panel.on("click", function () {
                    $(this).find(".multiselect .select").hide();
                    $(this).find(".p-cond .select").prev(".selected").removeClass("changing");
                });

                // validation
                ctx.find("input,textarea,select").on("change", function () {
                    var nodeId = $(this).closest("[node-id]").attr("node-id");
                    var node = viewport.find(".node[node-id='" + nodeId + "']");
                    if ($.validate($(this).closest("form"))) {
                        node.removeClass("error");
                    } else {
                        node.addClass("error");
                    }
                });

                // description
                ctx.find("textarea[name='description']").on("keyup", function () {
                    var nodeId = $(this).closest(".panel").attr("node-id");
                    var node = viewport.find(".node[node-id='" + nodeId + "']");
                    var description = $(this).val();
                    node.find("[description]").text(description);
                    if (description.length > 0) {
                        node.find("[description]").show();
                    } else {
                        node.find("[description]").hide()
                    }
                });

                ctx.on("click", function () {
                    ctx.find(".dropdown-menu").removeClass("show");
                    ctx.find(".dropdown-toggle").removeClass("show");
                });

                // bind events
                settings.bindEvent(context, {
                    elem: ctx,
                    validation: function (item) {
                        item.find("input").on("change", function () {
                            var nodeId = $(this).closest("[node-id]").attr("node-id");
                            var node = viewport.find(".node[node-id='" + nodeId + "']");
                            if ($.validate($(this).closest("form"))) {
                                node.removeClass("error");
                            } else {
                                node.addClass("error");
                            }
                        });
                    },
                }, data, {
                    elem: node,
                    add: function (item) {
                        var node = item.closest(".node");
                        _adjustNodeOut(node);
                        _bindAdd(node);
                    },
                    remove: function (item) {
                        var welding = item.find(".welding");
                        var pathId = welding.attr("path-id");
                        if (pathId && pathId.length > 0) {
                            var pathIds = pathId.split(",");
                            pathIds.forEach(function (pathId) {
                                _deletePath(pathId);
                            });
                        }
                        var node = item.closest(".node");
                        item.remove();
                        _adjustNodeOut(node);
                    }
                });
            }

            _clearError();

            return node;
        }

        function _getSettings(nodeId) {
            var settings = settingsBackup.find("[node-id='" + nodeId + "']");
            if (settings.length == 0) {
                settings = panel.find(".settings [node-id='" + nodeId + "']");
            }
            return settings;
        }

        function _contextChange(nodeId) {
            var node = viewport.find(".node[node-id='" + nodeId + "']");
            if (node.length > 0) {
                var nodeType = node.attr("type");
                options.nodes[nodeType].settings.onChange(contexts[nodeId], _getSettings(nodeId));
            }
            var children = viewport.find(".node[parent-id*='" + nodeId + "']");
            $.each(children, function (i, child) {
                _contextChange($(child).attr("node-id"));
            });
        }

        var cOutWelding;
        var cInWelding;
        function _pathOutOffsetY(plus, noSwitch) {
            var welding = plus.prev(".welding.right");
            if (!noSwitch) {
                cOutWelding = welding;
            }
            welding.show();
            var scale = _getScale();
            var wy = welding.position().top + welding.height() / 2 + 1;
            var py = 0;
            if (plus.closest(".item").length > 0) {
                py = plus.closest(".item").position().top;
            } else if (plus.closest(".header").length > 0) {
                py = plus.closest(".header").position().top;
            }
            if (!welding.attr("path-id")) {
                welding.hide();
            }
            return (wy + py) / scale + (scale >= 1 ? (scale - 1) * 3 : (scale - 1) * 8);
        }
        function _pathInOffsetY(node, noSwitch) {
            var welding = node.find(".welding.left");
            cInWelding = welding;
            if (!noSwitch) {
                welding.show();
            }
            var scale = _getScale();
            var offset = welding.position().top + welding.height() / 2 + 1 + welding.closest(".header").position().top;
            if (!welding.attr("path-id")) {
                welding.hide();
            }
            return offset / scale + (scale >= 1 ? (scale - 1) * 3 : (scale - 1) * 8);
        }

        function _bindAdd(node) {
            node.find(".plus:not([binded])").on("click", function (e) {
                e.stopPropagation();
                addMenu.hide();
                menu.show();
                var node = $(this).closest(".node");
                var x = Number(node.attr("x"));
                var y = Number(node.attr("y"));
                menu.css("left", node.width() + x + 40);
                menu.css("top", y - menu.height() / 2 + 14);
                menu.attr("node-id", node.attr("node-id"));
                menu.attr("po-offset-y", _pathOutOffsetY($(this)));
                contextMenu.hide();
            });

            var startPos;
            var pathId;
            var stoppedNode;
            var parent;
            $.each(node.find(".plus:not([binded]"), function (i, plus) {
                $(plus).bindDragMove(function (e, pos, obj) {
                    e.stopPropagation();

                    startPos = pos;

                    var pathOutOffsetY = _pathOutOffsetY(obj);
                    var node = obj.closest(".node");
                    parent = node;

                    var nx = Number(node.attr("x"));
                    var ny = Number(node.attr("y"));
                    var sx = nx + node.width();
                    var sy = ny + pathOutOffsetY;
                    var ex = sx;
                    var ey = sy;
                    var cl = (ex - sx) / 3;
                    var c1x = sx + cl;
                    var c2x = sx + 2 * cl;
                    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    pathId = _id("p");
                    path.setAttribute("d", `M ${sx + 17} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`);
                    path.setAttribute("class", "path");
                    path.setAttribute("path-id", pathId);
                    path.setAttribute("ex", ex);
                    path.setAttribute("ey", ey);
                    path.setAttribute("out-offset-y", pathOutOffsetY);
                    svg.append(path);

                    viewport.find(".node").on("mouseover", function () {
                        stoppedNode = $(this);
                    });
                    viewport.find(".node").on("mouseout", function () {
                        stoppedNode = undefined;
                    });
                }, function (e, pos, speed, obj) {
                    e.stopPropagation();
                    var path = svg.find("path[path-id='" + pathId + "']");
                    var sex = Number(path.attr("ex"));
                    var sey = Number(path.attr("ey"));
                    var scale = _getScale();
                    var ex = sex + (pos.x - startPos.x + obj.width()) / scale;
                    var ey = sey + (pos.y - startPos.y) / scale;
                    _changePathIn(pathId, ex, ey);
                }, function (e, pos, speed) {
                    e.stopPropagation();
                    if (!pathId) {
                        return;
                    }

                    var path = svg.find("path[path-id='" + pathId + "']");

                    function _done() {
                        path.remove();
                        stoppedNode = undefined;
                        pathId = "";
                        _showWelding(cOutWelding);
                        _showWelding(cInWelding);
                    }
                    if (!stoppedNode) {
                        _done();
                        return;
                    }

                    var pathInOffsetY = _pathInOffsetY(stoppedNode);
                    if (!_checkWeldingOut(parent, cOutWelding)) {
                        _done();
                        return;
                    }
                    if (!_checkWeldingIn(stoppedNode, cInWelding)) {
                        _done();
                        return;
                    }

                    var parentId = parent.attr("node-id");
                    var nodeId = stoppedNode.attr("node-id");
                    var parentLevel = Number(parent.attr("level"));
                    var level = Number(stoppedNode.attr("level"));

                    // check if allowed
                    var allow = true;
                    if (parentId == nodeId || (level != 0 && (level <= 2 || level < parentLevel))) {
                        allow = false;
                    } else {
                        for (var p in nodePath[parentId].out) {
                            if (nodePath[nodeId].in[p] != undefined) {
                                allow = false;
                            }
                        }
                    }
                    if (!allow) {
                        _done();
                        return
                    }

                    var x = Number(stoppedNode.attr("x"));
                    var y = Number(stoppedNode.attr("y"));
                    var newIndex = parent.find(".welding.right").index(cOutWelding);
                    var index = Number(stoppedNode.attr("index"));
                    if (level < parentLevel + 1) {
                        level = parentLevel + 1;
                    }
                    if (index < newIndex) {
                        index = newIndex;
                    }

                    _addMultiId(stoppedNode, "parent-id", parentId)
                    stoppedNode.attr("level", level);
                    stoppedNode.attr("index", index);

                    path.attr("in-offset-y", pathInOffsetY);
                    path.attr("out-node-id", parentId);
                    path.attr("in-node-id", nodeId);

                    var pathArea = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    pathArea.setAttribute("d", path.attr("d"));
                    pathArea.setAttribute("path-area-id", pathId);
                    pathArea.setAttribute("class", "path-area");
                    svg.append(pathArea);

                    _bindSelectPath(pathId);

                    _changePathIn(pathId, x, y + pathInOffsetY);

                    _addMultiId(cOutWelding, "path-id", pathId);
                    cOutWelding.show();
                    _addMultiId(cInWelding, "path-id", pathId);
                    cInWelding.show();

                    nodePath[parent.attr("node-id")].out[pathId] = parent.find(".welding.right").index(cOutWelding);
                    nodePath[nodeId].in[pathId] = stoppedNode.find(".welding.left").index(cInWelding);

                    _movePathOut(parent);

                    stoppedNode = undefined;
                    pathId = "";

                    // context
                    contexts[nodeId].addParent(contexts[parentId]);
                    _contextChange(nodeId);

                    _clearError();
                });
            });
            node.find(".plus:not([binded])").attr("binded", true);
        }

        function _bindSelect(node) {
            node.on("click", function (e) {
                e.stopPropagation();
                if ($(this).attr("dragging")) {
                    return;
                }
                viewport.find(".node").removeClass("selected");
                $(this).addClass("selected");

                var nodeId = $(this).attr("node-id");
                var type = $(this).attr("type");

                var cfg = options.nodes[type];
                panel.find(".panel-header .info>.icon").attr("class", "icon bg-" + cfg.icon.bgColor);
                panel.find(".panel-header .info>.icon i").attr("class", "bi bi-" + cfg.icon.bi);
                panel.find(".panel-header .info>.icon i").css("color", cfg.icon.color);
                panel.find(".panel-header .info>.name").text(cfg.name);

                if (options.mode == "edit" || options.mode == "readonly") {
                    panel.attr("node-id", nodeId);

                    if (options.mode == "readonly") {
                        panel.find(".tool.more").hide();
                    } else {
                        if ($(this).attr("start") != undefined) {
                            panel.find(".tool.more").hide();
                        } else {
                            panel.find(".tool.more").show();
                        }
                    }

                    function _backup() {
                        var settings = panel.find(".settings [node-id]");
                        var nodeId = settings.attr("node-id");
                        if (viewport.find(".node[node-id='" + nodeId + "']").length > 0) {
                            settingsBackup.append(settings);
                        } else {
                            settings.remove();
                        }
                    }

                    contextMenu.hide();
                    if (panel.find(".settings [node-id='" + nodeId + "']").length == 0) {
                        var ctx = settingsBackup.children("[node-id='" + nodeId + "']");
                        _backup();
                        panel.find(".settings form").append(ctx);
                        panel.find(".errors .error").closest(".errors").show();
                    }

                    panel.css("right", "8px");
                } else if (options.mode == "run") {
                    panel.find(".tool.more").hide();
                    var resultCfg = cfg.result;
                    if (!resultCfg) {
                        var width = Number(panel.attr("width"));
                        panel.css("right", -(width + 30));
                        return;
                    }
                    var currentNodeId = panel.attr("node-id");
                    if (currentNodeId) {
                        var elem = panel.find(".settings form").children();
                        resultCfg.onLeave(elem, currentNodeId);
                    }
                    panel.attr("node-id", nodeId);
                    var elem = $(resultCfg.tpl);
                    panel.find(".settings form").html("");
                    panel.find(".settings form").append(elem);
                    resultCfg.onLoad(elem, nodeId);
                    var width = resultCfg.panelWidth ? resultCfg.panelWidth : 400;
                    panel.attr("width", width);
                    panel.css("width", width);
                    panel.css("right", "8px");
                }

                setTimeout(function () {
                    $(window).trigger("p-resize");
                }, 300);
            });
            node.on("mouseover", function (e) {
                e.stopPropagation();
                svg.find("path").removeClass("selected");
                var nodeId = $(this).attr("node-id");
                var pathIds = _pathIds(nodeId)
                pathIds.forEach(function (pathId) {
                    svg.find("path[path-id='" + pathId + "']").addClass("selected");
                });
            });
            node.on("mouseout", function (e) {
                e.stopPropagation();
                svg.find("path").removeClass("selected");
            });
        }
        function _bindSelectPath(pathId) {
            svg.find("path[path-area-id='" + pathId + "']").on("click", function () {
                var path = $(svg.find("path[path-id='" + pathId + "']"));
                svg.find("path").removeClass("selected");
                path.addClass("selected");
                viewport.find(".node").removeClass("selected");
                _closePanel();
            });
        }

        function _pathStart(path) {
            var d = path.attr("d");
            var start = d.split(" C ")[0].replaceAll("M ", "");
            var startPair = start.split(" ");
            var sx = Number(startPair[0]);
            var sy = Number(startPair[1]);
            return { x: sx, y: sy };
        }
        function _pathEnd(path) {
            var d = path.attr("d");
            var end = d.split(", ")[2];
            var endPair = end.split(" ");
            var ex = Number(endPair[0]);
            var ey = Number(endPair[1]);
            return { x: ex, y: ey };
        }
        function _changePathOut(pathId, sx, sy) {
            var path = svg.find("path[path-id='" + pathId + "']");
            var pathArea = svg.find("path[path-area-id='" + pathId + "']");
            var end = _pathEnd(path);
            var ex = end.x;
            var ey = end.y;
            var cl = (ex - sx) / 3;
            var c1x = sx + cl;
            var c2x = sx + 2 * cl;
            path.attr("d", `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`);
            pathArea.attr("d", `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`);
        }
        function _movePathOut(node) {
            var x = Number(node.attr("x"));
            var y = Number(node.attr("y"));
            var nodeId = node.attr("node-id")
            var pathOutIds = Object.keys(nodePath[nodeId].out);
            pathOutIds.forEach(function (pathId) {
                var path = svg.find("path[path-id='" + pathId + "']");
                _changePathOut(pathId, x + node.outerWidth(), y + Number(path.attr("out-offset-y")));
            });
        }
        function _changePathIn(pathId, ex, ey) {
            var path = svg.find("path[path-id='" + pathId + "']");
            var pathArea = svg.find("path[path-area-id='" + pathId + "']");
            var start = _pathStart(path);
            var sx = start.x;
            var sy = start.y;
            var cl = (ex - sx) / 3;
            var c1x = sx + cl;
            var c2x = sx + 2 * cl;
            path.attr("d", `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`);
            pathArea.attr("d", `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`);
        }
        function _movePathIn(node) {
            var x = Number(node.attr("x"));
            var y = Number(node.attr("y"));
            var nodeId = node.attr("node-id");
            var pathInIds = Object.keys(nodePath[nodeId].in);
            pathInIds.forEach(function (pathId) {
                var path = svg.find("path[path-id='" + pathId + "']");
                _changePathIn(pathId, x, y + Number(path.attr("in-offset-y")));
            });
        }
        function _adjustNodeOut(node) {
            var nodeId = node.attr("node-id");
            $.each(node.find(".plus"), function (i, plus) {
                var pathOutOffset = _pathOutOffsetY($(plus), true);
                var welding = $(plus).prev(".welding");
                var pathId = welding.attr("path-id");
                if (pathId) {
                    var pathIds = pathId.split(",");
                    pathIds.forEach(function (pathId) {
                        svg.find("path[path-id='" + pathId + "']").attr("out-offset-y", pathOutOffset);
                        nodePath[nodeId].out[pathId] = i;
                    });
                }
            });
            _movePathOut(node);
        }
        function _bindDragMove(node) {
            node.bindDragMove(function (e, pos, obj) {
                e.stopPropagation();
                var scale = _getScale();
                var x = Number(obj.attr("x"));
                var y = Number(obj.attr("y"));
                node.attr("sx", pos.x / scale - x);
                node.attr("sy", pos.y / scale - y);
                node.removeAttr("dragging");
            }, function (e, pos, speed, obj) {
                e.stopPropagation();
                var scale = _getScale();
                node.attr("dragging", "true");
                var sx = Number(obj.attr("sx"));
                var sy = Number(obj.attr("sy"));
                var x = pos.x / scale - sx;
                var y = pos.y / scale - sy;
                obj.css("transform", `translate(${x}px, ${y}px)`);
                obj.attr("x", x);
                obj.attr("y", y);
                _movePathOut(obj);
                _movePathIn(obj);
            }, function (e, pos, speed) {
                e.stopPropagation();
                if (node.attr("dragging")) {
                    var y = Number(node.attr("y"));
                    var scale = _getScale();
                    if (y < 0) {
                        var vy = Number(viewport.attr("y"));
                        var vx = Number(viewport.attr("x"));
                        var offset = (Math.abs(y) + 30 * scale);
                        if (vy < offset) {
                            vy = offset;
                            var scale = viewport.attr("scale");
                            vy = vy * scale;
                            vx = vx * scale;
                            viewport.css("transform", `translate(${vx}px, ${vy}px) scale(${scale})`);
                            viewport.attr("x", vx).attr("y", vy);
                            pane.css("background-position", `${vx}px ${vy}px`);
                        }
                    }

                    var x = Number(node.attr("x"));
                    if (x < 0) {
                        var vy = Number(viewport.attr("y"));
                        var vx = Number(viewport.attr("x"));
                        var offset = Math.abs(x) + 30 * scale;
                        if (vx < offset) {
                            vx = offset;
                            var scale = viewport.attr("scale");
                            vy = vy * scale;
                            vx = vx * scale;
                            viewport.css("transform", `translate(${vx}px, ${vy}px) scale(${scale})`);
                            viewport.attr("x", vx).attr("y", vy);
                            pane.css("background-position", `${vx}px ${vy}px`);
                        }
                    }
                }
            });
        }
        function _bindContextMenu(node) {
            node.on("contextmenu", function (e) {
                e.stopPropagation();
                e.preventDefault();

                viewport.append(contextMenu);
                var node = $(this);
                var x = Number(node.attr("x"));
                var y = Number(node.attr("y"));
                contextMenu.css("left", x + 2 * node.width() / 3);
                contextMenu.css("top", y + 2 * node.height() / 3);
                contextMenu.css("right", "");
                contextMenu.attr("node-id", node.attr("node-id"));
                contextMenu.show();
            });
        }

        // zoom
        $("body").on("click", function () {
            zoom.find(".select").hide();
        });
        zoom.find(".scale").on("click", function (e) {
            e.stopPropagation();
            var selector = $(this).closest(".zoom").find(".select");
            if (selector.is(":hidden")) {
                selector.show();
            } else {
                selector.hide();
            }
        });
        zoom.find(".select").on("click", function (e) {
            e.stopPropagation();
        });
        zoom.find(".select .item").on("click", function () {
            var value = $(this).attr("value");
            var text = $(this).find("a").text();;
            zoom.find(".scale").attr("value", value);
            zoom.find(".scale").text(text);
            zoom.find(".select").hide();
            _scale(value);
        });
        zoom.find("[zoom-out]").on("click", function () {
            var scale = _getScale();
            scale -= 0.2;
            if (scale < 0.2) {
                scale = 0.2;
            }
            zoom.find(".scale").attr("value", scale);
            zoom.find(".scale").text((scale * 100).toFixed(0) + "%");
            _scale(scale);
        });
        zoom.find("[zoom-in]").on("click", function () {
            var scale = _getScale();
            scale += 0.2;
            if (scale > 2) {
                scale = 2;
            }
            zoom.find(".scale").attr("value", scale);
            zoom.find(".scale").text((scale * 100).toFixed(0) + "%");
            _scale(scale);
        });
        self.bindMouseWheel(function (e, delta) {
            var scale = _getScale();
            var value = (delta / 120) / 100;
            scale += value;
            if (scale < 0.2) {
                scale = 0.2;
            } else if (scale > 2) {
                scale = 2;
            }
            zoom.find(".scale").attr("value", scale);
            zoom.find(".scale").text((scale * 100).toFixed(0) + "%");
            _scale(scale);
        });

        function _scale(scale) {
            var x = viewport.attr("x");
            var y = viewport.attr("y");
            viewport.attr("scale", scale);
            viewport.css("transform", `translate(${x}px, ${y}px) scale(${scale})`);
        }

        function _getScale() {
            return Number(zoom.find(".scale").attr("value"))
        }

        function _parentIds(node) {
            var ids = node.attr("parent-id");
            if (ids) {
                return ids.split(",").sort(function (id1, id2) {
                    return id2.localeCompare(id1)
                });
            }
            return [];
        }

        toolbar.find("[tidy]").on("click", function () {
            _tidy();
        });

        function _tidy() {
            var startNode = viewport.find(".node[start]");
            var sx = 80;
            var sy = 260;
            startNode.css("transform", `translate(${sx}px, ${sy}px)`);
            startNode.attr("x", sx);
            startNode.attr("y", sy);

            _movePathOut(startNode);
            _tidyLevel(startNode);
            var scale = _getScale();
            viewport.attr("x", offset.x);
            viewport.attr("y", offset.y);
            viewport.css("transform", `translate(${offset.x}px, ${offset.y}px) scale(${scale})`);

            function _tidyLevel(superior) {
                var sx = Number(superior.attr("x"));
                var sy = Number(superior.attr("y"));
                var level = Number(superior.attr("level")) + 1;
                var nodes = viewport.find(".node[level='" + level + "']");
                if (nodes.length > 0) {

                    nodes = nodes.get().sort(function (n1, n2) {
                        var id1 = `${_parentIds($(n1))[0]}_${$(n1).attr("index")}_${$(n1).attr("node-id")}`;
                        var id2 = `${_parentIds($(n2))[0]}_${$(n2).attr("index")}_${$(n2).attr("node-id")}`;
                        return id1.localeCompare(id2);
                    });

                    var offsetY = 0;
                    $.each(nodes, function (i, node) {
                        // position
                        var x = sx + superior.outerWidth() + nodeHMargin;
                        var y = sy + offsetY;
                        $(node).css("transform", `translate(${x}px, ${y}px)`);
                        $(node).attr("x", x);
                        $(node).attr("y", y);
                        _movePathOut($(node));
                        _movePathIn($(node));

                        // offset
                        var nodeId = $(node).attr("node-id");
                        var children = viewport.find(".node[parent-id*='" + nodeId + "']");
                        var totalHeight = 0;
                        $.each(children, function (i, child) {
                            totalHeight += $(child).outerHeight() + nodeVMargin;
                        });
                        var childrenOfNextNode;
                        if (i < nodes.length - 1) {
                            childrenOfNextNode = viewport.find(".node[parent-id*='" + $(nodes[i + 1]).attr("node-id") + "']");
                        }
                        if (!totalHeight || totalHeight < $(node).outerHeight() + nodeVMargin || (childrenOfNextNode && childrenOfNextNode.length == 0)) {
                            totalHeight = $(node).outerHeight() + nodeVMargin;
                        }
                        offsetY += totalHeight;
                    });

                    _tidyLevel($(nodes[0]));
                }
            }
        }

        function _deleteNode(nodeId) {
            var node = viewport.find(".node[node-id='" + nodeId + "']");
            var parentId = node.attr("parent-id");
            var children = viewport.find(".node[parent-id*='" + nodeId + "']");

            Object.keys(nodePath[nodeId].in).forEach(function (pathId) {
                _deletePath(pathId);
                var parentIds = parentId.split(",");
                parentIds.forEach(function (parentId) {
                    delete nodePath[parentId].out[pathId];
                });
            });

            Object.keys(nodePath[nodeId].out).forEach(function (pathId) {
                _deletePath(pathId);
                $.each(children, function (i, child) {
                    delete nodePath[$(child).attr("node-id")].in[pathId];
                    _removeMultiId($(child), "parent-id", nodeId);
                    if (!$(child).attr("parent-id") || $(child).attr("parent-id").length == 0) {
                        $(child).attr("level", 0);
                        $(child).attr("index", "");
                    }
                });
            });

            delete nodePath[nodeId];
            node.remove();
            settingsBackup.children("[node-id='" + nodeId + "']").remove();

            // context
            $.each(children, function (i, child) {
                var childNodeId = $(child).attr("node-id");
                contexts[childNodeId].removeParent(contexts[nodeId]);
            });
            delete contexts[nodeId];
            _contextChange(nodeId);
        }
        function _deletePath(pathId) {
            var path = svg.find("path[path-id='" + pathId + "']");
            var outNodeId = path.attr("out-node-id");
            var inNodeId = path.attr("in-node-id");
            delete nodePath[outNodeId].out[pathId];
            delete nodePath[inNodeId].in[pathId];

            var inNode = viewport.find(".node[node-id='" + inNodeId + "']");
            _removeMultiId(inNode, "parent-id", outNodeId);
            if (inNode.attr("parent-id").length == 0) {
                inNode.attr("index", "");
                inNode.attr("level", 0);
            }

            path.remove();
            svg.find("path[path-area-id='" + pathId + "']").remove();

            var weldings = viewport.find(".node .welding[path-id*='" + pathId + "']");
            $.each(weldings, function (i, welding) {
                _removeMultiId($(welding), "path-id", pathId);
                if (!$(welding).attr("path-id") || $(welding).attr("path-id").length == 0) {
                    $(welding).hide();
                    $(welding).removeAttr("path-id");
                }
            });

            // context
            contexts[inNodeId].removeParent(contexts[outNodeId]);
            _contextChange(inNodeId);
        }
        $(document).on("keyup", function (e) {
            if (options.mode != "edit") {
                return;
            }
            if (e.keyCode == 46) {
                var node = viewport.find(".node.selected:not([start])");
                if (node.length > 0) {
                    _deleteNode(node.attr("node-id"));
                    _closePanel();
                } else {
                    var path = svg.find("path.selected");
                    if (path.length > 0) {
                        _deletePath(path.attr("path-id"));
                    }
                }
            }
        });

        // panel
        function _closePanel() {
            if (options.mode == "run") {
                var nodeId = panel.attr("node-id");
                if (!nodeId) {
                    return;
                }
                var type = viewport.find(".node[node-id='" + nodeId + "']").attr("type");
                var elem = panel.find(".panel-body .settings form").children();
                var cfg = options.nodes[type].result;
                if (cfg) {
                    cfg.onLeave(elem, nodeId);
                    panel.removeAttr("node-id");
                    var width = Number(panel.attr("width"));
                    panel.css("right", -(width + 30));
                }
            } else {
                panel.css("right", "-430px");
            }
            viewport.find(".node").removeClass("selected");
        }
        viewport.on("click", function () {
            _closePanel();
        });
        panel.on("click", function (e) {
            e.stopPropagation();
        });
        panel.find("[close]").on("click", function () {
            _closePanel();
        });
        panel.bindMouseWheel(function (e) {
            e.stopPropagation();
        });
        panel.on("click", function () {
            contextMenu.hide();
        });
        panel.find(".more").on("click", function (e) {
            e.stopPropagation();
            if (panel.attr("node-id") == "n_0") {
                return;
            }
            contextMenu.attr("node-id", panel.attr("node-id"));
            if ($(this).find(".menu-context").length > 0) {
                if (contextMenu.is(":hidden")) {
                    contextMenu.show();
                } else {
                    contextMenu.hide();
                }
            } else {
                $(this).append(contextMenu);
                contextMenu.css("top", "30px");
                contextMenu.css("right", "0");
                contextMenu.css("left", "");
                contextMenu.show();
            }
        });

        // path
        function _addPath(pathId, node, parent, pos, pathOutOffsetY, pathInOffsetY) {
            var px = Number(parent.attr("x"));
            var py = Number(parent.attr("y"));
            var sx = px + parent.outerWidth();
            var sy = py + pathOutOffsetY;
            var ex = pos.x;
            var ey = pos.y + pathInOffsetY;
            var cl = (ex - sx) / 3;
            var c1x = sx + cl;
            var c2x = sx + 2 * cl;
            var nodeId = node.attr("node-id");
            var parentId = parent.attr("node-id");

            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`);
            path.setAttribute("class", "path");
            path.setAttribute("path-id", pathId);
            path.setAttribute("out-offset-y", pathOutOffsetY);
            path.setAttribute("in-offset-y", pathInOffsetY);
            path.setAttribute("out-node-id", parentId);
            path.setAttribute("in-node-id", nodeId);
            var pathArea = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathArea.setAttribute("d", `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`);
            pathArea.setAttribute("path-area-id", pathId);
            pathArea.setAttribute("class", "path-area");

            svg.append(path);
            svg.append(pathArea);

            _bindSelectPath(pathId);
        }

        // menu
        self.on("click", function () {
            menu.hide();
        });
        menu.find(".item").on("click", function (e) {
            e.stopPropagation();

            var parentId = $(this).closest(".menu").attr("node-id");
            var parent = viewport.find(".node[node-id='" + parentId + "']");

            if (!_checkWeldingOut(parent, cOutWelding)) {
                menu.hide();
                return;
            }

            var parentLevel = Number(parent.attr("level"));
            var px = Number(parent.attr("x"));
            var py = Number(parent.attr("y"));

            var x = px + parent.outerWidth() + nodeHMargin;
            var y = py - 50;
            var children = viewport.find(".node[parent-id*='" + parentId + "']");
            if (children.length > 0) {
                var lcy = 0;
                $.each(children, function (i, child) {
                    var y = Number($(child).attr("y")) + $(child).outerHeight() + nodeVMargin;
                    if (y > lcy) {
                        lcy = y;
                    }
                });
                y = lcy;
            }

            var pos = _stagger(x, y);
            var x = pos.x;
            var y = pos.y;

            var index = parent.find(".welding.right").index(cOutWelding);
            var level = parentLevel + 1;
            var nodeId = _id("n");
            var nodeType = $(this).attr("type");

            var node = _addNode(nodeType, nodeId, pos, parentId, level, index);
            if (!node) {
                menu.hide();
                return;
            }

            var pathOutOffsetY = Number(menu.attr("po-offset-y"));
            var pathInOffsetY = _pathInOffsetY(node);
            var pathId = _id("p");

            _addPath(pathId, node, parent, pos, pathOutOffsetY, pathInOffsetY);
            _addMultiId(cOutWelding, "path-id", pathId);
            cOutWelding.show();
            _addMultiId(cInWelding, "path-id", pathId);
            cInWelding.show();
            nodePath[parentId].out[pathId] = parent.find(".welding.right").index(cOutWelding);
            nodePath[nodeId].in[pathId] = node.find(".welding.left").index(cInWelding);

            menu.hide();
        });
        $("body").on("click", function () {
            addMenu.hide();
        });
        toolbar.find("[add]").on("click", function (e) {
            e.stopPropagation();
            if (addMenu.is(":hidden")) {
                addMenu.show();
            } else {
                addMenu.hide();
            }
            menu.hide();
        });
        addMenu.on("click", function (e) {
            e.stopPropagation();
        });
        addMenu.find(".item").on("click", function () {
            var startNode = viewport.find(".node[start]");
            var x = Number(startNode.attr("x")) + startNode.width() + 300;
            var y = Number(startNode.attr("y")) + startNode.height() + 50;
            var pos = _stagger(x, y);

            var nodeId = _id("n");
            var nodeType = $(this).attr("type");

            _addNode(nodeType, nodeId, pos, "", 0, "");

            addMenu.hide();
        });

        // context menu
        $("body").on("click", function (e) {
            contextMenu.hide();
        });
        contextMenu.on("click", function (e) {
            e.stopPropagation();
        });
        contextMenu.find("[delete]").on("click", function () {
            var nodeId = contextMenu.attr("node-id");
            panel.css("right", "-412px");
            _deleteNode(nodeId);
            contextMenu.hide();
        });
        contextMenu.find("[copy]").on("click", function () {
            contextMenu.hide();

            var originalNodeId = contextMenu.attr("node-id");

            // add node
            var nodeType = viewport.find(".node[node-id='" + originalNodeId + "']").attr("type");
            var startNode = viewport.find(".node[start]");
            var x = Number(startNode.attr("x")) + startNode.width() + 300;
            var y = Number(startNode.attr("y")) + startNode.height() + 50;
            var pos = _stagger(x, y);
            var nodeId = _id("n");
            var settings = panel.find(".settings [node-id='" + originalNodeId + "']");
            if (settings.length == 0) {
                settings = settingsBackup.children("[node-id='" + originalNodeId + "']")
            }
            var data;
            if (settings.length > 0) {
                data = options.nodes[nodeType].settings.data(settings, $.formData(settings));
            }
            _addNode(nodeType, nodeId, pos, "", 0, "", data);
        });

        function _setStatus(nodeId, status, percent) {
            var clazz = {
                "failed": "error",
                "success": "success",
                "running": "running",
                "progress": "percent",
            };
            var node;
            if (nodeId == "start") {
                node = viewport.find(".node[type='start']");
            } else if (nodeId == "end") {
                node = viewport.find(".node[type='end']");
            } else {
                node = viewport.find(".node[node-id='" + nodeId + "']");
            }
            if (node.length > 0) {
                for (var key in clazz) {
                    node.removeClass(clazz[key]);
                }
                node.addClass(clazz[status]);
                if (percent != undefined) {
                    node.find("[progress]").text(percent + "%");
                }
            }
        }

        function _setProgress(nodeId, percent) {
            _setStatus(nodeId, "progress", percent)
        }

        function _stopAutoSave() {
            clearInterval(autoSaveTimer);
        }

        function _enableDeploy() {
            self.find("[deploy]").removeAttr("disabled");
        }

        function _disableDeploy() {
            self.find("[deploy]").attr("disabled", true);
        }

        return {
            setData: _setData,
            setStatus: _setStatus,
            setProgress: _setProgress,
            stopAutoSave: _stopAutoSave,
            enableDeploy: _enableDeploy,
            disableDeploy: _disableDeploy,
        }
    }
}));