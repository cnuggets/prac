define([
    "text!app/component/component-tpl.html", "bootstrap", "underscore",
    "jquery", "component", "datepicker", "uploader", "tree", "crontab", "autocomplete", "condition", "editor"
], function (tpl, b, _, $) {

    function _init() {
        window.getSelection().collapse($("[caret]").get(0), 0);

        var editor = $("[editor]").minieditor({
            tools: {
                heading: true,
                bold: true,
                italic: true,
                ol: false,
                ul: false
            },
            extensions: {
                variables: {
                    icon: "braces",
                    title: "插入变量",
                    options: {
                        "poem": {
                            icon: "braces",
                            name: "poem",
                            description: "a variable named poem",
                        },
                        "story": {
                            icon: "braces",
                            name: "story",
                            description: "a variable named story",
                        },
                        "joke": {
                            icon: "braces",
                            name: "joke",
                            description: "a variable named joke",
                        }
                    },
                    onSelect: function (value, callback) {
                        var variable = $(`<span class="variable" contenteditable="false">{${value}}</span>`);
                        callback(variable);

                        console.log(editor.text());
                    }
                }
            }
        });

        editor.setHTML(`// Place the caret at the beginning of an HTML document's body. <span class="variable" contenteditable="false">{x} whitelist</span>const body = document.querySelector("body"); test window.getSelection().collapse(body, 0);`);

        var ed = $("[editor]").data("editor");
        ed.resetExtensions({
            variables: {
                icon: "braces",
                title: "插入变量",
                options: {
                    "poem1": {
                        icon: "braces",
                        name: "poem",
                        description: "a variable named poem1",
                    },
                    "story": {
                        icon: "braces",
                        name: "story",
                        description: "a variable named story",
                    }
                },
                onSelect: function (value, callback) {
                    var variable = $(`<span class="variable" contenteditable="false">{${value}}</span>`);
                    callback(variable);
                    console.log(editor.text());
                }
            },
            others: {
                icon: "exclamation-circle",
                title: "其他",
                options: {
                    "test1": {
                        icon: "exclamation-circle",
                        name: "test1",
                    },
                    "test2": {
                        icon: "exclamation-circle",
                        name: "test2",
                    }
                },
                onSelect: function (value, callback) {
                    var variable = $(`<span class="variable" contenteditable="false">{${value}}</span>`);
                    callback(variable);
                    console.log(editor.text());
                }
            }
        });
        $("[md]").on("click", function() {
            console.log(editor.markdown().split("\n"));
        });

        var cond = $("[cond]").condition({
            options: {
                names: {
                    "topic": "{x} topic",
                    "output": "{x} output"
                },
                values: ["2", "3"]
            },
            lang: "en",
            data: {
                conditions: [{
                    name: "topic",
                    op: "lt",
                    values: ["1"]
                }, {
                    name: "output",
                    op: "in",
                    values: ["1", "2"]
                }, {
                    name: "test",
                    op: "nin",
                    values: ["other", "test12"]
                }],
                op: "or"
            }
        });

        $("#form-cond").form({
            confirm: {
                class: "danger",
                onConfirm: function (data, notice) {
                    console.log(cond.data());
                }
            },
            cancel: {
                onCancel: function () {
                    console.log("clear");
                }
            }
        });

        $("select[name='is']").multiselect({
            lang: "zh",
            search: true,
            allowCreate: true,
            singleClassic: false
        });

        $("#form-ms").form({
            confirm: {
                class: "danger",
                onConfirm: function (data, notice) {
                    console.log(data);
                }
            },
            cancel: {
                onCancel: function () {
                    console.log("clear");
                }
            }
        });

        $("[el]").ellipsis({
            lang: "zh",
            lines: 3,
            expandable: true
        });

        $("[pop]").popover();

        var p1 = $("#progress").progress({
            default: 30,
            classes: ["bg-danger", "progress-bar-striped"],
            btn: {
                disabled: false
            },
            formatter: function (value) {
                return value + "%";
            },
            onChange: function (value) {
                console.log(value);
            }
        });
        // p1.setValue(90);

        $("input[name='keyword']").search({
            lang: "zh",
            options: [{
                value: "name",
                text: "名称"
            }, {
                value: "order",
                text: "订单"
            }],
            onSearch: function (keyword, option) {
                console.log(keyword);
                console.log(option);
            }
        });

        $("input[name='keyword']").autocomplete({
            // limit: 2,
            data: [{
                value: "autocomplete",
                text: `autocomplete`
            }, {
                value: "autocomplete one",
                text: `autocomplete one`
            }, {
                value: "autocomplete two",
                text: `autocomplete two`
            }, {
                value: "autocomplete 1",
                text: `autocomplete 1`
            }, {
                value: "autocomplete 2",
                text: `autocomplete 2`
            }, {
                value: "autocomplete 3",
                text: `autocomplete 3`
            }, {
                value: "autocomplete 4",
                text: `autocomplete 4`
            }, {
                value: "autocomplete 5",
                text: `autocomplete 5`
            }, {
                value: "autocomplete 6",
                text: `autocomplete 6`
            }, {
                value: "autocomplete 7",
                text: `autocomplete 7`
            }, {
                value: "autocomplete 8",
                text: `autocomplete 8`
            }, {
                value: "autocomplete 9",
                text: `autocomplete 9`
            }, {
                value: "autocomplete 16",
                text: `autocomplete 16`
            }, {
                value: "autocomplete 17",
                text: `autocomplete 17`
            }, {
                value: "autocomplete 18",
                text: `autocomplete 18`
            }, {
                value: "autocomplete 19",
                text: `autocomplete 19`
            }, {
                value: "autocomplete 28",
                text: `autocomplete 28`
            }, {
                value: "autocomplete 29",
                text: `autocomplete 29`
            }, {
                value: "autocomplete 36",
                text: `autocomplete 36`
            }, {
                value: "autocomplete 37",
                text: `autocomplete 37`
            }, {
                value: "autocomplete 38",
                text: `autocomplete 38`
            }, {
                value: "autocomplete 39",
                text: `autocomplete 39`
            }],
            onChange: function (value) {
                console.log(value);
            }
        });

        // $("input[name='keyword']").datepicker({
        //     lang: "zh",
        //     position: {
        //         top: "2.35rem"
        //     },
        //     range: true,
        //     week: {
        //         firstDay: 1 // 0: Sun, 1: Mon
        //     },
        //     btns: {
        //         confirm: {
        //             onConfirm: function (dates) {
        //                 console.log(dates);
        //             }
        //         }
        //     }
        // });

        $("#ac").form({
            confirm: {
                class: "danger",
                onConfirm: function (data, notice) {
                    console.log(data);
                }
            },
            cancel: {
                onCancel: function () {
                    console.log("clear");
                }
            }
        });

        $("input[name='ac']").autocomplete({
            // limit: 2,
            data: [{
                value: "autocomplete",
                text: `autocomplete`
            }, {
                value: "autocomplete one",
                text: `autocomplete one`
            }, {
                value: "autocomplete two",
                text: `autocomplete two`
            }],
            async: function (keyword, callback) {
                if (keyword.indexOf("one") >= 0) {
                    setTimeout(function () {
                        callback([{
                            value: "one 1",
                            text: "<b>one</b> 1"
                        }, {
                            value: "one 2",
                            text: "<b>one</b> 2"
                        }, {
                            value: "one 3",
                            text: "<b>one</b> 3"
                        }]);
                    }, 200);
                } else if (keyword.indexOf("two") >= 0) {
                    setTimeout(function () {
                        callback(["two 1", "two 2", "two 3"]);
                    }, 200);
                } else {
                    setTimeout(function () {
                        callback([]);
                    }, 200);
                }
            }
        });

        $("#ac").find("input").on("keyup", function (e) {
            if (e.keyCode == 13) {
                $("#ac").find("[confirm]").trigger("click");
            }
        });

        $("input[name='ac1']").autocomplete({
            // limit: 2,
            data: [{
                value: "autocomplete",
                text: `autocomplete`
            }, {
                value: "autocomplete one",
                text: `autocomplete one`
            }, {
                value: "autocomplete two",
                text: `autocomplete two`
            }, {
                value: "autocomplete 1",
                text: `autocomplete 1`
            }, {
                value: "autocomplete 2",
                text: `autocomplete 2`
            }, {
                value: "autocomplete 3",
                text: `autocomplete 3`
            }, {
                value: "autocomplete 4",
                text: `autocomplete 4`
            }, {
                value: "autocomplete 5",
                text: `autocomplete 5`
            }, {
                value: "autocomplete 6",
                text: `autocomplete 6`
            }, {
                value: "autocomplete 7",
                text: `autocomplete 7`
            }, {
                value: "autocomplete 8",
                text: `autocomplete 8`
            }, {
                value: "autocomplete 9",
                text: `autocomplete 9`
            }, {
                value: "autocomplete 16",
                text: `autocomplete 16`
            }, {
                value: "autocomplete 17",
                text: `autocomplete 17`
            }, {
                value: "autocomplete 18",
                text: `autocomplete 18`
            }, {
                value: "autocomplete 19",
                text: `autocomplete 19`
            }, {
                value: "autocomplete 28",
                text: `autocomplete 28`
            }, {
                value: "autocomplete 29",
                text: `autocomplete 29`
            }, {
                value: "autocomplete 36",
                text: `autocomplete 36`
            }, {
                value: "autocomplete 37",
                text: `autocomplete 37`
            }, {
                value: "autocomplete 38",
                text: `autocomplete 38`
            }, {
                value: "autocomplete 39",
                text: `autocomplete 39`
            }],
            onChange: function (value) {
                console.log(value);
            }
        });

        $("#form2").form({
            confirm: {
                class: "danger",
                onConfirm: function (data, notice) {
                    console.log(data);
                }
            },
            cancel: {
                onCancel: function () {
                    console.log("clear");
                }
            }
        });

        $("input[name='cron']").crontab({
            lang: "zh",
            nextRun: {
                // disabled: true,
                max: 10
            }
        });

        var tree = $("div[tree]").tree({
            editable: true,
            checkable: false,
            data: [{
                id: "1",
                content: "news",
                descriptions: [],
                value: {
                    id: "1",
                    name: "news",
                    other: "other1"
                },
                checked: true,
                children: [{
                    id: "11",
                    content: "nba",
                    descriptions: [],
                    value: {
                        id: "11",
                        name: "nba",
                        other: "nba news"
                    },
                    children: []
                }, {
                    id: "12",
                    content: "breaking",
                    descriptions: [],
                    value: {
                        id: "12",
                        name: "breaking",
                        other: "breaking news"
                    },
                    children: []
                }]
            }, {
                id: "2",
                content: "helps",
                descriptions: [],
                value: {
                    id: "2",
                    name: "helps",
                    other: "helps"
                },
                children: [{
                    id: "21",
                    content: "manual",
                    descriptions: [],
                    value: {
                        id: "21",
                        name: "manual",
                        other: "manual"
                    },
                    children: []
                }, {
                    id: "22",
                    content: "settings",
                    descriptions: [],
                    value: {
                        id: "22",
                        name: "settings",
                        other: "settings"
                    },
                    children: []
                }, {
                    id: "23",
                    content: "documents",
                    descriptions: [],
                    value: {
                        id: "23",
                        name: "documents",
                        other: "documents"
                    },
                    children: []
                }]
            }]
        });

        $("#tree-data").on("click", function () {
            console.log(tree.data());
        });

        $("#alert").alert("This is alert message", {
            confirm: {
                label: "OK",
                waiting: "Please wait",
                onConfirm: function (notice) {
                    setTimeout(function () {
                        notice();
                    }, 2000);
                }
            },
            size: "lg",
            css: {
                "max-width": "1280px"
            }
        });

        $("#info").info("This is information");

        $("#confirm").confirm("This is confirm title", "This is confirm message", {
            confirm: {
                label: "OK",
                waiting: "Please wait",
                onConfirm: function (notice) {
                    setTimeout(function () {
                        notice();
                    }, 2000);
                }
            },
            cancel: {
                label: "Cancel",
                onCancel: function () {
                    console.log("cancel");
                }
            }
        });

        $("#dialog").dialog("This is title", $(_.template($("#form-tpl").html())()), {
            confirm: {
                label: "Save",
                waiting: "Please wait",
                onConfirm: function (notice) {
                    setTimeout(function () {
                        notice();
                    }, 2000);
                }
            },
            cancel: {
                label: "Cancel",
                onCancel: function () {
                    console.log("cancel");
                }
            },
            size: "lg"
        });

        $("#form").form({
            confirm: {
                // btn: $("#save1"),
                class: "danger",
                onConfirm: function (notice) {
                    console.log("submit");
                    setTimeout(function () {
                        notice();
                    }, 1500);
                }
            },
            cancel: {
                // disabled: true,
                // btn: $("#cancel1"),
                onCancel: function () {
                    console.log("clear");
                }
            },
            // footer: {
            //     fixed: true
            // }
        });

        $("select[name='multi']").multiselect({
            search: {
                async: function (keyword, callback) {
                    // search by keyword
                    // your code
                    // async callback
                    setTimeout(function () {
                        callback([{
                            value: "11",
                            text: "eleven"
                        }]);
                    }, 1500);
                }
            }
        });

        $("#stepper").stepper({
            class: "outline-secondary",
            min: 0,
            max: 100,
            default: 20,
            step: 2
        });

        var btn = $("<div style='width:40px;height:25px;background-color:#198754;border-radius:2px;color:#fff;text-align:center;user-select:none;'>20</div>");
        $("#slider").slider({
            height: 5,
            classes: ["progress-bar-striped", "bg-success"],
            min: 0,
            max: 100,
            default: 20,
            step: 5,
            btn: btn,
            onChange: function (value) {
                btn.text(value);
            }
        });

        $("#birthday").datepicker({
            type: "date",
            range: true,
            lang: "zh"
            // week: {
            //     days: ["日", "一", "二", "三", "四", "五", "六"],
            //     firstDay: 0 // 0: Sun, 1: Mon
            // },
            // month: {
            //     months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            //     format: "MM月",
            // },
            // year: {
            //     format: "YYYY年"
            // },
            // btns: {
            //     back: {
            //         label: "返回"
            //     },
            //     clear: {
            //         label: "清空"
            //     },
            //     confirm: {
            //         label: "确认",
            //         onConfirm: function (date) {
            //             console.log(date);
            //         }
            //     }
            // }
        });

        // $.cascadeSelect([{
        //     selector: $("#province"),
        //     data: { 210000: "辽宁省", 220000: "吉林省" },
        //     selected: 220000
        // }, {
        //     selector: $("#city"),
        //     data: {
        //         210000: {
        //             210100: "沈阳市",
        //             210200: "大连市",
        //             210300: "鞍山市",
        //         },
        //         220000: {
        //             220100: "长春市",
        //             220200: "吉林市",
        //         }
        //     },
        //     selected: 220200
        // }, {
        //     selector: $("#district"),
        //     data: {
        //         210100: {
        //             210102: '和平区',
        //             210103: '沈河区',
        //             210104: '大东区',
        //             210105: '皇姑区'
        //         },
        //         210200: {
        //             210202: '中山区',
        //             210203: '西岗区',
        //             210204: '沙河口区',
        //             210211: '甘井子区'
        //         },
        //         210300: {
        //             210302: '铁东区',
        //             210303: '铁西区',
        //             210304: '立山区'
        //         },
        //         220100: {
        //             220102: '南关区',
        //             220103: '宽城区',
        //             220104: '朝阳区'
        //         },
        //         220200: {
        //             220202: '昌邑区',
        //             220203: '龙潭区',
        //             220204: '船营区'
        //         }
        //     },
        //     selected: 220203
        // }]);

        $.cascadeSelect([{
            selector: $("#province"),
            async: function (value, callback) {
                setTimeout(function () {
                    callback({ 210000: "辽宁省", 220000: "吉林省" }, 220000);
                }, 500);
            }
        }, {
            selector: $("#city"),
            async: function (value, callback) {
                var data = {
                    210000: {
                        210100: "沈阳市",
                        210200: "大连市",
                        210300: "鞍山市",
                    },
                    220000: {
                        220100: "长春市",
                        220200: "吉林市",
                    }
                };

                setTimeout(function () {
                    callback(data[value], 220200);
                }, 500);
            }
        }, {
            selector: $("#district"),
            async: function (value, callback) {
                var data = {
                    210100: {
                        210102: '和平区',
                        210103: '沈河区',
                        210104: '大东区',
                        210105: '皇姑区'
                    },
                    210200: {
                        210202: '中山区',
                        210203: '西岗区',
                        210204: '沙河口区',
                        210211: '甘井子区'
                    },
                    210300: {
                        210302: '铁东区',
                        210303: '铁西区',
                        210304: '立山区'
                    },
                    220100: {
                        220102: '南关区',
                        220103: '宽城区',
                        220104: '朝阳区'
                    },
                    220200: {
                        220202: '昌邑区',
                        220203: '龙潭区',
                        220204: '船营区'
                    }
                };

                setTimeout(function () {
                    callback(data[value], 220203);
                }, 500);
            }
        }]);

        $(".uploader").uploader({
            data: ["/uploads/1.jpeg", "/uploads/20210630——域名系统功能梳理.docx", "/uploads/批量变更接入模版.xlsx"]
        });

        var up = $(".dd-uploader").uploader({
            url: "/uploads",
            fieldName: "file",
            dragdrop: true,
            lang: "zh",
            accept: "image/*",
            onSuccess: function (result, textStatus, xhr) {
                console.log(up.total());
            },
            onDelete: function (filename, path, type) {
                console.log(up.total());
            }
        });
    }

    return {
        name: "Component",
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