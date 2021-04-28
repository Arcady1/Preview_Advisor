"use strict";

const tf = require('@tensorflow/tfjs');
const modelPath = '../../model/youtube_layer_model/tmp/model.json';
const tfVars = require('./tfVars');
const HSR = require('../blocks/hideShowRemoveBlock');

async function modelLoading() {
    await tf.loadLayersModel(modelPath)
        .then((LoadedModel) => {
            tfVars.model = LoadedModel;
            tfVars.modelIsLoaded = true;
            console.log("The model is loaded!");

            // Hide Preloader
            HSR.hideOrShowBlock("preloader");
            HSR.removeBlock("preloader");
        })
        .catch((err) => {
            console.log(`Error!\nThe model is not loaded...\n${err}`);
            // Show Error Preloader
            HSR.hideOrShowBlock("preloader-err", false);
        });
}

module.exports = {
    modelLoading: modelLoading,
}