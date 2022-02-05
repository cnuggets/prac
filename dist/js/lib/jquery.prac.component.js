!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(b,m){function d(e){var n=!0;function t(e){var n=e.val(),t=e.attr("pattern");e.attr("required")?(0==n.length?l:o)(e):t&&(n.match(new RegExp(t))?o:l)(e)}function i(e){var n;e.attr("required")&&(0==(n=e.find("option:selected")).length||1==n.length&&0==n.val().length?l:o)(e)}function a(e){e.attr("required")&&(e.is(":checked")?o:l)(e)}function s(e){e.removeClass("is-valid"),e.removeClass("is-invalid")}function o(e){e.removeClass("is-invalid").addClass("is-valid")}function l(e){n=!1,e.removeClass("is-valid").addClass("is-invalid")}return 0<e.length&&e.hasClass("needs-validation")&&(b.each(e.find("input[type='text'],input[type='password']"),function(e,n){s(b(n)),t(b(n)),b(n).on("change",function(){t(b(this))})}),b.each(e.find("select"),function(e,n){s(b(n)),i(b(n)),b(n).on("change",function(){i(b(this))})}),b.each(e.find("input[type='checkbox']"),function(e,n){s(b(n)),a(b(n)),b(n).on("change",function(){a(b(this))})})),n}function i(e,s,o,l){var c=e;l=l||{};l=b.extend(!0,{},{autoTrigger:!1,close:!0,footer:!0,confirm:{class:"primary",label:"Confirm",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},l);var n;function t(){var e,n=b(m.template(`
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
            `)(l));if("string"==typeof s?n.find(".modal-title").text(s):n.find(".modal-title").append(s),"string"==typeof o?((e=b("<p></p>")).html(o),n.find(".modal-body").append(e)):n.find(".modal-body").append(o),l.size&&n.find(".modal-dialog").addClass("modal-"+l.size),l.css)for(var t in l.css)n.find(".modal-dialog").css(t,l.css[t]);b("body").append(n),l&&l.before&&l.before(),n.on("show.bs.modal",function(){l&&l.after&&l.after()}),n.modal("toggle"),n.find("button[cancel]").on("click",function(){l.cancel.onCancel&&l.cancel.onCancel()});var i=n.find("button[confirm]"),a=n.find("button[waiting]");return i.on("click",function(){function e(){a.hide(),i.show(),n.modal("toggle")}d(n.find("form"))&&(a.show(),i.hide(),l.confirm.onConfirm?l.confirm.onConfirm(function(){e()},c):e())}),n.on("hidden.bs.modal",function(){n.remove()}),n}return l.title=!!s,!l.autoTrigger&&c?(c.off("click"),c.on("click",function(){n=t()})):n=t(),{reset:function(){n.find("button[waiting]").hide(),n.find("button[confirm]").show()}}}function t(e,n,t){return t=b.extend(!0,{},t=t||{},{footer:!1}),i(e,b('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'),n,t)}function a(e,n,t){return t=b.extend(!0,{},t=t||{},{close:!1,cancel:{disabled:!0},confirm:{class:"danger"}}),i(e,b('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'),n,t)}b.fn.pagination=function(e,n,t,i,a){a=b.extend(!0,{},{max:5},a=a||{});var s=b(this),o=Math.ceil(t/n),l=a.max,c=[],d=Math.ceil(e/n);if(l+4<o){for(var r=d;0<=r&&l>a.max/2;)c.splice(0,0,r),l--,r--;for(r=d+1;r<o&&0<l;)c.push(r),l--,r++;for(r=c[0]-1;0<l;)c.splice(0,0,r),r--,l--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=o-1&&c.splice(c.length,0,o-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(r=0;r<o;r++)c.push(r);s.html(m.template(`
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
        `)({skip:parseInt(e),limit:parseInt(n),total:parseInt(t),url:i,pages:o,pageNos:c,options:a})),s.find("select[name='pageSize']").on("change",function(){route(i+"/0/"+b(this).find("option:selected").val())})},b.fn.dialog=function(e,n,t){return i(b(this),e,n,t)},b.dialog=function(e,n,t){return i(null,e,n,t)},b.fn.confirm=function(e,n,t){return i(b(this),e,n,t)},b.confirm=function(e,n,t){return i(null,e,n,t)},b.fn.info=function(e,n){return t(b(this),e,n)},b.info=function(e,n){return t(null,e,n)},b.fn.alert=function(e,n){return a(b(this),e,n)},b.alert=function(e,n){return a(null,e,n)},b.fn.form=function(n){var t=b(this);n=n||{};n=b.extend(!0,{},{footer:{fixed:!1},confirm:{class:"primary",label:"Submit",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},n);var e=b(m.template(`
                <div form-footer <% if (footer.fixed) { %>class="fixed-bottom border-top bg-white opacity-90 w-100 py-3 px-4"<% } %>>
                    <% if (!cancel.disabled) { %>
                    <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                    <% } %>
                    <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                    <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                        <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                    </button>
                </div>
            `)(n));e.find("button[cancel]").on("click",function(){n.cancel.onCancel&&n.cancel.onCancel()});var i=e.find("button[confirm]"),a=e.find("button[waiting]");i.on("click",function(){function e(){a.hide(),i.show()}d(t)&&(a.show(),i.hide(),n.confirm.onConfirm?n.confirm.onConfirm(function(){e()},t):e())}),t.find("[form-footer]").remove(),t.append(e)},b.fn.slider=function(s){s=s||{};var i,a,o=(s=b.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=b(this),n=e.attr("disabled"),l=b(m.template(`
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),c=l.find(".progress-bar"),d=l.find(".btn");function t(){i=function(e){e=e.get(0);var n={};for(n.left=e.offsetLeft,n.top=e.offsetTop;e.offsetParent&&(n.left=n.left+e.offsetParent.offsetLeft,n.top=n.top+e.offsetParent.offsetTop,e!=b("body").get(0));)e=e.offsetParent;return n}(l).left,a=i+l.width()}function r(e){o!=e&&(o=e,s.onChange(o));var n,t,i=(n=e,t=d.outerWidth()/2,t=(s.max-s.min)/l.width()*t,a(n-t)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}d.css("left",i+"%"),c.css("width",e+"%")}function f(){n=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(c.parent().after(s.btn),d.remove(),(d=s.btn).css("position","relative").css("cursor","pointer")),e.append(l),n&&f(),d.css("top",-(d.outerHeight()/2+s.height/2+1)+"px"),t(),r(s.default),d.bindDragMove(function(e,n){},function(e,n,t){!function(e){a<(e=e<i?i:e)&&(e=a);var n=s.min+Math.round((s.max-s.min)/(a-i)*(e-i));if(1<s.step)for(var t=s.min;t<s.max&&n!=t;t+=s.step)if(t+s.step<=s.max&&t<n&&n<t+s.step){n=n-t>t+s.step-n?t+s.step:t;break}r(n)}(n.x)},function(e,n,t){},{preventBody:!0}),b(window).on("resize",function(){t(),r(o)}),b(window).on("p-resize",function(){t(),r(o)}),{setValue:function(e){r(e)},disable:f,enable:function(){n=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},b.fn.multiselect=function(t){var a=b(this);t=t||{};var s=!a.attr("multiple"),i=[],o=[];b.each(b(this).find("option"),function(e,n){var t={value:b(n).attr("value"),text:b(n).text()};b(n).is(":selected")&&(t.selected=!0,i.push(t)),o.push(t)}),t.single=s;var e,l,c,n=b(m.template(`
            <div class="multiselect">
                <div class="selected">
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
        `)({selecteds:i,options:o,opt:t})),d=n.find(".selected"),r=n.find(".select");function f(){r.find("ul.options li").on("click",function(e){e.stopPropagation();var n,t=b(this).find("span.checked i"),i=b(this).find("span:last-child"),e=i.attr("value");t.hasClass("bi-check-lg")?u(d.find("span label[value='"+e+"']").closest("span")):s?(n=`
                            <label class="single" value="<%=value%>"><%=text%></label>
                        `,r.find("span.checked i").removeClass("bi-check-lg"),t.addClass("bi-check-lg"),d.html(m.template(n)({value:e,text:i.text()})),a.find("option[value='"+e+"']").prop("selected",!0).change(),r.hide()):((i=b(m.template(n=`
                            <span class="item">
                                <label value="<%=value%>"><%=text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        `)({value:e,text:i.text()}))).find("i").on("click",function(e){e.stopPropagation(),u(b(this).closest("span"))}),t.addClass("bi-check-lg"),d.append(i),a.find("option[value='"+e+"']").prop("selected",!0).change())})}function u(e){var n=e.find("label").attr("value");r.find("li span[value='"+n+"']").siblings("span").find("i").removeClass("bi-check-lg"),e.remove(),a.find("option[value='"+n+"']").prop("selected",!1).change()}function p(s,o){var e=r.find("ul.options li span:last-child");b.each(e,function(e,n){var t=b(n).text(),i=new RegExp(s,"i"),a=t.match(i);a?(a=t.substring(a.index,a.index+s.length),b(n).html(t.replace(i,"<b>"+a+"</b>")),b(n).closest("li").show()):o&&b(n).closest("li").hide()})}b.each(d.find("span i"),function(e,n){b(n).on("click",function(e){e.stopPropagation(),u(b(this).closest("span"))})}),d.on("click",function(e){e.stopPropagation(),r.is(":hidden")?r.show():r.hide()}),r.on("click",function(e){e.stopPropagation()}),b("body").on("click",function(){r.hide()}),f(),t.search&&(e=n.find(".search input"),l=r.find(".search .spinner-border"),t.search.async?e.on("keyup",function(e){var n=b(this).val();clearTimeout(c),c=setTimeout(function(){l.show(),t.search.async(n,function(e){r.find("ul").html(m.template(`
                                <%_.each(options, function(option) {%>
                                    <li>
                                        <span class="checked"><i class="bi"></i></span>
                                        <span value="<%=option.value%>"><%=option.text%></span>
                                    </li>
                                <% }); %>
                            `)({options:e})),p(n),l.hide(),f()})},600)}):e.on("keyup",function(e){p(b(this).val(),!0)})),a.after(n),a.hide()},b.fn.stepper=function(n){var t=b(this);n=n||{};n=b.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},n);var e=b(m.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:n}));0<=n.class.indexOf("outline-")&&t.addClass("border-"+n.class.split("outline-")[1]),t.val(n.default),t.css("text-align","center"),isNaN(n.min)||t.attr("min",n.min),isNaN(n.max)||t.attr("max",n.max),0<n.decimal?t.decimal():t.integer();var i=e.find("button:first-child"),a=e.find("button:last-child");i.on("click",function(){var e=Number(t.val());(null==n.min||e>Number(n.min))&&(0<n.decimal?t.val((e-n.step/10**n.decimal).toFixed(n.decimal)):t.val(e-n.step)).change()}),a.on("click",function(){var e=Number(t.val());(null==n.max||e<Number(n.max))&&(0<n.decimal?t.val((e+n.step/10**n.decimal).toFixed(n.decimal)):t.val(e+n.step)).change()}),t.on("change",function(){var e=Number(b(this).val());null!=n.min&&(e<=Number(n.min)?i.attr("disabled",!0):i.removeAttr("disabled")),null!=n.max&&(e>=Number(n.max)?a.attr("disabled",!0):a.removeAttr("disabled"))}),t.after(e),i.after(t)},b.fn.pageLoading=function(e){e=e||{};var n={left:function(){return b(window).width()/2-t.width()/2},top:function(){return b(window).height()/2-t.height()/2}};e=b.extend(!0,{},n,e);var t=b(this);function i(){"function"==typeof e.left?t.css("left",e.left()):t.css("left",e.left),"function"==typeof e.top?t.css("top",e.top()):t.css("top",e.top)}return t.css("position","absolute"),i(),b(window).on("resize",function(){i()}),{show:function(){t.show()},hide:function(){t.hide()}}},b.fn.menu=function(e){e=b.extend(!0,{},{},e=e||{});var t=b(this);t.find(".fold-btn").on("click",function(){var e=b(this).closest("[p-menu]");e.hasClass("fold")?e.removeClass("fold"):e.addClass("fold"),setTimeout(function(){b(window).trigger("p-resize")},300)}),t.find(".menu a").on("click",function(){var e=b(this).next(),n=b(this).find("i.bi-chevron-right");t.find(".menu a").removeClass("selected"),e.is(":hidden")?(e.slideDown(200),n.css("transform","rotate(90deg)")):(e.slideUp(200),n.css("transform","rotate(0)")),n.css("transition","all 0.2s"),b(this).addClass("selected")})},b.cascadeSelect=function(t){function i(t,e){t.async?(t.selector.prepend("<option selected>loading...</option>"),t.async(e,function(e,n){a(t.selector,e,n)})):a(t.selector,e?t.data[e]:t.data,t.selected)}function a(e,n,t){e.find("option").remove(),e.append(m.template(`
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `)({data:n,selected:t})),s(parseInt(e.attr("index")),e.find("option:selected").val()),e.on("change",function(){s(parseInt(b(this).attr("index")),b(this).find("option:selected").val())})}function s(e,n){e<t.length-1&&i(t[++e],n)}t&&b.isArray(t)&&0!=t.length&&(t.forEach(function(e,n){e.selector.attr("index",n)}),i(t[0],""))}});
//# sourceMappingURL=jquery.prac.component.js.map