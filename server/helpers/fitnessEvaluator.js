/**
 * Created by danielabrao on 11/5/16.
 */
(function () {
    "use strict";

    var properties = {
        limit: 200,
        items: []
    };

    var methods = {
        init: function (limit, items, dataSet) {
            properties.limit = limit || 200;
            properties.items = items || [];
            return this.fitness(dataSet);
        },
        evaluate: function evaluate(attributes) {
            if (attributes.weight > properties.limit || !attributes.weight) {
                return 0;
            }

            return (attributes.price * 0.00100);
        },
        removeUnfit: function removeUnfit(itemsToCheck) {
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
        },
        fitness: function fitness (dataSet) {
            for (var i = 0; i < dataSet.length; i += 1) {
                var weightCounter = 0,
                    valueCounter = 0,
                    totalItems = 0;
                for (var j = 0; j < dataSet[i].length; j += 1) {
                    if (dataSet[i][j]) {
                        weightCounter += Number(properties.items[i].weight.value);
                        valueCounter += Number(properties.items[i].price.value);
                        totalItems += 1;
                    }
                }

                if (dataSet[i][dataSet[i].length - 1].hasOwnProperty("fitness")) {
                    console.log("has fitness");
                } else {
                    dataSet[i].push({
                        "fitness": this.evaluate({
                            "weight": weightCounter,
                            "price": valueCounter,
                            "totalItems": totalItems
                        })
                    });
                }
            }

            var data = this.removeUnfit(dataSet);

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
        },
        sortHypothesis: function (hypothesis) {

        }
    };

    module.exports = function (configs) {
        return methods.init(configs.limit, configs.items, configs.dataSet);
    };

}());