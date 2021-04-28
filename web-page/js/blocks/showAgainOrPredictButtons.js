"use strict";

const vars = require('./vars');

// * Again Buttom
function showAgainButton() {
    setTimeout(() => {
        vars.predictButtonTxt.html("Again");
        showPredictButton();
    }, vars.predictButtonTransition * 1000);
}

// * Predict Button
function showPredictButton() {
    vars.predictButton.css("opacity", 1);
    vars.predictButtonWrapper.css("z-index", "var(--contentButtonWrapperZindex)");
}

module.exports = {
    showAgainButton: showAgainButton,
    showPredictButton: showPredictButton,
}