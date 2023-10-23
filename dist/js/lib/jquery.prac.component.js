!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(h,v,e){function d(e){var t=!0;function n(e){var t=e.val(),n=e.attr("pattern");e.attr("required")?(0==t.length?o:l)(e):n&&(t.match(new RegExp(n))?l:o)(e)}function i(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?o:l)(e)}function a(e){e.attr("required")&&(e.is(":checked")?l:o)(e)}function s(e){e.removeClass("is-valid"),e.removeClass("is-invalid")}function l(e){e.removeClass("is-invalid").addClass("is-valid")}function o(e){t=!1,e.removeClass("is-valid").addClass("is-invalid")}return 0<e.length&&e.hasClass("needs-validation")&&(h.each(e.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"),function(e,t){s(h(t)),n(h(t)),h(t).on("change",function(){n(h(this))})}),h.each(e.find("select"),function(e,t){s(h(t)),i(h(t)),h(t).on("change",function(){i(h(this))})}),h.each(e.find("input[type='checkbox']"),function(e,t){s(h(t)),a(h(t)),h(t).on("change",function(){a(h(this))})})),t}function r(e){var n={};return e&&0!=e.length&&(h.each(e.find("input[name]"),function(e,t){var n=h(t),i=n.attr("name"),a=n.prop("type"),t=n.val();null==n.attr("p-integer")&&null==n.attr("p-decimal")||isNaN(t)||(t=Number(t)),("radio"!=a&&"checkbox"!=a||n.is(":checked"))&&s(i,t)}),h.each(e.find("textarea[name]"),function(e,t){t=h(t);s(t.attr("name"),t.val())}),h.each(e.find("select[name]"),function(e,t){var n=h(t),i=n.attr("name");h.each(n.find("option:selected"),function(e,t){t=h(t).attr("value");null==n.attr("p-integer")&&null==n.attr("p-decimal")||isNaN(t)||(t=Number(t)),s(i,t)})})),n;function s(e,t){null!=n[e]?(h.isArray(n[e])||(n[e]=[n[e]]),n[e].push(t)):n[e]=t}}function a(e,s,l,o){var c=e;o=o||{};o=h.extend(!0,{},{autoTrigger:!1,close:!0,footer:!0,confirm:{class:"primary",label:"Confirm",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},o);var t;function n(){var e,t=h(v.template(`
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
            `)(o));if("string"==typeof s?t.find(".modal-title").text(s):t.find(".modal-title").append(s),"string"==typeof l?((e=h("<p></p>")).html(l),t.find(".modal-body").append(e)):t.find(".modal-body").append(l),o.size&&t.find(".modal-dialog").addClass("modal-"+o.size),o.css)for(var n in o.css)t.find(".modal-dialog").css(n,o.css[n]);h("body").append(t),o&&o.before&&o.before(),t.on("show.bs.modal",function(){o&&o.after&&o.after()}),t.modal("toggle"),t.find("button[cancel]").on("click",function(){o.cancel.onCancel&&o.cancel.onCancel()});var i=t.find("button[confirm]"),a=t.find("button[waiting]");return i.on("click",function(){function e(){a.hide(),i.show(),t.modal("toggle")}d(t.find("form"))&&(a.show(),i.hide(),o.confirm.onConfirm?0<t.find("form").length?o.confirm.onConfirm(r(t.find("form")),function(){e()},c):o.confirm.onConfirm(function(){e()},c):e())}),t.on("hidden.bs.modal",function(){t.remove()}),t}return o.title=!!s,!o.autoTrigger&&c?(c.off("click"),c.on("click",function(){t=n()})):t=n(),{reset:function(){t.find("button[waiting]").hide(),t.find("button[confirm]").show()},close:function(){t.modal("toggle")}}}function i(e,t,n,i){return a(e,t,n,i=h.extend(!0,{},i=i||{},{close:!1}))}function n(e,t,n){return n=h.extend(!0,{},n=n||{},{footer:!1}),a(e,h('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'),t,n)}function s(e,t,n){return n=h.extend(!0,{},n=n||{},{close:!1,cancel:{disabled:!0},confirm:{class:"danger"}}),a(e,h('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'),t,n)}h.fn.pagination=function(e,t,n,i,a){a=h.extend(!0,{},{max:5},a=a||{});var s=h(this),l=Math.ceil(n/t),o=a.max,c=[],d=Math.ceil(e/t);if(o+4<l){for(var r=d;0<=r&&o>a.max/2;)c.splice(0,0,r),o--,r--;for(r=d+1;r<l&&0<o;)c.push(r),o--,r++;for(r=c[0]-1;0<o;)c.splice(0,0,r),r--,o--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=l-1&&c.splice(c.length,0,l-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(r=0;r<l;r++)c.push(r);var f="";0<i.indexOf("?")&&(i=(d=i.split("?"))[0],f="?"+d[1]),s.html(v.template(`
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
        `)({skip:parseInt(e),limit:parseInt(t),total:parseInt(n),url:i,queryString:f,pages:l,pageNos:c,options:a})),s.find("select[name='pageSize']").on("change",function(){route(i+"/0/"+h(this).find("option:selected").val()+f)})},h.fn.dialog=function(e,t,n){return a(h(this),e,t,n)},h.dialog=function(e,t,n){return a(null,e,t,n)},h.fn.confirm=function(e,t,n){return i(h(this),e,t,n)},h.confirm=function(e,t,n){return i(null,e,t,n)},h.fn.info=function(e,t){return n(h(this),e,t)},h.info=function(e,t){return n(null,e,t)},h.fn.alert=function(e,t){return s(h(this),e,t)},h.alert=function(e,t){return s(null,e,t)},h.fn.form=function(t){var n=h(this);t=t||{};t=h.extend(!0,{},{footer:{fixed:!1,align:"left"},confirm:{class:"primary",label:"Submit",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},t);var e=h(v.template(`
                <% 
                    var padding = footer.fixed ? "5rem" : "1rem";
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
            `)(t));t.footer.fixed&&(n.css("margin-bottom","5rem"),0<h(".side-menu").length&&(h(".side-menu").hasClass("fold")?e.css("margin-left","2rem"):e.css("margin-left","20rem"))),t.footer.element&&e.find("[element]").append(t.footer.element),e.find("button[cancel]").on("click",function(){t.cancel.onCancel&&t.cancel.onCancel()});var i=e.find("button[confirm]"),a=e.find("button[waiting]");i.on("click",function(){function e(){a.hide(),i.show()}d(n)&&(a.show(),i.hide(),t.confirm.onConfirm?t.confirm.onConfirm(r(n),function(){e()},n):e())}),n.find("[form-footer]").remove(),n.append(e)},h.fn.slider=function(s){s=s||{};var i,a,l=(s=h.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=h(this),t=e.attr("disabled"),o=h(v.template(`
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),c=o.find(".progress-bar"),d=o.find(".btn");function n(){i=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=h("body").get(0));)e=e.offsetParent;return t}(o).left,a=i+o.width()}function r(e){l!=e&&(l=e,s.onChange(l));var t,n,i=(t=e,n=d.outerWidth()/2,n=(s.max-s.min)/o.width()*n,a(t-n)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}d.css("left",i+"%"),c.css("width",e+"%")}function f(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(c.parent().after(s.btn),d.remove(),(d=s.btn).css("position","relative").css("cursor","pointer")),e.append(o),t&&f(),d.css("top",-(d.outerHeight()/2+s.height/2+1)+"px"),n(),r(s.default),d.bindDragMove(function(e,t){e.preventDefault()},function(e,t,n){!function(e){a<(e=e<i?i:e)&&(e=a);var t=s.min+Math.round((s.max-s.min)/(a-i)*(e-i));if(1<s.step)for(var n=s.min;n<s.max&&t!=n;n+=s.step)if(n+s.step<=s.max&&n<t&&t<n+s.step){t=t-n>n+s.step-t?n+s.step:n;break}r(t)}(t.x)},function(e,t,n){}),h(window).on("resize",function(){n(),r(l)}),h(window).on("p-resize",function(){n(),r(l)}),{setValue:function(e){r(e)},disable:f,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},h.fn.multiselect=function(n){var a=h(this);n=n||{};n=h.extend(!0,{},{search:!1},n);var s=!a.attr("multiple"),i=[],l=[];h.each(a.find("option"),function(e,t){var n={value:h(t).attr("value"),text:h(t).text()};h(t).is(":selected")&&(n.selected=!0,i.push(n)),l.push(n)}),n.single=s;var o,c,d,e=h(v.template(`
            <div class="multiselect">
                <div class="selected<% if (disabled) { %> disabled<% } %>">
                    <% if (opt.single) { %>
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
                    <% } %>
                </div>
                <div class="validation">
                    <i class="bi bi-exclamation-circle text-danger"></i>
                    <i class="bi bi-check-lg text-success"></i>
                </div>
                <i class="bi bi-chevron-down"></i>
                <div class="select">
                    <% if (opt.search) { %>
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
                    <ul class="options">
                        <%_.each(options, function(option) {%>
                            <li>
                                <span class="checked"><i class="bi<% if (option.selected) { %> bi-check-lg<% } %>"></i></span>
                                <span value="<%=option.value%>"><%=option.text%></span>
                            </li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `)({disabled:a.attr("disabled"),selecteds:i,options:l,opt:n})),r=e.find(".selected"),f=e.find(".select");function u(){f.find("ul.options li").on("click",function(e){e.stopPropagation();var t,n=h(this).find("span.checked i"),i=h(this).find("span:last-child"),e=i.attr("value");n.hasClass("bi-check-lg")?p(r.find("span label[value='"+e+"']").closest("span")):s?(t=`
                            <label class="single" value="<%=value%>"><%=text%></label>
                        `,f.find("span.checked i").removeClass("bi-check-lg"),n.addClass("bi-check-lg"),r.html(v.template(t)({value:e,text:i.text()})),a.find("option[value='"+e+"']").prop("selected",!0).change(),f.hide()):((i=h(v.template(t=`
                            <span class="item">
                                <label value="<%=value%>"><%=text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        `)({value:e,text:i.text()}))).find("i").on("click",function(e){r.hasClass("disabled")||(e.stopPropagation(),p(h(this).closest("span")))}),n.addClass("bi-check-lg"),r.append(i),a.find("option[value='"+e+"']").prop("selected",!0).change())})}function p(e){var t=e.find("label").attr("value");f.find("li span[value='"+t+"']").siblings("span").find("i").removeClass("bi-check-lg"),e.remove(),a.find("option[value='"+t+"']").prop("selected",!1).change()}function b(t){c.show(),n.search.async(t,function(e){f.find("ul").html(v.template(`
                            <%_.each(options, function(option) {%>
                                <li>
                                    <span class="checked"><i class="bi"></i></span>
                                    <span value="<%=option.value%>"><%=option.text%></span>
                                </li>
                            <% }); %>
                        `)({options:e})),m(t),a.find("option").remove(),a.append(h("<option value=''></option>")),e.forEach(function(e){var t=h("<option></option>");t.attr("value",e.value),t.text(e.text),a.append(t)}),c.hide();e=r.find("label").attr("value");a.find("option[value='"+e+"']").prop("selected",!0),f.find("ul li span[value='"+e+"']").siblings("span.checked").find("i").addClass("bi-check-lg"),h.each(r.find("span.item"),function(e,t){t=h(t).find("label").attr("value");a.find("option[value='"+t+"']").prop("selected",!0),f.find("ul li span[value='"+t+"']").siblings("span.checked").find("i").addClass("bi-check-lg")}),u(),n.search.autoSelect&&0==o.val().length&&f.find("ul.options li:first-child").trigger("click")})}function m(s,l){var e=f.find("ul.options li span:last-child");h.each(e,function(e,t){var n=h(t).text(),i=new RegExp(s,"i"),a=n.match(i);a?(a=n.substring(a.index,a.index+s.length),h(t).html(n.replace(i,"<b>"+a+"</b>")),h(t).closest("li").show()):l&&h(t).closest("li").hide()})}return h.each(r.find("span i"),function(e,t){h(t).on("click",function(e){e.stopPropagation(),p(h(this).closest("span"))})}),r.on("click",function(e){h(this).hasClass("disabled")||(e.stopPropagation(),f.is(":hidden")?f.show():f.hide())}),f.on("click",function(e){e.stopPropagation()}),h("body").on("click",function(){f.hide()}),u(),n.search&&(o=e.find(".search input"),c=f.find(".search .spinner-border"),n.search.async?(n.search.keyword&&o.val(n.search.keyword),n.search.autoTrigger&&b(o.val()),o.on("keyup",function(e){var t=h(this).val();clearTimeout(d),d=setTimeout(function(){b(t)},600)})):o.on("keyup",function(e){m(h(this).val(),!0)})),a.after(e),a.hide(),{disable:function(){f.hide(),r.addClass("disabled"),a.attr("disabled",!0)},enable:function(){r.removeClass("disabled"),a.removeAttr("disabled")},select:function(e){f.find("ul li span[value='"+e+"']").parent().trigger("click")}}},h.fn.stepper=function(t){var n=h(this);t=t||{};t=h.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},t);var e=h(v.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:t}));0<=t.class.indexOf("outline-")&&n.addClass("border-"+t.class.split("outline-")[1]),n.val(t.default),n.css("text-align","center"),isNaN(t.min)||n.attr("min",t.min),isNaN(t.max)||n.attr("max",t.max),0<t.decimal?n.decimal():n.integer();var i,a=e.find("button:first-child"),s=e.find("button:last-child");null!=n.val()&&0<n.val().length&&(i=Number(n.val()),null!=t.min&&(i<=Number(t.min)?(n.val(t.min),a.attr("disabled",!0)):a.removeAttr("disabled")),null!=t.max&&(i>=Number(t.max)?(n.val(t.max),s.attr("disabled",!0)):s.removeAttr("disabled"))),a.on("click",function(){var e=Number(n.val());(null==t.min||e>Number(t.min))&&(0<t.decimal?n.val((e-t.step/10**t.decimal).toFixed(t.decimal)):n.val(e-t.step)).change()}),s.on("click",function(){var e=Number(n.val());(null==t.max||e<Number(t.max))&&(0<t.decimal?n.val((e+t.step/10**t.decimal).toFixed(t.decimal)):n.val(e+t.step)).change()}),n.on("change",function(){var e=Number(h(this).val());null!=t.min&&(e<=Number(t.min)?a.attr("disabled",!0):a.removeAttr("disabled")),null!=t.max&&(e>=Number(t.max)?s.attr("disabled",!0):s.removeAttr("disabled"))}),n.after(e),a.after(n)},h.fn.pageLoading=function(e){e=e||{};var t={left:function(){return h(window).width()/2-n.width()/2},top:function(){return h(window).height()/2-n.height()/2}};e=h.extend(!0,{},t,e);var n=h(this);function i(){"function"==typeof e.left?n.css("left",e.left()):n.css("left",e.left),"function"==typeof e.top?n.css("top",e.top()):n.css("top",e.top)}return n.css("position","absolute"),i(),h(window).on("resize",function(){i()}),{show:function(){n.show()},hide:function(){n.hide()}}},h.fn.menu=function(e){e=h.extend(!0,{},{},e=e||{});var n=h(this);n.find(".fold-btn").on("click",function(){var e=h(this).closest("[p-menu]");e.hasClass("fold")?(e.removeClass("fold"),h("[form-footer]").hasClass("fixed-bottom")&&h("[form-footer]").css("margin-left","20rem").css("transition","margin-left .2s ease-in")):(e.addClass("fold"),h("[form-footer]").hasClass("fixed-bottom")&&h("[form-footer]").css("margin-left","2rem").css("transition","margin-left .2s ease-in")),setTimeout(function(){h(window).trigger("p-resize")},300)}),n.find(".menu a").on("click",function(){var e=h(this).next(),t=h(this).find("i.bi-chevron-right");n.find(".menu a").removeClass("selected"),e.is(":hidden")?(e.slideDown(200),t.css("transform","rotate(90deg)")):(e.slideUp(200),t.css("transform","rotate(0)")),t.css("transition","all 0.2s"),h(this).addClass("selected")})},h.cascadeSelect=function(n){function i(n,e){n.async?(n.selector.prepend("<option selected>loading...</option>"),n.async(e,function(e,t){a(n.selector,e,t)})):a(n.selector,e?n.data[e]:n.data,n.selected)}function a(e,t,n){e.find("option").remove(),e.append(v.template(`
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `)({data:t,selected:n})),s(parseInt(e.attr("index")),e.find("option:selected").val()),e.on("change",function(){s(parseInt(h(this).attr("index")),h(this).find("option:selected").val())})}function s(e,t){e<n.length-1&&i(n[++e],t)}n&&h.isArray(n)&&0!=n.length&&(n.forEach(function(e,t){e.selector.attr("index",t)}),i(n[0],""))},h.fn.breadcrumb=function(e,t){t=h.extend(!0,{},{history:!0,divider:">"},t=t||{});var n=h(this);e&&0!=e.length&&(t.history&&e.forEach(function(e){var t,n=h.localStorage.all("back");for(t in n){var i=JSON.parse(n[t]);i.name==e.name&&(e.uri=i.uri)}}),n.html(v.template(`
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
        `)({data:e,cfg:t})))},h.fn.search=function(n){var e={en:{text:{input:"input "}},zh:{text:{input:"输入"}}},e=e[(n=n||{}).lang]||e.en;n=h.extend(!0,{},{onChange:function(e){},onClear:function(){},onSearch:function(e,t){}},e,n);var i=h(this);i.removeAttr("class");var t,a,s,l=n.options;l&&0<l.length&&(s=[],l.forEach(function(e){"object"!=typeof e?(e==n.selected&&(a=t=e),s.push({value:e,text:e})):(e.value==n.selected&&(t=e.value,a=e.text),s.push(e))}),l=s,null==t&&(t=l[0].value,a=l[0].text),i.attr("placeholder",n.text.input+a));var o=h(v.template(`
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
        `)({cfg:{opts:l,selectedValue:t,selectedText:a}}));function c(){0<i.val().length?o.find(".clear-btn").css("visibility","visible"):o.find(".clear-btn").css("visibility","hidden")}function d(){var e,t=i.val();l&&0<l.length&&(e={value:(e=o.find(".selected label")).attr("value"),text:e.text()}),i.blur(),n.onSearch(t,e)}i.after(o),o.find(".input").prepend(i),0<i.val().length&&o.find(".clear-btn").css("visibility","visible"),i.on("click",function(){o.find(".condition .options").hide()}),h("body").on("click",function(){o.find(".condition .options").hide()}),o.find(".condition .selected").on("click",function(e){e.stopPropagation();e=o.find(".condition .options");e.is(":hidden")?e.show():e.hide(),o.find(".datepicker").remove(),o.find(".autocomplete .result").hide()}),o.find(".condition .options li").on("click",function(e){e.stopPropagation();var t=h(this).find("span.checked"),e=t.next();o.find(".condition .options li span.checked i").removeClass("bi-check-lg"),t.find("i").addClass("bi-check-lg");t=h(this).closest(".condition").find(".selected label");t.attr("value",e.attr("value")),t.text(e.text()),i.attr("placeholder",n.text.input+e.text()),o.find(".condition .options").hide(),n.onChange({value:e.attr("value"),text:e.text()})}),o.find(".clear-btn").on("click",function(){n.onClear(),i.val("").change()}),i.on("change",function(){c()}),i.on("keyup",function(e){c(),13==e.keyCode&&d()}),o.find(".search-btn").on("click",function(){d()})}});
//# sourceMappingURL=jquery.prac.component.js.map