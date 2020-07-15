'use strict';

(function () {

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = document.querySelector('.img-filters__form');
  var errorButton = document.querySelector('.error__button');
  var pictures = [];

  window.ajax.load('https://javascript.pages.academy/kekstagram/data', onLoadSuccess, onLoadError);

  function onLoadSuccess(data) {
    pictures = data;
    window.picturesRenderer.renderPictures(data);
    window.utils.removeClass(imgFilter, 'img-filters--inactive');
  }

  function onLoadError(error) {
    errorButton.textContent = 'Закрыть';
    window.messages.showErrorMessage(error);
  }

  imgFilterForm.addEventListener('click', window.debounce(function (event) {
    window.picturesRenderer.updatePictures(event.target, pictures);
  }));
})();
