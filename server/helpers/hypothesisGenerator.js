/**
 * Created by danielabrao on 11/4/16.
 */
(function () {
    "use strict";

    module.exports = function (entry) {

        var hypothesisArr = [];

        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function generateHypothesis(length) {
            var emptyArr = [];
            for (var i = 0; i < length; i += 1) {
                emptyArr.push(generateRandomNumber(0, 1));
            }
            return emptyArr;
        }

        for (var i = 0; i < entry.length; i += 1) {
            hypothesisArr.push(generateHypothesis(entry.length));
        }

        return hypothesisArr;
    };
}());