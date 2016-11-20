/**
 * Created by danielabrao on 11/13/16.
 */
(function () {
    "use strict";

    var randomNumberGenerator = require("./randomNumberGenerator");

    var properties = {
        "validChromosomes": [],
        "removedChromosomes": []
    };

    var methods = {
        //Mutation process bootstrap
        //@PARAM {JSON} containing two arrays of chromosomes
        //return {Array} a new set of chromosomes to be evaluated again
        "init": function (object) {
            this.setChromosomes("validChromosomes", object.processed).setChromosomes("removedChromosomes", object.removed);

            var valid = this.getChromosomes("validChromosomes"),
                invalid = this.getChromosomes("removedChromosomes");

            if (invalid.length > valid.length) {
                return invalid.concat(valid, this.crossOver(invalid, this.breakProcessed(invalid)));
            } else if (invalid.length && valid.length) {
                return [].concat(valid, this.crossOver(valid, invalid));
            } else if (valid.length) {
                return [].concat(valid, methods.crossOver(valid, this.breakProcessed(valid)));
            }
        },
        //Set the context property to be manipulated
        //@PARAM {String} containing a context identification
        //@PARAM {Array} containing a chromosome list
        //return the methods object reference
        "setChromosomes": function (context, chromosomesArray) {
            properties[context] = chromosomesArray;
            return this;
        },
        //Get the chromosome list in a given context
        //@PARAM {String} containing a context identification
        //return {Array} chromosome list
        "getChromosomes": function (context) {
            return properties[context];
        },
        //Remove all fitness from new array
        //@PARAM {Array} containing a chromosome
        //return {Array} chromosome w/o fitness value
        "removeFitness": function (array) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][array[i].length - 1].hasOwnProperty("fitness")) {
                    array[i].splice(-1, 1);
                }
            }
            return array;
        },
        //Perform the genetic mutation
        //@PARAM {Array} containing a chromosome
        //return {Array} mutated chromosome
        "performMutation": function (item) {
            var mutationFactor = randomNumberGenerator(1, 1000);
            for (var i = 0; i < Math.round(item.length / 3) * 2; i += 1) {
                if (mutationFactor <= 0.05) {
                    item[i] = 1;
                }
            }
            return item;
        },
        //Perform the genetic mutation
        //@PARAM {Array} containing a chain of best chromosome in context hypothesis
        //@PARAM {Array} containing a chain of worst chromosome in context hypothesis
        //return {Array} with clean new hypothesis
        "crossOver": function (model, junk) {
            for (var i = 0; i < junk.length; i += 1) {
                for (var j = 0; j < Math.round(junk[i].length / 3); j += 1) {
                    junk[i][j] = model[i][j];
                }
                this.performMutation(junk[i]);
            }

            return this.removeFitness(junk);
        },
        //Split the processed hypothesis if no excluded chromosomes present
        //@PARAM {Array} containing a chain of best chromosome in context hypothesis
        //return {Array} new set of chromosomes to be mutated
        "breakProcessed": function (processed) {
            var contextLength = (processed.length - (processed.length / 4)),
                removalLength = processed.length / 4;

            if (contextLength < 1) {
                contextLength = 1;
            }

            if (removalLength < 1) {
                removalLength = 1;
            }

            return processed.splice(contextLength, removalLength);
        }
    };

    module.exports = function (object) {
        return methods.init(object);
    };

}());