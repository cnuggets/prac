define(["text!app/component/component-tpl.html", "bootstrap", "underscore", "jquery", "component", "datepicker", "uploader"], function (tpl, b, _, $) {

    function _init() {
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
                class: "danger",
                onConfirm: function (notice) {
                    console.log("submit");
                    setTimeout(function () {
                        notice();
                    }, 1500);
                }
            },
            cancel: {
                onCancel: function () {
                    console.log("clear");
                }
            }
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
            type: "year",
            range: true,
            // // format: "YYYY年MM月DD日",
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

        $(".uploader").uploader();
    }

    return {
        name: "component",
        init: function () {
            _init();
        },
        render: function (ctx, args, onload) {
            ctx.html(_.template(tpl)());
            onload(args);
        }
    }
});