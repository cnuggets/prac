!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(h,g,e){h.fn.uploader=function(o){var d=h(this);o=o||{};o=h.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,i){return!0},type:function(e,i){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"8rem",accept:"*",data:[],onSuccess:function(e,i,t){return e},onError:function(e,i,t){return{code:e.status,msg:e.responseText}}},o),d.hasClass("uploader")||d.addClass("uploader");var s={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},c={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},l={".jpg":"image",".jpeg":"image",".png":"image",".svg":"image",".gif":"image",".xls":"excel",".xlsx":"excel",".doc":"word",".docx":"word",".ppt":"ppt",".pptx":"ppt",".pdf":"pdf",".mp4":"video",".webm":"video",".mp3":"audio",".wma":"audio",".html":"html",".xml":"xml",".txt":"txt"},e=`
            <div class="file" style="width:<%=width%>" blank>
                <i class="bi bi-cloud-upload-fill"></i>
                <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
            </div>
        `,r=`
            <div class="file" style="width:<%=width%>" count>
                <i class="bi bi-cloud-upload-fill"></i>
                <div class="uploading">
                    <div class="spinner-border text-light"></div>
                    <span>0%</span>
                </div>
            </div>
        `,p=`
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
        `,f=`
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
        `;function m(){var t,n=h(g.template(e)({width:o.width,accept:o.accept}));function l(e){t.after(e),t.remove(),(o.limit<=0||d.find(".file[count]").length<o.limit)&&m(),e.find(".remove").on("click",function(e){e.stopPropagation(),v(h(this))}),o.onComplete&&o.onComplete(e.index()),i()}d.append(n),n.find("input[type='file']").on("change",function(e){var a,i=e.originalEvent.target.files;0<i.length&&((i=function(e,i){if(o.validation.size(e.size,i)){e=function(e){var i=e.type,t=s[i];t||(e=i.split("/")[0]+"/*",t=(t=s[e])||"file");return{name:t,originalType:i}}(e);if(o.validation.type(e,i))return e}}(e=i[0],n.index()))&&(e=e,a=i,(i=new FormData).append(o.fieldName,e),h.ajax({url:o.url,type:"POST",data:i,contentType:!1,processData:!1,xhr:function(){t=h(g.template(r)({width:o.width})),n.after(t),n.remove(),"text"==o.progress&&t.find("span").text(o.text.uploading);var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var i;e.lengthComputable&&("percent"==o.progress&&(i=(e.loaded/e.total*100).toFixed(0)+"%",t.find("span").text(i)),o.onProgress&&o.onProgress(e.loaded,e.total))},!1),e},success:function(e,i,t){i=o.onSuccess(e,i,t),t="image"==a.name?h(g.template(f)({width:o.width,path:i.path})):h(g.template(u)({width:o.width,icon:c[a.name],name:i.name}));t.data("file",i),l(t),"image"==a.name&&t.find("div.uploaded").css("height",t.width())},error:function(e,i,t){o.onError(e,i,t),l(h(g.template(p)({error:o.text.failed})))}})))})}function i(){var i=d.find(".uploaded img");i.off("click"),i.on("click",function(){var t=[];h.each(i,function(e,i){h(i).attr("index",e),t.push({path:h(i).attr("src")})});var e=h(g.template(a)({id:"carousel-"+(new Date).getTime(),images:t,selected:parseInt(h(this).attr("index"))}));h.dialog("",e,{footer:!1})})}function v(e){var i=e.closest(".file"),t=i.data("file"),e=i.index();i.remove(),0==d.find(".file[blank]").length&&m(),o.onRemove&&o.onRemove(t,e)}return o.data&&0<o.data.length?(o.data.forEach(function(e){var i,t=e.substring(e.lastIndexOf(".")),a=l[t],n=e.substring(e.lastIndexOf("/")+1);"image"==a?i=h(g.template(f)({width:o.width,path:e})):(t=c[a=a||"file"],n=e.substring(e.lastIndexOf("/")+1),(i=h(g.template(u)({width:o.width,icon:t,name:n}))).on("click",function(){window.location.href=e})),i.data("file",{name:n,path:e}),i.find(".remove").on("click",function(e){e.stopPropagation(),v(h(this))}),d.append(i),"image"==a&&i.find("div.uploaded").css("height",i.width())}),i(),(o.limit<=0||o.data.length<o.limit)&&m()):m(),{files:function(){var t=[];return h.each(d.find(".file"),function(e,i){i=h(i).data("file");i&&t.push(i)}),t}}}});
//# sourceMappingURL=jquery.prac.com.uploader.js.map