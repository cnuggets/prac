!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(m,v,e){function r(e){var t=!0;function i(e){var t=e.val(),i=e.attr("pattern");e.attr("required")?(0==t.length?l:o)(e):i&&(t.match(new RegExp(i))?o:l)(e)}function n(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?l:o)(e)}function a(e){e.attr("required")&&(e.is(":checked")?o:l)(e)}function s(e){e.removeClass("is-valid"),e.removeClass("is-invalid")}function o(e){e.removeClass("is-invalid").addClass("is-valid")}function l(e){t=!1,e.removeClass("is-valid").addClass("is-invalid")}return 0<e.length&&e.hasClass("needs-validation")&&(m.each(e.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"),function(e,t){s(m(t)),i(m(t)),m(t).on("change",function(){i(m(this))})}),m.each(e.find("select"),function(e,t){s(m(t)),n(m(t)),m(t).on("change",function(){n(m(this))})}),m.each(e.find("input[type='checkbox']"),function(e,t){s(m(t)),a(m(t)),m(t).on("change",function(){a(m(this))})})),t}function d(e){var i={};return e&&0!=e.length&&(m.each(e.find("input[name]"),function(e,t){var i=m(t),n=i.attr("name"),a=i.prop("type"),t=i.val();null==i.attr("p-integer")&&null==i.attr("p-decimal")||isNaN(t)||(t=Number(t)),("radio"!=a&&"checkbox"!=a||i.is(":checked"))&&s(n,t)}),m.each(e.find("textarea[name]"),function(e,t){t=m(t);s(t.attr("name"),t.val())}),m.each(e.find("select[name]"),function(e,t){var i=m(t),n=i.attr("name");m.each(i.find("option:selected"),function(e,t){t=m(t).attr("value");null==i.attr("p-integer")&&null==i.attr("p-decimal")||isNaN(t)||(t=Number(t)),s(n,t)})})),i;function s(e,t){null!=i[e]?(m.isArray(i[e])||(i[e]=[i[e]]),i[e].push(t)):i[e]=t}}function a(e,s,o,l){var c=e;l=l||{};l=m.extend(!0,{},{autoTrigger:!1,close:!0,footer:!0,confirm:{class:"primary",label:"Confirm",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},l);var t;function i(){var e,t=m(v.template(`
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
            `)(l));if("string"==typeof s?t.find(".modal-title").text(s):t.find(".modal-title").append(s),"string"==typeof o?((e=m("<p></p>")).html(o),t.find(".modal-body").append(e)):t.find(".modal-body").append(o),l.size&&t.find(".modal-dialog").addClass("modal-"+l.size),l.css)for(var i in l.css)t.find(".modal-dialog").css(i,l.css[i]);m("body").append(t),l&&l.before&&l.before(),t.on("show.bs.modal",function(){l&&l.after&&l.after()}),t.modal("toggle"),t.find("button[cancel]").on("click",function(){l.cancel.onCancel&&l.cancel.onCancel()});var n=t.find("button[confirm]"),a=t.find("button[waiting]");return n.on("click",function(){function e(){a.hide(),n.show(),t.modal("toggle")}r(t.find("form"))&&(a.show(),n.hide(),l.confirm.onConfirm?0<t.find("form").length?l.confirm.onConfirm(d(t.find("form")),function(){e()},c):l.confirm.onConfirm(function(){e()},c):e())}),t.on("hidden.bs.modal",function(){t.remove()}),t}return l.title=!!s,!l.autoTrigger&&c?(c.off("click"),c.on("click",function(){t=i()})):t=i(),{reset:function(){t.find("button[waiting]").hide(),t.find("button[confirm]").show()},close:function(){t.modal("toggle")}}}function n(e,t,i,n){return a(e,t,i,n=m.extend(!0,{},n=n||{},{close:!1}))}function i(e,t,i){return i=m.extend(!0,{},i=i||{},{footer:!1}),a(e,m('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'),t,i)}function s(e,t,i){return i=m.extend(!0,{},i=i||{},{close:!1,cancel:{disabled:!0},confirm:{class:"danger"}}),a(e,m('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'),t,i)}m.fn.pagination=function(e,t,i,n,a){a=m.extend(!0,{},{max:5},a=a||{});var s=m(this),o=Math.ceil(i/t),l=a.max,c=[],r=Math.ceil(e/t);if(l+4<o){for(var d=r;0<=d&&l>a.max/2;)c.splice(0,0,d),l--,d--;for(d=r+1;d<o&&0<l;)c.push(d),l--,d++;for(d=c[0]-1;0<l;)c.splice(0,0,d),d--,l--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=o-1&&c.splice(c.length,0,o-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(d=0;d<o;d++)c.push(d);var f="";0<n.indexOf("?")&&(n=(r=n.split("?"))[0],f="?"+r[1]),s.html(v.template(`
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
        `)({skip:parseInt(e),limit:parseInt(t),total:parseInt(i),url:n,queryString:f,pages:o,pageNos:c,options:a})),s.find("select[name='pageSize']").on("change",function(){route(n+"/0/"+m(this).find("option:selected").val()+f)})},m.fn.dialog=function(e,t,i){return a(m(this),e,t,i)},m.dialog=function(e,t,i){return a(null,e,t,i)},m.fn.confirm=function(e,t,i){return n(m(this),e,t,i)},m.confirm=function(e,t,i){return n(null,e,t,i)},m.fn.info=function(e,t){return i(m(this),e,t)},m.info=function(e,t){return i(null,e,t)},m.fn.alert=function(e,t){return s(m(this),e,t)},m.alert=function(e,t){return s(null,e,t)},m.fn.form=function(t){var i=m(this);t=t||{};t=m.extend(!0,{},{footer:{fixed:!1,align:"left"},confirm:{class:"primary",label:"Submit",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},t);var e=m(v.template(`
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
            `)(t));t.footer.fixed&&(i.css("margin-bottom","5rem"),0<m(".side-menu").length&&(m(".side-menu").hasClass("fold")?e.css("margin-left","2rem"):e.css("margin-left","20rem"))),t.footer.element&&e.find("[element]").append(t.footer.element),e.find("button[cancel]").on("click",function(){t.cancel.onCancel&&t.cancel.onCancel()});var n=e.find("button[confirm]"),a=e.find("button[waiting]");n.on("click",function(){function e(){a.hide(),n.show()}r(i)&&(a.show(),n.hide(),t.confirm.onConfirm?t.confirm.onConfirm(d(i),function(){e()},i):e())}),i.find("[form-footer]").remove(),i.append(e)},m.fn.slider=function(s){s=s||{};var n,a,o=(s=m.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=m(this),t=e.attr("disabled"),l=m(v.template(`
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),c=l.find(".progress-bar"),r=l.find(".btn");function i(){n=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=m("body").get(0));)e=e.offsetParent;return t}(l).left,a=n+l.width()}function d(e){o!=e&&(o=e,s.onChange(o));var t,i,n=(t=e,i=r.outerWidth()/2,i=(s.max-s.min)/l.width()*i,a(t-i)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}r.css("left",n+"%"),c.css("width",e+"%")}function f(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(c.parent().after(s.btn),r.remove(),(r=s.btn).css("position","relative").css("cursor","pointer")),e.append(l),t&&f(),r.css("top",-(r.outerHeight()/2+s.height/2+1)+"px"),i(),d(s.default),r.bindDragMove(function(e,t){e.preventDefault()},function(e,t,i){!function(e){a<(e=e<n?n:e)&&(e=a);var t=s.min+Math.round((s.max-s.min)/(a-n)*(e-n));if(1<s.step)for(var i=s.min;i<s.max&&t!=i;i+=s.step)if(i+s.step<=s.max&&i<t&&t<i+s.step){t=t-i>i+s.step-t?i+s.step:i;break}d(t)}(t.x)},function(e,t,i){}),m(window).on("resize",function(){i(),d(o)}),m(window).on("p-resize",function(){i(),d(o)}),{setValue:function(e){d(e)},disable:f,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},m.fn.multiselect=function(i){var a=m(this);i=i||{};i=m.extend(!0,{},{search:!1},i);var s=!a.attr("multiple"),n=[],o=[];m.each(a.find("option"),function(e,t){var i={value:m(t).attr("value"),text:m(t).text()};m(t).is(":selected")&&(i.selected=!0,n.push(i)),o.push(i)}),i.single=s;var l,c,r,e=m(v.template(`
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
        `)({disabled:a.attr("disabled"),selecteds:n,options:o,opt:i})),d=e.find(".selected"),f=e.find(".select");function p(){f.find("ul.options li").on("click",function(e){e.stopPropagation();var t,i=m(this).find("span.checked i"),n=m(this).find("span:last-child"),e=n.attr("value");i.hasClass("bi-check-lg")?u(d.find("span label[value='"+e+"']").closest("span")):s?(t=`
                            <label class="single" value="<%=value%>"><%=text%></label>
                        `,f.find("span.checked i").removeClass("bi-check-lg"),i.addClass("bi-check-lg"),d.html(v.template(t)({value:e,text:n.text()})),a.find("option[value='"+e+"']").prop("selected",!0).change(),f.hide()):((n=m(v.template(t=`
                            <span class="item">
                                <label value="<%=value%>"><%=text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        `)({value:e,text:n.text()}))).find("i").on("click",function(e){d.hasClass("disabled")||(e.stopPropagation(),u(m(this).closest("span")))}),i.addClass("bi-check-lg"),d.append(n),a.find("option[value='"+e+"']").prop("selected",!0).change())})}function u(e){var t=e.find("label").attr("value");f.find("li span[value='"+t+"']").siblings("span").find("i").removeClass("bi-check-lg"),e.remove(),a.find("option[value='"+t+"']").prop("selected",!1).change()}function h(t){c.show(),i.search.async(t,function(e){f.find("ul").html(v.template(`
                            <%_.each(options, function(option) {%>
                                <li>
                                    <span class="checked"><i class="bi"></i></span>
                                    <span value="<%=option.value%>"><%=option.text%></span>
                                </li>
                            <% }); %>
                        `)({options:e})),b(t),a.find("option").remove(),a.append(m("<option value=''></option>")),e.forEach(function(e){var t=m("<option></option>");t.attr("value",e.value),t.text(e.text),a.append(t)}),c.hide();e=d.find("label").attr("value");a.find("option[value='"+e+"']").prop("selected",!0),f.find("ul li span[value='"+e+"']").siblings("span.checked").find("i").addClass("bi-check-lg"),m.each(d.find("span.item"),function(e,t){t=m(t).find("label").attr("value");a.find("option[value='"+t+"']").prop("selected",!0),f.find("ul li span[value='"+t+"']").siblings("span.checked").find("i").addClass("bi-check-lg")}),p(),i.search.autoSelect&&0==l.val().length&&f.find("ul.options li:first-child").trigger("click")})}function b(s,o){var e=f.find("ul.options li span:last-child");m.each(e,function(e,t){var i=m(t).text(),n=new RegExp(s,"i"),a=i.match(n);a?(a=i.substring(a.index,a.index+s.length),m(t).html(i.replace(n,"<b>"+a+"</b>")),m(t).closest("li").show()):o&&m(t).closest("li").hide()})}return m.each(d.find("span i"),function(e,t){m(t).on("click",function(e){e.stopPropagation(),u(m(this).closest("span"))})}),d.on("click",function(e){m(this).hasClass("disabled")||(e.stopPropagation(),f.is(":hidden")?f.show():f.hide())}),f.on("click",function(e){e.stopPropagation()}),m("body").on("click",function(){f.hide()}),p(),i.search&&(l=e.find(".search input"),c=f.find(".search .spinner-border"),i.search.async?(i.search.keyword&&l.val(i.search.keyword),i.search.autoTrigger&&h(l.val()),l.on("keyup",function(e){var t=m(this).val();clearTimeout(r),r=setTimeout(function(){h(t)},600)})):l.on("keyup",function(e){b(m(this).val(),!0)})),a.after(e),a.hide(),{disable:function(){f.hide(),d.addClass("disabled"),a.attr("disabled",!0)},enable:function(){d.removeClass("disabled"),a.removeAttr("disabled")},select:function(e){f.find("ul li span[value='"+e+"']").parent().trigger("click")}}},m.fn.stepper=function(t){var i=m(this);t=t||{};t=m.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},t);var e=m(v.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:t}));0<=t.class.indexOf("outline-")&&i.addClass("border-"+t.class.split("outline-")[1]),i.val(t.default),i.css("text-align","center"),isNaN(t.min)||i.attr("min",t.min),isNaN(t.max)||i.attr("max",t.max),0<t.decimal?i.decimal():i.integer();var n,a=e.find("button:first-child"),s=e.find("button:last-child");null!=i.val()&&0<i.val().length&&(n=Number(i.val()),null!=t.min&&(n<=Number(t.min)?(i.val(t.min),a.attr("disabled",!0)):a.removeAttr("disabled")),null!=t.max&&(n>=Number(t.max)?(i.val(t.max),s.attr("disabled",!0)):s.removeAttr("disabled"))),a.on("click",function(){var e=Number(i.val());(null==t.min||e>Number(t.min))&&(0<t.decimal?i.val((e-t.step/10**t.decimal).toFixed(t.decimal)):i.val(e-t.step)).change()}),s.on("click",function(){var e=Number(i.val());(null==t.max||e<Number(t.max))&&(0<t.decimal?i.val((e+t.step/10**t.decimal).toFixed(t.decimal)):i.val(e+t.step)).change()}),i.on("change",function(){var e=Number(m(this).val());null!=t.min&&(e<=Number(t.min)?a.attr("disabled",!0):a.removeAttr("disabled")),null!=t.max&&(e>=Number(t.max)?s.attr("disabled",!0):s.removeAttr("disabled"))}),i.after(e),a.after(i)},m.fn.pageLoading=function(e){e=e||{};var t={left:function(){return m(window).width()/2-i.width()/2},top:function(){return m(window).height()/2-i.height()/2}};e=m.extend(!0,{},t,e);var i=m(this);function n(){"function"==typeof e.left?i.css("left",e.left()):i.css("left",e.left),"function"==typeof e.top?i.css("top",e.top()):i.css("top",e.top)}return i.css("position","absolute"),n(),m(window).on("resize",function(){n()}),{show:function(){i.show()},hide:function(){i.hide()}}},m.fn.menu=function(e){e=m.extend(!0,{},{},e=e||{});var i=m(this);i.find(".fold-btn").on("click",function(){var e=m(this).closest("[p-menu]");e.hasClass("fold")?(e.removeClass("fold"),m("[form-footer]").hasClass("fixed-bottom")&&m("[form-footer]").css("margin-left","20rem").css("transition","margin-left .2s ease-in")):(e.addClass("fold"),m("[form-footer]").hasClass("fixed-bottom")&&m("[form-footer]").css("margin-left","2rem").css("transition","margin-left .2s ease-in")),setTimeout(function(){m(window).trigger("p-resize")},300)}),i.find(".menu a").on("click",function(){var e=m(this).next(),t=m(this).find("i.bi-chevron-right");i.find(".menu a").removeClass("selected"),e.is(":hidden")?(e.slideDown(200),t.css("transform","rotate(90deg)")):(e.slideUp(200),t.css("transform","rotate(0)")),t.css("transition","all 0.2s"),m(this).addClass("selected")})},m.cascadeSelect=function(i){function n(i,e){i.async?(i.selector.prepend("<option selected>loading...</option>"),i.async(e,function(e,t){a(i.selector,e,t)})):a(i.selector,e?i.data[e]:i.data,i.selected)}function a(e,t,i){e.find("option").remove(),e.append(v.template(`
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `)({data:t,selected:i})),s(parseInt(e.attr("index")),e.find("option:selected").val()),e.on("change",function(){s(parseInt(m(this).attr("index")),m(this).find("option:selected").val())})}function s(e,t){e<i.length-1&&n(i[++e],t)}i&&m.isArray(i)&&0!=i.length&&(i.forEach(function(e,t){e.selector.attr("index",t)}),n(i[0],""))},m.fn.breadcrumb=function(e,t){t=m.extend(!0,{},{history:!0,divider:">"},t=t||{});var i=m(this);e&&0!=e.length&&(t.history&&e.forEach(function(e){var t,i=m.localStorage.all("back");for(t in i){var n=JSON.parse(i[t]);n.name==e.name&&(e.uri=n.uri)}}),i.html(v.template(`
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
        `)({data:e,cfg:t})))},m.fn.search=function(i){var e={en:{text:{input:"input "}},zh:{text:{input:"输入"}}},e=e[(i=i||{}).lang]||e.en;i=m.extend(!0,{},{onChange:function(e){},onClear:function(){},onSearch:function(e,t){}},e,i);var n=m(this);n.removeAttr("class");var t,a,s,o=i.options;o&&0<o.length&&(s=[],o.forEach(function(e){"object"!=typeof e?(e==i.selected&&(a=t=e),s.push({value:e,text:e})):(e.value==i.selected&&(t=e.value,a=e.text),s.push(e))}),o=s,null==t&&(t=o[0].value,a=o[0].text),n.attr("placeholder",i.text.input+a));var l=m(v.template(`
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
        `)({cfg:{opts:o,selectedValue:t,selectedText:a}}));function c(){0<n.val().length?l.find(".clear-btn").css("visibility","visible"):l.find(".clear-btn").css("visibility","hidden")}function r(){var e,t=n.val();o&&0<o.length&&(e={value:(e=l.find(".selected label")).attr("value"),text:e.text()}),n.blur(),i.onSearch(t,e)}n.after(l),l.find(".input").prepend(n),0<n.val().length&&l.find(".clear-btn").css("visibility","visible"),n.on("click",function(){l.find(".condition .options").hide()}),m("body").on("click",function(){l.find(".condition .options").hide()}),l.find(".condition .selected").on("click",function(e){e.stopPropagation();e=l.find(".condition .options");e.is(":hidden")?e.show():e.hide(),l.find(".datepicker").remove(),l.find(".autocomplete .result").hide()}),l.find(".condition .options li").on("click",function(e){e.stopPropagation();var t=m(this).find("span.checked"),e=t.next();l.find(".condition .options li span.checked i").removeClass("bi-check-lg"),t.find("i").addClass("bi-check-lg");t=m(this).closest(".condition").find(".selected label");t.attr("value",e.attr("value")),t.text(e.text()),n.attr("placeholder",i.text.input+e.text()),l.find(".condition .options").hide(),i.onChange({value:e.attr("value"),text:e.text()})}),l.find(".clear-btn").on("click",function(){i.onClear(),n.val("").change()}),n.on("change",function(){c()}),n.on("keyup",function(e){c(),13==e.keyCode&&r()}),l.find(".search-btn").on("click",function(){r()})},m.fn.ellipsis=function(t){var e,i,n,a,s,o=m(this),l={en:{label:{fold:"show less",unfold:"show all"}},zh:{label:{fold:"收起",unfold:"展开"}}},l=l[(t=t||{lines:1,expandable:!1}).lang]||l.en;function c(e){e.removeClass("p-text-ellipsis").removeClass("p-text-ellipsis-ml")}function r(e){1<t.lines?(e.addClass("p-text-ellipsis-ml"),e.attr("style","-webkit-line-clamp: "+t.lines)):e.addClass("p-text-ellipsis")}t=m.extend(!0,{},{lang:"en"},l,t),c(o),t.expandable?(l=o.text(),o.html(v.template(`
                <span><%=text%></span>
                <a href="javascript:void(0)"><%=options.label.unfold%></a>
            `)({text:l,options:t})),r(e=o.children("span")),i=o.children("a"),n=e.get(0),a=document.createElement("canvas").getContext("2d"),s=getComputedStyle(n),a.measureText(n.innerText).width>parseFloat(s.width)?i.on("click",function(){e.hasClass("p-text-ellipsis")||e.hasClass("p-text-ellipsis-ml")?(c(e),i.text(t.label.fold)):(r(e),i.text(t.label.unfold))}):i.remove()):r(o)},m.fn.popover=function(e){var t=m(this),i={en:{},zh:{}},i=i[(e=e||{}).lang]||i.en;e=m.extend(!0,{},{lang:"en",position:"bottom",location:"begin"},i,e),0==t.next(".p-popover").length&&(i=t.attr("title"),e.content&&(i=e.content),n=m(v.template(`
                <div class="p-popover">
                    <div class="p-content"></div>
                    <i class="bi p-arrow"></i>
                </div>
            `)()),t.after(n),"object"==typeof i?n.find(".p-content").append(i):n.find(".p-content").html(i));var n,a=(n=t.next(".p-popover")).find(".p-arrow");function s(){"top"==e.position?(a.addClass("bi-caret-down-fill"),n.css("top",t.position().top-n.outerHeight()-7),a.css("top",n.outerHeight()-10)):"bottom"==e.position?(a.addClass("bi-caret-up-fill"),n.css("top",t.position().top+t.outerHeight()+7),a.css("top",-14)):"left"==e.position?(a.addClass("bi-caret-right-fill"),n.css("left",t.position().left-n.outerWidth()-7),a.css("right",-9)):"right"==e.position&&(a.addClass("bi-caret-left-fill"),n.css("left",t.position().left+t.outerWidth()+7),a.css("left",-9)),"begin"==e.location?"top"==e.position||"bottom"==e.position?(a.css("left",.3*t.outerWidth()),n.css("left",t.position().left)):(a.css("top",.3*t.outerHeight()),n.css("top",t.position().top)):"end"==e.location?"top"==e.position||"bottom"==e.position?(a.css("right",.3*t.outerWidth()),n.css("left",t.position().left-(n.outerWidth()-t.outerWidth()))):(a.css("bottom",.3*t.outerHeight()),n.css("top",t.position().top-(n.outerHeight()-t.outerHeight()))):"middle"==e.location&&("top"==e.position||"bottom"==e.position?(a.css("left",.5*n.outerWidth()-a.outerWidth()/2),n.css("left",t.position().left+t.outerWidth()/2-n.outerWidth()/2)):(a.css("top",.5*n.outerHeight()-a.outerHeight()/2),n.css("top",t.position().top+t.outerHeight()/2-n.outerHeight()/2)))}return m("body").on("click",function(){m(".p-popover").hide()}),t.on("click",function(e){e.stopPropagation(),a.is(":hidden")?(m(".p-popover").hide(),n.show(),s()):n.hide()}),n.on("click",function(e){e.stopPropagation()}),m(window).on("resize",function(){s()}),{close:function(){n.hide()}}},m.fn.progress=function(s){s=s||{};var o=(s=m.extend(!0,{},{height:5,classes:["bg-primary"],min:0,max:100,default:0,step:1,formatter:function(e){return e},onChange:function(e){}},s)).default,e=m(this),l=m(v.template(`
            <div class="p-progress">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn<%_.each(classes, function(c) { %><% if (c.indexOf("bg-") == 0) { %> <%=c%><% } %><% }); %>"></div>
            </div>
        `)(s)),c=l.find(".progress-bar"),r=l.find(".btn");function t(e){(e=e>s.max?s.max:e)<s.min&&(e=s.min),o!=e&&(o=e,s.onChange(o)),r.text(s.formatter(o));var t,i,n=(t=e,i=r.outerWidth()/2,i=(s.max-s.min)/l.width()*i,a(t-i)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}r.css("left",n+"%"),c.css("width",e+"%")}return e.append(l),s.height>r.outerHeight()&&(s.height=r.outerHeight(),l.find(".progress").css("height",r.outerHeight())),l.css("transform","translateY("+(r.outerHeight()/2+1)+"px)"),r.css("top",-(r.outerHeight()/2+s.height/2)+"px"),t(s.default),m(window).on("resize",function(){t(o)}),{setValue:function(e){t(e)},getValue:function(){return o}}}});
//# sourceMappingURL=jquery.prac.component.js.map