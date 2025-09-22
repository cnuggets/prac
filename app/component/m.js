define([
    "text!app/component/m-tpl.html", "underscore", "moment", "jquery", "form", "action", "nav", "display"
], function (tpl, _, moment, $) {

    function _init() {
        var p1 = $("#progress").progress({
            default: 30,
            classes: ["bg-danger", "progress-bar-striped"],
            formatter: function(value) {
                return value + "%";
            },
            onChange: function (value) {
                console.log(value);
            }
        });

        $("[increase]").on("click", function () {
            p1.setValue(p1.getValue() + 10);
        });
        $("[decrease]").on("click", function () {
            p1.setValue(p1.getValue() - 10);
        });

        $("[el]").ellipsis({
            lang: "zh",
            lines: 3,
            expandable: true
        });

        $("[pop1]").popover();

        $("[pop2]").popover({
            content: `
                <ul>
                    <li>Option 1111</li>
                    <li>Option 2222</li>
                    <li>Option 3333</li>
                    <li>Option 4444</li>
                </ul>
            `,
            position: "top",
            location: "end"
        });

        $("[pop11]").popover({
            content: `
                <ul>
                    <li>Option 1111</li>
                    <li>Option 2222</li>
                    <li>Option 3333</li>
                    <li>Option 4444</li>
                </ul>
            `,
            position: "top",
            location: "begin"
        });
        $("[pop12]").popover({
            content: `
                <ul>
                    <li>Option 1111</li>
                    <li>Option 2222</li>
                    <li>Option 3333</li>
                    <li>Option 4444</li>
                </ul>
            `,
            position: "right",
            location: "middle"
        });
        $("[pop13]").popover({
            content: `
                <ul>
                    <li>Option 1111</li>
                    <li>Option 2222</li>
                    <li>Option 3333</li>
                    <li>Option 4444</li>
                </ul>
            `,
            position: "left",
            location: "middle"
        });

        var content = $(`
            <ul>
                <li>Option 1111</li>
                <li>Option 2222</li>
                <li>Option 3333</li>
                <li>Option 4444</li>
            </ul>
        `);

        var pop14 = $("[pop14]").popover({
            content: content
        });

        content.find("li").on("click", function () {
            pop14.close();
        });

        var mbc = $("#multiBottom");
        $("input[name='multi']").on("click", function () {
            mbc.offcanvas("toggle");
        });
        var multi = $("#multi").multiselect([{
            value: 1,
            text: "One",
            selected: true
        }, {
            value: 2,
            text: "Two"
        }, {
            value: 3,
            text: "Three"
        }, {
            value: 4,
            text: "Four",
            selected: true
        }, {
            value: 5,
            text: "Five"
        }, {
            value: 6,
            text: "Six"
        }, {
            value: 7,
            text: "Seven"
        }, {
            value: 8,
            text: "Eight"
        }, {
            value: 9,
            text: "Nine"
        }, {
            value: 10,
            text: "Ten"
        }], {
            title: "请选择",
            class: "danger",
            confirm: {
                label: "确认",
                onConfirm: function (values) {
                    $("input[name='multi']").val(values.join(","));
                    mbc.offcanvas("toggle");
                }
            },
            cancel: {
                label: "取消",
                onCancel: function (values) {
                    mbc.offcanvas("toggle");
                }
            }
        });
        // multi.select(10);

        $("#page").pagination(40, 10, 103, "", {
            max: 3
        });

        // var slides = $("#slides").slides({
        //     autoplay: false,
        //     indicator: true,
        //     onChange: function(index) {
        //         console.log(index);
        //     }
        // });
        // slides.select(2);

        // $("#slider").slider({
        // });

        // var ip = $.imagePreview([{
        //     path: "/res/images/1.jpeg"
        // }, {
        //     path: "/res/images/2.jpeg"
        // }]);

        // $("#sidebar").offcanvas("toggle");

        // var topMenu = $("#top-menu").topMenu();
        // topMenu.bindTo($("#menu"));

        // var sidebar = $("#sidebar").sidebar();
        // sidebar.bindTo($("#menu"));

        // $("[ p-dropdown]").dropdown({
        //     onChange: function (value, index) {
        //         console.log(value, index);
        //     }
        // });

        // var u = $("#uploader").uploader({
        //     url: "/upload",
        //     width: "7rem",
        //     limit: 10,
        //     //accept: ".docx",
        //     validation: {
        //         size: function (size, index) {
        //             console.log(index);
        //             // if (size < 5 * 1024 * 1024) {
        //             //     $.toast("文件太小", {
        //             //         class: "danger",
        //             //         timeout: 2000
        //             //     });
        //             //     return false;
        //             // }
        //             console.log(size);
        //             return true;
        //         },
        //         type: function (type) {
        //             // if (type.name != "image") {
        //             //     $.toast("只能上传图片", {
        //             //         class: "danger",
        //             //         timeout: 2000
        //             //     });
        //             //     return false;
        //             // }
        //             console.log(type);
        //             return true;
        //         }
        //     },
        //     onProgress: function (loaded, total) {
        //         console.log(loaded / total);
        //     },
        //     onSuccess: function (result, textStatus, xhr) {
        //         console.log(result);
        //         return {
        //             name: result.name,
        //             path: result.path
        //         };
        //     },
        //     onError: function (xhr, textStatus, errorThrown) {
        //         return {
        //             code: xhr.status,
        //             msg: xhr.responseText
        //         }
        //     },
        //     onComplete: function (index) {
        //         console.log("complete index = ", index);
        //         console.log(u.files());
        //     },
        //     onRemove: function (file, index) {
        //         console.log("remove index = ", index);
        //         console.log("remove file = ", file);
        //         console.log(u.files());
        //     }
        // });

        // $("input[type='file']").on("change", function (e) {
        // var files = e.originalEvent.target.files;
        // console.log(files);
        // var formData = new FormData();
        // formData.append("file", files[0]);
        // console.log(files[0]);
        // $.ajax({
        //     url: "/upload",
        //     type: "POST",
        //     data: formData,
        //     contentType: false,
        //     processData: false,
        //     xhr: function () {
        //         var xhr = new window.XMLHttpRequest();
        //         xhr.upload.addEventListener("progress", function (event) {
        //             if (event.lengthComputable) {
        //                 var percentComplete = (event.loaded / event.total) * 100;
        //                 console.log(percentComplete);
        //             }
        //         }, false);
        //         return xhr;
        //     },
        //     success: function (result, textStatus, xhr) {
        //         console.log(result);
        //     },
        //     error: function (xhr, textStatus, errorThrown) {
        //         console.log(xhr.status);
        //     }
        // });
        //});

        // $("#lazyload").lazyload({
        //     //selfScroll: true,
        //     onLoad: function (image) {
        //         console.log(image.attr("src"));
        //     }
        // });

        // var tabBar = $("#tabbar").tabBar({
        //     class: "success",
        //     fixed: true,
        //     onChange: function (index) {
        //         console.log(index);
        //     }
        // });
        // tabBar.select(1);

        // $.toast("显示一个消息，等待一会消失", {
        //     class: "danger",
        //     timeout: 20000
        // });
        // var tt = $(`
        //     <div class="text-danger" style="background-color: rgb(220, 53, 69, 0.2)">
        //         <div>
        //             <div><i class="bi bi-bell"></i>&nbsp;<span>提醒事项12345</span></div>
        //             <div>222</div>
        //         </div>
        //     <div>`
        // );
        // $.toast(tt, {
        //     height: "70px",
        //     timeout: 3000,
        //     onComplete: function () {
        //         console.log("ok");
        //     }
        // });

        // $("#collapse").collapse({
        //     accordion: true,
        //     onUncollapse: function(index) {
        //         console.log(index);
        //     },
        //     onCollapse: function(index) {
        //         console.log(index);
        //     }
        // });

        // $("#rate").rate({
        //     half: true,
        //     type: "heart",
        //     class: "danger",
        //     count: 6,
        //     onChange: function(index) {
        //         console.log(index);
        //     }
        // });

        // $.dialog("确认标题", "这里是确认的消息，点击确认按钮可以关闭对话框，这里应该有更多的内容。", {
        //     type: "confirm",
        //     cancel: {
        //         label: "取消",
        //         async: true,
        //         onCancel: function (done) {
        //             setTimeout(function () {
        //                 done();
        //             }, 1500);
        //         }
        //     },
        //     confirm: {
        //         label: "确认",
        //         async: true,
        //         onConfirm: function (done) {
        //             setTimeout(function () {
        //                 done();
        //             }, 1500);
        //         }
        //     }
        // });
        // var indexNav = $(".p-index-nav").indexNav({
        //     onChange: function(index) {
        //         console.log(index);
        //     }
        // });
        // indexNav.select("C");

        var cc = $("#cityBottom");
        var city = $("#city").picker(
            ["沈阳", "大连", "成都", "北京", "上海"],
            {
                title: "选择城市",
                confirm: {
                    label: "确认",
                    onConfirm: function (value) {
                        $("input[name='city']").val(value).change();
                        cc.offcanvas("toggle");
                    }
                },
                cancel: {
                    label: "取消",
                    onCancel: function () {
                        cc.offcanvas("toggle");
                    }
                }
            }
        );
        $("input[name='city']").on("click", function () {
            cc.offcanvas("toggle");
        });

        var cc1 = $("#calendarBottom");
        $("input[name='date1']").on("click", function () {
            cc1.offcanvas("toggle");
        });

        $("#calendar").calendar({
            title: "日期选择",
            class: "danger",
            month: {
                format: "YYYY年MM月"
            },
            week: {
                days: ["日", "一", "二", "三", "四", "五", "六"],
                firstDay: 1
            },
            confirm: {
                label: "确认",
                onConfirm: function (date) {
                    $("input[name='date1']").val(moment(date).format("YYYY-MM-DD")).change();
                    cc1.offcanvas("toggle");
                }
            }
        });

        $("#slider").slider();
        $("#stepper").stepper();
        $("#rate").rate({
            selected: 1,
            onChange: function (value) {
                console.log(value);
            }
        });
        $("#uploader").uploader();

        $("#to-share").on("click", function () {
            $("#shareBottom").offcanvas("toggle");
        });

        $("#share").share({
            onSelect: function (index) {
                console.log(index);
            }
        });

        var form = $(".p-form").form({
            validations: {
                username: function (elem, callback) {
                    setTimeout(function () {
                        // async validate username
                        if (elem.val() == "test") {
                            callback(false, "Username already exsits");
                        } else {
                            callback(true);
                        }
                    }, 1500);
                },
                vcode: function (elem, callback) {
                    setTimeout(function () {
                        // async validate vcode
                        if (elem.val() == "1234") {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    }, 1500);
                }
            },
            onSubmit: function () {
                var loading = $(".p-form").loading({
                    overlay: {
                        disabled: true
                    },
                    spinner: {
                        class: "secondary"
                    }
                });
                setTimeout(function () {
                    loading.stop();
                }, 1500);
            }
        });

        // var username = $(".p-form").find("input[name='username']");
        // form.loading(username, function (done) {
        //     setTimeout(function () {
        //         done(username);
        //     }, 1500);
        // });

        // $("#submit").on("click", function (e) {
        //     var loading = $(".p-form").loading({
        //         overlay: {
        //             disabled: true
        //         },
        //         spinner: {
        //             class: "secondary"
        //         }
        //     });
        //     setTimeout(function () {
        //         loading.stop();
        //     }, 1500);
        // });
        // var data = [];
        // var offset = 0;
        // var size = 10;
        // for (var i = 0; i < 45; i++) {
        //     data.push(i + 1);
        // }

        // var list = $("#list").loadList({
        //     text: ["加载中", "没有更多数据"],
        //     topOffset: $(".p-pull-refresh").position().top,
        //     onLoading: function (onComplete) {
        //         if (offset >= data.length) {
        //             onComplete(true);
        //             return;
        //         }
        //         setTimeout(function () {
        //             _list();
        //             onComplete();
        //         }, 1000);
        //     }
        // });

        // var pr = $(".p-pull-refresh").pullRefresh({
        //     onLoading: function (onComplete) {
        //         setTimeout(function () {
        //             onComplete();
        //             $("#list ul").html("");
        //             offset = 0;
        //             _list();

        //             list.reset();
        //         }, 2000);
        //     }
        // });

        // function _list() {
        //     var d = data.slice(offset, offset + size);
        //     var tpl = `
        //         <%_.each(items, function(i) {%>
        //             <li><%=i%></li>
        //         <% }); %>
        //     `;
        //     $("#list ul").append($(_.template(tpl)({
        //         items: d
        //     })));
        //     offset += size;
        // }

        // var sc = $(".p-swipe-cell").swipeCell();
        // $("#delete").on("click", function () {
        //     console.log("delete");
        // });

        // $("#datepicker").datePicker({
        //     //type: "md",
        //     year: {
        //         scope: [2000, 2025],
        //         formatter: function (year) {
        //             return year + "年";
        //         }
        //     },
        //     month: {
        //         formatter: function (month) {
        //             return month + "月";
        //         }
        //     },
        //     date: {
        //         formatter: function (date) {
        //             return date + "日";
        //         }
        //     },
        //     confirm: {
        //         onConfirm: function (values) {
        //             console.log(values);
        //         }
        //     }
        // });

        // $("#timepicker").timePicker({
        //     //type: "ms",
        //     hour: {
        //         scope: [8, 17],
        //         formatter: function (hour) {
        //             return hour + "时";
        //         }
        //     },
        //     minute: {
        //         formatter: function (minute) {
        //             return minute + "分";
        //         }
        //     },
        //     second: {
        //         formatter: function (second) {
        //             return second + "秒";
        //         }
        //     },
        //     confirm: {
        //         onConfirm: function (values) {
        //             console.log(values);
        //         }
        //     }
        // });

        // $("#picker1").picker(
        //     ["One", "Two", "Three"],
        //     {
        //         height: "200px",
        //         onChange: function (value) {
        //             console.log(value);
        //         },
        //         confirm: {
        //             onConfirm: function (value) {
        //                 console.log(value);
        //             }
        //         }
        //     }
        // );
        // var loading1 = $("#picker1").loading({
        //     overlay: {
        //         css: {
        //             "background-color": "rgb(255, 255, 255, 70%)",
        //             "border-radius": "8px"
        //         }
        //     },
        //     spinner: {
        //         class: "warning"
        //     }
        // });
        // setTimeout(function () {
        //     loading1.stop();
        // }, 1000);

        // var picker2 = $("#picker2").picker(
        //     [
        //         ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        //         ["Morning", "Noon", "Night"]
        //     ],
        //     {
        //         columns: 2,
        //         confirm: {
        //             onConfirm: function (values) {
        //                 console.log(values);
        //             }
        //         }
        //     }
        // );
        // picker2.select("Tuesday", "Noon");

        // var picker3 = $("#picker3").picker(
        //     [
        //         { 210000: "辽宁省", 220000: "吉林省" },
        //         {
        //             210000: {
        //                 210100: "沈阳市",
        //                 210200: "大连市",
        //                 210300: "鞍山市",
        //             },
        //             220000: {
        //                 220100: "长春市",
        //                 220200: "吉林市",
        //             }
        //         },
        //         {
        //             210100: {
        //                 210102: '和平区',
        //                 210103: '沈河区',
        //                 210104: '大东区',
        //                 210105: '皇姑区'
        //             },
        //             210200: {
        //                 210202: '中山区',
        //                 210203: '西岗区',
        //                 210204: '沙河口区',
        //                 210211: '甘井子区'
        //             },
        //             210300: {
        //                 210302: '铁东区',
        //                 210303: '铁西区',
        //                 210304: '立山区'
        //             },
        //             220100: {
        //                 220102: '南关区',
        //                 220103: '宽城区',
        //                 220104: '朝阳区'
        //             },
        //             220200: {
        //                 220202: '昌邑区',
        //                 220203: '龙潭区',
        //                 220204: '船营区'
        //             }
        //         }
        //     ],
        //     {
        //         columns: 3,
        //         cascade: true,
        //         confirm: {
        //             onConfirm: function (values) {
        //                 console.log(values);
        //             }
        //         }
        //     }
        // );
        // picker3.select(210000, 210200, 210203);

        // $("#city").on("click", function () {
        //     $("#offcanvasBottom").offcanvas("toggle");
        // });

        // $("#picker4").picker(
        //     ["Shenyang", "Dalian", "Bejing", "Shanghai", "Wuhan", "Zhengzhou", "Jinan", "Xi'an", "Guangzhou"],
        //     {
        //         height: "200px",
        //         onChange: function (value) {
        //             console.log(value);
        //         },
        //         cancel: {
        //             onCancel: function () {
        //                 $("#offcanvasBottom").offcanvas("toggle");
        //             }
        //         },
        //         confirm: {
        //             onConfirm: function (value) {
        //                 $("#city").val(value);
        //                 $("#offcanvasBottom").offcanvas("toggle");
        //             }
        //         }
        //     }
        // );


    }

    return {
        name: "m",
        enter: function () {
            console.log("enter m");
        },
        init: function () {
            _init();
        },
        render: function (ctx, args, onload) {
            ctx.html(_.template(tpl)());
            onload(args);
        },
        leave: function () {
            console.log("leave m");
        }
    }
});