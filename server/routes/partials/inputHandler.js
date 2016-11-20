/**
 * Created by danielabrao on 10/31/16.
 */
/*jslint node:true*/
(function () {
    "use strict";

    module.exports = function (app, upload, inputProcesser, hypothesisGenerator, fitnessEvaluator, mutator, io, fs) {

        io.on("connection", function (socket) {
            console.log("socket connected");
            socket.once("disconnect", function () {
                console.log([io.engine.clientsCount, "Clients connected after this exit"].join(" "));
            });

            socket.on("tst", function (request) {
                fs.writeFile("./server/tmp/entry.txt", request.file, function (err) {
                    if (err) {
                        console.log(err);
                        socket.emit("error", err);
                    } else {
                        inputProcesser("./server/tmp/entry.txt", fs).then(function (data) {
                            if (data.items.length) {
                                socket.emit("dataSet", data);
                                var hypothesisArr = hypothesisGenerator(data.items.length),
                                    mutationLimit = request.mutationLimit || 10,
                                    evaluated = fitnessEvaluator({
                                        "limit": request.limit,
                                        "items": data.items,
                                        "hypothesis": JSON.parse(JSON.stringify(hypothesisArr))
                                    });

                                for (var i = 0; i < mutationLimit; i += 1) {
                                    try {
                                        var d = mutator(JSON.parse(JSON.stringify(evaluated)));
                                        evaluated = fitnessEvaluator({
                                            "limit": request.limit,
                                            "items": data.items,
                                            "hypothesis": d
                                        });
                                        socket.emit("mutation", evaluated);
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }

                                socket.emit("result", {
                                    items: data.items,
                                    hypothesis: evaluated
                                });
                            } else {
                                socket.emit("error", "Invalid file input");
                            }

                        });
                    }
                });
            });
        });

        app.post("/csv", upload.single("csv"), function (req, res) {
            try {
                var file = req.file.buffer.toString();
                fs.writeFile("./server/tmp/entry.txt", file, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    } else {
                        inputProcesser("./server/tmp/entry.txt").then(function (data) {
                            var hypothesisArr = hypothesisGenerator(data.items),
                                mutationLimit = 10,
                                evaluated = fitnessEvaluator(data.limit, data.items, hypothesisArr);
                            //
                            for (var i = 0; i < mutationLimit; i += 1) {
                                evaluated = fitnessEvaluator(data.limit, data.items, mutator(evaluated.processed, evaluated.removed));
                            }

                            return res.status(200).json({
                                hypothesis: evaluated
                            });
                        });
                    }
                });

            } catch (e) {
                console.log(e);
                return res.status(500).send("Arquivo não encontrado");
            }

        });
    };

}());