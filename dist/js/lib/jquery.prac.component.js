!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(h,v,e){function r(e){var n=!0;function t(e){var n=e.val(),t=e.attr("pattern");e.attr("required")?(0==n.length?o:l)(e):t&&(n.match(new RegExp(t))?l:o)(e)}function i(e){var n;e.attr("required")&&(0==(n=e.find("option:selected")).length||1==n.length&&0==n.val().length?o:l)(e)}function a(e){e.attr("required")&&(e.is(":checked")?l:o)(e)}function s(e){e.removeClass("is-valid"),e.removeClass("is-invalid")}function l(e){e.removeClass("is-invalid").addClass("is-valid")}function o(e){n=!1,e.removeClass("is-valid").addClass("is-invalid")}return 0<e.length&&e.hasClass("needs-validation")&&(h.each(e.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"),function(e,n){s(h(n)),t(h(n)),h(n).on("change",function(){t(h(this))})}),h.each(e.find("select"),function(e,n){s(h(n)),i(h(n)),h(n).on("change",function(){i(h(this))})}),h.each(e.find("input[type='checkbox']"),function(e,n){s(h(n)),a(h(n)),h(n).on("change",function(){a(h(this))})})),n}function d(e){var t={};return e&&0!=e.length&&(h.each(e.find("input[name]"),function(e,n){var t=h(n),i=t.attr("name"),a=t.prop("type"),n=t.val();null==t.attr("p-integer")&&null==t.attr("p-decimal")||isNaN(n)||(n=Number(n)),("radio"!=a&&"checkbox"!=a||t.is(":checked"))&&s(i,n)}),h.each(e.find("textarea[name]"),function(e,n){n=h(n);s(n.attr("name"),n.val())}),h.each(e.find("select[name]"),function(e,n){var t=h(n),i=t.attr("name");h.each(t.find("option:selected"),function(e,n){n=h(n).attr("value");null==t.attr("p-integer")&&null==t.attr("p-decimal")||isNaN(n)||(n=Number(n)),s(i,n)})})),t;function s(e,n){null!=t[e]?(h.isArray(t[e])||(t[e]=[t[e]]),t[e].push(n)):t[e]=n}}function a(e,s,l,o){var c=e;o=o||{};o=h.extend(!0,{},{autoTrigger:!1,close:!0,footer:!0,confirm:{class:"primary",label:"Confirm",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},o);var n;function t(){var e,n=h(v.template(`
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
            `)(o));if("string"==typeof s?n.find(".modal-title").text(s):n.find(".modal-title").append(s),"string"==typeof l?((e=h("<p></p>")).html(l),n.find(".modal-body").append(e)):n.find(".modal-body").append(l),o.size&&n.find(".modal-dialog").addClass("modal-"+o.size),o.css)for(var t in o.css)n.find(".modal-dialog").css(t,o.css[t]);h("body").append(n),o&&o.before&&o.before(),n.on("show.bs.modal",function(){o&&o.after&&o.after()}),n.modal("toggle"),n.find("button[cancel]").on("click",function(){o.cancel.onCancel&&o.cancel.onCancel()});var i=n.find("button[confirm]"),a=n.find("button[waiting]");return i.on("click",function(){function e(){a.hide(),i.show(),n.modal("toggle")}r(n.find("form"))&&(a.show(),i.hide(),o.confirm.onConfirm?0<n.find("form").length?o.confirm.onConfirm(d(n.find("form")),function(){e()},c):o.confirm.onConfirm(function(){e()},c):e())}),n.on("hidden.bs.modal",function(){n.remove()}),n}return o.title=!!s,!o.autoTrigger&&c?(c.off("click"),c.on("click",function(){n=t()})):n=t(),{reset:function(){n.find("button[waiting]").hide(),n.find("button[confirm]").show()},close:function(){n.modal("toggle")}}}function i(e,n,t,i){return a(e,n,t,i=h.extend(!0,{},i=i||{},{close:!1}))}function t(e,n,t){return t=h.extend(!0,{},t=t||{},{footer:!1}),a(e,h('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'),n,t)}function s(e,n,t){return t=h.extend(!0,{},t=t||{},{close:!1,cancel:{disabled:!0},confirm:{class:"danger"}}),a(e,h('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'),n,t)}h.fn.pagination=function(e,n,t,i,a){a=h.extend(!0,{},{max:5},a=a||{});var s=h(this),l=Math.ceil(t/n),o=a.max,c=[],r=Math.ceil(e/n);if(o+4<l){for(var d=r;0<=d&&o>a.max/2;)c.splice(0,0,d),o--,d--;for(d=r+1;d<l&&0<o;)c.push(d),o--,d++;for(d=c[0]-1;0<o;)c.splice(0,0,d),d--,o--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=l-1&&c.splice(c.length,0,l-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(d=0;d<l;d++)c.push(d);s.html(v.template(`
            <div class="navigation">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item<% if (skip == 0) { %> disabled<% } %>">
                            <a aria-label="Previous" class="page-link" href="<%=url%>/<%=skip - limit%>/<%=limit%>" p-router>
                                <span class="page-icon prev" aria-hidden=true>&laquo;</span>
                            </a>
                        </li>
                        <%  _.each(pageNos, function(pageNo, i) { %>
                            <% if (pageNo != -1) { %>
                                <li class="page-item<% if (skip == pageNo * limit) { %> active<% } %>" number>
                                    <a class="page-link" href="<%=url%>/<%=limit * pageNo%>/<%=limit%>" p-router><%=pageNo + 1%></a>
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
                            <a aria-label="Next" class="page-link" href="<%=url%>/<%=skip + limit%>/<%=limit%>" p-router>
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
        `)({skip:parseInt(e),limit:parseInt(n),total:parseInt(t),url:i,pages:l,pageNos:c,options:a})),s.find("select[name='pageSize']").on("change",function(){route(i+"/0/"+h(this).find("option:selected").val())})},h.fn.dialog=function(e,n,t){return a(h(this),e,n,t)},h.dialog=function(e,n,t){return a(null,e,n,t)},h.fn.confirm=function(e,n,t){return i(h(this),e,n,t)},h.confirm=function(e,n,t){return i(null,e,n,t)},h.fn.info=function(e,n){return t(h(this),e,n)},h.info=function(e,n){return t(null,e,n)},h.fn.alert=function(e,n){return s(h(this),e,n)},h.alert=function(e,n){return s(null,e,n)},h.fn.form=function(n){var t=h(this);n=n||{};n=h.extend(!0,{},{footer:{fixed:!1,align:"left"},confirm:{class:"primary",label:"Submit",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},n);var e=h(v.template(`
                <div form-footer class="mt-2<% if (footer.fixed) { %> fixed-bottom border-top bg-white opacity-90 py-3<% } %>">
                    <div class="row">
                        <% if (footer.element) { %>
                            <% if (footer.align == "right") { %>
                                <div class="col-md-6" element>
                                </div>
                                <div class="col-md-6" style="display: flex;justify-content: right;align-items: center;padding-right: 5rem">
                                    <% if (!cancel.disabled) { %>
                                        <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                                    <% } %>
                                    <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                                    <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                                        <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                                    </button>
                                </div>
                            <% } else { %>
                                <div class="col-md-6">
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
                            <div class="col-md-12">
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
            `)(n));n.footer.fixed&&(t.css("margin-bottom","5rem"),0<h(".side-menu").length&&(h(".side-menu").hasClass("fold")?e.css("margin-left","2rem"):e.css("margin-left","20rem"))),n.footer.element&&e.find("[element]").append(n.footer.element),e.find("button[cancel]").on("click",function(){n.cancel.onCancel&&n.cancel.onCancel()});var i=e.find("button[confirm]"),a=e.find("button[waiting]");i.on("click",function(){function e(){a.hide(),i.show()}r(t)&&(a.show(),i.hide(),n.confirm.onConfirm?n.confirm.onConfirm(d(t),function(){e()},t):e())}),t.find("[form-footer]").remove(),t.append(e)},h.fn.slider=function(s){s=s||{};var i,a,l=(s=h.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=h(this),n=e.attr("disabled"),o=h(v.template(`
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),c=o.find(".progress-bar"),r=o.find(".btn");function t(){i=function(e){e=e.get(0);var n={};for(n.left=e.offsetLeft,n.top=e.offsetTop;e.offsetParent&&(n.left=n.left+e.offsetParent.offsetLeft,n.top=n.top+e.offsetParent.offsetTop,e!=h("body").get(0));)e=e.offsetParent;return n}(o).left,a=i+o.width()}function d(e){l!=e&&(l=e,s.onChange(l));var n,t,i=(n=e,t=r.outerWidth()/2,t=(s.max-s.min)/o.width()*t,a(n-t)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}r.css("left",i+"%"),c.css("width",e+"%")}function f(){n=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(c.parent().after(s.btn),r.remove(),(r=s.btn).css("position","relative").css("cursor","pointer")),e.append(o),n&&f(),r.css("top",-(r.outerHeight()/2+s.height/2+1)+"px"),t(),d(s.default),r.bindDragMove(function(e,n){e.preventDefault()},function(e,n,t){!function(e){a<(e=e<i?i:e)&&(e=a);var n=s.min+Math.round((s.max-s.min)/(a-i)*(e-i));if(1<s.step)for(var t=s.min;t<s.max&&n!=t;t+=s.step)if(t+s.step<=s.max&&t<n&&n<t+s.step){n=n-t>t+s.step-n?t+s.step:t;break}d(n)}(n.x)},function(e,n,t){}),h(window).on("resize",function(){t(),d(l)}),h(window).on("p-resize",function(){t(),d(l)}),{setValue:function(e){d(e)},disable:f,enable:function(){n=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},h.fn.multiselect=function(t){var a=h(this);t=t||{};t=h.extend(!0,{},{search:!1},t);var s=!a.attr("multiple"),i=[],l=[];h.each(a.find("option"),function(e,n){var t={value:h(n).attr("value"),text:h(n).text()};h(n).is(":selected")&&(t.selected=!0,i.push(t)),l.push(t)}),t.single=s;var o,c,r,e=h(v.template(`
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
        `)({disabled:a.attr("disabled"),selecteds:i,options:l,opt:t})),d=e.find(".selected"),f=e.find(".select");function u(){f.find("ul.options li").on("click",function(e){e.stopPropagation();var n,t=h(this).find("span.checked i"),i=h(this).find("span:last-child"),e=i.attr("value");t.hasClass("bi-check-lg")?p(d.find("span label[value='"+e+"']").closest("span")):s?(n=`
                            <label class="single" value="<%=value%>"><%=text%></label>
                        `,f.find("span.checked i").removeClass("bi-check-lg"),t.addClass("bi-check-lg"),d.html(v.template(n)({value:e,text:i.text()})),a.find("option[value='"+e+"']").prop("selected",!0).change(),f.hide()):((i=h(v.template(n=`
                            <span class="item">
                                <label value="<%=value%>"><%=text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        `)({value:e,text:i.text()}))).find("i").on("click",function(e){d.hasClass("disabled")||(e.stopPropagation(),p(h(this).closest("span")))}),t.addClass("bi-check-lg"),d.append(i),a.find("option[value='"+e+"']").prop("selected",!0).change())})}function p(e){var n=e.find("label").attr("value");f.find("li span[value='"+n+"']").siblings("span").find("i").removeClass("bi-check-lg"),e.remove(),a.find("option[value='"+n+"']").prop("selected",!1).change()}function m(n){c.show(),t.search.async(n,function(e){f.find("ul").html(v.template(`
                            <%_.each(options, function(option) {%>
                                <li>
                                    <span class="checked"><i class="bi"></i></span>
                                    <span value="<%=option.value%>"><%=option.text%></span>
                                </li>
                            <% }); %>
                        `)({options:e})),b(n),a.find("option").remove(),a.append(h("<option value=''></option>")),e.forEach(function(e){var n=h("<option></option>");n.attr("value",e.value),n.text(e.text),a.append(n)}),c.hide();e=d.find("label").attr("value");a.find("option[value='"+e+"']").prop("selected",!0),f.find("ul li span[value='"+e+"']").siblings("span.checked").find("i").addClass("bi-check-lg"),h.each(d.find("span.item"),function(e,n){n=h(n).find("label").attr("value");a.find("option[value='"+n+"']").prop("selected",!0),f.find("ul li span[value='"+n+"']").siblings("span.checked").find("i").addClass("bi-check-lg")}),u(),t.search.autoSelect&&0==o.val().length&&f.find("ul.options li:first-child").trigger("click")})}function b(s,l){var e=f.find("ul.options li span:last-child");h.each(e,function(e,n){var t=h(n).text(),i=new RegExp(s,"i"),a=t.match(i);a?(a=t.substring(a.index,a.index+s.length),h(n).html(t.replace(i,"<b>"+a+"</b>")),h(n).closest("li").show()):l&&h(n).closest("li").hide()})}return h.each(d.find("span i"),function(e,n){h(n).on("click",function(e){e.stopPropagation(),p(h(this).closest("span"))})}),d.on("click",function(e){h(this).hasClass("disabled")||(e.stopPropagation(),f.is(":hidden")?f.show():f.hide())}),f.on("click",function(e){e.stopPropagation()}),h("body").on("click",function(){f.hide()}),u(),t.search&&(o=e.find(".search input"),c=f.find(".search .spinner-border"),t.search.async?(t.search.keyword&&o.val(t.search.keyword),t.search.autoTrigger&&m(o.val()),o.on("keyup",function(e){var n=h(this).val();clearTimeout(r),r=setTimeout(function(){m(n)},600)})):o.on("keyup",function(e){b(h(this).val(),!0)})),a.after(e),a.hide(),{disable:function(){f.hide(),d.addClass("disabled"),a.attr("disabled",!0)},enable:function(){d.removeClass("disabled"),a.removeAttr("disabled")},select:function(e){f.find("ul li span[value='"+e+"']").parent().trigger("click")}}},h.fn.stepper=function(n){var t=h(this);n=n||{};n=h.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},n);var e=h(v.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:n}));0<=n.class.indexOf("outline-")&&t.addClass("border-"+n.class.split("outline-")[1]),t.val(n.default),t.css("text-align","center"),isNaN(n.min)||t.attr("min",n.min),isNaN(n.max)||t.attr("max",n.max),0<n.decimal?t.decimal():t.integer();var i,a=e.find("button:first-child"),s=e.find("button:last-child");null!=t.val()&&0<t.val().length&&(i=Number(t.val()),null!=n.min&&(i<=Number(n.min)?(t.val(n.min),a.attr("disabled",!0)):a.removeAttr("disabled")),null!=n.max&&(i>=Number(n.max)?(t.val(n.max),s.attr("disabled",!0)):s.removeAttr("disabled"))),a.on("click",function(){var e=Number(t.val());(null==n.min||e>Number(n.min))&&(0<n.decimal?t.val((e-n.step/10**n.decimal).toFixed(n.decimal)):t.val(e-n.step)).change()}),s.on("click",function(){var e=Number(t.val());(null==n.max||e<Number(n.max))&&(0<n.decimal?t.val((e+n.step/10**n.decimal).toFixed(n.decimal)):t.val(e+n.step)).change()}),t.on("change",function(){var e=Number(h(this).val());null!=n.min&&(e<=Number(n.min)?a.attr("disabled",!0):a.removeAttr("disabled")),null!=n.max&&(e>=Number(n.max)?s.attr("disabled",!0):s.removeAttr("disabled"))}),t.after(e),a.after(t)},h.fn.pageLoading=function(e){e=e||{};var n={left:function(){return h(window).width()/2-t.width()/2},top:function(){return h(window).height()/2-t.height()/2}};e=h.extend(!0,{},n,e);var t=h(this);function i(){"function"==typeof e.left?t.css("left",e.left()):t.css("left",e.left),"function"==typeof e.top?t.css("top",e.top()):t.css("top",e.top)}return t.css("position","absolute"),i(),h(window).on("resize",function(){i()}),{show:function(){t.show()},hide:function(){t.hide()}}},h.fn.menu=function(e){e=h.extend(!0,{},{},e=e||{});var t=h(this);t.find(".fold-btn").on("click",function(){var e=h(this).closest("[p-menu]");e.hasClass("fold")?(e.removeClass("fold"),h("[form-footer]").hasClass("fixed-bottom")&&h("[form-footer]").css("margin-left","20rem").css("transition","margin-left .2s ease-in")):(e.addClass("fold"),h("[form-footer]").hasClass("fixed-bottom")&&h("[form-footer]").css("margin-left","2rem").css("transition","margin-left .2s ease-in")),setTimeout(function(){h(window).trigger("p-resize")},300)}),t.find(".menu a").on("click",function(){var e=h(this).next(),n=h(this).find("i.bi-chevron-right");t.find(".menu a").removeClass("selected"),e.is(":hidden")?(e.slideDown(200),n.css("transform","rotate(90deg)")):(e.slideUp(200),n.css("transform","rotate(0)")),n.css("transition","all 0.2s"),h(this).addClass("selected")})},h.cascadeSelect=function(t){function i(t,e){t.async?(t.selector.prepend("<option selected>loading...</option>"),t.async(e,function(e,n){a(t.selector,e,n)})):a(t.selector,e?t.data[e]:t.data,t.selected)}function a(e,n,t){e.find("option").remove(),e.append(v.template(`
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `)({data:n,selected:t})),s(parseInt(e.attr("index")),e.find("option:selected").val()),e.on("change",function(){s(parseInt(h(this).attr("index")),h(this).find("option:selected").val())})}function s(e,n){e<t.length-1&&i(t[++e],n)}t&&h.isArray(t)&&0!=t.length&&(t.forEach(function(e,n){e.selector.attr("index",n)}),i(t[0],""))},h.fn.breadcrumb=function(e,n){n=h.extend(!0,{},{history:!0,divider:">"},n=n||{});var t=h(this);e&&0!=e.length&&(n.history&&e.forEach(function(e){var n,t=h.localStorage.all("back");for(n in t){var i=JSON.parse(t[n]);i.name==e.name&&(e.uri=i.uri)}}),t.html(v.template(`
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
        `)({data:e,cfg:n})))}});
//# sourceMappingURL=jquery.prac.component.js.map