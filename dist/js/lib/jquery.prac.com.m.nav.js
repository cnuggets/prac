!function(i){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],i):"object"==typeof exports?i(require("jquery")):i(jQuery)}(function(h,u,i){h.fn.indexNav=function(s){var o=h(this);s=s||{};s=h.extend(!0,{},{class:"primary"},s);var l=o.find("[p-anchor]"),t=[];h.each(l,function(i,e){t.push(h(e).attr("p-anchor"))});var n=h(u.template(`
            <ul class="index">
                <%_.each(indices, function(index) {%>
                    <li target="<%=index%>"><%=index%></li>
                <% }); %>
            </ul>
        `)({indices:t}));o.append(n);var c=h(u.template('<div class="anchor-fixed text-<%=clazz%>"></div>')({clazz:s.class}));c.text(l.eq(0).attr("p-anchor")),o.prepend(c);var e,r=l.height();function a(i){clearTimeout(e),d(i),e=setTimeout(function(){d(i)},1e3)}function d(t){var n,a=!1;h.each(l,function(i,e){var s;h(e).position().top-t<0&&(i<l.length-1&&(0<(i=(s=l.eq(i+1)).position().top-t)&&(n=h(e).attr("p-anchor"),i<=r?(c.css("position","absolute"),c.css("transform","translateY(-100%)"),s.before(c)):(c.css("position","fixed"),c.css("transform",""),o.prepend(c)))),c.show(),a=!0)}),a||(c.hide(),n=l.eq(0).attr("p-anchor")),p(n)}function p(i){var e;null!=i&&(c.text(i),e="text-"+s.class,n.find("li[target='"+i+"']").hasClass(e)||(n.find("li").removeClass(e),n.find("li[target='"+i+"']").addClass(e),s.onChange&&s.onChange(i)))}function f(i){o[0].scrollTo(0,0),window.scrollTo(0,0);var e=o.find("[p-anchor='"+i+"']");o[0].scrollTo(0,e.position().top+1),window.scrollTo(0,e.position().top+1),p(i)}return o.scroll(function(i){a(0)}),h(window).scroll(function(i){a(h(window).scrollTop())}),n.find("li").on("click",function(){var i;h(this).hasClass("text-"+s.class)||(f(i=h(this).attr("target")),p(i))}),{select:f}},h.fn.tab=function(e){var i=h(this);e=e||{};(e=h.extend(!0,{},{class:"primary"},e)).fixed&&i.css("position","fixed").css("top",e.fixed.top||"0").css("bottom","0");var t=i.find(".nav li"),s=i.find(".contents > div"),n=h(u.template('<div class="underline bg-<%=clazz%>"></div>')({clazz:e.class})),a=0;function o(i,e){var s=t.eq(i).find("span"),i=s.position().left;n.css("transform","translateX("+i+"px)"),n.css("width",s.outerWidth()),e?n.css("transition","all, 0.2s"):n.css("transition","none")}return i.find(".nav").after(n),o(0),t.on("click",function(){var i;h(this).hasClass("selected")||(t.removeClass("selected"),s.removeClass("selected"),h(this).addClass("selected"),i=h(this).index(),s.eq(i).addClass("selected"),e.onChange&&e.onChange(i),o(a=i,!0))}),h(window).on("resize",function(){o(a)}),{select:function(i){t.eq(i).trigger("click")}}},h.fn.tabBar=function(e){var i=h(this);e=e||{};(e=h.extend(!0,{},{class:"primary"},e)).fixed&&i.css("position","fixed").css("top",e.fixed.top||"0").css("bottom","0");var s=i.find(".nav li"),t=i.find(".contents > div");return i.find(".nav li.selected").addClass("text-"+e.class),s.on("click",function(){var i;h(this).hasClass("selected")||(s.removeClass(),t.removeClass("selected"),h(this).addClass("selected").addClass("text-"+e.class),i=h(this).index(),t.eq(i).addClass("selected"),e.onChange&&e.onChange(i),0)}),{select:function(i){s.eq(i).trigger("click")}}},h.fn.collapse=function(t){var n=h(this);t=t||{};t=h.extend(!0,{},{accordion:!1},t),n.find(".title").on("click",function(){var i=h(this);t.accordion&&(n.find(".content").slideUp(200),n.find(".title i").css("transform","rotate(0)").css("transition","all 0.2s"));var e=i.next(),s=i.find("i");e.is(":hidden")?(s.css("transform","rotate(90deg)").css("transition","all 0.2s"),e.slideDown(200,function(){t.onUncollapse&&t.onUncollapse(i.closest(".item").index())})):(s.css("transform","rotate(0)").css("transition","all 0.2s"),e.slideUp(200,function(){t.onCollapse&&t.onCollapse(i.closest(".item").index())}))})},h.fn.topMenu=function(i){var e=h(this);i=h.extend(!0,{},{},i=i||{}),e.find(".item.selected").closest("ul").show(),e.css("top",-e.height()).css("transition","none"),e.hide();var s=e.find(".item");function t(){e.show(),e.css("top",0).css("transition","top 0.2s")}function n(){e.css("top",-e.height()).css("transition","top 0.2s"),setTimeout(function(){e.hide()},200)}function a(){(e.is(":visible")?n:t)()}return s.on("click",function(i){i.stopPropagation(),h(this).find("i").hasClass("bi-dash")?(s.removeClass("selected"),h(this).addClass("selected")):(i=h(this).next()).is(":hidden")?(h(this).find(".bi-chevron-right").css("transform","rotate(90deg)"),i.slideDown(200)):(h(this).find(".bi-chevron-right").css("transform","rotate(0)"),i.slideUp(200))}),e.on("click",function(i){i.stopPropagation()}),h("body").on("click",function(i){n()}),{show:t,hide:n,toggle:a,bindTo:function(i){i.on("click",function(i){i.stopPropagation(),a()})}}},h.fn.sidebar=function(i){var e=h(this);function s(){e.offcanvas("toggle")}return i=h.extend(!0,{},{place:"start"},i=i||{}),e.addClass("offcanvas").addClass("offcanvas-"+i.place),e.find("a.close").on("click",function(){s()}),{toggle:s,bindTo:function(i){i.on("click",function(i){i.stopPropagation(),s()})}}},h.fn.pagination=function(i,e,s,t,n){var a=h(this);n=h.extend(!0,{},{max:5},n=n||{});var a=h(this),o=Math.ceil(s/e),l=n.max,c=[],r=Math.ceil(i/e);if(l+4<o){for(var d=r;0<=d&&l>n.max/2;)c.splice(0,0,d),l--,d--;for(d=r+1;d<o&&0<l;)c.push(d),l--,d++;for(d=c[0]-1;0<l;)c.splice(0,0,d),d--,l--;0!=c[0]&&c.splice(0,0,0),c[c.length-1]!=o-1&&c.splice(c.length,0,o-1),c[0]!=c[1]-1&&(c[0]==c[1]-2?c.splice(1,0,c[0]+1):c.splice(1,0,-1)),c[c.length-2]!=c[c.length-1]-1&&(c[c.length-2]==c[c.length-1]-2?c.splice(c.length-1,0,c[c.length-1]-1):c.splice(c.length-1,0,-1))}else for(d=0;d<o;d++)c.push(d);a.html(u.template(`
            <div class="p-pagination">
                <nav>
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
        `)({skip:parseInt(i),limit:parseInt(e),total:parseInt(s),url:t,pages:o,pageNos:c,options:n})),a.find("select[name='pageSize']").on("change",function(){route(t+"/0/"+h(this).find("option:selected").val())})}});
//# sourceMappingURL=jquery.prac.com.m.nav.js.map