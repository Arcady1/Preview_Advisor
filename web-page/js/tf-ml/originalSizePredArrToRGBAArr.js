"use strict";

// * The function prepares an array of predictions for drawing on the canvas
function originalSizePredArrToRGBAArr(originalSizePredArr, smallSizePredArr, rgbChannel = 0, alpha = 1) {
    // Min and Max predicted values
    const minAndMaxPredVal = findMinAndMaxPredVal(smallSizePredArr);
    const minVal = minAndMaxPredVal.min;
    const maxVal = minAndMaxPredVal.max;
    // Scaled predicted values; Map {predVal: scaledVal}
    const targetMinScale = 0;
    const targetMaxScale = 255;
    const scaledPredMap = getScaledPredictions(smallSizePredArr, minVal, maxVal, targetMinScale, targetMaxScale);
    // Scaled originalSizePredArr
    const scaledOriginalSizePredArr = scalingOriginalArr(originalSizePredArr, scaledPredMap);
    // scaledOriginalSizePredArr to RGBA
    return scaledArrToRGBAFormat(scaledOriginalSizePredArr, rgbChannel, alpha);
}

// * The function finds the minimum and maximum values from the array of predictions; it returns an object
function findMinAndMaxPredVal(arr) {
    let min = Number.POSITIVE_INFINITY,
        max = Number.NEGATIVE_INFINITY;

    arr.forEach((num) => {
        if (num > max)
            max = num;
        if (num < min)
            min = num;
    });

    return ({
        min,
        max
    });
}

// * The function scales numbers; it returns an object 
function getScaledPredictions(smallSizePredArr, minVal, maxVal, targetMinScale, targetMaxScale) {
    const resMap = new Map()

    smallSizePredArr.forEach((num) => {
        resMap.set(num, minMaxScaler(num, maxVal, minVal, targetMinScale, targetMaxScale));
    });

    return resMap;
}

// * The function scales numbers within a given range
function minMaxScaler(X, X_max, X_min, min, max) {
    let X_std = (X - X_min) / (X_max - X_min);

    return parseInt(X_std * (max - min) + min);
}

// * Scaling the original prediction array 
function scalingOriginalArr(originalSizePredArr, scaledPredMap) {
    let resArr = originalSizePredArr.slice();

    for (let i = 0; i < resArr.length; i++)
        resArr[i] = scaledPredMap.get(resArr[i]);

    return resArr;
}

// * The function adds channels to the scaled array; rgbChannel: R = 0, G = 1, B = 2; alpha = 0...255
function scaledArrToRGBAFormat(scaledArr, rgbChannel, alpha) {
    let RGBAarr = [];

    for (let i = 0; i < scaledArr.length; i++) {
        if (rgbChannel == 0)
            RGBAarr.push(scaledArr[i], 0, 0, alpha);
        else if (rgbChannel == 1)
            RGBAarr.push(0, scaledArr[i], 0, alpha);
        else if (rgbChannel == 2)
            RGBAarr.push(0, 0, scaledArr[i], alpha);
    }

    return RGBAarr;
}

module.exports = {
    originalSizePredArrToRGBAArr: originalSizePredArrToRGBAArr,
}