!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(y,k,e){y.fn.uploader=function(p){var u=y(this);p=p||{};p=y.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,i){return!0},type:function(e,i){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"8rem",accept:"*",onSuccess:function(e,i,t){return e},onError:function(e,i,t){return{code:e.status,msg:e.responseText}}},p),u.hasClass("uploader")||u.addClass("uploader");var f={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},v={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},m=`
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
        `,b=`
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
        `,x=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded image">
                    <img src="<%=path%>" />
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `,g=`
            <div class="file" style="width:<%=width%>" count>
                <div class="uploaded">
                    <i class="bi <%=icon%>"></i>
                    <span><%=name%></span>
                </div>
                <div class="remove">
                    <i class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        `,w=`
            <div id="<%=id%>" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                <div class="carousel-indicators">
                    <%_.each(images, function(image, i) {%>
                    <button type="button" data-bs-target="#<%=id%>" data-bs-slide-to="<%=i%>"<% if (i == selected) { %> class="active"<% } %>></button>
                    <% }); %>
                </div>
                <div class="carousel-inner">
                    <%_.each(images, function(image, i) {%>
                    <div class="carousel-item<% if (i == selected) { %> active<% } %>">
                        <img src="<%=image.path%>" class="d-block w-100">
                    </div>
                    <% }); %>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#<%=id%>" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#<%=id%>" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;return function a(){var t=y(k.template(m)({width:p.width,accept:p.accept}));u.append(t);var e=t.find("input[type='file']");var n;e.on("change",function(e){var i=e.originalEvent.target.files;0<i.length&&(e=i[0],(i=o(e,t.index()))&&s(e,i))});function l(e){var i=e.type,t=f[i];return t||(e=i.split("/")[0]+"/*",t=(t=f[e])||"file"),{name:t,originalType:i}}function o(e,i){if(p.validation.size(e.size,i)){e=l(e);if(p.validation.type(e,i))return e}}function s(e,a){var i=new FormData;i.append(p.fieldName,e),y.ajax({url:p.url,type:"POST",data:i,contentType:!1,processData:!1,xhr:function(){r();var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var i;e.lengthComputable&&("percent"==p.progress&&(i=(e.loaded/e.total*100).toFixed(0)+"%",n.find("span").text(i)),p.onProgress&&p.onProgress(e.loaded,e.total))},!1),e},success:function(e,i,t){i=p.onSuccess(e,i,t);(t="image"==a.name?y(k.template(x)({width:p.width,path:i.path})):y(k.template(g)({width:p.width,icon:v[a.name],name:i.name}))).data("file",i),d(t),"image"==a.name&&t.find("div.uploaded").css("height",t.width())},error:function(e,i,t){p.onError(e,i,t);t=y(k.template(b)({error:p.text.failed}));d(t)}})}function d(e){n.after(e),n.remove(),(p.limit<=0||i()<p.limit)&&a(),e.find(".remove").on("click",function(){var e=y(this).closest(".file"),i=e.data("file"),t=e.index();e.remove(),0==u.find(".file[blank]").length&&a(),p.onRemove&&p.onRemove(i,t)}),p.onComplete&&p.onComplete(e.index()),c()}function r(){n=y(k.template(h)({width:p.width})),t.after(n),t.remove(),"text"==p.progress&&n.find("span").text(p.text.uploading)}function i(){return u.find(".file[count]").length}function c(){var i=u.find(".uploaded img");i.off("click"),i.on("click",function(){var t=[];y.each(i,function(e,i){y(i).attr("index",e),t.push({path:y(i).attr("src")})});var e=y(k.template(w)({id:"carousel-"+(new Date).getTime(),images:t,selected:parseInt(y(this).attr("index"))}));y.dialog("",e,{footer:!1})})}}(),{files:function(){var t=[];return y.each(u.find(".file"),function(e,i){i=y(i).data("file");i&&t.push(i)}),t}}}});
//# sourceMappingURL=jquery.prac.com.uploader.js.map