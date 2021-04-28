"use strict";

const tf = require('@tensorflow/tfjs');
const math = require('mathjs');

function predictionMatrixResize(predArr, sizeXPredictions, sizeYPredictions, originalImgWidth, originalImgHeight) {
    // Reshape predArr => [sizeXPredictions, sizeYPredictions]
    predArr = math.reshape(predArr, [sizeXPredictions, sizeYPredictions]);
    // => Tensor [sizeXPredictions, sizeYPredictions, 1]
    predArr = tf.expandDims(predArr, 2);
    // Tensor predArr resize [originalImgWidth originalImgHeight 1]
    predArr = tf.image.resizeNearestNeighbor(predArr, [originalImgWidth, originalImgHeight]);
    // Resized Predictions Array (Array.length = originalImgWidth * originalImgHeight)
    predArr = predArr.dataSync();

    return predArr;
}

module.exports = {
    predictionMatrixResize: predictionMatrixResize,
}