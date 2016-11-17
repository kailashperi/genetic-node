/**
 * Created by danielabrao on 10/31/16.
 */
(function () {
    "use strict";


    //linha 2* CSV
    module.exports = function (attributes) {

        console.log(attributes);
        var item = {};

        for (var prop in attributes) {
            if (attributes.hasOwnProperty(prop)) {
                item[prop] = {
                    value: attributes[prop].value,
                    weightValue: attributes[prop].weightValue
                }
            }
        }

        return item;
    };

}());