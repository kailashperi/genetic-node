/**
 * Created by danielabrao on 11/4/16.
 */
(function () {
    "use strict";

    var randomNumberGenerator = require("./randomNumberGenerator");


    module.exports = function (entry) {

        var hypothesisArr = [];

        function generateHypothesis(length) {
            var emptyArr = [];
            for (var i = 0; i < length; i += 1) {
                emptyArr.push(randomNumberGenerator(0, 1));
            }
            return emptyArr;
        }

        for (var i = 0; i < entry.length; i += 1) {
            hypothesisArr.push(generateHypothesis(entry.length));
        }

        return hypothesisArr;
    };
}());