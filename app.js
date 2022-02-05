var express = require("express");
var fs = require("fs");
var multer = require("multer")

exports = module.exports = {
    start: start
};

function start(port) {
    var app = express();
    var server = require("http").createServer(app);

    var router = express.Router();
    router.use(express.static("./"));
    var bodyParser = require("body-parser");
    router.use(bodyParser.json({ "limit": "10MB" }));
    router.use(bodyParser.urlencoded({
        limit: "10MB",
        extended: true
    }));

    var storage = multer.diskStorage({
        destination: "uploads/",
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage });
    router.post("/upload", upload.single("file"), function (req, res) {
        res.send({
            name: req.file.filename,
            path: "/uploads/" + req.file.filename
        });
    });

    router.get("*", function (req, res) {
        var html = fs.readFileSync("./index.html");
        res.set("Content-Type", "text/html");
        res.send(html);
    });

    server.listen(port);
    app.use("/", router);
    console.log("[Prac] Start web server, listening on " + port + "...");
}

