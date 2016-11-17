/**
 * Created by danielabrao on 11/14/16.
 */
(function () {
    "use strict";

    module.exports = function () {
        return {
            getFile: function (input) {
                try {
                    return input.files[0];
                } catch (e) {
                    return "error gathering file";
                }
            },
            getLimit: function (input) {
                try {
                    return input.value;
                } catch (e) {
                    return "error retrieving value";
                }
            }
        };
    };

}());