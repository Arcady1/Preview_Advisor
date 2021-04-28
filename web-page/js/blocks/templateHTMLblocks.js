"use strict";

function userPreviewImgGenerator(url, id_img_wrapper, id_img) {
    return `
        <div class="content-img__wrapper" id="${id_img_wrapper}">
            <img class="content-img" id="${id_img}" src="${url}" alt="#">
            <button class="img-delete__button" id="imgDeleteButton"></button>
        </div>
    `;
}

function predictedImgPreview(
    id_img_wrapper,
    id_img,
    id_loading_bar,
    id_averall_score,
    id_predicted_canvas,
    id_error_img) {
    return `
    <div class="content-img__wrapper predicted-img__wrapper" id="${id_img_wrapper}">
        <canvas class="predicted-canvas" id="${id_predicted_canvas}" width="224" height="224"></canvas>
        <img class="content-img predicted-img" id="${id_img}" src="#" alt="">
        <p class="predicted-img_txt">Averall score: <span id="${id_averall_score}">0</span></p>
        <div class="predicted-img__loading-bar" id="${id_loading_bar}"></div>
        <div class="predicted-img__error-img" id="${id_error_img}"></div>
    </div>
    `;
}

module.exports = {
    userPreviewImgGenerator: userPreviewImgGenerator,
    predictedImgPreview: predictedImgPreview,
}