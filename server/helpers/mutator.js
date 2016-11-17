/**
 * Created by danielabrao on 11/13/16.
 */
(function () {
    "use strict";


    function removeFitness (array) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][array[i].length - 1].hasOwnProperty("fitness")) {
                array[i].splice(-1, 1);
            }
        }
        return array;
    }

    function performMutation (model, junk) {
        console.log(model);
        console.log(junk);
        for (var i = 0; i < junk.length; i += 1) {
            for (var j = 0; j < junk[i].length / 3; j += 1) {
                junk[i][j]= model[i][j];
            }
        }
        return removeFitness(junk);
    }

    module.exports = function (object) {
        // if (object.removed.length) {
            return [].concat(object.processed, performMutation(object.processed, object.removed));
        // } else {
            // return [].concat(object.processed, performMutation(object.processed, object.removed));
        // }


    };

}());