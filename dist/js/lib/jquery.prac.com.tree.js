!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(w,C){w.fn.tree=function(s){var a=w(this);s=s||{};s=w.extend(!0,{},{icon:{node:"bi-file-earmark",folder:"bi-folder-fill"},checkable:!1,editable:!0},s);var l,t=`
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
        `,f=`
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
        `,r=w(`
            <div class="insert-line">
                <i class="bi bi-caret-right-fill"></i>
                <div class="line"></div>
            </div>
        `);function c(){!function i(e,t){w.each(e,function(e,n){w(n).find(">li>.node").attr("level",t),i(w(n).find(">li>ul"),t+1)})}(a.children("ul"),0),k()}function u(){return a.find(".node")}function p(e,n,i){i=w(C.template(t)({type:n,data:e,cfg:s,columns:g(),edit:null!=i&&i}));return i.data("value",e.value),o(i),i}function o(e){var o,d,n;return e.children("i.bi").on("click",function(e){e.stopPropagation();var n=w(this).closest(".node"),e=n.siblings("ul");e.is(":hidden")?(n.addClass("unfold"),e.slideDown(200)):(n.removeClass("unfold"),e.slideUp(200))}),e.on("click",function(e){e.stopPropagation(),function(e){var n=i();if(n&&n!=e&&!x(n))return;h(e),b()}(w(this))}),s.editable&&(e.on("contextmenu",function(e){!function(e,o){e.preventDefault(),e.stopPropagation(),b(),o.addClass("focus");var n="node"==v(o)?`
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
            `:`
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
            `;function i(e,n){var i=p({content:"",descriptions:[]},e,!0),t=w("<li></li>");t.append(i),"folder"==e&&t.append(w("<ul></ul>")),n?(o.siblings("ul").append(t),i.attr("level",parseInt(o.attr("level"))+1)):(o.closest("li").after(t),i.attr("level",o.attr("level"))),i.find("input[type='text']").on("click",function(e){e.stopPropagation()}),i.find("input[type='text']").on("keyup",function(e){13==e.keyCode&&m()}),i.trigger("click"),i.find("input[type='text']").eq(0).focus(),h(i),k(),l.remove()}l=w(n),w("body").append(l),l.css("left",e.pageX),l.css("top",e.pageY),l.on("click",function(e){e.stopPropagation()}),l.find("li[move-up]").on("click",function(){o.closest("li").prev().before(o.closest("li")),b()}),l.find("li[move-down]").on("click",function(){o.closest("li").next().after(o.closest("li")),b()}),l.find("li[delete]").on("click",function(){o.closest("li").remove(),b()}),l.find("li[edit]").on("click",function(e){e.stopPropagation(),function(e){var i="",t=[];w.each(e.find("span.text"),function(e,n){0==e?i=w(n).text():t.push(w(n).text())});var n=v(e),o=p({content:i,descriptions:t},n,!0);"folder"==n&&e.hasClass("unfold")&&o.addClass("unfold"),o.attr("level",e.attr("level")),o.data("value",e.data("value")),o.find("input[type='text']").on("click",function(e){e.stopPropagation()}),o.find("input[type='text']").on("keyup",function(e){13==e.keyCode&&m()}),e.after(o),o.find("input[type='text']").eq(0).focus().select(),e.remove(),k(),h(o),l.remove()}(o)}),l.find("li[new-node]").on("click",function(){i("node")}),l.find("li[new-folder]").on("click",function(){i("folder")}),l.find("li[new-child-node]").on("click",function(){"folder"!=v(o)||o.hasClass("unfold")||o.children("i.bi").trigger("click"),i("node",!0)}),l.find("li[new-child-folder]").on("click",function(){"folder"!=v(o)||o.hasClass("unfold")||o.children("i.bi").trigger("click"),i("folder",!0)})}(e,w(this))}),e.find(".content").bindDragMove(function(e,n,i){b();i=i.closest(".node");o={x:i.position().left-n.x,y:i.position().top-n.y},a.addClass("none-user-select")},function(e,n,i,t){clearTimeout(d);var l,c=t.closest(".node");0<c.find("input[type='text']").length||(c.attr("moving",!0),0==(t=a.find(".moving-node")).length&&(t=w(C.template(f)({type:v(c),cfg:s,content:c.find(".content span.text").text()})),a.append(t)),l=n.y+o.y,t.css("top",l),t.css("left",n.x+o.x),d=setTimeout(function(){var o=c.height();w.each(a.find(".node:not([moving]"),function(e,n){var i,t;w(n).is(":visible")&&("folder"==v(t=a.find(".node[moving]"))&&parseInt(w(n).attr("level"))>parseInt(t.attr("level"))||(i=w(n).position().top-l,"folder"==v(w(n))&&Math.abs(i)<o/5?(w(n).hasClass("unfold")||w(n).children("i.bi").trigger("click"),0==(t=w(n).siblings("ul").find(".node")).length?w(n).siblings("ul").append(r):t.eq(0).closest("li").before(r)):i<0&&4*-o/5<=i?w(n).closest("li").after(r):o/5<i&&i<=4*o/5&&w(n).closest("li").before(r)))})},110))},function(e,n,i){clearTimeout(d);var t,o=a.find(".moving-node");0<o.length&&(0<a.find(".insert-line").length&&(t=a.find(".node[moving]"),r.after(t.closest("li")),c()),o.remove(),u().removeAttr("moving"),s.checkable&&y()),a.find(".insert-line").remove(),a.removeClass("none-user-select")})),s.checkable&&((n=e.find(">.item>.content>input[type='checkbox']")).on("click",function(e){e.stopPropagation()}),n.on("change",function(e){var n=w(this).closest(".node").siblings("ul").find("input[type='checkbox']");w(this).is(":checked")?n.prop("checked",!0):(n.prop("checked",!1),function e(n){0<n.length&&(n.find("input[type='checkbox']").prop("checked",!1),e(n.closest("ul").siblings(".node")))}(w(this).closest("ul").siblings(".node")))})),e}function h(e){s.checkable||(u().removeClass("selected"),e.addClass("selected"))}function v(e){return 0<e.siblings("ul").length?"folder":"node"}function g(){var i=1;return w.each(u(),function(e,n){n=w(n).find(".item").children("div").length;i<n&&(i=n)}),i}function k(){var i,l=(i=0,w.each(u(),function(e,n){n=parseInt(w(n).attr("level"));i<n&&(i=n)}),i),c=g(),d=u().eq(0).width(),s=d/c;w.each(u(),function(e,n){var i=w.remToPixels(1.25),t=parseInt(w(n).attr("level")),o=s+i*(l-t),t=d-i*t-o;w(n).find(">.item>.content").css("width",o),w(n).find(">.item>.description").css("width",t/(c-1))})}function b(){l&&(u().removeClass("focus"),l.remove())}function m(){x(i())}function i(){var e=a.find(".item input[type='text']");if(0<e.length)return e.closest(".node")}function x(e){if(e&&0!=e.find("input[type='text']").eq(0).val().length){var i="",t=[];w.each(e.find("input[type='text']"),function(e,n){0==e?i=w(n).val():t.push(w(n).val())});var n=v(e),o=p({content:i,descriptions:t},n);return"folder"==n&&e.hasClass("unfold")&&o.addClass("unfold"),o.attr("level",e.attr("level")),o.data("value",e.data("value")),e.after(o),e.remove(),k(),s.checkable&&y(),1}}function y(){w.each(u(),function(e,i){var n;"folder"==v(w(i))&&w(i).find("input[type='checkbox']").is(":checked")&&(n=w(i).siblings("ul").find(">li>.node"),w.each(n,function(e,n){w(n).find("input[type='checkbox']").is(":checked")||w(i).find("input[type='checkbox']").prop("checked",!1)}))})}return s.data&&0<s.data.length?(a.html(""),a.addClass("tree"),a.append(w("<ul></ul>")),function o(l,e){e.forEach(function(e){var n=e.children&&0<e.children.length?"folder":"node",i=p(e,n),t=w("<li></li>");t.append(i),l.append(t),"folder"==n&&(n=w("<ul></ul>"),t.append(n),o(n,e.children))})}(a.find("ul"),s.data),c(),w.each(u(),function(e,n){"folder"==v(w(n))&&w(n).find("input[type='checkbox']").is(":checked")&&w(n).siblings("ul").find("input[type='checkbox']").prop("checked",!0)})):(w.each(a.find(".node"),function(e,n){o(w(n)),w(n).hasClass("unfold")&&w(n).siblings("ul").show()}),c()),w("body").on("contextmenu",function(e){b(),m()}),a.on("click",function(){b(),m()}),w("body").on("click",function(){b(),m()}),w(window).on("resize",function(){k()}),{data:function(){var e=[];return function o(e,l){w.each(e,function(e,n){var i=[];w.each(w(n).find(".description .text"),function(e,n){i.push(w(n).text())});var t={id:w(n).attr("node-id"),content:w(n).find(".content .text").text(),descriptions:i,value:w(n).data("value"),children:[]};s.checkable&&(t.checked=w(n).find("input[type='checkbox']").is(":checked")),l.push(t),o(w(n).siblings("ul").find(">li>.node"),t.children)})}(a.find(">ul>li>.node"),e),e}}}});
//# sourceMappingURL=jquery.prac.com.tree.js.map