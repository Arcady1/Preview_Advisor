"use strict";

const vars = require('./vars');

function showDnDdeactivateBlock() {
    vars.deactivateInputBlock.css("display", "block");
}

function hideDnDdeactivateBlock() {
    vars.deactivateInputBlock.css("display", "none");
}

module.exports = {
    showDnDdeactivateBlock: showDnDdeactivateBlock,
    hideDnDdeactivateBlock: hideDnDdeactivateBlock,
}