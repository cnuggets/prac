!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(_,B,e,N){_.fn.datepicker=function(q){var E=_(this);q=q||{};var e=new Date,e={type:"date",class:"danger",range:!1,multiple:!1,btns:{back:{label:"Back"},clear:{label:"Clear",onClear:function(){}},confirm:{label:"Confirm",onConfirm:function(){}}},week:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDay:0},month:{months:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],format:"MM"},year:{format:"YYYY"},scope:[new Date(1970,0,1),new Date(e.getFullYear()+50,11,31)]};q=_.extend(!0,{},e,q);var O,t,I=`
            <div class="datepicker" style="position: absolute;">
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
        `,J="object"==typeof q.scope[0]?q.scope[0]:new Date(q.scope[0]),S="object"==typeof q.scope[1]?q.scope[1]:new Date(q.scope[1]),P=q.format;E.attr("readonly",!0),E.css("background-color","#fff"),E.on("click",function(){O||(t=function(){O=!0;var c=new Date,l=c,e=[],f=q.week.firstDay;"date"==q.type&&(e=q.week.days,0<f&&(o=e.slice(0,f),e=e.slice(f).concat(o)));var t=_(B.template(I)({cfg:q,days:e}));E.after(t),t.on("click",function(e){e.stopPropagation()});var u,d,m=t.find(".body"),v=t.find(".days"),a=t.find(".select"),n=t.find("i.bi-chevron-double-left"),Y=t.find("i.bi-chevron-left"),i=t.find("i.bi-chevron-double-right"),g=t.find("i.bi-chevron-right"),o=t.find("button[back]"),e=t.find("button[clear]"),r=t.find("button[confirm]"),h=_(B.template('<span value="<%=value%>"><%=year%></span>')({value:c.getFullYear(),year:N(c).format(q.year.format)})),p=_(B.template('<span value="<%=value%>"><%=month%></span>')({value:c.getMonth(),month:N(c).format(q.month.format)})),s={values:["month","year","years"],month:F,year:T,years:x};function b(){return m.find("ul").attr("class")}var y=[];function D(e,t){e.addClass("selected").addClass("bg-"+q.class),t&&e.addClass(t),q.range||q.multiple||(l=c)}function M(e){var l=r.css("background-color"),n=l.replace(")",", 0.2)");_.each(e.find("li"),function(e,t){var a=_(t).attr("value");a&&u<a&&a<d&&_(t).css("color",l).css("background-color",n)})}function C(a){_.each(a,function(e,t){0<e&&(a.eq(e-1).hasClass("selected")?_(t).addClass("right"):_(t).removeClass("right")),e<a.length-1&&(a.eq(e+1).hasClass("selected")?_(t).addClass("left"):_(t).removeClass("left"))})}function z(e,t){l=new Date(l.getFullYear()+e,l.getMonth()+t,l.getDate()),s[b()](l.getFullYear(),l.getMonth()),w(l)}function k(){var e=s.values.indexOf(b());0<e&&(s[s.values[--e]](c.getFullYear(),c.getMonth()),w(c))}function w(e){"years"!=b()&&(h.text(N(e).format(q.year.format)),h.attr("value",e.getFullYear()),p.text(N(e).format(q.month.format)),p.attr("value",e.getMonth()))}function F(e,t){m.html("");for(var a=new Date(e,t,1),l=new Date(e,t+1,0),n=a.getDay()-f,i=_(B.template(`
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
                `)({current:new Date(c.getFullYear(),c.getMonth(),c.getDate()),from:J,to:S,year:e,month:t,moment:N,lastDate:l.getDate(),cfg:q})),o=1;o<=n;o++){var r=_("<li></li>");i.prepend(r)}m.append(i),p.show(),v.show(),Y.show(),g.show();var s=i.find("li[value]:not(.disabled)");q.range?(D(i.find("li[value='"+u+"']"),"begin"),D(i.find("li[value='"+d+"']"),"end"),M(i)):q.multiple&&(y.forEach(function(a){_.each(s,function(e,t){_(t).attr("value")==a&&D(_(t))})}),C(s)),s.on("click",function(){var e,t=new Date(parseInt(h.attr("value")),parseInt(p.attr("value")),N(_(this).attr("value"),"YYYYMMDD").toDate().getDate());q.range?!u&&!d||u&&d||_(this).attr("value")<=u?(s.removeClass(),s.removeAttr("style"),u=N(t).format("YYYYMMDD"),d=null,D(_(this),"begin")):(d=N(t).format("YYYYMMDD"),D(_(this),"end"),M(i)):q.multiple?(e=N(t).format("YYYYMMDD"),_(this).hasClass("selected")?(_(this).removeClass(),y.splice(y.indexOf(e),1)):(y.push(e),D(_(this))),C(s)):(s.removeClass(),c=t,D(_(this)))})}function T(e){m.html("");var a=_(B.template(`
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
                `)({current:new Date(c.getFullYear(),c.getMonth(),1),from:new Date(J.getFullYear(),J.getMonth(),1),to:new Date(S.getFullYear(),S.getMonth(),1),year:e,cfg:q,moment:N}));m.append(a),p.hide(),v.hide(),Y.hide(),g.hide();var l=a.find("li[value]:not(.disabled)");"month"==q.type&&(q.range?(D(a.find("li[value='"+u+"']"),"begin"),D(a.find("li[value='"+d+"']"),"end"),M(a)):q.multiple&&(y.forEach(function(a){_.each(l,function(e,t){_(t).attr("value")==a&&D(_(t))})}),C(l))),l.on("click",function(){var e,t=new Date(parseInt(h.attr("value")),N(_(this).attr("value"),"YYYYMM").toDate().getMonth(),1);"month"==q.type?q.range?!u&&!d||u&&d||_(this).attr("value")<=u?(l.removeClass(),l.removeAttr("style"),u=N(t).format("YYYYMM"),d=null,D(_(this),"begin")):(d=N(t).format("YYYYMM"),D(_(this),"end"),M(a)):q.multiple?(e=N(t).format("YYYYMM"),_(this).hasClass("selected")?(_(this).removeClass(),y.splice(y.indexOf(e),1)):(y.push(e),D(_(this))),C(l)):(l.removeClass(),c=t,D(_(this)),k()):(l.removeClass(),c=t,D(_(this)),k())})}function x(e){m.html("");var t=e-7,e=e+7,a=_(B.template(`
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
                `)({current:new Date(c.getFullYear(),0,1),from:new Date(J.getFullYear(),0,1),to:new Date(S.getFullYear(),0,1),begin:t,end:e,cfg:q,moment:N}));m.append(a),h.text(t+" - "+e),p.hide(),v.hide(),Y.hide(),g.hide();var l=a.find("li[value]:not(.disabled)");"year"==q.type&&(q.range?(D(a.find("li[value='"+u+"']"),"begin"),D(a.find("li[value='"+d+"']"),"end"),M(a)):q.multiple&&(y.forEach(function(a){_.each(l,function(e,t){_(t).attr("value")==a&&D(_(t))})}),C(l))),l.on("click",function(){var e,t=new Date(N(_(this).attr("value"),"YYYY").toDate().getFullYear(),0,1);"year"==q.type?q.range?!u&&!d||u&&d||_(this).attr("value")<=u?(l.removeClass(),l.removeAttr("style"),u=N(t).format("YYYY"),d=null,D(_(this),"begin")):(d=N(t).format("YYYY"),D(_(this),"end"),M(a)):q.multiple?(e=N(t).format("YYYY"),_(this).hasClass("selected")?(_(this).removeClass(),y.splice(y.indexOf(e),1)):(y.push(e),D(_(this))),C(l)):(l.removeClass(),c=t,D(_(this)),k()):(l.removeClass(),c=t,D(_(this)),k())})}function j(t){var e;function a(e){return N(N(e,P).toDate()).format(t)}0<E.val().length&&(c=q.range?(e=E.val().split(" - "),u=a(e[0]),d=a(e[1]),N(e[0],P).toDate()):q.multiple?(e=E.val().split(","),y=[],e.forEach(function(e){y.push(a(e))}),N(e[0],P).toDate()):N(E.val(),P).toDate(),l=c),w(l)}n.on("click",function(){"years"==b()?z(-15,0):z(-1,0)}),i.on("click",function(){"years"==b()?z(15,0):z(1,0)}),Y.on("click",function(){z(0,-1)}),g.on("click",function(){z(0,1)}),h.on("click",function(){x(l.getFullYear())}),p.on("click",function(){T(l.getFullYear())}),o.on("click",function(){l=c,k()}),e.on("click",function(){E.val(""),y=[],t.find("ul li.selected").removeClass(),t.find("ul li.selected").removeAttr("style"),q.btns.clear.onClear()}),r.on("click",function(){var t,a,l;if("date"==q.type?t="YYYYMMDD":"month"==q.type?t="YYYYMM":"year"==q.type&&(t="YYYY"),q.range){if(!u||!d)return;var e=N(u,t).toDate(),n=N(d,t).toDate();q.btns.confirm.onConfirm([e,n]),E.val(N(e).format(P)+" - "+N(n).format(P))}else q.multiple?(a=[],l=[],(y=y.sort()).forEach(function(e){e=N(e,t).toDate();a.push(e),l.push(N(e).format(P))}),q.btns.confirm.onConfirm(a),E.val(l.join(","))):(q.btns.confirm.onConfirm(c),E.val(N(c).format(P)));A()}),"date"==q.type?(P=P||"YYYY-MM-DD",j("YYYYMMDD"),a.append(h).append(p),F(c.getFullYear(),c.getMonth())):"month"==q.type?(P=P||"YYYY-MM",s.values=["year","years"],j("YYYYMM"),a.append(h),T(c.getFullYear())):"year"==q.type&&(P=P||"YYYY",s.values=["years"],j("YYYY"),a.append(h),x(c.getFullYear()));function A(){O=!1,t.remove()}return{close:function(){A()}}}())}),_("body").on("click",function(){O&&t.close()}),E.on("click",function(e){e.stopPropagation()})}});
//# sourceMappingURL=jquery.prac.com.datepicker.js.map