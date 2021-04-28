"use strict";

const $ = require('jquery');

module.exports = {
    userFiles: {},
    maxFilesCount: 10,
    headerBlock: $("#header"),
    headerWrapperBlock: $("#headerWrapper"),
    inputArea: $("#DnDarea"),
    inputImgs: $("#inputImgs"),
    predictImgs: $("#predictImgs"),
    predictButton: $("#PredictButton"),
    predictButtonWrapper: $("#PredictButtonWrapper"),
    predictButtonTxt: $("#but_txt"),
    downloadButton: $("#downloadButton"),
    downloadButtonTransition: parseFloat($("#downloadButton").css("transition-duration")),
    predictButtonTransition: parseFloat($("#PredictButton").css("transition-duration")),
    deleteImgButtonTransition: parseFloat($("#imgDeleteButton").css("transition-duration")),
    blocksImgId: 2000,
    tempImgPredictBlock: $("#hidden-predict-img"),
    buttonStatus: "predict",
    deactivateInputBlock: $("#DnDdeactivateBlock"),
}