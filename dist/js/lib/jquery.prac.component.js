!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(m,b,e){function r(e){var t=!0;function n(e){var t=e.val(),n=e.attr("pattern");e.attr("required")?(0==t.length?l:o)(e):n&&(t.match(new RegExp(n))?o:l)(e)}function i(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?l:o)(e)}function a(e){e.attr("required")&&(e.is(":checked")?o:l)(e)}function s(e){e.removeClass("is-valid"),e.removeClass("is-invalid")}function o(e){e.removeClass("is-invalid").addClass("is-valid")}function l(e){t=!1,e.removeClass("is-valid").addClass("is-invalid")}return 0<e.length&&e.hasClass("needs-validation")&&(m.each(e.find("input[type='text'],input[type='password']"),function(e,t){s(m(t)),n(m(t)),m(t).on("change",function(){n(m(this))})}),m.each(e.find("select"),function(e,t){s(m(t)),i(m(t)),m(t).on("change",function(){i(m(this))})}),m.each(e.find("input[type='checkbox']"),function(e,t){s(m(t)),a(m(t)),m(t).on("change",function(){a(m(this))})})),t}function i(e,s,o,l){var c=e;l=l||{};l=m.extend(!0,{},{autoTrigger:!1,close:!0,footer:!0,confirm:{class:"primary",label:"Confirm",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},l);var t;function n(){var e,t=m(b.template(`
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
            `)(l));if("string"==typeof s?t.find(".modal-title").text(s):t.find(".modal-title").append(s),"string"==typeof o?((e=m("<p></p>")).html(o),t.find(".modal-body").append(e)):t.find(".modal-body").append(o),l.size&&t.find(".modal-dialog").addClass("modal-"+l.size),l.css)for(var n in l.css)t.find(".modal-dialog").css(n,l.css[n]);m("body").append(t),l&&l.before&&l.before(),t.on("show.bs.modal",function(){l&&l.after&&l.after()}),t.modal("toggle"),t.find("button[cancel]").on("click",function(){l.cancel.onCancel&&l.cancel.onCancel()});var i=t.find("button[confirm]"),a=t.find("button[waiting]");return i.on("click",function(){function e(){a.hide(),i.show(),t.modal("toggle")}r(t.find("form"))&&(a.show(),i.hide(),l.confirm.onConfirm?l.confirm.onConfirm(function(){e()},c):e())}),t.on("hidden.bs.modal",function(){t.remove()}),t}return l.title=!!s,!l.autoTrigger&&c?(c.off("click"),c.on("click",function(){t=n()})):t=n(),{reset:function(){t.find("button[waiting]").hide(),t.find("button[confirm]").show()}}}function n(e,t,n){return n=m.extend(!0,{},n=n||{},{footer:!1}),i(e,m('<i class="bi bi-info-circle text-info" style="font-size: 24px"></i>'),t,n)}function a(e,t,n){return n=m.extend(!0,{},n=n||{},{close:!1,cancel:{disabled:!0},confirm:{class:"danger"}}),i(e,m('<i class="bi bi-exclamation-circle text-danger" style="font-size: 24px"></i>'),t,n)}m.fn.pagination=function(e,t,n,i,a){a=m.extend(!0,{},{max:5},a=a||{});var s=m(this),o=Math.ceil(n/t),l=a.max,c=[],r=Math.ceil(e/t);if(l+4<o){for(var d=r;0<=d&&l>a.max/2;)c.splice(0,0,d),l--,d--;for(d=r+1;d<o&&0<l;)c.push(d),l--,d++;for(d=c[0]-1;0<l;)c.splice(0,0,d),d--,l--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=o-1&&c.splice(c.length,0,o-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(d=0;d<o;d++)c.push(d);s.html(b.template(`
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
        `)({skip:parseInt(e),limit:parseInt(t),total:parseInt(n),url:i,pages:o,pageNos:c,options:a})),s.find("select[name='pageSize']").on("change",function(){route(i+"/0/"+m(this).find("option:selected").val())})},m.fn.dialog=function(e,t,n){return i(m(this),e,t,n)},m.dialog=function(e,t,n){return i(null,e,t,n)},m.fn.confirm=function(e,t,n){return i(m(this),e,t,n)},m.confirm=function(e,t,n){return i(null,e,t,n)},m.fn.info=function(e,t){return n(m(this),e,t)},m.info=function(e,t){return n(null,e,t)},m.fn.alert=function(e,t){return a(m(this),e,t)},m.alert=function(e,t){return a(null,e,t)},m.fn.form=function(t){var n=m(this);t=t||{};t=m.extend(!0,{},{footer:{fixed:!1},confirm:{class:"primary",label:"Submit",waiting:"Waiting",onConfirm:null},cancel:{class:"secondary",label:"Cancel",onCancel:null,disabled:!1}},t);var e=m(b.template(`
                <div form-footer <% if (footer.fixed) { %>class="fixed-bottom border-top bg-white opacity-90 w-100 py-3 px-4"<% } %>>
                    <% if (!cancel.disabled) { %>
                    <button type="button" class="btn btn-<%=cancel.class%> mx-3" cancel><%=cancel.label%></button>
                    <% } %>
                    <button type="button" class="btn btn-<%=confirm.class%>" confirm><%=confirm.label%></button>
                    <button class="btn btn-<%=confirm.class%>" disabled type="button" waiting style="display:none">
                        <span class="spinner-border spinner-border-sm"></span> <%=confirm.waiting%>...
                    </button>
                </div>
            `)(t));e.find("button[cancel]").on("click",function(){t.cancel.onCancel&&t.cancel.onCancel()});var i=e.find("button[confirm]"),a=e.find("button[waiting]");i.on("click",function(){function e(){a.hide(),i.show()}r(n)&&(a.show(),i.hide(),t.confirm.onConfirm?t.confirm.onConfirm(function(){e()},n):e())}),n.find("[form-footer]").remove(),n.append(e)},m.fn.slider=function(s){s=s||{};var i,a,o=(s=m.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=m(this),t=e.attr("disabled"),l=m(b.template(`
            <div class="slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),c=l.find(".progress-bar"),r=l.find(".btn");function n(){i=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=m("body").get(0));)e=e.offsetParent;return t}(l).left,a=i+l.width()}function d(e){o!=e&&(o=e,s.onChange(o));var t,n,i=(t=e,n=r.outerWidth()/2,n=(s.max-s.min)/l.width()*n,a(t-n)),e=a(e);function a(e){return(e-s.min)/(s.max-s.min)*100}r.css("left",i+"%"),c.css("width",e+"%")}function f(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(c.parent().after(s.btn),r.remove(),(r=s.btn).css("position","relative").css("cursor","pointer")),e.append(l),t&&f(),r.css("top",-(r.outerHeight()/2+s.height/2+1)+"px"),n(),d(s.default),r.bindDragMove(function(e,t){e.preventDefault()},function(e,t,n){!function(e){a<(e=e<i?i:e)&&(e=a);var t=s.min+Math.round((s.max-s.min)/(a-i)*(e-i));if(1<s.step)for(var n=s.min;n<s.max&&t!=n;n+=s.step)if(n+s.step<=s.max&&n<t&&t<n+s.step){t=t-n>n+s.step-t?n+s.step:n;break}d(t)}(t.x)},function(e,t,n){}),m(window).on("resize",function(){n(),d(o)}),m(window).on("p-resize",function(){n(),d(o)}),{setValue:function(e){d(e)},disable:f,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},m.fn.multiselect=function(n){var a=m(this);n=n||{};var s=!a.attr("multiple"),i=[],o=[];m.each(m(this).find("option"),function(e,t){var n={value:m(t).attr("value"),text:m(t).text()};m(t).is(":selected")&&(n.selected=!0,i.push(n)),o.push(n)}),n.single=s;var e,l,c,t=m(b.template(`
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
        `)({selecteds:i,options:o,opt:n})),r=t.find(".selected"),d=t.find(".select");function f(){d.find("ul.options li").on("click",function(e){e.stopPropagation();var t,n=m(this).find("span.checked i"),i=m(this).find("span:last-child"),e=i.attr("value");n.hasClass("bi-check-lg")?u(r.find("span label[value='"+e+"']").closest("span")):s?(t=`
                            <label class="single" value="<%=value%>"><%=text%></label>
                        `,d.find("span.checked i").removeClass("bi-check-lg"),n.addClass("bi-check-lg"),r.html(b.template(t)({value:e,text:i.text()})),a.find("option[value='"+e+"']").prop("selected",!0).change(),d.hide()):((i=m(b.template(t=`
                            <span class="item">
                                <label value="<%=value%>"><%=text%></label>
                                <i class="bi bi-x-lg"></i>
                            </span>
                        `)({value:e,text:i.text()}))).find("i").on("click",function(e){e.stopPropagation(),u(m(this).closest("span"))}),n.addClass("bi-check-lg"),r.append(i),a.find("option[value='"+e+"']").prop("selected",!0).change())})}function u(e){var t=e.find("label").attr("value");d.find("li span[value='"+t+"']").siblings("span").find("i").removeClass("bi-check-lg"),e.remove(),a.find("option[value='"+t+"']").prop("selected",!1).change()}function p(s,o){var e=d.find("ul.options li span:last-child");m.each(e,function(e,t){var n=m(t).text(),i=new RegExp(s,"i"),a=n.match(i);a?(a=n.substring(a.index,a.index+s.length),m(t).html(n.replace(i,"<b>"+a+"</b>")),m(t).closest("li").show()):o&&m(t).closest("li").hide()})}m.each(r.find("span i"),function(e,t){m(t).on("click",function(e){e.stopPropagation(),u(m(this).closest("span"))})}),r.on("click",function(e){e.stopPropagation(),d.is(":hidden")?d.show():d.hide()}),d.on("click",function(e){e.stopPropagation()}),m("body").on("click",function(){d.hide()}),f(),n.search&&(e=t.find(".search input"),l=d.find(".search .spinner-border"),n.search.async?e.on("keyup",function(e){var t=m(this).val();clearTimeout(c),c=setTimeout(function(){l.show(),n.search.async(t,function(e){d.find("ul").html(b.template(`
                                <%_.each(options, function(option) {%>
                                    <li>
                                        <span class="checked"><i class="bi"></i></span>
                                        <span value="<%=option.value%>"><%=option.text%></span>
                                    </li>
                                <% }); %>
                            `)({options:e})),p(t),l.hide(),f()})},600)}):e.on("keyup",function(e){p(m(this).val(),!0)})),a.after(t),a.hide()},m.fn.stepper=function(t){var n=m(this);t=t||{};t=m.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},t);var e=m(b.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:t}));0<=t.class.indexOf("outline-")&&n.addClass("border-"+t.class.split("outline-")[1]),n.val(t.default),n.css("text-align","center"),isNaN(t.min)||n.attr("min",t.min),isNaN(t.max)||n.attr("max",t.max),0<t.decimal?n.decimal():n.integer();var i=e.find("button:first-child"),a=e.find("button:last-child");i.on("click",function(){var e=Number(n.val());(null==t.min||e>Number(t.min))&&(0<t.decimal?n.val((e-t.step/10**t.decimal).toFixed(t.decimal)):n.val(e-t.step)).change()}),a.on("click",function(){var e=Number(n.val());(null==t.max||e<Number(t.max))&&(0<t.decimal?n.val((e+t.step/10**t.decimal).toFixed(t.decimal)):n.val(e+t.step)).change()}),n.on("change",function(){var e=Number(m(this).val());null!=t.min&&(e<=Number(t.min)?i.attr("disabled",!0):i.removeAttr("disabled")),null!=t.max&&(e>=Number(t.max)?a.attr("disabled",!0):a.removeAttr("disabled"))}),n.after(e),i.after(n)},m.fn.pageLoading=function(e){e=e||{};var t={left:function(){return m(window).width()/2-n.width()/2},top:function(){return m(window).height()/2-n.height()/2}};e=m.extend(!0,{},t,e);var n=m(this);function i(){"function"==typeof e.left?n.css("left",e.left()):n.css("left",e.left),"function"==typeof e.top?n.css("top",e.top()):n.css("top",e.top)}return n.css("position","absolute"),i(),m(window).on("resize",function(){i()}),{show:function(){n.show()},hide:function(){n.hide()}}},m.fn.menu=function(e){e=m.extend(!0,{},{},e=e||{});var n=m(this);n.find(".fold-btn").on("click",function(){var e=m(this).closest("[p-menu]");e.hasClass("fold")?e.removeClass("fold"):e.addClass("fold"),setTimeout(function(){m(window).trigger("p-resize")},300)}),n.find(".menu a").on("click",function(){var e=m(this).next(),t=m(this).find("i.bi-chevron-right");n.find(".menu a").removeClass("selected"),e.is(":hidden")?(e.slideDown(200),t.css("transform","rotate(90deg)")):(e.slideUp(200),t.css("transform","rotate(0)")),t.css("transition","all 0.2s"),m(this).addClass("selected")})},m.cascadeSelect=function(n){function i(n,e){n.async?(n.selector.prepend("<option selected>loading...</option>"),n.async(e,function(e,t){a(n.selector,e,t)})):a(n.selector,e?n.data[e]:n.data,n.selected)}function a(e,t,n){e.find("option").remove(),e.append(b.template(`
                <%_.each(Object.keys(data), function(value, i) {%>
                    <option value="<%=value%>"<% if (selected == value || i == 0) { %> selected<% } %>><%=data[value]%></option>
                <% }); %>
            `)({data:t,selected:n})),s(parseInt(e.attr("index")),e.find("option:selected").val()),e.on("change",function(){s(parseInt(m(this).attr("index")),m(this).find("option:selected").val())})}function s(e,t){e<n.length-1&&i(n[++e],t)}n&&m.isArray(n)&&0!=n.length&&(n.forEach(function(e,t){e.selector.attr("index",t)}),i(n[0],""))},m.fn.breadcrumb=function(e,t){t=m.extend(!0,{},{history:!0,divider:">"},t=t||{});var n=m(this);e&&0!=e.length&&(t.history&&e.forEach(function(e){var t,n=m.localStorage.all("back");for(t in n){var i=JSON.parse(n[t]);i.name==e.name&&(e.uri=i.uri)}}),n.html(b.template(`
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
        `)({data:e,cfg:t})))}});
//# sourceMappingURL=jquery.prac.component.js.map