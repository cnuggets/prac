!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(g,x,e){g.fn.uploader=function(d){var s=g(this);d=d||{};d=g.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,i){return!0},type:function(e,i){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"8rem",accept:"*",data:[],preview:!1,onSuccess:function(e,i,t){return e},onError:function(e,i,t){return{code:e.status,msg:e.responseText}}},d),s.hasClass("uploader")||s.addClass("uploader");var r={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},c={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},l={".jpg":"image",".jpeg":"image",".png":"image",".svg":"image",".gif":"image",".xls":"excel",".xlsx":"excel",".doc":"word",".docx":"word",".ppt":"ppt",".pptx":"ppt",".pdf":"pdf",".mp4":"video",".webm":"video",".mp3":"audio",".wma":"audio",".html":"html",".xml":"xml",".txt":"txt"},e=`
            <div class="file" style="width:<%=width%>" blank>
                <i class="bi bi-cloud-upload-fill"></i>
                <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
            </div>
        `,p=`
            <div class="file" style="width:<%=width%>" count>
                <i class="bi bi-cloud-upload-fill"></i>
                <div class="uploading">
                    <div class="spinner-border text-light"></div>
                    <span>0%</span>
                </div>
            </div>
        `,f=`
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
        `,a=`
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
        `;function v(){var n,l=g(x.template(e)({width:d.width,accept:d.accept}));function o(e){n.after(e),n.remove(),(d.limit<=0||s.find(".file[count]").length<d.limit)&&v(),e.find(".remove").on("click",function(e){e.stopPropagation(),h(g(this))}),d.onComplete&&d.onComplete(e.index()),i()}s.append(l),l.find("input[type='file']").on("change",function(e){var i,a,t=e.originalEvent.target.files;0<t.length&&(e=function(e,i){if(d.validation.size(e.size,i)){e=function(e){var i=e.type,t=r[i];t||(e=i.split("/")[0]+"/*",t=(t=r[e])||"file");return{name:t,originalType:i}}(e);if(d.validation.type(e,i))return e}}(i=t[0],l.index()),t=i,i=d.beforeUpload?d.beforeUpload(t):t,e&&(i=i,a=e,(e=new FormData).append(d.fieldName,i),g.ajax({url:d.url,type:"POST",data:e,contentType:!1,processData:!1,xhr:function(){n=g(x.template(p)({width:d.width})),l.after(n),l.remove(),"text"==d.progress&&n.find("span").text(d.text.uploading);var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var i;e.lengthComputable&&("percent"==d.progress&&(i=(e.loaded/e.total*100).toFixed(0)+"%",n.find("span").text(i)),d.onProgress&&d.onProgress(e.loaded,e.total))},!1),e},success:function(e,i,t){i=d.onSuccess(e,i,t),t="image"==a.name?g(x.template(u)({width:d.width,path:i.path,preview:d.preview})):g(x.template(m)({width:d.width,icon:c[a.name],name:i.name,preview:d.preview}));t.data("file",i),o(t),"image"==a.name&&t.find("div.uploaded").css("height",t.width())},error:function(e,i,t){d.onError(e,i,t),o(g(x.template(f)({error:d.text.failed})))}})))})}function i(){var i=s.find(".uploaded img");i.off("click"),i.on("click",function(){var t=[];g.each(i,function(e,i){g(i).attr("index",e),t.push({path:g(i).attr("src")})});var e=g(x.template(a)({id:"carousel-"+(new Date).getTime(),images:t,selected:parseInt(g(this).attr("index"))}));g.dialog("",e,{footer:!1})})}function h(e){var i=e.closest(".file"),t=i.data("file"),e=i.index();i.remove(),0==s.find(".file[blank]").length&&v(),d.onRemove&&d.onRemove(t,e)}return d.data&&0<d.data.length?(d.data.forEach(function(e){var i,t,a,n;0==e.indexOf("data:image")?(a="",i="image"):(t=e.substring(e.lastIndexOf(".")),i=l[t],a=e.substring(e.lastIndexOf("/")+1)),"image"==i?n=g(x.template(u)({width:d.width,path:e,preview:d.preview})):(t=c[i=i||"file"],a=e.substring(e.lastIndexOf("/")+1),(n=g(x.template(m)({width:d.width,icon:t,name:a,preview:d.preview}))).on("click",function(){window.location.href=e})),n.data("file",{name:a,path:e}),n.find(".remove").on("click",function(e){e.stopPropagation(),h(g(this))}),s.append(n),"image"==i&&n.find("div.uploaded").css("height",n.width())}),i(),d.preview||(d.limit<=0||d.data.length<d.limit)&&v()):d.preview||v(),{files:function(){var t=[];return g.each(s.find(".file"),function(e,i){i=g(i).data("file");i&&t.push(i)}),t}}}});
//# sourceMappingURL=jquery.prac.com.uploader.js.map