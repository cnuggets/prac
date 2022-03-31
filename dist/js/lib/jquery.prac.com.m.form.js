!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment","async","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(b,x,e,y,u){b.fn.picker=function(a,o){var e=b(this);o=o||{};if(1==(o=b.extend(!0,{},{columns:1,height:"260px",title:"Please select",toolbar:!0,cancel:{label:"Cancel",class:"secondary"},confirm:{label:"Confirm",class:"primary"}},o)).columns)return new c(e,a,o);var s=b(x.template(`
                <div class="p-pickers">
                    <div class="toolbar">
                        <a href="javascript:void(0)" class="text-<%=cfg.cancel.class%>" cancel><%=cfg.cancel.label%></a>
                        <label class="title"><%=cfg.title%></label>
                        <a href="javascript:void(0)" class="text-<%=cfg.confirm.class%>" confirm><%=cfg.confirm.label%></a>
                    </div>
                    <div class="columns"></div>
                </div>
            `)({cfg:o}));e.append(s);var l=[];function r(e){var t,n=[];for(t in e)n.push({value:t,text:e[t]});return n}o.cascade?a.forEach(function(e,t){var n=b('<div class="column"></div>');s.find(".columns").append(n);var i=b.extend(!0,{},o,{toolbar:!1,onChange:function(e){t+1<a.length&&l[t+1].setData(r(a[t+1][e]))}});0==t?l.push(new c(n,r(e),i)):l.push(new c(n,r(e[l[t-1].value()]),i))}):a.forEach(function(e,t){var n=b('<div class="column"></div>');s.find(".columns").append(n);t=b.extend(!0,{},o,{column:t,toolbar:!1});l.push(new c(n,e,t))});e=s.find(".toolbar");return e.find("[cancel]").on("click",function(){o.cancel.onCancel&&o.cancel.onCancel()}),e.find("[confirm]").on("click",function(){var n;o.confirm.onConfirm&&(n=[],l.forEach(function(e,t){n[t]=e.value()}),o.confirm.onConfirm(n))}),{select:function(){for(var e=0;e<arguments.length;e++)l[e].select(arguments[e])},pickers:function(){return l}};function c(e,t,n){var s;function i(e){if(s=[],b.isArray(e))e.forEach(function(e){"string"==typeof e||"number"==typeof e?s.push({value:e,text:e}):s.push(e)});else for(var t in e)s.push({value:t,text:e[t]})}i(t);var a=b(x.template(`
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
            `)({cfg:n,items:s}));e.html(""),e.append(a);var l,o,t=a.find(".wrapper"),r=t.find(".items"),e=t.find(".mask"),c=t.find(".selected-frame").outerHeight(),f=(t.height()-c)/2;e.css("background-size","100% "+f+"px");var d,u,m=f,p=!1;function v(){o=f-(s.length-1)*c,l=f,r.css("transform","translateY("+f+"px)"),r.css("transition","none")}v(),t.bindDragMove(function(e,t){e.preventDefault(),p=!0,d=t.y},function(e,t,n){t=t.y-d,!p||(t=l+t)>=f-s.length*c&&t<=f+c&&(r.css("transform","translateY("+t+"px)"),r.css("transition","none"))},function(e,t,n){u=t.y,.8<n.y?(n=n.y,p&&(n=Math.round(4*n),(n=l+(u<d?-n*c:n*c))<=o?n=o:m<=n&&(n=m),r.css("transform","translateY("+n+"px)"),r.css("transition","all 0.4s ease-out"),l=n,g())):function(){var e=r.css("transform");if(e&&!(e.indexOf(",")<=0)){var t=Number(e.split(",")[5].split(")")[0]),n=f-(s.length-1)*c,e=f;if(t<=n)t=n;else if(e<=t)t=e;else for(var i=0;i<s.length;i++){var a,o=f-i*c;i+1<s.length&&((a=f-(i+1)*c)<=t&&t<=o&&(t=o-t<t-a?o:a))}r.css("transform","translateY("+t+"px)"),r.css("transition","all 0.2s ease-out"),l=t,g()}}(),p=!1}),t.bindMouseWheel(function(e,t){!function(e){e=l+e/120*c;e<=o?e=o:m<=e&&(e=m);r.css("transform","translateY("+e+"px)"),r.css("transition","all 0.2s"),l=e,g()}(t)});var h=0<s.length?s[0].value:"";function g(){var e=Math.round((f-l)/c);r.find("li").removeAttr("selected");e=r.find("li").eq(e);e.attr("selected","true");e=e.attr("value");n.onChange&&h!=e&&n.onChange(e,n.column),h=e}a=a.find(".toolbar");return a.find("[cancel]").on("click",function(e){n.cancel.onCancel&&n.cancel.onCancel()}),a.find("[confirm]").on("click",function(e){n.confirm.onConfirm&&n.confirm.onConfirm(h)}),{select:function(n){var i=0;s.forEach(function(e,t){e.value==n&&(i=t)}),l=f-i*c,r.css("transform","translateY("+l+"px)"),r.css("transition","all 0.2s linear"),g()},setData:function(e){i(e),r.html(""),r.append(x.template(`
                    <%_.each(items, function(item) {%>
                        <li value="<%=item.value%>"><%=item.text%></li>
                    <% }); %>
                `)({items:s})),v(),g()},value:function(){return h}}}},b.fn.datePicker=function(a){var e=b(this);a=a||{};var t,n=new Date,i={type:"ymd",year:{scope:[n.getFullYear(),n.getFullYear()+4],formatter:void 0},month:{formatter:void 0},date:{formatter:void 0}},o=(a=b.extend(!0,{},i,a)).year.scope[0],s=a.year.scope[1],l=[],r=[];function c(){for(var e=[],t=o;t<=s;t++){var n=String(t);a.year.formatter?e.push({value:n,text:a.year.formatter(n)}):e.push(n),t==o&&l.push(n)}return e}function f(){for(var e=[],t=1;t<=12;t++){var n=u(t);a.month.formatter?e.push({value:n,text:a.month.formatter(n)}):e.push(n),t==t&&l.push(n)}return e}function d(){for(var e=[],t=1;t<=31;t++){var n=u(t);a.date.formatter?e.push({value:n,text:a.date.formatter(n)}):e.push(n),t==t&&l.push(n),r.push(n)}return e}function u(e){return e<10?"0"+e:String(e)}"ymd"==a.type?(m=3,t=[c(),f(),d()]):"ym"==a.type?(m=2,t=[c(),f()]):"md"==a.type&&(m=2,t=[f(),d()]);var m=b.extend(!0,{},a,{columns:m,onChange:function(e,t){{var n,i;"ymd"==a.type?(v=l[2],l[t]=e,(0==t&&"02"==l[1]||1==t)&&(n=String(new Date(parseInt(l[0]),parseInt(l[1]),0).getDate()),i=h(r.slice(0,r.indexOf(n)+1)),p[2].setData(i),p[2].select(n<v?n:v))):"md"==a.type&&(v=l[1],l[t]=e,0==t&&(n=String(new Date(2024,parseInt(l[0]),0).getDate()),i=h(r.slice(0,r.indexOf(n)+1)),p[1].setData(i),p[1].select(n<v?n:v)))}},confirm:{onConfirm:function(e){a.confirm&&a.confirm.onConfirm&&a.confirm.onConfirm(e)}}}),m=e.picker(t,m),p=m.pickers();"ymd"==a.type?(p[0].select(u(n.getFullYear())),p[1].select(u(n.getMonth()+1)),p[2].select(u(n.getDate()))):"ym"==a.type?(p[0].select(u(n.getFullYear())),p[1].select(u(n.getMonth()+1))):"md"==a.type&&(p[0].select(u(n.getMonth()+1)),p[1].select(u(n.getDate())));var v=r[0];function h(e){var t=[];return a.date.formatter?e.forEach(function(e){t.push({value:e,text:a.date.formatter(e)})}):t=e,t}return m},b.fn.timePicker=function(i){var e=b(this);i=i||{};var t=new Date,a=(i=b.extend(!0,{},{type:"hms",hour:{scope:[0,23],formatter:void 0},minute:{formatter:void 0},second:{formatter:void 0}},i)).hour.scope[0],o=i.hour.scope[1];function n(){for(var e=[],t=a;t<=o;t++){var n=r(t);i.hour.formatter?e.push({value:n,text:i.hour.formatter(n)}):e.push(n)}return e}function s(){for(var e=[],t=0;t<=59;t++){var n=r(t);i.minute.formatter?e.push({value:n,text:i.minute.formatter(n)}):e.push(n)}return e}function l(){for(var e=[],t=0;t<=59;t++){var n=r(t);i.second.formatter?e.push({value:n,text:i.second.formatter(n)}):e.push(n)}return e}function r(e){return e<10?"0"+e:String(e)}"hms"==i.type?(c=3,f=[n(),s(),l()]):"hm"==i.type?(c=2,f=[n(),s()]):"ms"==i.type&&(c=2,f=[s(),l()]);var c=b.extend(!0,{},i,{columns:c,confirm:{onConfirm:function(e){i.confirm&&i.confirm.onConfirm&&i.confirm.onConfirm(e)}}}),f=e.picker(f,c),c=f.pickers();return"hms"==i.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes())),c[2].select(r(t.getSeconds()))):"hm"==i.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes()))):"ms"==i.type&&(c[0].select(r(t.getMinutes())),c[1].select(r(t.getSeconds()))),f},b.fn.calendar=function(c){var e=b(this);c=c||{};var f=new Date,t={title:"Date Select",class:"primary",range:!1,multiple:!1,confirm:{label:"Confirm",onConfirm:function(){}},week:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDay:0},month:{format:"YYYY-MM"},scope:[new Date(f.getFullYear(),f.getMonth(),1),new Date(f.getFullYear(),f.getMonth()+7,0)]},d="object"==typeof(c=b.extend(!0,{},t,c)).scope[0]?c.scope[0]:new Date(c.scope[0]),u="object"==typeof c.scope[1]?c.scope[1]:new Date(c.scope[1]),n=12*(u.getFullYear()-d.getFullYear())+(u.getMonth()-d.getMonth())+1,i=d.getMonth(),t=c.week.days,m=c.week.firstDay;0<m&&(a=t.slice(0,m),t=t.slice(m).concat(a));for(var a=b(x.template(`
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
        `)({currentMonth:y(d).format(c.month.format),days:t,cfg:c})),p=a.find(".body"),o=a.find(".current-month"),t=a.find("button[confirm]"),s=0;s<n;s++)!function(e,t,n){for(var i=new Date(e,t,1),a=new Date(e,t+1,0),o=i.getDay()-m,s=b(x.template(`
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
            `)({today:new Date(f.getFullYear(),f.getMonth(),f.getDate()),from:d,to:u,year:e,month:t,moment:y,lastDate:a.getDate(),cfg:c})),l=1;l<=o;l++){var r=b("<li></li>");s.prepend(r)}p.append(s);t=y(new Date(e,t)).format(c.month.format),e=b('<div class="next-month"></div>');e.attr("month",t),0==n?e.css("height",0):e.text(t);s.before(e)}((v=new Date(d.getFullYear(),i+s,1)).getFullYear(),v.getMonth(),s);e.append(a),0<p.find("li.selected").length&&g(p.find("li.selected").eq(0).closest(".month"));var l=p.find(".next-month"),r=(p.outerHeight()-p.height())/2;p.scroll(function(e){b.each(l,function(e,t){b(t).position().top<=-r&&o.text(b(t).attr("month"))})});var v=p.find("li[value]:not(.disabled)");function h(e,t){e.addClass("selected").addClass("bg-"+c.class),t&&e.addClass(t)}function g(e){p.animate({scrollTop:e.position().top},10)}return v.on("click",function(){var e,i,a,o;c.range?0!=(e=p.find("li.selected")).length&&2!=e.length&&b(this).attr("value")>e.attr("value")?(h(b(this),"end"),i=p.find("li.selected"),a=i.css("background-color"),o=a.replace(")",", 0.2)"),b.each(v,function(e,t){var n=b(t).attr("value");n&&n>i.eq(0).attr("value")&&n<i.eq(1).attr("value")&&b(t).css("color",a).css("background-color",o)})):(v.removeClass(),v.removeAttr("style"),h(b(this),"begin")):c.multiple?(b(this).hasClass("selected")?b(this).removeClass():h(b(this)),b.each(v,function(e,t){0<e&&(v.eq(e-1).hasClass("selected")?b(t).addClass("right"):b(t).removeClass("right")),e<v.length-1&&(v.eq(e+1).hasClass("selected")?b(t).addClass("left"):b(t).removeClass("left"))})):(v.removeClass(),h(b(this)))}),t.on("click",function(){var n,e;c.confirm.onConfirm&&(n=[],e=p.find("li.selected"),b.each(e,function(e,t){n.push(new Date(b(t).attr("value")))}),c.multiple&&0==n.length||c.range&&2!=n.length||(1==n.length?c.confirm.onConfirm(c.multiple?n:n[0]):c.confirm.onConfirm(n)))}),{select:function(e){if(e){if(c.range){if(!b.isArray(e)||e.length<2)return}else b.isArray(e)||(e=[e]);p.find("li:not(.disabled)").removeClass(),e.forEach(function(e){!function(e){"object"==typeof e&&(e=y(e).format("YYYY-MM-DD"));console.log(e),p.find("li[value='"+e+"']").trigger("click")}(e)});e=e[0];"object"==typeof e&&(e=y(e).format("YYYY-MM-DD")),g(p.find("li[value='"+e+"']").closest(".month"))}}}},b.fn.form=function(c){c=c||{};c=b.extend(!0,{},{validations:{},submit:{btn:null,onSubmit:null},cancel:{btn:null,onCancel:null}},c);var f=b(this),e=(e=c.submit.btn)||f.find("[p-submit]"),t=c.cancel.btn;function d(e,t){var n;0<e.siblings(".loading").length||(e.closest(".control").removeClass("is-valid").removeClass("is-invalid"),n=b('<div class="loading"></div>'),e.after(n),t(function(e){e.siblings(".loading").remove()}))}return t=t||f.find("[p-cancel]"),e.on("click",function(t){f.hasClass("validated")||f.addClass("validated"),function(e,t){var a=!0;function n(e){var t=e.val(),n=e.attr("pattern");e.attr("required")?(0==t.length?r:l)(e):n&&(t.match(new RegExp(n))?l:r)(e)}function i(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?r:l)(e)}b.each(e.find("input[type='text'],input[type='password'],input[type='number'],textarea"),function(e,t){n(b(t)),b(t).on("change",function(){n(b(this))})}),b.each(e.find("select"),function(e,t){i(b(t)),b(t).on("change",function(){i(b(this))})});var o={};function s(){for(var e in o){var t,e=o[e];0!=e.length&&(t=!1,e.forEach(function(e){e.is(":checked")&&(t=!0)}),(t?l:r)(e[0]))}}function l(e){e.closest(".control").removeClass("is-invalid").addClass("is-valid")}function r(e,t){a=!1,t&&e.closest(".control").find(".msg.invalid").text(t),e.closest(".control").removeClass("is-valid").addClass("is-invalid")}b.each(e.find("input[type='checkbox'][required]"),function(e,t){var n=b(t).attr("name");o[n]||(o[n]=[]),o[n].push(b(t)),b(t).on("change",function(){s()})}),s(),b.isEmptyObject(c.validations)?t(a):function(){var e=Object.keys(c.validations);function i(i,a){var e=c.validations[i.attr("validation")];d(i,function(n){e(i,function(e,t){e?l(i):r(i,t),n(i),a&&a()})})}u.each(e,function(e,t){var n=f.find("[validation='"+e+"']");n.off("change"),n.on("change",function(){i(b(this))});e=n.closest(".control");e.hasClass("is-valid")||e.hasClass("is-invalid")?(e.hasClass("is-invalid")&&(a=!1),t()):i(n,function(){t()})},function(){t(a)})}()}(f,function(e){function o(e,t){n[e]?(b.isArray(n[e])||(n[e]=[n[e]]),n[e].push(t)):n[e]=t}var n;e?c.submit.onSubmit&&c.submit.onSubmit((n={},b.each(f.find("input[name]"),function(e,t){var n=b(t),i=n.attr("name"),a=n.prop("type"),t=n.val();null==n.attr("p-integer")&&null==n.attr("p-decimal")||isNaN(t)||(t=Number(t)),("radio"!=a&&"checkbox"!=a||n.is(":checked"))&&o(i,t)}),b.each(f.find("textarea[name]"),function(e,t){t=b(t);o(t.attr("name"),t.val())}),b.each(f.find("select[name]"),function(e,t){var n=b(t),i=n.attr("name");b.each(n.find("option:selected",function(e,t){t=b(t).attr("value");null==n.attr("p-integer")&&null==n.attr("p-decimal")||isNaN(t)||(t=Number(t)),o(i,t)}))}),n)):(t.stopImmediatePropagation(),t.preventDefault())})}),t.on("click",function(e){f.removeClass("validated"),c.cancel.onCancel&&c.cancel.onCancel()}),{loading:d}},b.fn.rate=function(i){var e=b(this);i=i||{};i=b.extend(!0,{},{selected:0,half:!1,class:"warning",type:"star",count:5},i);e.html(""),e.append(b(x.template(`
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
        `)(i)));var a=i.selected;a>i.count&&(a=i.count);var n=i.half?.5:1,o=e.find("div.p-rate > div");function t(e,t){var n=Number(e.attr("value"));a=n,o.find("i").removeClass().addClass("bi").addClass("bi-"+i.type),b.each(o,function(e,t){Number(b(t).attr("value"))<n&&b(t).find("i").removeClass().addClass("bi").addClass("bi-"+i.type+"-fill").addClass("text-"+i.class)}),e.find("i").removeClass().addClass("bi").addClass("text-"+i.class),i.half?e.find("i").addClass("bi-"+i.type+"-"+e.attr("class")):e.find("i").addClass("bi-"+i.type+"-fill"),i.onChange&&!t&&i.onChange(a)}return b.each(o,function(e,t){e=(e+1)*n;i.half&&(e=e.toFixed(1)),b(t).attr("value",e)}),i.readonly||o.on("click",function(){a!=Number(b(this).attr("value"))&&t(b(this))}),0<a&&t(e.find("div[value='"+a+"']"),!0),{getValue:function(){return a}}},b.fn.uploader=function(s){var i=b(this);s=s||{};s=b.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,t){return!0},type:function(e,t){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"6rem",accept:"*",icon:"bi-cloud-upload-fill",onSuccess:function(e,t,n){return e},onError:function(e,t,n){return{code:e.status,msg:e.responseText}}},s),i.hasClass("p-file-upload")||i.addClass("p-file-upload");var l={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},r={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},e=`
            <div class="file" style="width:<%=width%>" blank>
                <i class="bi <%=icon%>"></i>
                <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
            </div>
        `,c=`
            <div class="file" style="width:<%=width%>" count>
                <i class="bi <%=icon%>"></i>
                <div class="uploading">
                    <div class="spinner-border text-light"></div>
                    <span>0%</span>
                </div>
            </div>
        `,f=`
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
        `,d=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded image">
                    <img src="<%=path%>" />
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `,u=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded">
                    <i class="bi <%=icon%>"></i>
                    <span><%=name%></span>
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `;function m(){var n,a=b(x.template(e)({width:s.width,accept:s.accept,icon:s.icon}));function o(e){var t;n.after(e),n.remove(),(s.limit<=0||i.find(".file[count]").length<s.limit)&&m(),e.find(".remove").on("click",function(){var e=b(this).closest(".file"),t=e.data("file"),n=e.index();e.remove(),0==i.find(".file[blank]").length&&m(),s.onRemove&&s.onRemove(t,n)}),s.onComplete&&s.onComplete(e.index()),(t=i.find(".uploaded img")).off("click"),t.on("click",function(){var n=[];b.each(t,function(e,t){b(t).attr("index",e),n.push({path:b(t).attr("src")})}),b.imagePreview(n).select(parseInt(b(this).attr("index")))})}i.append(a),a.find("input[type='file']").on("change",function(e){var i,t=e.originalEvent.target.files;0<t.length&&((t=function(e,t){if(s.validation.size(e.size,t)){e=function(e){var t=e.type,n=l[t];n||(e=t.split("/")[0]+"/*",n=(n=l[e])||"file");return{name:n,originalType:t}}(e);if(s.validation.type(e,t))return e}}(e=t[0],a.index()))?(e=e,i=t,(t=new FormData).append(s.fieldName,e),b.ajax({url:s.url,type:"POST",data:t,contentType:!1,processData:!1,xhr:function(){n=b(x.template(c)({width:s.width,icon:s.icon})),a.after(n),a.remove(),"text"==s.progress&&n.find("span").text(s.text.uploading);var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var t;e.lengthComputable&&("percent"==s.progress&&(t=(e.loaded/e.total*100).toFixed(0)+"%",n.find("span").text(t)),s.onProgress&&s.onProgress(e.loaded,e.total))},!1),e},success:function(e,t,n){t=s.onSuccess(e,t,n),n="image"==i.name?b(x.template(d)({width:s.width,path:t.path})):b(x.template(u)({width:s.width,icon:r[i.name],name:t.name}));n.data("file",t),o(n),"image"==i.name&&n.find("div.uploaded").css("height",n.width())},error:function(e,t,n){s.onError(e,t,n),o(b(x.template(f)({error:s.text.failed,icon:s.icon})))}})):b(this).val(null))})}return m(),{files:function(){var n=[];return b.each(i.find(".file"),function(e,t){t=b(t).data("file");t&&n.push(t)}),n},reset:function(){i.find(".file").remove(),m()}}},b.fn.slider=function(o){o=o||{};var i,a,s=(o=b.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},o)).default,e=b(this),t=e.attr("disabled"),l=b(x.template(`
            <div class="p-slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(o)),r=l.find(".progress-bar"),c=l.find(".btn");function n(){i=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=b("body").get(0));)e=e.offsetParent;return t}(l).left,a=i+l.width()}function f(e){s!=e&&(s=e,o.onChange(s));var t,n,i=(t=e,n=c.outerWidth()/2,n=(o.max-o.min)/l.width()*n,a(t-n)),e=a(e);function a(e){return(e-o.min)/(o.max-o.min)*100}c.css("left",i+"%"),r.css("width",e+"%")}function d(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return o.btn&&(r.parent().after(o.btn),c.remove(),(c=o.btn).css("position","relative").css("cursor","pointer")),e.append(l),t&&d(),c.css("top",-(c.outerHeight()/2+o.height/2+1)+"px"),n(),f(o.default),c.bindDragMove(function(e,t){e.preventDefault()},function(e,t,n){!function(e){a<(e=e<i?i:e)&&(e=a);var t=o.min+Math.round((o.max-o.min)/(a-i)*(e-i));if(1<o.step)for(var n=o.min;n<o.max&&t!=n;n+=o.step)if(n+o.step<=o.max&&n<t&&t<n+o.step){t=t-n>n+o.step-t?n+o.step:n;break}f(t)}(t.x)},function(e,t,n){}),e.on("touchstart",function(e){e.preventDefault()}),b(window).on("resize",function(){n(),f(s)}),b(window).on("p-resize",function(){n(),f(s)}),{setValue:function(e){f(e)},getValue:function(){return s},disable:d,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},b.fn.stepper=function(t){var n=b(this);t=t||{};t=b.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},t);var e=b(x.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:t}));0<=t.class.indexOf("outline-")&&n.addClass("border-"+t.class.split("outline-")[1]),n.val(t.default),n.css("text-align","center"),isNaN(t.min)||n.attr("min",t.min),isNaN(t.max)||n.attr("max",t.max),0<t.decimal?n.decimal():n.integer();var i=e.find("button:first-child"),a=e.find("button:last-child");i.on("click",function(){var e=Number(n.val());(null==t.min||e>Number(t.min))&&(0<t.decimal?n.val((e-t.step/10**t.decimal).toFixed(t.decimal)):n.val(e-t.step)).change()}),a.on("click",function(){var e=Number(n.val());(null==t.max||e<Number(t.max))&&(0<t.decimal?n.val((e+t.step/10**t.decimal).toFixed(t.decimal)):n.val(e+t.step)).change()}),n.on("change",function(){var e=Number(b(this).val());null!=t.min&&(e<=Number(t.min)?i.attr("disabled",!0):i.removeAttr("disabled")),null!=t.max&&(e>=Number(t.max)?a.attr("disabled",!0):a.removeAttr("disabled"))}),n.after(e),i.after(n)}});
//# sourceMappingURL=jquery.prac.com.m.form.js.map