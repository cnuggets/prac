!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment","clipboard"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(V,D,e,C,E){V.fn.crontab=function(t){var c=V(this);t=t||{};t=V.extend(!0,{},{lang:"en",nextRun:{disabled:!1,max:5}},t);var e={en:{part:{min:"Mniute",hour:"Hour",dayOfMonth:"Day(Month)",month:"Month",dayOfWeek:"Day(Week)"},nextRun:{next:"next at",more:"more"},tip:{anyValue:"any value",valueListSeparator:"value list separator",rangeOfValues:"range of values",stepValue:"step values",allowedValues:"allowed values",allowedValuesAlternative:"allowed values alternative"}},zh:{part:{min:"分",hour:"时",dayOfMonth:"天(月)",month:"月",dayOfWeek:"天(周)"},nextRun:{next:"下次执行时间：",more:"更多"},tip:{anyValue:"任意值",valueListSeparator:"值列表",rangeOfValues:"范围",stepValue:"步长",allowedValues:"允许值",allowedValuesAlternative:"允许值替代方案"}}};var h={minute:{allowedValues:{begin:0,end:59,text:"0-59",valuesExpr:"([0-9]|[1-5][0-9])",expr:""}},hour:{allowedValues:{begin:0,end:23,text:"0-23",valuesExpr:"([0-9]|1[0-9]|[2][0-3])",expr:""}},"day-of-month":{allowedValues:{begin:1,end:31,text:"1-31",valuesExpr:"([1-9]|[1-2][0-9]|[3][0-1])",expr:""}},month:{allowedValues:{begin:1,end:12,text:"1-12",valuesExpr:"([1-9]|1[0-2])",expr:""},allowedValuesAlternative:{begin:"Jan",end:"Dec",text:"JAN-DEC",valuesExpr:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)",expr:""}},"day-of-week":{allowedValues:{begin:0,end:6,text:"0-6",valuesExpr:"([0-6])",expr:""},allowedValuesAlternative:{begin:"Sun",end:"Sat",text:"SUN-SAT",valuesExpr:"(Sun|Mon|Tue|Wed|Thu|Fri|Sta)",expr:""}}},m={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12,sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sta:6};function a(e,a){var t;e&&(t=e.valuesExpr,e.expr=D.template(a)({values:t,any:d,fromTo:"("+t+"\\-"+t+")",step:"(\\*/"+(a=0==(a=t).indexOf("([0-")?"([1-"+a.split("([0-")[1]:a)+")",list:"("+t+"((\\,"+t+"))+)"}))}var n="";c.hasClass("form-control-sm")?n="sm":c.hasClass("form-control-lg")&&(n="lg");var x=V(D.template(`
            <div class="crontab">
                <div class="op">
                    <div class="expression">
                        <div class="input<% if (size) { %> input-<%=size%><% } %>">
                            <input type="text" name="minute">
                            <input type="text" name="hour">
                            <input type="text" name="day-of-month">
                            <input type="text" name="month">
                            <input type="text" name="day-of-week">
                        </div>
                        <div class="part">
                            <label name="minute"><%=labels.part.min%></label>
                            <label name="hour"><%=labels.part.hour%></label>
                            <label name="day-of-month"><%=labels.part.dayOfMonth%></label>
                            <label name="month"><%=labels.part.month%></label>
                            <label name="day-of-week"><%=labels.part.dayOfWeek%></label>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="copy" copy-to-clipboard>
                        <i class="bi bi-stickies"></i>
                    </a>
                </div>
                <% if (!nextRun.disabled) { %>
                    <div class="next-run">
                        <label><%=labels.nextRun.next%></label>
                        <div class="list">
                            <div class="next">
                                <div></div>
                                <a href="javascript:void(0)" class="more"><%=labels.nextRun.more%></a>
                            </div>
                            <ul class="then">
                            </ul>
                        </div>
                    </div>
                <% } %>
            </div>
        `)({size:n,labels:e[t.lang],nextRun:t.nextRun})),l=c.val(),r=x.find(".next-run .next div"),o=x.find(".next-run .then"),u=x.find(".next-run .more");function s(i){if(0<c.val().length){var r=new Date,o={minute:[],hour:[],"day-of-month":[],month:[],"day-of-week":[],year:[]},e=x.find("input[name='day-of-month']").val(),a=x.find("input[name='day-of-week']").val(),t=x.find("input[name='month']").val(),n="*"!=a&&"*"==e,u="*"==t;V.each(x.find("input"),function(e,a){var t=V(a).attr("name"),n=V(a).val(),a=h[t].allowedValues;o[t]=function(e,a,t,n){var l=t-a+1,s=[];if("*"==e){if(!n)for(var i=0;i<l;i++)s.push(a+i)}else if(0<e.indexOf("-")){var r=e.split("-"),o=isNaN(r[0])?m[r[0].toLowerCase()]:parseInt(r[0]),u=isNaN(r[1])?m[r[1].toLowerCase()]:parseInt(r[1]);if(n)for(;s.length<l+t+1;)for(i=o;i<=u;i++)s.push(i);else for(i=o;i<=u;i++)s.push(i)}else if(0<e.indexOf(","))if(n)for(;s.length<l+t+1;)e.split(",").forEach(function(e){e=isNaN(e)?m[e.toLowerCase()]:parseInt(e);s.push(e)});else e.split(",").forEach(function(e){e=isNaN(e)?m[e.toLowerCase()]:parseInt(e);s.push(e)});else if(0==e.indexOf("*/")){var d=parseInt(e.split("/")[1]),v=a+d;t<v&&(v=a);for(i=0;i<l+t+1;i++)t<v&&(v=a),s.push(v),v+=d}else{var f=isNaN(e)?m[e.toLowerCase()]:parseInt(e);if(n)for(;s.length<l+t+1;)s.push(f);else s.push(f)}return s}(n,a.begin,a.end,"day-of-week"==t)});for(var l=r.getFullYear(),s=0;s<=i;s++)o.year.push(l+s);var d,v,f={},p={};for(e in o.year.forEach(function(s){d&&v||o.month.forEach(function(l){var a;d&&v||((a=new Date(r.getTime())).setFullYear(s),a.setMonth(l-1),(l-1>r.getMonth()||s>r.getFullYear())&&a.setDate(1),a.setDate(a.getDate()-(a.getDay()-6+7)),o["day-of-week"].forEach(function(e){var n=new Date(a.getTime()),e=(e+7-n.getDay())%7;0==e&&(e=7),n.setDate(n.getDate()+e),o.hour.forEach(function(t){d||o.minute.forEach(function(e){var a=new Date(n.getTime());a.setHours(t),a.setMinutes(e),a.setSeconds(0),a.getTime()>r.getTime()&&(u||a.getMonth()==l-1)&&(f[C(a).format("YYYY-MM-DD HH:mm:ss")]=""),Object.keys(f).length>=i&&(d=!0)})}),a=new Date(n.getTime())}),n?v=!0:o["day-of-month"].forEach(function(n){v||o.hour.forEach(function(t){v||o.minute.forEach(function(e){var a=new Date(r.getTime());a.setFullYear(s),a.setMonth(l-1),a.setDate(n),a.setHours(t),a.setMinutes(e),a.setSeconds(0),a.getTime()>r.getTime()&&(p[C(a).format("YYYY-MM-DD HH:mm:ss")]=""),Object.keys(p).length>=i&&(v=!0)})})}))})}),p)f[e]="";t=Object.keys(f);return t.sort(function(e,a){return new Date(e).getTime()-new Date(a).getTime()}),t}return[]}c.hide(),c.after(x),t.nextRun.disabled||u.on("click",function(){0<o.find("li").length&&o.show()}),new E("[copy-to-clipboard]",{container:x.get(0),text:function(e){return console.log(V(e).closest(".crontab").prev("input").val()),V(e).closest(".crontab").prev("input").val()}});var i,d="(\\*)";for(i in h){var v=h[i];a(v.allowedValues,"^(<%=values%>|<%=any%>|<%=fromTo%>|<%=step%>|<%=list%>)$"),a(v.allowedValuesAlternative,"^(<%=values%>|<%=any%>|<%=fromTo%>|<%=list%>)$");var f=x.find("input[name='"+i+"']");f.tooltip({placement:"top",title:D.template(`
            <ul class="crontab-tip">
                <li>
                    <div class="value">*</div>
                    <div class="desc"><%=labels.tip.anyValue%></div>
                </li>
                <li>
                    <div class="value">,</div>
                    <div class="desc"><%=labels.tip.valueListSeparator%></div>
                </li>
                <li>
                    <div class="value">-</div>
                    <div class="desc"><%=labels.tip.rangeOfValues%></div>
                </li>
                <li>
                    <div class="value">/</div>
                    <div class="desc"><%=labels.tip.stepValue%></div>
                </li>
                <li>
                    <div class="value"><%=part.allowedValues.text%></div>
                    <div class="desc"><%=labels.tip.allowedValues%></div>
                </li>
                <% if (part.allowedValuesAlternative) { %>
                <li>
                    <div class="value"><%=part.allowedValuesAlternative.text%></div>
                    <div class="desc"><%=labels.tip.allowedValuesAlternative%></div>
                </li>
                <% } %>
            </ul>
        `)({labels:e[t.lang],part:v}),html:!0,trigger:"focus"});var p,g=[[48,57],[96,105]],b=[8,9,13,16,37,39,46,56,188,189,191];function w(e,a,t){if(0<=a.indexOf(t))return 1;for(var n=0;n<e.length;n++){var l=e[n];if(t>=l[0]&&t<=l[1])return 1}}function y(e){var a=e.attr("name"),t=e.val(),n=h[a].allowedValues.expr;h[a].allowedValuesAlternative&&(n+="|"+h[a].allowedValuesAlternative.expr);var l,s,n=new RegExp(n,"i"),a=x.find(".part label[name='"+a+"']");if(t.match(n)){if(a.removeClass("text-danger").addClass("text-success"),0<t.indexOf(",")?(l={},t.split(",").forEach(function(e){l[e]=""}),(s=Object.keys(l)).sort(function(e,a){return isNaN(e)?m[e.toLowerCase()]-m[a.toLowerCase()]:e-a}),e.val(s.join(","))):0<t.indexOf("-")&&(n=t.split("-"),s=isNaN(n[0])?m[n[0].toLowerCase()]:parseInt(n[0]),(t=isNaN(n[1])?m[n[1].toLowerCase()]:parseInt(n[1]))<s?e.val(n[1]+"-"+n[0]):s==t&&e.val(n[0])),e.removeClass("text-danger"),0==x.find(".part label.text-danger").length){x.find(".input").removeClass("is-invalid");var i=[];return V.each(x.find("input"),function(e,a){i.push(V(a).val())}),c.val(i.join(" ")).change(),1}}else e.addClass("text-danger"),x.find(".input").addClass("is-invalid"),a.removeClass("text-success").addClass("text-danger"),c.val("").change(),r.html(""),o.html(""),o.hide(),u.hide()}f.on("keydown",function(e){var a=V(this).attr("name");h[a].allowedValuesAlternative?w(g.concat([[65,90]]),b,e.keyCode)||e.preventDefault():w(g,b,e.keyCode)||e.preventDefault()}),f.on("change",function(){var e;y(V(this))&&(t.nextRun.disabled||(e=s(t.nextRun.max),o.html(""),u.show(),e.forEach(function(e,a){a>=t.nextRun.max||(0==a?r.text(e):((a=V("<li></li>")).text(e),o.append(a)))})))}),l&&(p=l.split(" "),V.each(x.find("input"),function(e,a){e==p.length-1?V(a).val(p[e]).change():(V(a).val(p[e]),y(V(a)))}))}}});
//# sourceMappingURL=jquery.prac.com.crontab.js.map