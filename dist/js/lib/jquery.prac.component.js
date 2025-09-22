!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(v,g,e){function d(e){var t=!0;function n(e){var t=e.val(),n=e.attr("pattern");e.attr("required")?(0==t.length?o:l)(e):n&&(t.match(new RegExp(n))?l:o)(e)}function i(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?o:l)(e)}function a(e){e.attr("required")&&(e.is(":checked")?l:o)(e)}function s(e){e.removeClass("is-valid"),e.removeClass("is-invalid")}function l(e){e.removeClass("is-invalid").addClass("is-valid")}function o(e){t=!1,e.removeClass("is-valid").addClass("is-invalid")}return 0<e.length&&e.hasClass("needs-validation")&&(v.each(e.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"),function(e,t){s(v(t)),n(v(t)),v(t).on("change",function(){n(v(this))})}),v.each(e.find("select"),function(e,t){s(v(t)),i(v(t)),v(t).on("change",function(){i(v(this))})}),v.each(e.find("input[type='checkbox']"),function(e,t){s(v(t)),a(v(t)),v(t).on("change",function(){a(v(this))})})),t}function r(e){var n={};return e&&0!=e.length&&(v.each(e.find("input[name]"),function(e,t){var n=v(t),i=n.attr("name"),a=n.prop("type"),t=n.val();null==n.attr("p-integer")&&null==n.attr("p-decimal")||isNaN(t)||(t=Number(t)),("radio"!=a&&"checkbox"!=a||n.is(":checked"))&&s(i,t)}),v.each(e.find("textarea[name]"),function(e,t){t=v(t);s(t.attr("name"),t.val())}),v.each(e.find("select[name]"),function(e,t){var n=v(t),i=n.attr("name");v.each(n.find("option:selected"),function(e,t){t=v(t).attr("value");null==n.attr("p-integer")&&null==n.attr("p-decimal")||isNaN(t)||(t=Number(t)),s(i,t)})})),n;function s(e,t){null!=n[e]?(v.isArray(n[e])||(n[e]=[n[e]]),n[e].push(t)):n[e]=t}}function a(e,s,l,o){var c=e;o=o||{};o=v.extend(!0,{},{autoTrigger:!1,close:!0,footer:!0,confirm:{class:"primary",label:"Confirm",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},o);var t;function n(){var e,t=v(g.template(`
                <div class="modal fade" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="confirm-<%=new Date().getTime()%>" style="display:none">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <% if (close || title) { %>
                            <div class="modal-header">
                                <h5 class="modal-title" style="overflow-wrap: break-word;overflow: auto;"></h5>
                                <% if (close) { %>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <% } %>
                            </div>
                            <% } %>
                            <div class="modal-body"></div>
                            <% if (footer) { %>
                            <div class="modal-footer">
                                <% if (!cancel.disabled) { %>
                                <button class="btn btn-<%=cancel.class%>" data-bs-dismiss="modal" type="button" cancel><%=cancel.label%></button>
                                <% } %>
                                <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                    <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                </button>
                                <button class="btn btn-<%=confirm.class%>" type="button" confirm><%=confirm.label%></button>
                            </div>
                            <% } %>
                        </div>
                    </div>
                </div>
            `)(o));if("string"==typeof s?t.find(".modal-title").text(s):t.find(".modal-title").append(s),"string"==typeof l?((e=v("<p></p>")).html(l),t.find(".modal-body").append(e)):t.find(".modal-body").append(l),o.size&&t.find(".modal-dialog").addClass("modal-"+o.size),o.css)for(var n in o.css)t.find(".modal-dialog").css(n,o.css[n]);v("body").append(t),o&&o.before&&o.before(),t.on("show.bs.modal",function(){o&&o.after&&o.after()}),t.modal("toggle"),t.find("button[cancel]").on("click",function(){o.cancel.onCancel&&o.cancel.onCancel()});var i=t.find("button[confirm]"),a=t.find("button[waiting]");return i.on("click",function(){function e(){a.hide(),i.show(),t.modal("toggle")}d(t.find("form"))&&(a.show(),i.hide(),o.confirm.onConfirm?0<t.find("form").length?o.confirm.onConfirm(r(t.find("form")),function(){e()},c):o.confirm.onConfirm(function(){e()},c):e())}),t.find("input").on("keyup",function(e){13==e.keyCode&&i.trigger("click")}),t.on("hidden.bs.modal",function(){t.remove()}),t}return o.title=!!s,!o.autoTrigger&&c?(c.off("click"),c.on("click",function(){t=n()})):t=n(),{reset:function(){t.find("button[waiting]").hide(),t.find("button[confirm]").show()},close:function(){t.modal("toggle")}}}function i(e,t,n,i){return a(e,t,n,i=v.extend(!0,{},i=i||{},{close:!1}))}function n(e,t,n){return n=v.extend(!0,{},n=n||{},{footer:!1}),a(e,v('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'),t,n)}function s(e,t,n){return n=v.extend(!0,{},n=n||{},{close:!1,cancel:{disabled:!0},confirm:{class:"danger"}}),a(e,v('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'),t,n)}v.fn.pagination=function(e,t,n,i,a){a=v.extend(!0,{},{max:5},a=a||{});var s=v(this),l=Math.ceil(n/t),o=a.max,c=[],d=Math.ceil(e/t);if(o+4<l){for(var r=d;0<=r&&o>a.max/2;)c.splice(0,0,r),o--,r--;for(r=d+1;r<l&&0<o;)c.push(r),o--,r++;for(r=c[0]-1;0<o;)c.splice(0,0,r),r--,o--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=l-1&&c.splice(c.length,0,l-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(r=0;r<l;r++)c.push(r);var f="";0<i.indexOf("?")&&(i=(d=i.split("?"))[0],f="?"+d[1]),s.html(g.template(`
            <div class="navigation">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item<% if (skip == 0) { %> disabled<% } %>">
                            <a aria-label="Previous" class="page-link" href="<%=url%>/<%=skip - limit%>/<%=limit%><%=queryString%>" p-router>
                                <span class="page-icon prev" aria-hidden=true>&laquo;</span>
                            </a>
                        </li>
                        <%  _.each(pageNos, function(pageNo, i) { %>
                            <% if (pageNo != -1) { %>
                                <li class="page-item<% if (skip == pageNo * limit) { %> active<% } %>" number>
                                    <a class="page-link" href="<%=url%>/<%=limit * pageNo%>/<%=limit%><%=queryString%>" p-router><%=pageNo + 1%></a>
                                </li>
                            <% } else { %>
                                <li class="page-item disabled" ellipsis>
                                    <a class="page-link" href="javascript:void(0)">
                                        <i class="bi bi-three-dots"></i>
                                    </a> 
                                </li>
                            <% } %>
                        <% }); %>
                        <li class="page-item<% if (skip == limit * (pages - 1) || pages == 0) { %> disabled<% } %>">
                            <a aria-label="Next" class="page-link" href="<%=url%>/<%=skip + limit%>/<%=limit%><%=queryString%>" p-router>
                                <span class="page-icon next" aria-hidden=true>&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <% if (options.pages) { %>
                <select class="form-select" style="width: 70px;" name="pageSize">
                    <%  _.each(options.pages, function(page, i) { %>
                    <option value="<%=page%>"<% if (page == limit) { %> selected<% } %>><%=page%></option>
                    <% }); %>
                </select>
                <% } %>
            </div>            
        `)({skip:parseInt(e),limit:parseInt(t),total:parseInt(n),url:i,queryString:f,pages:l,pageNos:c,options:a})),s.find("select[name='pageSize']").on("change",function(){route(i+"/0/"+v(this).find("option:selected").val()+f)})},v.validate=d,v.setFormData=function(e,t){for(var n in t){var i=function(e){v.isArray(e)||(e=[e]);return e}(t[n]);v.each(e.find("input[type='text'][name='"+n+"']"),function(e,t){e<i.length&&v(t).val(i[e])}),v.each(e.find("input[type='hidden'][name='"+n+"']"),function(e,t){e<i.length&&v(t).val(i[e])}),v.each(e.find("input[type='checkbox'][name='"+n+"']"),function(e,t){i.forEach(function(e){v(t).attr("value")==e&&v(t).prop("checked",!0)})}),v.each(e.find("input[type='radio'][name='"+n+"']"),function(e,t){v(t).attr("value")==i[0]&&v(t).prop("checked",!0)}),v.each(e.find("textarea[name='"+n+"']"),function(e,t){e<i.length&&v(t).text(i[e])}),v.each(e.find("select[name='"+n+"'] option"),function(e,t){null!=v(t).closest("select").attr("multiple")?i.forEach(function(e){v(t).attr("value")==e&&v(t).prop("selected",!0)}):v(t).attr("value")==i[0]&&v(t).prop("selected",!0)})}},v.formData=r,v.fn.dialog=function(e,t,n){return a(v(this),e,t,n)},v.dialog=function(e,t,n){return a(null,e,t,n)},v.fn.confirm=function(e,t,n){return i(v(this),e,t,n)},v.confirm=function(e,t,n){return i(null,e,t,n)},v.fn.info=function(e,t){return n(v(this),e,t)},v.info=function(e,t){return n(null,e,t)},v.fn.alert=function(e,t){return s(v(this),e,t)},v.alert=function(e,t){return s(null,e,t)},v.fn.form=function(t){var n=v(this);t=t||{};var e,i,a,s;(t=v.extend(!0,{},{footer:{fixed:!1,align:"left"},confirm:{class:"primary",label:"Submit",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},t)).confirm.btn&&(t.cancel.btn||t.cancel.disabled)?(a=t.confirm.btn).on("click",function(){d(n)&&t.confirm.onConfirm&&t.confirm.onConfirm(r(n))}):(e=v(g.template(`
                    <% 
                        var padding = footer.fixed ? "5rem" : "revert-layer";
                    %>
                    <div form-footer class="mt-2<% if (footer.fixed) { %> fixed-bottom border-top bg-white opacity-90 py-3<% } %>">
                        <div class="row">
                            <% if (footer.element) { %>
                                <% if (footer.align == "right") { %>
                                    <div class="col-md-6" element>
                                    </div>
                                    <div class="col-md-6" style="display: flex;justify-content: right;-webkit-justify-content: flex-end;align-items: center;padding-right: <%=padding%>">
                                        <% if (!cancel.disabled) { %>
                                            <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                                        <% } %>
                                        <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                                        <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                            <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                        </button>
                                    </div>
                                <% } else { %>
                                    <div class="col-md-6" style="padding-left: <%=padding%>">
                                        <% if (!cancel.disabled) { %>
                                            <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                                        <% } %>
                                        <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                                        <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                            <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                        </button>
                                    </div>
                                    <div class="col-md-6" element>
                                    </div>
                                <% } %>
                            <% } else { %>
                                <% if (footer.align == "right") { %>
                                    <div class="col-md-12" style="display: flex;justify-content: right;-webkit-justify-content: flex-end;align-items: center;padding-right: <%=padding%>">
                                <% } else { %>
                                    <div class="col-md-12" style="padding-left: <%=padding%>">
                                <% } %>
                                    <% if (!cancel.disabled) { %>
                                        <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                                    <% } %>
                                    <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                                    <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                        <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                    </button>
                                </div>
                            <% } %>
                        </div>
                    </div>
                `)(t)),t.footer.fixed&&(n.css("margin-bottom","5rem"),0<v(".side-menu").length&&(v(".side-menu").hasClass("fold")?e.css("margin-left","2rem"):e.css("margin-left","20rem"))),t.footer.element&&e.find("[element]").append(t.footer.element),i=e.find("button[cancel]"),a=e.find("button[confirm]"),s=e.find("button[waiting]"),a.on("click",function(){function e(){s.hide(),a.show()}d(n)&&(s.show(),a.hide(),t.confirm.onConfirm?t.confirm.onConfirm(r(n),function(){e()},n):e())}),n.find("[form-footer]").remove(),n.append(e)),i&&i.on("click",function(){t.cancel.onCancel&&t.cancel.onCancel()}),n.find("input").on("keyup",function(e){13==e.keyCode&&a.trigger("click")})},v.fn.slider=function(s){s=s||{};var i,a,l=(s=v.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=v(this),t=e.attr("disabled"),o=v(g.template(`
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),c=o.find(".progress-bar"),d=o.find(".btn");function n(){i=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=v("body").get(0));)e=e.offsetParent;return t}(o).left,a=i+o.width()}function r(e){l!=e&&(l=e,s.onChange(l));var t,n,i=(t=e,n=d.outerWidth()/2,n=(s.max-s.min)/o.width()*n,a(t-n)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}d.css("left",i+"%"),c.css("width",e+"%")}function f(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(c.parent().after(s.btn),d.remove(),(d=s.btn).css("position","relative").css("cursor","pointer")),e.append(o),t&&f(),d.css("top",-(d.outerHeight()/2+s.height/2+1)+"px"),n(),r(s.default),d.bindDragMove(function(e,t){e.preventDefault()},function(e,t,n){!function(e){a<(e=e<i?i:e)&&(e=a);var t=s.min+Math.round((s.max-s.min)/(a-i)*(e-i));if(1<s.step)for(var n=s.min;n<s.max&&t!=n;n+=s.step)if(n+s.step<=s.max&&n<t&&t<n+s.step){t=t-n>n+s.step-t?n+s.step:n;break}r(t)}(t.x)},function(e,t,n){}),v(window).on("resize",function(){n(),r(l)}),v(window).on("p-resize",function(){n(),r(l)}),{setValue:function(e){r(e)},disable:f,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},v.fn.multiselect=function(i){var a=v(this),e={en:{text:{noData:"No Data"}},zh:{text:{noData:"没有数据"}}},e=e[(i=i||{}).lang]||e.en;i=v.extend(!0,{},{search:!1,allowCreate:!1,singleClassic:!1},e,i);var s=!a.attr("multiple"),l=[],o=[],e=a.attr("placeholder");v.each(a.find("option"),function(e,t){var n={value:v(t).attr("value"),text:v(t).text()};v(t).is(":selected")&&(n.selected=!0,l.push(n)),o.push(n)}),i.single=s;var c,n,d,e=v(g.template(`
            <div class="multiselect">
                <% if (placeholder) { %>
                <div class="placeholder"<% if (selecteds.length > 0) { %> style="display: none"<% } %>><%=placeholder%></div>
                <% } %>
                <div class="selected<% if (disabled) { %> disabled<% } %>">
                    <% if (opt.single && opt.singleClassic) { %>
                        <% if (selecteds.length > 0) { %>
                        <label class="single" value="<%=selecteds[0].value%>"><%=selecteds[0].text%></label>
                        <% } %>
                    <% } else { %>
                        <%_.each(selecteds, function(selected) {%>
                            <span class="item">
                                <label value="<%=selected.value%>"><%=selected.text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        <% }); %>
                        <% if (opt.search && opt.allowCreate) { %>
                        <input type="text">
                        <% } %>
                    <% } %>
                </div>
                <div class="validation">
                    <i class="bi bi-exclamation-circle text-danger"></i>
                    <i class="bi bi-check-lg text-success"></i>
                </div>
                <i class="bi bi-chevron-down"></i>
                <div class="select">
                    <% if (opt.search) { %>
                        <% if (opt.allowCreate) { %>
                        <div class="waiting">
                            <div class="spinner-border spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <% } else { %>
                        <div class="search">
                            <i class="bi bi-search"></i>
                            <input type="text">
                            <% if (opt.search.async) { %>
                            <div class="spinner-border text-secondary spinner-border-sm">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <% } %>
                        </div>
                        <% } %>
                    <% } %>
                    <ul class="options">
                        <%_.each(options, function(option) {%>
                            <li>
                                <% if (!opt.singleClassic) { %>
                                <span class="checked"><i class="bi<% if (option.selected) { %> bi-check-lg<% } %>"></i></span>
                                <% } %>
                                <span value="<%=option.value%>"><%=option.text%></span>
                            </li>
                        <% }); %>
                    </ul>
                    <div class="no-data" style="display:none"><%=opt.text.noData%></div>
                </div>
            </div>
        `)({disabled:a.attr("disabled"),selecteds:l,options:o,opt:i,placeholder:e})),r=e.find(".selected"),f=e.find(".select");function p(e,t){t=v(g.template(`
                <span class="item">
                    <label value="<%=value%>"><%=text%></label>
                    <i class="bi bi-x-lg"></i>
                </span>
            `)({value:e,text:t}));t.find("i").on("click",function(e){r.hasClass("disabled")||(e.stopPropagation(),h(v(this).closest("span")))}),s&&r.find(".item").remove(),r.append(t);t=r.find("input");0<t.length&&(t.val("").change().trigger("keyup"),r.append(t)),a.find("option[value='"+e+"']").prop("selected",!0).change()}function u(){f.find("ul.options li").on("click",function(e){e.stopPropagation();var t=v(this).find("span.checked i"),n=v(this).find("span:last-child"),e=n.attr("value");t.hasClass("bi-check-lg")?h(r.find("span label[value='"+e+"']").closest("span")):s?(f.find("span.checked i").removeClass("bi-check-lg"),i.singleClassic?(t.addClass("bi-check-lg"),r.html(g.template(`
                                <label class="single" value="<%=value%>"><%=text%></label>
                            `)({value:e,text:n.text()})),a.find("option[value='"+e+"']").prop("selected",!0).change()):(t.addClass("bi-check-lg"),p(e,n.text())),f.hide()):(p(e,n.text()),t.addClass("bi-check-lg"))})}function h(e){var t=e.find("label").attr("value");f.find("li span[value='"+t+"']").siblings("span").find("i").removeClass("bi-check-lg"),e.remove();e=a.find("option[value='"+t+"']");null!=e.attr("created")?e.remove():a.find("option[value='"+t+"']").prop("selected",!1).change()}function m(t){n.css("display","flex"),i.search.async(t,function(e){f.find("ul").html(g.template(`
                            <%_.each(options, function(option) {%>
                                <li>
                                    <span class="checked"><i class="bi"></i></span>
                                    <span value="<%=option.value%>"><%=option.text%></span>
                                </li>
                            <% }); %>
                        `)({options:e})),b(t),a.find("option").remove(),a.append(v("<option value=''></option>")),e.forEach(function(e){var t=v("<option></option>");t.attr("value",e.value),t.text(e.text),a.append(t)}),n.hide();e=r.find("label").attr("value");a.find("option[value='"+e+"']").prop("selected",!0),f.find("ul li span[value='"+e+"']").siblings("span.checked").find("i").addClass("bi-check-lg"),v.each(r.find("span.item"),function(e,t){t=v(t).find("label").attr("value");a.find("option[value='"+t+"']").prop("selected",!0),f.find("ul li span[value='"+t+"']").siblings("span.checked").find("i").addClass("bi-check-lg")}),u(),i.search.autoSelect&&0==c.val().length&&f.find("ul.options li:first-child").trigger("click")})}function b(s,l){var e=f.find("ul.options li:not([new-created]) span:last-child");v.each(e,function(e,t){var n=v(t).text(),i=new RegExp(s,"i"),a=n.match(i);a?(a=n.substring(a.index,a.index+s.length),v(t).html(n.replace(i,"<b>"+a+"</b>")),v(t).closest("li").show()):l&&v(t).closest("li").hide()})}return v.each(r.find("span i"),function(e,t){v(t).on("click",function(e){e.stopPropagation(),h(v(this).closest("span"))})}),r.on("click",function(e){v(this).hasClass("disabled")||(e.stopPropagation(),f.is(":hidden")?(v(".multiselect .select").hide(),f.show()):f.hide(),r.find("input").focus())}),r.find("input").on("focus",function(){v(".multiselect .select").hide(),f.show(),0==f.find("ul li:visible").length?f.find(".no-data").show():f.find(".no-data").hide()}),f.on("click",function(e){e.stopPropagation()}),v("body").on("click",function(){f.hide()}),a.on("change",function(){0<a.find("option:selected").length?r.prev(".placeholder").hide():r.prev(".placeholder").css("display","flex")}),u(),i.search&&(c=e.find("input"),n=f.find(".waiting"),i.search.async?(i.search.keyword&&c.val(i.search.keyword),i.search.autoTrigger&&m(c.val()),c.on("keyup",function(e){var t=v(this).val();clearTimeout(d),d=setTimeout(function(){m(t)},600)})):c.on("keyup",function(e){var t,n;b(v(this).val(),!0),i.allowCreate&&!i.search.async&&(t=v(this).val(),0==(n=f.find("ul li[new-created]")).length?(n=v(`
                                <li new-created>
                                    <span><i class="bi"></i></span>
                                    <span value="${t}">${t}</span>
                                </li>`),f.find("ul").append(n),n.on("click",function(){var e,t=v(this).find("span:last-child"),n=t.attr("value");0<a.find("option[value='"+n+"']").length||(e=t.text(),t=v(`<option value="${n}" created>${e}</option>`),a.append(t),p(n,e),v(this).remove(),c.val("").focus())}),f.find(".no-data").hide()):f.find("ul li[new-created] span:last-child").attr("value",t).text(t),0==t.length&&f.find("ul li[new-created]").remove(),13==e.keyCode&&(e.stopImmediatePropagation(),f.find("ul li[new-created]").trigger("click"),f.find("ul li").show(),b(v(this).val(),!0),i.single&&f.find("span.checked i").removeClass("bi-check-lg")),0==f.find("ul li:visible").length?f.find(".no-data").show():f.find(".no-data").hide())})),a.next(".multiselect").remove(),a.after(e),a.hide(),{disable:function(){f.hide(),r.addClass("disabled"),a.attr("disabled",!0)},enable:function(){r.removeClass("disabled"),a.removeAttr("disabled")},select:function(e){f.find("ul li span[value='"+e+"']").parent().trigger("click")},hide:function(){f.hide()}}},v.fn.stepper=function(n){var i=v(this);n=n||{};n=v.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},n);var e=v(g.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:n}));0<=n.class.indexOf("outline-")&&i.addClass("border-"+n.class.split("outline-")[1]),i.val(n.default),i.css("text-align","center"),isNaN(n.min)||i.attr("min",n.min),isNaN(n.max)||i.attr("max",n.max),0<n.decimal?i.decimal():i.integer();var t,a=e.find("button:first-child"),s=e.find("button:last-child");null!=i.val()&&0<i.val().length&&(t=Number(i.val()),null!=n.min&&(t<=Number(n.min)?(i.val(n.min),a.attr("disabled",!0)):a.removeAttr("disabled")),null!=n.max&&(t>=Number(n.max)?(i.val(n.max),s.attr("disabled",!0)):s.removeAttr("disabled"))),a.on("click",function(){var e=Number(i.val()),t=i.attr("min");(null==t||e>Number(t))&&(0<n.decimal?i.val((e-n.step/10**n.decimal).toFixed(n.decimal)):i.val(e-n.step)).change()}),s.on("click",function(){var e=Number(i.val()),t=i.attr("max");(null==t||e<Number(t))&&(0<n.decimal?i.val((e+n.step/10**n.decimal).toFixed(n.decimal)):i.val(e+n.step)).change()}),i.on("change",function(){var e=Number(v(this).val()),t=i.attr("min");null!=t&&(e<=Number(t)?a.attr("disabled",!0):a.removeAttr("disabled"));t=i.attr("max");null!=t&&(e>=Number(t)?s.attr("disabled",!0):s.removeAttr("disabled"))}),i.after(e),a.after(i)},v.fn.pageLoading=function(e){e=e||{};var t={left:function(){return v(window).width()/2-n.width()/2},top:function(){return v(window).height()/2-n.height()/2}};e=v.extend(!0,{},t,e);var n=v(this);function i(){"function"==typeof e.left?n.css("left",e.left()):n.css("left",e.left),"function"==typeof e.top?n.css("top",e.top()):n.css("top",e.top)}return n.css("position","absolute"),i(),v(window).on("resize",function(){i()}),{show:function(){n.show()},hide:function(){n.hide()}}},v.fn.menu=function(e){e=v.extend(!0,{},{},e=e||{});var n=v(this);n.find(".fold-btn").on("click",function(){var e=v(this).closest("[p-menu]");e.hasClass("fold")?(e.removeClass("fold"),v("[form-footer]").hasClass("fixed-bottom")&&v("[form-footer]").css("margin-left","20rem").css("transition","margin-left .2s ease-in")):(e.addClass("fold"),v("[form-footer]").hasClass("fixed-bottom")&&v("[form-footer]").css("margin-left","2rem").css("transition","margin-left .2s ease-in")),setTimeout(function(){v(window).trigger("p-resize")},300)}),n.find(".menu a").on("click",function(){var e=v(this).next(),t=v(this).find("i.bi-chevron-right");n.find(".menu a").removeClass("selected"),e.is(":hidden")?(e.slideDown(200),t.css("transform","rotate(90deg)")):(e.slideUp(200),t.css("transform","rotate(0)")),t.css("transition","all 0.2s"),v(this).addClass("selected")})},v.cascadeSelect=function(n){function i(n,e){n.async?(n.selector.prepend("<option selected>loading...</option>"),n.async(e,function(e,t){a(n.selector,e,t)})):a(n.selector,e?n.data[e]:n.data,n.selected)}function a(e,t,n){e.find("option").remove(),e.append(g.template(`
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `)({data:t,selected:n})),s(parseInt(e.attr("index")),e.find("option:selected").val()),e.on("change",function(){s(parseInt(v(this).attr("index")),v(this).find("option:selected").val())})}function s(e,t){e<n.length-1&&i(n[++e],t)}n&&v.isArray(n)&&0!=n.length&&(n.forEach(function(e,t){e.selector.attr("index",t)}),i(n[0],""))},v.fn.breadcrumb=function(e,t){t=v.extend(!0,{},{history:!0,divider:">"},t=t||{});var n=v(this);e&&0!=e.length&&(t.history&&e.forEach(function(e){var t,n=v.localStorage.all("back");for(t in n){var i=JSON.parse(n[t]);i.name==e.name&&(e.uri=i.uri)}}),n.html(g.template(`
            <nav style="--bs-breadcrumb-divider: '<%=cfg.divider%>';">
                <ol class="breadcrumb">
                    <% _.each(data, function (item) { %>
                        <% if (!item.current) { %>
                            <li class="breadcrumb-item">
                                <a href="<%=item.uri%>" p-router><%=item.name%></a>
                            </li>
                        <% } else { %>
                            <li class="breadcrumb-item active"><%=item.name%></li>
                        <% } %>
                    <% }); %>
                </ol>
            </nav>
        `)({data:e,cfg:t})))},v.fn.search=function(n){var e={en:{text:{input:"input "}},zh:{text:{input:"输入"}}},e=e[(n=n||{}).lang]||e.en;n=v.extend(!0,{},{onChange:function(e){},onClear:function(){},onSearch:function(e,t){}},e,n);var i=v(this);i.removeAttr("class");var t,a,s,l=n.options;l&&0<l.length&&(s=[],l.forEach(function(e){"object"!=typeof e?(e==n.selected&&(a=t=e),s.push({value:e,text:e})):(e.value==n.selected&&(t=e.value,a=e.text),s.push(e))}),l=s,null==t&&(t=l[0].value,a=l[0].text),i.attr("placeholder",n.text.input+a));var o=v(g.template(`
            <div class="p-search">
                <% if (cfg.opts && cfg.opts.length > 0) { %>
                <div class="condition">
                    <div class="selected">
                        <label value="<%=cfg.selectedValue%>"><%=cfg.selectedText%></label>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <ul class="options">
                        <%_.each(cfg.opts, function(opt) {%>
                        <li>
                            <span class="checked"><i class="bi<% if (opt.value == cfg.selectedValue) { %> bi-check-lg<% } %>"></i></span>
                            <span value="<%=opt.value%>"><%=opt.text%></span>
                        </li>
                        <% }); %>
                    </ul>
                </div>
                <% } %>
                <div class="op">
                    <div class="input">
                        <div class="clear-btn"><i class="bi bi-x-lg"></i></div>
                    </div>
                    <div class="search-btn"><i class="bi bi-search"></i></div>
                </div>
            </div>
        `)({cfg:{opts:l,selectedValue:t,selectedText:a}}));function c(){0<i.val().length?o.find(".clear-btn").css("visibility","visible"):o.find(".clear-btn").css("visibility","hidden")}function d(){var e,t=i.val();l&&0<l.length&&(e={value:(e=o.find(".selected label")).attr("value"),text:e.text()}),i.blur(),n.onSearch(t,e)}i.after(o),o.find(".input").prepend(i),0<i.length&&0<i.val().length&&o.find(".clear-btn").css("visibility","visible"),i.on("click",function(){o.find(".condition .options").hide()}),v("body").on("click",function(){o.find(".condition .options").hide()}),o.find(".condition .selected").on("click",function(e){e.stopPropagation();e=o.find(".condition .options");e.is(":hidden")?e.show():e.hide(),o.find(".datepicker").remove(),o.find(".autocomplete .result").hide()}),o.find(".condition .options li").on("click",function(e){e.stopPropagation();var t=v(this).find("span.checked"),e=t.next();o.find(".condition .options li span.checked i").removeClass("bi-check-lg"),t.find("i").addClass("bi-check-lg");t=v(this).closest(".condition").find(".selected label");t.attr("value",e.attr("value")),t.text(e.text()),i.attr("placeholder",n.text.input+e.text()),o.find(".condition .options").hide(),n.onChange({value:e.attr("value"),text:e.text()})}),o.find(".clear-btn").on("click",function(){n.onClear(),i.val("").change()}),i.on("change",function(){c()}),i.on("keyup",function(e){c(),13==e.keyCode&&d()}),o.find(".search-btn").on("click",function(){d()})},v.fn.ellipsis=function(t){var e,n,i,a,s,l=v(this),o={en:{label:{fold:"show less",unfold:"show all"}},zh:{label:{fold:"收起",unfold:"展开"}}},o=o[(t=t||{lines:1,expandable:!1}).lang]||o.en;function c(e){e.removeClass("p-text-ellipsis").removeClass("p-text-ellipsis-ml")}function d(e){1<t.lines?(e.addClass("p-text-ellipsis-ml"),e.attr("style","-webkit-line-clamp: "+t.lines)):e.addClass("p-text-ellipsis")}t=v.extend(!0,{},{lang:"en"},o,t),c(l),t.expandable?(o=l.text(),l.html(g.template(`
                <span><%=text%></span>
                <a href="javascript:void(0)"><%=options.label.unfold%></a>
            `)({text:o,options:t})),d(e=l.children("span")),n=l.children("a"),i=e.get(0),a=document.createElement("canvas").getContext("2d"),s=getComputedStyle(i),a.measureText(i.innerText).width>parseFloat(s.width)?n.on("click",function(){e.hasClass("p-text-ellipsis")||e.hasClass("p-text-ellipsis-ml")?(c(e),n.text(t.label.fold)):(d(e),n.text(t.label.unfold))}):n.remove()):d(l)},v.fn.popover=function(e){var t=v(this),n={en:{},zh:{}},n=n[(e=e||{}).lang]||n.en;e=v.extend(!0,{},{lang:"en",position:"bottom",location:"begin"},n,e),0==t.next(".p-popover").length&&(n=t.attr("title"),e.content&&(n=e.content),i=v(g.template(`
                <div class="p-popover">
                    <div class="p-content"></div>
                    <i class="bi p-arrow"></i>
                </div>
            `)()),t.after(i),"object"==typeof n?i.find(".p-content").append(n):i.find(".p-content").html(n));var i,a=(i=t.next(".p-popover")).find(".p-arrow");function s(){"top"==e.position?(a.addClass("bi-caret-down-fill"),i.css("top",t.position().top-i.outerHeight()-7),a.css("top",i.outerHeight()-10)):"bottom"==e.position?(a.addClass("bi-caret-up-fill"),i.css("top",t.position().top+t.outerHeight()+7),a.css("top",-14)):"left"==e.position?(a.addClass("bi-caret-right-fill"),i.css("left",t.position().left-i.outerWidth()-7),a.css("right",-9)):"right"==e.position&&(a.addClass("bi-caret-left-fill"),i.css("left",t.position().left+t.outerWidth()+7),a.css("left",-9)),"begin"==e.location?"top"==e.position||"bottom"==e.position?(a.css("left",.3*t.outerWidth()),i.css("left",t.position().left)):(a.css("top",.3*t.outerHeight()),i.css("top",t.position().top)):"end"==e.location?"top"==e.position||"bottom"==e.position?(a.css("right",.3*t.outerWidth()),i.css("left",t.position().left-(i.outerWidth()-t.outerWidth()))):(a.css("bottom",.3*t.outerHeight()),i.css("top",t.position().top-(i.outerHeight()-t.outerHeight()))):"middle"==e.location&&("top"==e.position||"bottom"==e.position?(a.css("left",.5*i.outerWidth()-a.outerWidth()/2),i.css("left",t.position().left+t.outerWidth()/2-i.outerWidth()/2)):(a.css("top",.5*i.outerHeight()-a.outerHeight()/2),i.css("top",t.position().top+t.outerHeight()/2-i.outerHeight()/2)))}return v("body").on("click",function(){v(".p-popover").hide()}),t.on("click",function(e){e.stopPropagation(),a.is(":hidden")?(v(".p-popover").hide(),i.show(),s()):i.hide()}),i.on("click",function(e){e.stopPropagation()}),v(window).on("resize",function(){s()}),{close:function(){i.hide()}}},v.fn.progress=function(s){s=s||{};var l=(s=v.extend(!0,{},{height:5,classes:["bg-primary"],min:0,max:100,default:0,step:1,btn:{disabled:!1},formatter:function(e){return e},onChange:function(e){}},s)).default,e=v(this),o=v(g.template(`
            <div class="p-progress">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <% if (!btn.disabled) { %>
                <div class="btn<%_.each(classes, function(c) { %><% if (c.indexOf("bg-") == 0) { %> <%=c%><% } %><% }); %>"></div>
                <% } %>
            </div>
        `)(s)),c=o.find(".progress-bar"),d=o.find(".btn");function t(e){(e=e>s.max?s.max:e)<s.min&&(e=s.min),l!=e&&(l=e,s.onChange(l)),d.text(s.formatter(l));var t,n,i=(t=e,n=d.outerWidth()/2,n=(s.max-s.min)/o.width()*n,a(t-n)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}d.css("left",i+"%"),c.css("width",e+"%")}return e.append(o),s.height>d.outerHeight()&&(s.height=d.outerHeight(),o.find(".progress").css("height",d.outerHeight())),o.css("transform","translateY("+(d.outerHeight()/2+1)+"px)"),d.css("top",-(d.outerHeight()/2+s.height/2)+"px"),t(s.default),v(window).on("resize",function(){t(l)}),{setValue:function(e){t(e)},getValue:function(){return l}}}});
//# sourceMappingURL=jquery.prac.component.js.map