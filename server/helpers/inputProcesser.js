/**
 * Created by danielabrao on 10/31/16.
 */
(function () {
    "use strict";

    module.exports = function (path) {
        return new Promise(function (resolve, reject) {

            var lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(path)
            });
            var itemArr = [];

            lineReader.on('line', function (line) {
                var lineEl = line.split(",");
                itemArr.push({
                    "weight": {
                        value: lineEl[0],
                        weightValue: 0
                    },
                    "price": {
                        value: lineEl[1],
                        weightValue: 0
                    }
                });
            });

            lineReader.on("close", function () {
                resolve({
                    "items": itemArr
                });
            });
        });
    };

}());