/**
 * Created by danielabrao on 11/5/16.
 */
(function () {
    "use strict";

    module.exports = function (configs) {

        console.log("ENTERING FITNESS EVALUATION");
        console.log(configs.dataSet);
        console.log("\n");

        function evaluate(attributes) {
            if (attributes.weight > configs.limit || !attributes.weight) {
                return 0;
            }

            return (attributes.price * 0.00100);
        }

        function removeUnfit(itemsToCheck) {
            var removalReference = 0,
                removalIndex = [],
                removed = [];

            for (var i = 0; i < itemsToCheck.length; i += 1) {
                if (itemsToCheck[i][itemsToCheck[i].length - 1].fitness === 0) {
                    removalIndex.push(i);
                }
            }

            for (var k = 0; k < removalIndex.length; k += 1) {
                removed.push(itemsToCheck.splice(removalIndex[k] - removalReference, 1)[0]);
                removalReference += 1;
            }

            return {
                "processed": itemsToCheck,
                "removed": removed
            };
        }


        function fitness (dataSet) {
            for (var i = 0; i < dataSet.length; i += 1) {
                var weightCounter = 0,
                    valueCounter = 0,
                    totalItems = 0;
                for (var j = 0; j < dataSet[i].length; j += 1) {
                    if (dataSet[i][j]) {
                        weightCounter += Number(configs.items[i].weight.value);
                        valueCounter += Number(configs.items[i].price.value);
                        totalItems += 1;
                    }
                }

                if (dataSet[i][dataSet[i].length - 1].hasOwnProperty("fitness")) {
                    console.log("has fitness");
                } else {
                    dataSet[i].push({
                        "fitness": evaluate({
                            "weight": weightCounter,
                            "price": valueCounter,
                            "totalItems": totalItems
                        })
                    });
                }
            }

            var data = removeUnfit(dataSet);

            data.processed.sort(function (a, b) {
                try {
                    return b[b.length - 1].fitness - a[a.length - 1].fitness
                } catch (e) {
                    console.log(e);
                    return b - a;
                }
            });

            return {
                "processed": data.processed,
                "removed": data.removed
            };
        }

        var x = fitness(configs.dataSet);

        return x;

    };

}());