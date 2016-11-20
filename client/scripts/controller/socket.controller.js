/**
 * Created by danielabrao on 11/15/16.
 */
(function () {
    "use strict";

    module.exports = function (socket, inputController, interfaceObj, renderController) {
        return {
            "dataHandler": function (data) {
                console.log("data received");
                renderController.drawReadDataList(data.items, interfaceObj.dataContainer);
            },
            "mutationHandler": function mutationHandler (generations) {
                console.log("generation");
                renderController.drawGenerationsList(generations, interfaceObj.generationsContainer);
            },
            "resultHandler": function resultHandler(result) {
                console.log("result");
                console.log(result);
            },
            "processData": function processData() {
                renderController.clearList(interfaceObj.dataContainer).clearList(interfaceObj.generationsContainer);
                socket.emit("tst", {
                    "limit": inputController.getLimit(interfaceObj.limitInput),
                    "mutationLimit": inputController.getLimit(interfaceObj.mutationLimitInput),
                    "file": inputController.getFile(interfaceObj.fileElement)
                });
            },
            "errorHandler": function (err) {
                console.log("ERROR DETECTED");
                console.log(err);
            }
        };
    };

}());