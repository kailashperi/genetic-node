/**
 * Created by danielabrao on 11/18/16.
 */
(function () {
    "use strict";

    module.exports = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
}());