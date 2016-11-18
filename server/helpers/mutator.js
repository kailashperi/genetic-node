/**
 * Created by danielabrao on 11/13/16.
 */
(function () {
    "use strict";

    var randomNumberGenerator = require("./randomNumberGenerator");

    function removeFitness (array) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][array[i].length - 1].hasOwnProperty("fitness")) {
                array[i].splice(-1, 1);
            }
        }
        return array;
    }

    function performMutation (item) {
        var mutationFactor = randomNumberGenerator(1, 1000);

        if (mutationFactor <= 0.05) {
            item[item.length - 1] = 1;
        }
        return item;
    }

    function crossOver (model, junk) {

        for (var i = 0; i < junk.length; i += 1) {
            for (var j = 0; j < junk[i].length / 3; j += 1) {
                console.log("mutating");
                junk[i][j] = model[i][j];
                performMutation(junk[i]);
            }
        }

        return removeFitness(junk);
    }

    module.exports = function (object) {
        if (object.removed.length) {
            return [].concat(object.processed, crossOver(object.processed, object.removed));
        } else {
            return [].concat(object.processed, crossOver(object.processed, object.removed));
            // return [].concat(object.processed, crossOver(object.processed, object.processed.reverse(), "positive"));
        }


    };

}());