"use strict";

const $ = require('jquery');
const HSR = require('../blocks/hideShowRemoveBlock');

function heatMapRender(rgbaArr, currUserFileObj) {
    new Promise((resolve, reject) => {
        const Uint8RGBAData = new Uint8ClampedArray(rgbaArr);
        const canvas = $(`#${currUserFileObj.predictedCanvas}`);
        const ctx = canvas.get(0).getContext("2d");

        // create imageData object
        const ctxImgData = ctx.createImageData(parseInt(canvas.width()), parseInt(canvas.height()));

        // Set imageData
        ctxImgData.data.set(Uint8RGBAData);
        // Update canvas with new data
        ctx.putImageData(ctxImgData, 0, 0);

        // Hiding the prediction loading block
        HSR.hideOrShowBlock(currUserFileObj.predictImgId, false, 0);
        HSR.hideOrShowBlock(currUserFileObj.predictImgLoadingBarId, true);

        resolve();
    }).catch((err) => {
        console.log(`Error\n${err}`);
        // Error IMG
        HSR.hideOrShowBlock(currUserFileObj.predictImgErrorId, false, 0);
    });
}

module.exports = {
    heatMapRender: heatMapRender,
}