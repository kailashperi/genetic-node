/**
 * Created by danielabrao on 11/15/16.
 */
(function () {
    "use strict";

    var mutationCount = 0;

    function buildElements (object) {
        var els = {},
            div = document.createElement("div");

        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                div.appendChild(document.createTextNode([prop, object[prop].value].join(": ")))
            }
        }

        return div;
    }


    ///FIX SUBHEADERS GENERATION - ACCEPTED AND REMOVED;

    function buildList (items) {
        console.log(items);
        mutationCount += 1;
        var outerDiv = document.createElement("div");
        var header = document.createElement("h5");
        header.appendChild(document.createTextNode(["Generation Number: ", mutationCount].join("")));
        outerDiv.append(header);
        var subheader = document.createElement("h6");
        subheader.appendChild(document.createTextNode("Aceitos"));
        outerDiv.appendChild(subheader);

        items.processed.forEach(function (hypothesis) {
            var innerDiv = document.createElement("div"),
                fitnessSpan = document.createElement("span");

            for (var i = 0; i < (hypothesis.length - 1); i += 1) {
                var span = document.createElement("span");
                span.appendChild(document.createTextNode(hypothesis[i]));

                if (hypothesis[i]) {
                    span.classList.add("value");
                } else {
                    span.classList.add("empty");
                }

                innerDiv.appendChild(span);
            }

            fitnessSpan.appendChild(document.createTextNode(hypothesis[hypothesis.length - 1].fitness));
            innerDiv.appendChild(fitnessSpan);
            outerDiv.appendChild(innerDiv);
        });



        var subheader = document.createElement("h6");
        subheader.appendChild(document.createTextNode("Excluidos"));

        outerDiv.appendChild(subheader);
        items.removed.forEach(function (hypothesis) {
            var innerDiv = document.createElement("div"),
                // header = document.createElement("h6"),
                fitnessSpan = document.createElement("span");

            // innerDiv.appendChild(header);
            for (var i = 0; i < (hypothesis.length - 1); i += 1) {
                var span = document.createElement("span");
                span.appendChild(document.createTextNode(hypothesis[i]));

                if (hypothesis[i]) {
                    span.classList.add("value");
                } else {
                    span.classList.add("empty");
                }

                innerDiv.appendChild(span);
            }

            fitnessSpan.appendChild(document.createTextNode(hypothesis[hypothesis.length - 1].fitness));
            innerDiv.appendChild(fitnessSpan);
            outerDiv.appendChild(innerDiv);
        });

        return outerDiv;
    }

    module.exports = function () {
        return {
            "drawReadDataList": function (data, parentContainer) {
                var docFragment = document.createDocumentFragment();
                for (var i = 0; i < data.length; i += 1) {
                    docFragment.appendChild(buildElements(data[i]));
                }

                parentContainer.appendChild(docFragment);
            },
            "drawGenerationsList": function (data, parentContainer) {
                var docFragment = document.createDocumentFragment();
                // console.log(buildList(data.processed));
                docFragment.appendChild(buildList(data));

                parentContainer.appendChild(docFragment);
            },
            "clearList": function (parentContainer) {
                mutationCount = 0;
                while (parentContainer.hasChildNodes()) {
                    parentContainer.removeChild(parentContainer.firstChild);
                }
                return this;
            }
        };
    };

}());