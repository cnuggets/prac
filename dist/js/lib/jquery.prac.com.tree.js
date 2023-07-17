!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(y,C){y.fn.tree=function(s){var a=y(this),e={en:{menu:{newNode:"New Node",newFolder:"New Folder",newChildNode:"New Child Node",newChildFolder:"New Child Folder",moveUp:"Move Up",moveDown:"Move Down",edit:"Edit",remove:"Delete"}},zh:{menu:{newNode:"新建节点",newFolder:"新建文件夹",newChildNode:"新建子节点",newChildFolder:"新建子文件夹",moveUp:"上移",moveDown:"下移",edit:"编辑",remove:"删除"}}},e=e[(s=s||{}).lang]||e.en;s=y.extend(!0,{},{lang:"en",icon:{node:"bi-file-earmark",folder:"bi-folder-fill"},checkable:!1,editable:!0},e,s);var l,t=`
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
        `,r=`
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
        `,f=y(`
            <div class="insert-line">
                <i class="bi bi-caret-right-fill"></i>
                <div class="line"></div>
            </div>
        `);function c(){!function i(e,t){y.each(e,function(e,n){y(n).find(">li>.node").attr("level",t),i(y(n).find(">li>ul"),t+1)})}(a.children("ul"),0),g()}function u(){return a.find(".node")}function p(e,n,i){i=y(C.template(t)({type:n,data:e,cfg:s,columns:m(),edit:null!=i&&i}));return i.data("value",e.value),o(i),i}function o(e){var o,d,n;return e.children("i.bi").on("click",function(e){e.stopPropagation();var n=y(this).closest(".node"),e=n.siblings("ul");e.is(":hidden")?(n.addClass("unfold"),e.slideDown(200)):(n.removeClass("unfold"),e.slideUp(200))}),e.on("click",function(e){e.stopPropagation(),function(e){var n=i();if(n&&n!=e&&!x(n))return;v(e),k()}(y(this))}),s.editable&&(e.on("contextmenu",function(e){!function(e,o){e.preventDefault(),e.stopPropagation(),k(),o.addClass("focus");var n="node"==h(o)?`
                <div class="tree-menu">
                    <ul>
                        <li new-node><%=newNode%></li>
                        <li new-folder><%=newFolder%></li>
                        <hr/>
                        <li move-up><%=moveUp%></li>
                        <li move-down><%=moveDown%></li>
                        <hr/>
                        <li edit><%=edit%></li>
                        <li delete><%=remove%></li>
                    </ul>
                </div>
            `:`
                <div class="tree-menu">
                    <ul>
                        <li new-node><%=newNode%></li>
                        <li new-folder><%=newFolder%></li>
                        <li new-child-node><%=newChildNode%></li>
                        <li new-child-folder><%=newChildFolder%></li>
                        <hr/>
                        <li move-up><%=moveUp%></li>
                        <li move-down><%=moveDown%></li>
                        <hr/>
                        <li edit><%=edit%></li>
                        <li delete><%=remove%></li>
                    </ul>
                </div>
            `;function i(e,n){var i=p({content:"",descriptions:[]},e,!0),t=y("<li></li>");t.append(i),"folder"==e&&t.append(y("<ul></ul>")),n?(o.siblings("ul").append(t),i.attr("level",parseInt(o.attr("level"))+1)):(o.closest("li").after(t),i.attr("level",o.attr("level"))),i.find("input[type='text']").on("click",function(e){e.stopPropagation()}),i.find("input[type='text']").on("keyup",function(e){13==e.keyCode&&b()}),i.trigger("click"),i.find("input[type='text']").eq(0).focus(),v(i),g(),l.remove()}l=y(C.template(n)(s.menu)),y("body").append(l),l.css("left",e.pageX),l.css("top",e.pageY),l.on("click",function(e){e.stopPropagation()}),l.find("li[move-up]").on("click",function(){o.closest("li").prev().before(o.closest("li")),k()}),l.find("li[move-down]").on("click",function(){o.closest("li").next().after(o.closest("li")),k()}),l.find("li[delete]").on("click",function(){o.closest("li").remove(),k()}),l.find("li[edit]").on("click",function(e){e.stopPropagation(),function(e){var i="",t=[];y.each(e.find("span.text"),function(e,n){0==e?i=y(n).text():t.push(y(n).text())});var n=h(e),o=p({content:i,descriptions:t},n,!0);"folder"==n&&e.hasClass("unfold")&&o.addClass("unfold"),o.attr("level",e.attr("level")),o.data("value",e.data("value")),o.find("input[type='text']").on("click",function(e){e.stopPropagation()}),o.find("input[type='text']").on("keyup",function(e){13==e.keyCode&&b()}),e.after(o),o.find("input[type='text']").eq(0).focus().select(),e.remove(),g(),v(o),l.remove()}(o)}),l.find("li[new-node]").on("click",function(){i("node")}),l.find("li[new-folder]").on("click",function(){i("folder")}),l.find("li[new-child-node]").on("click",function(){"folder"!=h(o)||o.hasClass("unfold")||o.children("i.bi").trigger("click"),i("node",!0)}),l.find("li[new-child-folder]").on("click",function(){"folder"!=h(o)||o.hasClass("unfold")||o.children("i.bi").trigger("click"),i("folder",!0)})}(e,y(this))}),e.find(".content").bindDragMove(function(e,n,i){k();i=i.closest(".node");o={x:i.position().left-n.x,y:i.position().top-n.y},a.addClass("none-user-select")},function(e,n,i,t){clearTimeout(d);var l,c=t.closest(".node");0<c.find("input[type='text']").length||(c.attr("moving",!0),0==(t=a.find(".moving-node")).length&&(t=y(C.template(r)({type:h(c),cfg:s,content:c.find(".content span.text").text()})),a.append(t)),l=n.y+o.y,t.css("top",l),t.css("left",n.x+o.x),d=setTimeout(function(){var o=c.height();y.each(a.find(".node:not([moving]"),function(e,n){var i,t;y(n).is(":visible")&&("folder"==h(t=a.find(".node[moving]"))&&parseInt(y(n).attr("level"))>parseInt(t.attr("level"))||(i=y(n).position().top-l,"folder"==h(y(n))&&Math.abs(i)<o/5?(y(n).hasClass("unfold")||y(n).children("i.bi").trigger("click"),0==(t=y(n).siblings("ul").find(".node")).length?y(n).siblings("ul").append(f):t.eq(0).closest("li").before(f)):i<0&&4*-o/5<=i?y(n).closest("li").after(f):o/5<i&&i<=4*o/5&&y(n).closest("li").before(f)))})},110))},function(e,n,i){clearTimeout(d);var t,o=a.find(".moving-node");0<o.length&&(0<a.find(".insert-line").length&&(t=a.find(".node[moving]"),f.after(t.closest("li")),c()),o.remove(),u().removeAttr("moving"),s.checkable&&w()),a.find(".insert-line").remove(),a.removeClass("none-user-select")})),s.checkable&&((n=e.find(">.item>.content>input[type='checkbox']")).on("click",function(e){e.stopPropagation()}),n.on("change",function(e){var n=y(this).closest(".node").siblings("ul").find("input[type='checkbox']");y(this).is(":checked")?n.prop("checked",!0):(n.prop("checked",!1),function e(n){0<n.length&&(n.find("input[type='checkbox']").prop("checked",!1),e(n.closest("ul").siblings(".node")))}(y(this).closest("ul").siblings(".node")))})),e}function v(e){s.checkable||(u().removeClass("selected"),e.addClass("selected"))}function h(e){return 0<e.siblings("ul").length?"folder":"node"}function m(){var i=1;return y.each(u(),function(e,n){n=y(n).find(".item").children("div").length;i<n&&(i=n)}),i}function g(){var i,l=(i=0,y.each(u(),function(e,n){n=parseInt(y(n).attr("level"));i<n&&(i=n)}),i),c=m(),d=u().eq(0).width(),s=d/c;y.each(u(),function(e,n){var i=y.remToPixels(1.25),t=parseInt(y(n).attr("level")),o=s+i*(l-t),t=d-i*t-o;y(n).find(">.item>.content").css("width",o),y(n).find(">.item>.description").css("width",t/(c-1))})}function k(){l&&(u().removeClass("focus"),l.remove())}function b(){x(i())}function i(){var e=a.find(".item input[type='text']");if(0<e.length)return e.closest(".node")}function x(e){if(e&&0!=e.find("input[type='text']").eq(0).val().length){var i="",t=[];y.each(e.find("input[type='text']"),function(e,n){0==e?i=y(n).val():t.push(y(n).val())});var n=h(e),o=p({content:i,descriptions:t},n);return"folder"==n&&e.hasClass("unfold")&&o.addClass("unfold"),o.attr("level",e.attr("level")),o.data("value",e.data("value")),e.after(o),e.remove(),g(),s.checkable&&w(),1}}function w(){y.each(u(),function(e,i){var n;"folder"==h(y(i))&&y(i).find("input[type='checkbox']").is(":checked")&&(n=y(i).siblings("ul").find(">li>.node"),y.each(n,function(e,n){y(n).find("input[type='checkbox']").is(":checked")||y(i).find("input[type='checkbox']").prop("checked",!1)}))})}return s.data&&0<s.data.length?(a.html(""),a.addClass("tree"),a.append(y("<ul></ul>")),function o(l,e){e.forEach(function(e){var n=e.children?"folder":"node",i=p(e,n),t=y("<li></li>");t.append(i),l.append(t),"folder"==n&&(n=y("<ul></ul>"),t.append(n),o(n,e.children))})}(a.find("ul"),s.data),c(),y.each(u(),function(e,n){"folder"==h(y(n))&&y(n).find("input[type='checkbox']").is(":checked")&&y(n).siblings("ul").find("input[type='checkbox']").prop("checked",!0)})):(y.each(a.find(".node"),function(e,n){o(y(n)),y(n).hasClass("unfold")&&y(n).siblings("ul").show()}),c()),y("body").on("contextmenu",function(e){k(),b()}),a.on("click",function(){k(),b()}),y("body").on("click",function(){k(),b()}),y(window).on("resize",function(){g()}),{data:function(){var e=[];return function o(e,l){y.each(e,function(e,n){var i=[];y.each(y(n).find(".description .text"),function(e,n){i.push(y(n).text())});var t={id:y(n).attr("node-id"),content:y(n).find(".content .text").text(),descriptions:i,value:y(n).data("value"),children:[]};s.checkable&&(t.checked=y(n).find("input[type='checkbox']").is(":checked")),l.push(t),o(y(n).siblings("ul").find(">li>.node"),t.children)})}(a.find(">ul>li>.node"),e),e}}}});
//# sourceMappingURL=jquery.prac.com.tree.js.map