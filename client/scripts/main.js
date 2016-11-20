/**
 * Created by danielabrao on 11/14/16.
 */
(function () {
    "use strict";

    var socket = require('../../server/public/libs/socket.io-client/socket.io')(),
        interfaceObj = require("./controller/interface.controller"),
        inputController = require("./controller/input.controller")(),
        renderController = require("./controller/render.controller")(),
        socketController = require("./controller/socket.controller")(socket, inputController, interfaceObj, renderController),
        ajaxFactory = require("./factory/ajax.factory")();

    var methods = {
        "attachSocketEvents": function () {
            interfaceObj.triggerBtn.addEventListener("click", socketController.processData);
            socket.on("dataSet", socketController.dataHandler);
            socket.on("mutation", socketController.mutationHandler);
            socket.on("result", socketController.resultHandler);
            socket.on("error", socketController.errorHandler);
        },
        "detachSocketEvents": function () {
            interfaceObj.triggerBtn.removeEventListener("click", socketController.processData);
            socket.removeEventListener("dataSet", socketController.dataHandler);
            socket.removeEventListener("mutation", socketController.mutationHandler);
            socket.removeEventListener("result", socketController.resultHandler);
            socket.removeEventListener("error", socketController.errorHandler);
        },
        "init": function () {
            var self = this;
            socket.on("connect", function () {
                self.attachSocketEvents();
                console.log("connected");
            });

            socket.on("disconnect", function () {
                self.detachSocketEvents();
                console.log("disconnected");
            });
        }
    };

    methods.init();

}());