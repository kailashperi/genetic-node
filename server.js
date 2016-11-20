/*jslint node: true, nomen:true*/
(function () {
    "use strict";
    var express = require("express"),
        cfenv = require('cfenv'),
        appEnv = cfenv.getAppEnv(),
        bodyParser = require("body-parser"),
        engines = require("consolidate"),
        path = require("path"),
        ejs = require("ejs"),
        app = express(),
        server = require("http").createServer(app),
        io = require("socket.io")(server),
        eventEmitter = require("events"),
        inputProcesser = require("./server/helpers/inputProcesser"),
        hypothesisGenerator = require("./server/helpers/hypothesisGenerator"),
        fitnessEvaluator = require("./server/helpers/fitnessEvaluator"),
        mutator = require("./server/helpers/mutator"),
        compress = require("compression"),
        multer = require("multer"),
        upload = multer({
            fileFilter: function (req, file, cb) {
                console.log(file);
                if (file.mimetype === "text/csv" || file.mimetype === "text/plain") {
                    return cb(null, true);
                } else {
                    return cb(new Error("Apenas arquivo Texto"));
                }
            }
        }),
        fs = require("fs"),
        morgan = require("morgan");

    app.use(compress());
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(express["static"](path.join(__dirname, "./server/public/"), { maxAge: 16400000 }));
    app.use(express["static"](path.join(__dirname, "./client/")));


    app.set("views", __dirname + "/client");
    app.engine("html", engines.ejs);
    app.set("view engine", "html");



    require("./server/routes/index.js")(app, upload, inputProcesser, hypothesisGenerator, fitnessEvaluator, mutator, io, fs);


    server.listen(appEnv.port, appEnv.bind, function () {
        console.log(appEnv.url);
    });




}());