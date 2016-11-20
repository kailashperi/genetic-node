/**
 * Created by danielabrao on 11/5/16.
 */
(function () {
    "use strict";

    var properties = {
        "limit": 0,
        "items": []
    };

    var methods = {
        //Fitness evaluation process bootstrap
        //@PARAM {Number} containing backpack limit
        //@PARAM {Array} containing backpack items
        //@PARAM {Array} containing a chromosomes list
        //Return {JSON} containing arrays of good and bad chromosomes
        "init": function (limit, items, hypothesis) {
            this.setLimit(limit).setItems(items);
            return this.fitness(hypothesis);
        },
        //Set the backpack weight limit - default 200
        //@PARAM {Number} containing backpack limit
        //return the methods object reference
        "setLimit": function (limitValue) {
            properties.limit = limitValue || 200;
            return this;
        },
        //Get backpack weight limit information
        //return {Number} limit number
        "getLimit": function () {
            return properties.limit;
        },
        //Set the available items to fulfill the backpack
        //@PARAM {Array} containing backpack items
        //return the methods object reference
        "setItems": function (items) {
            properties.items = items || [];
            return this;
        },
        //Get available items
        //return {Array} items array
        "getItems": function () {
            return properties.items;
        },
        //Orchestrate the hypothesis array to bind a chromosome bit with an available item
        //@PARAM {Array} containing a chromosome array
        //return {JSON} with the evaluated information
        "fitness": function fitness (hypothesis) {
            var items = this.getItems(),
                data;
            for (var i = 0; i < hypothesis.length; i += 1) {
                var weightCounter = 0,
                    valueCounter = 0,
                    totalItems = 0;
                for (var j = 0; j < hypothesis[i].length; j += 1) {
                    if (hypothesis[i][j]) {
                        weightCounter += Number(items[i].weight.value);
                        valueCounter += Number(items[i].price.value);
                        totalItems += 1;
                    }
                }

                if (hypothesis[i][hypothesis[i].length - 1].hasOwnProperty("fitness")) {
                    console.log("has fitness");
                } else {
                    hypothesis[i].push({
                        "fitness": this.evaluate({
                            "weight": weightCounter,
                            "price": valueCounter,
                            "totalItems": totalItems
                        })
                    });
                }
            }

            data = this.removeUnfit(hypothesis);

            return {
                "processed": this.sortHypothesis(data.processed),
                "removed": data.removed
            };
        },
        //Attach a coefficient value to a chromosome bit
        //@PARAM {JSON} containing a item reference to a given chromosome bit
        //return {Number} to be appended as the fitness value
        "evaluate": function evaluate(attributes) {
            if (attributes.weight > this.getLimit() || !attributes.weight) {
                return 0;
            }

            return (attributes.price * 0.00100);
        },
        //Iterate through all evaluated chromosomes in hypothesis to discard those who doesnt fit
        //@PARAM {Array} containing a chromosome list
        //return {JSON} with good and bad hypothesis
        "removeUnfit": function removeUnfit(itemsToCheck) {
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
        //Sort hypothesis descending by value info
        //@PARAM {Array} containing fit chromosomes
        //return {Array} with sorted array
        "sortHypothesis": function (hypothesis) {
            return hypothesis.sort(function (a, b) {
                try {
                    return b[b.length - 1].fitness - a[a.length - 1].fitness
                } catch (e) {
                    console.log(e);
                    return b - a;
                }
            });
        }
    };

    module.exports = function (configs) {
        return methods.init(configs.limit, configs.items, configs.hypothesis);
    };

}());