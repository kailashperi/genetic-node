/**
 * Created by danielabrao on 10/31/16.
 */
(function () {
    "use strict";

    module.exports = function (options) {
        return {
            limit: options.limit || 10,
            weight: options.weight || 22,
            items: []
        }
    };

}());