"use strict";

const vars = require('./vars');
const imgPreview = require('./imgPreview');
const animation = require('./blocksVisualisation');
const downloadButton = require('./downloadButton');
const deleteLoadedImg = require('./imgDelete');
const showAgOrPredBut = require('./showAgainOrPredictButtons');

(() => {
    const DnDarea = stopPreventDefault(vars.headerBlock);

    DnDarea.on("drop", handleDrop);
    DnDarea.on("dragenter", animation.handleDragEnter);
    DnDarea.on("dragleave", animation.handleDragLeave);
    vars.inputArea.on("change", handleDrop);
    vars.predictButton.on("click", animation.handlePredictButtonClick);
})()

// * The function resets the default action
function stopPreventDefault(DnDarea) {
    const events = ["dragenter", "dragover", "dragleave", "drop"];

    events.forEach((event) => {
        DnDarea.on(event, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    return DnDarea;
}

function handleDrop(e) {
    let data = e.originalEvent.srcElement.files || e.originalEvent.dataTransfer.files;
    downloadButton.availableInputInsideDownloadButton();
    dataErrorsChecker(data);
    document.getElementById("DnDarea").value = "";
}

// * The function checks the correctness of the input, starts the image preview,
// * shows / hides the "Predict" button
async function dataErrorsChecker(data) {
    data = [...data];

    for (let i = 0; i < data.length; i++) {
        let file = data[i];

        if (file.type != "image/jpeg") {
            alert("Wrong input file type");
            continue;
        }

        if (Object.keys(vars.userFiles).length >= vars.maxFilesCount) {
            alert("Max files: 10");
            break;
        } else {
            let blocksImgId = vars.blocksImgId + 10;
            // Waiting for img loading
            await imgPreview.imgPreview(file, vars.blocksImgId, blocksImgId);

            vars.userFiles[vars.blocksImgId] = {
                parentImgID: vars.blocksImgId,
                loadedImgId: blocksImgId,
                predictImgWrapperId: vars.blocksImgId + 20,
                predictImgId: vars.blocksImgId + 30,
                predictImgLoadingBarId: vars.blocksImgId + 40,
                predictImgAverallScoreId: vars.blocksImgId + 50,
                predictedCanvas: vars.blocksImgId + 60,
                predictImgErrorId: vars.blocksImgId + 70,
            };

            vars.blocksImgId *= 2;
        }
    }

    if (Object.keys(vars.userFiles).length > 0) {
        vars.predictButtonWrapper.css("z-index", "var(--contentButtonWrapperZindex)");
        animation.bodyOverflow(false);
        showAgOrPredBut.showPredictButton();
    } else
        deleteLoadedImg.bodyOverfAndHidePredButt();

    return;
}