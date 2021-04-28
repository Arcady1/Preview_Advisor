"use strict";

const vars = require('./vars');
const animation = require('./blocksVisualisation');
const modelLoading = require('../tf-ml/modelLoading');

window.onload = function () {
    predictButtonLeft();
    animation.smoothScrollToTop();
    modelLoading.modelLoading();
};
window.onresize = predictButtonLeft;

function predictButtonLeft() {
    const predictButtonWidth = vars.predictButtonWrapper.width();

    vars.predictButtonWrapper.css("left", `calc(50% - ${predictButtonWidth / 2}px)`)
}