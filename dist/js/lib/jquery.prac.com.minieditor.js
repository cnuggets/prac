!function(e){"function"==typeof define&&define.amd?define(["underscore","turndown","jquery","common","component"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(C,e,x){x.fn.minieditor=function(f){var o=x(this),e={en:{},zh:{}},n=e[(f=f||{}).lang]||e.en;f=x.extend(!0,{},{lang:"en",title:"Editor",headings:{normal:"Normal Text",h1:"Heading 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5"},tools:{erase:!0,heading:!0,bold:!0,italic:!0,ol:!0,ul:!0},extensions:{}},n,f);var t=x(C.template(`
            <div class="p-minieditor">
                <div class="me-header">
                    <% if (opt.title) {%>
                    <div class="title"><%=opt.title%></div>
                    <% } %>
                    <div class="tools">
                        <% if (opt.tools.erase) { %>
                        <a href="javascript:void(0)" erase title="clean" p-tooltip>
                            <i class="bi bi-eraser"></i>
                        </a>
                        <% } %>
                        <% if (opt.tools.heading) { %>
                        <div class="dropdown font" heading>
                            <button class="btn btn-secondary dropdown-toggle" type="button">
                                <i class="bi bi-fonts"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <% for (var key in opt.headings) { %>
                                <li><a class="dropdown-item <%=key%>" href="javascript:void(0)" value="<%=key%>"><%=opt.headings[key]%></a></li>
                                <% } %>
                            </ul>
                        </div>
                        <% } %>
                        <% if (opt.tools.bold) { %>
                        <a href="javascript:void(0)" bold>
                            <i class="bi bi-type-bold"></i>
                        </a>
                        <% } %>
                        <% if (opt.tools.italic) { %>
                        <a href="javascript:void(0)" italic>
                            <i class="bi bi-type-italic"></i>
                        </a>
                        <% } %>
                        <% if (opt.tools.ol) { %>
                        <a href="javascript:void(0)" ol>
                            <i class="bi bi-list-ol"></i>
                        </a>
                        <% } %>
                        <% if (opt.tools.ul) { %>
                        <a href="javascript:void(0)" ul>
                            <i class="bi bi-list-ul"></i>
                        </a>
                        <% } %>
                        <% for (var name in opt.extensions) { 
                            var extension = opt.extensions[name];
                        %>
                            <div class="dropdown extension" extension="<%=name%>">
                                <button class="btn btn-secondary dropdown-toggle" type="button"<% if (extension.title) { %> title="<%=extension.title%>" p-tooltip<% } %>>
                                    <i class="bi bi-<%=extension.icon%>"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <% for (var value in extension.options) { 
                                        var option = extension.options[value];
                                    %>
                                    <li>
                                        <a class="dropdown-item" href="javascript:void(0)" value="<%=value%>">
                                            <i class="bi bi-<%=option.icon%>"></i>
                                            <div class="info">
                                                <div class="name"><%=option.name%></div>
                                                <% if (option.description) { %>
                                                <div class="description"><%=option.description%></div>
                                                <% } %>
                                            </div>
                                        </a>
                                    </li>
                                    <% } %>
                                </ul>
                            </div>
                        <% } %>
                    </div>
                </div>
                <div class="me-body" tabindex="0" contenteditable="true"></div>
            </div>
        `)({opt:f}));o.html(""),o.append(t);var u,v=t.find(".me-body"),i=t.find(".tools"),a=t.find("[erase]"),s=t.find("[bold]"),l=t.find("[italic]"),d=t.find("[heading]"),e=t.find("[ol]"),n=t.find("[ul]"),t=o.find(".dropdown[extension]"),r=new TurndownService;function c(){o.find(".dropdown-menu").removeClass("show"),o.find(".dropdown-toggle").removeClass("show")}function p(){o.find(".dropdown-toggle").off("click"),o.find(".dropdown-toggle").on("click",function(){var e=x(this).hasClass("show");c(),e||(x(this).addClass("show"),x(this).closest(".dropdown").find(".dropdown-menu").addClass("show"))}),o.find(".dropdown").off("click"),o.find(".dropdown").on("click",function(e){e.stopPropagation()})}function m(e){var n=u.getRangeAt(0),t=n.cloneContents(),o=document.createElement("span");o.appendChild(t);var i=x(o),t=n.commonAncestorContainer,o=t.nodeType===Node.TEXT_NODE?t.parentElement:t,n=i.children("."+e).length,t=i.children().length;return i.children().removeClass(e),i.children().remove(),!!(x(o).hasClass(e)||0<n&&n==t&&0==i.text().trim().length)}function h(e){return e.prop("tagName").toLowerCase()}function g(o){if(u){var e=Object.keys(f.headings),n=(c=u.getRangeAt(0)).cloneContents(),t=document.createElement("span");t.appendChild(n);var i=x(t);u.deleteFromDocument();var a=c.commonAncestorContainer,s=a.nodeType===Node.TEXT_NODE?a.parentElement:a,n=i.contents(),l=!1;x.each(n,function(e,n){n.nodeType===Node.TEXT_NODE&&0<n.nodeValue.trim().length&&(l=!0)});t=i.children("."+o).length,a=i.children().length,t=0<t&&t==a;if("ul"==o||"ol"==o){var d,r,c,a=i.find("."+o).children("li");return"li"==h(x(s))?((c=document.createRange()).selectNode(s),u.removeAllRanges(),u.addRange(c),u.deleteFromDocument()):0<x(s).closest("li").length?((c=document.createRange()).selectNode(x(s).closest("li")),u.removeAllRanges(),u.addRange(c),u.deleteFromDocument()):0<a.length?((c=document.createRange()).selectNode(s),u.addRange(c),x.each(n,function(e,n){x.each(x(n).contents(),function(e,n){c.insertNode(n),c.setStartAfter(n)})})):(e.forEach(function(e){x(s).removeClass(e),i.children().removeClass(e)}),d=x(`<${o}></${o}>`),0<n.length?x.each(n,function(e,n){var t=x("<li></li>");n.nodeType===Node.TEXT_NODE?t.text(n.nodeValue):t.append(x(n)),d.append(t)}):(r=x("<li></li>"),d.append(r)),r=d.get(0),c.insertNode(r),c.setStartAfter(r),(c=document.createRange()).selectNode(d.find("li").last().get(0)),u.removeAllRanges(),u.addRange(c)),void p()}if(0<=e.indexOf(o)){if("normal"==o)return e.forEach(function(e){x(s).removeClass(e),i.children().removeClass(e)}),x.each(n,function(e,n){c.insertNode(n),c.setStartAfter(n)}),void p();if(x(s).hasClass(o)||t&&!l)return x.each(n,function(e,n){c.insertNode(n),c.setStartAfter(n)}),void p();e.forEach(function(e){e!=o&&(x(s).removeClass(e),i.children().removeClass(e))})}function p(){u=null,function i(e){e=e.contents();x.each(e,function(e,n){var t,o;n.nodeType==Node.TEXT_NODE?0<(t=x(n).parent()).length&&(o=t.attr("class"),"span"==h(t)&&(0==t.text().length?t.remove():o&&0!=t.text().trim().length||(t.before(t.text()),t.remove()))):i(x(n))})}(v)}i.children().removeClass(o),x(s).hasClass(o)?(x(s).removeClass(o),x(s).attr("class")||x(s).remove(),x.each(n,function(e,n){c.insertNode(n),c.setStartAfter(n)})):t&&!l?x.each(n,function(e,n){c.insertNode(n),c.setStartAfter(n)}):x.each(n,function(e,n){var t;n.nodeType===Node.TEXT_NODE?"span"==h(x(s))?(x(s).addClass(o),c.insertNode(n),c.setStartAfter(n)):((t=document.createElement("span")).classList.add(o),t.appendChild(n),c.insertNode(t),c.setStartAfter(t)):(n.classList.add(o),c.insertNode(n),c.setStartAfter(n))}),p()}}function b(e){e.find(".dropdown-item").on("click",function(){var e=x(this).attr("value"),n=x(this).closest("[extension]").attr("extension");f.extensions[n].onSelect(e,function(e){var n;u&&(e=(n="string"==typeof(n=e)?x(`<span class="variable">${e}</span>`):n).get(0),(n=u.getRangeAt(0)).insertNode(e),n.setStartAfter(e),u=null)}),c()})}v.on("mousedown",function(e){e.stopPropagation(),s.removeClass("selected"),l.removeClass("selected"),v.on("mouseup",function(e){e.stopPropagation(),u=window.getSelection(),function(){m("bold")?s.addClass("selected"):s.removeClass("selected");m("italic")?l.addClass("selected"):l.removeClass("selected")}(),v.off("mouseup")})}),x("body").on("click",function(){c()}),o.on("click",function(){c()}),p(),a.on("click",function(e){e.stopPropagation(),c(),v.html("")}),s.on("click",function(e){e.stopPropagation(),c(),g("bold"),s.removeClass("selected")}),l.on("click",function(e){e.stopPropagation(),c(),g("italic"),l.removeClass("selected")}),e.on("click",function(e){e.stopPropagation(),c(),g("ol")}),n.on("click",function(e){e.stopPropagation(),c(),g("ul")}),d.find(".dropdown-item").on("click",function(){g(x(this).attr("value")),c()}),x.each(t,function(e,n){b(x(n))});var w=`
            <div class="dropdown extension" extension="<%=name%>">
                <button class="btn btn-secondary dropdown-toggle" type="button"<% if (title) { %> title="<%=title%>" p-tooltip<% } %>>
                    <i class="bi bi-<%=icon%>"></i>
                </button>
                <ul class="dropdown-menu">
                    <% for (var value in options) { 
                        var option = options[value];
                    %>
                    <li>
                        <a class="dropdown-item" href="javascript:void(0)" value="<%=value%>">
                            <i class="bi bi-<%=option.icon%>"></i>
                            <div class="info">
                                <div class="name"><%=option.name%></div>
                                <% if (option.description) { %>
                                <div class="description"><%=option.description%></div>
                                <% } %>
                            </div>
                        </a>
                    </li>
                    <% } %>
                </ul>
            </div>
        `;t={html:function(){return v.html()},text:function(){return v.text()},markdown:function(){return r.turndown(v.get(0))},setHTML:function(e){v.html(e)},resetExtensions:function(e){for(var n in e){f.extensions[n]?o.find("[extension='"+n+"']").remove():f.extensions[n]=e[n];var t=e[n];t.name=n;t=x(C.template(w)(t));i.append(t),b(t)}p()}};return o.data("editor",t),t}});
//# sourceMappingURL=jquery.prac.com.minieditor.js.map