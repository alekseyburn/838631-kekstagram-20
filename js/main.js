'use strict';

(function () {

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = document.querySelector('.img-filters__form');
  var pictures = [];

  window.ajax.load('https://javascript.pages.academy/kekstagram/data', picturesCallback, function () {
  });

  function picturesCallback(data) {
    setPictures(data);
    window.picturesRenderer.renderPictures(data);
    window.utils.removeClass(imgFilter, 'img-filters--inactive');
  }

  imgFilterForm.addEventListener('click', window.debounce(function (event) {
    window.picturesRenderer.updatePictures(event.target);
  }));

  function setPictures(data) {
    pictures = data;
  }

  function getPictures() {
    return pictures;
  }
  window.main = {
    getPictures: getPictures
  };
})();
