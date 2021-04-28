"use strict";

const $ = require('jquery');
const vars = require('./vars');
const DnDAndImgDelete = require('./DnDAndImgDelete');
const downloadButton = require('./downloadButton');
const main = require('../tf-ml/main');
const preview = require('./predictIMGPreview');
const HSR = require('./hideShowRemoveBlock');

// * Predict Button
function hidePredictButton() {
    vars.predictButton.css("opacity", 0);

    setTimeout(() => {
        vars.predictButtonWrapper.css("z-index", -1);
    }, vars.downloadButtonTransition * 1000);
}

function handlePredictButtonClick() {
    if (vars.buttonStatus == "predict") {
        hidePredictButton();

        vars.buttonStatus = "again";
        DnDAndImgDelete.disableDnDandImageDelete();
        // Predicted IMGs preview
        preview.predictImgsPreview(vars.userFiles);
        // Start the algorithm when the button "Predict" is pressed 
        setTimeout(() => {
            main.modelPredictions(vars.userFiles);
        }, vars.predictButtonTransition * 1000 * 2);
    } else
        setWebPageStartState();
}

// * The function resets all settings 
function setWebPageStartState() {
    downloadButton.hideOrShowDownloadButton(false);
    smoothScrollToTop();

    while (Object.keys(vars.userFiles).length != 0) {
        let blockID = Object.keys(vars.userFiles)[0];
        let preImgBlock = vars.userFiles[blockID].predictImgWrapperId;

        // Removing the downloaded and predicted IMGs
        HSR.hideOrShowBlock(blockID);
        HSR.hideOrShowBlock(preImgBlock);
        HSR.removeBlock(blockID);
        HSR.removeBlock(preImgBlock);

        delete vars.userFiles[blockID];
    }

    hidePredictButton();
    vars.buttonStatus = "predict";
    DnDAndImgDelete.enableDnDandImageDelete();

    setTimeout(() => {
        bodyOverflow(true);
        vars.predictButtonTxt.html("Predict");
    }, vars.predictButtonTransition * 1000);
}

// * DnDdeactivate
function showDnDdeactivateBlock() {
    vars.deactivateInputBlock.css("display", "block");
}

// * DnDactivate
function hideDnDdeactivateBlock() {
    vars.deactivateInputBlock.css("display", "none");
}

// * DnD visualisations
function handleDragEnter() {
    downloadButton.unavailableInputInsideDownloadButton();
}

function handleDragLeave() {
    downloadButton.availableInputInsideDownloadButton();
}

// * Body
function bodyOverflow(hide = true) {
    if (hide) {
        smoothScrollToTop();
        $("body").css("overflow", "hidden");
    } else
        $("body").css("overflow", "auto");
}

// * Window Scroll
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

module.exports = {
    hidePredictButton: hidePredictButton,
    handlePredictButtonClick: handlePredictButtonClick,
    showDnDdeactivateBlock: showDnDdeactivateBlock,
    hideDnDdeactivateBlock: hideDnDdeactivateBlock,
    handleDragEnter: handleDragEnter,
    handleDragLeave: handleDragLeave,
    bodyOverflow: bodyOverflow,
    smoothScrollToTop: smoothScrollToTop,
}