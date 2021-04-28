"use strict";

const math = require('mathjs');
const tf = require('@tensorflow/tfjs');

// * The function draws the user IMG on Canvas
function drawImgToCanvas(imgHTMLElement, rectangleData, ctx, imgSize) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Original Image
            ctx.drawImage(imgHTMLElement, 0, 0, imgSize, imgSize);
            // Rectangle
            ctx.beginPath();
            ctx.rect(rectangleData.rectangleOffsetX, rectangleData.rectangleOffsetY, rectangleData.rectangleSize, rectangleData.rectangleSize);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();

            resolve({
                ctx: ctx,
                size: imgSize,
            });
        }, 0);
    });
}

// * The function reshapes the IMG matrix
function imgReshape(ctx, imgSize) {
    // Uint8ClampedArray(200704): 224 x 224 x 4 (rgba)
    let imgMatrix = ctx.getImageData(0, 0, imgSize, imgSize).data;

    imgMatrix = Array.from(imgMatrix);
    // Array (length = 224 x 224 x 3)
    imgMatrix = arrFromRGBAtoRGB(imgMatrix);
    // Reshape imgData => [224, 224, 3]
    imgMatrix = math.reshape(imgMatrix, [imgSize, imgSize, 3]);
    // => [1, 224, 224, 3]
    imgMatrix = tf.expandDims(imgMatrix, 0);

    return imgMatrix;
}

// * The function removes A from RGBA
function arrFromRGBAtoRGB(arr) {
    let num = 0,
        resArr = [];

    for (let i = 0; i < arr.length; i++, num++) {
        if (num == 3) {
            num = -1;
            continue;
        } else
            resArr.push(arr[i]);
    }

    return resArr;
}

module.exports = {
    drawImgToCanvas: drawImgToCanvas,
    imgReshape: imgReshape,
}