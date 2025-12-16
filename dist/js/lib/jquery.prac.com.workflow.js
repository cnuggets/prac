!function(t){"function"==typeof define&&define.amd?define(["jquery","underscore","moment","common","component"],t):"object"==typeof exports?t(require("jquery")):t(jQuery)}(function(dt,at,rt){dt.fn.workflow=function(u){var e=dt(this),t={en:{text:{tooltip:{plus:"Click to Add / Drag and Drop to Connect",zoomIn:"Zoom In",zoomOut:"Zoom Out",addNode:"Add",tidyNode:"Tidy",more:"More",close:"Close"},contextMenu:{copy:"Copy",delete:"Delete"},btn:{save:"Save",run:"Run",stop:"Stop",deploy:"Deploy"},other:{autoSave:"Auto Saved At:"},errMsg:{inputRequired:"Input node is required",outputRequired:"Output node is required",nodeRequired:"<%=name%> node is required"}}},zh:{text:{tooltip:{plus:"点击添加节点或拖拽连接节点",zoomIn:"放大",zoomOut:"缩小",addNode:"添加节点",tidyNode:"整理节点",more:"更多",close:"关闭"},contextMenu:{copy:"复制",delete:"删除"},btn:{save:"保存",run:"运行",stop:"停止",deploy:"发布"},other:{autoSave:"自动保存于"},errMsg:{inputRequired:"缺少输入节点",outputRequired:"缺少输出节点",nodeRequired:"必须有一个<%=name%>节点"}}}},t=t[(u=u||{}).lang]||t.en;u=dt.extend(!0,{},{lang:"en",data:{},mode:"edit",topOffset:0,save:{disabled:!1,onSave:function(t,e){setTimeout(function(){e()},1e3)}},run:{disabled:!1,onRun:function(t,e){setTimeout(function(){e()},1e3)}},stop:{disabled:!1,onStop:function(t){setTimeout(function(){t()},1e3)}},deploy:{disabled:!1,onDeploy:function(t,e){setTimeout(function(){e()},1e3)}},autoSave:{enabled:!1,interval:60,ignoreError:!1,onSave:function(t,e){e()}},nodes:{start:{name:"Start",icon:{bi:"house-door",color:"#fff",bgColor:"primary"},input:{max:-1},output:{max:0},max:1,settings:{tpl:`
                            <div class="mb-3">
                                <textarea class="form-control" rows="3" name="description" placeholder="Description"></textarea>
                            </div>
                        `,bindEvent:function(t,e,i,n){},onChange:function(t,e){},data:function(t,e){return e}},disabled:!0},end:{name:"End",icon:{bi:"box2",color:"#fff",bgColor:"success"},input:{max:0},output:{max:-1},settings:{tpl:`
                            <div class="mb-3">
                                <textarea class="form-control" rows="3" name="description" placeholder="Description"></textarea>
                            </div>
                        `,bindEvent:function(t,e,i,n){},onChange:function(t,e){},data:function(t,e){return e}},max:1}},required:["start"]},t,u);var p=`
            <% 
                var node = opt.nodes[type];
            %>
            <div class="node" node-id="<%=id%>"<% if (type == "start") { %> start<% } %> type="<%=type%>" x="<%=x%>" y="<%=y%>" style="transform: translate(<%=x%>px, <%=y%>px);" parent-id="<%=parentId%>" level="<%=level%>" index="<%=index%>">
                <div class="header" header>
                    <div class="welding left"<% if (parentId) { %> style="display: block"<% } %> max="<%=node.input.max%>"<% if (type != "start") { %> required<% } %>></div>
                    <div class="content">
                        <div class="icon<% if (node.icon.bgColor) { %> bg-<%=node.icon.bgColor%><% } %>"<% if (node.icon.color) { %> style="color:<%=node.icon.color%>"<% } %>>
                            <i class="bi bi-<%=node.icon.bi%>"></i>
                        </div>
                        <div class="name"><%=node.name%></div>
                    </div>
                    <div class="waiting">
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div class="progress" progress></div>
                    <% if (node.output.max >= 0) { %>
                    <div class="welding right" max="<%=node.output.max%>"<% if (node.output.required) { %> required<% } %>></div>
                    <a class="plus" title="<%=opt.text.tooltip.plus%>" p-tooltip>
                        <i class="bi bi-plus-circle-fill"></i>
                    </a>
                    <% } %>
                </div>
                <% if (node.body) { %>
                <div class="body" body></div>
                <% } %>
                <div class="footer" description></div>
            </div>`,n=`
            <div class="error">
                <i class="bi bi-exclamation-circle"></i>
                <div class="msg"><%=msg%></div>
            </div>
        `;function v(t,e,i){var r=t,n={},s={};function o(t){t&&(s[t.nodeId()]=t)}function l(){return dt.extend(!0,{},n)}return e&&(n=dt.extend(!0,{},e)),o(i),{set:function(t,e){n[t]=e,W(r)},get:function(t){return n[t]},delete:function(t){delete n[t],W(r)},data:l,allData:function(t){var e,i,n,o={};if(t)for(var d in o=l(),s)for(e in i=s[d].allData(t)){var a=i[e];o[e]?(dt.isArray(o[e])||(o[e]=[o[e]]),dt.isArray(a)||(a=[a]),o[e]=o[e].concat(a).filter(function(t,e,i){return i.indexOf(t)===e})):o[e]=a}else for(var d in o[r]=l(),s)for(n in i=s[d].allData())o[n]=i[n];return o},nodeId:function(){return r},addParent:o,removeParent:function(t){delete s[t.nodeId()]},getParents:function(){return s},getParentData:function(){var t,e={};for(t in s){var i,n=s[t].data();for(i in n){var o=n[i];e[i]?(dt.isArray(e[i])||(e[i]=[e[i]]),dt.isArray(o)||(o=[o]),e[i]=e[i].concat(o).filter(function(t,e,i){return i.indexOf(t)===e})):e[i]=o}}return e}}}e.append(dt(at.template(`
            <div class="p-workflow">
                <div class="pane">
                    <div class="viewport">
                        <svg width="100%" height="100%"></svg>
                        <div class="menu">
                            <% _.each(Object.keys(opt.nodes), function(type) { 
                                var node = opt.nodes[type];
                                if (node.disabled) {
                                    return;
                                }
                            %>
                            <div class="item" type="<%=type%>">
                                <a href="javascript:void(0)">
                                    <div class="icon<% if (node.icon.bgColor) { %> bg-<%=node.icon.bgColor%><% } %>"<% if (node.icon.color) { %> style="color:<%=node.icon.color%>"<% } %>>
                                        <i class="bi bi-<%=node.icon.bi%>"></i>
                                    </div>
                                    <div class="name"><%=node.name%></div>
                                </a>
                            </div>
                            <% }); %>
                        </div>
                    </div>
                </div>
                <div class="zoom">
                    <a href="javascript:void(0)" zoom-out class="inout" title="<%=opt.text.tooltip.zoomOut%>" p-tooltip>
                        <i class="bi bi-zoom-out"></i>
                    </a>
                    <div class="scale" value="1">100%</div>
                    <a href="javascript:void(0)" zoom-in class="inout" title="<%=opt.text.tooltip.zoomIn%>" p-tooltip>
                        <i class="bi bi-zoom-in"></i>
                    </a>
                    <div class="select">
                        <div class="item" value="2">
                            <a href="javascript:void(0)">200%</a>
                        </div>
                        <div class="item" value="1.5">
                            <a href="javascript:void(0)">150%</a>
                        </div>
                        <div class="item" value="1">
                            <a href="javascript:void(0)">100%</a>
                        </div>
                        <div class="item" value="0.75">
                            <a href="javascript:void(0)">75%</a>
                        </div>
                        <div class="item" value="0.5">
                            <a href="javascript:void(0)">50%</a>
                        </div>
                        <div class="item" value="0.3">
                            <a href="javascript:void(0)">30%</a>
                        </div>
                    </div>
                </div>
                <div class="toolbar">
                    <% if (opt.mode == "edit") { %>
                    <div class="tool" add>
                        <a href="javascript:void(0)" title="<%=opt.text.tooltip.addNode%>">
                            <i class="bi bi-plus-circle-fill"></i>
                        </a>
                    </div>
                    <% } %>
                    <div class="tool" tidy>
                        <a href="javascript:void(0)" title="<%=opt.text.tooltip.tidyNode%>">
                            <i class="bi bi-layout-wtf"></i>
                        </a>
                    </div>
                    <div class="menu-add">
                        <% _.each(Object.keys(opt.nodes), function(type) { 
                            var node = opt.nodes[type];
                            if (node.disabled) {
                                return;
                            }
                        %>
                        <div class="item" type="<%=type%>">
                            <a href="javascript:void(0)">
                                <div class="icon<% if (node.icon.bgColor) { %> bg-<%=node.icon.bgColor%><% } %>"<% if (node.icon.color) { %> style="color:<%=node.icon.color%>"<% } %>>
                                    <i class="bi bi-<%=node.icon.bi%>"></i>
                                </div>
                                <div class="name"><%=node.name%></div>
                            </a>
                        </div>
                        <% }); %>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-header">
                        <div class="info">
                            <div class="icon">
                                <i class="bi"></i>
                            </div>
                            <div class="name"></div>
                        </div>
                        <div class="tools">
                            <div class="tools-ext"></div>
                            <div class="tools-fixed">
                                <div class="tool more" more>
                                    <a href="javascript:void(0)" title="<%=opt.text.tooltip.more%>" p-tooltip>
                                        <i class="bi bi-three-dots"></i>
                                    </a>
                                </div>
                                <div class="separator"></div>
                                <div class="tool close" close>
                                    <a href="javascript:void(0)" title="<%=opt.text.tooltip.close%>" p-tooltip>
                                        <i class="bi bi-x-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="settings">
                            <form class="g-3 needs-validation" onsubmit="return false;">
                                
                            </form>
                        </div>
                        <% if (opt.mode == "readonly") { %>
                        <div class="panel-overlay"></div>
                        <% } %>
                    </div>
                </div>

                <div class="topbar">
                    <div class="info">
                        <% if (opt.autoSave.enabled && opt.mode == "edit") { %>
                        <div class="auto-save-time">
                            <span><%=opt.text.other.autoSave%></span>
                            <span autoSaveTime></span>
                        </div>
                        <% } %>
                    </div>
                    <div class="tools">
                        <% if (opt.mode == "edit" && !opt.save.disabled) { %>
                        <button type="button" class="btn btn-light" save op>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-floppy"></i><%=opt.text.btn.save%>
                        </button>
                        <% } %>
                        <% if (opt.mode == "edit" && !opt.run.disabled) { %>
                        <button type="button" class="btn btn-light" run op>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-play"></i><%=opt.text.btn.run%>
                        </button>
                        <% } %>
                        <% if (!opt.stop.disabled) { %>
                        <button type="button" class="btn btn-light" stop<% if (opt.mode != "run") { %> style="display: none"<% } %>>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-stop-circle"></i><%=opt.text.btn.stop%>
                        </button>
                        <% } %>
                        <% if (opt.mode == "edit" && !opt.deploy.disabled) { %>
                        <button type="button" class="btn btn-light" deploy op>
                            <div class="spinner-border spinner-border-sm waiting" role="status" waiting>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <i class="bi bi-send"></i><%=opt.text.btn.deploy%>
                        </button>
                        <% } %>
                    </div>
                </div>

                <div class="menu-context">
                    <div class="item" copy>
                        <a href="javascript:void(0)"><%=opt.text.contextMenu.copy%></a>
                    </div>
                    <div class="item" delete>
                        <a href="javascript:void(0)"><%=opt.text.contextMenu.delete%></a>
                    </div>
                </div>

                <div class="settings-backup"></div>

                <div class="overlay"></div>
            </div>
            <div class="position-fixed top-0 end-0 p-3" style="z-index: 999">
                <div class="toast align-items-center text-white bg-danger border-0" data-bs-delay="5000" errmsg>
                    <div class="d-flex">
                        <div class="toast-body"></div>
                    </div>
                </div>
            </div>
        `)({opt:u})));var b={},i=e.find(".p-workflow"),h=e.find(".pane"),g=e.find(".viewport"),y=g.find("svg"),x=g.find(".menu"),o=e.find(".zoom"),t=e.find(".toolbar"),d=e.find(".menu-add"),w=e.find(".menu-context"),m=e.find(".panel"),$=e.find(".settings-backup"),a=e.find(".overlay");function r(){i.css("height",dt(window).height()-u.topOffset)}"run"==u.mode?m.css("top","10px"):"readonly"==u.mode&&m.find(".panel-body").on("scroll",function(){dt(this).find(".panel-overlay").css("top",dt(this).scrollTop()+"px")}),r(),dt(window).on("resize",function(){r()});var s,N={};function l(i){u.data=i,g.find(".node").remove(),y.find("path").remove(),m.find(".settings form").html(""),$.html("");var t,e=[];for(t in i)e.push(i[t]);e.sort(function(t,e){return t.level<e.level?-1:t.level>e.level?1:t.index-e.index}),e.forEach(function(t){L(t.type,t.nodeId,t.pos,t.parentId,t.level,t.index,t.settings,t.context),g.find(".node[type='start']").attr("start","")}),dt.each(g.find(".node"),function(t,l){var c,e=dt(l).attr("node-id"),f=g.find(".node[parent-id*='"+e+"']");0!=f.length&&(c=i[e].out,dt.each(dt(l).find(".plus"),function(t,e){var i,n,o,d=H(dt(e),!0),a=dt(e).prev(".welding.right"),r=dt(e).closest(".node").find(".welding.right").index(a),s=dt(e).closest(".node").attr("node-id");for(i in c)c[i]==r&&(n=F(o=function(t,o){var d;return dt.each(t,function(t,e){var i,n=dt(e).attr("node-id");for(i in u.data[n].in)if(i==o)return void(d=dt(e))}),d}(f,i),!0),nt(i,o,dt(l),{x:Number(o.attr("x")),y:Number(o.attr("y"))},d,n),N[s].out[i]=r,N[o.attr("node-id")].in[i]=r,z(a,"path-id",i),a.show(),z(o=o.find(".welding.left"),"path-id",i),o.show())}))})}function k(){g.find(".node").removeClass("error"),m.find(".errors").html(""),m.find(".errors").hide(),$.find(".errors").html(""),$.find(".errors").hide()}function c(o){o||k();var d=!0;dt.each($.children("[node-id]"),function(t,e){e=dt(e);dt.validate(e)||(d=!1,o||(e=e.attr("node-id"),g.find(".node[node-id='"+e+"']").addClass("error")))});var t=m.find(".settings [node-id]");if(0<t.length&&(dt.validate(t)||(d=!1,o||(t=t.attr("node-id"),g.find(".node[node-id='"+t+"']").addClass("error")))),!d)return d;function a(t){return dt(at.template(n)({msg:u.text.errMsg[t]}))}if(dt.each(g.find(".node"),function(t,i){var e=dt(i).find(".welding[required]"),n=dt(i).attr("node-id");dt.each(e,function(t,e){dt(e).attr("path-id")||(o||(dt(i).addClass("error"),e=dt(e).hasClass("left")?"inputRequired":"outputRequired",m.find(".settings [node-id='"+n+"'] .errors").append(a(e)).show(),$.find("[node-id='"+n+"'] .errors").append(a(e)).show()),d=!1)})}),!d)return d;for(var e=0;e<u.required.length;e++){var i=u.required[e];if(0==g.find(".node[type='"+i+"']").length)return o||(i=u.nodes[i].name,i=at.template(u.text.errMsg.nodeRequired)({name:i}),i=i,dt("[errmsg] .toast-body").text(i),dt("[errmsg]").toast("show")),void(d=!1)}return d}function f(){var c={};return dt.each(g.find(".node"),function(t,e){var i=dt(e).attr("node-id"),n=dt(e).attr("type"),o=dt(e).attr("parent-id"),d=Number(dt(e).attr("level")),a=Number(dt(e).attr("index")),r={x:Number(dt(e).attr("x")),y:Number(dt(e).attr("y"))},s=$.children("[node-id='"+i+"']"),l={};0<(s=0==s.length?m.find(".settings form [node-id='"+i+"']"):s).length&&(e=dt.formData(s),l=u.nodes[n].settings.data(s,e)),c[i]={nodeId:i,type:n,parentId:o,level:d,index:a,pos:r,out:N[i].out,in:N[i].in,settings:l,context:b[i].data()}}),c}function C(t,e){c()&&(a.show(),e.find("[waiting]").css("display","inline-block"),e.find("i").hide(),t(f(),function(){e.find("[waiting]").hide(),e.find("i").show(),a.hide()}))}function A(){u.autoSave.onSave(f(),function(){var t=rt().format("HH:mm:ss");e.find("[autoSaveTime]").text(t),e.find("[autoSaveTime]").closest(".auto-save-time").show()})}u.data&&l(u.data),e.find("[save]").on("click",function(){C(u.save.onSave,dt(this))}),e.find("[run]").on("click",function(){e.find("[op]").hide(),e.find("[stop]").show(),u.run.onRun(f(),function(){e.find("[op]").show(),e.find("[stop]").hide()})}),e.find("[stop]").on("click",function(){var t=dt(this);a.show(),t.find("[waiting]").css("display","inline-block"),t.find("i").hide(),u.stop.onStop(function(){a.hide(),e.find("[op]").show(),e.find("[stop]").hide(),t.find("[waiting]").css("display","none"),t.find("i").show()})}),e.find("[deploy]").on("click",function(){C(u.deploy.onDeploy,dt(this))}),u.autoSave.enabled&&(s=setInterval(function(){(u.autoSave.ignoreError||c(!0))&&A()},1e3*u.autoSave.interval));var j={x:0,y:0},P=!1;g.css("transform",`translate(${j.x}px, ${j.y}px) scale(1)`),g.attr("x",j.x).attr("y",j.y).attr("scale",1),h.bindDragMove(function(t,e,i){P=!0,h.addClass("dragging"),startPos=e,g.find(".node").removeAttr("dragging");var n=Number(g.attr("x")),o=Number(g.attr("y"));g.attr("sx",e.x-n),g.attr("sy",e.y-o)},function(t,e,i,n){var o=Number(g.attr("sx")),d=Number(g.attr("sy")),o=e.x-o,e=e.y-d,d=g.attr("scale");h.css("background-position",o+`px ${e}px`),g.css("transform",`translate(${o}px, ${e}px) scale(${d})`),g.attr("x",o).attr("y",e)},function(t,e,i){P&&(P=!1,h.removeClass("dragging"))});var S,M,D=100,q=40;function E(t){return t+"_"+(new Date).getTime()}function z(t,e,i){var n=t.attr(e);(n=n?n.split(","):[]).push(i),t.attr(e,n.join(","))}function O(t,e,i){var n=t.attr(e);!n||0<=(i=(n=n.split(",")).indexOf(i))&&(n.splice(i,1),t.attr(e,n.join(",")))}function I(t,e){return 0<g.find(".node[x='"+t+"'][y='"+e+"']").length?I(t+20,e+40):{x:t,y:e}}function R(t,e,i){var n=Number(e.attr("max"));if(n<=0)return!0;var o="in"==i?"left":"right",d=t.attr("node-id"),a=t.find(".welding."+o).index(e),r=0;if(N[d])for(var s in N[d][i])N[d][i][s]==a&&r++;return!(n<=r)}function T(t,e){return R(t,e,"out")}function _(t){t&&t.attr("path-id")&&0<t.attr("path-id").length&&t.show()}function L(t,e,i,n,o,d,a,r){var s=u.nodes[t];if(!(0<s.max&&g.find(".node[type='"+t+"']").length>=s.max)){var l,d=dt(at.template(p)({id:e,x:i.x,y:i.y,parentId:n,level:o,index:d,type:t,opt:u}));s.body&&("string"==typeof s.body?d.find(".body").html(s.body):d.find(".body").append(s.body)),N[e]={in:{},out:{}},x.before(d),"run"!=u.mode&&"readonly"!=u.mode||(d.find(".header").on("mouseover",function(){dt(this).find(".plus").hide()}),d.find(".body").on("mouseover",function(){dt(this).find(".plus").hide()})),a&&a.description&&(d.find("[description]").text(a.description),d.find("[description]").show()),Z(d),(s=d).on("click",function(t){if(t.stopPropagation(),!dt(this).attr("dragging")){g.find(".node").removeClass("selected"),dt(this).addClass("selected");var e,i,n=dt(this).attr("node-id"),t=dt(this).attr("type"),t=u.nodes[t];if(m.find(".panel-header .info>.icon").attr("class","icon bg-"+t.icon.bgColor),m.find(".panel-header .info>.icon i").attr("class","bi bi-"+t.icon.bi),m.find(".panel-header .info>.icon i").css("color",t.icon.color),m.find(".panel-header .info>.name").text(t.name),"edit"==u.mode||"readonly"==u.mode)m.attr("node-id",n),"readonly"==u.mode||null!=dt(this).attr("start")?m.find(".tool.more").hide():m.find(".tool.more").show(),w.hide(),0==m.find(".settings [node-id='"+n+"']").length&&(o=$.children("[node-id='"+n+"']"),e=m.find(".settings [node-id]"),i=e.attr("node-id"),0<g.find(".node[node-id='"+i+"']").length?$.append(e):e.remove(),m.find(".settings form").append(o),m.find(".errors .error").closest(".errors").show()),m.css("right","8px");else if("run"==u.mode){m.find(".tool.more").hide();var o=t.result;if(!o){var d=Number(m.attr("width"));return void m.css("right",-(d+30))}t=m.attr("node-id");t&&(a=m.find(".settings form").children(),o.onLeave(a,t)),m.attr("node-id",n);var a=dt(o.tpl);m.find(".settings form").html(""),m.find(".settings form").append(a),o.onLoad(a,n);d=o.panelWidth||400;m.attr("width",d),m.css("width",d),m.css("right","8px")}setTimeout(function(){dt(window).trigger("p-resize")},300)}}),s.on("mouseover",function(t){t.stopPropagation(),y.find("path").removeClass("selected");var e,i=dt(this).attr("node-id");(t=N[e=i].in,e=N[i].out,Object.keys(t).concat(Object.keys(e))).forEach(function(t){y.find("path[path-id='"+t+"']").addClass("selected")})}),s.on("mouseout",function(t){t.stopPropagation(),y.find("path").removeClass("selected")}),(l=d).bindDragMove(function(t,e,i){t.stopPropagation();var n=X(),t=Number(i.attr("x")),i=Number(i.attr("y"));l.attr("sx",e.x/n-t),l.attr("sy",e.y/n-i),l.removeAttr("dragging")},function(t,e,i,n){t.stopPropagation();var o=X();l.attr("dragging","true");var d=Number(n.attr("sx")),t=Number(n.attr("sy")),d=e.x/o-d,t=e.y/o-t;n.css("transform",`translate(${d}px, ${t}px)`),n.attr("x",d),n.attr("y",t),G(n),K(n)},function(t,e,i){var n,o,d,a;t.stopPropagation(),l.attr("dragging")&&(n=Number(l.attr("y")),t=X(),n<0&&(o=Number(g.attr("y")),d=Number(g.attr("x")),o<(a=Math.abs(n)+30*t)&&(o=a,t=g.attr("scale"),g.css("transform",`translate(${d*=t}px, ${o*=t}px) scale(${t})`),g.attr("x",d).attr("y",o),h.css("background-position",d+`px ${o}px`))),(n=Number(l.attr("x")))<0&&(o=Number(g.attr("y")),(d=Number(g.attr("x")))<(a=Math.abs(n)+30*t)&&(d=a,t=g.attr("scale"),g.css("transform",`translate(${d*=t}px, ${o*=t}px) scale(${t})`),g.attr("x",d).attr("y",o),h.css("background-position",d+`px ${o}px`))))}),"edit"==u.mode&&"start"!=t&&d.on("contextmenu",function(t){t.stopPropagation(),t.preventDefault(),g.append(w);var e=dt(this),i=Number(e.attr("x")),t=Number(e.attr("y"));w.css("left",i+2*e.width()/3),w.css("top",t+2*e.height()/3),w.css("right",""),w.attr("node-id",e.attr("node-id")),w.show()});var c=new v(e,r);n&&n.split(",").forEach(function(t){b[t]&&c.addParent(b[t])}),b[e]=c;var f,t=u.nodes[t].settings;return t&&null!=t.tpl&&(f=dt(`
                    <div node-id="${e}" settings class="needs-validation">
                        <div class="errors"></div>
                        ${t.tpl}
                    </div>`),$.append(f),a&&dt.setFormData(f,a),m.on("click",function(){dt(this).find(".multiselect .select").hide(),dt(this).find(".p-cond .select").prev(".selected").removeClass("changing")}),f.find("input,textarea,select").on("change",function(){var t=dt(this).closest("[node-id]").attr("node-id"),t=g.find(".node[node-id='"+t+"']");dt.validate(dt(this).closest("form"))?t.removeClass("error"):t.addClass("error")}),f.find("textarea[name='description']").on("keyup",function(){var t=dt(this).closest(".panel").attr("node-id"),e=g.find(".node[node-id='"+t+"']"),t=dt(this).val();e.find("[description]").text(t),0<t.length?e.find("[description]").show():e.find("[description]").hide()}),f.on("click",function(){f.find(".dropdown-menu").removeClass("show"),f.find(".dropdown-toggle").removeClass("show")}),t.bindEvent(c,{elem:f,validation:function(t){t.find("input").on("change",function(){var t=dt(this).closest("[node-id]").attr("node-id"),t=g.find(".node[node-id='"+t+"']");dt.validate(dt(this).closest("form"))?t.removeClass("error"):t.addClass("error")})}},a,{elem:d,add:function(t){t=t.closest(".node");U(t),Z(t)},remove:function(t){var e=t.find(".welding").attr("path-id");e&&0<e.length&&e.split(",").forEach(function(t){et(t)});e=t.closest(".node");t.remove(),U(e)}})),k(),d}}function W(t){var e,i=g.find(".node[node-id='"+t+"']");0<i.length&&(e=i.attr("type"),u.nodes[e].settings.onChange(b[t],(i=t,e=0==(e=$.find("[node-id='"+i+"']")).length?m.find(".settings [node-id='"+i+"']"):e)));t=g.find(".node[parent-id*='"+t+"']");dt.each(t,function(t,e){W(dt(e).attr("node-id"))})}function H(t,e){var i=t.prev(".welding.right");e||(S=i),i.show();var n=X(),o=i.position().top+i.height()/2+1,e=0;return 0<t.closest(".item").length?e=t.closest(".item").position().top:0<t.closest(".header").length&&(e=t.closest(".header").position().top),i.attr("path-id")||i.hide(),(o+e)/n+(1<=n?3*(n-1):8*(n-1))}function F(t,e){var i=t.find(".welding.left");M=i,e||i.show();t=X(),e=i.position().top+i.height()/2+1+i.closest(".header").position().top;return i.attr("path-id")||i.hide(),e/t+(1<=t?3*(t-1):8*(t-1))}function Z(t){var s,v,h,m;t.find(".plus:not([binded])").on("click",function(t){t.stopPropagation(),d.hide(),x.show();var e=dt(this).closest(".node"),i=Number(e.attr("x")),t=Number(e.attr("y"));x.css("left",e.width()+i+40),x.css("top",t-x.height()/2+14),x.attr("node-id",e.attr("node-id")),x.attr("po-offset-y",H(dt(this))),w.hide()}),dt.each(t.find(".plus:not([binded]"),function(t,e){dt(e).bindDragMove(function(t,e,i){t.stopPropagation(),s=e;var n=H(i),o=i.closest(".node");m=o;var d=Number(o.attr("x")),a=Number(o.attr("y")),r=d+o.width(),t=a+n,e=r,i=t,d=(e-r)/3,o=r+d,a=r+2*d,d=document.createElementNS("http://www.w3.org/2000/svg","path");v=E("p"),d.setAttribute("d",`M ${r+17} ${t} C ${o} ${t}, ${a} ${i}, ${e} `+i),d.setAttribute("class","path"),d.setAttribute("path-id",v),d.setAttribute("ex",e),d.setAttribute("ey",i),d.setAttribute("out-offset-y",n),y.append(d),g.find(".node").on("mouseover",function(){h=dt(this)}),g.find(".node").on("mouseout",function(){h=void 0})},function(t,e,i,n){t.stopPropagation();var o=y.find("path[path-id='"+v+"']"),d=Number(o.attr("ex")),t=Number(o.attr("ey")),o=X(),n=d+(e.x-s.x+n.width())/o,o=t+(e.y-s.y)/o;J(v,n,o)},function(t,e,i){if(t.stopPropagation(),v){var n=y.find("path[path-id='"+v+"']");if(h){var o=F(h);if(T(m,S))if(R(h,M,"in")){var d,a,r=m.attr("node-id"),s=h.attr("node-id"),l=Number(m.attr("level")),c=Number(h.attr("level")),f=!0;if(r==s||0!=c&&(c<=2||c<l))f=!1;else for(var u in N[r].out)null!=N[s].in[u]&&(f=!1);f?(d=Number(h.attr("x")),a=Number(h.attr("y")),t=m.find(".welding.right").index(S),c<l+1&&(c=l+1),(l=Number(h.attr("index")))<t&&(l=t),z(h,"parent-id",r),h.attr("level",c),h.attr("index",l),n.attr("in-offset-y",o),n.attr("out-node-id",r),n.attr("in-node-id",s),(l=document.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",n.attr("d")),l.setAttribute("path-area-id",v),l.setAttribute("class","path-area"),y.append(l),Q(v),J(v,d,a+o),z(S,"path-id",v),S.show(),z(M,"path-id",v),M.show(),N[m.attr("node-id")].out[v]=m.find(".welding.right").index(S),N[s].in[v]=h.find(".welding.left").index(M),G(m),h=void 0,v="",b[s].addParent(b[r]),W(s),k()):p()}else p();else p()}else p()}function p(){n.remove(),h=void 0,v="",_(S),_(M)}})}),t.find(".plus:not([binded])").attr("binded",!0)}function Q(e){y.find("path[path-area-id='"+e+"']").on("click",function(){var t=dt(y.find("path[path-id='"+e+"']"));y.find("path").removeClass("selected"),t.addClass("selected"),g.find(".node").removeClass("selected"),it()})}function B(t,e,i){var n=y.find("path[path-id='"+t+"']"),o=y.find("path[path-area-id='"+t+"']"),d=(r=(r=n).attr("d").split(", ")[2].split(" "),{x:Number(r[0]),y:Number(r[1])}),a=d.x,t=d.y,r=(a-e)/3,d=e+r,r=e+2*r;n.attr("d",`M ${e} ${i} C ${d} ${i}, ${r} ${t}, ${a} `+t),o.attr("d",`M ${e} ${i} C ${d} ${i}, ${r} ${t}, ${a} `+t)}function G(i){var n=Number(i.attr("x")),o=Number(i.attr("y")),t=i.attr("node-id");Object.keys(N[t].out).forEach(function(t){var e=y.find("path[path-id='"+t+"']");B(t,n+i.outerWidth(),o+Number(e.attr("out-offset-y")))})}function J(t,e,i){var n=y.find("path[path-id='"+t+"']"),o=y.find("path[path-area-id='"+t+"']"),d=(r=(r=n).attr("d").split(" C ")[0].replaceAll("M ","").split(" "),{x:Number(r[0]),y:Number(r[1])}),a=d.x,t=d.y,r=(e-a)/3,d=a+r,r=a+2*r;n.attr("d",`M ${a} ${t} C ${d} ${t}, ${r} ${i}, ${e} `+i),o.attr("d",`M ${a} ${t} C ${d} ${t}, ${r} ${i}, ${e} `+i)}function K(t){var i=Number(t.attr("x")),n=Number(t.attr("y")),t=t.attr("node-id");Object.keys(N[t].in).forEach(function(t){var e=y.find("path[path-id='"+t+"']");J(t,i,n+Number(e.attr("in-offset-y")))})}function U(t){var n=t.attr("node-id");dt.each(t.find(".plus"),function(e,t){var i=H(dt(t),!0),t=dt(t).prev(".welding").attr("path-id");t&&t.split(",").forEach(function(t){y.find("path[path-id='"+t+"']").attr("out-offset-y",i),N[n].out[t]=e})}),G(t)}function V(t){var e=g.attr("x"),i=g.attr("y");g.attr("scale",t),g.css("transform",`translate(${e}px, ${i}px) scale(${t})`)}function X(){return Number(o.find(".scale").attr("value"))}function Y(t){t=t.attr("parent-id");return t?t.split(",").sort(function(t,e){return e.localeCompare(t)}):[]}function tt(n){var t=g.find(".node[node-id='"+n+"']"),i=t.attr("parent-id"),e=g.find(".node[parent-id*='"+n+"']");Object.keys(N[n].in).forEach(function(e){et(e),i.split(",").forEach(function(t){delete N[t].out[e]})}),Object.keys(N[n].out).forEach(function(i){et(i),dt.each(e,function(t,e){delete N[dt(e).attr("node-id")].in[i],O(dt(e),"parent-id",n),dt(e).attr("parent-id")&&0!=dt(e).attr("parent-id").length||(dt(e).attr("level",0),dt(e).attr("index",""))})}),delete N[n],t.remove(),$.children("[node-id='"+n+"']").remove(),dt.each(e,function(t,e){e=dt(e).attr("node-id");b[e].removeParent(b[n])}),delete b[n],W(n)}function et(i){var t=y.find("path[path-id='"+i+"']"),e=t.attr("out-node-id"),n=t.attr("in-node-id");delete N[e].out[i],delete N[n].in[i];var o=g.find(".node[node-id='"+n+"']");O(o,"parent-id",e),0==o.attr("parent-id").length&&(o.attr("index",""),o.attr("level",0)),t.remove(),y.find("path[path-area-id='"+i+"']").remove();t=g.find(".node .welding[path-id*='"+i+"']");dt.each(t,function(t,e){O(dt(e),"path-id",i),dt(e).attr("path-id")&&0!=dt(e).attr("path-id").length||(dt(e).hide(),dt(e).removeAttr("path-id"))}),b[n].removeParent(b[e]),W(n)}function it(){if("run"==u.mode){var t=m.attr("node-id");if(!t)return;var e=g.find(".node[node-id='"+t+"']").attr("type"),i=m.find(".panel-body .settings form").children(),e=u.nodes[e].result;e&&(e.onLeave(i,t),m.removeAttr("node-id"),t=Number(m.attr("width")),m.css("right",-(t+30)))}else m.css("right","-430px");g.find(".node").removeClass("selected")}function nt(t,e,i,n,o,d){var a=Number(i.attr("x")),r=Number(i.attr("y")),s=a+i.outerWidth(),l=r+o,c=n.x,f=n.y+d,a=(c-s)/3,r=s+a,n=s+2*a,a=e.attr("node-id"),e=i.attr("node-id"),i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",`M ${s} ${l} C ${r} ${l}, ${n} ${f}, ${c} `+f),i.setAttribute("class","path"),i.setAttribute("path-id",t),i.setAttribute("out-offset-y",o),i.setAttribute("in-offset-y",d),i.setAttribute("out-node-id",e),i.setAttribute("in-node-id",a);a=document.createElementNS("http://www.w3.org/2000/svg","path");a.setAttribute("d",`M ${s} ${l} C ${r} ${l}, ${n} ${f}, ${c} `+f),a.setAttribute("path-area-id",t),a.setAttribute("class","path-area"),y.append(i),y.append(a),Q(t)}function ot(t,e,i){var n={failed:"error",success:"success",running:"running",progress:"percent"},o="start"==t?g.find(".node[type='start']"):"end"==t?g.find(".node[type='end']"):g.find(".node[node-id='"+t+"']");if(0<o.length){for(var d in n)o.removeClass(n[d]);o.addClass(n[e]),null!=i&&o.find("[progress]").text(i+"%")}}return u.data&&0!=Object.keys(u.data).length||L("start","n_0",{x:80,y:260},"",1,""),dt("body").on("click",function(){o.find(".select").hide()}),o.find(".scale").on("click",function(t){t.stopPropagation();t=dt(this).closest(".zoom").find(".select");t.is(":hidden")?t.show():t.hide()}),o.find(".select").on("click",function(t){t.stopPropagation()}),o.find(".select .item").on("click",function(){var t=dt(this).attr("value"),e=dt(this).find("a").text();o.find(".scale").attr("value",t),o.find(".scale").text(e),o.find(".select").hide(),V(t)}),o.find("[zoom-out]").on("click",function(){var t=X();(t-=.2)<.2&&(t=.2),o.find(".scale").attr("value",t),o.find(".scale").text((100*t).toFixed(0)+"%"),V(t)}),o.find("[zoom-in]").on("click",function(){var t=X();2<(t+=.2)&&(t=2),o.find(".scale").attr("value",t),o.find(".scale").text((100*t).toFixed(0)+"%"),V(t)}),e.bindMouseWheel(function(t,e){var i=X();(i+=e/120/100)<.2?i=.2:2<i&&(i=2),o.find(".scale").attr("value",i),o.find(".scale").text((100*i).toFixed(0)+"%"),V(i)}),t.find("[tidy]").on("click",function(){!function(){var t=g.find(".node[start]");t.css("transform","translate(80px, 260px)"),t.attr("x",80),t.attr("y",260),G(t),function t(a){var r=Number(a.attr("x"));var s=Number(a.attr("y"));var e=Number(a.attr("level"))+1;var l=g.find(".node[level='"+e+"']");{var c;0<l.length&&(l=l.get().sort(function(t,e){t=`${Y(dt(t))[0]}_${dt(t).attr("index")}_`+dt(t).attr("node-id"),e=`${Y(dt(e))[0]}_${dt(e).attr("index")}_`+dt(e).attr("node-id");return t.localeCompare(e)}),c=0,dt.each(l,function(t,e){var i=r+a.outerWidth()+D,n=s+c;dt(e).css("transform",`translate(${i}px, ${n}px)`),dt(e).attr("x",i),dt(e).attr("y",n),G(dt(e)),K(dt(e));var o,n=dt(e).attr("node-id"),n=g.find(".node[parent-id*='"+n+"']"),d=0;dt.each(n,function(t,e){d+=dt(e).outerHeight()+q}),t<l.length-1&&(o=g.find(".node[parent-id*='"+dt(l[t+1]).attr("node-id")+"']")),(!d||d<dt(e).outerHeight()+q||o&&0==o.length)&&(d=dt(e).outerHeight()+q),c+=d}),t(dt(l[0])))}}(t);t=X();g.attr("x",j.x),g.attr("y",j.y),g.css("transform",`translate(${j.x}px, ${j.y}px) scale(${t})`)}()}),dt(document).on("keyup",function(t){"edit"==u.mode&&46==t.keyCode&&(0<(t=g.find(".node.selected:not([start])")).length?(tt(t.attr("node-id")),it()):0<(t=y.find("path.selected")).length&&et(t.attr("path-id")))}),g.on("click",function(){it()}),m.on("click",function(t){t.stopPropagation()}),m.find("[close]").on("click",function(){it()}),m.bindMouseWheel(function(t){t.stopPropagation()}),m.on("click",function(){w.hide()}),m.find(".more").on("click",function(t){t.stopPropagation(),"n_0"!=m.attr("node-id")&&(w.attr("node-id",m.attr("node-id")),0<dt(this).find(".menu-context").length?w.is(":hidden")?w.show():w.hide():(dt(this).append(w),w.css("top","30px"),w.css("right","0"),w.css("left",""),w.show()))}),e.on("click",function(){x.hide()}),x.find(".item").on("click",function(t){t.stopPropagation();var i,e,n,o,d,a,r=dt(this).closest(".menu").attr("node-id"),s=g.find(".node[node-id='"+r+"']");T(s,S)&&(d=Number(s.attr("level")),e=Number(s.attr("x")),a=Number(s.attr("y")),n=e+s.outerWidth()+D,o=a-50,0<(t=g.find(".node[parent-id*='"+r+"']")).length&&(i=0,dt.each(t,function(t,e){e=Number(dt(e).attr("y"))+dt(e).outerHeight()+q;i<e&&(i=e)}),o=i),n=(e=I(n,o)).x,o=e.y,a=s.find(".welding.right").index(S),t=d+1,n=E("n"),(o=L(dt(this).attr("type"),n,e,r,t,a))&&(d=Number(x.attr("po-offset-y")),t=F(o),nt(a=E("p"),o,s,e,d,t),z(S,"path-id",a),S.show(),z(M,"path-id",a),M.show(),N[r].out[a]=s.find(".welding.right").index(S),N[n].in[a]=o.find(".welding.left").index(M))),x.hide()}),dt("body").on("click",function(){d.hide()}),t.find("[add]").on("click",function(t){t.stopPropagation(),d.is(":hidden")?d.show():d.hide(),x.hide()}),d.on("click",function(t){t.stopPropagation()}),d.find(".item").on("click",function(){var t=g.find(".node[start]"),e=I(Number(t.attr("x"))+t.width()+300,Number(t.attr("y"))+t.height()+50),t=E("n");L(dt(this).attr("type"),t,e,"",0,""),d.hide()}),dt("body").on("click",function(t){w.hide()}),w.on("click",function(t){t.stopPropagation()}),w.find("[delete]").on("click",function(){var t=w.attr("node-id");m.css("right","-412px"),tt(t),w.hide()}),w.find("[copy]").on("click",function(){w.hide();var t,e=w.attr("node-id"),i=g.find(".node[node-id='"+e+"']").attr("type"),n=g.find(".node[start]"),o=I(Number(n.attr("x"))+n.width()+300,Number(n.attr("y"))+n.height()+50),d=E("n"),n=m.find(".settings [node-id='"+e+"']");L(i,d,o,"",0,"",t=0<(n=0==n.length?$.children("[node-id='"+e+"']"):n).length?u.nodes[i].settings.data(n,dt.formData(n)):t)}),{setData:l,setStatus:ot,setProgress:function(t,e){ot(t,"progress",e)},stopAutoSave:function(){clearInterval(s)},enableDeploy:function(){e.find("[deploy]").removeAttr("disabled")},disableDeploy:function(){e.find("[deploy]").attr("disabled",!0)}}}});
//# sourceMappingURL=jquery.prac.com.workflow.js.map