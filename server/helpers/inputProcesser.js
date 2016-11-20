/**
 * Created by danielabrao on 10/31/16.
 */
//
/**
 * Created by danielabrao on 10/31/16.
 */
(function () {
    "use strict";

    var readline = require("readline");

    var properties = {
        "itemArr": []
    };

    var methods = {
        //File information extraction boostrap
        //@PARAM {String} containing the file path to be read
        //@PARAM {JSON} file system object
        //Start promise that resolve items extracted from file
        "init": function (path, fs) {
            return readline.createInterface({
                "input": fs.createReadStream(path)
            });
        },
        //Get item array
        //Return items array
        "getItemArr": function () {
            return properties.itemArr;
        },
        //Set items array to empty initial state
        "cleanItemArr": function () {
            properties.itemArr = [];
        },
        //Append attributes to each item present in file
        //@PARAM {JSON} containing weight and price info
        "appendAttributes": function (attributes) {
            this.getItemArr().push(attributes);
        },
        //Callback to be executed on each line read from file
        //@PARAM {Array} representing the line read
        "lineReaderCallback": function (line) {
            if (line === "undefined") {
                return;
            }
            var lineEl = line.split(",");

            methods.appendAttributes({
                "weight": {
                    value: lineEl[0],
                    weightValue: 0
                },
                "price": {
                    value: lineEl[1],
                    weightValue: 0
                }
            });
        }
    };

    module.exports = function (path, fs) {
        return new Promise(function (resolve, reject) {

            try {
                var lineReader = methods.init(path, fs),
                    items;

                lineReader.on('line', methods.lineReaderCallback);

                lineReader.on("close", function () {
                    items = methods.getItemArr();
                    methods.cleanItemArr();
                    resolve({
                        "items": items
                    });
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }

        });
    };

}());