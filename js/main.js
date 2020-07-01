'use strict';

(function () {
  var pictures = [];
  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = document.querySelector('.img-filters__form');

  window.ajax.load('https://javascript.pages.academy/kekstagram/data', picturesCallback, function () {
  });

  function picturesCallback(data) {
    pictures = data;
    window.picturesRenderer.renderPictures(data);
    window.utils.removeClass(imgFilter, 'img-filters--inactive');
  }

  imgFilterForm.addEventListener('click', window.debounce(function (event) {
    window.picturesRenderer.updatePictures(event, pictures);
  }));
})();
