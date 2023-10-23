!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(B,N,e,Q){B.fn.datepicker=function(O){var I=B(this);O=O||{};var e=new Date,t={en:{btns:{back:{label:"Back"},clear:{label:"Clear"},confirm:{label:"Confirm"}},week:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},month:{months:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],format:"MM"},year:{format:"YYYY"}},zh:{btns:{back:{label:"返回"},clear:{label:"清空"},confirm:{label:"确认"}},week:{days:["日","一","二","三","四","五","六"]},month:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],format:"MM月"},year:{format:"YYYY年"}}},e={lang:"en",type:"date",class:"danger",range:!1,multiple:!1,btns:{clear:{onClear:function(){}},confirm:{onConfirm:function(){}}},week:{firstDay:0},month:{format:"MM"},year:{format:"YYYY"},scope:[new Date(1970,0,1),new Date(e.getFullYear()+50,11,31)]},t=t[O.lang]||t.en;O=B.extend(!0,{},e,t,O);var a,J=`
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
        `,S="object"==typeof O.scope[0]?O.scope[0]:new Date(O.scope[0]),P="object"==typeof O.scope[1]?O.scope[1]:new Date(O.scope[1]),_=O.format;I.attr("readonly",!0),I.css("background-color","#fff"),I.on("click",function(){0==B(this).next(".datepicker[id]").length&&(a=function(){var c=new Date,n=c,e=[],f=O.week.firstDay;"date"==O.type&&(e=O.week.days,0<f&&(s=e.slice(0,f),e=e.slice(f).concat(s)));var t="dp"+(new Date).getTime(),a=B(N.template(J)({id:t,cfg:O,days:e}));if(I.after(a),O.position)for(var l in O.position)a.css(l,O.position[l]);a.on("click",function(e){e.stopPropagation()});var u,d,m=a.find(".body"),v=a.find(".days"),i=a.find(".select"),o=a.find("i.bi-chevron-double-left"),Y=a.find("i.bi-chevron-left"),r=a.find("i.bi-chevron-double-right"),g=a.find("i.bi-chevron-right"),s=a.find("button[back]"),e=a.find("button[clear]"),h=a.find("button[confirm]"),p=B(N.template('<span value="<%=value%>"><%=year%></span>')({value:c.getFullYear(),year:Q(c).format(O.year.format)})),b=B(N.template('<span value="<%=value%>"><%=month%></span>')({value:c.getMonth(),month:Q(c).format(O.month.format)})),y={values:["month","year","years"],month:x,year:j,years:A};function D(){return m.find("ul").attr("class")}var M=[];function k(e,t){e.addClass("selected").addClass("bg-"+O.class),t&&e.addClass(t),O.range||O.multiple||(n=c)}function w(e){var n=h.css("background-color"),l=n.replace(")",", 0.2)");B.each(e.find("li"),function(e,t){var a=B(t).attr("value");a&&u<a&&a<d&&B(t).css("color",n).css("background-color",l)})}function C(a){B.each(a,function(e,t){0<e&&(a.eq(e-1).hasClass("selected")?B(t).addClass("right"):B(t).removeClass("right")),e<a.length-1&&(a.eq(e+1).hasClass("selected")?B(t).addClass("left"):B(t).removeClass("left"))})}function z(e,t){n=new Date(n.getFullYear()+e,n.getMonth()+t,n.getDate()),y[D()](n.getFullYear(),n.getMonth()),T(n)}function F(){var e=y.values.indexOf(D());0<e&&(y[y.values[--e]](c.getFullYear(),c.getMonth()),T(c))}function T(e){"years"!=D()&&(p.text(Q(e).format(O.year.format)),p.attr("value",e.getFullYear()),b.text(Q(e).format(O.month.format)),b.attr("value",e.getMonth()))}function x(e,t){m.html("");for(var a=new Date(e,t,1),n=new Date(e,t+1,0),l=a.getDay()-f,i=B(N.template(`
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
                `)({current:new Date(c.getFullYear(),c.getMonth(),c.getDate()),from:S,to:P,year:e,month:t,moment:Q,lastDate:n.getDate(),cfg:O})),o=1;o<=l;o++){var r=B("<li></li>");i.prepend(r)}m.append(i),b.show(),v.show(),Y.show(),g.show();var s=i.find("li[value]:not(.disabled)");O.range?(k(i.find("li[value='"+u+"']"),"begin"),k(i.find("li[value='"+d+"']"),"end"),w(i)):O.multiple&&(M.forEach(function(a){B.each(s,function(e,t){B(t).attr("value")==a&&k(B(t))})}),C(s)),s.on("click",function(){var e,t=new Date(parseInt(p.attr("value")),parseInt(b.attr("value")),Q(B(this).attr("value"),"YYYYMMDD").toDate().getDate());O.range?!u&&!d||u&&d||B(this).attr("value")<=u?(s.removeClass(),s.removeAttr("style"),u=Q(t).format("YYYYMMDD"),d=null,k(B(this),"begin")):(d=Q(t).format("YYYYMMDD"),k(B(this),"end"),w(i)):O.multiple?(e=Q(t).format("YYYYMMDD"),B(this).hasClass("selected")?(B(this).removeClass(),M.splice(M.indexOf(e),1)):(M.push(e),k(B(this))),C(s)):(s.removeClass(),c=t,k(B(this)))})}function j(e){m.html("");var a=B(N.template(`
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
                `)({current:new Date(c.getFullYear(),c.getMonth(),1),from:new Date(S.getFullYear(),S.getMonth(),1),to:new Date(P.getFullYear(),P.getMonth(),1),year:e,cfg:O,moment:Q}));m.append(a),b.hide(),v.hide(),Y.hide(),g.hide();var n=a.find("li[value]:not(.disabled)");"month"==O.type&&(O.range?(k(a.find("li[value='"+u+"']"),"begin"),k(a.find("li[value='"+d+"']"),"end"),w(a)):O.multiple&&(M.forEach(function(a){B.each(n,function(e,t){B(t).attr("value")==a&&k(B(t))})}),C(n))),n.on("click",function(){var e,t=new Date(parseInt(p.attr("value")),Q(B(this).attr("value"),"YYYYMM").toDate().getMonth(),1);"month"==O.type?O.range?!u&&!d||u&&d||B(this).attr("value")<=u?(n.removeClass(),n.removeAttr("style"),u=Q(t).format("YYYYMM"),d=null,k(B(this),"begin")):(d=Q(t).format("YYYYMM"),k(B(this),"end"),w(a)):O.multiple?(e=Q(t).format("YYYYMM"),B(this).hasClass("selected")?(B(this).removeClass(),M.splice(M.indexOf(e),1)):(M.push(e),k(B(this))),C(n)):(n.removeClass(),c=t,k(B(this)),F()):(n.removeClass(),c=t,k(B(this)),F())})}function A(e){m.html("");var t=e-7,e=e+7,a=B(N.template(`
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
                `)({current:new Date(c.getFullYear(),0,1),from:new Date(S.getFullYear(),0,1),to:new Date(P.getFullYear(),0,1),begin:t,end:e,cfg:O,moment:Q}));m.append(a),p.text(t+" - "+e),b.hide(),v.hide(),Y.hide(),g.hide();var n=a.find("li[value]:not(.disabled)");"year"==O.type&&(O.range?(k(a.find("li[value='"+u+"']"),"begin"),k(a.find("li[value='"+d+"']"),"end"),w(a)):O.multiple&&(M.forEach(function(a){B.each(n,function(e,t){B(t).attr("value")==a&&k(B(t))})}),C(n))),n.on("click",function(){var e,t=new Date(Q(B(this).attr("value"),"YYYY").toDate().getFullYear(),0,1);"year"==O.type?O.range?!u&&!d||u&&d||B(this).attr("value")<=u?(n.removeClass(),n.removeAttr("style"),u=Q(t).format("YYYY"),d=null,k(B(this),"begin")):(d=Q(t).format("YYYY"),k(B(this),"end"),w(a)):O.multiple?(e=Q(t).format("YYYY"),B(this).hasClass("selected")?(B(this).removeClass(),M.splice(M.indexOf(e),1)):(M.push(e),k(B(this))),C(n)):(n.removeClass(),c=t,k(B(this)),F()):(n.removeClass(),c=t,k(B(this)),F())})}function q(t){var e;function a(e){return Q(Q(e,_).toDate()).format(t)}0<I.val().length&&(c=O.range?(e=I.val().split(" - "),u=a(e[0]),d=a(e[1]),Q(e[0],_).toDate()):O.multiple?(e=I.val().split(","),M=[],e.forEach(function(e){M.push(a(e))}),Q(e[0],_).toDate()):Q(I.val(),_).toDate(),n=c),T(n)}o.on("click",function(){"years"==D()?z(-15,0):z(-1,0)}),r.on("click",function(){"years"==D()?z(15,0):z(1,0)}),Y.on("click",function(){z(0,-1)}),g.on("click",function(){z(0,1)}),p.on("click",function(){A(n.getFullYear())}),b.on("click",function(){j(n.getFullYear())}),s.on("click",function(){n=c,F()}),e.on("click",function(){I.val(""),M=[],a.find("ul li").removeClass(),a.find("ul li").removeAttr("style"),O.btns.clear.onClear(),E()}),h.on("click",function(){var t,a,n;if("date"==O.type?t="YYYYMMDD":"month"==O.type?t="YYYYMM":"year"==O.type&&(t="YYYY"),O.range){if(!u||!d)return;var e=Q(u,t).toDate(),l=Q(d,t).toDate();O.btns.confirm.onConfirm([e,l]),I.val(Q(e).format(_)+" - "+Q(l).format(_))}else O.multiple?(a=[],n=[],(M=M.sort()).forEach(function(e){e=Q(e,t).toDate();a.push(e),n.push(Q(e).format(_))}),O.btns.confirm.onConfirm(a),I.val(n.join(","))):(O.btns.confirm.onConfirm(c),I.val(Q(c).format(_)));E()}),"date"==O.type?(_=_||"YYYY-MM-DD",q("YYYYMMDD"),i.append(p).append(b),x(c.getFullYear(),c.getMonth())):"month"==O.type?(_=_||"YYYY-MM",y.values=["year","years"],q("YYYYMM"),i.append(p),j(c.getFullYear())):"year"==O.type&&(_=_||"YYYY",y.values=["years"],q("YYYY"),i.append(p),A(c.getFullYear()));function E(){a.remove()}return{id:function(){return t},close:function(){E()}}}()),B.each(B(".datepicker[id]"),function(e,t){B(t).attr("id")!=a.id()&&B(t).remove()})}),B("body").on("click",function(){a&&a.close()}),I.on("click",function(e){e.stopPropagation()})}});
//# sourceMappingURL=jquery.prac.com.datepicker.js.map