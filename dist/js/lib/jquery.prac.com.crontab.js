!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment","clipboard"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(g,b,e,w,y){function V(){var e,m=["minute","hour","day-of-month","month","day-of-week"],h={minute:{allowedValues:{begin:0,end:59,text:"0-59",valuesExpr:"([0-9]|[1-5][0-9])",expr:""}},hour:{allowedValues:{begin:0,end:23,text:"0-23",valuesExpr:"([0-9]|1[0-9]|[2][0-3])",expr:""}},"day-of-month":{allowedValues:{begin:1,end:31,text:"1-31",valuesExpr:"([1-9]|[1-2][0-9]|[3][0-1])",expr:""}},month:{allowedValues:{begin:1,end:12,text:"1-12",valuesExpr:"([1-9]|1[0-2])",expr:""},allowedValuesAlternative:{begin:"Jan",end:"Dec",text:"JAN-DEC",valuesExpr:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)",expr:""}},"day-of-week":{allowedValues:{begin:0,end:6,text:"0-6",valuesExpr:"([0-6])",expr:""},allowedValuesAlternative:{begin:"Sun",end:"Sat",text:"SUN-SAT",valuesExpr:"(Sun|Mon|Tue|Wed|Thu|Fri|Sta)",expr:""}}},x={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12,sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sta:6};function a(e,a){var t;e&&(t=e.valuesExpr,e.expr=b.template(a)({values:t,any:"(\\*)",fromTo:"("+t+"\\-"+t+")",step:"(\\*/"+(a=0==(a=t).indexOf("([0-")?"([1-"+a.split("([0-")[1]:a)+")",list:"("+t+"((\\,"+t+"))+)"}))}for(e in h){var t=h[e];a(t.allowedValues,"^(<%=values%>|<%=any%>|<%=fromTo%>|<%=step%>|<%=list%>)$"),a(t.allowedValuesAlternative,"^(<%=values%>|<%=any%>|<%=fromTo%>|<%=list%>)$")}function g(e){e=e.replace(new RegExp("\\s+","gm")," ").split(" ");if(5!=e.length)return!1;var t=!0;return e.forEach(function(e,a){t=t&&n(e,m[a])}),t}function n(e,a){var t=h[a].allowedValues.expr;h[a].allowedValuesAlternative&&(t+="|"+h[a].allowedValuesAlternative.expr);t=new RegExp(t,"i");return e.match(t)}return{validate:g,validatePart:n,nextRun:function(e,s){if(!g(e))return[];var o=new Date,r={minute:[],hour:[],"day-of-month":[],month:[],"day-of-week":[],year:[]},n=e.split(" "),a=n[2],t=n[4],e=n[3],u="*"!=t&&"*"==a,d="*"==e;m.forEach(function(e,a){var t=n[a],a=h[e].allowedValues;r[e]=function(e,a,t,n){var l=t-a+1,i=[];if("*"==e){if(!n)for(var s=0;s<l;s++)i.push(a+s)}else if(0<e.indexOf("-")){var o=e.split("-"),r=isNaN(o[0])?x[o[0].toLowerCase()]:parseInt(o[0]),u=isNaN(o[1])?x[o[1].toLowerCase()]:parseInt(o[1]);if(n)for(;i.length<l+t+1;)for(s=r;s<=u;s++)i.push(s);else for(s=r;s<=u;s++)i.push(s)}else if(0<e.indexOf(","))if(n)for(;i.length<l+t+1;)e.split(",").forEach(function(e){e=isNaN(e)?x[e.toLowerCase()]:parseInt(e);i.push(e)});else e.split(",").forEach(function(e){e=isNaN(e)?x[e.toLowerCase()]:parseInt(e);i.push(e)});else if(0==e.indexOf("*/")){var d=parseInt(e.split("/")[1]),v=a+d;t<v&&(v=a);for(s=0;s<l+t+1;s++)i.push(v=t<v?a:v),v+=d}else{var f=isNaN(e)?x[e.toLowerCase()]:parseInt(e);if(n)for(;i.length<l+t+1;)i.push(f);else i.push(f)}return i}(t,a.begin,a.end,"day-of-week"==e)});for(var l=o.getFullYear(),i=0;i<=s;i++)r.year.push(l+i);var v,f,p={},c={};for(a in r.year.forEach(function(i){v&&f||r.month.forEach(function(l){var a;v&&f||((a=new Date(o.getTime())).setFullYear(i),a.setMonth(l-1),(l-1>o.getMonth()||i>o.getFullYear())&&a.setDate(1),a.setDate(a.getDate()-(a.getDay()-6+7)),r["day-of-week"].forEach(function(e){var n=new Date(a.getTime()),e=(e+7-n.getDay())%7;0==e&&(e=7),n.setDate(n.getDate()+e),r.hour.forEach(function(t){v||r.minute.forEach(function(e){var a=new Date(n.getTime());a.setHours(t),a.setMinutes(e),a.setSeconds(0),a.getTime()>o.getTime()&&(d||a.getMonth()==l-1)&&(p[w(a).format("YYYY-MM-DD HH:mm:ss")]=""),Object.keys(p).length>=s&&(v=!0)})}),a=new Date(n.getTime())}),u?f=!0:r["day-of-month"].forEach(function(n){f||r.hour.forEach(function(t){f||r.minute.forEach(function(e){var a=new Date(o.getTime());a.setFullYear(i),a.setMonth(l-1),a.setDate(n),a.setHours(t),a.setMinutes(e),a.setSeconds(0),a.getTime()>o.getTime()&&(c[w(a).format("YYYY-MM-DD HH:mm:ss")]=""),Object.keys(c).length>=s&&(f=!0)})})}))})}),c)p[a]="";return(e=Object.keys(p)).sort(function(e,a){return new Date(e).getTime()-new Date(a).getTime()}),e.splice(0,s)},validations:h}}g.Crontab=V,g.fn.crontab=function(t){var o=g(this);t=t||{};t=g.extend(!0,{},{lang:"en",nextRun:{disabled:!1,max:5}},t);var e={en:{part:{min:"Mniute",hour:"Hour",dayOfMonth:"Day(Month)",month:"Month",dayOfWeek:"Day(Week)"},nextRun:{next:"next at",more:"more"},tip:{anyValue:"any value",valueListSeparator:"value list separator",rangeOfValues:"range of values",stepValue:"step values",allowedValues:"allowed values",allowedValuesAlternative:"allowed values alternative"}},zh:{part:{min:"分",hour:"时",dayOfMonth:"天(月)",month:"月",dayOfWeek:"天(周)"},nextRun:{next:"下次执行时间：",more:"更多"},tip:{anyValue:"任意值",valueListSeparator:"值列表",rangeOfValues:"范围",stepValue:"步长",allowedValues:"允许值",allowedValuesAlternative:"允许值替代方案"}}},r=new V,a="";o.hasClass("form-control-sm")?a="sm":o.hasClass("form-control-lg")&&(a="lg");var n,u=g(b.template(`
            <div class="crontab">
                <div class="op">
                    <div class="expression">
                        <div class="input<% if (size) { %> input-<%=size%><% } %>">
                            <input type="text" name="minute" autocomplete="off">
                            <input type="text" name="hour" autocomplete="off">
                            <input type="text" name="day-of-month" autocomplete="off">
                            <input type="text" name="month" autocomplete="off">
                            <input type="text" name="day-of-week" autocomplete="off">
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
        `)({size:a,labels:e[t.lang],nextRun:t.nextRun})),l=o.val(),d=u.find(".next-run .next div"),v=u.find(".next-run .then"),f=u.find(".next-run .more");for(n in o.hide(),o.after(u),t.nextRun.disabled||f.on("click",function(){0<v.find("li").length&&v.show()}),new y("[copy-to-clipboard]",{container:u.get(0),text:function(e){return g(e).closest(".crontab").prev("input").val()}}),r.validations){var i=r.validations[n],s=u.find("input[name='"+n+"']");s.tooltip({placement:"top",title:b.template(`
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
        `)({labels:e[t.lang],part:i}),html:!0,trigger:"focus"});var p,c=[[48,57],[96,105]],m=[8,9,13,16,37,39,46,56,188,189,191];function h(e,a,t){if(0<=a.indexOf(t))return 1;for(var n=0;n<e.length;n++){var l=e[n];if(t>=l[0]&&t<=l[1])return 1}}function x(e){var a,t,n=e.attr("name"),l=e.val(),i=u.find(".part label[name='"+n+"']");if(r.validatePart(l,n)){if(i.removeClass("text-danger").addClass("text-success"),0<l.indexOf(",")?(a={},l.split(",").forEach(function(e){a[e]=""}),(t=Object.keys(a)).sort(function(e,a){return isNaN(e)?a2v[e.toLowerCase()]-a2v[a.toLowerCase()]:e-a}),e.val(t.join(","))):0<l.indexOf("-")&&(n=l.split("-"),t=isNaN(n[0])?a2v[n[0].toLowerCase()]:parseInt(n[0]),(l=isNaN(n[1])?a2v[n[1].toLowerCase()]:parseInt(n[1]))<t?e.val(n[1]+"-"+n[0]):t==l&&e.val(n[0])),e.removeClass("text-danger"),0==u.find(".part label.text-danger").length){u.find(".input").removeClass("is-invalid");var s=[];return g.each(u.find("input"),function(e,a){s.push(g(a).val())}),o.val(s.join(" ")).change(),1}}else e.addClass("text-danger"),u.find(".input").addClass("is-invalid"),i.removeClass("text-success").addClass("text-danger"),o.val("").change(),d.html(""),v.html(""),v.hide(),f.hide()}s.on("keydown",function(e){var a=g(this).attr("name");r.validations[a].allowedValuesAlternative?h(c.concat([[65,90]]),m,e.keyCode)||e.preventDefault():h(c,m,e.keyCode)||e.preventDefault()}),s.on("change",function(){var e;x(g(this))&&!t.nextRun.disabled&&r.validate(o.val())&&(e=r.nextRun(o.val(),t.nextRun.max),v.html(""),f.show(),e.forEach(function(e,a){a>=t.nextRun.max||(0==a?d.text(e):((a=g("<li></li>")).text(e),v.append(a)))}))}),l&&(p=l.split(" "),g.each(u.find("input"),function(e,a){e==p.length-1?g(a).val(p[e]).change():(g(a).val(p[e]),x(g(a)))}))}}});
//# sourceMappingURL=jquery.prac.com.crontab.js.map