!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment","async","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(x,y,e,w,u){x.fn.picker=function(a,l){var e=x(this),t={en:{title:"Please select",cancel:{label:"Cancel"},confirm:{label:"Confirm"}},zh:{title:"请选择",cancel:{label:"取消"},confirm:{label:"确认"}}},t=t[(l=l||{}).lang]||t.en;if(1==(l=x.extend(!0,{},{lang:"en",columns:1,height:"260px",toolbar:!0,cancel:{class:"secondary"},confirm:{class:"primary"}},t,l)).columns)return new c(e,a,l);var o=x(y.template(`
                <div class="p-pickers">
                    <div class="toolbar">
                        <a href="javascript:void(0)" class="text-<%=cfg.cancel.class%>" cancel><%=cfg.cancel.label%></a>
                        <label class="title"><%=cfg.title%></label>
                        <a href="javascript:void(0)" class="text-<%=cfg.confirm.class%>" confirm><%=cfg.confirm.label%></a>
                    </div>
                    <div class="columns"></div>
                </div>
            `)({cfg:l}));e.append(o);var s=[];function r(e){var t,i=[];for(t in e)i.push({value:t,text:e[t]});return i}l.cascade?a.forEach(function(e,t){var i=x('<div class="column"></div>');o.find(".columns").append(i);var n=x.extend(!0,{},l,{toolbar:!1,onChange:function(e){t+1<a.length&&s[t+1].setData(r(a[t+1][e]))}});0==t?s.push(new c(i,r(e),n)):s.push(new c(i,r(e[s[t-1].value()]),n))}):a.forEach(function(e,t){var i=x('<div class="column"></div>');o.find(".columns").append(i);t=x.extend(!0,{},l,{column:t,toolbar:!1});s.push(new c(i,e,t))});e=o.find(".toolbar");return e.find("[cancel]").on("click",function(){l.cancel.onCancel&&l.cancel.onCancel()}),e.find("[confirm]").on("click",function(){var i;l.confirm.onConfirm&&(i=[],s.forEach(function(e,t){i[t]=e.value()}),l.confirm.onConfirm(i))}),{select:function(){for(var e=0;e<arguments.length;e++)s[e].select(arguments[e])},pickers:function(){return s}};function c(e,t,i){var o;function n(e){if(o=[],x.isArray(e))e.forEach(function(e){"string"==typeof e||"number"==typeof e?o.push({value:e,text:e}):o.push(e)});else for(var t in e)o.push({value:t,text:e[t]})}n(t);var a=x(y.template(`
                <div class="p-picker">
                    <% if (cfg.toolbar) { %>
                        <div class="toolbar">
                            <a href="javascript:void(0)" class="text-secondary" cancel><%=cfg.cancel.label%></a>
                            <label class="title"><%=cfg.title%></label>
                            <a href="javascript:void(0)" class="text-primary" confirm><%=cfg.confirm.label%></a>
                        </div>
                    <% } %>
                    <div class="wrapper" style="height: <%=cfg.height%>">
                        <ul class="items">
                            <%_.each(items, function(item) {%>
                                <li value="<%=item.value%>"><%=item.text%></li>
                            <% }); %>
                        </ul>
                        <div class="mask">
                        </div>
                        <div class="selected-frame">
                            <div></div>
                        </div>
                    </div>
                </div>
            `)({cfg:i,items:o}));e.html(""),e.append(a);var s,l,t=a.find(".wrapper"),r=t.find(".items"),e=t.find(".mask"),c=t.find(".selected-frame").outerHeight(),f=(t.height()-c)/2;e.css("background-size","100% "+f+"px");var d,u,m=f,p=!1;function v(){l=f-(o.length-1)*c,s=f,r.css("transform","translateY("+f+"px)"),r.css("transition","none")}v(),t.bindDragMove(function(e,t){e.preventDefault(),p=!0,d=t.y},function(e,t,i){t=t.y-d,!p||(t=s+t)>=f-o.length*c&&t<=f+c&&(r.css("transform","translateY("+t+"px)"),r.css("transition","none"))},function(e,t,i){u=t.y,.8<i.y?(i=i.y,p&&(i=Math.round(4*i),(i=s+(u<d?-i*c:i*c))<=l?i=l:m<=i&&(i=m),r.css("transform","translateY("+i+"px)"),r.css("transition","all 0.4s ease-out"),s=i,g())):function(){var e=r.css("transform");if(e&&!(e.indexOf(",")<=0)){var t=Number(e.split(",")[5].split(")")[0]),i=f-(o.length-1)*c,e=f;if(t<=i)t=i;else if(e<=t)t=e;else for(var n=0;n<o.length;n++){var a,l=f-n*c;n+1<o.length&&((a=f-(n+1)*c)<=t&&t<=l&&(t=l-t<t-a?l:a))}r.css("transform","translateY("+t+"px)"),r.css("transition","all 0.2s ease-out"),s=t,g()}}(),p=!1}),t.bindMouseWheel(function(e,t){!function(e){e=s+e/120*c;e<=l?e=l:m<=e&&(e=m);r.css("transform","translateY("+e+"px)"),r.css("transition","all 0.2s"),s=e,g()}(t)});var h=0<o.length?o[0].value:"";function g(){var e=Math.round((f-s)/c);r.find("li").removeAttr("selected");e=r.find("li").eq(e);e.attr("selected","true");e=e.attr("value");i.onChange&&h!=e&&i.onChange(e,i.column),h=e}a=a.find(".toolbar");return a.find("[cancel]").on("click",function(e){i.cancel.onCancel&&i.cancel.onCancel()}),a.find("[confirm]").on("click",function(e){i.confirm.onConfirm&&i.confirm.onConfirm(h)}),{select:function(i){var n=0;o.forEach(function(e,t){e.value==i&&(n=t)}),s=f-n*c,r.css("transform","translateY("+s+"px)"),r.css("transition","all 0.2s linear"),g()},setData:function(e){n(e),r.html(""),r.append(y.template(`
                    <%_.each(items, function(item) {%>
                        <li value="<%=item.value%>"><%=item.text%></li>
                    <% }); %>
                `)({items:o})),v(),g()},value:function(){return h}}}},x.fn.datePicker=function(a){var e=x(this);a=a||{};var t,i=new Date,n={type:"ymd",year:{scope:[i.getFullYear(),i.getFullYear()+4],formatter:void 0},month:{formatter:void 0},date:{formatter:void 0}},l=(a=x.extend(!0,{},n,a)).year.scope[0],o=a.year.scope[1],s=[],r=[];function c(){for(var e=[],t=l;t<=o;t++){var i=String(t);a.year.formatter?e.push({value:i,text:a.year.formatter(i)}):e.push(i),t==l&&s.push(i)}return e}function f(){for(var e=[],t=1;t<=12;t++){var i=u(t);a.month.formatter?e.push({value:i,text:a.month.formatter(i)}):e.push(i),t==t&&s.push(i)}return e}function d(){for(var e=[],t=1;t<=31;t++){var i=u(t);a.date.formatter?e.push({value:i,text:a.date.formatter(i)}):e.push(i),t==t&&s.push(i),r.push(i)}return e}function u(e){return e<10?"0"+e:String(e)}"ymd"==a.type?(m=3,t=[c(),f(),d()]):"ym"==a.type?(m=2,t=[c(),f()]):"md"==a.type&&(m=2,t=[f(),d()]);var m=x.extend(!0,{},a,{columns:m,onChange:function(e,t){{var i,n;"ymd"==a.type?(v=s[2],s[t]=e,(0==t&&"02"==s[1]||1==t)&&(i=String(new Date(parseInt(s[0]),parseInt(s[1]),0).getDate()),n=h(r.slice(0,r.indexOf(i)+1)),p[2].setData(n),p[2].select(i<v?i:v))):"md"==a.type&&(v=s[1],s[t]=e,0==t&&(i=String(new Date(2024,parseInt(s[0]),0).getDate()),n=h(r.slice(0,r.indexOf(i)+1)),p[1].setData(n),p[1].select(i<v?i:v)))}},confirm:{onConfirm:function(e){a.confirm&&a.confirm.onConfirm&&a.confirm.onConfirm(e)}}}),m=e.picker(t,m),p=m.pickers();"ymd"==a.type?(p[0].select(u(i.getFullYear())),p[1].select(u(i.getMonth()+1)),p[2].select(u(i.getDate()))):"ym"==a.type?(p[0].select(u(i.getFullYear())),p[1].select(u(i.getMonth()+1))):"md"==a.type&&(p[0].select(u(i.getMonth()+1)),p[1].select(u(i.getDate())));var v=r[0];function h(e){var t=[];return a.date.formatter?e.forEach(function(e){t.push({value:e,text:a.date.formatter(e)})}):t=e,t}return m},x.fn.timePicker=function(n){var e=x(this);n=n||{};var t=new Date,a=(n=x.extend(!0,{},{type:"hms",hour:{scope:[0,23],formatter:void 0},minute:{formatter:void 0},second:{formatter:void 0}},n)).hour.scope[0],l=n.hour.scope[1];function i(){for(var e=[],t=a;t<=l;t++){var i=r(t);n.hour.formatter?e.push({value:i,text:n.hour.formatter(i)}):e.push(i)}return e}function o(){for(var e=[],t=0;t<=59;t++){var i=r(t);n.minute.formatter?e.push({value:i,text:n.minute.formatter(i)}):e.push(i)}return e}function s(){for(var e=[],t=0;t<=59;t++){var i=r(t);n.second.formatter?e.push({value:i,text:n.second.formatter(i)}):e.push(i)}return e}function r(e){return e<10?"0"+e:String(e)}"hms"==n.type?(c=3,f=[i(),o(),s()]):"hm"==n.type?(c=2,f=[i(),o()]):"ms"==n.type&&(c=2,f=[o(),s()]);var c=x.extend(!0,{},n,{columns:c,confirm:{onConfirm:function(e){n.confirm&&n.confirm.onConfirm&&n.confirm.onConfirm(e)}}}),f=e.picker(f,c),c=f.pickers();return"hms"==n.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes())),c[2].select(r(t.getSeconds()))):"hm"==n.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes()))):"ms"==n.type&&(c[0].select(r(t.getMinutes())),c[1].select(r(t.getSeconds()))),f},x.fn.calendar=function(c){var e=x(this);c=c||{};var f=new Date,t={en:{title:"Date Select",confirm:{label:"Confirm"},week:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},zh:{title:"日期选择",confirm:{label:"确认"},week:{days:["日","一","二","三","四","五","六"]}}},i={lang:"en",class:"primary",range:!1,multiple:!1,confirm:{onConfirm:function(){}},week:{firstDay:0},month:{format:"YYYY-MM"},scope:[new Date(f.getFullYear(),f.getMonth(),1),new Date(f.getFullYear(),f.getMonth()+7,0)]},t=t[c.lang]||t.en,d="object"==typeof(c=x.extend(!0,{},i,t,c)).scope[0]?c.scope[0]:new Date(c.scope[0]),u="object"==typeof c.scope[1]?c.scope[1]:new Date(c.scope[1]),n=12*(u.getFullYear()-d.getFullYear())+(u.getMonth()-d.getMonth())+1,a=d.getMonth(),t=c.week.days,m=c.week.firstDay;0<m&&(l=t.slice(0,m),t=t.slice(m).concat(l));for(var l=x(y.template(`
            <div class="p-calendar">
                <div class="header">
                    <% if (cfg.title) { %>
                    <div class="title"><%=cfg.title%></div>
                    <% } %>
                    <div class="current-month"><%=currentMonth%></div>
                    <ul class="days">
                        <%_.each(days, function(day) {%>
                            <li><%=day%></li>
                        <% }); %>
                    </ul>
                </div>
                <div class="body">
                </div>
                <div class="footer">
                    <button type="button" class="btn btn-<%=cfg.class%>" confirm><%=cfg.confirm.label%></button>
                </div>
            </div>
        `)({currentMonth:w(d).format(c.month.format),days:t,cfg:c})),p=l.find(".body"),o=l.find(".current-month"),t=l.find("button[confirm]"),s=0;s<n;s++)!function(e,t,i){for(var n=new Date(e,t,1),a=new Date(e,t+1,0),l=n.getDay()-m,o=x(y.template(`
                <ul class="month">
                    <% for (var i = 1;i <= lastDate;i ++) { 
                        var date = new Date(year, month, i);
                        var disabled = from.getTime() > date.getTime() || to.getTime() < date.getTime();
                        var selected = false;
                        if (!cfg.range && today.getTime() == date.getTime()) {
                            selected = true;
                        }
                    %>
                        <li value="<%=moment(date).format('YYYY-MM-DD')%>"<% if (disabled) { %> class="disabled"<% } %><% if (selected) { %> class="selected bg-<%=cfg.class%>"<% } %>><%=i%></li>
                    <% } %>
                    <div class="bg"><%=month + 1%></div>
                </ul>
            `)({today:new Date(f.getFullYear(),f.getMonth(),f.getDate()),from:d,to:u,year:e,month:t,moment:w,lastDate:a.getDate(),cfg:c})),s=1;s<=l;s++){var r=x("<li></li>");o.prepend(r)}p.append(o);t=w(new Date(e,t)).format(c.month.format),e=x('<div class="next-month"></div>');e.attr("month",t),0==i?e.css("height",0):e.text(t);o.before(e)}((h=new Date(d.getFullYear(),a+s,1)).getFullYear(),h.getMonth(),s);e.append(l),0<p.find("li.selected").length&&b(p.find("li.selected").eq(0).closest(".month"));var r=p.find(".next-month"),v=(p.outerHeight()-p.height())/2;p.scroll(function(e){x.each(r,function(e,t){x(t).position().top<=-v&&o.text(x(t).attr("month"))})});var h=p.find("li[value]:not(.disabled)");function g(e,t){e.addClass("selected").addClass("bg-"+c.class),t&&e.addClass(t)}function b(e){p.animate({scrollTop:e.position().top},10)}return h.on("click",function(){var e,n,a,l;c.range?0!=(e=p.find("li.selected")).length&&2!=e.length&&x(this).attr("value")>e.attr("value")?(g(x(this),"end"),n=p.find("li.selected"),a=n.css("background-color"),l=a.replace(")",", 0.2)"),x.each(h,function(e,t){var i=x(t).attr("value");i&&i>n.eq(0).attr("value")&&i<n.eq(1).attr("value")&&x(t).css("color",a).css("background-color",l)})):(h.removeClass(),h.removeAttr("style"),g(x(this),"begin")):c.multiple?(x(this).hasClass("selected")?x(this).removeClass():g(x(this)),x.each(h,function(e,t){0<e&&(h.eq(e-1).hasClass("selected")?x(t).addClass("right"):x(t).removeClass("right")),e<h.length-1&&(h.eq(e+1).hasClass("selected")?x(t).addClass("left"):x(t).removeClass("left"))})):(h.removeClass(),g(x(this)))}),t.on("click",function(){var i,e;c.confirm.onConfirm&&(i=[],e=p.find("li.selected"),x.each(e,function(e,t){i.push(new Date(x(t).attr("value")))}),c.multiple&&0==i.length||c.range&&2!=i.length||(1==i.length?c.confirm.onConfirm(c.multiple?i:i[0]):c.confirm.onConfirm(i)))}),{select:function(e){if(e){if(c.range){if(!x.isArray(e)||e.length<2)return}else x.isArray(e)||(e=[e]);p.find("li:not(.disabled)").removeClass(),e.forEach(function(e){!function(e){"object"==typeof e&&(e=w(e).format("YYYY-MM-DD"));p.find("li[value='"+e+"']").trigger("click")}(e)});e=e[0];"object"==typeof e&&(e=w(e).format("YYYY-MM-DD")),b(p.find("li[value='"+e+"']").closest(".month"))}}}},x.fn.form=function(c){c=c||{};c=x.extend(!0,{},{validations:{},submit:{btn:null,onSubmit:null},cancel:{btn:null,onCancel:null}},c);var f=x(this),e=(e=c.submit.btn)||f.find("[p-submit]"),t=c.cancel.btn;function d(e,t){var i;0<e.siblings(".loading").length||(e.closest(".control").removeClass("is-valid").removeClass("is-invalid"),i=x('<div class="loading"></div>'),e.after(i),t(function(e){e.siblings(".loading").remove()}))}return t=t||f.find("[p-cancel]"),e.on("click",function(t){f.hasClass("validated")||f.addClass("validated"),function(e,t){var a=!0;function i(e){var t=e.val(),i=e.attr("pattern");e.attr("required")?(0==t.length?r:s)(e):i&&(t.match(new RegExp(i))?s:r)(e)}function n(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?r:s)(e)}x.each(e.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"),function(e,t){i(x(t)),x(t).on("change",function(){i(x(this))})}),x.each(e.find("select"),function(e,t){n(x(t)),x(t).on("change",function(){n(x(this))})});var l={};function o(){for(var e in l){var t,e=l[e];0!=e.length&&(t=!1,e.forEach(function(e){e.is(":checked")&&(t=!0)}),(t?s:r)(e[0]))}}function s(e){e.closest(".control").removeClass("is-invalid").addClass("is-valid")}function r(e,t){a=!1,t&&e.closest(".control").find(".msg.invalid").text(t),e.closest(".control").removeClass("is-valid").addClass("is-invalid")}x.each(e.find("input[type='checkbox'][required]"),function(e,t){var i=x(t).attr("name");l[i]||(l[i]=[]),l[i].push(x(t)),x(t).on("change",function(){o()})}),o(),x.isEmptyObject(c.validations)?t(a):function(){var e=Object.keys(c.validations);function n(n,a){var e=c.validations[n.attr("validation")];d(n,function(i){e(n,function(e,t){e?s(n):r(n,t),i(n),a&&a()})})}u.each(e,function(e,t){var i=f.find("[validation='"+e+"']");i.off("change"),i.on("change",function(){n(x(this))});e=i.closest(".control");e.hasClass("is-valid")||e.hasClass("is-invalid")?(e.hasClass("is-invalid")&&(a=!1),t()):n(i,function(){t()})},function(){t(a)})}()}(f,function(e){function l(e,t){i[e]?(x.isArray(i[e])||(i[e]=[i[e]]),i[e].push(t)):i[e]=t}var i;e?c.submit.onSubmit&&c.submit.onSubmit((i={},x.each(f.find("input[name]"),function(e,t){var i=x(t),n=i.attr("name"),a=i.prop("type"),t=i.val();null==i.attr("p-integer")&&null==i.attr("p-decimal")||isNaN(t)||(t=Number(t)),("radio"!=a&&"checkbox"!=a||i.is(":checked"))&&l(n,t)}),x.each(f.find("textarea[name]"),function(e,t){t=x(t);l(t.attr("name"),t.val())}),x.each(f.find("select[name]"),function(e,t){var i=x(t),n=i.attr("name");x.each(i.find("option:selected"),function(e,t){t=x(t).attr("value");null==i.attr("p-integer")&&null==i.attr("p-decimal")||isNaN(t)||(t=Number(t)),l(n,t)})}),i)):(t.stopImmediatePropagation(),t.preventDefault())})}),t.on("click",function(e){f.removeClass("validated"),c.cancel.onCancel&&c.cancel.onCancel()}),{loading:d}},x.fn.rate=function(n){var e=x(this);n=n||{};n=x.extend(!0,{},{selected:0,half:!1,class:"warning",type:"star",count:5},n);e.html(""),e.append(x(y.template(`
            <div class="p-rate">
            <% for (var i = 0;i < count;i ++) { %>
                <div<% if (half) { %> class="half"<% } %>>
                    <i class="bi bi-<%=type%>"></i>
                </div>
                <% if (half) { %>
                <div class="fill"></div>
                <% } %>
            <% } %>
            </div>
        `)(n)));var a=n.selected;a>n.count&&(a=n.count);var i=n.half?.5:1,l=e.find("div.p-rate > div");function t(e,t){var i=Number(e.attr("value"));a=i,l.find("i").removeClass().addClass("bi").addClass("bi-"+n.type),x.each(l,function(e,t){Number(x(t).attr("value"))<i&&x(t).find("i").removeClass().addClass("bi").addClass("bi-"+n.type+"-fill").addClass("text-"+n.class)}),e.find("i").removeClass().addClass("bi").addClass("text-"+n.class),n.half?e.find("i").addClass("bi-"+n.type+"-"+e.attr("class")):e.find("i").addClass("bi-"+n.type+"-fill"),n.onChange&&!t&&n.onChange(a)}return x.each(l,function(e,t){e=(e+1)*i;n.half&&(e=e.toFixed(1)),x(t).attr("value",e)}),n.readonly||l.on("click",function(){a!=Number(x(this).attr("value"))&&t(x(this))}),0<a&&t(e.find("div[value='"+a+"']"),!0),{getValue:function(){return a}}},x.fn.uploader=function(s){var r=x(this);s=s||{};s=x.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,t){return!0},type:function(e,t){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"6rem",accept:"*",icon:"bi-cloud-upload-fill",data:[],preview:!1,onSuccess:function(e,t,i){return e},onError:function(e,t,i){return{code:e.status,msg:e.responseText}}},s),r.hasClass("p-file-upload")||r.addClass("p-file-upload");var n={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},c={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},l={".jpg":"image",".jpeg":"image",".png":"image",".svg":"image",".gif":"image",".xls":"excel",".xlsx":"excel",".doc":"word",".docx":"word",".ppt":"ppt",".pptx":"ppt",".pdf":"pdf",".mp4":"video",".webm":"video",".mp3":"audio",".wma":"audio",".html":"html",".xml":"xml",".txt":"txt"},e=`
            <div class="file" style="width:<%=width%>" blank>
                <i class="bi <%=icon%>"></i>
                <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
            </div>
        `,f=`
            <div class="file" style="width:<%=width%>" count>
                <i class="bi <%=icon%>"></i>
                <div class="uploading">
                    <div class="spinner-border text-light"></div>
                    <span>0%</span>
                </div>
            </div>
        `,d=`
            <div class="file" style="width:<%=width%>" count>
                <i class="bi <%=icon%>"></i>
                <div class="failed">
                    <i class="bi bi-x-circle"></i>
                    <span><%=error%></span>
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `,u=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded image">
                    <img src="<%=path%>" />
                </div>
                <% if (!preview) { %>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
                <% } %>
            </div>
        `,m=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded">
                    <i class="bi <%=icon%>"></i>
                    <span><%=name%></span>
                </div>
                <% if (!preview) { %>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
                <% } %>
            </div>
        `;function p(){var a,l=x(y.template(e)({width:s.width,accept:s.accept,icon:s.icon}));function o(e){a.after(e),a.remove(),(s.limit<=0||r.find(".file[count]").length<s.limit)&&p(),e.find(".remove").on("click",function(e){e.stopPropagation(),v(x(this))}),s.onComplete&&s.onComplete(e.index()),t()}r.append(l),l.find("input[type='file']").on("change",function(e){var i,e=e.originalEvent.target.files;0<e.length&&(e=e[0],(i=function(e,t){if(s.validation.size(e.size,t)){e=function(e){var t=e.type,i=n[t];i||(e=t.split("/")[0]+"/*",i=(i=n[e])||"file");return{name:i,originalType:t}}(e);if(s.validation.type(e,t))return e}}(e,l.index()))?function(e,t){if(s.beforeUpload)return s.beforeUpload(e,t);t(e)}(e,function(e){var t,n;t=e,n=i,(e=new FormData).append(s.fieldName,t),x.ajax({url:s.url,type:"POST",data:e,contentType:!1,processData:!1,xhr:function(){a=x(y.template(f)({width:s.width,icon:s.icon})),l.after(a),l.remove(),"text"==s.progress&&a.find("span").text(s.text.uploading);var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var t;e.lengthComputable&&("percent"==s.progress&&(t=(e.loaded/e.total*100).toFixed(0)+"%",a.find("span").text(t)),s.onProgress&&s.onProgress(e.loaded,e.total))},!1),e},success:function(e,t,i){t=s.onSuccess(e,t,i),i="image"==n.name?x(y.template(u)({width:s.width,path:t.path,preview:s.preview})):x(y.template(m)({width:s.width,icon:c[n.name],name:t.name,preview:s.preview}));i.data("file",t),o(i),"image"==n.name&&i.find("div.uploaded").css("height",i.width())},error:function(e,t,i){s.onError(e,t,i),o(x(y.template(d)({error:s.text.failed,icon:s.icon})))}})}):x(this).val(null))})}function t(){var e=r.find(".uploaded img");e.off("click"),e.on("click",function(){var i=[];x.each(e,function(e,t){x(t).attr("index",e),i.push({path:x(t).attr("src")})}),x.imagePreview(i).select(parseInt(x(this).attr("index")))})}function v(e){var t=e.closest(".file"),i=t.data("file"),e=t.index();t.remove(),0==r.find(".file[blank]").length&&p(),s.onRemove&&s.onRemove(i,e)}return s.data&&0<s.data.length?(s.data.forEach(function(e){var t,i,n,a;0==e.indexOf("data:image")?(n="",t="image"):(i=e.substring(e.lastIndexOf(".")),t=l[i],n=e.substring(e.lastIndexOf("/")+1)),"image"==t?a=x(y.template(u)({width:s.width,path:e,preview:s.preview})):(i=c[t=t||"file"],n=e.substring(e.lastIndexOf("/")+1),(a=x(y.template(m)({width:s.width,icon:i,name:n,preview:s.preview}))).on("click",function(){window.location.href=e})),a.data("file",{name:n,path:e}),a.find(".remove").on("click",function(e){e.stopPropagation(),v(x(this))}),r.append(a),"image"==t&&a.find("div.uploaded").css("height",a.width())}),t(),s.preview||(s.limit<=0||s.data.length<s.limit)&&p()):s.preview||p(),{files:function(){var i=[];return x.each(r.find(".file"),function(e,t){t=x(t).data("file");t&&i.push(t)}),i},reset:function(){r.find(".file").remove(),p()}}},x.fn.slider=function(l){l=l||{};var n,a,o=(l=x.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},l)).default,e=x(this),t=e.attr("disabled"),s=x(y.template(`
            <div class="p-slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(l)),r=s.find(".progress-bar"),c=s.find(".btn");function i(){n=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=x("body").get(0));)e=e.offsetParent;return t}(s).left,a=n+s.width()}function f(e){o!=e&&(o=e,l.onChange(o));var t,i,n=(t=e,i=c.outerWidth()/2,i=(l.max-l.min)/s.width()*i,a(t-i)),e=a(e);function a(e){return(e-l.min)/(l.max-l.min)*100}c.css("left",n+"%"),r.css("width",e+"%")}function d(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return l.btn&&(r.parent().after(l.btn),c.remove(),(c=l.btn).css("position","relative").css("cursor","pointer")),e.append(s),t&&d(),c.css("top",-(c.outerHeight()/2+l.height/2+1)+"px"),i(),f(l.default),c.bindDragMove(function(e,t){e.preventDefault()},function(e,t,i){!function(e){a<(e=e<n?n:e)&&(e=a);var t=l.min+Math.round((l.max-l.min)/(a-n)*(e-n));if(1<l.step)for(var i=l.min;i<l.max&&t!=i;i+=l.step)if(i+l.step<=l.max&&i<t&&t<i+l.step){t=t-i>i+l.step-t?i+l.step:i;break}f(t)}(t.x)},function(e,t,i){}),e.on("touchstart",function(e){e.preventDefault()}),x(window).on("resize",function(){i(),f(o)}),x(window).on("p-resize",function(){i(),f(o)}),{setValue:function(e){f(e)},getValue:function(){return o},disable:d,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},x.fn.stepper=function(t){var i=x(this);t=t||{};t=x.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},t);var e=x(y.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:t}));0<=t.class.indexOf("outline-")&&i.addClass("border-"+t.class.split("outline-")[1]),i.val(t.default),i.css("text-align","center"),isNaN(t.min)||i.attr("min",t.min),isNaN(t.max)||i.attr("max",t.max),0<t.decimal?i.decimal():i.integer();var n=e.find("button:first-child"),a=e.find("button:last-child");n.on("click",function(){var e=Number(i.val());(null==t.min||e>Number(t.min))&&(0<t.decimal?i.val((e-t.step/10**t.decimal).toFixed(t.decimal)):i.val(e-t.step)).change()}),a.on("click",function(){var e=Number(i.val());(null==t.max||e<Number(t.max))&&(0<t.decimal?i.val((e+t.step/10**t.decimal).toFixed(t.decimal)):i.val(e+t.step)).change()}),i.on("change",function(){var e=Number(x(this).val());null!=t.min&&(e<=Number(t.min)?n.attr("disabled",!0):n.removeAttr("disabled")),null!=t.max&&(e>=Number(t.max)?a.attr("disabled",!0):a.removeAttr("disabled"))}),i.after(e),n.after(i)},x.fn.multiselect=function(e,t){var i=x(this);t=t||{};var n;t=x.extend(!0,{},{height:"260px",title:"Please select",toolbar:!0,class:"primary",cancel:{label:"Cancel",class:"secondary"},confirm:{label:"Confirm",class:"primary"}},t),function(e){if(n=[],x.isArray(e))e.forEach(function(e){"string"==typeof e||"number"==typeof e?n.push({value:e,text:e}):n.push(e)});else for(var t in e)n.push({value:t,text:e[t]})}(e);var a=x(y.template(`
            <div class="p-multiselect">
                <% if (cfg.toolbar) { %>
                    <div class="toolbar">
                        <a href="javascript:void(0)" class="text-secondary" cancel><%=cfg.cancel.label%></a>
                        <label class="title"><%=cfg.title%></label>
                        <a href="javascript:void(0)" class="text-primary" confirm><%=cfg.confirm.label%></a>
                    </div>
                <% } %>
                <div class="wrapper" style="height: <%=cfg.height%>">
                    <ul class="items">
                        <%_.each(items, function(item) {%>
                            <li class="item" value="<%=item.value%>">
                                <i class="bi text-<%=cfg.class%><% if (item.selected) { %> bi-check-lg<% } %>"></i>
                                <div class="text"><%=item.text%></div>
                                <i></i>
                            </li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `)({cfg:t,items:n}));i.html(""),i.append(a),a.find("li.item").on("click",function(e){e.stopPropagation();e=x(this).find("i.bi");e.hasClass("bi-check-lg")?e.removeClass("bi-check-lg"):e.addClass("bi-check-lg")});i=a.find(".toolbar");function l(){var i=[];return x.each(a.find("li.item i.bi.bi-check-lg").closest("li"),function(e,t){i.push(x(t).attr("value"))}),i}return i.find("[cancel]").on("click",function(e){t.cancel.onCancel&&t.cancel.onCancel()}),i.find("[confirm]").on("click",function(e){t.confirm.onConfirm&&t.confirm.onConfirm(l())}),{select:function(e){(e=!x.isArray(e)?[e]:e).forEach(function(e){e=a.find("li.item[value='"+e+"']");e.find("i.bi").hasClass("bi-check-lg")||e.find("i.bi").addClass("bi-check-lg")})},values:l}}});
//# sourceMappingURL=jquery.prac.com.m.form.js.map