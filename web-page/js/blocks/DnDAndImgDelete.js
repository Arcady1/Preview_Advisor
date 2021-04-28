"use strict";

const $ = require('jquery');
const vars = require('./vars');
const DnDdeactivate = require('./DnDdeactivate');

// * The function makes DnD and pictures deleting invalid
function disableDnDandImageDelete() {
    $(".img-delete__button").css("opacity", 0);
    vars.headerWrapperBlock.css("opacity", 0.5);
    DnDdeactivate.showDnDdeactivateBlock();

    setTimeout(() => {
        $(".img-delete__button").css("visibility", "hidden");
    }, vars.deleteImgButtonTransition * 1000);
}

// * The function makes DnD and pictures deleting valid
function enableDnDandImageDelete() {
    $(".img-delete__button").css("opacity", 1);
    vars.headerWrapperBlock.css("opacity", 1);
    DnDdeactivate.hideDnDdeactivateBlock();
}

module.exports = {
    disableDnDandImageDelete: disableDnDandImageDelete,
    enableDnDandImageDelete: enableDnDandImageDelete,
}