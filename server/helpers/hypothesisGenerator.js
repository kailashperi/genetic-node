/**
 * Created by danielabrao on 11/4/16.
 */
(function () {
    "use strict";

    var randomNumberGenerator = require("./randomNumberGenerator");

    var properties = {
        hypothesisArr: []
    };

    var methods = {
        //Hypothesis generator bootstrap
        //@PARAM {Number} containing backpack item length
        //Return {Array} containing array populated with chromosomes
        init: function (itemsLength) {
            var hypothesis;
            for (var i = 0; i < itemsLength; i += 1) {
                this.appendChromosome(this.generateChromosome(itemsLength));
            }
            hypothesis = this.getHypothesisArr();
            this.cleanHypothesisArr();
            return hypothesis;
        },
        //Get the generated hypothesis array
        //Return {Array} containing arrays of chromosomes
        getHypothesisArr: function () {
            return properties.hypothesisArr;
        },
        //Set the hypothesis array to empty initial state
        cleanHypothesisArr: function () {
            properties.hypothesisArr = [];
        },
        //Append a chromosome to hypothesis array
        //@PARAM {Array} containing a single chromosome
        appendChromosome: function (chromosome) {
            this.getHypothesisArr().push(chromosome);
        },
        //Create a new chromosome
        //Return {Array} containing a new chromosome
        generateChromosome: function (length) {
            var emptyArr = [];
            for (var i = 0; i < length; i += 1) {
                emptyArr.push(randomNumberGenerator(0, 1));
            }
            return emptyArr;
        }
    };

    module.exports = function (entry) {
        return methods.init(entry);
    };

}());
