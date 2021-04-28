"use strict";

const vars = require('./vars');

// * Input Inside Download Button
function unavailableInputInsideDownloadButton() {
    vars.headerWrapperBlock.css("background-color", "var(--DnDbgcHover)");
    hideOrShowDownloadButton(true);
}

function availableInputInsideDownloadButton() {
    vars.headerWrapperBlock.css("background-color", "var(--DnDbgc)");
    hideOrShowDownloadButton(false);
}

// * Download Button Animation
async function hideOrShowDownloadButton(hideDownloadButton = true) {
    if (hideDownloadButton) {
        vars.downloadButton.css("opacity", 0);
        timerFunc("display", "none");
    } else {
        await timerFunc("display", "block");
        timerFunc("opacity", 1);
    }
}

function timerFunc(event, style) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            vars.downloadButton.css(event, style);
            resolve();
        }, vars.downloadButtonTransition * 1000);
    });
}

module.exports = {
    unavailableInputInsideDownloadButton: unavailableInputInsideDownloadButton,
    availableInputInsideDownloadButton: availableInputInsideDownloadButton,
    hideOrShowDownloadButton: hideOrShowDownloadButton,
}