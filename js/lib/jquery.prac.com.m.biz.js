(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap", "common", "action"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b) {
    $.fn.chat = function (messages, options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
        };
        options = $.extend(true, {}, defaultCfg, options);

        var icons = {
            "excel": "bi-file-earmark-excel",
            "word": "bi-file-earmark-word",
            "ppt": "bi-file-earmark-ppt",
            "pdf": "bi-file-earmark-pdf",
            "video": "bi-camera-video",
            "audio": "bi-optical-audio",
            "html": "bi-file-earmark-code",
            "xml": "bi-file-earmark-code",
            "txt": "bi-file-earmark-text",
            "file": "bi-file-earmark"
        };

        var messageTpl = `
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
        `;

        var messagesTpl = `
            <div class="messages">
                <ul>
                <% _.each(messages, function(message) { %>` + messageTpl + `
                <% }); %>
                </ul>
            </div>
        `;

        var messages = $(_.template(messagesTpl)({
            messages: messages,
            icons: icons
        }));

        var initialized = false;
        if (!self.hasClass("p-chat")) {
            self.addClass("p-chat");
        }
        if (self.hasClass("media")) {
            _initSlides();
        }
        self.find(".messages").remove();
        self.prepend(messages);
        messages.animate({ scrollTop: 9999 });
        self.find("input.message").on("focus", function () {
            self.removeClass("media");
        });
        self.find("a[p-add]").on("click", function () {
            if (!self.hasClass("media")) {
                self.addClass("media");
                _initSlides();
            }
        });
        messages.on("click", function () {
            self.removeClass("media");
        });

        function _initSlides() {
            if (initialized) {
                return
            }
            initialized = true;
            self.find(".input .medias .p-slides").slides({
                autoplay: false,
            });
        }

        _initImagePreview();
        function _initImagePreview() {
            var images = messages.find(".image img");
            var data = [];
            $.each(images, function (i, image) {
                data.push({
                    path: $(image).attr("src")
                });
                $(image).attr("index", i);
            });

            images.off("click");
            images.on("click", function (e) {
                e.stopPropagation();
                var p = $.imagePreview(data);
                p.select(Number($(this).attr("index")));
            });
        }

        _initFileLink();
        function _initFileLink() {
            var files = messages.find(".file[url]").closest(".output");
            files.off("click");
            files.on("click", function (e) {
                e.stopPropagation();
                window.location.href = $(this).find(".file").attr("url");
            });
        }

        function _append(message) {
            var item = $(_.template(messageTpl)({
                message: message,
                icons: icons
            }));
            messages.find("ul").append(item);
            _initImagePreview();
            _initFileLink();
            messages.animate({ scrollTop: 9999 });
            self.removeClass("media");
        }

        self.find("input[p-message]").on("focus", function () {
            messages.animate({ scrollTop: 9999 });
        });

        self.find("input[p-message]").on("keyup", function (e) {
            e.stopPropagation();
            if (e.keyCode == 13) {
                _onSend($(this));
            }
        });

        self.find("[p-send]").on("click", function (e) {
            e.stopPropagation();
            _onSend($("input[p-message]"));
        });

        function _onSend(input) {
            var msg = input.val();
            if (msg.length > 0) {
                input.val("").focus();
                if (options.onSend) {
                    options.onSend(msg);
                }
            }
        }

        return {
            append: _append
        }
    };
}));