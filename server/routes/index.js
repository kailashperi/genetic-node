/**
 * Created by danielabrao on 10/31/16.
 */
/*jslint node:true*/
(function () {
    'use strict';

    var inputHandler = require('./partials/inputHandler');


    module.exports = function (app, upload, inputProcesser, hipothesisGenerator, fitnessEvaluator, mutator, eventEmitter, io, fs) {
        inputHandler(app, upload, inputProcesser, hipothesisGenerator, fitnessEvaluator, mutator, eventEmitter, io, fs);

        app.get('/hi', function (req, res) {
            return res.status(200).send('working');
        });
    };

}());
