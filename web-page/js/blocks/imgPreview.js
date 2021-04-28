"use strict";

const $ = require('jquery');
const vars = require('./vars');
const templateHTMLblocks = require('./templateHTMLblocks');
const deleteLoadedImg = require('./imgDelete');

// * The function loads a preview of uploaded pictures
function imgPreview(userImg, imgWrapperId, imgId) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(userImg);
        reader.onloadend = (() => {
            vars.inputImgs.append(templateHTMLblocks.userPreviewImgGenerator(reader.result, imgWrapperId, imgId));
            bindOnclickDeleteBut();

            resolve();
        })
    });
}

// * The function binds the deleteLoadedImg function 
// * to delete the loaded picture if it's necessary
function bindOnclickDeleteBut() {
    const allDeleteImgButtons = $(".img-delete__button");
    allDeleteImgButtons.on("click", deleteLoadedImg.deleteLoadedImg);
}

module.exports = {
    imgPreview: imgPreview,
}