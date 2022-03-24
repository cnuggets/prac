!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","moment","async","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(y,C,e,g,u){y.fn.picker=function(i,s){var e=y(this);s=s||{};if(1==(s=y.extend(!0,{},{columns:1,height:"260px",title:"Please select",toolbar:!0,cancel:{label:"Cancel",class:"secondary"},confirm:{label:"Confirm",class:"primary"}},s)).columns)return new c(e,i,s);var o=y(C.template(`
                <div class="p-pickers">
                    <div class="toolbar">
                        <a href="javascript:void(0)" class="text-<%=cfg.cancel.class%>" cancel><%=cfg.cancel.label%></a>
                        <label class="title"><%=cfg.title%></label>
                        <a href="javascript:void(0)" class="text-<%=cfg.confirm.class%>" confirm><%=cfg.confirm.label%></a>
                    </div>
                    <div class="columns"></div>
                </div>
            `)({cfg:s}));e.append(o);var l=[];function r(e){var t,n=[];for(t in e)n.push({value:t,text:e[t]});return n}s.cascade?i.forEach(function(e,t){var n=y('<div class="column"></div>');o.find(".columns").append(n);var a=y.extend(!0,{},s,{toolbar:!1,onChange:function(e){t+1<i.length&&l[t+1].setData(r(i[t+1][e]))}});0==t?l.push(new c(n,r(e),a)):l.push(new c(n,r(e[l[t-1].value()]),a))}):i.forEach(function(e,t){var n=y('<div class="column"></div>');o.find(".columns").append(n);t=y.extend(!0,{},s,{column:t,toolbar:!1});l.push(new c(n,e,t))});e=o.find(".toolbar");return e.find("[cancel]").on("click",function(){s.cancel.onCancel&&s.cancel.onCancel()}),e.find("[confirm]").on("click",function(){var n;s.confirm.onConfirm&&(n=[],l.forEach(function(e,t){n[t]=e.value()}),s.confirm.onConfirm(n))}),{select:function(){for(var e=0;e<arguments.length;e++)l[e].select(arguments[e])},pickers:function(){return l}};function c(e,t,n){var o;function a(e){o=[],e.forEach(function(e){"string"==typeof e||"number"==typeof e?o.push({value:e,text:e}):o.push(e)})}a(t);var i=y(C.template(`
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
            `)({cfg:n,items:o}));e.html(""),e.append(i);var l,s,t=i.find(".wrapper"),r=t.find(".items"),e=t.find(".mask"),c=t.find(".selected-frame").outerHeight(),d=(t.height()-c)/2;e.css("background-size","100% "+d+"px");var f,u,m=d,p=!1;function v(){s=d-(o.length-1)*c,l=d,r.css("transform","translateY("+d+"px)"),r.css("transition","none")}v(),t.bindDragMove(function(e,t){e.preventDefault(),p=!0,f=t.y},function(e,t,n){t=t.y-f,!p||(t=l+t)>=d-o.length*c&&t<=d+c&&(r.css("transform","translateY("+t+"px)"),r.css("transition","none"))},function(e,t,n){u=t.y,.8<n.y?(n=n.y,p&&(n=Math.round(4*n),(n=l+(u<f?-n*c:n*c))<=s?n=s:m<=n&&(n=m),r.css("transform","translateY("+n+"px)"),r.css("transition","all 0.4s ease-out"),l=n,g())):function(){var e=r.css("transform");if(e&&!(e.indexOf(",")<=0)){var t=Number(e.split(",")[5].split(")")[0]),n=d-(o.length-1)*c,e=d;if(t<=n)t=n;else if(e<=t)t=e;else for(var a=0;a<o.length;a++){var i,s=d-a*c;a+1<o.length&&((i=d-(a+1)*c)<=t&&t<=s&&(t=s-t<t-i?s:i))}r.css("transform","translateY("+t+"px)"),r.css("transition","all 0.2s ease-out"),l=t,g()}}(),p=!1}),t.bindMouseWheel(function(e,t){!function(e){e=l+e/120*c;e<=s?e=s:m<=e&&(e=m);r.css("transform","translateY("+e+"px)"),r.css("transition","all 0.2s"),l=e,g()}(t)});var h=0<o.length?o[0].value:"";function g(){var e=Math.round((d-l)/c);r.find("li").removeAttr("selected");e=r.find("li").eq(e);e.attr("selected","true");e=e.attr("value");n.onChange&&h!=e&&n.onChange(e,n.column),h=e}i=i.find(".toolbar");return i.find("[cancel]").on("click",function(e){n.cancel.onCancel&&n.cancel.onCancel()}),i.find("[confirm]").on("click",function(e){n.confirm.onConfirm&&n.confirm.onConfirm(h)}),{select:function(n){var a=0;o.forEach(function(e,t){e.value==n&&(a=t)}),l=d-a*c,r.css("transform","translateY("+l+"px)"),r.css("transition","all 0.2s linear"),g()},setData:function(e){a(e),r.html(""),r.append(C.template(`
                    <%_.each(items, function(item) {%>
                        <li value="<%=item.value%>"><%=item.text%></li>
                    <% }); %>
                `)({items:o})),v(),g()},value:function(){return h}}}},y.fn.datePicker=function(i){var e=y(this);i=i||{};var t,n=new Date,a={type:"ymd",year:{scope:[n.getFullYear(),n.getFullYear()+4],formatter:void 0},month:{formatter:void 0},date:{formatter:void 0}},s=(i=y.extend(!0,{},a,i)).year.scope[0],o=i.year.scope[1],l=[],r=[];function c(){for(var e=[],t=s;t<=o;t++){var n=String(t);i.year.formatter?e.push({value:n,text:i.year.formatter(n)}):e.push(n),t==s&&l.push(n)}return e}function d(){for(var e=[],t=1;t<=12;t++){var n=u(t);i.month.formatter?e.push({value:n,text:i.month.formatter(n)}):e.push(n),t==t&&l.push(n)}return e}function f(){for(var e=[],t=1;t<=31;t++){var n=u(t);i.date.formatter?e.push({value:n,text:i.date.formatter(n)}):e.push(n),t==t&&l.push(n),r.push(n)}return e}function u(e){return e<10?"0"+e:String(e)}"ymd"==i.type?(m=3,t=[c(),d(),f()]):"ym"==i.type?(m=2,t=[c(),d()]):"md"==i.type&&(m=2,t=[d(),f()]);var m=y.extend(!0,{},i,{columns:m,onChange:function(e,t){{var n,a;"ymd"==i.type?(v=l[2],l[t]=e,(0==t&&"02"==l[1]||1==t)&&(n=String(new Date(parseInt(l[0]),parseInt(l[1]),0).getDate()),a=h(r.slice(0,r.indexOf(n)+1)),p[2].setData(a),p[2].select(n<v?n:v))):"md"==i.type&&(v=l[1],l[t]=e,0==t&&(n=String(new Date(2024,parseInt(l[0]),0).getDate()),a=h(r.slice(0,r.indexOf(n)+1)),p[1].setData(a),p[1].select(n<v?n:v)))}},confirm:{onConfirm:function(e){i.confirm&&i.confirm.onConfirm&&i.confirm.onConfirm(e)}}}),m=e.picker(t,m),p=m.pickers();"ymd"==i.type?(p[0].select(u(n.getFullYear())),p[1].select(u(n.getMonth()+1)),p[2].select(u(n.getDate()))):"ym"==i.type?(p[0].select(u(n.getFullYear())),p[1].select(u(n.getMonth()+1))):"md"==i.type&&(p[0].select(u(n.getMonth()+1)),p[1].select(u(n.getDate())));var v=r[0];function h(e){var t=[];return i.date.formatter?e.forEach(function(e){t.push({value:e,text:i.date.formatter(e)})}):t=e,t}return m},y.fn.timePicker=function(a){var e=y(this);a=a||{};var t=new Date,i=(a=y.extend(!0,{},{type:"hms",hour:{scope:[0,23],formatter:void 0},minute:{formatter:void 0},second:{formatter:void 0}},a)).hour.scope[0],s=a.hour.scope[1];function n(){for(var e=[],t=i;t<=s;t++){var n=r(t);a.hour.formatter?e.push({value:n,text:a.hour.formatter(n)}):e.push(n)}return e}function o(){for(var e=[],t=0;t<=59;t++){var n=r(t);a.minute.formatter?e.push({value:n,text:a.minute.formatter(n)}):e.push(n)}return e}function l(){for(var e=[],t=0;t<=59;t++){var n=r(t);a.second.formatter?e.push({value:n,text:a.second.formatter(n)}):e.push(n)}return e}function r(e){return e<10?"0"+e:String(e)}"hms"==a.type?(c=3,d=[n(),o(),l()]):"hm"==a.type?(c=2,d=[n(),o()]):"ms"==a.type&&(c=2,d=[o(),l()]);var c=y.extend(!0,{},a,{columns:c,confirm:{onConfirm:function(e){a.confirm&&a.confirm.onConfirm&&a.confirm.onConfirm(e)}}}),d=e.picker(d,c),c=d.pickers();return"hms"==a.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes())),c[2].select(r(t.getSeconds()))):"hm"==a.type?(c[0].select(r(t.getHours())),c[1].select(r(t.getMinutes()))):"ms"==a.type&&(c[0].select(r(t.getMinutes())),c[1].select(r(t.getSeconds()))),d},y.fn.calendar=function(c){var e=y(this);c=c||{};var d=new Date,t={title:"Date Select",class:"primary",range:!1,multiple:!1,confirm:{label:"Confirm",onConfirm:function(){}},week:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDay:0},month:{format:"YYYY-MM"},scope:[new Date(d.getFullYear(),d.getMonth(),1),new Date(d.getFullYear(),d.getMonth()+7,0)]},f="object"==typeof(c=y.extend(!0,{},t,c)).scope[0]?c.scope[0]:new Date(c.scope[0]),u="object"==typeof c.scope[1]?c.scope[1]:new Date(c.scope[1]),n=12*(u.getFullYear()-f.getFullYear())+(u.getMonth()-f.getMonth())+1,a=f.getMonth(),t=c.week.days,m=c.week.firstDay;0<m&&(i=t.slice(0,m),t=t.slice(m).concat(i));for(var i=y(C.template(`
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
        `)({currentMonth:g(f).format(c.month.format),days:t,cfg:c})),p=i.find(".body"),s=i.find(".current-month"),t=i.find("button[confirm]"),o=0;o<n;o++)!function(e,t,n){for(var a=new Date(e,t,1),i=new Date(e,t+1,0),s=a.getDay()-m,o=y(C.template(`
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
            `)({today:new Date(d.getFullYear(),d.getMonth(),d.getDate()),from:f,to:u,year:e,month:t,moment:g,lastDate:i.getDate(),cfg:c})),l=1;l<=s;l++){var r=y("<li></li>");o.prepend(r)}p.append(o);t=g(new Date(e,t)).format(c.month.format),e=y('<div class="next-month"></div>');e.attr("month",t),0==n?e.css("height",0):e.text(t);o.before(e)}((v=new Date(f.getFullYear(),a+o,1)).getFullYear(),v.getMonth(),o);e.append(i);var l=p.find(".next-month"),r=(p.outerHeight()-p.height())/2;p.scroll(function(e){y.each(l,function(e,t){y(t).position().top<=-r&&s.text(y(t).attr("month"))})});var v=p.find("li[value]:not(.disabled)");function h(e,t){e.addClass("selected").addClass("bg-"+c.class),t&&e.addClass(t)}v.on("click",function(){var e,a,i,s;c.range?0!=(e=p.find("li.selected")).length&&2!=e.length&&y(this).attr("value")>e.attr("value")?(h(y(this),"end"),a=p.find("li.selected"),i=a.css("background-color"),s=i.replace(")",", 0.2)"),y.each(v,function(e,t){var n=y(t).attr("value");n&&n>a.eq(0).attr("value")&&n<a.eq(1).attr("value")&&y(t).css("color",i).css("background-color",s)})):(v.removeClass(),v.removeAttr("style"),h(y(this),"begin")):c.multiple?(y(this).hasClass("selected")?y(this).removeClass():h(y(this)),y.each(v,function(e,t){0<e&&(v.eq(e-1).hasClass("selected")?y(t).addClass("right"):y(t).removeClass("right")),e<v.length-1&&(v.eq(e+1).hasClass("selected")?y(t).addClass("left"):y(t).removeClass("left"))})):(v.removeClass(),h(y(this)))}),t.on("click",function(){var n,e;c.confirm.onConfirm&&(n=[],e=p.find("li.selected"),y.each(e,function(e,t){n.push(new Date(y(t).attr("value")))}),c.multiple&&0==n.length||c.range&&2!=n.length||(1==n.length?c.confirm.onConfirm(c.multiple?n:n[0]):c.confirm.onConfirm(n)))})},y.fn.form=function(c){c=c||{};c=y.extend(!0,{},{validations:{},submit:{btn:null,onSubmit:null},cancel:{btn:null,onCancel:null}},c);var d=y(this),e=(e=c.submit.btn)||d.find("[p-submit]"),t=c.cancel.btn;function f(e,t){var n;0<e.siblings(".loading").length||(e.closest(".control").removeClass("is-valid").removeClass("is-invalid"),n=y('<div class="loading"></div>'),e.after(n),t(function(e){e.siblings(".loading").remove()}))}return t=t||d.find("[p-cancel]"),e.on("click",function(t){d.hasClass("validated")||d.addClass("validated"),function(e,t){var i=!0;function n(e){var t=e.val(),n=e.attr("pattern");e.attr("required")?(0==t.length?r:l)(e):n&&(t.match(new RegExp(n))?l:r)(e)}function a(e){var t;e.attr("required")&&(0==(t=e.find("option:selected")).length||1==t.length&&0==t.val().length?r:l)(e)}y.each(e.find("input[type='text'],input[type='password'],input[type='number']"),function(e,t){n(y(t)),y(t).on("change",function(){n(y(this))})}),y.each(e.find("select"),function(e,t){a(y(t)),y(t).on("change",function(){a(y(this))})});var s={};function o(){for(var e in s){var t,e=s[e];0!=e.length&&(t=!1,e.forEach(function(e){e.is(":checked")&&(t=!0)}),(t?l:r)(e[0]))}}function l(e){e.closest(".control").removeClass("is-invalid").addClass("is-valid")}function r(e,t){i=!1,t&&e.closest(".control").find(".msg.invalid").text(t),e.closest(".control").removeClass("is-valid").addClass("is-invalid")}y.each(e.find("input[type='checkbox'][required]"),function(e,t){var n=y(t).attr("name");s[n]||(s[n]=[]),s[n].push(y(t)),y(t).on("change",function(){o()})}),o(),y.isEmptyObject(c.validations)?t(i):function(){var e=Object.keys(c.validations);function a(a,i){var e=c.validations[a.attr("validation")];f(a,function(n){e(a,function(e,t){e?l(a):r(a,t),n(a),i&&i()})})}u.each(e,function(e,t){var n=d.find("[validation='"+e+"']");n.off("change"),n.on("change",function(){a(y(this))});e=n.closest(".control");e.hasClass("is-valid")||e.hasClass("is-invalid")?(e.hasClass("is-invalid")&&(i=!1),t()):a(n,function(){t()})},function(){t(i)})}()}(d,function(e){e?c.submit.onSubmit&&c.submit.onSubmit():(t.stopImmediatePropagation(),t.preventDefault())})}),t.on("click",function(e){d.removeClass("validated"),c.cancel.onCancel&&c.cancel.onCancel()}),{loading:f}},y.fn.rate=function(a){var e=y(this);a=a||{};a=y.extend(!0,{},{selected:0,half:!1,class:"warning",type:"star",count:5},a);e.html(""),e.append(y(C.template(`
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
        `)(a)));var i=a.selected;i>a.count&&(i=a.count);var n=a.half?.5:1,s=e.find("div.p-rate > div");function t(e,t){var n=Number(e.attr("value"));i=n,s.find("i").removeClass().addClass("bi").addClass("bi-"+a.type),y.each(s,function(e,t){Number(y(t).attr("value"))<n&&y(t).find("i").removeClass().addClass("bi").addClass("bi-"+a.type+"-fill").addClass("text-"+a.class)}),e.find("i").removeClass().addClass("bi").addClass("text-"+a.class),a.half?e.find("i").addClass("bi-"+a.type+"-"+e.attr("class")):e.find("i").addClass("bi-"+a.type+"-fill"),a.onChange&&!t&&a.onChange(i)}return y.each(s,function(e,t){e=(e+1)*n;a.half&&(e=e.toFixed(1)),y(t).attr("value",e)}),s.on("click",function(){i!=Number(y(this).attr("value"))&&t(y(this))}),0<i&&t(e.find("div[value='"+i+"']"),!0),{getValue:function(){return i}}},y.fn.uploader=function(f){var u=y(this);f=f||{};f=y.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,t){return!0},type:function(e,t){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"6rem",accept:"*",onSuccess:function(e,t,n){return e},onError:function(e,t,n){return{code:e.status,msg:e.responseText}}},f),u.hasClass("p-file-upload")||u.addClass("p-file-upload");var m={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},p={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},v=`
            <div class="file" style="width:<%=width%>" blank>
                <i class="bi bi-cloud-upload-fill"></i>
                <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
            </div>
        `,h=`
            <div class="file" style="width:<%=width%>" count>
                <i class="bi bi-cloud-upload-fill"></i>
                <div class="uploading">
                    <div class="spinner-border text-light"></div>
                    <span>0%</span>
                </div>
            </div>
        `,g=`
            <div class="file" style="width:<%=width%>" count>
                <i class="bi bi-cloud-upload-fill"></i>
                <div class="failed">
                    <i class="bi bi-x-circle"></i>
                    <span><%=error%></span>
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `,b=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded image">
                    <img src="<%=path%>" />
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `,x=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded">
                    <i class="bi <%=icon%>"></i>
                    <span><%=name%></span>
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `;return function a(){var n=y(C.template(v)({width:f.width,accept:f.accept}));u.append(n);var e=n.find("input[type='file']");var i;e.on("change",function(e){var t=e.originalEvent.target.files;0<t.length&&(e=t[0],(t=o(e,n.index()))?l(e,t):y(this).val(null))});function s(e){var t=e.type,n=m[t];return n||(e=t.split("/")[0]+"/*",n=(n=m[e])||"file"),{name:n,originalType:t}}function o(e,t){if(f.validation.size(e.size,t)){e=s(e);if(f.validation.type(e,t))return e}}function l(e,a){var t=new FormData;t.append(f.fieldName,e),y.ajax({url:f.url,type:"POST",data:t,contentType:!1,processData:!1,xhr:function(){c();var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var t;e.lengthComputable&&("percent"==f.progress&&(t=(e.loaded/e.total*100).toFixed(0)+"%",i.find("span").text(t)),f.onProgress&&f.onProgress(e.loaded,e.total))},!1),e},success:function(e,t,n){t=f.onSuccess(e,t,n);(n="image"==a.name?y(C.template(b)({width:f.width,path:t.path})):y(C.template(x)({width:f.width,icon:p[a.name],name:t.name}))).data("file",t),r(n),"image"==a.name&&n.find("div.uploaded").css("height",n.width())},error:function(e,t,n){f.onError(e,t,n);n=y(C.template(g)({error:f.text.failed}));r(n)}})}function r(e){i.after(e),i.remove(),(f.limit<=0||t()<f.limit)&&a(),e.find(".remove").on("click",function(){var e=y(this).closest(".file"),t=e.data("file"),n=e.index();e.remove(),0==u.find(".file[blank]").length&&a(),f.onRemove&&f.onRemove(t,n)}),f.onComplete&&f.onComplete(e.index()),d()}function c(){i=y(C.template(h)({width:f.width})),n.after(i),n.remove(),"text"==f.progress&&i.find("span").text(f.text.uploading)}function t(){return u.find(".file[count]").length}function d(){var t=u.find(".uploaded img");t.off("click"),t.on("click",function(){var n=[];y.each(t,function(e,t){y(t).attr("index",e),n.push({path:y(t).attr("src")})});var e=y.imagePreview(n);e.select(parseInt(y(this).attr("index")))})}}(),{files:function(){var n=[];return y.each(u.find(".file"),function(e,t){t=y(t).data("file");t&&n.push(t)}),n}}},y.fn.slider=function(s){s=s||{};var a,i,o=(s=y.extend(!0,{},{height:3,classes:[],min:0,max:100,default:0,step:1,onChange:function(e){}},s)).default,e=y(this),t=e.attr("disabled"),l=y(C.template(`
            <div class="p-slider">
                <div class="progress" style="height: <%=height%>px">
                    <div class="progress-bar<%_.each(classes, function(c) {%> <%=c%><% }); %>" role="progressbar"></div>
                </div>
                <div class="btn"></div>
            </div>
        `)(s)),r=l.find(".progress-bar"),c=l.find(".btn");function n(){a=function(e){e=e.get(0);var t={};for(t.left=e.offsetLeft,t.top=e.offsetTop;e.offsetParent&&(t.left=t.left+e.offsetParent.offsetLeft,t.top=t.top+e.offsetParent.offsetTop,e!=y("body").get(0));)e=e.offsetParent;return t}(l).left,i=a+l.width()}function d(e){o!=e&&(o=e,s.onChange(o));var t,n,a=(t=e,n=c.outerWidth()/2,n=(s.max-s.min)/l.width()*n,i(t-n)),e=i(e);function i(e){return(e-s.min)/(s.max-s.min)*100}c.css("left",a+"%"),r.css("width",e+"%")}function f(){t=!0,e.attr("disabled",!0),e.find(".progress-bar").css("opacity",.6)}return s.btn&&(r.parent().after(s.btn),c.remove(),(c=s.btn).css("position","relative").css("cursor","pointer")),e.append(l),t&&f(),c.css("top",-(c.outerHeight()/2+s.height/2+1)+"px"),n(),d(s.default),c.bindDragMove(function(e,t){e.preventDefault()},function(e,t,n){!function(e){i<(e=e<a?a:e)&&(e=i);var t=s.min+Math.round((s.max-s.min)/(i-a)*(e-a));if(1<s.step)for(var n=s.min;n<s.max&&t!=n;n+=s.step)if(n+s.step<=s.max&&n<t&&t<n+s.step){t=t-n>n+s.step-t?n+s.step:n;break}d(t)}(t.x)},function(e,t,n){}),e.on("touchstart",function(e){e.preventDefault()}),y(window).on("resize",function(){n(),d(o)}),y(window).on("p-resize",function(){n(),d(o)}),{setValue:function(e){d(e)},getValue:function(){return o},disable:f,enable:function(){t=!1,e.removeAttr("disabled"),e.find(".progress-bar").css("opacity","")}}},y.fn.stepper=function(t){var n=y(this);t=t||{};t=y.extend(!0,{},{class:"primary",default:0,step:1,decimal:0},t);var e=y(C.template(`
            <div class="input-group">
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-dash"></i></button>
                <button class="btn btn-<%=options.class%>" type="button"><i class="bi bi-plus-lg"></i></button>
            </div>
        `)({options:t}));0<=t.class.indexOf("outline-")&&n.addClass("border-"+t.class.split("outline-")[1]),n.val(t.default),n.css("text-align","center"),isNaN(t.min)||n.attr("min",t.min),isNaN(t.max)||n.attr("max",t.max),0<t.decimal?n.decimal():n.integer();var a=e.find("button:first-child"),i=e.find("button:last-child");a.on("click",function(){var e=Number(n.val());(null==t.min||e>Number(t.min))&&(0<t.decimal?n.val((e-t.step/10**t.decimal).toFixed(t.decimal)):n.val(e-t.step)).change()}),i.on("click",function(){var e=Number(n.val());(null==t.max||e<Number(t.max))&&(0<t.decimal?n.val((e+t.step/10**t.decimal).toFixed(t.decimal)):n.val(e+t.step)).change()}),n.on("change",function(){var e=Number(y(this).val());null!=t.min&&(e<=Number(t.min)?a.attr("disabled",!0):a.removeAttr("disabled")),null!=t.max&&(e>=Number(t.max)?i.attr("disabled",!0):i.removeAttr("disabled"))}),n.after(e),a.after(n)}});
//# sourceMappingURL=jquery.prac.com.m.form.js.map