!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","async"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(y,x,e,k){y.fn.uploader=function(e){var i=y(this);e=y.extend(!0,{},{icon:"bi-cloud-upload-fill"},e=e||{});var b={"application/vnd.ms-excel":"excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel","application/msword":"word","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"word","application/vnd.ms-powerpoint":"ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt","application/pdf":"pdf","image/*":"image","video/*":"video","audio/*":"audio","text/html":"html","text/xml":"xml","text/plain":"txt"},g={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark",directory:"bi-folder",image:"bi-image"},o={".jpg":"image",".jpeg":"image",".png":"image",".svg":"image",".gif":"image",".xls":"excel",".xlsx":"excel",".doc":"word",".docx":"word",".ppt":"ppt",".pptx":"ppt",".pdf":"pdf",".mp4":"video",".webm":"video",".mp3":"audio",".wma":"audio",".html":"html",".xml":"xml",".txt":"txt"};function w(e){var i=e.type,t=b[i];return t||(e=i.split("/")[0]+"/*",t=(t=b[e])||"file"),{name:t,originalType:i}}return(e.dragdrop?function(l,s){var e={en:{or:"or",title:"Drag and Drop files to upload",browse:{label:"Browse files"},confirm:{title:"File already exists, do you want to replace the existing files?",label:{cancel:"Cancel",confirm:"Replace files"}}},zh:{or:"或者",title:"拖拽文件到这里上传",browse:{label:"选择文件"},confirm:{title:"文件已经存在，确认要覆盖存在的文件吗?",label:{cancel:"取消",confirm:"确认"}}}},i={lang:"en",url:"/upload",fieldName:"files",validation:{size:function(e){return!0}},limit:0,accept:"*",allowDownload:!1,beforeUpload:function(e){},onSuccess:function(e,i,t){return e},onError:function(e,i,t){return{code:e.status,msg:e.responseText}},onDelete:function(e,i,t){console.log("delete file",e,"path is",i,"type is",t)}},e=e[s.lang]||e.en;s=y.extend(!0,{},i,e,s),l.hasClass("dd-uploader")||l.addClass("dd-uploader");var o=`
                <div class="file" name="<%=name%>" path="<%=path%>">
                    <div class="name">
                        <i class="bi <%=icon%>"></i>
                        <div><%=name%></div>
                    </div>
                    <div class="progress">
                        <div class="completed bg-success"></div>
                    </div>
                    <div class="op">
                        <a href="javascript:void(0)" style="display:none" delete parent="<%=parent%>" name="<%=name%>" path="<%=path%>" type="<%=type%>">
                            <i class="bi bi-x-circle"></i>
                        </a>
                        <% if (allowDownload) { %>
                            <a href="javascript:void(0)" style="display:none" download>
                                <i class="bi bi-download"></i>
                            </a>
                        <% } %>
                    </div>
                </div>
            `,a=`
                <div class="list" sub>
                    <%_.each(files, function(file, i) {%>
                        <div class="file" name="<%=file.name%>" <% if (file.type == "directory") { %> path="<%=file.path%>" <% } %>>
                            <div class="name">
                                <i class="bi <%=icons[file.type]%>"></i>
                                <div><%=file.name%></div>
                            </div>
                            <div class="progress" style="background-color: #fff">
                            </div>
                            <div class="op">
                                <a href="javascript:void(0)" delete parent="<%=parent%>" name="<%=file.name%>" path="<%=file.path%>" type="<%=file.type%>">
                                    <i class="bi bi-x-circle"></i>
                                </a>
                                <% if (allowDownload) { %>
                                    <a href="javascript:void(0)" style="display:none" download>
                                        <i class="bi bi-download"></i>
                                    </a>
                                <% } %>
                            </div>
                        </div>
                    <% }); %>
                </div>
            `,n=`
                <div class="path" path="<%=path%>">
                    <a href="javascript:void(0)"><%=name%></a>/
                </div>
            `,e=y(x.template(`
                <div class="init">
                    <div class="drop-area">
                        <i class="bi bi-cloud-upload"></i>
                        <label><%=title%></label>
                    </div>
                    <div class="selection"><%=or%></div>
                    <div class="browse">
                        <button type="button" class="btn btn-secondary"><%=browse.label%></button>
                        <input type="file" name="<%=fieldName%>" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> multiple />
                    </div>
                </div>
            `)(s));e.find("input[type='file']").on("change",function(e){var i=e.originalEvent.target.files;0<i.length&&p();for(var t=0;t<i.length;t++)f(i[t])}),l.append(e);var d="/",c={};function r(e){if(!s.accept||"*"==s.accept)return 1;e=e.type;if(e==s.accept)return 1;e=e.split("/")[0]+"/*";return!(!b[e]||e!=s.accept)}function p(){var e;l.find(".init").is(":visible")&&(l.find(".init").hide(),e=y(x.template(`
                <div class="select">
                    <div class="folder">
                        <div class="path" path="/">
                            <a href="javascript:void(0)">Home</a>/
                        </div>
                    </div>
                    <div class="select-file">
                        <button type="button" class="btn btn-secondary btn-sm"><%=browse.label%></button>
                        <input type="file" name="<%=fieldName%>" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> multiple />
                    </div>
                </div>
                <hr/>
                <div class="list" root>
                </div>
            `)(s)),l.append(e),e.show(),e.find("input[type='file']").on("change",function(e){for(var i=e.originalEvent.target.files,t=0;t<i.length;t++)f(i[t])}),e.find(".path").on("click",function(){h(y(this).attr("path")),y(this).nextAll("div.path").remove()}))}function f(e){u({name:e.name,type:w(e).name,path:e.name,size:e.size},[{obj:e,path:e.name}])}function u(e,i){!function i(e,t){c[e]||(c[e]=[]);c[e].push({name:t.name,path:t.path,size:t.size,type:t.type});t.children&&t.children.forEach(function(e){i(t.path,e)})}(d,e);var a=y(x.template(o)({name:e.name,path:e.path||e.name,type:e.type,icon:g[e.type],parent:"/",allowDownload:s.allowDownload}));l.find(".list").append(a),"directory"==e.type&&a.find(".name").on("click",function(){h(y(this).closest(".file").attr("path"))});var t=new FormData,n=0;i.forEach(function(e){n+=e.obj.size,t.append(s.fieldName,e.obj,e.path)}),s.validation.size(n)&&(s.beforeUpload(t,n),y.ajax({url:s.url,type:"POST",data:t,contentType:!1,processData:!1,xhr:function(){var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){e.lengthComputable&&(e=(e.loaded/e.total*100).toFixed(0)+"%",a.find(".completed").removeClass("bg-danger").addClass("bg-success").css("width",e))},!1),e},success:function(e,i,t){a.find(".op [delete]").show(),v(a),s.onSuccess(e,i,t)},error:function(e,i,t){a.find(".completed").removeClass("bg-success").addClass("bg-danger"),s.onError(e,i,t)}}))}function v(e){e.find(".op [delete]").on("click",function(){var t=y(this),e=c[t.attr("parent")],a=-1;if(e&&e.forEach(function(e,i){e.path==t.attr("path")&&(a=i)}),0<=a&&e.splice(a,1),"directory"==t.attr("type")){var i,n=t.attr("path");for(i in delete c[t.attr("path")],c)0==i.indexOf(n)&&delete c[i]}t.closest(".file").remove(),s.onDelete(t.attr("name"),t.attr("path"),t.attr("type"))})}function m(e,i){var s=[],t=[];!function t(a,n,i,o){var l={name:a.name};a.isFile?a.file(function(e){r(e)&&(i.push(l),s.push({obj:e,path:n+e.name}),l.type=w(e).name,l.size=e.size,l.path=n+e.name),o()}):a.isDirectory&&(i.push(l),l.type="directory",l.path=n+a.name,l.children=[],a.createReader().readEntries(function(e){k.each(e,function(e,i){t(e,n+a.name+"/",l.children,function(){i()})},function(e){o()})}))}(e,"",t,function(){i(s,t[0])})}function h(e){var i,t;e==d?(l.find(".list[root]").show(),l.find(".list[sub]").remove()):!c[e]||(i=c[e])&&(l.find(".list[sub]").remove(),t=e.substring(e.lastIndexOf("/")+1),t=y(x.template(n)({name:t,path:e})),l.find(".select .folder").append(t),t.on("click",function(){h(y(this).attr("path")),y(this).nextAll("div.path").remove()}),l.find(".list[root]").hide(),e=y(x.template(a)({files:i,parent:e,icons:g,allowDownload:s.allowDownload})),l.append(e),v(e.find(".file")),e.find(".file[path] .name").on("click",function(){h(y(this).closest(".file").attr("path"))}))}return c[d]=[],l.on("dragenter",function(e){e.preventDefault(),e.stopPropagation()}),l.on("dragleave",function(e){e.preventDefault(),e.stopPropagation()}),l.on("dragover",function(e){e.preventDefault(),e.stopPropagation()}),l.on("drop",function(e){e.preventDefault(),e.stopPropagation(),p(),h(d);for(var i=e.originalEvent.dataTransfer.items,t=0;t<i.length;t++){var a=i[t].webkitGetAsEntry(),n=l.find(".list .file[name='"+a.name+"']");function o(){a.isFile?a.file(function(e){r(e)&&f(e)}):a.isDirectory&&m(a,function(e,i){u(i,e)})}0<n.length?function(e){var i=y(x.template(`
                    <div class="confirm">
                        <div class="detail">
                            <div class="title"><%=title%></div>
                            <div class="op">
                                <button type="button" class="btn btn-outline-secondary btn-sm" cancel><%=label.cancel%></button>
                                <button type="button" class="btn btn-primary btn-sm" confirm><%=label.confirm%></button>
                            </div>
                        </div>
                    </div>
                `)(s.confirm));i.find("button[cancel]").on("click",function(){i.remove()}),i.find("button[confirm]").on("click",function(){i.remove(),e()}),l.append(i)}(function(){n.remove(),o()}):o()}}),{total:function(){var e,i=0;for(e in c)c[e].forEach(function(e){"directory"!=e.type&&i++});return i}}}:function(s,d){d=y.extend(!0,{},{url:"/upload",fieldName:"file",validation:{size:function(e,i){return!0},type:function(e,i){return!0}},limit:0,progress:"percent",text:{uploading:"uploading...",failed:"upload failed"},width:"8rem",accept:"*",data:[],preview:!1,onSuccess:function(e,i,t){return e},onError:function(e,i,t){return{code:e.status,msg:e.responseText}}},d),s.hasClass("uploader")||s.addClass("uploader");var e=`
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
            `,r=`
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
            `,p=`
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
            `,f=`
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
            `;d.data&&0<d.data.length?(d.data.forEach(function(e){var i,t,a,n;0==e.indexOf("data:image")?(a="",i="image"):(t=e.substring(e.lastIndexOf(".")),i=o[t],a=e.substring(e.lastIndexOf("/")+1)),"image"==i?n=y(x.template(p)({width:d.width,path:e,preview:d.preview})):(t=g[i=i||"file"],a=e.substring(e.lastIndexOf("/")+1),(n=y(x.template(f)({width:d.width,icon:t,name:a,preview:d.preview}))).on("click",function(){window.location.href=e})),n.data("file",{name:a,path:e}),n.find(".remove").on("click",function(e){e.stopPropagation(),v(y(this))}),s.append(n),"image"==i&&n.find("div.uploaded").css("height",n.width())}),i(),d.preview||(d.limit<=0||d.data.length<d.limit)&&u()):d.preview||u();function u(){var n,o=y(x.template(e)({width:d.width,accept:d.accept,icon:d.icon}));function l(e){n.after(e),n.remove(),(d.limit<=0||s.find(".file[count]").length<d.limit)&&u(),e.find(".remove").on("click",function(e){e.stopPropagation(),v(y(this))}),d.onComplete&&d.onComplete(e.index()),i()}s.append(o),o.find("input[type='file']").on("change",function(e){var t,i=e.originalEvent.target.files;0<i.length&&(e=i[0],(t=function(e,i){if(d.validation.size(e.size,i)){e=w(e);if(d.validation.type(e,i))return e}}(e,o.index()))&&(i=e,e=function(e){var i,a;i=e,a=t,(e=new FormData).append(d.fieldName,i),y.ajax({url:d.url,type:"POST",data:e,contentType:!1,processData:!1,xhr:function(){n=y(x.template(c)({width:d.width,icon:d.icon})),o.after(n),o.remove(),"text"==d.progress&&n.find("span").text(d.text.uploading);var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){var i;e.lengthComputable&&("percent"==d.progress&&(i=(e.loaded/e.total*100).toFixed(0)+"%",n.find("span").text(i)),d.onProgress&&d.onProgress(e.loaded,e.total))},!1),e},success:function(e,i,t){i=d.onSuccess(e,i,t),t="image"==a.name?y(x.template(p)({width:d.width,path:i.path,preview:d.preview})):y(x.template(f)({width:d.width,icon:g[a.name],name:i.name,preview:d.preview}));t.data("file",i),l(t),"image"==a.name&&t.find("div.uploaded").css("height",t.width())},error:function(e,i,t){d.onError(e,i,t),l(y(x.template(r)({error:d.text.failed,icon:d.icon})))}})},d.beforeUpload?d.beforeUpload(i,e):e(i)))})}function i(){var i=s.find(".uploaded img");i.off("click"),i.on("click",function(){var t=[];y.each(i,function(e,i){y(i).attr("index",e),t.push({path:y(i).attr("src")})});var e=y(x.template(a)({id:"carousel-"+(new Date).getTime(),images:t,selected:parseInt(y(this).attr("index"))}));y.dialog("",e,{footer:!1})})}function v(e){var i=e.closest(".file"),t=i.data("file"),e=i.index();i.remove(),0==s.find(".file[blank]").length&&u(),d.onRemove&&d.onRemove(t,e)}return{files:function(){var t=[];return y.each(s.find(".file"),function(e,i){i=y(i).data("file");i&&t.push(i)}),t}}})(i,e)}});
//# sourceMappingURL=jquery.prac.com.uploader.js.map