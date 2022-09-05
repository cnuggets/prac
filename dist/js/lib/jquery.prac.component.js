!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(m,b,e){function r(e){var n=!0;function t(e){var n=e.val(),t=e.attr("pattern");e.attr("required")?(0==n.length?l:o)(e):t&&(n.match(new RegExp(t))?o:l)(e)}function i(e){var n;e.attr("required")&&(0==(n=e.find("option:selected")).length||1==n.length&&0==n.val().length?l:o)(e)}function a(e){e.attr("required")&&(e.is(":checked")?o:l)(e)}function s(e){e.removeClass("is-valid"),e.removeClass("is-invalid")}function o(e){e.removeClass("is-invalid").addClass("is-valid")}function l(e){n=!1,e.removeClass("is-valid").addClass("is-invalid")}return 0<e.length&&e.hasClass("needs-validation")&&(m.each(e.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"),function(e,n){s(m(n)),t(m(n)),m(n).on("change",function(){t(m(this))})}),m.each(e.find("select"),function(e,n){s(m(n)),i(m(n)),m(n).on("change",function(){i(m(this))})}),m.each(e.find("input[type='checkbox']"),function(e,n){s(m(n)),a(m(n)),m(n).on("change",function(){a(m(this))})})),n}function d(e){var t={};return e&&0!=e.length&&(m.each(e.find("input[name]"),function(e,n){var t=m(n),i=t.attr("name"),a=t.prop("type"),n=t.val();null==t.attr("p-integer")&&null==t.attr("p-decimal")||isNaN(n)||(n=Number(n)),("radio"!=a&&"checkbox"!=a||t.is(":checked"))&&s(i,n)}),m.each(e.find("textarea[name]"),function(e,n){n=m(n);s(n.attr("name"),n.val())}),m.each(e.find("select[name]"),function(e,n){var t=m(n),i=t.attr("name");m.each(t.find("option:selected"),function(e,n){n=m(n).attr("value");null==t.attr("p-integer")&&null==t.attr("p-decimal")||isNaN(n)||(n=Number(n)),s(i,n)})})),t;function s(e,n){t[e]?(m.isArray(t[e])||(t[e]=[t[e]]),t[e].push(n)):t[e]=n}}function i(e,s,o,l){var c=e;l=l||{};l=m.extend(!0,{},{autoTrigger:!1,close:!0,footer:!0,confirm:{class:"primary",label:"Confirm",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},l);var n;function t(){var e,n=m(b.template(`
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
            `)(l));if("string"==typeof s?n.find(".modal-title").text(s):n.find(".modal-title").append(s),"string"==typeof o?((e=m("<p></p>")).html(o),n.find(".modal-body").append(e)):n.find(".modal-body").append(o),l.size&&n.find(".modal-dialog").addClass("modal-"+l.size),l.css)for(var t in l.css)n.find(".modal-dialog").css(t,l.css[t]);m("body").append(n),l&&l.before&&l.before(),n.on("show.bs.modal",function(){l&&l.after&&l.after()}),n.modal("toggle"),n.find("button[cancel]").on("click",function(){l.cancel.onCancel&&l.cancel.onCancel()});var i=n.find("button[confirm]"),a=n.find("button[waiting]");return i.on("click",function(){function e(){a.hide(),i.show(),n.modal("toggle")}r(n.find("form"))&&(a.show(),i.hide(),l.confirm.onConfirm?0<n.find("form").length?l.confirm.onConfirm(d(n.find("form")),function(){e()},c):l.confirm.onConfirm(function(){e()},c):e())}),n.on("hidden.bs.modal",function(){n.remove()}),n}return l.title=!!s,!l.autoTrigger&&c?(c.off("click"),c.on("click",function(){n=t()})):n=t(),{reset:function(){n.find("button[waiting]").hide(),n.find("button[confirm]").show()}}}function t(e,n,t){return t=m.extend(!0,{},t=t||{},{footer:!1}),i(e,m('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'),n,t)}function a(e,n,t){return t=m.extend(!0,{},t=t||{},{close:!1,cancel:{disabled:!0},confirm:{class:"danger"}}),i(e,m('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'),n,t)}m.fn.pagination=function(e,n,t,i,a){a=m.extend(!0,{},{max:5},a=a||{});var s=m(this),o=Math.ceil(t/n),l=a.max,c=[],r=Math.ceil(e/n);if(l+4<o){for(var d=r;0<=d&&l>a.max/2;)c.splice(0,0,d),l--,d--;for(d=r+1;d<o&&0<l;)c.push(d),l--,d++;for(d=c[0]-1;0<l;)c.splice(0,0,d),d--,l--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=o-1&&c.splice(c.length,0,o-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(d=0;d<o;d++)c.push(d);s.html(b.template(`
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
        `)({skip:parseInt(e),limit:parseInt(n),total:parseInt(t),url:i,pages:o,pageNos:c,options:a})),s.find("select[name='pageSize']").on("change",function(){route(i+"/0/"+m(this).find("option:selected").val())})},m.fn.dialog=function(e,n,t){return i(m(this),e,n,t)},m.dialog=function(e,n,t){return i(null,e,n,t)},m.fn.confirm=function(e,n,t){return i(m(this),e,n,t)},m.confirm=function(e,n,t){return i(null,e,n,t)},m.fn.info=function(e,n){return t(m(this),e,n)},m.info=function(e,n){return t(null,e,n)},m.fn.alert=function(e,n){return a(m(this),e,n)},m.alert=function(e,n){return a(null,e,n)},m.fn.form=function(n){var t=m(this);n=n||{};n=m.extend(!0,{},{footer:{fixed:!1},confirm:{class:"primary",label:"Submit",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},n);var e=m(b.template(`
                <div form-footer <% if (footer.fixed) { %>class="fixed-bottom border-top bg-white opacity-90 w-100 py-3 px-4"<% } %>>
                    <% if (!cancel.disabled) { %>
                    <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                    <% } %>
                    <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                    <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                        <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                    </button>
                </div>
            `)(n));e.find("button[cancel]").on("click",function(){n.cancel.onCancel&&n.cancel.onCancel()});var i=e.find("button[confirm]"),a=e.find("button[waiting]");i.on("click",function(){function e(){a.hide(),i.show()}r(t)&&(a.show(),i.hide(),n.confirm.onConfirm?n.confirm.onConfirm(d(t),function(){e()},t):e())}),t.find("[form-footer]").remove(),t.append(e)},m.fn.slider=function(s){s=s||{};var i,a,o=(s=m.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=m(this),n=e.attr("disabled"),l=m(b.template(`
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),c=l.find(".progress-bar"),r=l.find(".btn");function t(){i=function(e){e=e.get(0);var n={};for(n.left=e.offsetLeft,n.top=e.offsetTop;e.offsetParent&&(n.left=n.left+e.offsetParent.offsetLeft,n.top=n.top+e.offsetParent.offsetTop,e!=m("body").get(0));)e=e.offsetParent;return n}(l).left,a=i+l.width()}function d(e){o!=e&&(o=e,s.onChange(o));var n,t,i=(n=e,t=r.outerWidth()/2,t=(s.max-s.min)/l.width()*t,a(n-t)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}r.css("left",i+"%"),c.css("width",e+"%")}function f(){n=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(c.parent().after(s.btn),r.remove(),(r=s.btn).css("position","relative").css("cursor","pointer")),e.append(l),n&&f(),r.css("top",-(r.outerHeight()/2+s.height/2+1)+"px"),t(),d(s.default),r.bindDragMove(function(e,n){e.preventDefault()},function(e,n,t){!function(e){a<(e=e<i?i:e)&&(e=a);var n=s.min+Math.round((s.max-s.min)/(a-i)*(e-i));if(1<s.step)for(var t=s.min;t<s.max&&n!=t;t+=s.step)if(t+s.step<=s.max&&t<n&&n<t+s.step){n=n-t>t+s.step-n?t+s.step:t;break}d(n)}(n.x)},function(e,n,t){}),m(window).on("resize",function(){t(),d(o)}),m(window).on("p-resize",function(){t(),d(o)}),{setValue:function(e){d(e)},disable:f,enable:function(){n=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},m.fn.multiselect=function(t){var a=m(this);t=t||{};var s=!a.attr("multiple"),i=[],o=[];m.each(m(this).find("option"),function(e,n){var t={value:m(n).attr("value"),text:m(n).text()};m(n).is(":selected")&&(t.selected=!0,i.push(t)),o.push(t)}),t.single=s;var e,l,c,n=m(b.template(`
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
        `)({selecteds:i,options:o,opt:t})),r=n.find(".selected"),d=n.find(".select");function f(){d.find("ul.options li").on("click",function(e){e.stopPropagation();var n,t=m(this).find("span.checked i"),i=m(this).find("span:last-child"),e=i.attr("value");t.hasClass("bi-check-lg")?u(r.find("span label[value='"+e+"']").closest("span")):s?(n=`
                            <label class="single" value="<%=value%>"><%=text%></label>
                        `,d.find("span.checked i").removeClass("bi-check-lg"),t.addClass("bi-check-lg"),r.html(b.template(n)({value:e,text:i.text()})),a.find("option[value='"+e+"']").prop("selected",!0).change(),d.hide()):((i=m(b.template(n=`
                            <span class="item">
                                <label value="<%=value%>"><%=text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        `)({value:e,text:i.text()}))).find("i").on("click",function(e){e.stopPropagation(),u(m(this).closest("span"))}),t.addClass("bi-check-lg"),r.append(i),a.find("option[value='"+e+"']").prop("selected",!0).change())})}function u(e){var n=e.find("label").attr("value");d.find("li span[value='"+n+"']").siblings("span").find("i").removeClass("bi-check-lg"),e.remove(),a.find("option[value='"+n+"']").prop("selected",!1).change()}function p(s,o){var e=d.find("ul.options li span:last-child");m.each(e,function(e,n){var t=m(n).text(),i=new RegExp(s,"i"),a=t.match(i);a?(a=t.substring(a.index,a.index+s.length),m(n).html(t.replace(i,"<b>"+a+"</b>")),m(n).closest("li").show()):o&&m(n).closest("li").hide()})}m.each(r.find("span i"),function(e,n){m(n).on("click",function(e){e.stopPropagation(),u(m(this).closest("span"))})}),r.on("click",function(e){e.stopPropagation(),d.is(":hidden")?d.show():d.hide()}),d.on("click",function(e){e.stopPropagation()}),m("body").on("click",function(){d.hide()}),f(),t.search&&(e=n.find(".search input"),l=d.find(".search .spinner-border"),t.search.async?e.on("keyup",function(e){var n=m(this).val();clearTimeout(c),c=setTimeout(function(){l.show(),t.search.async(n,function(e){d.find("ul").html(b.template(`
                                <%_.each(options, function(option) {%>
                                    <li>
                                        <span class="checked"><i class="bi"></i></span>
                                        <span value="<%=option.value%>"><%=option.text%></span>
                                    </li>
                                <% }); %>
                            `)({options:e})),p(n),l.hide(),f()})},600)}):e.on("keyup",function(e){p(m(this).val(),!0)})),a.after(n),a.hide()},m.fn.stepper=function(n){var t=m(this);n=n||{};n=m.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},n);var e=m(b.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:n}));0<=n.class.indexOf("outline-")&&t.addClass("border-"+n.class.split("outline-")[1]),t.val(n.default),t.css("text-align","center"),isNaN(n.min)||t.attr("min",n.min),isNaN(n.max)||t.attr("max",n.max),0<n.decimal?t.decimal():t.integer();var i=e.find("button:first-child"),a=e.find("button:last-child");i.on("click",function(){var e=Number(t.val());(null==n.min||e>Number(n.min))&&(0<n.decimal?t.val((e-n.step/10**n.decimal).toFixed(n.decimal)):t.val(e-n.step)).change()}),a.on("click",function(){var e=Number(t.val());(null==n.max||e<Number(n.max))&&(0<n.decimal?t.val((e+n.step/10**n.decimal).toFixed(n.decimal)):t.val(e+n.step)).change()}),t.on("change",function(){var e=Number(m(this).val());null!=n.min&&(e<=Number(n.min)?i.attr("disabled",!0):i.removeAttr("disabled")),null!=n.max&&(e>=Number(n.max)?a.attr("disabled",!0):a.removeAttr("disabled"))}),t.after(e),i.after(t)},m.fn.pageLoading=function(e){e=e||{};var n={left:function(){return m(window).width()/2-t.width()/2},top:function(){return m(window).height()/2-t.height()/2}};e=m.extend(!0,{},n,e);var t=m(this);function i(){"function"==typeof e.left?t.css("left",e.left()):t.css("left",e.left),"function"==typeof e.top?t.css("top",e.top()):t.css("top",e.top)}return t.css("position","absolute"),i(),m(window).on("resize",function(){i()}),{show:function(){t.show()},hide:function(){t.hide()}}},m.fn.menu=function(e){e=m.extend(!0,{},{},e=e||{});var t=m(this);t.find(".fold-btn").on("click",function(){var e=m(this).closest("[p-menu]");e.hasClass("fold")?e.removeClass("fold"):e.addClass("fold"),setTimeout(function(){m(window).trigger("p-resize")},300)}),t.find(".menu a").on("click",function(){var e=m(this).next(),n=m(this).find("i.bi-chevron-right");t.find(".menu a").removeClass("selected"),e.is(":hidden")?(e.slideDown(200),n.css("transform","rotate(90deg)")):(e.slideUp(200),n.css("transform","rotate(0)")),n.css("transition","all 0.2s"),m(this).addClass("selected")})},m.cascadeSelect=function(t){function i(t,e){t.async?(t.selector.prepend("<option selected>loading...</option>"),t.async(e,function(e,n){a(t.selector,e,n)})):a(t.selector,e?t.data[e]:t.data,t.selected)}function a(e,n,t){e.find("option").remove(),e.append(b.template(`
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `)({data:n,selected:t})),s(parseInt(e.attr("index")),e.find("option:selected").val()),e.on("change",function(){s(parseInt(m(this).attr("index")),m(this).find("option:selected").val())})}function s(e,n){e<t.length-1&&i(t[++e],n)}t&&m.isArray(t)&&0!=t.length&&(t.forEach(function(e,n){e.selector.attr("index",n)}),i(t[0],""))},m.fn.breadcrumb=function(e,n){n=m.extend(!0,{},{history:!0,divider:">"},n=n||{});var t=m(this);e&&0!=e.length&&(n.history&&e.forEach(function(e){var n,t=m.localStorage.all("back");for(n in t){var i=JSON.parse(t[n]);i.name==e.name&&(e.uri=i.uri)}}),t.html(b.template(`
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