"use strict";

const $ = require('jquery');

// * The function changes the Averall Score Text
function changeAverallScore(predAverallScoreTxtId, score, toFixedNum = 2) {
    $(`#${predAverallScoreTxtId}`).html(score.toFixed(toFixedNum));
}

module.exports = {
    changeAverallScore: changeAverallScore,
}