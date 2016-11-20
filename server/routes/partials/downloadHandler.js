/**
 * Created by danielabrao on 11/19/16.
 */
(function () {
    "use strict";

    module.exports = function (app) {
        app.get("/downloadSample", function (req, res) {
            return res.status(200).download("./server/model/sample.txt");
        });
    };

}());