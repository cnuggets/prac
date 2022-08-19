!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment","async","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(b,x,e,y,u){b.fn.picker=function(a,l){var e=b(this);l=l||{};if(1==(l=b.extend(!0,{},{columns:1,height:"260px",title:"Please select",toolbar:!0,cancel:{label:"Cancel",class:"secondary"},confirm:{label:"Confirm",class:"primary"}},l)).columns)return new c(e,a,l);var s=b(x.template(`
                <div class="p-pickers">
                    <div class="toolbar">
                        <a href="javascript:void(0)" class="text-<%=cfg.cancel.class%>" cancel><%=cfg.cancel.label%></a>
                        <label class="title"><%=cfg.title%></label>
                        <a href="javascript:void(0)" class="text-<%=cfg.confirm.class%>" confirm><%=cfg.confirm.label%></a>
                    </div>
                    <div class="columns"></div>
                </div>
            `)({cfg:l}));e.append(s);var o=[];function r(e){var t,i=[];for(t in e)i.push({value:t,text:e[t]});return i}l.cascade?a.forEach(function(e,t){var i=b('<div class="column"></div>');s.find(".columns").append(i);var n=b.extend(!0,{},l,{toolbar:!1,onChange:function(e){t+1<a.length&&o[t+1].setData(r(a[t+1][e]))}});0==t?o.push(new c(i,r(e),n)):o.push(new c(i,r(e[o[t-1].value()]),n))}):a.forEach(function(e,t){var i=b('<div class="column"></div>');s.find(".columns").append(i);t=b.extend(!0,{},l,{column:t,toolbar:!1});o.push(new c(i,e,t))});e=s.find(".toolbar");return e.find("[cancel]").on("click",function(){l.cancel.onCancel&&l.cancel.onCancel()}),e.find("[confirm]").on("click",function(){var i;l.confirm.onConfirm&&(i=[],o.forEach(function(e,t){i[t]=e.value()}),l.confirm.onConfirm(i))}),{select:function(){for(var e=0;e<arguments.length;e++)o[e].select(arguments[e])},pickers:function(){return o}};function c(e,t,i){var s;function n(e){if(s=[],b.isArray(e))e.forEach(function(e){"string"==typeof e||"number"==typeof e?s.push({value:e,text:e}):s.push(e)});else for(var t in e)s.push({value:t,text:e[t]})}n(t);var a=b(x.template(`
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
            `)({cfg:i,items:s}));e.html(""),e.append(a);var o,l,t=a.find(".wrapper"),r=t.find(".items"),e=t.find(".mask"),c=t.find(".selected-frame").outerHeight(),f=(t.height()-c)/2;e.css("background-size","100% "+f+"px");var d,u,m=f,p=!1;function v(){l=f-(s.length-1)*c,o=f,r.css("transform","translateY("+f+"px)"),r.css("transition","none")}v(),t.bindDragMove(function(e,t){e.preventDefault(),p=!0,d=t.y},function(e,t,i){t=t.y-d,!p||(t=o+t)>=f-s.length*c&&t<=f+c&&(r.css("transform","translateY("+t+"px)"),r.css("transition","none"))},function(e,t,i){u=t.y,.8<i.y?(i=i.y,p&&(i=Math.round(4*i),(i=o+(u<d?-i*c:i*c))<=l?i=l:m<=i&&(i=m),r.css("transform","translateY("+i+"px)"),r.css("transition","all 0.4s ease-out"),o=i,g())):function(){var e=r.css("transform");if(e&&!(e.indexOf(",")<=0)){var t=Number(e.split(",")[5].split(")")[0]),i=f-(s.length-1)*c,e=f;if(t<=i)t=i;else if(e<=t)t=e;else for(var n=0;n<s.length;n++){var a,l=f-n*c;n+1<s.length&&((a=f-(n+1)*c)<=t&&t<=l&&(t=l-t<t-a?l:a))}r.css("transform","translateY("+t+"px)"),r.css("transition","all 0.2s ease-out"),o=t,g()}}(),p=!1}),t.bindMouseWheel(function(e,t){!function(e){e=o+e/120*c;e<=l?e=l:m<=e&&(e=m);r.css("transform","translateY("+e+"px)"),r.css("transition","all 0.2s"),o=e,g()}(t)});var h=0<s.length?s[0].value:"";function g(){var e=Math.round((f-o)/c);r.find("li").removeAttr("selected");e=r.find("li").eq(e);e.attr("selected","true");e=e.attr("value");i.onChange&&h!=e&&i.onChange(e,i.column),h=e}a=a.find(".toolbar");return a.find("[cancel]").on("click",function(e){i.cancel.onCancel&&i.cancel.onCancel()}),a.find("[confirm]").on("click",function(e){i.confirm.onConfirm&&i.confirm.onConfirm(h)}),{select:function(i){var n=0;s.forEach(function(e,t){e.value==i&&(n=t)}),o=f-n*c,r.css("transform","translateY("+o+"px)"),r.css("transition","all 0.2s linear"),g()},setData:function(e){n(e),r.html(""),r.append(x.template(`
                    <%_.each(items, function(item) {%>
                        <li value="<%=item.value%>"><%=item.text%></li>
                    <% }); %>
                `)({items:s})),v(),g()},value:function(){return h}}}},b.fn.datePicker=function(a){var e=b(this);a=a||{};var t,i=new Date,n={type:"ymd",year:{scope:[i.getFullYear(),i.getFullYear()+4],formatter:void 0},month:{formatter:void 0},date:{formatter:void 0}},l=(a=b.extend(!0,{},n,a)).year.scope[0],s=a.year.scope[1],o=[],r=[];function c(){for(var e=[],t=l;t<=s;t++){var i=String(t);a.year.formatter?e.push({value:i,text:a.year.formatter(i)}):e.push(i),t==l&&o.push(i)}return e}function f(){for(var e=[],t=1;t<=12;t++){var i=u(t);a.month.formatter?e.push({value:i,text:a.month.formatter(i)}):e.push(i),t==t&&o.push(i)}return e}function d(){for(var e=[],t=1;t<=31;t++){var i=u(t);a.date.formatter?e.push({value:i,text:a.date.formatter(i)}):e.push(i),t==t&&o.push(i),r.push(i)}return e}function u(e){return e<10?"0"+e:String(e)}"ymd"==a.type?(m=3,t=[c(),f(),d()]):"ym"==a.type?(m=2,t=[c(),f()]):"md"==a.type&&(m=2,t=[f(),d()]);var m=b.extend(!0,{},a,{columns:m,onChange:function(e,t){{var i,n;"ymd"==a.type?(v=o[2],o[t]=e,(0==t&&"02"==o[1]||1==t)&&(i=String(new Date(parseInt(o[0]),parseInt(o[1]),0).getDate()),n=h(r.slice(0,r.indexOf(i)+1)),p[2].setData(n),p[2].select(i<v?i:v))):"md"==a.type&&(v=o[1],o[t]=e,0==t&&(i=String(new Date(2024,parseInt(o[0]),0).getDate()),n=h(r.slice(0,r.indexOf(i)+1)),p[1].setData(n),p[1].select(i<v?i:v)))}},confirm:{onConfirm:function(e){a.confirm&&a.confirm.onConfirm&&a.confirm.onConfirm(e)}}}),m=e.picker(t,m),p=m.pickers();"ymd"==a.type?(p[0].select(u(i.getFullYear())),p[1].select(u(i.getMonth()+1)),p[2].select(u(i.getDate()))):"ym"==a.type?(p[0].select(u(i.getFullYear())),p[1].select(u(i.getMonth()+1))):"md"==a.type&&(p[0].select(u(i.getMonth()+1)),p[1].select(u(i.getDate())));var v=r[0];function h(e){var t=[];return a.date.formatter?e.forEach(function(e){t.push({value:e,text:a.date.formatter(e)})}):t=e,t}return m},b.fn.timePicker=function(n){var e=b(this);n=n||{};var t=new Date,a=(n=b.extend(!0,{},{type:"hms",hour:{scope:[0,23],formatter:void 0},minute:{formatter:void 0},second:{formatter:void 0}},n)).hour.scope[0],l=n.hour.scope[1];function i(){for(var e=[],t=a;t<=l;t++){var i=r(t);n.hour.formatter?e.push({value:i,text:n.hour.formatter(i)}):e.push(i)}return e}function s(){for(var e=[],t=0;t<=59;t++){var i=r(t);n.minute.formatter?e.push({value:i,text:n.minute.formatter(i)}):e.push(i)}return e}function o(){for(var e=[],t=0;t<=59;t++){var i=r(t);n.second.formatter?e.push({value:i,text:n.second.formatter(i)}):e.push(i)}return e}function r(e){return e<10?"0"+e:String(e)}"hms"==n.type?(c=3,f=[i(),s(),o()]):"hm"==n.type?(c=2,f=[i(),s()]):"ms"==n.type&&(c=2,f=[s(),o()]);var c=b.extend(!0,{},n,{columns:c,confirm:{onConfirm:function(e){n.confirm&&n.confirm.onConfirm&&n.confirm.onConfirm(e)}}}),f=e.picker(f,c),c=f.pickers();return"hms"==n.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes())),c[2].select(r(t.getSeconds()))):"hm"==n.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes()))):"ms"==n.type&&(c[0].select(r(t.getMinutes())),c[1].select(r(t.getSeconds()))),f},b.fn.calendar=function(c){var e=b(this);c=c||{};var f=new Date,t={title:"Date Select",class:"primary",range:!1,multiple:!1,confirm:{label:"Confirm",onConfirm:function(){}},week:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDay:0},month:{format:"YYYY-MM"},scope:[new Date(f.getFullYear(),f.getMonth(),1),new Date(f.getFullYear(),f.getMonth()+7,0)]},d="object"==typeof(c=b.extend(!0,{},t,c)).scope[0]?c.scope[0]:new Date(c.scope[0]),u="object"==typeof c.scope[1]?c.scope[1]:new Date(c.scope[1]),i=12*(u.getFullYear()-d.getFullYear())+(u.getMonth()-d.getMonth())+1,n=d.getMonth(),t=c.week.days,m=c.week.firstDay;0<m&&(a=t.slice(0,m),t=t.slice(m).concat(a));for(var a=b(x.template(`
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
        `)({currentMonth:y(d).format(c.month.format),days:t,cfg:c})),p=a.find(".body"),l=a.find(".current-month"),t=a.find("button[confirm]"),s=0;s<i;s++)!function(e,t,i){for(var n=new Date(e,t,1),a=new Date(e,t+1,0),l=n.getDay()-m,s=b(x.template(`
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
            `)({today:new Date(f.getFullYear(),f.getMonth(),f.getDate()),from:d,to:u,year:e,month:t,moment:y,lastDate:a.getDate(),cfg:c})),o=1;o<=l;o++){var r=b("<li></li>");s.prepend(r)}p.append(s);t=y(new Date(e,t)).format(c.month.format),e=b('<div class="next-month"></div>');e.attr("month",t),0==i?e.css("height",0):e.text(t);s.before(e)}((v=new Date(d.getFullYear(),n+s,1)).getFullYear(),v.getMonth(),s);e.append(a),0<p.find("li.selected").length&&g(p.find("li.selected").eq(0).closest(".month"));var o=p.find(".next-month"),r=(p.outerHeight()-p.height())/2;p.scroll(function(e){b.each(o,function(e,t){b(t).position().top<=-r&&l.text(b(t).attr("month"))})});var v=p.find("li[value]:not(.disabled)");function h(e,t){e.addClass("selected").addClass("bg-"+c.class),t&&e.addClass(t)}function g(e){p.animate({scrollTop:e.position().top},10)}return v.on("click",function(){var e,n,a,l;c.range?0!=(e=p.find("li.selected")).length&&2!=e.length&&b(this).attr("value")>e.attr("value")?(h(b(this),"end"),n=p.find("li.selected"),a=n.css("background-color"),l=a.replace(")",", 0.2)"),b.each(v,function(e,t){var i=b(t).attr("value");i&&i>n.eq(0).attr("value")&&i<n.eq(1).attr("value")&&b(t).css("color",a).css("background-color",l)})):(v.removeClass(),v.removeAttr("style"),h(b(this),"begin")):c.multiple?(b(this).hasClass("selected")?b(this).removeClass():h(b(this)),b.each(v,function(e,t){0<e&&(v.eq(e-1).hasClass("selected")?b(t).addClass("right"):b(t).removeClass("right")),e<v.length-1&&(v.eq(e+1).hasClass("selected")?b(t).addClass("left"):b(t).removeClass("left"))})):(v.removeClass(),h(b(this)))}),t.on("click",function(){var i,e;c.confirm.onConfirm&&(i=[],e=p.find("li.selected"),b.each(e,function(e,t){i.push(new Date(b(t).attr("value")))}),c.multiple&&0==i.length||c.range&&2!=i.length||(1==i.length?c.confirm.onConfirm(c.multiple?i:i[0]):c.confirm.onConfirm(i)))}),{select:function(e){if(e){if(c.range){if(!b.isArray(e)||e.length<2)return}else b.isArray(e)||(e=[e]);p.find("li:not(.disabled)").removeClass(),e.forEach(function(e){!function(e){"object"==typeof e&&(e=y(e).format("YYYY-MM-DD"));p.find("li[value='"+e+"']").trigger("click")}(e)});e=e[0];"object"==typeof e&&(e=y(e).format("YYYY-MM-DD")),g(p.find("li[value='"+e+"']").closest(".month"))}}}},b.fn.form=function(c){c=c||{};c=b.extend(!0,{},{validations:{},submit:{btn:null,onSubmit:null},cancel:{btn:null,onCancel:null}},c);var f=b(this),e=(e=c.submit.btn)||f.find("[p-submit]"),t=c.cancel.btn;function d(e,t){var i;0<e.siblings(".loading").length||(e.closest(".control").removeClass("is-valid").removeClass("is-invalid"),i=b('<div class="loading"></div>'),e.after(i),t(function(e){e.siblings(".loading").remove()}))}return t=t||f.find("[p-cancel]"),e.on("click",function(t){f.hasClass("validated")||f.addClass("validated"),function(e,t){var a=!0;function i(e){var t=e.val(),i=e.attr("pattern");e.attr("required")?(0==t.length?r:o)(e):i&&(t.match(new RegExp(i))?o:r)(e)}function n(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?r:o)(e)}b.each(e.find("input[type='text'],input[type='hidden'],input[type='password'],input[type='number'],textarea"),function(e,t){i(b(t)),b(t).on("change",function(){i(b(this))})}),b.each(e.find("select"),function(e,t){n(b(t)),b(t).on("change",function(){n(b(this))})});var l={};function s(){for(var e in l){var t,e=l[e];0!=e.length&&(t=!1,e.forEach(function(e){e.is(":checked")&&(t=!0)}),(t?o:r)(e[0]))}}function o(e){e.closest(".control").removeClass("is-invalid").addClass("is-valid")}function r(e,t){a=!1,t&&e.closest(".control").find(".msg.invalid").text(t),e.closest(".control").removeClass("is-valid").addClass("is-invalid")}b.each(e.find("input[type='checkbox'][required]"),function(e,t){var i=b(t).attr("name");l[i]||(l[i]=[]),l[i].push(b(t)),b(t).on("change",function(){s()})}),s(),b.isEmptyObject(c.validations)?t(a):function(){var e=Object.keys(c.validations);function n(n,a){var e=c.validations[n.attr("validation")];d(n,function(i){e(n,function(e,t){e?o(n):r(n,t),i(n),a&&a()})})}u.each(e,function(e,t){var i=f.find("[validation='"+e+"']");i.off("change"),i.on("change",function(){n(b(this))});e=i.closest(".control");e.hasClass("is-valid")||e.hasClass("is-invalid")?(e.hasClass("is-invalid")&&(a=!1),t()):n(i,function(){t()})},function(){t(a)})}()}(f,function(e){function l(e,t){i[e]?(b.isArray(i[e])||(i[e]=[i[e]]),i[e].push(t)):i[e]=t}var i;e?c.submit.onSubmit&&c.submit.onSubmit((i={},b.each(f.find("input[name]"),function(e,t){var i=b(t),n=i.attr("name"),a=i.prop("type"),t=i.val();null==i.attr("p-integer")&&null==i.attr("p-decimal")||isNaN(t)||(t=Number(t)),("radio"!=a&&"checkbox"!=a||i.is(":checked"))&&l(n,t)}),b.each(f.find("textarea[name]"),function(e,t){t=b(t);l(t.attr("name"),t.val())}),b.each(f.find("select[name]"),function(e,t){var i=b(t),n=i.attr("name");b.each(i.find("option:selected"),function(e,t){t=b(t).attr("value");null==i.attr("p-integer")&&null==i.attr("p-decimal")||isNaN(t)||(t=Number(t)),l(n,t)})}),i)):(t.stopImmediatePropagation(),t.preventDefault())})}),t.on("click",function(e){f.removeClass("validated"),c.cancel.onCancel&&c.cancel.onCancel()}),{loading:d}},b.fn.rate=function(n){var e=b(this);n=n||{};n=b.extend(!0,{},{selected:0,half:!1,class:"warning",type:"star",count:5},n);e.html(""),e.append(b(x.template(`
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
        `)(n)));var a=n.selected;a>n.count&&(a=n.count);var i=n.half?.5:1,l=e.find("div.p-rate > div");function t(e,t){var i=Number(e.attr("value"));a=i,l.find("i").removeClass().addClass("bi").addClass("bi-"+n.type),b.each(l,function(e,t){Number(b(t).attr("value"))<i&&b(t).find("i").removeClass().addClass("bi").addClass("bi-"+n.type+"-fill").addClass("text-"+n.class)}),e.find("i").removeClass().addClass("bi").addClass("text-"+n.class),n.half?e.find("i").addClass("bi-"+n.type+"-"+e.attr("class")):e.find("i").addClass("bi-"+n.type+"-fill"),n.onChange&&!t&&n.onChange(a)}return b.each(l,function(e,t){e=(e+1)*i;n.half&&(e=e.toFixed(1)),b(t).attr("value",e)}),n.readonly||l.on("click",function(){a!=Number(b(this).attr("value"))&&t(b(this))}),0<a&&t(e.find("div[value='"+a+"']"),!0),{getValue:function(){return a}}},b.fn.uploader=function(s){var o=b(this);s=s||{};s=b.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,t){return!0},type:function(e,t){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"6rem",accept:"*",icon:"bi-cloud-upload-fill",data:[],preview:!1,onSuccess:function(e,t,i){return e},onError:function(e,t,i){return{code:e.status,msg:e.responseText}}},s),o.hasClass("p-file-upload")||o.addClass("p-file-upload");var r={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},c={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},l={".jpg":"image",".jpeg":"image",".png":"image",".svg":"image",".gif":"image",".xls":"excel",".xlsx":"excel",".doc":"word",".docx":"word",".ppt":"ppt",".pptx":"ppt",".pdf":"pdf",".mp4":"video",".webm":"video",".mp3":"audio",".wma":"audio",".html":"html",".xml":"xml",".txt":"txt"},e=`
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
        `;function n(){var i,a=b(x.template(e)({width:s.width,accept:s.accept,icon:s.icon}));function l(e){i.after(e),i.remove(),(s.limit<=0||o.find(".file[count]").length<s.limit)&&n(),e.find(".remove").on("click",function(e){e.stopPropagation(),p(b(this))}),s.onComplete&&s.onComplete(e.index()),t()}o.append(a),a.find("input[type='file']").on("change",function(e){var n,t=e.originalEvent.target.files;0<t.length&&((t=function(e,t){if(s.validation.size(e.size,t)){e=function(e){var t=e.type,i=r[t];i||(e=t.split("/")[0]+"/*",i=(i=r[e])||"file");return{name:i,originalType:t}}(e);if(s.validation.type(e,t))return e}}(e=t[0],a.index()))?(e=e,n=t,(t=new FormData).append(s.fieldName,e),b.ajax({url:s.url,type:"POST",data:t,contentType:!1,processData:!1,xhr:function(){i=b(x.template(f)({width:s.width,icon:s.icon})),a.after(i),a.remove(),"text"==s.progress&&i.find("span").text(s.text.uploading);var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var t;e.lengthComputable&&("percent"==s.progress&&(t=(e.loaded/e.total*100).toFixed(0)+"%",i.find("span").text(t)),s.onProgress&&s.onProgress(e.loaded,e.total))},!1),e},success:function(e,t,i){t=s.onSuccess(e,t,i),i="image"==n.name?b(x.template(u)({width:s.width,path:t.path,preview:s.preview})):b(x.template(m)({width:s.width,icon:c[n.name],name:t.name,preview:s.preview}));i.data("file",t),l(i),"image"==n.name&&i.find("div.uploaded").css("height",i.width())},error:function(e,t,i){s.onError(e,t,i),l(b(x.template(d)({error:s.text.failed,icon:s.icon})))}})):b(this).val(null))})}function t(){var e=o.find(".uploaded img");e.off("click"),e.on("click",function(){var i=[];b.each(e,function(e,t){b(t).attr("index",e),i.push({path:b(t).attr("src")})}),b.imagePreview(i).select(parseInt(b(this).attr("index")))})}function p(e){var t=e.closest(".file"),i=t.data("file"),e=t.index();t.remove(),0==o.find(".file[blank]").length&&n(),s.onRemove&&s.onRemove(i,e)}return s.data&&0<s.data.length?(s.data.forEach(function(e){var t,i,n,a;0==e.indexOf("data:image")?(n="",t="image"):(i=e.substring(e.lastIndexOf(".")),t=l[i],n=e.substring(e.lastIndexOf("/")+1)),"image"==t?a=b(x.template(u)({width:s.width,path:e,preview:s.preview})):(i=c[t=t||"file"],n=e.substring(e.lastIndexOf("/")+1),(a=b(x.template(m)({width:s.width,icon:i,name:n,preview:s.preview}))).on("click",function(){window.location.href=e})),a.data("file",{name:n,path:e}),a.find(".remove").on("click",function(e){e.stopPropagation(),p(b(this))}),o.append(a),"image"==t&&a.find("div.uploaded").css("height",a.width())}),t(),s.preview||(s.limit<=0||s.data.length<s.limit)&&n()):s.preview||n(),{files:function(){var i=[];return b.each(o.find(".file"),function(e,t){t=b(t).data("file");t&&i.push(t)}),i},reset:function(){o.find(".file").remove(),n()}}},b.fn.slider=function(l){l=l||{};var n,a,s=(l=b.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},l)).default,e=b(this),t=e.attr("disabled"),o=b(x.template(`
            <div class="p-slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(l)),r=o.find(".progress-bar"),c=o.find(".btn");function i(){n=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=b("body").get(0));)e=e.offsetParent;return t}(o).left,a=n+o.width()}function f(e){s!=e&&(s=e,l.onChange(s));var t,i,n=(t=e,i=c.outerWidth()/2,i=(l.max-l.min)/o.width()*i,a(t-i)),e=a(e);function a(e){return(e-l.min)/(l.max-l.min)*100}c.css("left",n+"%"),r.css("width",e+"%")}function d(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return l.btn&&(r.parent().after(l.btn),c.remove(),(c=l.btn).css("position","relative").css("cursor","pointer")),e.append(o),t&&d(),c.css("top",-(c.outerHeight()/2+l.height/2+1)+"px"),i(),f(l.default),c.bindDragMove(function(e,t){e.preventDefault()},function(e,t,i){!function(e){a<(e=e<n?n:e)&&(e=a);var t=l.min+Math.round((l.max-l.min)/(a-n)*(e-n));if(1<l.step)for(var i=l.min;i<l.max&&t!=i;i+=l.step)if(i+l.step<=l.max&&i<t&&t<i+l.step){t=t-i>i+l.step-t?i+l.step:i;break}f(t)}(t.x)},function(e,t,i){}),e.on("touchstart",function(e){e.preventDefault()}),b(window).on("resize",function(){i(),f(s)}),b(window).on("p-resize",function(){i(),f(s)}),{setValue:function(e){f(e)},getValue:function(){return s},disable:d,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},b.fn.stepper=function(t){var i=b(this);t=t||{};t=b.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},t);var e=b(x.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:t}));0<=t.class.indexOf("outline-")&&i.addClass("border-"+t.class.split("outline-")[1]),i.val(t.default),i.css("text-align","center"),isNaN(t.min)||i.attr("min",t.min),isNaN(t.max)||i.attr("max",t.max),0<t.decimal?i.decimal():i.integer();var n=e.find("button:first-child"),a=e.find("button:last-child");n.on("click",function(){var e=Number(i.val());(null==t.min||e>Number(t.min))&&(0<t.decimal?i.val((e-t.step/10**t.decimal).toFixed(t.decimal)):i.val(e-t.step)).change()}),a.on("click",function(){var e=Number(i.val());(null==t.max||e<Number(t.max))&&(0<t.decimal?i.val((e+t.step/10**t.decimal).toFixed(t.decimal)):i.val(e+t.step)).change()}),i.on("change",function(){var e=Number(b(this).val());null!=t.min&&(e<=Number(t.min)?n.attr("disabled",!0):n.removeAttr("disabled")),null!=t.max&&(e>=Number(t.max)?a.attr("disabled",!0):a.removeAttr("disabled"))}),i.after(e),n.after(i)},b.fn.multiselect=function(e,t){var i=b(this);t=t||{};var n;t=b.extend(!0,{},{height:"260px",title:"Please select",toolbar:!0,class:"primary",cancel:{label:"Cancel",class:"secondary"},confirm:{label:"Confirm",class:"primary"}},t),function(e){if(n=[],b.isArray(e))e.forEach(function(e){"string"==typeof e||"number"==typeof e?n.push({value:e,text:e}):n.push(e)});else for(var t in e)n.push({value:t,text:e[t]})}(e);var a=b(x.template(`
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
        `)({cfg:t,items:n}));i.html(""),i.append(a),a.find("li.item").on("click",function(e){e.stopPropagation();e=b(this).find("i.bi");e.hasClass("bi-check-lg")?e.removeClass("bi-check-lg"):e.addClass("bi-check-lg")});i=a.find(".toolbar");function l(){var i=[];return b.each(a.find("li.item i.bi.bi-check-lg").closest("li"),function(e,t){i.push(b(t).attr("value"))}),i}return i.find("[cancel]").on("click",function(e){t.cancel.onCancel&&t.cancel.onCancel()}),i.find("[confirm]").on("click",function(e){t.confirm.onConfirm&&t.confirm.onConfirm(l())}),{select:function(e){(e=!b.isArray(e)?[e]:e).forEach(function(e){e=a.find("li.item[value='"+e+"']");e.find("i.bi").hasClass("bi-check-lg")||e.find("i.bi").addClass("bi-check-lg")})},values:l}}});
//# sourceMappingURL=jquery.prac.com.m.form.js.map