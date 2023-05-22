(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery", "underscore", "bootstrap", "async"], factory);
    } else if (typeof exports === "object") {
        // CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, _, b, async) {

    $.fn.uploader = function (options) {
        var self = $(this);
        if (!options) {
            options = {};
        }
        var defaultCfg = {
            icon: "bi-cloud-upload-fill"
        };
        options = $.extend(true, {}, defaultCfg, options);

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
            "file": "bi-file-earmark",
            "directory": "bi-folder",
            "image": "bi-image"
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

        if (options.dragdrop) {
            return _dragDropUploader(self, options);
        } else {
            return _uploader(self, options);
        }

        function _dragDropUploader(self, options) {
            var lang = {
                en: {
                    or: "or",
                    title: "Drag and Drop files to upload",
                    browse: {
                        label: "Browse files"
                    },
                    confirm: {
                        title: "File already exists, do you want to replace the existing files?",
                        label: {
                            cancel: "Cancel",
                            confirm: "Replace files"
                        }
                    }
                },
                zh: {
                    or: "或者",
                    title: "拖拽文件到这里上传",
                    browse: {
                        label: "选择文件"
                    },
                    confirm: {
                        title: "文件已经存在，确认要覆盖存在的文件吗?",
                        label: {
                            cancel: "取消",
                            confirm: "确认"
                        }
                    }
                }
            };
            var defaultCfg = {
                lang: "en",
                url: "/upload",
                fieldName: "files",
                validation: {
                    size: function (size) {
                        return true;
                    }
                },
                limit: 0,
                allowDownload: false,
                beforeUpload: function(formData) {

                },
                onSuccess: function (result, textStatus, xhr) {
                    return result;
                },
                onError: function (xhr, textStatus, errorThrown) {
                    return {
                        code: xhr.status,
                        msg: xhr.responseText
                    }
                },
                onDelete: function (filename, path, type) {
                    console.log("delete file", filename, "path is", path, "type is", type);
                }
            };
            var langOpt = lang[options.lang] ? lang[options.lang] : lang["en"];
            options = $.extend(true, {}, defaultCfg, langOpt, options);
            if (!self.hasClass("dd-uploader")) {
                self.addClass("dd-uploader");
            }

            function _confirm(onConfirm) {
                var tpl = `
                    <div class="confirm">
                        <div class="detail">
                            <div class="title"><%=title%></div>
                            <div class="op">
                                <button type="button" class="btn btn-outline-secondary btn-sm" cancel><%=label.cancel%></button>
                                <button type="button" class="btn btn-primary btn-sm" confirm><%=label.confirm%></button>
                            </div>
                        </div>
                    </div>
                `;
                var dialog = $(_.template(tpl)(options.confirm));
                dialog.find("button[cancel]").on("click", function () {
                    dialog.remove();
                });
                dialog.find("button[confirm]").on("click", function () {
                    dialog.remove();
                    onConfirm();
                });
                self.append(dialog);
            }

            var initTpl = `
                <div class="init">
                    <div class="drop-area">
                        <i class="bi bi-cloud-upload"></i>
                        <label><%=title%></label>
                    </div>
                    <div class="selection"><%=or%></div>
                    <div class="browse">
                        <button type="button" class="btn btn-secondary"><%=browse.label%></button>
                        <input type="file" name="<%=fieldName%>" />
                    </div>
                </div>
            `;

            var listTpl = `
                <div class="select">
                    <div class="folder">
                        <div class="path" path="/">
                            <a href="javascript:void(0)">Home</a>/
                        </div>
                    </div>
                    <div class="select-file">
                        <button type="button" class="btn btn-secondary btn-sm"><%=browse.label%></button>
                        <input type="file" name="<%=fieldName%>" />
                    </div>
                </div>
                <hr/>
                <div class="list" root>
                </div>
            `;

            var fileTpl = `
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
            `;

            var filesTpl = `
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
            `;

            var pathTpl = `
                <div class="path" path="<%=path%>">
                    <a href="javascript:void(0)"><%=name%></a>/
                </div>
            `;

            var uploader = $(_.template(initTpl)(options));
            uploader.find("input[type='file']").on("change", function (e) {
                var files = e.originalEvent.target.files;
                if (files.length > 0) {
                    var file = files[0];
                    _first();
                    _singleFile(file);
                }
            });
            self.append(uploader);

            var root = "/";
            var pathMap = {};
            pathMap[root] = [];
            self.on("dragenter", function (e) {
                e.preventDefault()
                e.stopPropagation()
            });
            self.on("dragleave", function (e) {
                e.preventDefault()
                e.stopPropagation()
            });
            self.on("dragover", function (e) {
                e.preventDefault()
                e.stopPropagation()
            });
            self.on("drop", function (e) {
                e.preventDefault();
                e.stopPropagation();

                _first();
                _switchDir(root);

                var items = e.originalEvent.dataTransfer.items;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i].webkitGetAsEntry();
                    var file = self.find(".list .file[name='" + item.name + "']");
                    if (file.length > 0) {
                        _confirm(function () {
                            file.remove();
                            _do();
                        });
                    } else {
                        _do();
                    }

                    function _do() {
                        if (item.isFile) {
                            item.file(function (file) {
                                _singleFile(file);
                            });
                        } else if (item.isDirectory) {
                            _collect(item, function (files, tree) {
                                _addFile(tree, files)
                            });
                        }
                    }
                }
            });

            function _first() {
                if (self.find(".init").is(":visible")) {
                    self.find(".init").hide();
                    var list = $(_.template(listTpl)(options));
                    self.append(list);
                    list.show();
                    list.find("input[type='file']").on("change", function (e) {
                        var files = e.originalEvent.target.files;
                        if (files.length > 0) {
                            var file = files[0];
                            _singleFile(file);
                        }
                    });
                    list.find(".path").on("click", function () {
                        _switchDir($(this).attr("path"));
                        $(this).nextAll("div.path").remove();
                    });
                }
            }

            function _singleFile(file) {
                _addFile({
                    name: file.name,
                    type: _type(file).name
                }, [{
                    obj: file,
                    path: file.name
                }]);
            }

            function _addFile(tree, files) {
                _recurse(root, tree);
                function _recurse(path, node) {
                    if (!pathMap[path]) {
                        pathMap[path] = [];
                    }
                    pathMap[path].push({
                        name: node.name,
                        path: node.path,
                        size: node.size,
                        type: node.type
                    });
                    if (node.children) {
                        node.children.forEach(function (child) {
                            _recurse(node.path, child);
                        });
                    }
                }

                var item = $(_.template(fileTpl)({
                    name: tree.name,
                    path: tree.path ? tree.path : tree.name,
                    type: tree.type,
                    icon: icons[tree.type],
                    parent: "",
                    allowDownload: options.allowDownload
                }));
                self.find(".list").append(item);
                if (tree.type == "directory") {
                    item.find(".name").on("click", function () {
                        _switchDir($(this).closest(".file").attr("path"));
                    });
                }

                var formData = new FormData();
                var totalSize = 0;
                files.forEach(function (file) {
                    totalSize += file.obj.size;
                    formData.append(options.fieldName, file.obj, file.path);
                });

                if (!options.validation.size(totalSize)) {
                    return;
                }

                options.beforeUpload(formData, totalSize);

                $.ajax({
                    url: options.url,
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function (event) {
                            if (event.lengthComputable) {
                                var percent = ((event.loaded / event.total) * 100).toFixed(0) + "%";
                                item.find(".completed").removeClass("bg-danger").addClass("bg-success").css("width", percent);
                            }
                        }, false);
                        return xhr;
                    },
                    success: function (result, textStatus, xhr) {
                        item.find(".op [delete]").show();
                        _bindDelete(item);
                        options.onSuccess(result, textStatus, xhr);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        item.find(".completed").removeClass("bg-success").addClass("bg-danger");
                        options.onError(xhr, textStatus, errorThrown);
                    }
                });
            }

            function _bindDelete(item) {
                item.find(".op [delete]").on("click", function () {
                    var self = $(this);
                    options.onDelete(self.attr("name"), self.attr("path"), self.attr("type"));
                    var children = pathMap[self.attr("parent")];
                    var index = -1;
                    if (children) {
                        children.forEach(function (child, i) {
                            if (child.path == self.attr("path")) {
                                index = i;
                            }
                        });
                    }
                    if (index >= 0) {
                        children.splice(index, 1);
                    }
                    if (self.attr("type") == "directory") {
                        delete pathMap[self.attr("path")];
                    }
                    self.closest(".file").remove();
                });
            }

            function _collect(item, callback) {
                var files = [];
                var root = [];

                _files(item, "", root, function () {
                    callback(files, root[0]);
                });

                function _files(item, path, parent, callback) {
                    var child = {
                        name: item.name,
                    };
                    parent.push(child);
                    if (item.isFile) {
                        item.file(function (file) {
                            files.push({
                                obj: file,
                                path: path + file.name
                            });
                            child.type = _type(file).name;
                            child.size = file.size;
                            child.path = path + file.name;
                            callback();
                        });
                    } else if (item.isDirectory) {
                        child.type = "directory";
                        child.path = path + item.name;
                        child.children = [];
                        var dirReader = item.createReader();
                        dirReader.readEntries(function (entries) {
                            async.each(entries, function (entry, notice) {
                                _files(entry, path + item.name + "/", child.children, function () {
                                    notice();
                                });
                            }, function (err) {
                                callback();
                            });
                        });
                    }
                }
            }

            function _switchDir(path) {
                if (path == root) {
                    self.find(".list[root]").show();
                    self.find(".list[sub]").remove();
                } else {
                    if (pathMap[path]) {
                        var children = pathMap[path];
                        if (children) {
                            self.find(".list[sub]").remove();
                            var name = path.substring(path.lastIndexOf("/") + 1);
                            var pathItem = $(_.template(pathTpl)({
                                name: name,
                                path: path
                            }));
                            self.find(".select .folder").append(pathItem);
                            pathItem.on("click", function () {
                                var path = $(this).attr("path");
                                _switchDir(path);
                                $(this).nextAll("div.path").remove();
                            });

                            self.find(".list[root]").hide();
                            var list = $(_.template(filesTpl)({
                                files: children,
                                parent: path,
                                icons: icons,
                                allowDownload: options.allowDownload
                            }));
                            self.append(list);
                            _bindDelete(list.find(".file"));
                            list.find(".file[path] .name").on("click", function () {
                                _switchDir($(this).closest(".file").attr("path"));
                            });
                        }
                    }
                }
            }
        }

        function _uploader(self, options) {
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

            var blankTpl = `
                <div class="file" style="width:<%=width%>" blank>
                    <i class="bi <%=icon%>"></i>
                    <input type="file" <% if (accept != "*") { %>accept="<%=accept%>"<% } %> />
                </div>
            `;
            var uploadingTpl = `
                <div class="file" style="width:<%=width%>" count>
                    <i class="bi <%=icon%>"></i>
                    <div class="uploading">
                        <div class="spinner-border text-light"></div>
                        <span>0%</span>
                    </div>
                </div>
            `;
            var failedTpl = `
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
                    accept: options.accept,
                    icon: options.icon
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
                            _beforeUpload(file, function (processFile) {
                                _upload(processFile, type);
                            })
                        }
                    }
                });

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
                                error: options.text.failed,
                                icon: options.icon
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
                        width: options.width,
                        icon: options.icon
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
    }
}));