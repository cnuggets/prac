(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b) {

    $.fn.uploader = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            url: "/upload",
            fieldName: "file",
            validation: {
                size: function (size, index) {
                    return true;
                },
                type: function (type, index) {
                    return true
                }
            },
            limit: 0,
            progress: "percent", // percent, text
            text: {
                uploading: "uploading...",
                failed: "upload failed"
            },
            width: "8rem",
            accept: "*",
            data: [],
            preview: false,
            onSuccess: function (result, textStatus, xhr) {
                return result;
            },
            onError: function (xhr, textStatus, errorThrown) {
                return {
                    code: xhr.status,
                    msg: xhr.responseText
                }
            }
        };
        options = $.extend(true, {}, defaultCfg, options);
        if (!self.hasClass("uploader")) {
            self.addClass("uploader");
        }

        var types = {
            "application/vnd.ms-excel": "excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel",
            "application/msword": "word",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "word",
            "application/vnd.ms-powerpoint": "ppt",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": "ppt",
            "application/pdf": "pdf",
            "image/*": "image",
            "video/*": "video",
            "audio/*": "audio",
            "text/html": "html",
            "text/xml": "xml",
            "text/plain": "txt"
        };

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

        var extensions = {
            ".jpg": "image",
            ".jpeg": "image",
            ".png": "image",
            ".svg": "image",
            ".gif": "image",
            ".xls": "excel",
            ".xlsx": "excel",
            ".doc": "word",
            ".docx": "word",
            ".ppt": "ppt",
            ".pptx": "ppt",
            ".pdf": "pdf",
            ".mp4": "video",
            ".webm": "video",
            ".mp3": "audio",
            ".wma": "audio",
            ".html": "html",
            ".xml": "xml",
            ".txt": "txt"
        }

        var blankTpl = `
            <div class="file" style="width:<%=width%>" blank>
                <i class="bi bi-cloud-upload-fill"></i>
                <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
            </div>
        `;
        var uploadingTpl = `
            <div class="file" style="width:<%=width%>" count>
                <i class="bi bi-cloud-upload-fill"></i>
                <div class="uploading">
                    <div class="spinner-border text-light"></div>
                    <span>0%</span>
                </div>
            </div>
        `;
        var failedTpl = `
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
        `;
        var uploadedImageTpl = `
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
        `;
        var uploadedFileTpl = `
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
        `;

        var previewTpl = `
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
        `;

        // init
        if (options.data && options.data.length > 0) {
            options.data.forEach(function (path) {
                var type, name;
                if (path.indexOf("data:image") == 0) {
                    name = "";
                    type = "image";
                } else {
                    var ext = path.substring(path.lastIndexOf("."));
                    type = extensions[ext];
                    name = path.substring(path.lastIndexOf("/") + 1);
                }

                var uploaded;
                if (type == "image") {
                    uploaded = $(_.template(uploadedImageTpl)({
                        width: options.width,
                        path: path,
                        preview: options.preview
                    }));
                } else {
                    if (!type) {
                        type = "file";
                    }
                    var icon = icons[type];
                    var name = path.substring(path.lastIndexOf("/") + 1);
                    uploaded = $(_.template(uploadedFileTpl)({
                        width: options.width,
                        icon: icon,
                        name: name,
                        preview: options.preview
                    }));
                    uploaded.on("click", function () {
                        window.location.href = path;
                    });
                }
                uploaded.data("file", {
                    name: name,
                    path: path
                });

                uploaded.find(".remove").on("click", function (e) {
                    e.stopPropagation();
                    _remove($(this));
                });

                self.append(uploaded);
                if (type == "image") {
                    uploaded.find("div.uploaded").css("height", uploaded.width());
                }
            });

            _preview();

            if (!options.preview) {
                if (options.limit <= 0 || options.data.length < options.limit) {
                    _blank();
                }
            }
        } else {
            if (!options.preview) {
                _blank();
            }
        }

        function _blank() {
            var blank = $(_.template(blankTpl)({
                width: options.width,
                accept: options.accept
            }));
            self.append(blank);
            var fileInput = blank.find("input[type='file']");

            var progressor;

            fileInput.on("change", function (e) {
                var files = e.originalEvent.target.files;
                if (files.length > 0) {
                    var file = files[0];
                    var type = _validate(file, blank.index());
                    if (type) {
                        _beforeUpload(file, function(processFile) {
                            _upload(processFile, type);
                        })
                    }
                }
            });

            function _type(file) {
                var originalType = file.type;
                var type = types[originalType];
                if (!type) {
                    var pattern = originalType.split("/")[0] + "/*";
                    type = types[pattern];
                    if (!type) {
                        type = "file";
                    }
                }
                return {
                    name: type,
                    originalType: originalType
                };
            }

            function _validate(file, index) {
                if (options.validation.size(file.size, index)) {
                    var type = _type(file);
                    if (options.validation.type(type, index)) {
                        return type;
                    }
                }
            }

            function _beforeUpload(file, callback) {
                if (options.beforeUpload) {
                    return options.beforeUpload(file, callback);
                } else {
                    return callback(file);
                }
            }

            function _upload(file, type) {
                var formData = new FormData();
                formData.append(options.fieldName, file);
                $.ajax({
                    url: options.url,
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    xhr: function () {
                        _uploading();
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function (event) {
                            if (event.lengthComputable) {
                                if (options.progress == "percent") {
                                    var percent = ((event.loaded / event.total) * 100).toFixed(0) + "%";
                                    progressor.find("span").text(percent);
                                }
                                if (options.onProgress) {
                                    options.onProgress(event.loaded, event.total);
                                }
                            }
                        }, false);
                        return xhr;
                    },
                    success: function (result, textStatus, xhr) {
                        var file = options.onSuccess(result, textStatus, xhr);
                        var uploaded;
                        if (type.name == "image") {
                            uploaded = $(_.template(uploadedImageTpl)({
                                width: options.width,
                                path: file.path,
                                preview: options.preview
                            }));
                        } else {
                            uploaded = $(_.template(uploadedFileTpl)({
                                width: options.width,
                                icon: icons[type.name],
                                name: file.name,
                                preview: options.preview
                            }));
                        }
                        uploaded.data("file", file);
                        _onComplete(uploaded);
                        if (type.name == "image") {
                            uploaded.find("div.uploaded").css("height", uploaded.width());
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        options.onError(xhr, textStatus, errorThrown);
                        var error = $(_.template(failedTpl)({
                            error: options.text.failed
                        }));
                        _onComplete(error);
                    }
                });
            }

            function _onComplete(elem) {
                progressor.after(elem);
                progressor.remove();

                if (options.limit <= 0 || _count() < options.limit) {
                    _blank();
                }

                elem.find(".remove").on("click", function (e) {
                    e.stopPropagation();
                    _remove($(this));
                });

                if (options.onComplete) {
                    options.onComplete(elem.index());
                }

                _preview();
            }

            function _uploading() {
                progressor = $(_.template(uploadingTpl)({
                    width: options.width
                }));
                blank.after(progressor);
                blank.remove();
                if (options.progress == "text") {
                    progressor.find("span").text(options.text.uploading);
                }
            }

            function _count() {
                return self.find(".file[count]").length;
            }
        }

        function _preview() {
            var images = self.find(".uploaded img");
            images.off("click");
            images.on("click", function () {
                var data = [];
                $.each(images, function (i, image) {
                    $(image).attr("index", i);
                    data.push({
                        path: $(image).attr("src")
                    });
                });
                var body = $(_.template(previewTpl)({
                    id: "carousel-" + new Date().getTime(),
                    images: data,
                    selected: parseInt($(this).attr("index"))
                }));
                $.dialog("", body, {
                    footer: false
                });
            });
        }

        function _remove(elem) {
            var file = elem.closest(".file");
            var data = file.data("file");
            var index = file.index();
            file.remove();
            if (self.find(".file[blank]").length == 0) {
                _blank();
            }
            if (options.onRemove) {
                options.onRemove(data, index);
            }
        }

        function _files() {
            var files = [];
            $.each(self.find(".file"), function (i, file) {
                var d = $(file).data("file");
                if (d) {
                    files.push(d);
                }
            });
            return files;
        }

        return {
            files: _files
        };
    }
}));