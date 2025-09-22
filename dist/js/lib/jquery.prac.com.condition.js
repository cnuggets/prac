!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","common","component"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(v,p){function r(e){var i={conditions:[],op:e.find(".cop").attr("op")};return v.each(e.find(".cond"),function(e,t){var n,a;v(t).find("select[name='_p_cond_name'] option:selected").attr("value")&&(n=v(t).find("select[name='_p_cond_name'] option:selected").attr("value").trim(),a=[],v.each(v(t).find("select[name='_p_cond_value'] option:selected"),function(e,t){a.push(v(t).attr("value").trim())}),t=v(t).find("input[name='_p_cond_op']").val(),0<=n.length&&(0<=["nil","notnil"].indexOf(t)||0<a.length)&&i.conditions.push({name:n,values:a,op:t}))}),i}v.fn.condition=function(a){var i=v(this),e={en:{ops:{lt:{value:"<",text:"less than"},lte:{value:"<=",text:"less than or equal"},gt:{value:">",text:"greater than"},gte:{value:">=",text:"greater than or equal"},eq:{value:"=",text:"equal"},neq:{value:"!=",text:"not equal"},in:{value:"in",text:"in"},nin:{value:"not in",text:"not in"},match:{value:"match",text:"match"},notmatch:{value:"not match",text:"not match"},range:{value:"range",text:"range"},nil:{value:"empty",text:"empty"},notnil:{value:"not empty",text:"not empty"}},text:{add:"Add Condition"}},zh:{ops:{lt:{value:"<",text:"小于"},lte:{value:"<=",text:"小于等于"},gt:{value:">",text:"大于"},gte:{value:">=",text:"大于等于"},eq:{value:"=",text:"等于"},neq:{value:"!=",text:"不等于"},in:{value:"包含",text:"包含"},nin:{value:"不包含",text:"不包含"},match:{value:"匹配",text:"匹配"},notmatch:{value:"不匹配",text:"不匹配"},range:{value:"范围",text:"范围"},nil:{value:"为空",text:"为空"},notnil:{value:"不为空",text:"不为空"}},text:{add:"添加条件"}}},e=e[(a=a||{}).lang]||e.en;a=v.extend(!0,{},{lang:"en",options:{names:{},values:{}}},e,a);var o=`
            <div class="cond">
                <div class="input">
                    <div class="nao">
                        <div class="name">
                            <select class="form-select" name="_p_cond_name" required>
                            <% if (opt.options.names) { %>
                                <% for (var value in opt.options.names) { %>
                                    <option value="<%=value%>"<% if (cond && cond.name == value) { %> selected<% } %>><%=opt.options.names[value]%></option>
                                <% } %>
                            <% } %>
                            </select>
                        </div>
                        <div class="op">
                            <div class="separator"></div>
                            <div class="selected">
                                <% 
                                    var op = cond ? cond.op : "eq";
                                    var value = opt.ops[op].value;
                                %>
                                <input type="hidden" name="_p_cond_op" value="<%=op%>">
                                <span><%=value%></span>
                                <i class="bi bi-chevron-down"></i>
                            </div>
                            <ul class="select">
                                <% for (var op in opt.ops) { %>
                                <li value="<%=op%>">
                                    <a href="javascript:void(0)" title="<%=opt.ops[op].text%>" p-tooltip><%=opt.ops[op].value%></a>
                                </li>
                                <% } %>
                            </ul>
                        </div>
                    </div>
                    <div class="value">
                        <select class="form-select" name="_p_cond_value" required<% if (cond && ["in", "nin", "range"].indexOf(cond.op) >= 0) { %> multiple<% } %>>
                        <% if (opt.options.values) { %>
                            <% for (var value in opt.options.values) { %>
                                <option value="<%=value%>"<% if (cond && cond.values.indexOf(value) >= 0) { %> selected<% } %>><%=opt.options.values[value]%></option>
                            <% } %>
                        <% } %>
                        </select>
                    </div>
                </div>
                <div class="remove">
                    <a href="javascript:void(0)">
                        <i class="bi bi-trash"></i>
                    </a>
                </div>
            </div>
        `;function t(e){if(e&&v.isArray(e)){var t={};return e.forEach(function(e){t[e]=e}),t}return e}a.options.names=t(a.options.names),a.options.values=t(a.options.values),i.html(""),i.append(v(p.template(`
            <div class="p-cond">
                <div class="cop" op="and">
                    <div class="inner">
                        <span>And</span>
                        <i class="bi bi-arrow-repeat"></i>
                    </div>
                </div>
                <div class="conn"></div>
                <div class="conds">
                </div>
                <div class="add">
                    <button type="button" class="btn btn-secondary btn-sm">
                        <i class="bi bi-plus"></i>
                        <span><%=opt.text.add%></span>
                    </button>
                </div>
            </div>
        `)({opt:a})));var s=i.find(".conds"),n=i.find(".conn"),l=i.find(".cop"),c=i.find(".add button");function d(){1<i.find(".cond").length?(l.css("display","flex"),n.show(),c.closest(".add").addClass("multi")):(l.hide(),n.hide(),c.closest(".add").removeClass("multi"))}function u(e){var t=v(p.template(o)({opt:a,cond:e}));v.each(t.find(".name select"),function(e,t){v(t).multiselect({search:!0,allowCreate:a.allowCreate})}),v.each(t.find(".value select"),function(e,t){v(t).multiselect({search:!0,allowCreate:!0})}),t.find(".remove").on("click",function(){v(this).closest(".cond").remove(),d()}),t.find(".multiselect input").on("focus",function(){i.find(".cond .select").prev(".selected").removeClass("changing")}),t.find(".multiselect .selected").on("click",function(){i.find(".cond .select").prev(".selected").removeClass("changing")});var n=t.find(".op .selected"),e=t.find(".op .select");v("body").on("click",function(){i.find(".selected").removeClass("changing")}),n.on("click",function(e){e.stopPropagation(),v(this).hasClass("changing")?v(this).removeClass("changing"):(i.find(".selected").removeClass("changing"),v(this).addClass("changing")),i.find(".multiselect .select").hide()}),e.on("click",function(e){e.stopPropagation()}),e.find("li").on("click",function(){var e=v(this).attr("value"),t=a.ops[e].value,n=v(this).closest(".select").prev(".selected");n.find("input").val(e),n.find("span").text(t),n.removeClass("changing"),n=v(this).closest(".input").find(".value select"),0<=["in","nin","range"].indexOf(e=e)?(n.closest(".value").show(),n.attr("required",!0),n.attr("multiple")||(n.attr("multiple",!0),n.multiselect({search:!0,allowCreate:!0}))):0<=["nil","notnil"].indexOf(e)?(n.removeAttr("required"),n.closest(".value").hide()):(n.closest(".value").show(),n.attr("required",!0),n.attr("multiple")&&(n.removeAttr("multiple"),n.multiselect({search:!0,allowCreate:!0})))}),s.append(t),d()}return a.data&&("or"==a.data.op&&(l.attr("op","or"),l.find("span").text("Or")),a.data.conditions&&a.data.conditions.forEach(function(e){a.options.names[e.name]||(a.options.names[e.name]=e.name),e.values.forEach(function(e){a.options.values[e]||(a.options.values[e]=e)}),u(e)})),l.on("click",function(){"and"==v(this).attr("op")?(v(this).attr("op","or"),v(this).find("span").text("Or")):(v(this).attr("op","and"),v(this).find("span").text("And"))}),c.on("click",function(){u()}),{data:function(){return r(i)}}},v.conditions=r});
//# sourceMappingURL=jquery.prac.com.condition.js.map