"use strict";

const $ = require('jquery');
const vars = require('./vars');

// * Hide Block 
function hideOrShowBlock(blockId, hide = true, timeout = vars.predictButtonTransition * 1000, showOpacity = 1) {
    const block = $(`#${blockId}`);

    if (hide) {
        block.css("opacity", 0);

        return block;
    } else {
        if (timeout == 0) {
            block.css("opacity", showOpacity);
        } else {
            block.css("display", "block");

            setTimeout(() => {
                block.css("opacity", showOpacity);
            }, timeout);
        }
    }
}

// * Remove Block
function removeBlock(blockID, timeout = vars.predictButtonTransition * 1000) {
    setTimeout(() => {
        $(`#${blockID}`).remove();
    }, timeout);
}

module.exports = {
    hideOrShowBlock: hideOrShowBlock,
    removeBlock: removeBlock,
}