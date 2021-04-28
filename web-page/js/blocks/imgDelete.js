"use strict";

const vars = require('./vars');
const animation = require('./blocksVisualisation');
const HSR = require('./hideShowRemoveBlock');

// * The function deletes uploaded images
function deleteLoadedImg(e) {
    const blockToDeleteId = e.target.offsetParent.attributes[1].nodeValue;
    const imgBlock = HSR.hideOrShowBlock(blockToDeleteId);
    delete vars.userFiles[blockToDeleteId];

    if (Object.keys(vars.userFiles).length == 0) {
        bodyOverfAndHidePredButt();
    }

    setTimeout(() => {
        imgBlock.remove();
    }, vars.predictButtonTransition * 1000);

    return false;
}

function bodyOverfAndHidePredButt() {
    animation.bodyOverflow(true);
    animation.hidePredictButton();
}

module.exports = {
    deleteLoadedImg: deleteLoadedImg,
    bodyOverfAndHidePredButt: bodyOverfAndHidePredButt,
}