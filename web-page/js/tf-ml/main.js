"use strict";

const $ = require('jquery');
const imgPreparing = require('./imgPreparing');
const tfVars = require('./tfVars');
const predictionsPreparing = require('./predictionsPreparing');
const againBut = require('../blocks/showAgainOrPredictButtons');
const averallScore = require('./averallScore');
const predArrToRGBAArr = require('./originalSizePredArrToRGBAArr');
const render = require('./heatMapRender');

async function modelPredictions(userFiles) {
    // Canvas settings
    const canvas = $("#canvasForTfImgResize");
    const ctx = canvas.get(0).getContext("2d");
    const imgSize = canvas.width();
    // Canavs rectangle fill settings
    let rectSize = 0;
    let step_x, step_y = 0;
    let rectangleData = {
        rectangleSize: 0,
        rectangleOffsetX: 0,
        rectangleOffsetY: 0,
    };

    if (tfVars.modelIsLoaded) {
        // Every user image
        for (let imgWrapperId in userFiles) {
            let curImgWrapperObj = userFiles[imgWrapperId];
            let prediction = 0;
            // Current user image
            let imgHTMLElement = document.getElementById(`${curImgWrapperObj.loadedImgId}`);
            let currImgValuesArr = [];
            // The max count of Rectangles 
            let xRectCount = 0;
            let yRectCount = 0;

            // Size of rectangle  
            rectSize = 32;
            rectangleData.rectangleSize = rectSize;
            // Steps
            step_x = rectSize - (rectSize / 4);
            step_y = rectSize - (rectSize / 2);

            // Getting the averall score
            prediction = await drawImgAndPredict(imgHTMLElement, rectangleData, ctx, imgSize);
            // Showing the averall score            
            averallScore.changeAverallScore(curImgWrapperObj.predictImgAverallScoreId, prediction);

            // Image data with rectangle
            for (let y = 0; y < imgSize; y += step_y) {
                for (let x = 0; x < imgSize; x += step_x) {
                    if (y == 0)
                        xRectCount++;
                    if (x == 0)
                        yRectCount++;

                    rectangleData.rectangleOffsetX = x;
                    rectangleData.rectangleOffsetY = y;

                    // Drawing The Image on Canvas And Making Predictions
                    prediction = await drawImgAndPredict(imgHTMLElement, rectangleData, ctx, imgSize);
                    // Array of current image Predictions [xRectCount * yRectCount]
                    currImgValuesArr.push(prediction);
                }
            }

            // Resize prediction matrix to original image size
            let originalSizePredictionsArr = predictionsPreparing.predictionMatrixResize(
                currImgValuesArr,
                xRectCount,
                yRectCount,
                curImgWrapperObj.originalImageBlockWidth,
                curImgWrapperObj.originalImageBlockHeight);

            // Preparing originalSizePredictionsArr to My canvas HeatMap
            let scaledOriginalSizePredArrRGBA = predArrToRGBAArr.originalSizePredArrToRGBAArr(originalSizePredictionsArr, currImgValuesArr, 0, 255);
            render.heatMapRender(scaledOriginalSizePredArrRGBA, curImgWrapperObj);
        }
    }

    // Show Again button
    againBut.showAgainButton();
}

// * The Function Draws The Image on Canvas And Makes Predictions
function drawImgAndPredict(imgHTMLElement, rectangleData, ctx, imgSize) {
    return new Promise((resolve, reject) => {
        resolve(asyncDrawImgAndPredict());
    });

    async function asyncDrawImgAndPredict() {
        // Original image with rectangle
        const imgData = await imgPreparing.drawImgToCanvas(imgHTMLElement, rectangleData, ctx, imgSize);
        const reshapedIMGmatrix = imgPreparing.imgReshape(imgData.ctx, imgData.size);
        const predictionsResultTensor = await tfVars.model.predict(reshapedIMGmatrix);
        // Current Prediction
        return (predictionsResultTensor.dataSync()[0]);
    }
}

module.exports = {
    modelPredictions: modelPredictions,
}