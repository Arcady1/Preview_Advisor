"use strict";

const $ = require('jquery');
const vars = require('./vars');
const HSR = require('./hideShowRemoveBlock');
const templateHTMLblocks = require('./templateHTMLblocks');

function predictImgsPreview(userFiles) {
    for (let fileId in userFiles) {
        let curUserObj = userFiles[fileId];
        let predictImgBlock = templateHTMLblocks.predictedImgPreview(
            curUserObj.predictImgWrapperId,
            curUserObj.predictImgId,
            curUserObj.predictImgLoadingBarId,
            curUserObj.predictImgAverallScoreId,
            curUserObj.predictedCanvas,
            curUserObj.predictImgErrorId
        );
        let parentImgBlock = $(`#${curUserObj.parentImgID}`);
        let parentImgWidth = parseInt(parentImgBlock.width());
        let parentImgHeight = parseInt(parentImgBlock.height());

        // Original Image Size
        curUserObj.originalImageBlockWidth = parentImgWidth;
        curUserObj.originalImageBlockHeight = parentImgHeight;

        // Adding an predictImgBlock to DOM
        predictImgBlock = $(predictImgBlock).css("width", `${parentImgWidth}`);
        vars.predictImgs.append(predictImgBlock);

        // Predict canvas resize
        let predictImgCanvas = $(`#${curUserObj.predictedCanvas}`);
        predictImgCanvas.width(parentImgWidth);
        predictImgCanvas.height(parentImgHeight);

        // Predict IMG block image = loaded IMG
        let parentImgSrc = $(`#${curUserObj.loadedImgId}`).attr("src");
        $(`#${curUserObj.predictImgId}`).attr("src", `${parentImgSrc}`);

        // Show the block
        HSR.hideOrShowBlock(curUserObj.predictImgWrapperId, false);
    }
}

module.exports = {
    predictImgsPreview: predictImgsPreview,
}