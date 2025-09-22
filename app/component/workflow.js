define([
    "text!app/component/workflow-tpl.html", "bootstrap", "underscore", "jquery", "component", "workflow", "datepicker", "uploader", "condition", "editor"
], function (tpl, b, _, $) {

    function _init() {
        var workflow = $("[workflow]").workflow({
            lang: "zh",
            mode: "edit",
            topOffset: 101,
            data: {
                "n_0": {
                    "nodeId": "n_0",
                    "type": "start",
                    "parentId": "",
                    "level": 1,
                    "index": 0,
                    "pos": {
                        "x": 81,
                        "y": 260
                    },
                    "out": {
                        "p_1752132048699": 0,
                        "p_1752459460207": 0
                    },
                    "in": {

                    },
                    "settings": {
                        "variableName": [
                            "test",
                            "story",
                            "joke",
                            "poem"
                        ]
                    },
                    "context": {
                        "variables": [
                            "test",
                            "story",
                            "joke",
                            "poem"
                        ]
                    }
                },
                "n_1752132048694": {
                    "nodeId": "n_1752132048694",
                    "type": "command",
                    "parentId": "n_0",
                    "level": 2,
                    "index": 0,
                    "pos": {
                        "x": 400,
                        "y": 210
                    },
                    "out": {
                        "p_1752132050464": 0
                    },
                    "in": {
                        "p_1752132048699": 0
                    },
                    "settings": {
                        "variableName": "output1",
                        "description": "",
                        "variables": "test",
                        "cmd": [
                            {
                                "text": "insert a var {story}",
                                "html": "insert a var&nbsp;<span class=\"variable\" contenteditable=\"false\">{story}</span>"
                            }
                        ]
                    },
                    "context": {
                        "variables": "output1"
                    }
                },
                "n_1752132031317": {
                    "nodeId": "n_1752132031317",
                    "type": "llm",
                    "parentId": "n_1752132048694,n_1752459460202",
                    "level": 3,
                    "index": 0,
                    "pos": {
                        "x": 705,
                        "y": 144
                    },
                    "out": {
                        "p_1752132106388": 0
                    },
                    "in": {
                        "p_1752132050464": 0,
                        "p_1752459520872": 0
                    },
                    "settings": {
                        "llm": "llama3",
                        "variables": "story"
                    },
                    "context": {

                    }
                },
                "n_1752132106382": {
                    "nodeId": "n_1752132106382",
                    "type": "end",
                    "parentId": "n_1752132031317,n_1752459460202",
                    "level": 4,
                    "index": 1,
                    "pos": {
                        "x": 1056,
                        "y": 188
                    },
                    "out": {

                    },
                    "in": {
                        "p_1752132106388": 0,
                        "p_1752459523092": 0
                    },
                    "settings": {
                        "description": ""
                    },
                    "context": {

                    }
                },
                "n_1752459460202": {
                    "nodeId": "n_1752459460202",
                    "type": "condition",
                    "parentId": "n_0",
                    "level": 2,
                    "index": 0,
                    "pos": {
                        "x": 400,
                        "y": 295
                    },
                    "out": {
                        "p_1752459520872": 0,
                        "p_1752459523092": 1
                    },
                    "in": {
                        "p_1752459460207": 0
                    },
                    "settings": {
                        "_p_cond_op": [
                            "eq",
                            "neq",
                            "in"
                        ],
                        "_p_cond_name": [
                            "story",
                            "poem",
                            "joke"
                        ],
                        "_p_cond_value": [
                            "trump",
                            "trump",
                            "trump",
                            "other"
                        ],
                        "conditions": {
                            "conditions": [
                                {
                                    "name": "story",
                                    "values": [
                                        "trump"
                                    ],
                                    "op": "eq"
                                },
                                {
                                    "name": "poem",
                                    "values": [
                                        "trump"
                                    ],
                                    "op": "neq"
                                },
                                {
                                    "name": "joke",
                                    "values": [
                                        "trump",
                                        "other"
                                    ],
                                    "op": "in"
                                }
                            ],
                            "op": "and"
                        }
                    },
                    "context": {

                    }
                }
            },
            // data: {
            //     "n_0": {
            //         "nodeId": "n_0",
            //         "type": "start",
            //         "parentId": "",
            //         "level": 1,
            //         "index": 0,
            //         "pos": {
            //             "x": 80,
            //             "y": 260
            //         },
            //         "out": {
            //             "p_1752039859315": 0
            //         },
            //         "in": {

            //         },
            //         "settings": {
            //             "description": ""
            //         }
            //     },
            //     "n_1752039859312": {
            //         "nodeId": "n_1752039859312",
            //         "type": "condition",
            //         "parentId": "n_0",
            //         "level": 2,
            //         "index": 0,
            //         "pos": {
            //             "x": 400,
            //             "y": 260
            //         },
            //         "out": {
            //             "p_1752039865869": 0,
            //             "p_1752039870330": 1,
            //             "p_1752039871962": 2
            //         },
            //         "in": {
            //             "p_1752039859315": 0
            //         },
            //         "settings": {
            //             "condition": [
            //                 "1",
            //                 "2"
            //             ]
            //         }
            //     },
            //     "n_1752039865867": {
            //         "nodeId": "n_1752039865867",
            //         "type": "command",
            //         "parentId": "n_1752039859312",
            //         "level": 3,
            //         "index": 0,
            //         "pos": {
            //             "x": 852,
            //             "y": 189
            //         },
            //         "out": {
            //             "p_1752039886139": 0
            //         },
            //         "in": {
            //             "p_1752039865869": 0
            //         },
            //         "settings": {
            //             "description": "",
            //             "cmd": ""
            //         }
            //     },
            //     "n_1752039870324": {
            //         "nodeId": "n_1752039870324",
            //         "type": "llm",
            //         "parentId": "n_1752039859312",
            //         "level": 3,
            //         "index": 1,
            //         "pos": {
            //             "x": 724,
            //             "y": 383.5
            //         },
            //         "out": {
            //             "p_1752039879710": 0,
            //             "p_1752039881238": 0
            //         },
            //         "in": {
            //             "p_1752039870330": 1
            //         },
            //         "settings": {
            //             "date": "2025-07-01",
            //             "step": "0",
            //             "description": ""
            //         }
            //     },
            //     "n_1752039871958": {
            //         "nodeId": "n_1752039871958",
            //         "type": "llm",
            //         "parentId": "n_1752039859312",
            //         "level": 3,
            //         "index": 2,
            //         "pos": {
            //             "x": 835,
            //             "y": 673.5
            //         },
            //         "out": {
            //             "p_1752039889028": 0
            //         },
            //         "in": {
            //             "p_1752039871962": 2
            //         },
            //         "settings": {
            //             "date": "2025-07-10",
            //             "step": "0",
            //             "description": ""
            //         }
            //     },
            //     "n_1752039879706": {
            //         "nodeId": "n_1752039879706",
            //         "type": "command",
            //         "parentId": "n_1752039870324",
            //         "level": 4,
            //         "index": 0,
            //         "pos": {
            //             "x": 1033,
            //             "y": 307
            //         },
            //         "out": {
            //             "p_1752039890756": 0
            //         },
            //         "in": {
            //             "p_1752039879710": 0
            //         },
            //         "settings": {
            //             "description": "test1",
            //             "cmd": "test1"
            //         }
            //     },
            //     "n_1752039881235": {
            //         "nodeId": "n_1752039881235",
            //         "type": "command",
            //         "parentId": "n_1752039870324",
            //         "level": 4,
            //         "index": 0,
            //         "pos": {
            //             "x": 1031,
            //             "y": 439.5
            //         },
            //         "out": {
            //             "p_1752039895240": 0
            //         },
            //         "in": {
            //             "p_1752039881238": 0
            //         },
            //         "settings": {
            //             "description": "test2",
            //             "cmd": ""
            //         }
            //     },
            //     "n_1752039883644": {
            //         "nodeId": "n_1752039883644",
            //         "type": "end",
            //         "parentId": "n_1752039865867,n_1752039871958,n_1752039879706,n_1752039881235",
            //         "level": 5,
            //         "index": 0,
            //         "pos": {
            //             "x": 1526,
            //             "y": 324
            //         },
            //         "out": {

            //         },
            //         "in": {
            //             "p_1752039886139": 0,
            //             "p_1752039889028": 0,
            //             "p_1752039890756": 0,
            //             "p_1752039895240": 0
            //         },
            //         "settings": {
            //             "description": "end"
            //         }
            //     }
            // },
            save: {
                onSave: function (data, callback) {
                    console.log(JSON.stringify(data));
                    setTimeout(function () {
                        callback();
                    }, 1000);
                },
            },
            run: {
                onRun: function (data, callback) {
                    console.log(JSON.stringify(data));
                    setTimeout(function () {
                        callback();
                    }, 60000);
                },
            },
            autoSave: {
                enabled: true,
                ignoreError: false,
                interval: 5,
                onSave: function (data, callback) {
                    console.log(JSON.stringify(data));
                    setTimeout(function () {
                        callback();
                    }, 1000);
                },
            },
            nodes: {
                "start": {
                    output: {
                        required: true
                    },
                    settings: {
                        tpl: `
                            <div variables></div>
                            <div class="mb-3">
                                <button type="button" class="btn btn-secondary btn-sm" style="width:100%" add>添加变量</button>
                            </div>
                        `,
                        bindEvent: function (context, settings, data, node) {
                            var vtpl = `
                                <div class="mb-3 row" variable>
                                    <label class="col-sm-2 col-form-label">变量</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" name="variableName" required>
                                    </div>
                                    <div class="col-sm-4">
                                        <button type="button" class="btn btn-secondary btn-sm" remove>删除</button>
                                    </div>
                                </div>
                            `;

                            function _change() {
                                var data = $.formData(settings.elem);
                                var variables = data["variableName"];
                                if (!$.isArray(variables)) {
                                    variables = [variables];
                                }
                                variables = variables.filter(function (v) {
                                    return v != ""
                                });
                                context.set("variables", variables);
                            }

                            function _add(value) {
                                var v = $(_.template(vtpl)());
                                if (value) {
                                    v.find("input").val(value);
                                }
                                settings.elem.find("[variables]").append(v);
                                settings.validation(v);

                                v.find("input").on("change", function () {
                                    _change();
                                });

                                v.find("[remove]").on("click", function () {
                                    $(this).closest("[variable]").remove();
                                    _change();
                                });
                            }

                            settings.elem.find("[add]").on("click", function () {
                                _add();
                            });

                            if (data && data["variableName"]) {
                                data["variableName"].forEach(function (variable) {
                                    _add(variable)
                                });
                            }
                        },
                        onChange: function (context, elem) {
                            console.log(context.data());
                        },
                        data: function (settings, formData) {
                            return formData;
                        }
                    },
                },
                "end": {
                    name: "结束"
                },
                "command": {
                    name: "Command",
                    icon: {
                        bi: "terminal",
                        color: "#fff",
                        bgColor: "dark"
                    },
                    input: {
                        max: 0, // no limit
                    },
                    output: {
                        max: 1,
                        required: false
                    },
                    settings: {
                        tpl: `
                            <div class="mb-3">
                                <textarea class="form-control" rows="3" name="description" placeholder="Description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">变量</label>
                                <select class="form-select" name="variables">
                                </select>
                            </div>
                            <div class="mb-3" cmd>
                            </div>
                            <div class="mb-3" cmd>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">输出变量</label>
                                <input type="text" class="form-control" name="variableName" value="cmdOutput1">
                            </div>
                        `,
                        bindEvent: function (context, settings, data, node) {
                            var values;
                            if (data && data["variables"]) {
                                values = data["variables"];
                                if (!$.isArray(values)) {
                                    values = [values];
                                }
                            }
                            _variableSelector(context, settings.elem, values);

                            context.set("variables", settings.elem.find("input[name='variableName']").val());
                            settings.elem.find("input[name='variableName']").on("change", function () {
                                context.set("variables", $(this).val());
                            });

                            var options = {};
                            var ctxData = context.allData(true);
                            if (ctxData["variables"]) {
                                var variables = ctxData["variables"];
                                variables.forEach(function (value) {
                                    options[value] = {
                                        icon: "braces",
                                        name: value,
                                    }
                                });
                            }

                            $.each(settings.elem.find("[cmd]"), function (i, e) {
                                var editor = $(e).minieditor({
                                    title: "命令行",
                                    tools: {
                                        heading: false,
                                        bold: false,
                                        italic: false,
                                        ol: false,
                                        ul: false
                                    },
                                    extensions: {
                                        variables: {
                                            icon: "braces",
                                            title: "插入变量",
                                            options: options,
                                            onSelect: function (value, callback) {
                                                var variable = $(`<span class="variable" contenteditable="false">{${value}}</span>`);
                                                callback(variable);
                                            }
                                        }
                                    }
                                });
                                if (i < data.cmd.length) {
                                    editor.setHTML(data.cmd[i].html);
                                }
                            });

                        },
                        onChange: function (context, elem) {
                            var values = [];
                            $.each(elem.find("select[name='variables'] option:selected"), function (i, option) {
                                values.push($(option).attr("value"));
                            });
                            _variableSelector(context, elem, values);

                            var options = {};
                            var data = context.allData(true);
                            if (data["variables"]) {
                                var variables = data["variables"];
                                variables.forEach(function (value) {
                                    options[value] = {
                                        icon: "braces",
                                        name: value,
                                    }
                                });
                            }
                            $.each(elem.find("[cmd]"), function (i, e) {
                                var editor = $(e).data("editor");
                                if (editor) {
                                    editor.resetExtensions({
                                        variables: {
                                            icon: "braces",
                                            title: "插入变量",
                                            options: options,
                                            onSelect: function (value, callback) {
                                                var variable = $(`<span class="variable" contenteditable="false">{${value}}</span>`);
                                                callback(variable);
                                            }
                                        }
                                    });
                                }
                            });
                        },
                        data: function (settings, formData) {
                            $.each(settings.find("[cmd]"), function (i, e) {
                                if (!formData["cmd"]) {
                                    formData["cmd"] = [];
                                }
                                var editor = $(e).data("editor");
                                if (editor) {
                                    formData["cmd"].push({
                                        text: editor.text(),
                                        html: editor.html()
                                    });
                                }
                            });
                            return formData;
                        }
                    },
                    result: {
                        tpl: `
                            <div style="height: 100%;overflow-y:auto;overflow-x:hidden">
                                <pre>
                                    <code></code>
                                </pre>
                            </div>
                        `,
                        panelWidth: 940,
                        onLoad: function (elem, nodeId) {
                            elem.find("code").text(`
2024-09-23T09:09:32+0000 [WARNING] [cli] docker base_image harbor1.ailines.cn/catan/bento-base-pytorch:1.1.0 is used, 
'cuda_version=11.6.2' option is ignored.
                            `);
                            elem.closest(".panel-body").scrollTop(999999);
                        },
                        onLeave: function (elem, nodeId) {
                            console.log("leave node:", nodeId);
                        }
                    },
                    max: 0
                },
                "llm": {
                    name: "LLM",
                    icon: {
                        bi: "openai",
                        bgColor: "primary"
                    },
                    input: {
                        max: 0, // no limit
                    },
                    output: {
                        max: 2,
                        required: true
                    },
                    settings: {
                        tpl: `
                            <div class="mb-3">
                                <label class="form-label">LLM</label>
                                <input type="text" class="form-control" name="llm" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">变量</label>
                                <select class="form-select" name="variables">
                                </select>
                            </div>
                        `,
                        bindEvent: function (context, settings, data, node) {
                            var values;
                            if (data && data["variables"]) {
                                values = data["variables"];
                                if (!$.isArray(values)) {
                                    values = [values];
                                }
                            }
                            console.log(context.allData());
                            _variableSelector(context, settings.elem, values);
                        },
                        onChange: function (context, elem) {
                            var values = [];
                            $.each(elem.find("select[name='variables'] option:selected"), function (i, option) {
                                values.push($(option).attr("value"));
                            });
                            _variableSelector(context, elem, values);
                        },
                        data: function (settings, formData) {
                            return formData;
                        }
                    },
                    result: {
                        tpl: `
                            <div style="height: 100%;overflow-y:auto;overflow-x:hidden">
                                <pre>
                                    <code></code>
                                </pre>
                            </div>
                        `,
                        onLoad: function (elem, nodeId) {
                            elem.text("world");
                        },
                        onLeave: function (elem, nodeId) {

                        }
                    }
                },
                "condition": {
                    name: "Condition",
                    icon: {
                        bi: "arrow-left-right",
                        color: "#fff",
                        bgColor: "info"
                    },
                    input: {
                        max: 0, // no limit
                    },
                    output: {
                        max: -1 // disabled
                    },
                    body: `
                        <div class="item branch" if>
                            <div class="name">IF</div>
                            <div class="welding right" max="1" required></div>
                            <a class="plus" p-tooltip>
                                <i class="bi bi-plus-circle-fill"></i>
                            </a>
                        </div>
                        <div class="item branch" else>
                            <div class="name">ELSE</div>
                            <div class="welding right" max="1" required></div>
                            <a class="plus" p-tooltip>
                                <i class="bi bi-plus-circle-fill"></i>
                            </a>
                        </div>
                    `,
                    settings: {
                        tpl: `
                            <div class="mb-3 row">
                                <label class="col-sm-12 col-form-label">IF</label>
                                <div class="col-sm-12" ifmcond>
                                    
                                </div>
                            </div>
                            <div cond>
                            </div>
                            <div class="mb-3 row">
                                <label class="col-sm-2 col-form-label">ELSE</label>
                            </div>
                            <div class="mb-3">
                                <button type="button" class="btn btn-secondary btn-sm" style="width:100%" add>+ ELIF</button>
                            </div>
                        `,
                        bindEvent: function (context, settings, data, node) {
                            var ctxData = context.allData(true);
                            var condOpt = {
                                lang: "zh"
                            };
                            if (ctxData["variables"]) {
                                condOpt.options = {
                                    names: data["variables"]
                                }
                            }
                            if (data.conditions) {
                                condOpt.data = data.conditions;
                            }
                            settings.elem.find("[ifmcond]").condition(condOpt);

                            var tpl = `
                                <div class="mb-3 row" elif>
                                    <label class="col-sm-12 col-form-label">ELIF</label>
                                    <div class="col-sm-12" elifmcond>
                                    </div>
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-secondary btn-sm" remove>删除</button>
                                    </div>
                                </div>
                            `;
                            settings.elem.find("button[add]").on("click", function () {
                                var cond = $(tpl);
                                settings.elem.find("[cond]").append(cond);

                                cond.find("[elifmcond]").condition({
                                    lang: "zh"
                                });

                                cond.find("button[remove]").on("click", function () {
                                    var index = settings.elem.find("[elif]").index($(this).closest("[elif]"));
                                    node.remove(node.elem.find("[elif]").eq(index));
                                    $(this).closest("[elif]").remove();
                                });

                                var ntpl = `
                                    <div class="item branch" elif>
                                        <div class="name">ELIF</div>
                                        <div class="welding right" max="1" required></div>
                                        <a class="plus" p-tooltip>
                                            <i class="bi bi-plus-circle-fill"></i>
                                        </a>
                                    </div>
                                `;
                                var item = $(ntpl);
                                node.elem.find("[body] [else]").before(item);
                                node.add(item);

                                settings.validation(cond);
                            });
                            if (data) {
                                var conditions = data["condition"];
                                if (conditions && conditions.length > 1) {
                                    for (var i = 1; i < conditions.length; i++) {
                                        var condition = conditions[i];
                                        settings.elem.find("button[add]").trigger("click");
                                        settings.elem.find("input[name='condition']").eq(i).val(condition);
                                    }
                                }
                            }
                        },
                        onChange: function (context, elem) {
                            var data = context.allData(true);
                            var condOpt = {
                                lang: "zh"
                            };
                            if (data["variables"]) {
                                condOpt.options = {
                                    names: data["variables"]
                                }
                            }
                            var conditions = $.conditions(elem.find("[ifmcond]"));
                            console.log(conditions);
                            condOpt.data = conditions;
                            elem.find("[ifmcond]").condition(condOpt);
                        },
                        data: function (settings, formData) {
                            var conditions = $.conditions(settings.find("[ifmcond]"));
                            formData.conditions = conditions;
                            return formData;
                        }
                    },
                    max: 0
                }
            },
            required: ["start", "end"]
        });

        function _variableSelector(context, elem, values) {
            var selector = elem.find("select[name='variables']");
            selector.html("");
            var data = context.allData(true);
            if (data["variables"]) {
                var variables = data["variables"];
                if (!$.isArray(variables)) {
                    variables = [variables];
                }
                variables.forEach(function (variable) {
                    var option = $("<option></option>");
                    option.attr("value", variable);
                    option.text(variable);
                    if (values && values.indexOf(variable) >= 0) {
                        option.prop("selected", true);
                    }
                    selector.append(option);
                });
            }
            selector.multiselect({
                search: true
            });
        }
        // workflow.setStatus("n_1752459460202", "running");
        // workflow.setStatus("n_0", "success");
        // workflow.setStatus("n_1752132048694", "failed");

        // workflow.setData({
        //     "n_0": {
        //         "nodeId": "n_0",
        //         "type": "start",
        //         "parentId": "",
        //         "level": 1,
        //         "index": 0,
        //         "pos": {
        //             "x": 80,
        //             "y": 260
        //         },
        //         "out": {
        //             "p_1752132048699": 0
        //         },
        //         "in": {

        //         },
        //         "settings": {
        //             "variableName": [
        //                 "test",
        //                 "story",
        //                 "joke"
        //             ]
        //         },
        //         "context": {
        //             "variables": [
        //                 "test",
        //                 "story",
        //                 "joke"
        //             ]
        //         }
        //     },
        //     "n_1752132031317": {
        //         "nodeId": "n_1752132031317",
        //         "type": "llm",
        //         "parentId": "n_1752132048694",
        //         "level": 3,
        //         "index": 0,
        //         "pos": {
        //             "x": 716,
        //             "y": 194
        //         },
        //         "out": {
        //             "p_1752132106388": 0
        //         },
        //         "in": {
        //             "p_1752132050464": 0
        //         },
        //         "settings": {
        //             "llm": "llama3",
        //             "variables": "story"
        //         },
        //         "context": {

        //         }
        //     },
        //     "n_1752132048694": {
        //         "nodeId": "n_1752132048694",
        //         "type": "command",
        //         "parentId": "n_0",
        //         "level": 2,
        //         "index": 0,
        //         "pos": {
        //             "x": 400,
        //             "y": 210
        //         },
        //         "out": {
        //             "p_1752132050464": 0
        //         },
        //         "in": {
        //             "p_1752132048699": 0
        //         },
        //         "settings": {
        //             "variableName": "output1",
        //             "description": "",
        //             "cmd": "",
        //             "variables": "test"
        //         },
        //         "context": {
        //             "variables": "output1"
        //         }
        //     },
        //     "n_1752132106382": {
        //         "nodeId": "n_1752132106382",
        //         "type": "end",
        //         "parentId": "n_1752132031317",
        //         "level": 4,
        //         "index": 0,
        //         "pos": {
        //             "x": 1036,
        //             "y": 144
        //         },
        //         "out": {

        //         },
        //         "in": {
        //             "p_1752132106388": 0
        //         },
        //         "settings": {
        //             "description": ""
        //         },
        //         "context": {

        //         }
        //     }
        // });
    }

    return {
        name: "Workflow",
        init: function () {
            _init();
        },
        render: function (ctx, args, onload) {
            ctx.html(_.template(tpl)());
            onload(args);
        },
        beforeLeave: function (callback) {
            callback(true);
        },
        leave: function () {
            console.log("leave component");
        }
    }
});