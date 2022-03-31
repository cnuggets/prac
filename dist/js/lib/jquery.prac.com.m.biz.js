!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common","action"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(r,f,e){r.fn.chat=function(i,s){var a=r(this);s=s||{};s=r.extend(!0,{},{},s);var t={excel:"bi-file-earmark-excel",word:"bi-file-earmark-word",ppt:"bi-file-earmark-ppt",pdf:"bi-file-earmark-pdf",video:"bi-camera-video",audio:"bi-optical-audio",html:"bi-file-earmark-code",xml:"bi-file-earmark-code",txt:"bi-file-earmark-text",file:"bi-file-earmark"},n=`
            <% if (message.sentAt) { %>
                <div class="sentAt"><%=message.sentAt%></div>
            <% } %>
            <li class="message <%=message.sentByMe ? 'right' : 'left'%>">
                <div class="user">
                    <% if (message.avatar) { %>
                        <img src="<%=message.avatar%>" />
                    <% } else { %>
                        <i class="bi bi-person-fill"></i>
                    <% } %>
                </div>
                <%
                    var type = "text";
                    var icon = icons[message.type];
                    if (message.type) {
                        if (message.type == "text" || message.type == "image") {
                            type = message.type;
                        } else {
                            type = "media";
                        }
                    }
                %>
                <div class="detail <%=type%>">
                    <div class="name"><%=message.sender%></div>
                    <div class="wrapper">
                        <div class="output">
                        <% if (type == "text") { %>
                            <i class="bi bi-caret-left-fill"></i>
                            <span><%=message.content%></span>
                        <% } else if (type == "image") { %>
                            <div class="image">
                                <img src="<%=message.url%>" />
                            </div>
                        <% } else if (type == "media") { %>
                            <i class="bi bi-caret-left-fill"></i>
                            <div class="file" url="<%=message.url%>">
                                <div class="content">
                                    <div class="name"><%=message.content%></div>
                                    <div class="description"><%=message.size%></div>
                                </div>
                                <i class="bi <%=icon%>"></i>
                            </div>
                        <% } %>
                        </div>
                    </div>
                </div>
            </li>
        `,i=r(f.template(`
            <div class="messages">
                <ul>
                <% _.each(messages, function(message) { %>`+n+`
                <% }); %>
                </ul>
            </div>
        `)({messages:i,icons:t})),e=!1;function o(){e||(e=!0,a.find(".input .medias .p-slides").slides({autoplay:!1}))}function l(){var e=i.find(".image img"),s=[];r.each(e,function(e,i){s.push({path:r(i).attr("src")}),r(i).attr("index",e)}),e.off("click"),e.on("click",function(e){e.stopPropagation(),r.imagePreview(s).select(Number(r(this).attr("index")))})}function c(){var e=i.find(".file[url]").closest(".output");e.off("click"),e.on("click",function(e){e.stopPropagation(),window.location.href=r(this).find(".file").attr("url")})}function d(e){var i=e.val();0<i.length&&(e.val("").focus(),s.onSend&&s.onSend(i))}return a.hasClass("p-chat")||a.addClass("p-chat"),a.hasClass("media")&&o(),a.find(".messages").remove(),a.prepend(i),i.animate({scrollTop:9999}),a.find("input.message").on("focus",function(){a.removeClass("media")}),a.find("a[p-add]").on("click",function(){a.hasClass("media")||(a.addClass("media"),o())}),i.on("click",function(){a.removeClass("media")}),l(),c(),a.find("input[p-message]").on("focus",function(){i.animate({scrollTop:9999})}),a.find("input[p-message]").on("keyup",function(e){e.stopPropagation(),13==e.keyCode&&d(r(this))}),a.find("[p-send]").on("click",function(e){e.stopPropagation(),d(r("input[p-message]"))}),{append:function(e){e=r(f.template(n)({message:e,icons:t})),i.find("ul").append(e),l(),c(),i.animate({scrollTop:9999}),a.removeClass("media")}}}});
//# sourceMappingURL=jquery.prac.com.m.biz.js.map