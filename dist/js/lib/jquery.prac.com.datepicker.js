!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(_,B,e,N){_.fn.datepicker=function(E){var O=_(this);E=E||{};var e=new Date,t={en:{btns:{back:{label:"Back"},clear:{label:"Clear"},confirm:{label:"Confirm"}},week:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},month:{months:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],format:"MM"},year:{format:"YYYY"}},zh:{btns:{back:{label:"返回"},clear:{label:"清空"},confirm:{label:"确认"}},week:{days:["日","一","二","三","四","五","六"]},month:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],format:"MM月"},year:{format:"YYYY年"}}},e={lang:"en",type:"date",class:"danger",range:!1,multiple:!1,btns:{clear:{onClear:function(){}},confirm:{onConfirm:function(){}}},week:{firstDay:0},month:{format:"MM"},year:{format:"YYYY"},scope:[new Date(1970,0,1),new Date(e.getFullYear()+50,11,31)]},t=t[E.lang]||t.en;E=_.extend(!0,{},e,t,E);var a,I=`
            <div class="datepicker" style="position: absolute;" id="<%=id%>">
                <div class="header">
                    <div class="year-month">
                        <div class="prev">
                            <i class="bi bi-chevron-double-left"></i>
                            <i class="bi bi-chevron-left"></i>
                        </div>
                        <div class="select">
                        </div>
                        <div class="next">
                            <i class="bi bi-chevron-right"></i>
                            <i class="bi bi-chevron-double-right"></i>
                        </div>
                    </div>
                    <% if (cfg.type == "date") { %>
                    <ul class="days">
                        <%_.each(days, function(day) {%>
                            <li><%=day%></li>
                        <% }); %>
                    </ul>
                    <% } %>
                </div>
                <div class="body">
                </div>
                <div class="footer">
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-<%=cfg.class%>" back><%=cfg.btns.back.label%></button>
                        <button type="button" class="btn btn-<%=cfg.class%>" clear><%=cfg.btns.clear.label%></button>
                        <button type="button" class="btn btn-<%=cfg.class%>" confirm><%=cfg.btns.confirm.label%></button>
                    </div>
                </div>
            </div>
        `,J="object"==typeof E.scope[0]?E.scope[0]:new Date(E.scope[0]),S="object"==typeof E.scope[1]?E.scope[1]:new Date(E.scope[1]),P=E.format;O.attr("readonly",!0),O.css("background-color","#fff"),O.on("click",function(){0==_(this).next(".datepicker[id]").length&&(a=function(){var c=new Date,n=c,e=[],f=E.week.firstDay;"date"==E.type&&(e=E.week.days,0<f&&(r=e.slice(0,f),e=e.slice(f).concat(r)));var t="dp"+(new Date).getTime(),a=_(B.template(I)({id:t,cfg:E,days:e}));O.after(a),a.on("click",function(e){e.stopPropagation()});var u,d,m=a.find(".body"),v=a.find(".days"),l=a.find(".select"),i=a.find("i.bi-chevron-double-left"),Y=a.find("i.bi-chevron-left"),o=a.find("i.bi-chevron-double-right"),g=a.find("i.bi-chevron-right"),r=a.find("button[back]"),e=a.find("button[clear]"),s=a.find("button[confirm]"),h=_(B.template('<span value="<%=value%>"><%=year%></span>')({value:c.getFullYear(),year:N(c).format(E.year.format)})),p=_(B.template('<span value="<%=value%>"><%=month%></span>')({value:c.getMonth(),month:N(c).format(E.month.format)})),b={values:["month","year","years"],month:T,year:x,years:j};function y(){return m.find("ul").attr("class")}var D=[];function M(e,t){e.addClass("selected").addClass("bg-"+E.class),t&&e.addClass(t),E.range||E.multiple||(n=c)}function k(e){var n=s.css("background-color"),l=n.replace(")",", 0.2)");_.each(e.find("li"),function(e,t){var a=_(t).attr("value");a&&u<a&&a<d&&_(t).css("color",n).css("background-color",l)})}function w(a){_.each(a,function(e,t){0<e&&(a.eq(e-1).hasClass("selected")?_(t).addClass("right"):_(t).removeClass("right")),e<a.length-1&&(a.eq(e+1).hasClass("selected")?_(t).addClass("left"):_(t).removeClass("left"))})}function C(e,t){n=new Date(n.getFullYear()+e,n.getMonth()+t,n.getDate()),b[y()](n.getFullYear(),n.getMonth()),F(n)}function z(){var e=b.values.indexOf(y());0<e&&(b[b.values[--e]](c.getFullYear(),c.getMonth()),F(c))}function F(e){"years"!=y()&&(h.text(N(e).format(E.year.format)),h.attr("value",e.getFullYear()),p.text(N(e).format(E.month.format)),p.attr("value",e.getMonth()))}function T(e,t){m.html("");for(var a=new Date(e,t,1),n=new Date(e,t+1,0),l=a.getDay()-f,i=_(B.template(`
                    <ul class="month">
                        <% for (var i = 1;i <= lastDate;i ++) { 
                            var date = new Date(year, month, i);
                            var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                            var selected = false;
                            if (!cfg.range && !cfg.multiple && current.getTime() == date.getTime()) {
                                selected = true;
                            }

                            var clazz = "";
                            if (disabled) {
                                clazz = "disabled";
                            } else if (selected) {
                                clazz = "selected bg-" + cfg.class;
                            }
                        %>
                            <li value="<%=moment(date).format('YYYYMMDD')%>"<% if (clazz) { %> class="<%=clazz%>"<% } %>><%=i%></li>
                        <% } %>
                        <div class="bg"><%=month + 1%></div>
                    </ul>
                `)({current:new Date(c.getFullYear(),c.getMonth(),c.getDate()),from:J,to:S,year:e,month:t,moment:N,lastDate:n.getDate(),cfg:E})),o=1;o<=l;o++){var r=_("<li></li>");i.prepend(r)}m.append(i),p.show(),v.show(),Y.show(),g.show();var s=i.find("li[value]:not(.disabled)");E.range?(M(i.find("li[value='"+u+"']"),"begin"),M(i.find("li[value='"+d+"']"),"end"),k(i)):E.multiple&&(D.forEach(function(a){_.each(s,function(e,t){_(t).attr("value")==a&&M(_(t))})}),w(s)),s.on("click",function(){var e,t=new Date(parseInt(h.attr("value")),parseInt(p.attr("value")),N(_(this).attr("value"),"YYYYMMDD").toDate().getDate());E.range?!u&&!d||u&&d||_(this).attr("value")<=u?(s.removeClass(),s.removeAttr("style"),u=N(t).format("YYYYMMDD"),d=null,M(_(this),"begin")):(d=N(t).format("YYYYMMDD"),M(_(this),"end"),k(i)):E.multiple?(e=N(t).format("YYYYMMDD"),_(this).hasClass("selected")?(_(this).removeClass(),D.splice(D.indexOf(e),1)):(D.push(e),M(_(this))),w(s)):(s.removeClass(),c=t,M(_(this)))})}function x(e){m.html("");var a=_(B.template(`
                    <ul class="year">
                        <%_.each(cfg.month.months, function(month, i) { 
                            var date = new Date(year, i, 1);
                            var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                            var selected = false;
                            if (!cfg.range && !cfg.multiple && current.getTime() == date.getTime()) {
                                selected = true;
                            }
                            var clazz = "";
                            if (disabled) {
                                clazz = "disabled";
                            } else if (selected) {
                                clazz = "selected bg-" + cfg.class;
                            }
                        %>
                            <li value="<%=moment(date).format('YYYYMM')%>"<% if (clazz) { %> class="<%=clazz%>"<% } %>><%=month%></li>
                        <% }); %>
                    </ul>
                `)({current:new Date(c.getFullYear(),c.getMonth(),1),from:new Date(J.getFullYear(),J.getMonth(),1),to:new Date(S.getFullYear(),S.getMonth(),1),year:e,cfg:E,moment:N}));m.append(a),p.hide(),v.hide(),Y.hide(),g.hide();var n=a.find("li[value]:not(.disabled)");"month"==E.type&&(E.range?(M(a.find("li[value='"+u+"']"),"begin"),M(a.find("li[value='"+d+"']"),"end"),k(a)):E.multiple&&(D.forEach(function(a){_.each(n,function(e,t){_(t).attr("value")==a&&M(_(t))})}),w(n))),n.on("click",function(){var e,t=new Date(parseInt(h.attr("value")),N(_(this).attr("value"),"YYYYMM").toDate().getMonth(),1);"month"==E.type?E.range?!u&&!d||u&&d||_(this).attr("value")<=u?(n.removeClass(),n.removeAttr("style"),u=N(t).format("YYYYMM"),d=null,M(_(this),"begin")):(d=N(t).format("YYYYMM"),M(_(this),"end"),k(a)):E.multiple?(e=N(t).format("YYYYMM"),_(this).hasClass("selected")?(_(this).removeClass(),D.splice(D.indexOf(e),1)):(D.push(e),M(_(this))),w(n)):(n.removeClass(),c=t,M(_(this)),z()):(n.removeClass(),c=t,M(_(this)),z())})}function j(e){m.html("");var t=e-7,e=e+7,a=_(B.template(`
                    <ul class="years">
                        <% for (var i = begin;i <= end;i ++) {
                            var date = new Date(i, 0, 1);
                            var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                            var selected = false;
                            if (!cfg.range && !cfg.multiple && current.getTime() == date.getTime()) {
                                selected = true;
                            }
                            var clazz = "";
                            if (disabled) {
                                clazz = "disabled";
                            } else if (selected) {
                                clazz = "selected bg-" + cfg.class;
                            }
                        %>
                            <li value="<%=moment(date).format('YYYY')%>"<% if (clazz) { %> class="<%=clazz%>"<% } %>><%=moment(date).format(cfg.year.format)%></li>
                        <% } %>
                    </ul>
                `)({current:new Date(c.getFullYear(),0,1),from:new Date(J.getFullYear(),0,1),to:new Date(S.getFullYear(),0,1),begin:t,end:e,cfg:E,moment:N}));m.append(a),h.text(t+" - "+e),p.hide(),v.hide(),Y.hide(),g.hide();var n=a.find("li[value]:not(.disabled)");"year"==E.type&&(E.range?(M(a.find("li[value='"+u+"']"),"begin"),M(a.find("li[value='"+d+"']"),"end"),k(a)):E.multiple&&(D.forEach(function(a){_.each(n,function(e,t){_(t).attr("value")==a&&M(_(t))})}),w(n))),n.on("click",function(){var e,t=new Date(N(_(this).attr("value"),"YYYY").toDate().getFullYear(),0,1);"year"==E.type?E.range?!u&&!d||u&&d||_(this).attr("value")<=u?(n.removeClass(),n.removeAttr("style"),u=N(t).format("YYYY"),d=null,M(_(this),"begin")):(d=N(t).format("YYYY"),M(_(this),"end"),k(a)):E.multiple?(e=N(t).format("YYYY"),_(this).hasClass("selected")?(_(this).removeClass(),D.splice(D.indexOf(e),1)):(D.push(e),M(_(this))),w(n)):(n.removeClass(),c=t,M(_(this)),z()):(n.removeClass(),c=t,M(_(this)),z())})}function A(t){var e;function a(e){return N(N(e,P).toDate()).format(t)}0<O.val().length&&(c=E.range?(e=O.val().split(" - "),u=a(e[0]),d=a(e[1]),N(e[0],P).toDate()):E.multiple?(e=O.val().split(","),D=[],e.forEach(function(e){D.push(a(e))}),N(e[0],P).toDate()):N(O.val(),P).toDate(),n=c),F(n)}i.on("click",function(){"years"==y()?C(-15,0):C(-1,0)}),o.on("click",function(){"years"==y()?C(15,0):C(1,0)}),Y.on("click",function(){C(0,-1)}),g.on("click",function(){C(0,1)}),h.on("click",function(){j(n.getFullYear())}),p.on("click",function(){x(n.getFullYear())}),r.on("click",function(){n=c,z()}),e.on("click",function(){O.val(""),D=[],a.find("ul li").removeClass(),a.find("ul li").removeAttr("style"),E.btns.clear.onClear(),q()}),s.on("click",function(){var t,a,n;if("date"==E.type?t="YYYYMMDD":"month"==E.type?t="YYYYMM":"year"==E.type&&(t="YYYY"),E.range){if(!u||!d)return;var e=N(u,t).toDate(),l=N(d,t).toDate();E.btns.confirm.onConfirm([e,l]),O.val(N(e).format(P)+" - "+N(l).format(P))}else E.multiple?(a=[],n=[],(D=D.sort()).forEach(function(e){e=N(e,t).toDate();a.push(e),n.push(N(e).format(P))}),E.btns.confirm.onConfirm(a),O.val(n.join(","))):(E.btns.confirm.onConfirm(c),O.val(N(c).format(P)));q()}),"date"==E.type?(P=P||"YYYY-MM-DD",A("YYYYMMDD"),l.append(h).append(p),T(c.getFullYear(),c.getMonth())):"month"==E.type?(P=P||"YYYY-MM",b.values=["year","years"],A("YYYYMM"),l.append(h),x(c.getFullYear())):"year"==E.type&&(P=P||"YYYY",b.values=["years"],A("YYYY"),l.append(h),j(c.getFullYear()));function q(){a.remove()}return{id:function(){return t},close:function(){q()}}}()),_.each(_(".datepicker[id]"),function(e,t){_(t).attr("id")!=a.id()&&_(t).remove()})}),_("body").on("click",function(){a&&a.close()}),O.on("click",function(e){e.stopPropagation()})}});
//# sourceMappingURL=jquery.prac.com.datepicker.js.map